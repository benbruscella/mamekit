---
name: node-rom-inflate-segfault
description: "Intermittent native crashes (exit 139 / SIGBUS / zero-byte logs) — 2026-09-02: at least some are Node's own WASM TypeScript stripper, not our code; retry, never read as a contract failure"
metadata:
  type: project
---

`node src/games/acceptance.ts <game>` intermittently dies with **exit 139
(SIGSEGV, EXC_BAD_ACCESS)**, and Chromium shows the same in e2e as
`Target crashed` / `Page crashed`. Rare and bursty: 1 in 6 once, then 0 in 28,
then 1 more; ~2 per 48-machine sweep on a bad day (2026-08-25, Node 24.6.0,
darwin arm64).

A crashed run leaves a **zero-byte log** — it dies before the harness prints
its first fps line — so it reads as a flaky machine. That is how it went
unnoticed and it voided several sweeps.

**Do not repeat this mis-diagnosis.** The first crash report
(`~/Library/Logs/DiagnosticReports/node-*.ips`) showed a zlib
`AfterThreadPoolWork` frame at the base, which looks like the ROM inflate.
It is not: `runGameAcceptance` awaits `readZip`, so the **whole emulation loop
runs as that await's continuation**, and zlib was merely what happened to be
draining the microtask queue. Later reports have no zlib frame at all — just
JIT-compiled JavaScript under `AsyncFunctionAwaitResolveClosure`.

`src/runtime/zip.ts` now inflates with an in-repo RFC 1951 decoder (sync, no
thread pool, no platform split, validated over 74 zips / 1,636 entries /
75.2 MB by the reader's own per-entry CRC). That change is worth having but
**did not stop the crash**.

Emitted-vs-interpreted was tested and proved nothing: 0 crashes in 14 runs on
*both* arms. Establishing whether codegen changes the rate needs hundreds of
iterations per arm against a `main` baseline — a measurement job, not a
debugging one. Cause still unknown; predates issue #77.

**How to sweep honestly:** retry `exit >= 128` (up to ~4 attempts), count
crashes separately, and keep the output of real assertion failures. See
[[emitter-interpreter-parity]] and [[frugal-blast-radius]].

## 2026-09-02: at least part of this is Node, not us

A `gen:all` on **Node v24.16.0** (fnm; the repo default alias is still
v24.6.0, so an agent shell and the user's shell can differ) failed with:

```
Error [ERR_INTERNAL_ASSERTION]: memory access out of bounds
    at parseTypeScript (node:internal/modules/typescript:79:16)
    at stripTypeScriptModuleTypes (node:internal/modules/typescript:209:22)
```

That is Node's **WebAssembly TypeScript type-stripper faulting before a line
of our code runs** — the repo has no build step, so every worker strips every
`.ts` it loads. It fits the whole flake profile: bursty, concurrency-sensitive,
and leaving a **zero-byte log** because the process dies during module load.

The single target regenerated 3/3 alone, so it is memory pressure from
parallel isolates, not any one driver.

**Why it aborted the run rather than retrying:** `retryableGeneratorSignal`
only covers SIGBUS/SIGSEGV/SIGABRT. Node *catches* this assertion and exits
**1**, so the existing retry never saw it. Fixed by
`retryableRuntimeCrash(stderr)` in `src/gen/generator-workers.ts`.

**Still not fixed:** `npm run test:games` and `npm run test:unit` have no such
retry, which is why a sweep still needs crashes retried by hand. A zero-byte
acceptance log is this, not a contract failure.

## 2026-09-07: two more places with no retry

Same session, Node v24.6.0, an unrelated input-only branch (#123):

- `npm run test:unit` — one game spec (`travrusa.game.spec.ts`) died
  `SIGSEGV`; passed alone on retry. The spec runner reports it as a plain
  FAIL with no output.
- `npm run gen:all` — every target generated, then the **hardware closure**
  died: `HD6309E: CPU artifact worker exited SIGSEGV` from
  `src/hardware/cpu/extract.ts:100`. That worker path rejects instead of
  retrying, and the run exits 1 with no closure, so `audit:generated` then
  lists every target as "missing from unified generated registry" /
  "missing generated/board.js" / "false hardware gap". Those audit lines are
  the missing closure, not 78 broken drivers. Rerun `gen:all`: targets come
  back from `.cache/` and only the closure re-derives.

## 2026-10-21: Node 26.8.1 reports it as SIGILL

`.nvmrc` now pins Node 26.8.1. The same fault (EXC_BAD_ACCESS on the main
thread inside JIT code, zero native frames in the `.ips`) arrives as
**SIGILL**, which `retryableGeneratorSignal` did not list. A single SIGILL in
`gen:all` (sinistar) aborted the whole run unretried; sinistar regenerated
cleanly 3/3 alone. SIGILL is now retryable (src/gen/generator-workers.ts).
Read `.ips` with python: line 1 is a JSON header, the rest one JSON body.

## 2026-10-25: root cause is this Mac, not Node or our code (#190)

See [[host-machine-faults]]: the same probe in a Linux arm64 Docker VM on the
same M3 Pro faults at 3.1% while CI linux-arm64 shows 0 in ~760 runs.
