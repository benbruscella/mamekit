// Ghosts 'n Goblins board: MC6809 main (banked ROM) + Z80 sound driving two
// YM2203s. Wiring facts come from the generated config; behavior is
// hand-transpiled from src/mame/capcom/gng.cpp:
//  - main IRQ: HOLD_LINE at vblank (set_vblank_int irq0_line_hold) —
//    asserted at line 240, released once the 6809 vectors
//  - audio Z80: periodic HOLD_LINE IRQ at 4 × 60 Hz (set_periodic_int)
//  - mainlatch (0x3d00): Q0 flip (inverted), Q1 audio-CPU /RESET (inverted)
//    + YM reset on low, Q2/Q3 coin counters
//  - bankswitch (0x3e00): entries 0-3 = rom[0x10000 + n*0x2000] (machine_start
//    configure_entries), entry 4 = rom[0x4000] alias; data 4 -> entry 4,
//    else data & 3
//  - buffered spriteram: writing 0x3c00 copies live 0x1e00-0x1fff into the
//    buffer sprites are drawn from (bufsprite.h write() -> copy())
//  - palette: RAM shares written via palette.write8 (base) / write8_ext,
//    format RGBx_444 — the video module assembles colors per frame
//  - MC6809 (non-E) divides its crystal by 4 internally: 6 MHz XTAL ->
//    1.5 MHz E clock for cycle budgeting

import { M6809 } from '../m6809.ts';
import { Z80 } from '../z80.ts';
import { LS259 } from '../ls259.ts';
import { Bus, type HandlerRegistry } from '../bus.ts';
import { GngVideo } from '../video/gng.ts';
import { portHandlers } from '../input.ts';
import type { Regions, InputPorts, VideoRenderer, Board, BoardConfig, BoardSinks } from '../types.ts';

export class GngBoard implements Board {
  readonly video: VideoRenderer;
  readonly fbWidth: number;
  readonly fbHeight: number;

  private main!: M6809;
  private audio!: Z80;

  private mainlatch = new LS259();
  private mainRom: Uint8Array;
  private bankBase = 0x10000; // entry 0

  private soundlatch = 0;
  private audioHeld = true;   // Q1 low at reset holds the sound CPU
  private audioIrqHeld = false;
  private mainIrqHeld = false;

  private scrollx = new Uint8Array(2);
  private scrolly = new Uint8Array(2);
  private paletteBase = new Uint8Array(0x100);
  private paletteExt = new Uint8Array(0x100);
  private spriteBuffer = new Uint8Array(0x200);
  private flip = false;

  private cyclesPerLine: number[];
  private vtotal: number;
  private frameCount = 0;
  readonly shares: Record<string, Uint8Array>;

