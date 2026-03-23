import type { RelationalEvent, SalienceCandidate } from '../types/cognitive.ts';

export function scoreSalience(current: RelationalEvent, candidates: RelationalEvent[], limit: number): SalienceCandidate[] {
  return candidates
    .map((candidate) => {
      const shared = candidate.tokens.filter((token) => current.tokens.includes(token));
      const score = shared.length * 2 + (candidate.relation === current.relation ? 1 : 0);
      return {
        eventId: candidate.id,
        score,
        reasons: [
          ...(shared.length > 0 ? [`shared:${shared.join(',')}`] : []),
          ...(candidate.relation === current.relation ? ['same-relation'] : []),
        ],
      } satisfies SalienceCandidate;
    })
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit);
}
