---
name: free-function-lowering
description: "file-scope C++ helpers in a device .cpp were never parsed, so calls to them answered 0; gb.cpp's convert_output was the whole Game Boy mixer"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-09-02T02:11:23.664Z
---

Fixed 2026-09-02. `parseMameSource`'s function regex only recognised
`Class::method(...) {`, so a **file-scope helper function was not in the AST at
all**, and a call to one resolved to nothing — which emitted code answers with
`0` (see [[codegen-silent-zero]]).

`gb.cpp` writes `constexpr s32 convert_output(s32 sample) { return 0xf - (sample * 2); }`
and every Game Boy channel's level goes through it. Unresolved, the mixer
summed four channels of zero. There are **386 such helpers across 158 device
files** in the MAME tree we compile, so this was never Game-Boy-specific.

`ast.ts` now has a free-function pass, and `device-compiler.ts` compiles the
ones a collected method actually calls (a device source shares a translation
unit with its neighbours; the rest are theirs). Free functions carry
`className: ''`.

**The regex has to be tight, and the first version was not.** Greedy across
newlines it read `ROM_END` as the return type of the `DEFINE_DEVICE_TYPE(...)`
below it and ran the parameter list on through the *following constructor's
initialiser list* to that constructor's `{`. That buried both macros in
`occupied`, and `hardware.get('NAMCO_54XX')` returned undefined —
`device-compiler.spec.ts` caught it. The constraints that matter:

- the type run stays on the name's own line (`[^\S\n]+` between words, not `\s+`)
- the parameter list admits **no nested parentheses** (`[^;{}()]*`)
- start at column 0, outside `occupied` and outside every class `bodySpan`
- reject control keywords (`if`, `else`, `do`, `namespace`, ...)

Free-function bodies now join `occupied`, so macros inside them are no longer
collected as top-level macros — that is more correct, but it is a behaviour
change for driver files too.
