# Changelog

What changed in MAMEKIT, one entry per pull request merged to `main`, newest
first. Each entry says what changed **for players** (machines, sound, controls,
the site) and what happened **under the hood** (the compiler, IR, runtime and
tooling work behind it).

Each heading gives the time the PR merged to `main` (Sydney time, AEST/AEDT),
the merge commit and the pull request.

## Maintaining this file

When a pull request merges to `main`, add its entry at the top of the list,
under **Unreleased** until then:

```
## YYYY-MM-DD HH:MM AEST · `shorthash` · [#N](https://github.com/benbruscella/mamekit/pull/N)
### Short title

**For players:** what someone playing would notice, or "Nothing visible".

**Under the hood:** the technique or the root cause, for developers.
```

The heading values come from
`TZ=Australia/Sydney git log main --first-parent -1 --date=format-local:'%Y-%m-%d %H:%M %Z' --format='%ad · %h'`.
Name machines by their titles, keep entries to facts in the PR and its diff,
and credit nobody by name: attribution comes from MAME's driver headers and
MAMEDEV's release notes (see the README).

## Unreleased

### The Z80 DMA compiles from MAME, and a bus master holds the Z80 as MAME's does ([#214](https://github.com/benbruscella/mamekit/issues/214))

**For players:**
- Mario Bros. plays and sounds as it did, and compares the same against MAME 0.289 on every measure.
- Donkey Kong and Donkey Kong Junior stop their Z80 while the sprite DMA copies, as the real boards do. Their sprite transfers now happen at MAME's instants, and their played-through pictures are closer to MAME's.
- Every machine's VBLANK interrupt arrives when MAME's does, a scanline sooner than before. Against MAME 0.289, Mr. Do!'s and Popeye's RAM match at every frame, Congo Bongo, Donkey Kong Junior, Rampage, Rygar and Zaxxon gain exact frames, and Xevious goes from 32,611 differing pixels to 596.

**Under the hood:**
- A line's frame events (`screen_vblank`, scanline TIMERs, `set_vblank_int`) fire before the processors run that line, where MAME's timer expires; they fired after it. Donkey Kong's frame-5 divergence was this, not its Z80: its first three NMIs now land on MAME's cycle.
- The hand-written Z80 DMA in generated-board.ts is deleted. `z80dma.cpp` compiles as an ordinary device: its sequencer, clocked by its own 4 MHz timer, plus search, RR/WR decoding, `rdy_w` through `synchronize()`, and the daisy-chain interface.
- An in-class method that returns a reference to a member is inlined as a function-like macro, and a `#define` naming one expands. The DMA's every register (`WR0` is `REG(0, 0)`) had lowered to a bare name reading 0.
- Pointer minus pointer gives the count between them in the interpreter's compiled `-`, as `evaluate()` already did.
- `Z80_INPUT_LINE_BUSREQ` lowers to a `busreq` pin the core answers itself, numbered from its header. The board no longer holds the CPU and acknowledges for it.
- A core whose service block hands back its slice parks. It looks again at the next device-timer expiry, bounded by the machine's `set_maximum_quantum`, which is now lowered. The I8257 (Donkey Kong), the Z80 DMA (Mario) and the Taito SJ MCU (Elevator Action) share this path.
- The `halt` pin no longer fires `busack_cb`. MAME's INPUT_LINE_HALT acknowledges nothing.
- `DEVICE_TYPE_BRANCHES` loses `Z80DMA`.
- Mario's one-byte RAM difference at frame 19 is explained in ARCHITECTURE. MAME's Z80 stops mid-instruction at a frame boundary, and ours finishes the instruction first.

### POKEY compiles from MAME, engine and register reads both ([#200](https://github.com/benbruscella/mamekit/issues/200))

**For players:**
- Missile Command's sound and picture are closer to MAME's.
- Centipede plays at MAME's level; it was 11 dB quiet.
- Battlezone still lacks its engine, shell and explosion sounds, which come from a discrete network that isn't converted yet.

**Under the hood:**
- The hand-written POKEY engine, its main-thread read mirror (RANDOM, KBCODE, POT, status) and `pokey-compiler.ts` are deleted. POKEY is an ordinary compiled stream device: sound kind `stream`, or `stream.pcm` into the YM2151 worklet beside it.
- A non-CPU `device_execute_interface` device runs after the CPUs in each round, as MAME's scheduler does. Perfect-quantum boards, hosted processors and bus masters keep the old delivery.
- `machine().scheduler().synchronize(...)` compiles. Struct methods compile. Bank-device ranges get device handlers.
- `constexpr` helpers such as `RES_K` and `CAP_U` expand in device configuration.
- The frame runner rounds a line-fraction carry a hair up before taking whole cycles. 13.9999… had run 13.
- A DISCRETE device no longer takes the board's sound plan from a stream device.
- The stream worklet takes only `*.pcm` writes as samples.
- Emitted code subscripts local C arrays directly, keeps never-escaping constant integer arrays as plain arrays, and calls allocated struct-array elements without probing them.

### Eleven device forks become ordinary devices, and the dead System 16B code goes ([#203](https://github.com/benbruscella/mamekit/issues/203))

**For players:** Nothing visible. Every affected machine compares the same against MAME 0.289 as before.

**Under the hood:**
- Eleven `SPECIALIZED` compile functions are deleted, and those devices compile from MAME's source as any device does: the three input mergers, LATCH8, PIT8253, MOS6532, K051960, K052109, Lady Bug's video, the M68705P5 and Midway's T-Unit video. Five of the forks covered a gap the compiler had since closed.
- A function template is instanced wherever the machine names it: the boards' machine config (`set_clk<0>(...)`, which the graph now keeps as `set_clk_0`), calls through the device's finder, and qualified names in maps and callbacks. An XTAL parameter is its frequency, and an XTAL overload no longer shadows the arithmetic one it forwards to.
- The constructor chain chooses overloads by type, carries brace lists and map constructors down as text, and builds struct members and mapped device spaces from them. The 6805's `m_params` and internal map come from there.
- The body of a constructor that has a brace-list argument or a brace member initializer was read from the wrong brace, which hid every initializer after it.
- A device that only lowers after the C preprocessor is detected by its source including a non-header file, and is preprocessed when it does not lower as written.
- File-scope `src/emu` enums such as `DRAWMODE_*` reach the devices that name them. `evalExpr` evaluates unsigned casts (`~u32(0)`) and integer literal suffixes (`1U`).
- A scoped enum's enumerators are numbered within their own enum: the 6805's `addr_mode::IX1` had taken the disassembler's `md::IX1`.
- A keyword is never a member name. `protected:` before an anonymous enum had made a member called `enum` in eleven devices.
- A device whose `device_start` reads callbacks or tilemaps starts once the board has bound them. LATCH8 had never forwarded a write; the fork's forced `m_has_write` hid it.
- Deleted as dead:
  - `system16b-layers`, the `SEGA_SYS16B_SPRITES` board branch, and generated-video.ts's only `SEGA_SYS16A_SPRITES` branch;
  - the `MOS6532` register decoding in generated-board.ts, with its regex fallback, since all three RIOT boards already reach MAME's `ram_map`/`io_map`.
- The guard lists shrink:
  - `SPECIALIZED_COMPILERS` from 17 to 6;
  - `REPLACED_METHODS` by 5;
  - `DEVICE_TYPE_BRANCHES` by 3;
  - `DIRECT_SCREEN_SHAPES` by 1.
- `oracle:baseline compare` no longer calls an unchanged wrong-size picture worse (`Infinity - Infinity` is NaN).

### ZX Spectrum cartridges load under MAME's region name, and candidate contracts run where a failure is seen ([#208](https://github.com/benbruscella/mamekit/issues/208))

**For players:** Nothing visible. Interface 2 cartridges such as Jetpac already played in the browser.

**Under the hood:**
- A declared `std::string`, and a cast to one, was narrowed to a number, so `device_generic_cart_interface::rom_alloc` named every generic cartridge's ROM region `"0"`. A `std::string` now keeps its text.
- `append`, `c_str`, `data`, `size`, `length` and `empty` are lowered in the interpreter and in device codegen (`runtime.stringMethod`). `append` stores the new text back into its receiver.
- The tracing stripper took `logerror(...)` but left its receiver, so `device().logerror(...)` became `device().TRACE_NOOP()`, a member call nothing answers. The receiver now goes with the call.
- `tag()` on a card's child answered the slot's tag. It now answers the device's own, so the Interface 2's cartridge ROM is `exp:intf2:cartslot:cart:rom`, as MAME names it.
- `npm run test:candidates` runs every candidate contract locally, and CI runs it only when started by hand: on a PR the job shows as skipped. The matrix takes `--timeout <minutes>` for contracts longer than its 5-minute cap. The Spectrum cartridge had failed the strict harness unseen since #182, because nothing ran candidates. CI's MAME checkout gains the Spectrum software lists, so CI generates the Spectrum with its shelves as a local build does.
- The ZX Spectrum and Spectrum 128 goldens are re-recorded. They were already stale before this change.

### The MAME oracle compares Galaxian, Scramble, Frogger, Jump Bug, Zig Zag, Tutankham and Juno First at MAME's own screen scale ([#207](https://github.com/benbruscella/mamekit/issues/207))

**For players:** Nothing visible.

**Under the hood:**
- MAME draws these screens 3x wider than the board's 256 pixels (`GALAXIAN_XSCALE`), so every frame the oracle compared was a size mismatch. It now repeats each of our pixels 3 times along the board's horizontal axis, after rotation, and compares at MAME's resolution.
- The factor comes from `scaledScreen` against MAME's `-listxml`, never from the pictures, so a plain width error is still a size mismatch. MAME's picture is never shrunk, which would average away its sub-pixel stars.
- Run reports and the baseline record `pixels.scale`, and the side-by-side PNGs show both pictures at MAME's size.
- The 7 machines' pixels were re-taken into baseline `090275cf`. Frogger, Juno First and Zig Zag with no input are pixel-exact against MAME. In Galaxian's checked frame, every differing pixel is a star.

### A MAME baseline for every contract scenario, and a command that judges a change against it ([#204](https://github.com/benbruscella/mamekit/issues/204))

**For players:** Nothing visible.

**Under the hood:**
- `npm run oracle:baseline -- record` runs every contract scenario through `tools/mame-oracle.ts` twice. The first run has no input and measures pixels, RAM and audio. The second has the contract's own input and measures pixels and audio. That is 107 scenarios of 92 targets, taken from the contracts rather than listed by hand.
- Results go to `.cache/oracle/baseline/<commit>/`, together with each step's arguments and the commit, `src` tree, MAME, Node and dist build that produced them. No oracle run or generation writes there.
- `compare <targets>` re-runs the stored plans and says better, same or worse for each of five measures. It exits 1 when any is worse. `show` lists every scenario that could not be measured, and why.
- `tools/mame-oracle.ts --audio` records MAME with `-wavwrite` and sets that against our own capture, so the audio heard is the run's own input and title. `--out` writes one invocation's runs to their own file.
- MAME gets its sample sets from `.data/samples` (`-samplepath`), as it gets its sets from the library, never from a `mame.ini`. `record <targets> --redo <measures>` re-takes measures by name when MAME's reference changes.
- RAM ranges taken from the board now leave out a processor that a boot lacks. A C64 tape, cartridge or quickload leaves the 1541 out, and the oracle refused those runs.
- `compare-audio.mjs` writes `compare.json`. `compare-game-audio.ts`:
  - takes `--scenario`;
  - loads candidate contracts;
  - gives MAME the scenario's cartridge. Before, `nes` booted Super Mario Bros. 3 on our side against an empty MAME slot.

