// Roc'n Rope board: KONAMI-1 (encrypted 6809) main CPU + the shared Konami
// timeplt sound board (Z80 + two AY-3-8910s, src/mame/shared/timeplt_a.cpp).
// Wiring facts come from the generated config; behavior is hand-transpiled
// from src/mame/konami/rocnrope.cpp (which is itself "Based on drivers from
// Juno First emulator") + timeplt_a.cpp:
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
//  - sound board (timeplt_a.cpp): AY1 port A read = soundlatch, AY1 port B
//    read = the LS90 bi-quinary timer table indexed by soundZ80 cycles/512;
//    0x8000-0xffff filter_w selects per-channel RC low-pass caps from the
//    ADDRESS bits, forwarded to the ay8910 worklet (offsets 0x90/0x91)

import { Konami1 } from '../konami1.ts';
import { Z80 } from '../z80.ts';
import { AY8910 } from '../ay8910.ts';
import { LS259 } from '../ls259.ts';
import { Bus, type HandlerRegistry } from '../bus.ts';
import { RocnropeVideo } from '../video/rocnrope.ts';
import { portHandlers } from '../input.ts';
import type { Regions, InputPorts, VideoRenderer, Board, BoardConfig, BoardSinks } from '../types.ts';

// timeplt_a.cpp portB_r: divide-by-512 then a divide-by-10 LS90 bi-quinary
// sequence feeding the upper bits of AY1 port B
const SOUND_TIMER = [0x00, 0x10, 0x20, 0x30, 0x40, 0x90, 0xa0, 0xb0, 0xa0, 0xd0];

export class RocnropeBoard implements Board {
  readonly video: VideoRenderer;
  readonly fbWidth: number;
  readonly fbHeight: number;

  private main!: Konami1;
  private audio!: Z80;

  private mainlatch = new LS259();
  // local AY instances exist for register READBACK only (audio renders in
  // the worklet, which gets the graph's clock via sound.clock)
  private ays = [new AY8910(1_789_772), new AY8910(1_789_772)];
  private ayAddr = [0, 0];

  private irqMask = 0;
  private audioIrqHeld = false;
  private soundlatch = 0;
  /** mainlatch Q2 = timeplt mute_w (LA4460 amp DC mute). The ay8910 worklet
   *  has no mute control yet, so the bit is tracked but not enforced. */
  private muted = false;
  private audioCycles = 0;
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

    // AY1 port A = soundlatch, port B = the sound-CPU cycle timer
    // (timeplt_a.cpp device_add_mconfig / portB_r)
    this.ays[0].portARead = () => this.soundlatch;
    this.ays[0].portBRead = () => SOUND_TIMER[Math.floor(this.audioCycles / 512) % 10];

    this.mainlatch.onQ(0, s => {
      // q_out_cb<0>().set(flip_screen_set).invert()
      (this.video as RocnropeVideo).setFlip(!s);
    });
    this.mainlatch.onQ(1, s => {
      // sh_irqtrigger_w: 0->1 edge = HOLD_LINE IM1 IRQ on the sound Z80
      // (LS259 callbacks only fire on change, so s === 1 IS the rising edge)
      if (s) { this.audio.setIrqLine(true); this.audioIrqHeld = true; }
    });
    this.mainlatch.onQ(2, s => { this.muted = !!s; });
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
        'timeplt_audio.sound_data_w': (_a, _o, d) => { this.soundlatch = d; },
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
        'timeplt_audio_device.filter_w': (_a, off) => {
          // timeplt_a.cpp filter_w: RC caps selected by ADDRESS bits, two per
          // channel — ay2 ch0/1/2 = offset bits 0/2/4, ay1 ch0/1/2 = 6/8/10.
          // timeplt's bit0 = 220000 pF / bit1 = 47000 pF is the REVERSE of the
          // worklet's junofrst-convention 0x90+chip byte (bit0 = 47000 pF,
          // bit1 = 220000 pF, see konamiFilterCaps), so swap each 2-bit field.
          const swap2 = (v: number) => ((v & 1) << 1) | ((v >> 1) & 1);
          const chipByte = (c0: number, c1: number, c2: number) =>
            swap2(c0) | (swap2(c1) << 2) | (swap2(c2) << 4);
          sinks.soundWrite(0x90, chipByte((off >> 6) & 3, (off >> 8) & 3, (off >> 10) & 3), frac()); // ay1
          sinks.soundWrite(0x91, chipByte(off & 3, (off >> 2) & 3, (off >> 4) & 3), frac());         // ay2
        },
      },
    };
    for (let i = 0; i < 2; i++) {
      const chip = i;
      registry.write[`ay${i + 1}.address_w`] = (_a, _o, d) => { this.ayAddr[chip] = d & 0x0f; };
      registry.write[`ay${i + 1}.data_w`] = (_a, _o, d) => {
        this.ays[chip].writeReg(this.ayAddr[chip], d);
        sinks.soundWrite(chip * 16 + this.ayAddr[chip], d, frac());
      };
      registry.read[`ay${i + 1}.data_r`] = () => this.ays[chip].readReg(this.ayAddr[chip]);
    }

    // --- CPUs + buses ---------------------------------------------------------
    // region key drift: the sound ROM region is the timeplt_audio subdevice's
    // ("timeplt_audio:tpsound" in config.roms) while the cpu spec carries the
    // bare tag ("tpsound") — accept either
    const resolveRegion = (name: string): Uint8Array | undefined =>
      regions[name] ?? regions[Object.keys(regions).find(k => k.endsWith(`:${name}`)) ?? ''];
    const busFor = (spec: typeof mainSpec) => {
      const rom = resolveRegion(spec.region);
      if (!rom) throw new Error(`missing rom region ${spec.region}`);
      return new Bus(spec.ranges ?? [], rom, registry, shares);
    };
    this.main = new Konami1(busFor(mainSpec));
    this.audio = new Z80(busFor(audioSpec));

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
    this.audioIrqHeld = false;
    this.soundlatch = 0;
    this.muted = false;
    this.ayAddr = [0, 0];
    this.audioCycles = 0;
    this.cycleCarry = [0, 0];
    this.main.reset();
    this.audio.reset();
  }

  /** HOLD_LINE IM1 IRQ on the sound Z80 (released on acceptance) */
  private runAudio(target: number): number {
    let total = 0;
    while (total < target && this.audioIrqHeld) {
      const iffBefore = this.audio.iff1;
      total += this.audio.step();
      if (this.audioIrqHeld && iffBefore === 1 && this.audio.iff1 === 0) {
        this.audio.setIrqLine(false);
        this.audioIrqHeld = false;
      }
    }
    if (total < target) total += this.audio.run(target - total);
    return total;
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
      const ran = this.runAudio(Math.floor(carry[1]));
      carry[1] -= ran;
      this.audioCycles += ran;
    }
    this.frameCount++;
    this.video.render(fb);
  }

  snapshot() {
    return {
      frame: this.frameCount,
      cpus: [
        { tag: 'maincpu', pc: this.main.pc, sp: this.main.s, a: this.main.a, halted: this.main.halted },
        { tag: 'tpsound', pc: this.audio.pc, sp: this.audio.sp, a: this.audio.a, halted: this.audio.halted },
      ],
      mainlatch: this.mainlatch.value,
      irqMask: this.irqMask,
      soundlatch: this.soundlatch,
      muted: this.muted,
    };
  }
}
