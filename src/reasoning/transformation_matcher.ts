import type { CognitiveOperator, RelationalEvent } from '../types/cognitive.ts';

export interface TransformationMatch {
  operator: CognitiveOperator;
  reusedTarget: string;
  explanation: string;
}

export function tryTransformationReuse(
  current: RelationalEvent,
  prior: RelationalEvent | undefined,
  operator: CognitiveOperator | undefined,
): TransformationMatch | undefined {
  if (!prior || !operator) {
    return undefined;
  }

  if (operator.relation !== current.relation || prior.actor !== current.actor) {
    return undefined;
  }

  return {
    operator,
    reusedTarget: prior.target,
    explanation: `Reused target ${prior.target} from prior ${prior.actor}/${prior.relation} episode.`,
  };
}
