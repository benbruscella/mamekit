// RocnropeBoard smoke test: synthetic ROMs with a hand-assembled,
// KONAMI-1-ENCRYPTED 6809 program exercising the real bus/latch/IRQ paths
// (pattern: boards/galaga.spec.ts + gng.spec.ts; encryption per
// konami1.spec.ts — opcode fetch positions XOR-scrambled, operands plain).
//
//   main program: LDS -> mainlatch Q7 (irq_mask) -> write the IRQ vector via
//   interrupt_vector_w (0x8188/9 -> vectors share -> 6809 fetch at 0xfff8) ->
//   soundlatch -> mainlatch Q1 rising edge (sound IRQ) -> fill videoram ->
//   ANDCC -> spin. vblank ISR bumps videoram[5], drops + re-arms irq_mask
//   (level-held line, exactly one IRQ per frame).
//
//   tpsound program: SP/IM1/EI, then loops reading AY1 port B (the LS90
//   timer) into AY2 reg 1; the RST38 ISR reads AY1 port A (= soundlatch)
//   into AY2 reg 0 and pokes filter_w. All observed via the soundWrite sink.
//
// Run: node src/runtime/boards/rocnrope.spec.ts

import { RocnropeBoard } from './rocnrope.ts';
import { konami1Decrypt } from '../konami1.ts';
import type { BoardConfig, InputPorts } from '../types.ts';
import { readFileSync } from 'node:fs';

let pass = 0, fail = 0;
const check = (name: string, cond: boolean) => {
  if (cond) { pass++; console.log(`PASS  ${name}`); }
  else { fail++; console.error(`FAIL  ${name}`); }
};

const cfg = JSON.parse(readFileSync(new URL('../../../dist/rocnrope/config.json', import.meta.url), 'utf8'));
const config: BoardConfig = cfg.board;

// --- synthetic regions -------------------------------------------------------
const main = new Uint8Array(0x10000);
const snd = new Uint8Array(0x10000);
const regions: Record<string, Uint8Array> = {
  maincpu: main,
  'timeplt_audio:tpsound': snd, // assembleRegions key (subdevice-tagged)
  sprites: new Uint8Array(0x8000),
  tiles: new Uint8Array(0x4000),
  proms: new Uint8Array(0x220),
};

// --- KONAMI-1 6809 program at 0x6000 ----------------------------------------
// op() emits opcode-fetch bytes ENCRYPTED (the involution konami1Decrypt);
// db() emits operands/data plain — exactly konami1.spec.ts's convention.
let p = 0x6000;
const op = (...bytes: number[]) => { for (const b of bytes) { main[p] = konami1Decrypt(p, b); p++; } };
const db = (...bytes: number[]) => { for (const b of bytes) main[p++] = b; };

op(0x10, 0xce); db(0x5f, 0x00);   // LDS  #$5F00   ; stack in work RAM
op(0x86); db(0x01);               // LDA  #$01
op(0xb7); db(0x80, 0x87);         // STA  $8087    ; mainlatch Q7: irq_mask = 1
op(0x86); db(0x70);               // LDA  #$70
op(0xb7); db(0x81, 0x88);         // STA  $8188    ; interrupt_vector_w[6] = IRQ hi
op(0x86); db(0x00);               // LDA  #$00
op(0xb7); db(0x81, 0x89);         // STA  $8189    ; interrupt_vector_w[7] = IRQ lo
op(0x86); db(0x5a);               // LDA  #$5A
op(0xb7); db(0x81, 0x00);         // STA  $8100    ; soundlatch (sound_data_w)
op(0x86); db(0x01);               // LDA  #$01
op(0xb7); db(0x80, 0x81);         // STA  $8081    ; mainlatch Q1 rising -> sound IRQ
op(0x86); db(0x42);               // LDA  #$42
op(0xb7); db(0x4c, 0x00);         // STA  $4C00    ; videoram[0] (videoram_w path)
op(0x86); db(0x07);               // LDA  #$07
op(0xb7); db(0x48, 0x00);         // STA  $4800    ; colorram[0] (colorram_w path)
op(0x1c); db(0xef);               // ANDCC #$EF    ; enable IRQ
op(0x20); db(0xfe);               // BRA  *        ; spin

// vblank ISR at 0x7000: count the frame, then drop + re-arm the level-held
// IRQ mask so exactly one interrupt is taken per vblank (the real game's ISR
// does the same dance through the latch)
p = 0x7000;
op(0x7c); db(0x4c, 0x05);         // INC  $4C05    ; videoram[5]++
op(0x7f); db(0x80, 0x87);         // CLR  $8087    ; irq_mask = 0 -> clears line
op(0x86); db(0x01);               // LDA  #$01
op(0xb7); db(0x80, 0x87);         // STA  $8087    ; re-arm
op(0x3b);                          // RTI

// reset vector: a DATA read, stored plain, and served from ROM (0xfffe/f is
// past the vectors RAM overlay at 0xfff2-0xfffd)
main[0xfffe] = 0x60; main[0xffff] = 0x00;
// the ROM under the vectors overlay holds 0xff, like the real board
main.fill(0xff, 0xfff2, 0xfffe);

