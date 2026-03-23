import type { IgcaRuntime } from './runtime.ts';
import type { TickInput, TickResult } from '../types/cognitive.ts';

export function runTickLoop(runtime: IgcaRuntime, inputs: TickInput[]): TickResult[] {
  return inputs.map((input) => runtime.tick(input));
}