  constructor(config: BoardConfig, regions: Regions, inputs: InputPorts, sinks: BoardSinks) {
    this.vtotal = config.screen.vtotal;
    const [mainSpec, audioSpec] = config.cpus;
    // MC6809 internal /4; the Z80 runs straight off its clock
    this.cyclesPerLine = [mainSpec, audioSpec].map(c => {
      const divide = c.type === 'mc6809' ? 4 : 1;
      return Math.round(c.clock / divide / config.screen.refresh / this.vtotal);
    });

    const rom = regions[mainSpec.region];
    if (!rom) throw new Error(`missing rom region ${mainSpec.region}`);
    this.mainRom = rom;

    this.mainlatch.onQ(0, s => { this.flip = !s; });       // .invert()
    this.mainlatch.onQ(1, s => {                            // /RESET (inverted) + ym reset while low
      this.audioHeld = !s;
      if (!s) {
        this.audio.reset();
        this.audioIrqHeld = false;
        sinks.soundWrite(0xff, 0); // worklet-side reset (both chips)
      }
    });
    // Q2/Q3 coin counters: bookkeeping only

    // --- handler registry ----------------------------------------------------
    const shares: Record<string, Uint8Array> = {};
    this.shares = shares;

    const registry: HandlerRegistry = {
      read: {
        ...portHandlers(mainSpec.ranges ?? [], inputs),
        'bank.mainbank': (_a, off) => this.mainRom[this.bankBase + off],
        'soundlatch.read': () => this.soundlatch,
      },
      write: {
        'gng_state.fgvideoram_w': () => { /* bytes stored by bus; full-frame render */ },
        'gng_state.bgvideoram_w': () => { /* bytes stored by bus; full-frame render */ },
        'gng_state.bgscrollx_w': (_a, off, d) => { this.scrollx[off & 1] = d; },
        'gng_state.bgscrolly_w': (_a, off, d) => { this.scrolly[off & 1] = d; },
        'gng_state.bankswitch_w': (_a, _o, d) => {
          this.bankBase = d === 4 ? 0x4000 : 0x10000 + (d & 3) * 0x2000;
        },
        'palette.write8': (_a, off, d) => { this.paletteBase[off & 0xff] = d; },
        'palette.write8_ext': (_a, off, d) => { this.paletteExt[off & 0xff] = d; },
        'soundlatch.write': (_a, _o, d) => { this.soundlatch = d; },
        'spriteram.write': () => {
          const live = shares['spriteram'];
          if (live) this.spriteBuffer.set(live.subarray(0, 0x200));
        },
        'mainlatch.write_d0': (_a, off, d) => this.mainlatch.writeD0(off, d),
        // audio side: two write-only YM2203s, banked into the worklet as
        // offset = chip*2 + (0 = address, 1 = data)
        'ym1.write': (_a, off, d) => sinks.soundWrite(0 + (off & 1), d),
        'ym2.write': (_a, off, d) => sinks.soundWrite(2 + (off & 1), d),
      },
    };

    // --- CPUs + buses ---------------------------------------------------------
    const busFor = (spec: typeof mainSpec) => {
      const r = regions[spec.region];
      if (!r) throw new Error(`missing rom region ${spec.region}`);
      return new Bus(spec.ranges ?? [], r, registry, shares);
    };
    this.main = new M6809(busFor(mainSpec));
    this.audio = new Z80(busFor(audioSpec));

    // --- video ----------------------------------------------------------------
    this.fbWidth = config.screen.width;
    this.fbHeight = config.screen.height;
    this.video = new GngVideo({
      regions,
      fgram: () => shares['fgvideoram'] ?? new Uint8Array(0x800),
      bgram: () => shares['bgvideoram'] ?? new Uint8Array(0x800),
      spriteBuffer: () => this.spriteBuffer,
      scrollx: () => this.scrollx[0] + 256 * this.scrollx[1],
      scrolly: () => this.scrolly[0] + 256 * this.scrolly[1],
      paletteBase: () => this.paletteBase,
      paletteExt: () => this.paletteExt,
      flip: () => this.flip,
    });

    this.reset();
  }

  reset(): void {
    this.mainlatch.reset(); // Q1 -> 0: audio held, flip cleared via callbacks
    this.bankBase = 0x10000;
    this.soundlatch = 0;
    this.mainIrqHeld = false;
    this.audioIrqHeld = false;
    this.main.reset();
    this.audio.reset();
  }

  /** MAME HOLD_LINE on the 6809: the line stays asserted until the IRQ is
   *  actually taken (irqCount ticks). While the game masks IRQs the line
   *  simply stays high — which also lets the boot code's SYNC-loop settle
   *  delay fall through, exactly as on hardware/MAME. */
  private runMain(target: number): number {
    let total = 0;
    if (this.mainIrqHeld) {
      this.main.setIrqLine(true);
      const before = this.main.irqCount;
      while (total < target && this.main.irqCount === before) total += this.main.step();
      if (this.main.irqCount !== before) {
        this.main.setIrqLine(false);
        this.mainIrqHeld = false;
      }
    }
    if (total < target) total += this.main.run(target - total);
    return total;
  }

  /** HOLD_LINE IM1 IRQ on the sound Z80 (released on acceptance) */
  private runAudio(target: number): number {
    if (this.audioHeld) return target; // held in reset by mainlatch Q1
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
    // 4 × 60 Hz periodic sound IRQ ≈ every vtotal/4 lines
    const audioIrqLines = [0, 1, 2, 3].map(k => Math.floor((this.vtotal * k) / 4));
    for (let line = 0; line < this.vtotal; line++) {
      if (line === 240) { // vblank start (visible 16..239)
        this.mainIrqHeld = true;
        this.video.vblank();
      }
      if (audioIrqLines.includes(line) && !this.audioHeld) {
        this.audio.setIrqLine(true);
        this.audioIrqHeld = true;
      }
      this.runMain(mainPerLine);
      this.runAudio(audioPerLine);
    }
    this.frameCount++;
    this.video.render(fb);
  }

  snapshot() {
    return {
      frame: this.frameCount,
      cpus: [
        { tag: 'maincpu', pc: this.main.pc, sp: this.main.s, a: this.main.a, halted: this.main.halted },
        { tag: 'audiocpu', pc: this.audio.pc, sp: this.audio.sp, a: this.audio.a, halted: this.audio.halted, held: this.audioHeld },
      ],
      mainlatch: this.mainlatch.value,
      bankBase: this.bankBase,
      soundlatch: this.soundlatch,
    };
  }
}
