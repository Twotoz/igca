declare module 'node:crypto' {
  export function createHash(algorithm: string): {
    update(value: string): { digest(encoding: 'hex'): string };
  };
}

declare module 'node:sqlite' {
  export class DatabaseSync {
    constructor(filename: string);
    exec(sql: string): void;
    prepare(sql: string): {
      run(...params: unknown[]): void;
      get(...params: unknown[]): unknown;
      all(...params: unknown[]): unknown[];
    };
  }
}

declare module 'node:test' {
  const test: (name: string, fn: () => void | Promise<void>) => void;
  export default test;
}

declare module 'node:assert/strict' {
  const assert: {
    equal(actual: unknown, expected: unknown): void;
    deepEqual(actual: unknown, expected: unknown): void;
    match(actual: string | undefined, expected: RegExp): void;
    ok(value: unknown): void;
  };
  export default assert;
}

declare module 'node:fs' {
  export function mkdtempSync(prefix: string): string;
  export function rmSync(path: string, options: { recursive?: boolean; force?: boolean }): void;
}

declare module 'node:os' {
  export function tmpdir(): string;
}

declare module 'node:path' {
  export function join(...parts: string[]): string;
}
