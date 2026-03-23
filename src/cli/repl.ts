import { IgcaRuntime } from '../core/runtime.ts';

const runtime = new IgcaRuntime();
const demoInputs = [
  { source: 'external' as const, text: 'alice likes tea' },
  { source: 'external' as const, text: 'alice likes coffee' },
  { source: 'external' as const, text: 'alice likes cocoa' },
];

for (const input of demoInputs) {
  const result = runtime.tick(input);
  console.log(`> ${input.text}`);
  console.log(result.output);
  console.log(result.trace.reasoning.join(' | '));
}

console.log(JSON.stringify(runtime.inspectState(), null, 2));
