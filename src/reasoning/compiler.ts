import type { EpisodeTrace } from '../types/cognitive.ts';

export function detectCompilableRecurrence(traces: EpisodeTrace[], threshold: number): string | undefined {
  const counts = new Map<string, number>();
  for (const trace of traces) {
    if (!trace.operatorTried) {
      continue;
    }
    counts.set(trace.operatorTried, (counts.get(trace.operatorTried) ?? 0) + 1);
  }

  for (const [operator, count] of counts.entries()) {
    if (count >= threshold) {
      return operator;
    }
  }

  return undefined;
}
