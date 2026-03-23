export interface RelationalEvent {
  id: string;
  tick: number;
  timestamp: string;
  source: 'external' | 'internal';
  text: string;
  actor: string;
  relation: string;
  target: string;
  attributes: Record<string, string>;
  tokens: string[];
}

export interface ConceptNode {
  id: string;
  label: string;
  kind: 'actor' | 'relation' | 'target' | 'attribute';
  activation: number;
  lastUpdatedTick: number;
}

export interface InvariantBundle {
  id: string;
  relation: string;
  actor?: string;
  target?: string;
  support: number;
  evidenceEventIds: string[];
}

export interface CognitiveOperator {
  id: string;
  name: string;
  relation: string;
  pattern: string[];
  action: 'reuse-target';
  successCount: number;
  exposureCount: number;
}


export interface SalienceCandidate {
  eventId: string;
  score: number;
  reasons: string[];
}

export interface WorkspaceState {
  tick: number;
  activeEventIds: string[];
  goals: string[];
  lastAction?: string;
}

export interface EpisodeTrace {
  tick: number;
  ingestedEventIds: string[];
  retrievedEventIds: string[];
  operatorTried?: string;
  plannerUsed: boolean;
  output?: string;
  reasoning: string[];
}

export interface RuntimeMetrics {
  activeNodesPerTick: number[];
  retrievalFanout: number[];
  plannerInvocations: number;
  compilationHits: number;
}

export interface TickInput {
  source: 'external' | 'internal';
  text: string;
}

export interface TickResult {
  trace: EpisodeTrace;
  output?: string;
}
