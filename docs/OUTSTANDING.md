# OUTSTANDING

Known issues that are measured and explained but not fixed. Each entry says
what is wrong, how it was measured and where to start. Delete an entry when
it is fixed. Measurements are against MAME 0.289 with `tools/mame-oracle.ts`
or `oracle:baseline compare`.

## 1. FROM #237 (PR #239)

Measured against baseline `5a11f2aa`.

### 1.1 Mario's netlist is not compiled

`netlist_mario` (`src/mame/nintendo/nl_mario.cpp`) never compiles. Netlists
are lowered only behind an AY8910 sound plan (`lowerNetlistSound` in
`src/gen/lower-sound.ts`), and Mario has no AY8910: its sound is the M58715's
DAC feeding the netlist. So the board plays the raw DAC.

- The DAC stream is right: 375,844 writes, all zero, the same as a Lua tap on
  MAME's `:audiocpu` I/O space.
- Audio is 6.8 dB under MAME, with the bands up to 55 dB low.
- `m_audio_snd[0].write` and `m_audio_snd[1].write` (the netlist's `SOUND0.IN`
  and `SOUND1.IN`, set by `sound_reset`) are in `KNOWN_UNRESOLVED_CALLS`.

Start by lowering a `NETLIST_SOUND` that has no AY8910, with
`NETLIST_INT_INPUT` (`DAC.VAL`) as a stream input.

### 1.2 Unresolved-call entries match by name, not by game

The acceptance harness passes an unresolved call whenever its name is in
`KNOWN_UNRESOLVED_CALLS`, whichever game reaches it. A game that newly reaches
a listed name passes silently. Two did in #237: `configured` (the ADC0804's
configuration-time `assert()`, spyhunt) and `screen().update_partial`
(System 16A's video control, shinobi). The games column is only checked when
someone runs `tools/unresolved-calls.ts`.

### 1.3 `tools/unresolved-calls.ts` counts a crashed run as reaching nothing

A contract run that ends early still reports its calls up to that point:
"0 unresolved calls (run ended: no result (exit SIGBUS))", or an fps-floor
assertion when the machine is busy. A live entry then looks stale. In #237
this marked rtype's `m_scanline_timer.adjust` and
`machine().scheduler().add_quantum` stale; deleting them failed rtype's
acceptance. Re-run every game whose line says "run ended" before deleting
anything. The tool should do that itself, or refuse to report stale entries.

### 1.4 `oracle:baseline compare` flags fewer comparable frames as worse

elevator's RAM went from 206,866 to 3,208 differing bytes, and the compare
still marked it WORSE ("compared 899 frames, baseline 900"). Its frame
alignment moved from +2 to −1, so one fewer frame lines up. The RAM measure
should compare bytes per compared frame, or report a changed frame count
separately.

### 1.5 Small residuals accepted in #237

Each was measured and judged not worth holding the PR for.

| Target | Residual | Notes |
|---|---|---|
| shinobi | Level 1.54 → 1.80 dB off (contract) and 1.83 → 1.95 dB (no input). RAM is 108 bytes worse over 1200 frames (244,935). | Bands are better. The new first audio write is MAME's MCS-48 reset write (P1 = 0xff). The first RAM difference (frame 1, `soundcpu:fffa`–`fffd`) is unchanged from baseline. |
| carnival | Contract pixels 6,919 → 6,960 over all frames; bands 2.36 → 2.60 dB. Contract onsets: ours 0.10/s against MAME's 1.15/s. | The coin now runs MAME's `coin_changed` and `coin_in`. Why the onsets are low is not known. |
| elevator | Contract onsets 0.72 → 0.92/s off MAME. | Pixels and no-input audio are better than baseline. |
| mslug | Contract bands 3.80 → 3.90 dB. | RAM and no-input audio are better than baseline. |
| zaxxon | 24 pixels differ at frame 2 with no input. Frames 1, 3 and 60 match. | Not known whether this predates #237. |

### 1.6 frogger and scramble are silent in attract

With no input, both play nothing: every AY write sets volume 0, on our side
and MAME's alike. MAME's output still has a DC step when the game unmutes at
frame 98 (`konami_sound_control_w` bit 4 is `system_mute`), and ours does not
(frogger now measures −240 dB, about −68 dB at baseline). So the no-input
audio measures are a ratio of two silences. A likely cause, not verified, is
that our AY renderer produces no DC at volume 0.

frogger's RAM differs by one audio-CPU stack byte (`audiocpu:43fe`) from
frame 44. That was already the first difference at baseline, but it used to
reconverge on some frames and now persists.

### 1.7 Intermediate commits are not tested on their own

The #237 commits are split per item from one working tree. Only the final
tree was generated and swept, and a few hunks that touched two items went in
the later commit. An earlier commit in the range may not pass on its own, so
bisect in whole-PR steps.
