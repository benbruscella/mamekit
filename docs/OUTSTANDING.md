# OUTSTANDING

Known issues that are measured and explained but not fixed. Each entry says
what is wrong, how it was measured and where to start. Delete an entry when
it is fixed. Measurements are against MAME 0.289 with `tools/mame-oracle.ts`
or `oracle:baseline compare`.

## 1. FROM #237 (PR #239)

Measured against baseline `5a11f2aa`.

### 1.1 Mario's netlist is not compiled, so Mario is silent

`netlist_mario` (`src/mame/nintendo/nl_mario.cpp`) does not compile: it holds
devices the netlist compiler does not have (`TTL_74123`, `SN74LS629` VCOs,
`CD4020`, `R2R_DAC`, `CCCS`/`CCVS`/`CS` controlled sources). Since #242 a
netlist that does not compile is left out with a warning rather than
approximated, and Mario's only sound device is that netlist, so the board is
silent (`soundKind: 'none'`). Before #242 it played the raw DAC through a hand
DAC engine, 6.8 dB under MAME with the bands up to 55 dB low.

- The DAC stream is right: 375,844 writes, all zero, the same as a Lua tap on
  MAME's `:audiocpu` I/O space.
- `m_audio_snd[0].write` and `m_audio_snd[1].write` (the netlist's `SOUND0.IN`
  and `SOUND1.IN`, set by `sound_reset`) are in `KNOWN_UNRESOLVED_CALLS`.

Start by lowering the missing devices, then `NETLIST_INT_INPUT` (`DAC.VAL`) as
the netlist's input; the stream mix already runs netlists on the main thread.

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

## 2. FROM #240 (PR #241)

Measured against baseline `64d391a1`.

### 2.1 Venture's RAM drifts further from MAME

Total bytes off MAME over 6,200 frames went from 32,188 to 38,250. The first
divergence is unchanged (frame 2, `maincpu:54`). Pixels are exact on 7 of 7
checkpoints with no input, audio is the same, and the maintainer rates it fine
as played. Venture already diverges through its silent RIOT IRQ (#63). Not
root-caused.

### 2.2 Candidate machines regress unnoticed

spectrum and spec128 broke on `main` after #239 (three stacked gaps, fixed in
#240), and nothing caught it. They are candidate contracts, so only the oracle
runs them. No issue is filed yet.

### 2.3 CI runs at about half local speed

Work that moves into the interpreter, wherever codegen declines it, costs fps
that a local run hides. Removing the direct-screen shapes dropped dkong,
dkongjr, elevator and junglek below their CI fps floors while local runs
still showed 80+ fps. Seven general codegen fixes landed in #241. Any change
that moves work into compiled code should check fps on CI, not only locally.

## 3. FROM EARLIER ITEMS

### 3.1 Centipede's round placement between timers (from #200)

Centipede is pixel-exact at frame 1, but its first RANDOM read after a 4.3 ms
gap lands where MAME's round boundary is not. The attract demo drifts (930
pixels differ at frame 300), and its contract audio onsets are worse.

### 3.2 Marble Madness drift (from #200, larger since #225)

It first differs from MAME at frames 4, 84, 194 and 245, the same as before
#225, then its game logic flips at frame 819. Against baseline `105af76f`,
RAM over all frames went from 54,130 to 373,333 bytes at offset 0. In play it
loses the exact checkpoints at 1800, 2100 and 2400, and contract audio went
from 2.07 to 8.49 dB off MAME across the bands. Its no-input pixels stay
exact, and the maintainer rates the game fine as played. Not root-caused.

### 3.3 Spy Hunter is silent with no input (from #221)

With no input, our attract-mode audio is silent: −39.5 dB against MAME,
which plays 0.13 sound onsets a second. It was the same in the #204 baseline,
so this is old. With contract input it plays, at −6.1 dB. Not traced.

### 3.4 Q\*bert's speech (from #228)

Its Votrax isn't lowered, so its speech doesn't play.

### 3.5 Too few sound onsets with contract input (baseline `105af76f`)

Galaga plays 0.07 onsets a second against MAME's 1.00, and Tutankham 0.51
against 4.95. Not traced.

### 3.6 Phoenix's tune bands (from #236)

With contract input, Phoenix's level is 0.62 dB off MAME, but its 250 Hz band
is −14 dB and its 500 Hz band −9 dB, and it plays 4.4 onsets a second against
MAME's 2.65. One candidate, not established: MAME reads past `tune4`'s end
(its `m_tune_max` is a fixed 96, for a 13-note tune), where we read zeros.

### 3.7 Onsets on AY-fed DISCRETE boards (from #236)