### Every piece of hand-written hardware pinned by name, apart from the host ([#201](https://github.com/benbruscella/mamekit/issues/201))

**For players:** Nothing visible.

**Under the hood:**
- `src/runtime/architecture.spec.ts` declares `HOST_BOUNDARIES`, with a reason for each entry: the `SCREEN` and `VECTOR` hosts (moved out of `DEVICE_TYPE_BRANCHES`), the shared stream worklet and the offline probe's resampler.
- Three new exact, shrink-only lists cover what no guard did:
  - `REPLACED_METHODS`: the 25 `replaceMethod` sites in `src/hardware/device/extract.ts`;
  - `SPECIALIZED_COMPILERS`: the 17 types compiled by their own function;
  - `HAND_WRITTEN_ENGINES`: 81 classes in `src/hardware` and in the compilers' emitted worklets.
- An added entry fails the spec with its name, and so does a removed one until it is deleted from its list.
- ARCHITECTURE's "What is still hand-written" cites these lists as its source of truth. #178 is done when all five are empty.

### The oracle replays every contract in MAME, and four of the gaps it found ([#198](https://github.com/benbruscella/mamekit/issues/198))

**For players:** Spy Hunter's picture is no longer drawn 16 lines low: its text layer now has MAME's scroll, because the machine's own video start finally runs. A cabinet toggle switch (Defender, Joust and Robotron's Auto Up / Manual Down, Pole Position's gear change) takes effect a frame after it is pressed, as on MAME. Centipede's, Marble Madness's and Missile Command's reversed trackball axes, and the ColecoVision's driving wheel, roller and Super Action slider, start where MAME's do. Donkey Kong and Donkey Kong Jr. now run their video start, as do Centipede, Crush Roller, Ms. Pac-Man, Pengo and R-Type.

**Under the hood:**
- `tools/mame-oracle.ts --input contract` now replays all 102 contracts. Analog controls (pedal, paddle, stick, dial, trackball, light gun) are given to MAME as the value our port read each frame (`InputRecorder`), not as key presses. MAME 0.289's `analog_field::set_value` override is read at once and replaces the whole port, so analog values keep their frame, and `oracle.lua` refuses an analog field that shares its port.
- Every run now compares what both sides' ports read on every frame.
- `oracle.lua` survives MAME rerunning its autoboot script after every reset.
- Our side counts frames on through a reset, which resets the board's frame counter but not MAME's. Joust and Robotron are pixel-exact against MAME through their reset.
- MAME snapshots use `-snapview native`.
- `KeyboardInput` shows a toggle's flip at the next frame boundary (MAME's `update_defvalue` runs before the fields update).
- A `PORT_REVERSE` relative field starts at its mask, because MAME reverses x to ~x.
- `IPT_DIAL` honours `PORT_REVERSE`.
- `MCFG_VIDEO_START_OVERRIDE` and `MCFG_MACHINE_START_OVERRIDE` are read through the base configs a machine config calls.
- `VIDEO_START_CALL_MEMBER(x)` lowers to a call of `video_start_x`.

### The Z80 CTC compiled from MAME, and IM 2 vectors through the Z80's daisy chain ([#181](https://github.com/benbruscella/mamekit/issues/181))

**For players:** Rampage's attract demo stays with MAME's for longer. It used to run two frames ahead of MAME's and drift from about frame 600; now it keeps MAME's frame, and at frames 600 to 1200 it differs from MAME's picture by a tenth to a quarter as many pixels as before. Spy Hunter plays as before.

**Under the hood:** The Z80 CTC used to be hand-written twice: `compileZ80Ctc` replaced ten of MAME's methods, and a runtime model in `generated-board.ts` advanced its timers once a scanline and handed the CPU its vector. Both are gone, and `Z80CTC` is off `DEVICE_TYPE_BRANCHES`. `z80ctc.cpp` compiles as it stands, with its four `z80ctc_channel_device` children, their `emu_timer`s and the daisy-chain methods. Every gap this exposed was general and silent:
- A `required_device_array` builds one child per element, tagged from its finder's format (`ch0` to `ch3`).
- `device_add_mconfig` runs once at generation, so `m_channel[ch]->m_index = ch` numbers the channels.
- A child handle exposes the child's members as well as its methods.
- `DEVICE_SELF_OWNER` finds the owner, and a device answers `clock()` and `clocks_to_attotime` to whatever holds it.
- A child added with no clock has clock 0, as in MAME.
- A reset runs `device_reset`, then the children, then `device_reset_after_children` and `interface_post_reset`.
- A namespace-scope `const uint8_t Z80_DAISY_INT = 0x01;` is read as a constant. Unread, it was 0, so no daisy device could raise an interrupt.

That reset order now runs the Game Boy cartridge slot's `device_reset_after_children` too. All it does is log the cartridge header, but it reaches three calls MAMEKIT cannot answer yet: `machine().disable_side_effects`, `cartheader::checksum` and the device's `memregion`. These are listed as known gaps for `gameboy`. A base call to one of `device_t`'s empty lifecycle defaults is declared as such in `framework-calls.ts`.

The Z80 now compiles `z80daisy.cpp`'s chain walk. The machine's `set_daisy_config` table, which for MCR sits in `mcr_m.cpp`, becomes the CPU's `daisyChain` in the IR. The board links the chain as `daisy_init` does, so the core takes its IM 2 vector from `z80daisy_irq_ack()` and signals RETI to the chain. A call through a pointer local (`intf->z80daisy_irq_ack()`) used to be emitted as 0 and is now a call.

### Sound writes timed by the processor that makes them, and Gauntlet's mixer, speech and POKEY as MAME has them ([#196](https://github.com/benbruscella/mamekit/pull/196))

**For players:** Mat Mania's sampled bell and count and Gyruss's drums and voices are clean again, where they had been a noisy smear. Gauntlet's speech is no longer harsh: it matches MAME's brightness while it speaks. The click when Gauntlet's sound board leaves reset is gone, and the game's own volume settings for its music, effects and speech now apply. POKEY sound effects in Gauntlet, Marble Madness, Missile Command, Centipede and Battlezone no longer fold ultrasonic tones back into the audible range.

**Under the hood:** A sound write was stamped with the progress through the whole scheduler round, so a round of several lines squeezed its writes into its last line, and some ran backwards (37 games). `GeneratedFrameRunner.runningFrameLines` now gives the running processor's own position from the frame's origin, including where a slice overran to, and `frameLines()` adds the cycles of the current instruction, as MAME's `machine().time()` does. No DAC writes run backwards any more in Mat Mania (4.4% before) or Gyruss (0.22%). `ALL_OUTPUTS` resolved to nothing and read as 0; it is now 65535, from `emu/disound.h`. The OPM worklet, which had no `set_output_gain` handling at all, scales a YM2151's outputs and an auxiliary device's route gain. MAME's default stream resampler, `audio_resampler_lofi` from `src/emu/resampler.cpp`, is now emitted once as a shared piece (`src/mame/lofi-resampler.ts`). The POKEY's 1.79 MHz stream and the TMS5220's 8.1 kHz speech both go through it, instead of keeping one sample in 37 and holding each sample. The OPM worklet's other sample-and-hold devices (OKI, K007232 and others) still hold, and are next.

## 2026-10-25 23:13 AEDT · `8ae66b11` · [#193](https://github.com/benbruscella/mamekit/pull/193)
### Node 26.12.1, and no catch on the emulation path hides an error

**For players:** Nothing visible.

**Under the hood:** `.nvmrc` moves from Node 26.8.1 to 26.12.1, which takes V8's fix for object literals sharing their double fields under Maglev OSR (nodejs/node#66457), with `@types/node` ^26 and Playwright 1.64 to match. Two catches on the emulation path no longer swallow errors: a cartridge whose installer throws (a stack overflow included) used to carry on half-mounted, and the save-state walker turned any setter error into a "cannot assign" diagnostic. `installSlotCard` now checks for an installer by presence, and only a TypeError counts as a refused slot. The non-determinism in [#190](https://github.com/benbruscella/mamekit/issues/190) is narrowed to V8, not fixed: a whole contract fits in a 75 KB stack, the emulation path has no clocks, randomness or threads, and Bubble Bobble still diverged once and crashed natively twice in 50 runs.

## 2026-10-25 21:36 AEDT · `938a8466` · [#192](https://github.com/benbruscella/mamekit/pull/192)
### PlayStation pads: Sony's names, console Select and Start in order, and a DualShock 4 on the home page

**For players:** A DualShock 4 or DualSense is recognised by name, and the control legend shows the buttons as Sony prints them: □ △ ✕ ○, L1/R1/L2/R2 and Share/Options. On the NES and Game Boy, a pad's Select and Start buttons are now Select and Start, in that order. The home page's Controllers section has a "Wireless" card with a drawing of a DualShock 4 and pairing steps.

**Under the hood:** `gamepad.ts` detects Sony pads by USB vendor id `054c` in the Chrome/Safari and Firefox id formats. Where the browser gives no ids, as Chrome-family browsers on macOS 26 do, it detects them by the bare name `Wireless Controller (STANDARD GAMEPAD)`; a pad that carries ids is never taken for Sony by name. `IPT_SELECT` maps to standard button 8 and `IPT_START` to 9, and the arcade cabinet rule for `IPT_START1`/`IPT_COIN1` is unchanged. The home page's drawing takes its labels from the same table the gamepad poll uses.

## 2026-10-25 19:06 AEDT · `d8d5ce68` · [#191](https://github.com/benbruscella/mamekit/pull/191)
### NES VRC7 sound: ymfm's OPLL compiled from MAME

**For players:** Konami VRC7 cartridges play their FM music: Lagrange Point is heard, with its music starting at the same moment as in MAME. A VRC7 cartridge asks for `ds1001.zip`, the chip's instrument ROM that MAME also requires, the way the ColecoVision asks for its BIOS. No other cartridge asks for it.

**Under the hood:** The DS1001 (a Yamaha OPLL) compiles from MAME's bundled `3rdparty/ymfm` library with no diagnostics, and matches a native clang build of ymfm on all 46,100 samples of a register script. The device compiler gained class templates compiled per instance, held objects built by their own constructors, `using` aliases across classes, reference and `mutable` members, class constants that shadow the flat cross-file table, and non-const reference arguments that write back. A reference bound to a call's result is now evaluated once; as an l-value it re-ran `output->clear()` on every read, so only the last channel was heard. A device child that does not lower is now reported instead of vanishing (18 in a clean build). Lagrange Point runs at 81 fps in the Node harness with music playing, up from 29. The app's `tsc` check now declares JSON imports opaque, because inferring the generated IR's literal types took the clean build past its 8 GB heap.

## 2026-10-25 09:48 AEDT · `5a907b2a` · [#189](https://github.com/benbruscella/mamekit/pull/189)
### NES part 3: MAME's power-on origin on every board, and 314 of 344 NES boards pixel-exact

