import type { CognitiveOperator, RelationalEvent } from '../types/cognitive.ts';

export class OperatorStore {
  private readonly operators = new Map<string, CognitiveOperator>();

  public learnFromEpisode(event: RelationalEvent, reused: boolean): void {
    const key = `${event.actor}:${event.relation}`;
    const existing = this.operators.get(key);
    if (existing) {
      existing.exposureCount += 1;
      if (reused) {
        existing.successCount += 1;
      }
      return;
    }

    this.operators.set(key, {
      id: key,
      name: `reuse_${event.actor}_${event.relation}`,
      relation: event.relation,
      pattern: [event.actor, event.relation],
      action: 'reuse-target',
      successCount: reused ? 1 : 0,
      exposureCount: 1,
    });
  }

  public match(event: RelationalEvent): CognitiveOperator | undefined {
    const operator = this.operators.get(`${event.actor}:${event.relation}`);
    if (!operator || operator.exposureCount < 2) {
      return undefined;
    }

    return operator;
  }
}
