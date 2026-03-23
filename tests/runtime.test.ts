import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { encodeEvent } from '../src/encoding/event_encoder.ts';
import { EpisodicStore } from '../src/memory/episodic_store.ts';
import { scoreSalience } from '../src/reasoning/salience_router.ts';
import { tryTransformationReuse } from '../src/reasoning/transformation_matcher.ts';
import { boundedPlan } from '../src/reasoning/planner.ts';
import { detectCompilableRecurrence } from '../src/reasoning/compiler.ts';
import { IgcaRuntime } from '../src/core/runtime.ts';
import type { EpisodeTrace } from '../src/types/cognitive.ts';

test('event encoding is deterministic and relational', () => {
  const event = encodeEvent({ source: 'external', text: 'alice likes tea' }, 1);
  assert.equal(event.actor, 'alice');
  assert.equal(event.relation, 'likes');
  assert.equal(event.target, 'tea');
  assert.deepEqual(event.tokens, ['alice', 'likes', 'tea']);
});

test('episodic store supports round-trip persistence and sparse retrieval', () => {
  const dir = mkdtempSync(join(tmpdir(), 'igca-'));
  const file = join(dir, 'events.db');
  try {
    const store = new EpisodicStore(file);
    const a = encodeEvent({ source: 'external', text: 'alice likes tea' }, 1);
    const b = encodeEvent({ source: 'external', text: 'alice likes coffee' }, 2);
    store.append(a);
    store.append(b);

    const reopened = new EpisodicStore(file);
    assert.equal(reopened.count(), 2);
    assert.equal(reopened.getById(a.id)?.text, 'alice likes tea');
    assert.deepEqual(reopened.retrieveByTokens(['coffee'], 1).map((event) => event.id), [b.id]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('salience scoring prefers stronger local overlaps', () => {
  const current = encodeEvent({ source: 'external', text: 'alice likes cocoa' }, 3);
  const candidates = [
    encodeEvent({ source: 'external', text: 'alice likes tea' }, 1),
    encodeEvent({ source: 'external', text: 'bob repairs toaster' }, 2),
  ];

  const scored = scoreSalience(current, candidates, 2);
  assert.equal(scored[0]?.eventId, candidates[0]?.id);
  assert.match(scored[0]?.reasons.join(','), /same-relation/);
});

test('transformation matcher reuses prior target for repeated actor relation pairs', () => {
  const prior = encodeEvent({ source: 'external', text: 'alice likes tea' }, 1);
  const current = encodeEvent({ source: 'external', text: 'alice likes cocoa' }, 2);
  const match = tryTransformationReuse(current, prior, {
    id: 'alice:likes',
    name: 'reuse_alice_likes',
    relation: 'likes',
    pattern: ['alice', 'likes'],
    action: 'reuse-target',
    successCount: 1,
    exposureCount: 2,
  });

  assert.equal(match?.reusedTarget, 'tea');
});

test('bounded planner falls back deterministically', () => {
  const current = encodeEvent({ source: 'external', text: 'alice likes cocoa' }, 4);
  const result = boundedPlan(current, [], 3);
  assert.equal(result.output, 'alice likes cocoa');
  assert.deepEqual(result.reasoning, ['planner-depth:2', 'fallback-self']);
});

test('compiler detects recurrent operator usage', () => {
  const traces: EpisodeTrace[] = [
    { tick: 1, ingestedEventIds: ['a'], retrievedEventIds: ['b'], operatorTried: 'alice:likes', plannerUsed: false, reasoning: [] },
    { tick: 2, ingestedEventIds: ['c'], retrievedEventIds: ['d'], operatorTried: 'alice:likes', plannerUsed: false, reasoning: [] },
  ];

  assert.equal(detectCompilableRecurrence(traces, 2), 'alice:likes');
});

test('runtime remains stable across repeated ticks and compiles repeated reuse', () => {
  const runtime = new IgcaRuntime();
  const outputs = [
    runtime.tick({ source: 'external', text: 'alice likes tea' }).output,
    runtime.tick({ source: 'external', text: 'alice likes coffee' }).output,
    runtime.tick({ source: 'external', text: 'alice likes cocoa' }).output,
  ];

  assert.deepEqual(outputs, ['alice likes tea', 'alice likely likes tea', 'alice likes coffee']);
  const state = runtime.inspectState();
  assert.equal(state.traceCount, 3);
  assert.equal(state.metrics.plannerInvocations, 2);
  assert.ok(state.metrics.compilationHits >= 1);
});
