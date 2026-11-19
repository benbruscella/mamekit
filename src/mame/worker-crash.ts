// How a compiler worker process died: a crash of the runtime itself, which
// is worth retrying, or a real failure, which is not. Shared by the target
// generator pool (src/gen/generator-workers.ts) and the hardware closure's
// own workers (src/hardware/nes/extract.ts).

/**
 * Signals produced by a crashed runtime, rather than a generator exception.
 * Node 26 on macOS arm64 reports V8's own faults in JIT-compiled code --
 * EXC_BAD_ACCESS with no native frame -- as SIGILL, the same intermittent
 * crash earlier releases delivered as SIGBUS or SIGSEGV.
 */
export function retryableGeneratorSignal(signal: NodeJS.Signals | null): boolean {
  return signal === 'SIGBUS' || signal === 'SIGSEGV' || signal === 'SIGABRT' || signal === 'SIGILL';
}

/**
 * A worker that died inside Node itself rather than in generation.
 *
 * Node strips types from this repository's TypeScript with a WebAssembly
 * parser, and under the memory pressure of several generator isolates it can
 * fault with `ERR_INTERNAL_ASSERTION: memory access out of bounds` before a
 * single line of our code runs. Node reports that as a caught assertion and
 * exits 1, so it never reaches `retryableGeneratorSignal` -- the same crash
 * that used to arrive as SIGBUS now aborts the whole run instead of retrying.
 */
export function retryableRuntimeCrash(stderr: string): boolean {
  return stderr.includes('ERR_INTERNAL_ASSERTION') &&
    (stderr.includes('memory access out of bounds') ||
      stderr.includes('stripTypeScriptModuleTypes'));
}
