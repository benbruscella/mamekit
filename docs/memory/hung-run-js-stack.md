---
name: hung-run-js-stack
description: "How to get the JavaScript stack of a hung `mamekit against` child (busy loop in generated code) without editing the repo"
metadata:
  node_type: memory
  type: reference
  originSessionId: 3481c670-8f20-4782-a2d0-6bacf7fe2635
  modified: 2026-11-24T00:09:25.559Z
---

A `mamekit against` run that never returns is usually our side spinning in
generated code. `--timeout N` only reports "timed out or crashed". To see
where:

- Preload a script with `NODE_OPTIONS="--require=<scratch>/watch.cjs"` (the
  child inherits the environment). In it, only when `process.argv` includes
  `--child`, start a `Worker` (eval) that opens `inspector.Session`,
  `connectToMainThread()`, posts `Debugger.enable`, and after a delay posts
  `Debugger.pause`; on `Debugger.paused` append `params.callFrames`
  (functionName, url, line) to a file and `Debugger.resume`.
- It works on a busy main thread because pause is an interrupt.
  `--report-on-signal` + `kill -USR2` wrote nothing for the child.
- The inspector slows the run several times over; do not time anything with
  it loaded.
- The same preload trick tees the child's `console.warn` to a file (the tool
  hides it): that is how `GB_CART_SLOT: could not load ...: image_error 7`
  showed up.

Found with it (#294): `cartheader::checksum` looping on `begin != end` over
untyped iterator parameters. Related: [[gameboy-294]].