**For players:** Every machine now starts its first frame where MAME does, at the start of VBLANK, and presents each frame at MAME's snapshot instant. Sound writes are no longer stamped out of order where the frame wraps past line 0, which had garbled Gyruss and Mat Mania. On the NES, the G-101, JF-24 and TQROM boards and the bottom line of the picture now match MAME. Duck Hunt matches MAME to frame 1100, and 314 of 344 NES cartridge boards are pixel-exact at frame 1500, up from 272.

**Under the hood:** The frame runner starts at `vbstart` and runs frames from VBLANK to VBLANK; screens whose VBLANK wraps to line 0 keep origin 0, and the `present: 'frame-boundary'` flag is gone. Sound timestamps, trackball interpolation and the Neo Geo clock measure the frame from that origin. The 6502 runs reset as its first instruction, sees timers as MAME's cycle-suspending core does (a catch-up before every device access and a two-cycle lookahead before each instruction), and converts method arguments to their declared C types. Line 239 keeps the previous frame because device time is held just short of `vbstart` until the frame is presented, as MAME's `remaining()` check implies. Cartridges' own input ports read their declared defaults. Every acceptance golden was re-recorded for the origin change.

## 2026-10-24 11:48 AEDT · `7ebbb098` · [#183](https://github.com/benbruscella/mamekit/pull/183)
### NES part 2: the MMC5 at full speed and in step with MAME, and the MMC5 and Sunsoft 5B heard

**For players:** Castlevania III runs at full speed: an MMC5 frame takes 11 ms instead of 40. The NES no longer starts a frame behind MAME. MMC5 PCM and the Sunsoft 5B's sound are audible. Every MMC5 battery cartridge boots, and multicarts that count resets start on their first game. 272 of 344 NES boards are pixel-exact against MAME at frame 1500, up from 248.

**Under the hood:** Device codegen treats one-line inline accessors as roots, so `get_draw_phase` and its kind stop running in the interpreter 30,000 times a frame, and each device keeps one prepared call per method. Device-facing beam reads measure from the real beam until the first line boundary. `ay8910.cpp` now lowers, after eight general fixes: `#if` on a parenthesised define, if-with-initializer, class-sized array bounds, qualified static tables, constructor bodies run at generation, `make_unique` float arrays, smart-pointer `get()` and struct methods. Silent zeros on the cartridge load path are fixed: `strncmp` (every MMC1 read as an MMC1B), battery load and save, `sscanf` and `emu_timer::reset()`. The NES package no longer declares a second `pcb_reset` by hand, and iNES images use the NES 2.0 exponent size form.

## 2026-10-24 00:06 AEDT · `46a00db1` · [#182](https://github.com/benbruscella/mamekit/pull/182)
### Fix MAME calls that answered a silent 0, with a census and strict contracts

**For players:** Coin lockout works as in MAME, so Final Fight refuses coins while it locks them out and Metal Slug's coins unlock. Battlezone, Frogger, Scramble and Up'n Down mute their sound when the game asks to, as in attract mode. Spy Hunter's sound board is connected to the game: its wheel, pedal and music board were wired through three delegates that had been dropped.

**Under the hood:** `tools/unresolved-calls.ts` counts every call that resolved to nothing, and `src/ir/framework-calls.ts` declares the calls answered on purpose, each with its reason. Every contract now fails on an unresolved call in neither that list nor the known-gaps list, which went from 146 to 135. Fixed: `std::begin`/`end`/`fill`/`min_element`/`max_element`, `system_mute`, virtual overrides that call their base (kept as `method__base` handlers), `HOLD_LINE` and the interrupt acknowledge for generated processors, `machine().time` in board handlers, and forwarding-delegate setters recognised by their shape.

## 2026-10-23 10:22 AEDT · `796a95e2` · [#177](https://github.com/benbruscella/mamekit/pull/177)
### The 68705 and Z80 PIO compile from MAME, and the docs catch up

**For players:** Arkanoid and Elevator Action now run their protection MCU from MAME's own source, at the same accuracy against MAME as before and at full speed. Wonder Boy's Z80 PIO is generated too, and is still pixel-exact.

**Under the hood:** The last two hand-written chips in `src/runtime` are deleted. The 68705 compiles from `m6805.cpp`, `6805ops.hxx` and `m68705.cpp` through the C-preprocessor route. It needed opcode-handler macro heads, template handlers instantiated from the opcode tables (enum arguments included), member-function-pointer dispatch, MAME `PAIR` registers and the device's own address map. Five silent general bugs surfaced:
- out-of-class `const noexcept` methods were never parsed, so the MCU ran four times too fast;
- `machine_config const &` constructors credited a device's finders to the wrong class, giving Elevator Action's interface and Space Invaders' SN76477 the wrong tags;
- `m_mcu->set_input_line` from a composite parent answered 0;
- RESET now suspends and restarts the core as `diexec.cpp` does;
- Elevator Action's hand-written port listeners ran on top of the interface's compiled handlers, so every port write happened twice.

