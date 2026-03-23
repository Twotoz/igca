import type { ConceptNode, RelationalEvent } from '../types/cognitive.ts';

export class SemanticGraph {
  private readonly nodes = new Map<string, ConceptNode>();

  public ingest(event: RelationalEvent): void {
    this.touch(`actor:${event.actor}`, event.actor, 'actor', event.tick);
    this.touch(`relation:${event.relation}`, event.relation, 'relation', event.tick);
    this.touch(`target:${event.target}`, event.target, 'target', event.tick);

    for (const [key, value] of Object.entries(event.attributes)) {
      this.touch(`attribute:${key}:${value}`, `${key}=${value}`, 'attribute', event.tick);
    }
  }

  public topActive(limit: number): ConceptNode[] {
    return [...this.nodes.values()]
      .sort((left, right) => right.activation - left.activation || right.lastUpdatedTick - left.lastUpdatedTick)
      .slice(0, limit);
  }

  private touch(id: string, label: string, kind: ConceptNode['kind'], tick: number): void {
    const current = this.nodes.get(id);
    this.nodes.set(id, {
      id,
      label,
      kind,
      activation: (current?.activation ?? 0) + 1,
      lastUpdatedTick: tick,
    });
  }
}
