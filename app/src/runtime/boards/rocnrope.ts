// Roc'n Rope board: KONAMI-1 (encrypted 6809) main CPU + the shared Konami
// timeplt sound board (Z80 + two AY-3-8910s, src/mame/shared/timeplt_a.cpp,
// ported once in runtime/timeplt-audio.ts and shared with pooyan/timeplt).
// Wiring facts come from the generated config; behavior is hand-transpiled
// from src/mame/konami/rocnrope.cpp (which is itself "Based on drivers from
// Juno First emulator"):
//  - mainlatch (LS259 at 0x8080-0x8087, write_d0):
//      Q0 flip screen (INVERTED: flip = !bit, q_out_cb<0>.set(...).invert())
//      Q1 timeplt sh_irqtrigger_w (rising edge -> HOLD_LINE IM1 IRQ on the
//         sound Z80), Q2 timeplt mute_w, Q3/Q4 coin counters, Q7 irq_mask
//  - vblank (line 240) asserts the main 6809 IRQ (LEVEL held) only while
//    irq_mask is set; writing mask = 0 CLEARS the pending line (irq_mask_w)
//  - interrupt_vector_w (0x8182-0x818d) lands in the "vectors" share, which
//    the map overlays as RAM at 0xfff2-0xfffd on top of the 0x6000-0xffff
//    ROM (the ROM holds 0xff there); the reset vector 0xfffe/f stays ROM.
//    Bus range precedence is last-listed-wins and the config lists vectors
//    after rom, so RAM reads win exactly like MAME's map order.

import { Konami1 } from '../konami1.ts';
import { TimepltAudio } from '../timeplt-audio.ts';
import { LS259 } from '../ls259.ts';
import { Bus, type HandlerRegistry } from '../bus.ts';
import { RocnropeVideo } from '../video/rocnrope.ts';
import { portHandlers } from '../input.ts';
import type { Regions, InputPorts, VideoRenderer, Board, BoardConfig, BoardSinks } from '../types.ts';

export class RocnropeBoard implements Board {
  readonly video: VideoRenderer;
  readonly fbWidth: number;
  readonly fbHeight: number;

  private main!: Konami1;
  private audio!: TimepltAudio;

  private mainlatch = new LS259();

  private irqMask = 0;
  private curLine = 0;

  private cyclesPerLine: number[]; // fractional (tpsound: ~116.52)
  private cycleCarry = [0, 0];
  private vtotal: number;
  private frameCount = 0;
  readonly shares: Record<string, Uint8Array>;

