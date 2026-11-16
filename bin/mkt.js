#!/usr/bin/env node
// mkt CLI entry (tools/mkt.ts): every comparison of a generated machine with
// MAME. Node >= 23.6 runs the TypeScript source directly.
await import(new URL('../tools/mkt.ts', import.meta.url));
