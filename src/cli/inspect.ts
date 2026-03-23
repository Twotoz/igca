import { IgcaRuntime } from '../core/runtime.ts';

const runtime = new IgcaRuntime();
runtime.tick({ source: 'external', text: 'bob repairs toaster' });
console.log(JSON.stringify(runtime.inspectState(), null, 2));