// --- tpsound Z80 program -----------------------------------------------------
let q = 0;
const z = (...bytes: number[]) => { for (const b of bytes) snd[q++] = b; };
z(0x31, 0xff, 0x33);              // LD SP,$33FF   ; RAM 0x3000-0x33ff
z(0xed, 0x56);                    // IM 1
z(0xfb);                          // EI
// loop: read AY1 port B (timer) into AY2 reg 1
z(0x3e, 0x0f);                    // LD A,$0F
z(0x32, 0x00, 0x50);              // LD ($5000),A  ; AY1 address = 15 (port B)
z(0x3e, 0x01);                    // LD A,$01
z(0x32, 0x00, 0x70);              // LD ($7000),A  ; AY2 address = 1
z(0x3a, 0x00, 0x40);              // LD A,($4000)  ; AY1 data_r -> timer value
z(0x32, 0x00, 0x60);              // LD ($6000),A  ; AY2 data_w -> sink 0x11
z(0x18, 0xee);                    // JR loop (0x06)
// RST38 ISR: read AY1 port A (= soundlatch) into AY2 reg 0, poke filter_w
q = 0x38;
z(0xf5);                          // PUSH AF
z(0x3e, 0x00);                    // LD A,$00
z(0x32, 0x00, 0x70);              // LD ($7000),A  ; AY2 address = 0
z(0x3e, 0x0e);                    // LD A,$0E
z(0x32, 0x00, 0x50);              // LD ($5000),A  ; AY1 address = 14 (port A)
z(0x3a, 0x00, 0x40);              // LD A,($4000)  ; AY1 data_r -> soundlatch
z(0x32, 0x00, 0x60);              // LD ($6000),A  ; AY2 data_w -> sink 0x10
z(0x32, 0x41, 0x80);              // LD ($8041),A  ; filter_w offset 0x41
z(0xf1);                          // POP AF
z(0xfb);                          // EI
z(0xed, 0x4d);                    // RETI

// --- run ---------------------------------------------------------------------
const idle: InputPorts = { read: () => 0xff };
const writes: [number, number][] = [];
const board = new RocnropeBoard(config, regions, idle, {
  soundWrite: (off, d) => writes.push([off, d]),
});

const fb = new Uint32Array(board.fbWidth * board.fbHeight);
const FRAMES = 5;
for (let i = 0; i < FRAMES; i++) board.frame(fb);

const snap = board.snapshot() as ReturnType<RocnropeBoard['snapshot']>;
const videoram = board.shares['videoram'];
const colorram = board.shares['colorram'];
const vectors = board.shares['vectors'];

check('framebuffer sized 256x224 native', board.fbWidth === 256 && board.fbHeight === 224);
check('vectors share exists (12 bytes)', !!vectors && vectors.length === 12);
check('interrupt_vector_w landed at 0xfff8/9 (vectors[6..7])',
  !!vectors && vectors[6] === 0x70 && vectors[7] === 0x00);
check('videoram write stored through videoram_w', !!videoram && videoram[0] === 0x42);
check('colorram write stored through colorram_w', !!colorram && colorram[0] === 0x07);
check(`vblank ISR ran once per frame via RAM vector (${videoram?.[5]}/${FRAMES})`,
  !!videoram && videoram[5] === FRAMES);
check('main parked in spin loop', snap.cpus[0].pc >= 0x6000 && snap.cpus[0].pc < 0x7000);
check('irq_mask re-armed by ISR', snap.irqMask === 1);
check('soundlatch delivered (sound_data_w)', snap.soundlatch === 0x5a);
check('sound Z80 parked in its polling loop', snap.cpus[1].pc >= 0x06 && snap.cpus[1].pc < 0x18);

// sound IRQ chain: Q1 rising edge -> IM1 RST38 -> AY1 port A (= soundlatch)
// forwarded into AY2 reg 0 -> soundWrite sink offset 0x10 with 0x5A
check('Q1 trigger took the IM1 IRQ: soundlatch read back through AY1 port A',
  writes.some(([o, d]) => o === 0x10 && d === 0x5a));

// timer: AY1 port B values (relayed into AY2 reg 1 = sink offset 0x11)
// must move through the bi-quinary table as sound-CPU cycles accumulate
const timerValues = new Set(writes.filter(([o]) => o === 0x11).map(([, d]) => d));
check(`timer table advances over time (${timerValues.size} distinct values)`, timerValues.size >= 3);
const TIMER_TABLE = new Set([0x00, 0x10, 0x20, 0x30, 0x40, 0x90, 0xa0, 0xb0, 0xd0]);
check('timer values all come from the timeplt table',
  [...timerValues].every(v => TIMER_TABLE.has(v)));

// filter_w offset 0x41: ay2 ch0 field = 1, ay1 ch0 field = 1 (timeplt bit0 =
// 220000 pF) -> worklet convention swaps to bit1 -> byte 0x02 on both chips
check('filter_w forwarded to worklet chip 0 (0x90)', writes.some(([o, d]) => o === 0x90 && d === 0x02));
check('filter_w forwarded to worklet chip 1 (0x91)', writes.some(([o, d]) => o === 0x91 && d === 0x02));

// AY data writes carried chip-offset convention (chip*16 + reg)
check('AY2 writes use chip 1 offsets', writes.some(([o]) => o >= 0x10 && o < 0x20));

check('framebuffer rendered with opaque alpha',
  (fb[0] >>> 24) === 0xff && (fb[fb.length - 1] >>> 24) === 0xff);

console.log(fail ? `\n${fail} of ${pass + fail} FAILED` : `\nALL PASS (${pass} checks)`);
process.exitCode = fail ? 1 : 0;
