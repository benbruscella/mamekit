---
name: c64-wav-tapes-161
description: "#161 .wav tapes: wavfile.cpp compiled, host cassette image keeps cassimg.cpp's storage and rounding (the old store floored the time); why .d81/.img stay unplayable"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-19T15:59:38.171Z
---

2026-10-20. `compileWavTapeFormat` (cassette-compiler.ts) compiles wavfile_process/identify/load
with cassimg.h's enums (LSB_FIRST forced: stripInactivePreprocessorBranches treats every #ifdef as
false, which would pick the big-endian WAVEFORM_*LE values) and its `Options` struct (needed
`structDeclarations` + `lowerStructLocals`, now exported from device-compiler). The datassette's
`imageFormats` is a union (CassetteImageFormat): legacy wave filler (TAP) or identify+load (WAV).

- Host `cassetteImage` (generated-device.ts) replaces `sampleImage`: int32 per channel at the
  image's frequency, MAME's chunked read_samples/put_samples mapping, and get_sample at
  `size_t(t*f + 0.5)` -- the old store used floor, half a sample early on every C64 tape vs MAME.
- Midway Campaign (27 MB, 316 s) mounts in 92 ms and loads to READY. Our talladeg.zip holds a
  `.tap`, not the list's `.wav`; the real `.wav` sets are midway, robbers, smoothtk, speakez.
- `.d81`/`.img` were not done on purpose: Metal Dust needs a SuperCPU (MAME's own note: resets to
  brk-land) and tibdd001 needs the TIB DD-001 cartridge; MAME runs neither.

See [[c64-acceptance-161]], [[tia-audio]].