With contract input, gyruss is 1.68 onsets a second off MAME, travrusa 0.63,
junglek 0.59 and btime 0.43, while level and bands match. The AYs render at
their native rate and are averaged to 48 kHz on the way into the table, where
MAME's resampler sits. That is the likely difference, unconfirmed.

## 4. FROM #242 (PR #243)

Measured against baseline `e11059da`.

### 4.1 Gauntlet's compiled TMS5220C reports busy where MAME's is ready

Since the TMS5220C compiles whole (#242), Gauntlet's sound CPU reads the
chip's READY through `switch_6502_r` (`1030`) and sees it busy
(`30`) at frame 440 where MAME sees it ready (`10`). At frame 479 our sound CPU
runs its init again (an extra `mixer_w` write MAME never makes), and from there
its RAM is about 50 bytes further from MAME on every frame (100,457 bytes over
1,800 frames, against 10,227 at baseline). With no input it also plays sound
that MAME and the baseline do not (MAME is exactly silent for the first 30 s).

- The baseline's hand engine matched MAME here, bus access for bus access.
- Between `e172bf9b` (the TMS compiled) and `4a50149c` Gauntlet did not run at
  all (an unresolved `reset()` in `rsq_w`), so no commit bisects it further.
- Ruled out: the device self-reset `rsq_w` calls (stubbed to do nothing, the
  read still differs), emitted struct methods, `started()`, and the new
  `set_unscaled_clock` forwarding.
- Where to start: `ready_read()` and the `set_io_ready` timer
  (`clocks_to_attotime(16)` while the FIFO is full in speak-external mode),
  against when our stream drains the FIFO.

### 4.2 Venture's compiled sound board renders its jingle without its tone

With no input Venture plays one jingle at 7–8 s. Ours is 5.5 dB quieter over the
run and, in the jingle, 9–25 dB short from 250 Hz up: the tone is missing and
what is left falls off evenly from 60 Hz, like a level step. The baseline's hand
engine was within 0.3 dB.

- Every write the sound CPU makes to the 8253, 6840, filter and effects-control
  registers is identical to MAME's over the first 600 frames (`--io
  soundbd:audiocpu:1800-3003:w`), so the difference is in how
  `exidy_sh8253_sound_device` renders, not in what it is told.
- The 8253 runs in mode 0 on both sides (control `0x30`), so its outputs change
  only at terminal count and the tone is not the music path.
- Where to start: the 6840 channels in `sound_stream_update` (the union
  `counter`, `sh6840_apply_clock`, `m_sh6840_volume`), rendered at the board's
  1.79 MHz stream rate.

### 4.3 Compiled chips still off MAME where the hand engines were close

From `oracle:baseline compare --baseline e11059da` on the #242 tree (MAME 0.289).
Each was already present in the first compare of the compiled chips, so none
comes from the later gap fixes. Level and bands are |ours − MAME|, baseline → now.

| Target | Chip path | No input | Contract |
|---|---|---|---|
| mslug | YM2610 (ymfm) | level 0.19 → 21.8 dB, bands 2.2 → 31.2 dB | level 1.2 → 7.2 dB |
| berzerk | Exidy 6840 + S14001A | bands 0.6 → 100.2 dB | same |
| gng, gunsmoke | YM2203 ×2 (ymfm) | level 0.1 → 5.9 dB (gng) | level 0.0 → 6.0 / 3.3 dB |
| ffight, sf2, sf2ce | YM2151 + OKIM6295 | level ~0.1 → 3.8–5.8 dB, bands ~5 → 16–19 dB | similar |
| nbajam, mk | Williams ADPCM (YM2151, OKIM6295, DAC) | small | level 0.05–0.45 → 1.2–5.6 dB |
| ladybug, coleco/dkong | SN76489 | bands 16 → 56 dB, 14 → 27 dB | — |
| wboy | SN76489 ×2 (Sega) | level 1.1 → 5.2 dB | better |
| rampage | Sounds Good DAC + biquads | level 9.6 → 11.6 dB | level 0.9 → 9.8 dB |
| nes/smb1, nes/duckhunt | RP2A03 APU | bands ~1 → 6–10 dB | — |

- The ROM side is in place for mslug: both 8 MB ADPCM regions install into the
  YM2610's spaces (`init_ym`), so its gap is in how ymfm's ADPCM output reaches
  the mix.
- The OKI boards became audible only once `add_int` and the volume table were
  fixed; before that the OKI rendered nothing and the old goldens hid it.
- popeye (AY `set_flags` dropped from a derived config) and xevious (device
  self-reset shadowing `namco_51xx_device::reset`) are fixed; see #242.