`architecture.spec.ts` and `audit:generated` now reject new hand-written hardware, with shrink-only allowlists. What remains hand-written is tracked in [#178](https://github.com/benbruscella/mamekit/issues/178). All of `docs/` was checked against the code and rewritten.

## 2026-10-23 01:19 AEDT · `9a563748` · [#175](https://github.com/benbruscella/mamekit/pull/175)
### Compare any machine against MAME, with the result on its page

**For players:** Each machine's page and the console room's About panel can now show a "Checked against MAME" line, such as "Pixel-exact against MAME 0.289 at frames 300, 600, 900". The archive gains a matching filter. Machines nobody has checked show nothing.

**Under the hood:** `tools/mame-oracle.ts` runs a generated machine next to a MAME binary of the same release, with the same input, and compares pictures, RAM every frame, or bus traffic over an address range. A `--survey` mode grades one title per cartridge board: 248 of 344 NES boards were pixel-exact at frame 1500. The MAME side is one Lua script with known pitfalls built in, and `src/gen/oracle-result.ts` ships each summary as `oracle.json`. `tools/` is now type-checked with the rest of the tree, and five dead or broken tools were removed.

## 2026-10-22 18:47 AEDT · `e41169ae` · [#169](https://github.com/benbruscella/mamekit/pull/169)
### NES: every MAME cartridge board, the Zapper, the Vaus and cartridge sound

**For players:** All 402 NES cartridge boards in MAME's list now compile, and cartridges load the way MAME loads them. Duck Hunt works with the Zapper (aim with the pointer), Arkanoid with the Vaus paddle, and Namco 163 and VRC6 cartridge sound is audible. Mr. Gimmick, Gemfire, Esper Dream 2 and Abadox were pixel-exact against MAME at frame 1500.

**Under the hood:** The slot mounts software-list parts through MAME's own `call_load_pcb` and `call_load_ines`, and each card type is a separate module loaded on demand (21 MB on disk instead of 50 MB inline). New light-gun input, absolute paddles, and a screen that answers `pixel(x, y)` for the Zapper's sensor. Card sound devices mix into the NES worklet at their route gain, with native-rate streams averaged down to 48 kHz. Ten silent compiler gaps were fixed, among them C++ character literals read as strings and nested structs leaking fields into their outer struct.

## 2026-10-21 14:13 AEDT · `9ce5bcfe` · [#168](https://github.com/benbruscella/mamekit/pull/168)
### Retry generator workers that crash with SIGILL

**For players:** Nothing visible.

**Under the hood:** Node 26 on macOS arm64 reports V8 faults in JIT code as SIGILL. That is the same intermittent crash older releases reported as SIGBUS or SIGSEGV, so `retryableGeneratorSignal` in `src/gen/generator-workers.ts` now retries it too.

## 2026-10-21 13:27 AEDT · `64285b84` · [#166](https://github.com/benbruscella/mamekit/pull/166)
### ZX Spectrum 48K and 128K, with tapes, cartridges and snapshots

**For players:** The ZX Spectrum 48K and 128K (with the +2) are playable. They load tapes (TZX, TAP, WAV), Interface 2 cartridges such as Jet Pac, and `.sna`/`.z80` snapshots. Play types the right LOAD command for you. The 48K boot and the 128K menu are pixel-exact against MAME 0.289, and the 128K's AY sound plays.

**Under the hood:** The ULA, contention, beeper, AY, tape formats, Interface 2 and snapshot loader all come from compiled MAME source. A new `stream` sound kind plays main-thread stream devices such as the beeper and cassette through a shared worklet. Generic fixes include 128K bank arrays over RAM pointers, `space().specific()` accessors (without them every 128K opcode fetch read 0), screens that honour horizontal beam position, and `frame_number()` counted at `vblank_end`, which made FLASH work. A full sweep caught regressions in Missile Command, Up'n Down and Neo Geo audio banks; all were fixed before merge.

## 2026-10-20 20:01 AEDT · `10dbb807` · [#164](https://github.com/benbruscella/mamekit/pull/164)
### Commodore 64: one-click play, cartridges, quickload and MAME-exact raster timing

**For players:** C64 titles now start with one click. Play types the LOAD and RUN commands, and the machine fast-forwards while a tape or disk loads. Cartridges (465 C64 and 28 VIC-10 titles), `.prg`/`.t64` quickload and `.wav` tapes work. There is one C64 tile covering PAL and NTSC, an on-screen keyboard, a joystick-port swap, paste, and an automatic resume when you come back. Batman, Pac-Man and others are pixel-exact against MAME 0.289.

**Under the hood:** Under `set_perfect_quantum`, an executing device (VIC-II, CIA) is now caught up to cycle k−1 before a CPU access on cycle k. That matches MAME's one-cycle slice. A nested-array `memcpy` aliased rows and drew sprites 0 and 1 a line early, and CPU clocks are now u32 as in MAME. The emitted handler runtime was a V8 dictionary-mode object; making it a plain object gave tape fast-forward about 2.7x real time and disks real-time speed.

## 2026-10-18 22:46 AEDT · `41e51d12` · [#163](https://github.com/benbruscella/mamekit/pull/163)
### A ROM library that audits, imports and tidies every system's dumps

**For players:** Nothing changes in play. Console BIOS sets now live in each console's own folder (`consoles/coleco/bios/`), and the old location still works as a fallback.

**Under the hood:** `tools/rom-library.ts`, driven by `make -C .data roms-*`, identifies dumps by size, CRC32 and SHA1 against MAME's own lists, never by file name. It reads nested zip, 7z and rar archives without unpacking them to disk, and files sets in the shape MAME loads. The supported systems are derived from the game contracts, so no machine is listed by hand. Nothing is deleted: unclaimed files go to quarantine with a log. One root cause fixed: blank `$FF`/`$00` banks made C64 cartridges "match" ColecoVision chips.

## 2026-10-18 13:19 AEDT · `e28f259f` · [#160](https://github.com/benbruscella/mamekit/pull/160)
### Commodore 64: artwork, one media panel, a working 1541 and faster disks

**For players:** C64 disks work. The 1541 drive is compiled from MAME, so disk shelves are playable and you can insert your own `.d64` or `.g64`. The tape and disk controls are one panel with a loading badge and a drive lamp, and the machine has a photograph. Tape titles run at full speed again, because a transport is only attached when the title needs it. NBA Jam runs about 17% faster.

**Under the hood:** `src/hardware/floppy/` and `src/mame/floppy-compiler.ts` lower `floppy_image_device` and every format a connector registers. Timers that fall due mid-instruction now fire as on MAME's 6502 (`suspendsMidInstruction`). This fixed a tape Play that snapped back to STOPPED about one press in five. C64 power-on RAM now comes from `machine_start`, and Cauldron then matched MAME's 182,525 SID writes in order. Disk speed came from general codegen: per-field struct copies, compiled line handlers, and dropping constant-false branches.

## 2026-10-16 11:46 AEDT · `60ef268f` · [#156](https://github.com/benbruscella/mamekit/pull/156)
### Fix the NES and Game Boy blank screens, and accept each console against a real cartridge

**For players:** The NES and Game Boy draw again; both had booted to one flat colour. Super Mario Bros. 3's status bar is back, and ColecoVision Donkey Kong draws its bottom row. Super Mario Bros., SMB3, Tetris, ColecoVision Donkey Kong and Atari 2600 Combat are now tested on every change.

**Under the hood:** The per-line settle ran the device clock a round ahead of the CPU, so the 2C02's beam timer kept missing and never reached VBLANK. Settling to where the CPU actually stands, slice overrun included, fixed it. The Game Boy's `palette_gb` file-scope table never reached the palette program, so every pen was black with no diagnostic. The MMC3 IRQ compared against a foreign enum constant that resolved to nothing. A k051960 timer was handed to the wrong member in source order. Consoles now have acceptance contracts, so a blank screen fails CI.

## 2026-10-15 14:55 AEDT · `cea53f31` · [#154](https://github.com/benbruscella/mamekit/pull/154)
### Make hardware choices at compile time and remove three handwritten runtime pieces

**For players:** No new games. The Simpsons' old save states are refused, because its EEPROM now uses MAME's layout. A save that fails to load now leaves the running game untouched instead of half replaced.

**Under the hood:** The Simpsons' serial EEPROM, the Williams screen and palette, and the Galaxian object-RAM fast path were handwritten runtime code. They are replaced by MAME's own compiled code. Video shape choices are now written into `BoardIr.videoExecution` at compile time, so `src/runtime` no longer searches handler text (115 `body.includes` checks down to none). `src/gen/generate.ts` went from 3,354 lines to 46, split into lowering modules. Runtime certification gaps moved into each game's contract.

## 2026-09-24 12:25 AEST · `a2149360` · [#153](https://github.com/benbruscella/mamekit/pull/153)
### Add BurgerTime, Bump 'n' Jump, Missile Command and Battlezone

**For players:** Four new arcade games: BurgerTime, Bump 'n' Jump, Missile Command and Battlezone. BurgerTime and Bump 'n' Jump are pixel-exact against MAME through 3,000 frames of attract, and their sound is within 0.1 dB of MAME. Battlezone draws its vectors over its backdrop with the red and green overlay. Battlezone's engine and explosion sounds are still missing. Mortal Kombat gains its missing buttons, and twin-stick legends are clearer.

**Under the hood:** The DECO CPU-7 and C10707 encrypted 6502s lower from their `mi_decrypt` overrides. The 6502 fetch is now lowered from MAME's `prefetch_start`/`prefetch_end`, which adds SYNC and makes an IRQ take MAME's 7 cycles. Discrete op-amp and CR filter networks lower node by node in volts. Battlezone's AVG and mathbox are generated devices; that took `goto` between switch cases, wrapping fixed-width arrays, and fixing emitted `>>` that was always `>>>`.

## 2026-09-21 13:34 AEST · `7f39d08e` · [#150](https://github.com/benbruscella/mamekit/pull/150)
### Add Bomb Jack and Hyper Sports, and give Track & Field its speech

**For players:** Bomb Jack and Hyper Sports are playable, both pixel-exact against MAME 0.289 at the frames checked. Track & Field now has its VLM5030 speech and DAC sound, and it speaks at the same moments MAME does. Bomb Jack's long "PUSH BUTTON FOR CHECK" screen at power-on is authentic; MAME shows it for as long.

**Under the hood:** The VLM5030 is compiled from `vlm5030.cpp` as an ordinary generated device. That needed forward `goto` lowered as a flag and a one-pass loop, `.hxx` includes, and file-scope coefficient tables lifted as constant members. A device `#define` containing `/` was read only up to the slash, which made speech run about twice as long. Bomb Jack needed templated config helpers, owner-class submaps and multi-declarator constants; dropping the extra names had lost the sprite loop's bound. The device-finder Proxy now answers JavaScript and save-state protocol names itself instead of forwarding them as MAME calls.

## 2026-09-17 17:11 AEST · `90d4ebff` · [#146](https://github.com/benbruscella/mamekit/pull/146)
### Emulate the four-way lever gate, and stop losing quick taps

**For players:** Four-way games such as Donkey Kong, Pac-Man, Dig Dug and Mr. Do now read a diagonal the way their cabinet lever would. You no longer walk past the ladder you meant to climb. Quick taps that pressed and released within one frame are no longer lost, and real arcade sticks behave better in corners and when a switch bounces.

**Under the hood:** `PORT_4WAY` was parsed but never lowered. It now reaches each binding as `ways`, and `KeyboardInput.advance()` runs MAME's own `digital_joystick::frame_update` once per lever per frame. Three host-side departures for USB sticks are commented as such: newest press wins on opposite directions, a corner from rest follows the stronger axis, and debounce is counted in pad polls. A press is now held for the frame it arrived in. No golden moved; all 76 real-ROM contracts pass.

## 2026-09-16 15:48 AEST · `dcaccd17` · [#145](https://github.com/benbruscella/mamekit/pull/145)
### Enable the disabled games, add Marble Madness, and use MAME's timeslices

**For players:** Wardner, Spy Hunter and Sinistar are now playable, and Marble Madness is added with a working trackball. Out Run was removed. Gauntlet's attract mode is silent again, as on MAME. Menu tiles gain EXPERIMENTAL, INSERT ROM and PLAY sashes.

**Under the hood:** The 68010 was a relabelled 68000. It now compiles Musashi's 68010 variant, including the prefetch re-read that Marble Madness's slapstic counts. `synchronize()` and `perfect_quantum` now follow MAME, with round length taken from a scanline timer's own cadence. Before, a 190 µs boundary split Gauntlet's 13 µs sound-latch burst. A `#define` regex using `\s` made every include guard swallow the next line and lose its first constant. `tools/mame-ram-oracle.ts` measures RAM distance from MAME instead of agreement with a golden.

## 2026-09-11 21:43 AEST · `fe9212b6` · [#141](https://github.com/benbruscella/mamekit/pull/141)
### A two-player lobby you can follow, and a toolbar

**For players:** Inviting a second player is now a dialog that does one step at a time. It builds the invite as it opens, shares it in one action, copies the reply for the joiner, and takes the reply pasted anywhere on the page. Leaving is its own button, Esc closes the lobby instead of leaving the game, and the title row's six pills became a grouped toolbar. A joiner on a one-slot cabinet such as Space Invaders can now insert a coin.

**Under the hood:** The lobby is a state machine over the existing WebRTC offer/answer transport, with a clear error for each failure. One shared button style now lives in `src/runtime/controls.ts`. The only behaviour change is in `src/runtime/session.ts`: player two's coin maps onto the single slot when the cabinet has no second one.

## 2026-09-11 17:32 AEST · `54b74f11` · [#139](https://github.com/benbruscella/mamekit/pull/139)
### Attribution from MAMEDEV's records, and machine facts checked against MAME

**For players:** Machine pages credit people from the driver's `copyright-holders` line and MAMEDEV's published release notes. Commit counts appear separately, labelled as commit activity. The README and home page now state plainly that a deterministic compiler generates the code, with no language model in that path, and how machines are verified.

**Under the hood:** `src/gen/release-notes.ts` and `driver-attribution.ts` parse the release notes (0.100 to 0.289, plus the MESS notes) and join them to drivers. `npm run audit:facts` compares every machine's name, year, maker, screen, clocks and ROMs against MAME's own `-listxml` from a binary of the same release. Of 175 first-run disagreements, 173 were shape mismatches such as u32 clocks. The two real ones: unrecorded `ROM_IGNORE` bytes, and the Galaxian family's 3x-wide screens, which are now reported on every run as a known divergence.

## 2026-09-10 20:18 AEST · `18f72821` · [#135](https://github.com/benbruscella/mamekit/pull/135)
### Two-player netplay: invite somebody into your game

**For players:** Press 2 player to get a link for a friend. They open it with their own copy of the same ROM set and take player two, in their own browser, frame for frame. Nothing passes through a server, and no ROM or machine state crosses the link, only the inputs.

**Under the hood:** `input.ts` now delivers input only at frame boundaries, in four phases that reproduce the old timing exactly. `session.ts` logs which frame each event belongs to, so a peer's press replays into the same frame. The WebRTC offer travels inside the invite link, compressed, and the answer comes back as a pasted code. Both machines restart from their own boot snapshot and compare a fingerprint every 60 frames to catch divergence.

## 2026-09-10 10:54 AEST · `baf0cd96` · [#133](https://github.com/benbruscella/mamekit/pull/133)
### Keep the ROM, NVRAM and high scores in the browser

**For players:** A dropped arcade ROM set is kept in your browser, so the next visit boots straight in. Forget ROM removes it. Battery-backed memory persists for games such as Joust, Robotron, Defender and Q*bert, and 64 machines keep their high-score tables between visits.

**Under the hood:** Every share or region an `NVRAM` device declares is loaded before the first frame and saved on change and on `pagehide`, as `nvram_load`/`nvram_save` do. MAME's `plugins/hiscore/hiscore.dat` is compiled into each target's `config.json`, and the shell runs the plugin's own logic against the generated board. The project policy changes: a visitor's own dump may be kept in their own browser, but the site still never serves, commits or deploys a ROM.

## 2026-09-09 13:15 AEST · `7686baa8` · [#130](https://github.com/benbruscella/mamekit/pull/130)
### Save states for every machine, stored in the browser

**For players:** Every machine can save and load states, kept in your browser. There is a shelf of thumbnails, and Shift+F7 saves and F7 loads the newest. A save never loads into a different machine.

**Under the hood:** `src/runtime/machine-state.ts` walks every container the board holds and writes state back in place, so aliases and hot-path links survive a load. A load with any mismatch is refused whole. Every accepted contract now does a round trip: save, run on, rewind, replay, and every frame must hash the same. The bugs it found were all state hidden from the walker, such as bus RAM in closures, hosted-MCU carries, sound hooks and a TMS5220 sample carry.

## 2026-09-08 12:39 AEST · `faa07402` · [#126](https://github.com/benbruscella/mamekit/pull/126)
### Gamepad, spinner and trackball input, and a home page

**For players:** Gamepads work, including a second pad for player two, and six-button fighters get a sensible button layout. Spinners and trackballs that appear as a mouse drive Arkanoid, Centipede and Pole Position. Fast rolls in Centipede are no longer lost. The site has a real front page, and the tagline is "Retro gaming, transpiled."

**Under the hood:** `src/runtime/gamepad.ts` maps the W3C Standard Gamepad onto MAME input types, using each binding's new `type` and `player` fields. `src/runtime/pointer.ts` scales pointer travel by `PORT_SENSITIVITY` as `ioport.cpp` does. Relative controls had been delivered in one lump per frame. They now follow MAME's `frame_interpolate`, spreading the frame's travel across it by beam position. The home page is generated from the build by `src/gen/home.ts`, with no hand-typed counts.

## 2026-09-07 18:32 AEST · `b1f61c9b` · [#122](https://github.com/benbruscella/mamekit/pull/122)
### Commodore 64 cassette loading with SID audio at full PAL speed

**For players:** A Computers tab arrives with the Commodore 64. The PAL machine loads tapes such as Nebulus into gameplay with SID sound, at the full 50.12 Hz PAL rate. Uridium and Wizball also load. Disks, cartridges and quickload are not done yet.

**Under the hood:** The C64's CPU, VIC, CIA, PLA, cassette transport and SID are compiled from MAME source through the existing pipeline. Against native MAME, the SID differed by at most 3/1024 in a sample over 36 configurations. Compiler fixes covered nested preprocessor handling, typed array sizing, function pointers and SID constants, plus lower bus-call and pointer-dispatch overhead. ROMs are matched against MAME software lists and never shipped.

## 2026-09-05 13:48 AEST · `ae4cca8e` · [#121](https://github.com/benbruscella/mamekit/pull/121)
### First-class machine onboarding and required ROM-backed QA

**For players:** Dig Dug's gameplay and Namco audio are back, and Ghosts'n Goblins' palette assembles correctly. Congo's sample sounds no longer corrupt its other audio. Congo, Panic and Zaxxon now say plainly that their sample effects are approximations.

**Under the hood:** Machines have candidate, accepted and disabled lifecycles, with `init-game`, `dev-game`, `check-game` and promotion tools. A contract can hold several scenarios, each with its own golden. Game-name and family branches were removed from the shared runtime. A required GitHub Actions job now clean-generates against pinned MAME and runs every accepted contract against real ROMs. The IR also gains address-space, scheduling and composite-machine foundations for later consoles and computers.

## 2026-09-04 11:56 AEST · `4ac962ad` · [#120](https://github.com/benbruscella/mamekit/pull/120)
### R-Type is back, with sound, sprites and artwork

**For players:** R-Type is re-enabled and playable, with sound, sprites and its cabinet artwork.

**Under the hood:** Fixes to the V30's interrupts and instruction execution, PIC acknowledgement, reset lines, timers, bus lanes and shared-memory binding. Together they let the sound Z80 run its uploaded program. M72 video got tilemap source selection, typed 16-bit buffered sprite RAM and byte-accurate memory copies. Bezel and web artwork are now kept in the generated output.

## 2026-09-04 09:02 AEST · `da559bd9` · [#117](https://github.com/benbruscella/mamekit/pull/117)
### The Simpsons and Teenage Mutant Ninja Turtles

**For players:** The Simpsons and Teenage Mutant Ninja Turtles are playable, with their colours, sprites, controls and sound. The Simpsons gets its fight sound effects alongside the music.

**Under the hood:** The Konami K052109 tilemap path and the K053246 and K051960 sprite renderers are compiled, including device callbacks, palette services and priority drawing. New K053260 four-voice PCM/KADPCM playback joins the YM2151 path. TMNT keeps its YM2151, K007232, uPD7759 and raw-sample routing. Transitive Konami input macros are now retained, which wired up player-one controls.

## 2026-09-03 14:22 AEST · `2d7a304a` · [#116](https://github.com/benbruscella/mamekit/pull/116)
### Eight more arcade games

**For players:** Adds Cosmic Avenger, Centipede, Final Fight, Joust, Lady Bug, Robotron, Shinobi and Xevious, with their cabinet artwork. Shinobi takes a plain `shinobi.zip`, and Xevious draws with the right colours and transparency.

**Under the hood:** New POKEY and YM2151 hardware and runtime paths, and wider device, audio and video lowering. Fixes include Cosmic Avenger's PROM colours and device-owned background tilemap, and Xevious's palette banks and indirect pens. Shinobi uses the unprotected System 16A set, with a paged tile, priority, palette and scanline-sprite compositor.

## 2026-09-02 20:04 AEST · `f94b699c` · [#110](https://github.com/benbruscella/mamekit/pull/110)
### Game Boy: a source-derived LR35902, PPU, APU and cartridge bus

**For players:** The Game Boy compiles from MAME, boots and runs a cartridge, and the console room shows its own grey cartridge. It is not playable yet: the picture is a flat background because the PPU never reaches its drawing mode, and the DMG boot ROM is not mapped.

**Under the hood:** The LR35902 has no opcode DSL. Its 256 cases are `.hxx` files included into a switch and written with statement macros, which `compileMameLr35902` expands and lowers. The slot IR now records how a cartridge mounts. A Game Boy card reaches for the CPU's address space itself, the opposite of the Atari 2600. Twenty silent compiler and runtime gaps were fixed. One example: `PAGE_ROM_SIZE` is declared five times in one header with three values, so flattening it per file banked MBC1 in the wrong steps.
## 2026-09-01 10:30 AEST · `ab34eede` · [#109](https://github.com/benbruscella/mamekit/pull/109)
### Green Beret, Track & Field, Up'n Down, Pole Position and Q*bert return

**For players:** Five parked arcade games are back. Green Beret, Track & Field, Up'n Down and Q*bert match real MAME pixel for pixel in attract mode, and Pole Position differs only by one sprite beside the credit counter. Q*bert now credits, starts and plays with its sound, Up'n Down takes coins, and Venture's sound, which had gone almost silent, is restored.

**Under the hood:** Seven MAME-lowering fixes. Comments with commas in `i86.h` shifted 128 I8088/V30 cycle constants, so comments are now stripped with `stripCppComments` rather than a regex. That core's sign flag was stuck at 0 for 8-bit results, and its shift-by-CL opcodes (0xd2/0xd3) were never lowered, so every following instruction decoded one byte short. `PORT_DIPUNUSED`/`PORT_DIPUNKNOWN` and analog `PORT_BIT` defaults now follow MAME's declared power-on values, checked against `-listxml`. Other fixes: a MOS6532 rewrite that sent every RIOT register write to port A, a bezel picker that chose by view name instead of geometry, and a shared `Pair16Bytes` class that took Bubble Bobble from 60 to 97 fps.

## 2026-08-31 13:52 AEST · `957f4aeb` · [#100](https://github.com/benbruscella/mamekit/pull/100)
### Atari 2600 console support

**For players:** The Atari 2600 arrives as a console. Like the NES, it has no BIOS: the cartridge you supply is the whole machine.

**Under the hood:** A new `src/hardware/a2600` package covers the TIA video and sound halves, the cartridge slot and the control ports. `tia-audio-compiler.ts` lowers `tiasound.cpp` even though its class sits in an anonymous namespace, and a function-like macro preprocessor expands statement macros such as `RESXX_APPLY_ACTIVE_HMOVE`, which every TIA sprite position goes through. `address-space-install.ts` records the `install_*` calls a cartridge's own `install_memory_handlers` makes, so its banking comes straight from MAME. `total_cycles()` now includes cycles from the instruction in progress, which moved the timing of every board that reads it.

## 2026-08-28 15:36 AEST · `e71dfefd` · [#98](https://github.com/benbruscella/mamekit/pull/98)
### ColecoVision, and a cartridge shelf that works for any console

**For players:** The ColecoVision is the second console. It boots its own BIOS, runs cartridges with keypad, joystick and both fire buttons, and its shelf lists 238 carts. Fast-forward (`F`) now works on every machine, arcade included. Zaxxon, Carnival, Venture and Donkey Kong also run much faster (Zaxxon went from 33 to 82 fps).

**Under the hood:** The TMS9928A compiles from MAME source, including its per-scanline `update_line`. The handler IR gained range-`for` loops, template-typed declarations and `PORT_CONDITION`. Screen geometry now comes from running the device's own `device_config_complete()`. Codegen treats any method with an `offs_t offset` parameter as hot, which compiled the cartridge-slot read that runs on every instruction fetch, and the compiled framebuffers match the interpreter's byte for byte. The shelf now picks a cart reader from the catalog's `interface` instead of sniffing bytes.

## 2026-08-27 18:00 AEST · `7b072eea` · [#97](https://github.com/benbruscella/mamekit/pull/97)
### Arkanoid, Rygar and Wonder Boy return

**For players:** Three parked games are back. Arkanoid no longer jumps from round to round on its own, Rygar draws its player sprite, and Wonder Boy now runs at full speed with its background.

**Under the hood:** Arkanoid's PC-keyed boot shim is gone, and its real 68705 MCU now runs with a port-input model and a reset line held for as long as it is asserted. Device methods are now resolved through each device's class hierarchy, because matching on the bare method name had sent every `watchdog.reset_w` to the MCU's reset line. A `device_gfx_interface` device such as `TECMO_SPRITE` now answers its own `gfx(n)`. Wonder Boy had dropped back to the interpreter because a typed collision array failed a shape check.

## 2026-08-27 13:55 AEST · `0ac56f01` · [#96](https://github.com/benbruscella/mamekit/pull/96)
### Metal Slug returns, and 68000 cycle timing is fixed

**For players:** Metal Slug boots, coins up and plays again, player sprite included. Every 68000 game (Street Fighter II, Ghouls'n Ghosts, Gauntlet, Rampage) now keeps closer time with real MAME.

**Under the hood:** The sprites were never the problem. The generated M68000 threw away every `m_icount -= X` an opcode body charged itself, and the `m_cyc_*` variant counts from `init_cpu_m68000()` came out as 0 because `emitIdentifier` returned `'0'` for any name it could not resolve. Both are fixed, and an unresolved identifier now fails generation. The Neo Geo BIOS RAM test now ends on frame 277, the same frame as MAME.

## 2026-08-27 09:20 AEST · `83ec3802` · [#90](https://github.com/benbruscella/mamekit/pull/90)
### Gauntlet

**For players:** Gauntlet is playable, with YM2151 music, POKEY effects and TMS5220 speech all on one speaker.

**Under the hood:** New compilers for POKEY, TMS5220, the Atari slapstic and the `atari_motion_objects` sprite engine, each built from MAME source. The slapstic watches CPU accesses through a new `execution.accessTaps` bus tap. Extra sound chips are hosted through `sound.auxiliaryDevices`. The TMS5220 runs on the main thread rather than in the worklet, because the sound CPU polls its `/READY` pin. The frame scheduler now hands over at timer lines, bounded at 250 µs, and many existing goldens were re-recorded in the same change.

## 2026-08-26 08:59 AEST · `dda39d29` · [#89](https://github.com/benbruscella/mamekit/pull/89)
### Ms. Pac-Man, Mr. Do! and Congo Bongo

**For players:** Three new arcade games. Ms. Pac-Man and Mr. Do! match real MAME pixel for pixel. Congo Bongo now draws its gorilla, monkey, hunter and coconuts and plays its sound.

**Under the hood:** `driver-init-compiler.ts` lowers a driver init to handler IR when nothing declarative fits; it is narrowly gated, and only Ms. Pac-Man's bank-building init qualifies. Mr. Do!'s palette callback is executed instead, which needed `bitswap<N>`, functional casts, typed local arrays, float division and single-precision `float` stores. Those type fixes also corrected arrays in Berzerk, Defender, Elevator Action, Jungle King and Moon Patrol. Templated handlers with hex arguments now resolve, every SN76489 variant is lowered, and driver handlers that declare an `address_space` now receive one.

## 2026-08-25 21:54 AEST · `a197ff46` · [#86](https://github.com/benbruscella/mamekit/pull/86)
### The NES comes back, with box art on 904 cartridges

**For players:** The NES console is back and boots again. 904 of 945 cartridges on the shelf now show box art instead of a blank label. The redesigned console room makes the cartridge itself the button and shows each game's name. Click-to-choose now works in Safari, and dialogs no longer appear in a serif font.

**Under the hood:** Four shared faults stopped the NES from booting. Pointer members lost their `*`, so `Number()` turned the whole CHR ROM into a string. Device time drifted behind the beam until the PPU stopped. `attotime::zero` was undefined. And reference parameters needed `generatedReferent`. `tools/nes-cart-art.ts` matches libretro thumbnails by printed title in tiers, with guards on sequel numbers.

## 2026-08-25 12:12 AEST · `58745b86` · [#84](https://github.com/benbruscella/mamekit/pull/84)
### Street Fighter II sprite order and all six buttons

**For players:** In Street Fighter II, sprites now stack correctly, so "INSERT COIN" draws over Blanka instead of behind him. All six attack buttons work: A S D punch and Z X C kick.

**Under the hood:** The handwritten CPS1 sprite loop used plain `transpen` where MAME's `DRAWSPRITE` uses `prio_transpen`, which reversed the object table's first-entry-wins order. `GeneratedTilemap.draw` also discarded its priority argument. `GeneratedPriorityOp` now tells the "claim" rule apart from the "stamp" rule. The kick row on `IN2` was missing because the shared keymap stopped at `IPT_BUTTON3`. The handwritten sprite loop is recorded as debt to be replaced by function-macro expansion.

## 2026-08-25 10:46 AEST · `9078c1bf` · [#83](https://github.com/benbruscella/mamekit/pull/83)
### Qix test fix: a recording error, not an emulation bug

**For players:** Nothing changes in how Qix plays. Its browser test now runs instead of being skipped.

**Under the hood:** Qix's test soft-resets partway through, and `board.reset()` sets the frame counter back to 0. The Node harness then recorded checkpoints 30 and 60 a second time, after the reset, while the browser recorded them once. `acceptance-harness.ts` now keeps each checkpoint's first occurrence. The browser and Node runs matched all along.

## 2026-08-25 09:56 AEST · `6aaf838f` · [#80](https://github.com/benbruscella/mamekit/pull/80)
### Street Fighter II, and CPS1 at full speed

**For players:** Street Fighter II: The World Warrior is added. CPS1 games now run faster than real time: Street Fighter II Champion Edition went from 48 to about 97 fps.

**Under the hood:** Codegen now also compiles handlers that are hot because of how they are wired (CPU address ranges, tile-info callbacks, the screen update), not only those with nested loops. That exposed a set of emitter/interpreter mismatches, all where emitted code trusted the declared type and the interpreter trusted the runtime value. Examples are pointer `==` through `Number()` and absent members read as `undefined`. C++ integer division also came out as JavaScript `/`, and fixing it repaired Berzerk, Moon Patrol and Rampage.

## 2026-08-24 20:37 AEST · `2defdeda` · [#81](https://github.com/benbruscella/mamekit/pull/81)
### Ghouls'n Ghosts test snapshot re-recorded

**For players:** Nothing visible; this is test bookkeeping after the Ghouls'n Ghosts fix.

**Under the hood:** The stored Ghouls'n Ghosts e2e snapshot had captured the broken blank-tile screen. It is now re-recorded from the fixed board. The Qix skip entry now points to issue #79.

## 2026-08-24 19:38 AEST · `433bdcfc` · [#78](https://github.com/benbruscella/mamekit/pull/78)
### Ghouls'n Ghosts levels draw, and FM sound no longer lags

**For players:** Ghouls'n Ghosts no longer covers the playfield in blank tiles when a level starts. In games with YM2151 or YM2203 sound, effects no longer drift half a second behind the action.

**Under the hood:** `cpu-codegen.ts` emitted C++ `>>` as JavaScript's signed `>>`, so the 68000's `SWAP` sign-extended values with bit 31 set. Both codegens now emit `>>>`. The OPM and OPN worklets had no limit on their frame queue, and every queued frame is permanent latency. They now cap it at three frames and fast-forward the register writes from dropped frames, so key-ons are not lost.

## 2026-08-24 17:42 AEST · `c6dc49e9` · [#76](https://github.com/benbruscella/mamekit/pull/76)
### Rampage gets its sound, and sprites stack correctly on MCR boards

**For players:** Rampage now has sound, and its sprites overlap in the right order.

**Under the hood:** Four fixes. `.umask16()` byte lanes are now modelled from the parser to the bus. DAC resolution comes from `DAC_GENERATOR` in `dac.h`, so the 10-bit AD7533 is no longer masked to 8 bits. `perfect_quantum` is a real scheduler operation, so command nibbles sent 45 µs apart are no longer missed. `prio_transmask` now has a real priority bitmap. Along the way, `CAP_P`/`CAP_N` values had been evaluating to NaN everywhere, and machine composition now follows MAME's statement order, so `cpus[0]` is the main CPU.

## 2026-08-23 21:08 AEST · `81e35a53` · [#73](https://github.com/benbruscella/mamekit/pull/73)
### Move to a newer MAME source revision

**For players:** Nothing visible; Asteroids now uses MAME's newer vector-display device.

**Under the hood:** The pinned MAME revision moves forward. Newer MAME makes a vector display its own video-output device, so `kg/build.ts` binds `vector_device::video_output_update` as the screen update. The docs were renamed to `ARCHITECTURE.md` and `ENGINEERING.md`, and the old BoardIR migration note was deleted.

## 2026-08-23 19:41 AEST · `90285771` · [#72](https://github.com/benbruscella/mamekit/pull/72)
### Zaxxon colours, backgrounds and full speed

**For players:** Zaxxon's text now has its real colours, its background is drawn correctly, and it runs at a full 60 fps in the browser instead of 30. Eight other games, including Defender, Bubble Bobble and Ghouls'n Ghosts, also got faster.

**Under the hood:** The palette callback's `m_color_codes = &color_prom[256]` was not recognised in its east-const spelling, and `pixmap.width()` read as 0, which left the background unmasked. The interpreter now lets the runtime value decide whether a zero-argument member call is a function call or a field read. That let the emitter drop its `callsMethodOnLocal` guard and compile the renderer: Zaxxon went from 36 to 220 fps in Node.

## 2026-08-23 18:07 AEST · `bf699210` · [#69](https://github.com/benbruscella/mamekit/pull/69)
### Popeye's sprites and backgrounds drawn correctly

**For players:** Popeye, Brutus and the speech balloons are no longer mangled, and the staircases and storefronts draw properly. Rampage also renders at its full width.

**Under the hood:** `gfxRenderScale()` halved the framebuffer whenever any decode was scaled. It now does so only when every decode shares one xscale. Virtual calls were resolved against the caller's class, so Popeye ran the tnx1 board's `draw_background`. `findDispatchedFunction()` now models MAME's virtual dispatch, and a new `bankedBackground` video-plan field carries the addressing bits for each board revision.

## 2026-08-23 16:35 AEST · `0435df99` · [#67](https://github.com/benbruscella/mamekit/pull/67)
### 1942 at full speed, and faster emulation everywhere

**For players:** 1942 went from about 16 to 123 fps, and every other game got faster too.

**Under the hood:** The interpreter's compiled-program cache never hit, because it was keyed by a bindings object rebuilt on every call. Operator lookup, value wrapping and assignment targets now resolve at compile time. `emit-handler-codegen.ts` emits JavaScript directly for board handlers with nested loops, using the same emitter as device codegen. Seven type-vs-value hazards were fixed along the way, including pointer-local indexing and `rectangle` copies that aliased the caller's rectangle.

## 2026-08-22 15:47 AEST · `d85cbb03` · [#65](https://github.com/benbruscella/mamekit/pull/65)
### Venture's sound restored

**For players:** Venture plays its sound again.

**Under the hood:** The 6532's `m_ram` (`memory_share_creator`) started out as the number 0. The interpreter allocates an array on first write, but compiled methods silently dropped the writes, so once `ram_w` was compiled the sound 6502 had no zero page or stack. Memory-block members now start as arrays. `machine().side_effects_disabled()` is now bound, and `ASSERT_LINE`/`CLEAR_LINE` from `diexec.h` are lowered, so generated devices can assert interrupt lines and not only clear them.

## 2026-08-21 18:43 AEST · `769a5743` · [#64](https://github.com/benbruscella/mamekit/pull/64)
### Defender can turn around

**For players:** Defender's Reverse and Hyperspace buttons now work. The controls are A Hyperspace, S Smart Bomb, Z Thrust, X or Space Fire, and C Reverse.

**Under the hood:** The shared keymap stopped at `BUTTON3`, and `parse.ts` cut `PORT_NAME(DEF_STR( Reverse ))` off at its first `)`. The parser now uses balanced `matchParen`. The test had only been running the attract demo, because Defender needs several Start presses, so it now presses Start six times. Also in this PR: same-origin bezel artwork is resolved ahead of time.

## 2026-08-21 13:01 AEST · `d97ab3e1` · [#59](https://github.com/benbruscella/mamekit/pull/59)
### Gyruss swarm sound

**For players:** In Gyruss, the swarm sound now plays when enemies arrive, and the sound mix is balanced like MAME's.

**Under the hood:** Three stacked faults. `m_discrete.write` and `NODE()` were bound only for hosted MCUs, so the i8039's DAC writes never reached the sound. AY channels used the normalised curve where `AY8910_DISCRETE_OUTPUT` needs the ladder's own voltages. The discrete mixer's `cF`/`cAmp` terms were never lowered. The browser test now also compares sound-register write counts with the golden.

## 2026-08-21 08:59 AEST · `296ec2a7` · [#57](https://github.com/benbruscella/mamekit/pull/57)
### Browser test suite with Playwright

**For players:** Nothing new to play; every game now has a browser test, and Dig Dug's sound sequencing is corrected.

**Under the hood:** A new Playwright e2e suite runs each game's acceptance contract on the app canvas, checks that it is audible through the shipped AudioWorklet, and keeps a final-frame snapshot. Known play-test issues are skipped by name. `tools/blast-radius.ts` is new. Dig Dug's Namco 53xx mode select had collapsed to a single bit: a devcb `.append()` chain now OR-combines its reads, and a transform on a read accessor applies to the value read.

## 2026-08-20 19:48 AEST · `7a87bdc6` · [#55](https://github.com/benbruscella/mamekit/pull/55)
### Seventeen broken arcade games and the NES parked

**For players:** Seventeen arcade games that play-testing found broken are removed from the site for now, along with the NES. Among them are Q*bert, Gauntlet, Metal Slug, Rygar and Pole Position. The arcade list goes from 64 to 47.

**Under the hood:** A target is disabled by moving its contract and spec into `src/games/disabled/`, which discovery skips, so there is no target list to edit. Each parked module records what testing found, and its specs still compile under `test:unit`. The boot menu now builds its tabs from the manifest. CI no longer runs twice for each PR commit.

## 2026-08-20 17:36 AEST · `afb88edd` · [#52](https://github.com/benbruscella/mamekit/pull/52)
### Forty new arcade games

**For players:** Forty arcade targets are added, taking the supported set from 24 to 64. They include Berzerk, Double Dragon, Moon Patrol, Mario Bros., Bubble Bobble, Defender, 1942, Street Fighter II Champion Edition and Zaxxon. Double Dragon gets real music, and audio pops from worklet underruns are gone. Some of the new targets still fail acceptance.

**Under the hood:** New families are compiled from MAME source, among them YM2151 (built from ymfm tables), Namco WSG, OKIM6295, M68705, DAC, samples and vector. Frame-mode video now presents at `screen.vbstart` like MAME, which fixed Berzerk's torn player. Handler bindings now use prototype-chained overlays, so a binding added later is no longer lost. A pointer-declaration rewrite that matched across newlines had blanked Moon Patrol's text palette.

## 2026-08-01 17:26 AEST · `614668b4` · [#51](https://github.com/benbruscella/mamekit/pull/51)
### Eight more arcade games with generated sound and video

**For players:** Eight arcade games are added: Scramble, Donkey Kong, Frogger, Traverse USA / Zippy Race, Frisky Tom, Bank Panic, Jungle King and Qix.

**Under the hood:** This adds SN76489, discrete DAC/effects, AY-8910 mixing and MSM5205 routing, and keeps MAME's HOLD_LINE, ASSERT_LINE and PULSE_LINE interrupt semantics. Generation for all targets now runs in parallel. New golden-recording, timing and performance contracts protect the existing games. Jungle King's audio CPU matched a MAME trace exactly: 909,816 DAC writes over 1,800 frames.
## 2026-07-31 16:30 AEST · `adb65355` · [#49](https://github.com/benbruscella/mamekit/pull/49)
### Game facts become linked archive pages

**For players:** A new "Browse the archive" index lets you explore machines by driver, CPU, sound chip, screen, licence, manufacturer and year, and the facts on each game's Learn/About page now link to those pages. Each game has a proper HTML dossier with a Markdown download. The machine graph opens as a readable, subsystem-by-subsystem story, with the raw graph kept as an advanced mode with shareable links. The Arcade shelf now shows four games per row on desktop.

**Under the hood:** The archive index and its facets are generated as static pages with routes that work on GitHub Pages. Dossier HTML renders from the same canonical dossier data as the Markdown download.

## 2026-07-31 15:56 AEST · `da4b119d` · [#48](https://github.com/benbruscella/mamekit/pull/48)
### Bubble Bobble joins the arcade

**For players:** Bubble Bobble (Japan, Ver 0.1) is playable, with the correct colours, YM3526 music and its themed MAME bezel. Boards whose artwork has several views now pick the named bezel view over a plain upright surround.

**Under the hood:** The triple-Z80 plus M6801U4 Taito board lowers from MAME as 15 composed devices with no game adapter: banks, latches, input mergers, a reset chain and an object-column renderer. Palette byte order became a generated palette property, so big-endian RGBx444 palette RAM decodes correctly. A YM3526 (OPL) path sits beside the YM2203 one, with ymfm-derived tables, envelopes, feedback, timers and IRQ routing. A blast-radius check against clean `main` showed the other 14 arcade games byte-identical, and it caught a global frame-presentation change before merge.

## 2026-07-30 19:28 AEST · `151e90ea` · [#46](https://github.com/benbruscella/mamekit/pull/46)
### The NES, generated from MAME source, with a cartridge shelf

**For players:** The NES is back, now generated from MAME source. Bring your own `.nes` or `.zip` dumps for NROM, UxROM, CNROM, MMC1 and MMC3 cartridges; they are stored only in your browser. A new console room shows a cartridge shelf with cart art, marks each cart as verified or experimental, and lets you play, inspect or eject it. Super Mario Bros., 1943, Adventure Island, The Legend of Zelda and Super Mario Bros. 3 all run at 60 fps.

**Under the hood:** The RP2A03 CPU/APU, PPU, controller ports and cartridge slot all come from MAME source. The runtime gained device slots and links, timers, pointer and reference semantics, qualified base-method calls, and generated memory and bank resources. Compiling the hot scanline callbacks and cartridge bus entry points took the NES from about 30 fps to 60 fps without frame skipping. CI now finds the pinned MAME checkout through `MAME_SRC`.

## 2026-07-29 20:00 AEST · `1e8b719f` · [#45](https://github.com/benbruscella/mamekit/pull/45)
### Kung-Fu Master

**For players:** Kung-Fu Master (Irem M62) is playable, with its AY-3-8910 music and both MSM5205 speech and effects channels.

**Under the hood:** The knowledge graph now applies device changes from derived machine configs to an inherited base, most-derived first, in each game's subgraph. A setter in a derived config shadows the same callback from the base, so the right screen update and clocks win. The video compiler gained `region_ptr` finder bindings and lowers MAME's shared `compute_res_net_all` PROM palette helper. A Lua script in `tools/` drives MAME with the same coin and start timing as the acceptance contract, for audio comparisons.

## 2026-07-29 15:11 AEST · `1f66ed2c` · [#42](https://github.com/benbruscella/mamekit/pull/42)
### Zig Zag

**For players:** Zig Zag, a game on Galaxian-family hardware, is playable. Shelf covers now crop flyers to fit without letterboxing or cutting off titles. A game's story can come from a curated text file instead of Gaming History.

**Under the hood:** ROM loading follows MAME's `ROM_CONTINUE` and `ROM_IGNORE` cursor, so one chip can fill two graphics regions. The AY8910 package gained MAME's BC1 address-line helpers. A common video-RAM write shape (`update_partial`, store, `mark_tile_dirty`) now compiles to direct calls, chosen by source structure, not by game name. Running it through the IR interpreter had dropped Zig Zag from 61 fps to the mid-30s after a coin. The contributor guide now lists progetto-SNAPS and Gaming History as artwork and story sources.

## 2026-07-29 12:12 AEST · `174c4426` · [#41](https://github.com/benbruscella/mamekit/pull/41)
### Commando, plus MAME audio A/B checks

**For players:** Commando is playable with both YM2203 sound chips, running at 59 fps inside its bezel.

**Under the hood:** This was the first new game on the BoardIR architecture. New pieces include opcode decryption on a separate Z80 `AS_OPCODES` bus, IRQ-PROM-backed interrupt timing, vectored `HOLD_LINE` interrupts and `ALL_OUTPUTS` audio routes. The audio bug was MAME's `INPUT_LINE_RESET` being treated as NMI: the sound Z80 kept re-entering, walked its stack backwards and made 1.9 million YM writes instead of about 313,000. A new `audio:compare` command records our worklet beside a real MAME `-wavwrite` run, and `audit:game-package` checks a game's local artwork and history.

## 2026-07-29 10:35 AEST · `a8b2c6f6` · [#40](https://github.com/benbruscella/mamekit/pull/40)
### BoardIR: one validated board IR and hardware packages

**For players:** Galaxian runs at about 61 fps, above its 60.6 Hz refresh, for the first time. Galaxian's background sound now follows MAME's circuit instead of running about 15x too fast. Ghosts'n Goblins shows its power-on test screens and plays at the right pitch. Space Invaders' bezel and coloured overlay now display correctly. Galaga keeps a pending vblank interrupt it used to lose.

**Under the hood:** The board compiles into one `board.json` (schema 3) under `src/ir/`, decoded at load with field-path and MAME-line errors. Callbacks become typed effects at compile time instead of regex matching in the browser. Hardware families moved into self-contained `src/hardware/<family>/` packages, and a game is now two files. Strictness surfaced real bugs: an `if/else` fallthrough that cleared IRQ0 on NMI release, an unimplemented `lshift()` that broke the Namco 53xx, dropped `NO_DUMP` ROMs and ignored YM2203 prescaler writes. Caching parsed method signatures gave the speedups.

## 2026-07-26 09:25 AEST · `f83fad91` · [#39](https://github.com/benbruscella/mamekit/pull/39)
### Ghosts'n Goblins, generated from MAME source

**For players:** Ghosts'n Goblins is generated from MAME source and pixel-identical to MAME 0.288 at every checkpoint tested. A torn vertical band in scrolling stages is gone; the bug could affect any game with a single scrolling tilemap.

**Under the hood:** The 6809 core now has a shared `compileM6809Core`, so the MC6809 lowers from `m6809.lst` (768/768 opcodes). A new OPN compiler lowers the YM2203 from MAME's bundled ymfm tables. RAM palettes lower from `set_format`, and the parser learned template classes and device-array finder tags. Runtime fixes: scrolled tilemaps now repaint the whole screen, C++ default arguments are honoured, and `irqN_line_hold` works for periodic interrupts, which was what kept the sound CPU from reading its latch. A dropped `add_route` gain on array elements had made the audio 12 dB too loud.

## 2026-07-25 10:28 AEST · `ee2a4f70` · [#37](https://github.com/benbruscella/mamekit/pull/37)
### Gyruss, generated from MAME source

**For players:** Gyruss is the eleventh arcade game generated from MAME source. Torn cyan sprite fragments no longer cut through the logo and text.

**Under the hood:** The compiler derives the five-AY8910 topology and discrete mixer from MAME, lowers static lookup tables and `set_transmask` priority, and excludes `#if 0` ROM declarations. The generic bus now lets MAME handlers own shared-RAM writes, so `update_partial()` runs before the store and mid-frame sprite changes render as on the board. Galaxian also uses these partial-raster handlers; its video goldens changed and its CPU and audio hashes did not.

## 2026-07-24 21:08 AEST · `b4f21506` · [#36](https://github.com/benbruscella/mamekit/pull/36)
### Juno First, and a fix for a high-pitched AY buzz

**For players:** Juno First is the tenth generated arcade game. A continuous high-pitched buzz in AY-3-8910 games is gone.

**Under the hood:** New pieces are the MCS-48/I8039 sound MCU from MAME source, memory-bank topology in the graph, auxiliary DAC routing through the AY worklet, and RC-filter layout inferred from handler IR. The buzz, measured at 15,860.96 Hz from an iPad recording, was a minimum-period AY tone aliasing. The mixer kept only the last native sample when dropping from about 223.7 kHz to 48 kHz. It now runs a two-pole anti-alias stage before decimation. Every executable `src/runtime` module must now have an adjacent spec, enforced by a test.

## 2026-07-24 19:41 AEST · `183af5df` · [#35](https://github.com/benbruscella/mamekit/pull/35)
### Roc'n Rope, generated from MAME source

**For players:** Roc'n Rope is generated from MAME source, and its terrain draws correctly.

**Under the hood:** MAME's M6809 opcode DSL and KONAMI-1 opcode decryption now compile into the generated CPU. The terrain bug came from `MUL`: it stores a `uint16_t`, but helper selection had guessed 8 bits from how the expression was spelled. Lowering now keeps the declared type, with a CPU regression test. Each game's acceptance run is isolated, so generated modules no longer pile up as the game list grows.

## 2026-07-24 14:21 AEST · `0b0a86e3` · [#34](https://github.com/benbruscella/mamekit/pull/34)
### Moon Patrol and generated Irem M52 hardware

**For players:** Moon Patrol is the eighth game generated from MAME source, running at 57 fps in the browser.

**Under the hood:** M6803 execution, M52 tile, sprite, background and clip-rectangle video, a nested sound board, dual AY8910s and MSM5205 ADPCM all lower from MAME source and graph facts. Executable `device_add_mconfig` trees are treated as generated compositions. CI now rejects false generation gaps.

## 2026-07-24 10:28 AEST · `95ebfafd` · [#33](https://github.com/benbruscella/mamekit/pull/33)
### Dig Dug, and Galaga's death explosion restored

**For players:** Dig Dug is the seventh game built by the compiler. Galaga's player-death explosion sound is back.

**Under the hood:** The Namco 53XX input MCU and 54XX discrete audio now come from MAME source. The missing explosion was a RAM sizing bug: hosted MCU RAM was sized from the first inherited 4-bit accessor (16 nibbles), but MAME builds the MB8844 with a 6-bit data space (64 nibbles). The compiler now reads `dataAddressBits` from the CPU constructor. The 54XX DAC ladder and op-amp filter are derived from source, and audio checks can target a frame window.

## 2026-07-23 20:50 AEST · `2886f47e` · [#30](https://github.com/benbruscella/mamekit/pull/30)
### MAMEKIT becomes a MAME source compiler

**For players:** Six arcade machines now run from code generated from MAME source: Pac-Man, Pooyan, Time Pilot, Space Invaders, Galaxian and Galaga. The other games will return one at a time through the same pipeline.

**Under the hood:** The handwritten TypeScript emulator ports were removed and replaced by a compiler: MAME C++ and its macro and opcode DSLs become an AST, then a knowledge graph, then typed IR, then generated modules. Z80 and I8080 cores, devices, Namco WSG, AY8910 and discrete AudioWorklets are all generated. `src/runtime` became hardware-neutral, and unsupported source shapes report diagnostics instead of being approximated. The branch changed 205 files, adding about 18,900 lines and deleting about 36,300.

## 2026-07-19 16:31 AEST · `28903c8a` · [#28](https://github.com/benbruscella/mamekit/pull/28)
### Pooyan and Time Pilot

**For players:** Pooyan and Time Pilot are added. They share the Konami sound board already built for Roc'n Rope. Real-ROM play was not yet verified when this merged.

**Under the hood:** The Time Pilot sound section (Z80, two AY-3-8910s, soundlatch, LS90 timer, filter switching) moved into a shared `runtime/timeplt-audio.ts`, and Roc'n Rope now uses it. Each game got a board and video module. Time Pilot's mainlatch, written through a lambda the parser emitted as a no-op, was patched to a write handler.

## 2026-07-19 14:55 AEST · `1ec78c96` · [#26](https://github.com/benbruscella/mamekit/pull/26)
### Roc'n Rope

**For players:** Roc'n Rope (Konami, 1983) is added as the seventh arcade game.

**Under the hood:** The knowledge graph now resolves includes from MAME's `shared/` directory, which brings in the `TIMEPLT_AUDIO` sound board. Devices without a clock inherit their C++ constructor default, and `DERIVED_CLOCK` resolves against the owning device. ROM patches made in a driver's `init_*` function now flow through to the shell. New board and video modules cover the KONAMI-1 CPU, its RAM-overlaid IRQ vectors and the resnet palette.

## 2026-07-09 10:05 AEST · `42164a17` · [#23](https://github.com/benbruscella/mamekit/pull/23)
### Dig Dug

**For players:** Dig Dug plays in the browser, with high scores saved in your browser.

**Under the hood:** Dig Dug reuses the Galaga Namco stack (three Z80s, WSG, 06xx, 51xx). New modules cover the 53xx DIP-switch reader, the ER2055 EAROM and the paged dirt background. The 53xx is an HLE recovered from MAME 0.121, because later MAME uses the MCU dump. The generator now maps one driver file to several board families by machine name, since `galaga.cpp` hosts both games.

## 2026-07-07 20:16 AEST · `53b628e6` · [#19](https://github.com/benbruscella/mamekit/pull/19)
### The NES, the first console

**For players:** The NES is the first console. The boot menu has Arcade and Consoles tabs, and the NES room has a cartridge shelf: drop your own Super Mario Bros. dump and it plays. Carts are identified by CRC and kept in your own browser, and each is shown as tested, experimental or unsupported before you drop it.

**Under the hood:** The parser learned the `CONS/SYST/COMP` macros, `SOFTWARE_LIST`, console screen setters and slot-device defaults. Constants now resolve from external device headers, and input ports come from the controller slot device. `src/kg/softlist.ts` turns `hash/nes.xml` into a 4,545-entry cart catalog. This first version used handwritten 6502/RP2A03, PPU, APU and mapper (NROM, UxROM, CNROM, MMC1, MMC3) modules.

## 2026-07-07 17:07 AEST · `c75b9578` · [#18](https://github.com/benbruscella/mamekit/pull/18)
### Audio scheduling and mix fixes

**For players:** A periodic crackle every 1.7 seconds or so is gone. Ghosts'n Goblins has sound again, Moon Patrol's explosions are fixed, and Gyruss's drums no longer drown out its theme.

**Under the hood:** The worklet scheduler now paces by the board's true refresh (60.606 Hz, not 60). Sound writes are batched into one `postMessage` per emulated frame across all worklets; Juno First's DAC had been sending about 4,000 messages a second. Gyruss mix weights and DAC gain come from the driver's discrete resistor network. `?debug` streams scheduler telemetry.

## 2026-07-07 17:05 AEST · `3d99299d` · [#15](https://github.com/benbruscella/mamekit/pull/15)
### Audio levels calibrated against real MAME

**For players:** Juno First's drums and speech are no longer buried about 9 dB under the music, and AY-3-8910 music plays at the right level.

**Under the hood:** A Lua write-tap on real MAME 0.288 showed the emulation matched write for write; the gap was all in rendering. AY channel gain was 9.4 dB hot against MAME's `ay8910.cpp` scaling. A fixed 0.5 ms DAC ramp never finished on fast write streams, so the ramp is now half the stream's own write gap. Per-band levels now sit within about 1.2 dB of a real MAME recording.

## 2026-07-07 10:39 AEST · `dcff5b33` · [#14](https://github.com/benbruscella/mamekit/pull/14)
### mame2js is renamed MAMEKIT

**For players:** The project, first called mame2js, is now MAMEKIT. The site has a short legal footer: no ROMs are hosted or stored, and the project is independent of MAMEDEV.

**Under the hood:** The package, CLI, `window.mamekit` debug handle, storage prefix and deploy paths were all renamed; the menu purges the old `mame2js:*` keys and IndexedDB data from visitors' browsers. The README was rewritten around what the project is and is not, with a per-machine status table.

## 2026-07-07 10:22 AEST · `ea0bddf2` · [#13](https://github.com/benbruscella/mamekit/pull/13)
### Juno First, no ROM storage, and timed audio writes

**For players:** Juno First is playable at 61 fps in its original bezel. Gyruss now plays real percussion instead of a stub. ROMs are never stored or fetched: a drag-and-drop is the only source, each page load. Older ROM sets from clone families are accepted. Games still being built show "IN DEVELOPMENT" instead of crashing.

**Under the hood:** A new MCS-48 (i8039) core runs the sound MCU on both boards. Sound writes carry a scanline-derived timestamp so the worklet applies them at the right sample; this removed the Konami "chirp". Konami RC filters and Moon Patrol's MSM5205 routing were added. Cpp `##` token pasting in port macros was fixed, which gave Juno First its left and right inputs. New tools render audio headlessly and A/B it against MAME.

## 2026-07-06 19:41 AEST · `07865ca2` · [#9](https://github.com/benbruscella/mamekit/pull/9)
### Ghosts'n Goblins, the first Capcom board

**For players:** Ghosts'n Goblins plays at 60 fps with music. ROM sets that use older chip names (such as `gg3`/`gg4`/`gg5`) now validate, for every game.

**Under the hood:** A YM2203 FM engine was ported from ymfm, with its SSG half on the existing AY8910 core. The MC6809 gained an IRQ acknowledge counter for faithful `HOLD_LINE`, because the boot code masks IRQs and counts vblanks with `SYNC`. The generator now reads every `ROM_START` block in a driver and emits per-slot alternate CRCs.

## 2026-07-06 15:15 AEST · `4ef94d1f` · [#7](https://github.com/benbruscella/mamekit/pull/7)
### Deploy to GitHub Pages

**For players:** The site went live on GitHub Pages (then at `/mame2js/`). ROMs are never published: you load your own zip, checked chip by chip.

**Under the hood:** All app URLs became relative, so one build works at any base path. `games.json` is emitted at generate time. `npm run deploy` publishes `dist/` to a history-free `gh-pages` branch, with artwork excluded unless `--artwork` is passed.

## 2026-07-06 13:49 AEST · `51b605d6` · [#6](https://github.com/benbruscella/mamekit/pull/6)
### Gyruss, Space Invaders, Moon Patrol, and game stories

**For players:** Gyruss, Space Invaders and Moon Patrol are playable, taking the project (then mame2js) from three games to six. Clicking a game opens a story page with marquee, flyer, cabinet photo, machine facts and the Gaming History write-up. A ROM drop zone lists the chips a zip needs and checks it before booting.

**Under the hood:** New spec-tested cores, then ported by hand: M6809 with KONAMI-1 decryption, Intel 8080, M6803, MB14241, MSM5205, AY-3-8910 and a Space Invaders sound synth. The parser gained multi-line port macros, `PORT_INCLUDE`/`PORT_MODIFY`, scoped `set_addrmap` patches and per-field input polarity. A Markdown dossier is generated per game.

## 2026-07-05 23:55 AEST · `d9d5da99` · [#2](https://github.com/benbruscella/mamekit/pull/2)
### Pac-Man, Galaxian, and a boot menu

**For players:** Pac-Man and Galaxian boot and play. A single app (the project was then called mame2js) has a boot menu like a video-store shelf, with search and keyboard browsing, and each game plays inside its scanned cabinet bezel. Galaga gains its explosion sound.

**Under the hood:** The parser learned modern `XTAL` constants, port ranges, Z80 I/O maps, address-map and machine-config composition, `GFXDECODE_SCALE` and per-field input polarity. Active-high inputs had caused Galaxian's stuck-coin boot loop. Pac-Man's `AAAAAAAA` attract text was a missing `PORT_CONFNAME`, not an emulation bug. Each game's output became data only (`config.json`, `meta.json`), and Ctrl is permanently unbound.

## 2026-07-05 16:35 AEST · `9bdb3d72` · before pull requests
### mame2js: the first commit, and Galaga plays

**For players:** Galaga ran in the browser, compiled from MAME's source.

**Under the hood:** The project began as mame2js, a knowledge-graph-first MAME-to-TypeScript transpiler: parse the driver, build a graph of its devices, maps and handlers, and generate code a browser runs. The README and the first agent-facing docs followed the same afternoon (`bbf256e4`, `1a757909`). It was renamed MAMEKIT two days later (#14).