  constructor(config: BoardConfig, regions: Regions, inputs: InputPorts, sinks: BoardSinks) {
    this.vtotal = config.screen.vtotal;
    const [mainSpec, audioSpec] = config.cpus;
    // keep the exact fractional per-line budget and carry the remainder
    this.cyclesPerLine = [mainSpec, audioSpec].map(c =>
      c.clock / config.screen.refresh / this.vtotal);

    this.mainlatch.onQ(0, s => {
      // q_out_cb<0>().set(flip_screen_set).invert()
      (this.video as RocnropeVideo).setFlip(!s);
    });
    this.mainlatch.onQ(1, s => this.audio.shIrqTrigger(s));
    this.mainlatch.onQ(2, s => this.audio.mute(s));
    // Q3/Q4 coin counters: bookkeeping only; Q5/Q6 unused
    this.mainlatch.onQ(7, s => {
      this.irqMask = s;
      if (!s) this.main.setIrqLine(false); // irq_mask_w: mask=0 clears the line
    });

    // --- handler registry ----------------------------------------------------
    const shares: Record<string, Uint8Array> = {};
    this.shares = shares;
    const frac = () => this.curLine / this.vtotal;

    const registry: HandlerRegistry = {
      read: {
        ...portHandlers(mainSpec.ranges ?? [], inputs),
      },
      write: {
        'watchdog.reset_w': () => { /* accepted, not enforced (galaga precedent) */ },
        'mainlatch.write_d0': (_a, off, d) => this.mainlatch.writeD0(off, d),
        'rocnrope_state.interrupt_vector_w': (_a, off, d) => {
          // lands in the vectors share (RAM overlay at 0xfff2-0xfffd, where
          // the 6809 fetches its IRQ/FIRQ/NMI/SWI vectors)
          const v = shares['vectors'];
          if (v) v[off] = d;
        },
        // bytes are stored by the bus into the shares; the renderer reads the
        // live shares each frame, so no dirty-marking is needed
        'rocnrope_state.colorram_w': () => { /* full-frame render */ },
        'rocnrope_state.videoram_w': () => { /* full-frame render */ },
      },
    };

    // --- CPUs + buses ---------------------------------------------------------
    // region key drift: the sound ROM region is the timeplt_audio subdevice's
    // ("timeplt_audio:tpsound" in config.roms) while the cpu spec carries the
    // bare tag ("tpsound") — accept either
    const resolveRegion = (name: string): Uint8Array | undefined =>
      regions[name] ?? regions[Object.keys(regions).find(k => k.endsWith(`:${name}`)) ?? ''];
    const mainRom = resolveRegion(mainSpec.region);
    const audioRom = resolveRegion(audioSpec.region);
    if (!mainRom || !audioRom) throw new Error('missing rom region');
    // TimepltAudio installs the ay/soundlatch/filter handlers into the
    // registry and builds the sound CPU's own bus
    this.audio = new TimepltAudio(audioSpec, audioRom, registry, shares, sinks, frac);
    this.main = new Konami1(new Bus(mainSpec.ranges ?? [], mainRom, registry, shares));

    // --- video ----------------------------------------------------------------
    this.video = new RocnropeVideo({
      regions,
      videoram: shares['videoram'] ?? new Uint8Array(0x400),
      colorram: shares['colorram'] ?? new Uint8Array(0x400),
      spriteram0: shares['spriteram[0]'] ?? new Uint8Array(0x30),
      spriteram1: shares['spriteram[1]'] ?? new Uint8Array(0x30),
    });
    this.fbWidth = this.video.width;
    this.fbHeight = this.video.height;

    this.reset();
  }

  reset(): void {
    this.mainlatch.reset();
    // latch reset leaves Q0 = 0 -> flip = !0 = true until the game's init
    // code writes Q0 = 1 (upright), matching MAME's inverted callback
    (this.video as RocnropeVideo).setFlip(true);
    this.irqMask = 0;
    this.cycleCarry = [0, 0];
    this.main.reset();
    this.audio.reset();
  }

  frame(fb: Uint32Array): void {
    const [mainPerLine, audioPerLine] = this.cyclesPerLine;
    const carry = this.cycleCarry;
    for (let line = 0; line < this.vtotal; line++) {
      this.curLine = line;
      if (line === 240) { // vblank start (visible 16..239 native)
        if (this.irqMask) this.main.setIrqLine(true); // held until mask clears
        this.video.vblank();
      }
      // fractional cycle budgets: run whole cycles, carry the remainder
      // (and any overshoot — run() finishes the last instruction) forward
      carry[0] += mainPerLine;
      carry[0] -= this.main.run(Math.floor(carry[0]));
      carry[1] += audioPerLine;
      carry[1] -= this.audio.run(Math.floor(carry[1]));
    }
    this.frameCount++;
    this.video.render(fb);
  }

  snapshot() {
    return {
      frame: this.frameCount,
      cpus: [
        { tag: 'maincpu', pc: this.main.pc, sp: this.main.s, a: this.main.a, halted: this.main.halted },
        { tag: 'tpsound', pc: this.audio.cpu.pc, sp: this.audio.cpu.sp, a: this.audio.cpu.a, halted: this.audio.cpu.halted },
      ],
      mainlatch: this.mainlatch.value,
      irqMask: this.irqMask,
      soundlatch: this.audio.soundlatch,
      muted: this.audio.muted,
    };
  }
}
