import { encodeEvent } from '../encoding/event_encoder.ts';
import { EpisodicStore } from '../memory/episodic_store.ts';
import { OperatorStore } from '../memory/operator_store.ts';
import { SemanticGraph } from '../memory/semantic_graph.ts';
import { scoreSalience } from '../reasoning/salience_router.ts';
import { boundedPlan } from '../reasoning/planner.ts';
import { detectCompilableRecurrence } from '../reasoning/compiler.ts';
import { tryTransformationReuse } from '../reasoning/transformation_matcher.ts';
import type { EpisodeTrace, RuntimeMetrics, TickInput, TickResult, WorkspaceState } from '../types/cognitive.ts';

export interface RuntimeOptions {
  eventStore?: EpisodicStore;
  graph?: SemanticGraph;
  operators?: OperatorStore;
  retrievalLimit?: number;
  plannerDepth?: number;
}

export class IgcaRuntime {
  private readonly eventStore: EpisodicStore;
  private readonly graph: SemanticGraph;
  private readonly operators: OperatorStore;
  private readonly retrievalLimit: number;
  private readonly plannerDepth: number;
  private readonly traces: EpisodeTrace[] = [];
  private readonly metrics: RuntimeMetrics = {
    activeNodesPerTick: [],
    retrievalFanout: [],
    plannerInvocations: 0,
    compilationHits: 0,
  };
  private workspace: WorkspaceState = {
    tick: 0,
    activeEventIds: [],
    goals: [],
  };

  public constructor(options: RuntimeOptions = {}) {
    this.eventStore = options.eventStore ?? new EpisodicStore();
    this.graph = options.graph ?? new SemanticGraph();
    this.operators = options.operators ?? new OperatorStore();
    this.retrievalLimit = options.retrievalLimit ?? 3;
    this.plannerDepth = options.plannerDepth ?? 2;
  }

  public tick(input: TickInput): TickResult {
    const tick = this.workspace.tick + 1;
    const event = encodeEvent(input, tick);
    this.eventStore.append(event);
    this.graph.ingest(event);

    const retrieved = this.eventStore.retrieveByTokens(event.tokens, this.retrievalLimit + 1)
      .filter((candidate) => candidate.id !== event.id)
      .slice(0, this.retrievalLimit);
    const salient = scoreSalience(event, retrieved, this.retrievalLimit);
    const prior = retrieved[0];
    const operator = this.operators.match(event);
    const reused = tryTransformationReuse(event, prior, operator);

    let output: string | undefined;
    const reasoning = salient.flatMap((candidate) => candidate.reasons);
    let plannerUsed = false;
    let operatorTried: string | undefined;

    if (reused) {
      output = `${event.actor} ${event.relation} ${reused.reusedTarget}`;
      reasoning.push(reused.explanation);
      operatorTried = reused.operator.id;
    } else {
      const planned = boundedPlan(event, retrieved, this.plannerDepth);
      output = planned.output;
      reasoning.push(...planned.reasoning);
      plannerUsed = true;
      this.metrics.plannerInvocations += 1;
    }

    this.operators.learnFromEpisode(event, reused !== undefined);

    const trace: EpisodeTrace = {
      tick,
      ingestedEventIds: [event.id],
      retrievedEventIds: retrieved.map((candidate) => candidate.id),
      plannerUsed,
      output,
      reasoning,
      ...(operatorTried ? { operatorTried } : {}),
    };

    this.traces.push(trace);
    this.workspace = {
      tick,
      activeEventIds: [event.id, ...retrieved.map((candidate) => candidate.id)].slice(0, this.retrievalLimit + 1),
      goals: [],
      lastAction: output,
    };
    this.metrics.activeNodesPerTick.push(this.workspace.activeEventIds.length);
    this.metrics.retrievalFanout.push(retrieved.length);

    const compiled = detectCompilableRecurrence(this.traces, 1);
    if (compiled) {
      this.metrics.compilationHits += 1;
    }

    return { trace, output };
  }

  public inspectState(): { workspace: WorkspaceState; metrics: RuntimeMetrics; traceCount: number } {
    return {
      workspace: this.workspace,
      metrics: this.metrics,
      traceCount: this.traces.length,
    };
  }
}
