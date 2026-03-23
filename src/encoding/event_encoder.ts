import { createHash } from 'node:crypto';
import type { RelationalEvent, TickInput } from '../types/cognitive.ts';

const STOPWORDS = new Set(['the', 'a', 'an', 'to', 'for', 'of', 'is', 'are']);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 0 && !STOPWORDS.has(token));
}

export function encodeEvent(input: TickInput, tick: number, actor = 'user'): RelationalEvent {
  const tokens = tokenize(input.text);
  const [subject = actor, relation = 'mentions', ...rest] = tokens;
  const target = rest.join('_') || relation;
  const payload = `${tick}:${input.source}:${input.text}`;

  return {
    id: createHash('sha1').update(payload).digest('hex').slice(0, 12),
    tick,
    timestamp: new Date(Date.UTC(2026, 0, 1, 0, 0, tick)).toISOString(),
    source: input.source,
    text: input.text,
    actor: subject,
    relation,
    target,
    attributes: rest.length > 0 ? { phrase: rest.join(' ') } : {},
    tokens,
  };
}
