import type { RelationalEvent } from '../types/cognitive.ts';

export interface PlanResult {
  output: string;
  reasoning: string[];
}

export function boundedPlan(current: RelationalEvent, retrieved: RelationalEvent[], maxDepth: number): PlanResult {
  const depth = Math.min(maxDepth, 2);
  const supporting = retrieved.find((event) => event.relation === current.relation);

  if (supporting) {
    return {
      output: `${current.actor} likely ${current.relation} ${supporting.target}`,
      reasoning: [`planner-depth:${depth}`, `matched-relation:${supporting.id}`],
    };
  }

  return {
    output: `${current.actor} ${current.relation} ${current.target}`,
    reasoning: [`planner-depth:${depth}`, 'fallback-self'],
  };
}
