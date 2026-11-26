# Memory index

## How the user wants work done
- [Compiler, not porter](compiler-not-porter.md) — no hand-crafted game-specific files ever
- [Stay on issue branch](stay-on-issue-branch.md) · [Issue progress comments](issue-progress-comments.md) · [Confirm scope on open questions](confirm-scope-on-open-questions.md) — branch discipline, comment as you go, ask when design is open
- [Ask before MAME sweeps](ask-before-mame-sweeps.md) · [Sweep watch command](sweep-watch-command.md) — multi-MAME runs need OK; hand over a progress command
- [Use the user's tree](dont-wipe-served-dist.md) · [Run data commands yourself](run-data-commands-yourself.md) · [Serve from dist](serve-from-dist.md) — no side trees; dry-run .data tooling; `npm run serve`
- [gen:all at the end](gen-all-at-end.md) · [CI local checks](ci-local-checks.md) · [Frugal blast radius](frugal-blast-radius.md) — single-target while iterating; `test:current`; derive impacted games
- [Outstanding issue](outstanding-issue.md) · [Never reference the epic](no-closing-keywords-for-epics.md) — follow-ups go in GitHub #247; PRs and commits never name #247, sub-issues stay attached
- [Attribution from release notes](attribution-from-release-notes.md) — MAMEDEV notes + copyright-holders, never git log
- [Worktree PR hooks](worktree-pr-hooks.md) · [No stash in scripts](stash-in-scripts.md)

## Tooling, environment, pitfalls
- [mamekit compare commands](mamekit-compare-commands.md) · [MAME oracle tool](mame-oracle-tool.md) · [MAME baseline #204](mame-baseline-204.md) · [Oracle input mirroring #198](oracle-input-mirroring-198.md) — `mamekit against|record|compare|show`
- [MAME reference capture](mame-reference-capture.md) · [MAME window and cursor](mame-window-flag.md) · [MAME frame-diff rotation](mame-frame-diff-rotation.md) · [Oracle MAME-side drift](oracle-mame-side-drift.md) · [Cold nvram boot divergence](cold-nvram-boot-divergence.md)
- [listxml fact oracle](listxml-fact-oracle.md) · [MAME listxml port audit](mame-listxml-port-audit.md) — -listxml is ground truth
- [Dist rebuild pitfalls](dist-rebuild-pitfalls.md) · [Dist rebuild breaks sweeps](dist-rebuild-breaks-sweeps.md) · [Single-target gen scope](single-target-gen-scope.md) · [Stale main dist baseline](stale-main-dist-baseline.md) · [Disabled-target diagnosis](disabled-target-diagnosis.md)
- [Gen cache policy](gen-cache-policy.md) · [Gen cache masks breaks](gen-cache-masks-breaks.md) · [Warm cache outlives code](warm-cache-outlives-code.md) · [Semantic baseline attribution](semantic-baseline-attribution.md)
- [Hung run JS stack](hung-run-js-stack.md) · [Node version pin](node-version-pin.md) · [Host machine faults](host-machine-faults.md) · [Acceptance segfault](node-rom-inflate-segfault.md) · [npm exit codes through a pipe](npm-exit-code-through-pipe.md) · [Acceptance run flake](acceptance-run-flake.md)
- [Stale goldens on main](stale-goldens-on-main.md) · [Branch 101 stale goldens](branch-101-stale-goldens.md) · [Known broken targets](known-broken-targets.md) · [Final validation #240](final-validation-240.md)
- [e2e webServer is the browser check](e2e-webserver-is-the-browser-check.md) · [e2e live-audio gap](e2e-live-audio-gap.md) · [Acceptance harness coverage gap](acceptance-harness-coverage-gap.md) · [Browser/Node contract divergence](browser-node-contract-divergence.md)
- [Artwork CDN bucket](artwork-cdn-bucket.md) · [Data inbox #159](data-inbox-159.md) · [ROM library](rom-library.md) · [Kept set requirements #232](kept-set-requirements-232.md) · [Browser memory + ROM library](browser-memory-rom-library.md)

## Scheduler, time and timers
- [Attotime #220](attotime-220.md) · [Exact attotime #272](exact-attotime-272.md) · [Scheduler bound #255](scheduler-bound-255.md) · [MAME round rules #275](mame-round-rules-275.md) — runner on integer attotime; round rules confirmed in MAME's log
- [Bubble Bobble #278](bublbobl-278.md) — RAM-exact: stream.update through the write's sample; device timers on exact attotime (truncated from_ticks, exact expiry + anchor)
- [Frisky Tom #284](friskyt-284.md) — RAM-exact: pulse_input_line synchronized; idle-CPU adjust_icount lost; space.unmap() 0
- [Ghosts'n Goblins #292](gng-292.md) — RAM-exact: set_periodic_int an exact round-ending timer; cycle divide depends on round length; devcb lines synchronize
- [Gauntlet #296](gauntlet-296.md) — RAM-exact (and marble): quantum window outlasts expiry until a timer; due timers fire through the presentation hold; armed timer aborts only as head
- [RAM and pictures #300](ram-and-pictures-300.md) — oracle address shift; MC6845 re-base; soft reset; held CPUs last; synchronized-work timer lead (Namco)
- [MAME scheduler synchronize](mame-scheduler-synchronize.md) · [Hosted MCUs in the round (#222)](hosted-mcus-in-round-222.md) · [Perfect-quantum device access](perfect-quantum-device-access.md) · [Mid-instruction timer order](mid-instruction-timer-order.md)
- [Device clock vs beam](device-clock-vs-beam.md) · [Device clock lead #254](device-clock-lead-254.md) · [In-slice cycles #254](in-slice-cycles-254.md) · [Device machine time](device-machine-time.md) · [total_cycles mid-instruction](total-cycles-mid-instruction.md)
- [Line event phase (#214)](line-event-phase.md) · [Frame render point](frame-render-point.md) · [Frame-boundary input](frame-boundary-input.md) · [Venture scheduler time #271](venture-scheduler-time-271.md) · [Venture silent RIOT IRQ](venture-silent-riot-irq.md)
- [Held CPU eats cycles](held-cpu-eats-cycles.md) · [Latch burst interleave](latch-burst-interleave.md) · [Scanline interleave limit](scanline-interleave-limit.md) · [Zaxxon vblank phase](zaxxon-vblank-phase.md) · [Marble software watchdog](marble-software-watchdog.md)

## Compiler and emitter lessons
- [Silent mis-lowering](silent-mislowering.md) · [Codegen silent zero](codegen-silent-zero.md) · [Direct screen shape guards](direct-screen-shape-guards.md) · [MAME framework runtime gaps](mame-framework-runtime-gaps.md) · [Handler-IR C++ gaps](handler-ir-cpp-gaps.md)
- [Codegen/interpreter parity](codegen-interpreter-parity.md) · [Emitter/interpreter parity](emitter-interpreter-parity.md) · [Device codegen parity](device-codegen-parity.md) · [Unsigned shift lowering](unsigned-shift-lowering.md) · [M68K icount cycles](m68k-icount-cycles.md)
- [Pointer member types](pointer-member-types.md) · [Struct field widths](struct-field-widths.md) · [Declared member widths](declared-member-widths.md) · [Device clock is u32](device-clock-u32.md) · [CPU header comment trap](cpu-header-comment-trap.md)
- [Statement macro expansion](statement-macro-expansion.md) · [Free-function lowering](free-function-lowering.md) · [CPS1 sprite replica](cps1-sprite-replica.md) · [16-bit bank windows](sixteen-bit-bank-window.md)
- [Device handler namespace](device-handler-namespace.md) · [Device delegate config](device-delegate-config.md) · [Device children and delegates](device-children-and-delegates.md) · [Device-owned gfxdecode](device-owned-gfxdecode.md) · [device_start scope](device-start-scope.md)
- [machine_start lifecycle #237](machine-start-lifecycle-237.md) · [Board devices #237](board-devices-237.md) · [Device forks #203](device-forks-203.md) · [Direct-screen removal #240](direct-screen-removal-240.md) · [Palette share adoption](palette-share-adoption.md)
- [Epic 178 closed](epic-178-closed.md) · [Unresolved-call census (#178)](unresolved-call-census-178.md) · [CPU cores #249](cpu-cores-249.md) · [68705 generated (#176)](m68705-generated-176.md) · [Closure pool #265](closure-pool-265.md)

## Performance
- [Interpreter share is the budget](interpreter-share-is-the-budget.md) · [Emulation hot paths](emulation-hot-paths.md) · [Runtime cost of declared types](runtime-cost-of-declared-types.md) · [Dictionary-mode call tables](dictionary-mode-call-tables.md) · [SNES speed #174](snes-speed-174.md)

## Sound
- [Sound #298](sound-298.md) — -wavwrite is pre-effect, one channel per speaker input; fold tools; inliner value-param width (68000 set_8xh)
- [Sound #242](sound-242.md) · [Sound mix #234](sound-mix-234.md) · [Sound fidelity #194](sound-fidelity-194.md) · [Board sound vs app sound](board-sound-vs-app-sound.md) · [Audio engine placement](audio-engine-placement.md) · [Worklet backlog latency](worklet-backlog-latency.md)
- [DAC width from MAME](dac-width-from-mame.md) · [Discrete graph lowering](discrete-graph-lowering.md) · [DISCRETE compile #236](discrete-compile-236.md) · [Netlist native-rate inputs](netlist-native-rate-inputs.md) · [Samples #228](samples-228.md) · [Sample sets #206](sample-sets-206.md)
- [POKEY #200](pokey-200.md) · [VRC7/ymfm #188](vrc7-ymfm-188.md) · [TIA audio](tia-audio.md) · [Z80 CTC + daisy chain #181](z80ctc-daisy-181.md) · [Digdug 2/3 logic rate](digdug-music-overrun.md) · [Spy Hunter SSIO sound](spyhunt-ssio-sound.md)

## Save states and host features
- [Save-state walker](save-state-walker.md) · [Save-state compat policy](save-state-compat-policy.md) · [Save-state shared arrays](save-state-shared-arrays.md) · [Cart battery saves](cart-battery-saves.md)
- [Analog controls unbound](analog-controls-unbound.md) · [Joystick gate and taps](joystick-gate-and-taps.md) · [PORT_CONDITION controls](port-condition-controls.md) · [Computer keyboard naming](computer-keyboard-naming.md)

## Arcade boards
- [Wardner DSP handshake](wardner-dsp-handshake.md) · [TMS320C10 core](tms320c10-core.md) · [Wardner YM3812](wardner-ym3812.md) · [Disabled four status](disabled-four-status.md) · [Sinistar works](sinistar-works.md)
- [Issue 149 next four](issue-149-next-four.md) · [Issue 151 next four](issue-151-next-four.md) · [T-Unit board lessons](tunit-board-lessons.md) · [Musashi prefetch and slapstic](musashi-prefetch-slapstic.md) · [Arkanoid MCU is live](arkanoid-mcu-live.md) · [Defender attract trap](defender-attract-trap.md)
- [Pinball support](pinball-support.md) — MAME emulates only 250 of 1973 pinball sets

## Consoles and computers
- [Atari 2600 milestone](a2600-milestone.md) · [a2600 verified behaviour](a2600-verified-behaviour.md) · [ColecoVision milestone](coleco-milestone.md) · [Game Boy milestone](gameboy-milestone.md) · [Game Boy blank screen](gameboy-blank-screen.md) · [Console blank regressions](console-blank-regressions.md)
- [Game Boy #294](gameboy-294.md) — slot self-mounts; namespace functions/constants; card-installed views; qualified-name compile error
- [NES console shelf](nes-console-shelf.md) · [NES #171 part 2](nes-171-part2.md) · [NES #184 part 3](nes-184-part3.md) · [Cart shelf naming](cart-shelf-naming.md) · [Computer software room](computer-software-room.md) · [TOSEC shelf provenance](tosec-shelf-provenance.md)
- [SNES long-term goal](snes-long-term-goal.md) · [SNES #174 decisions](snes-174-decisions.md) · [S-DSP silence gaps](sdsp-silence-gaps.md) · [SNES NMI scheduler](snes-nmi-scheduler.md) · [SNES DSP-1 #174](snes-dsp1-174.md)
- C64 #157/#161: [1541 disk bring-up](c64-1541-disk-bringup.md) · [Media slots on demand](media-slots-on-demand.md) · [Disk path performance](disk-path-performance.md) · [Speed](c64-speed-161.md) · [One-click play](c64-autoboot-161.md) · [Acceptance](c64-acceptance-161.md) · [Quickload](c64-quickload-161.md) · [Cartridges](c64-cartridges-161.md) · [Disk writes](c64-disk-writes-161.md) · [.wav tapes](c64-wav-tapes-161.md) · [Slot card reset](slot-card-reset-and-reload.md)
- [ZX Spectrum #165](spectrum-165.md) — 128K banks, specific(), Interface 2 card lists
