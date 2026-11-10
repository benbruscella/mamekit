---
name: unresolved-call-census-178
description: "#178 step 1: tools/unresolved-calls.ts census + src/ir/framework-calls.ts declared no-ops; two traps (emitted presence checks, regex-built names)"
metadata:
  node_type: memory
  type: project
  originSessionId: bb6f9c22-a036-4bd8-a560-4dd6b323f5c7
  modified: 2026-10-23T01:19:22.880Z
---

2026-10-23, branch 178. Silent zeros are found, not guessed:
- `tools/unresolved-calls.ts` runs each contract in its own child process
  (one heap for 101 boards died at ~43; native crashes cost only that run),
  recording mode, with `globalThis.mamekitMissingCall` installed.
- Both paths report through that one hook: the interpreter's fall-throughs
  (`noteUnresolvedCall` in src/ir/execute.ts, plus `generatedMacroCall` for
  `runtime.macro`) and emitted code's terminal fallbacks
  (`fallbackLink` in device-codegen: `(__l[x] ?? globalThis.mamekitMissingCall?.(x))`).
- `src/ir/framework-calls.ts` is the declared list of calls answered on
  purpose (save/debugger registration, devcb resolve, coin meters, accessors,
  delegate constructors, tilemap config the video compiler reads).

Traps:
- **Never stub a missing link with a function.** Emitted code tests link
  presence (`lookup ? lookup(...) : value-method : bare?.()`); a recorder stub
  changed behaviour and broke 35 runs ("reading 'transpen'"). Hook only the
  terminal `?.() ?? 0` fallback, evaluated only on a miss.
- **grep for a MAME call name can miss a regex-built match**: video-compiler
  reads `set_scrolld${axis}`, so "set_scrolldx" never appears literally. I
  wrongly called scroll offsets a gap on 6 machines. Search the stem too.

First real fixes from the census: std::begin/end/fill/min_element/max_element
(the 6805's device_reset never cleared m_irq_state), MAME coin lockout
(input model reads a locked IPT_COINn as released; board saves the mask),
`machine().sound().system_mute` via a new `BoardSinks.mute` (shell gain,
harness zeroes samples from frac). Related: [[codegen-silent-zero]],
[[silent-mislowering]], [[m68705-generated-176]].
