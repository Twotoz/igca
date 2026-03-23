import { DatabaseSync } from 'node:sqlite';
import type { RelationalEvent } from '../types/cognitive.ts';

export class EpisodicStore {
  private readonly db: DatabaseSync;

  public constructor(filename = ':memory:') {
    this.db = new DatabaseSync(filename);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        tick INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        source TEXT NOT NULL,
        text TEXT NOT NULL,
        actor TEXT NOT NULL,
        relation TEXT NOT NULL,
        target TEXT NOT NULL,
        attributes TEXT NOT NULL,
        tokens TEXT NOT NULL
      );
    `);
  }

  public append(event: RelationalEvent): void {
    const statement = this.db.prepare(`
      INSERT OR REPLACE INTO events (
        id, tick, timestamp, source, text, actor, relation, target, attributes, tokens
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    statement.run(
      event.id,
      event.tick,
      event.timestamp,
      event.source,
      event.text,
      event.actor,
      event.relation,
      event.target,
      JSON.stringify(event.attributes),
      JSON.stringify(event.tokens),
    );
  }

  public getById(id: string): RelationalEvent | undefined {
    const row = this.db.prepare('SELECT * FROM events WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    return row ? this.mapRow(row) : undefined;
  }

  public recent(limit: number): RelationalEvent[] {
    const rows = this.db.prepare('SELECT * FROM events ORDER BY tick DESC LIMIT ?').all(limit) as Record<string, unknown>[];
    return rows.map((row) => this.mapRow(row));
  }

  public retrieveByTokens(tokens: string[], limit: number): RelationalEvent[] {
    const candidates = this.recent(128);
    return candidates
      .map((event) => ({
        event,
        overlap: event.tokens.filter((token) => tokens.includes(token)).length,
      }))
      .filter((candidate) => candidate.overlap > 0)
      .sort((left, right) => right.overlap - left.overlap || right.event.tick - left.event.tick)
      .slice(0, limit)
      .map((candidate) => candidate.event);
  }

  public count(): number {
    const row = this.db.prepare('SELECT COUNT(*) as count FROM events').get() as { count: number };
    return row.count;
  }

  private mapRow(row: Record<string, unknown>): RelationalEvent {
    return {
      id: String(row.id),
      tick: Number(row.tick),
      timestamp: String(row.timestamp),
      source: row.source as 'external' | 'internal',
      text: String(row.text),
      actor: String(row.actor),
      relation: String(row.relation),
      target: String(row.target),
      attributes: JSON.parse(String(row.attributes)) as Record<string, string>,
      tokens: JSON.parse(String(row.tokens)) as string[],
    };
  }
}
