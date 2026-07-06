// GngBoard smoke test: synthetic ROMs with a hand-assembled 6809 program
// exercising the real bus/bank/latch/IRQ paths (pattern: boards/galaga.spec.ts).
//
//   main program: LDS -> release audio (mainlatch Q1) -> read a marker byte
//   through each ROM bank into fgvideoram -> write soundlatch -> enable IRQ ->
//   spin. vblank ISR increments fgvideoram[5] once per frame (HOLD_LINE).
//   audio program: IM1/EI, reads soundlatch in a loop; ISR writes a YM2203
//   address/data pair (captured via the soundWrite sink).

import { GngBoard } from './gng.ts';
import type { BoardConfig, InputPorts } from '../types.ts';
import { readFileSync } from 'node:fs';

let pass = 0, fail = 0;
const check = (name: string, cond: boolean) => {
  if (cond) { pass++; console.log(`PASS  ${name}`); }
  else { fail++; console.error(`FAIL  ${name}`); }
};

const cfg = JSON.parse(readFileSync(new URL('../../../dist/gng/config.json', import.meta.url), 'utf8'));
const config: BoardConfig = cfg.board;

// --- synthetic regions -----------------------------------------------------
const main = new Uint8Array(0x18000);
const audio = new Uint8Array(0x10000);
const regions: Record<string, Uint8Array> = {
  maincpu: main,
  audiocpu: audio,
  chars: new Uint8Array(0x4000),
  tiles: new Uint8Array(0x18000),
  sprites: new Uint8Array(0x20000),
  proms: new Uint8Array(0x200),
  plds: new Uint8Array(0x100),
};

// bank markers (machine_start: entries 0-3 = rom[0x10000+n*0x2000], entry 4 = rom[0x4000])
main[0x10000] = 0xb0;
main[0x12000] = 0xb1;
main[0x14000] = 0xb2;
main[0x16000] = 0xb3;
main[0x04000] = 0xb4;

// --- 6809 program at 0x6000 (identity-mapped rom) ---------------------------
let p = 0x6000;
const emit = (...bytes: number[]) => { for (const b of bytes) main[p++] = b; };
emit(0x10, 0xce, 0x1f, 0x00);       // LDS  #$1F00
emit(0x86, 0x01);                   // LDA  #$01
emit(0xb7, 0x3d, 0x01);             // STA  $3D01   ; mainlatch Q1=1 -> audio runs
for (let bank = 0; bank <= 4; bank++) {
  emit(0x86, bank);                 // LDA  #bank
  emit(0xb7, 0x3e, 0x00);           // STA  $3E00   ; bankswitch
  emit(0xb6, 0x40, 0x00);           // LDA  $4000   ; read through the bank
  emit(0xb7, 0x20, 0x00 + bank);    // STA  $2000+n ; -> fgvideoram[n]
}
emit(0x86, 0x5a);                   // LDA  #$5A
emit(0xb7, 0x3a, 0x00);             // STA  $3A00   ; soundlatch
emit(0x1c, 0xef);                   // ANDCC #$EF   ; enable IRQ
emit(0x20, 0xfe);                   // BRA  *
// vblank ISR at 0x7000
p = 0x7000;
emit(0x7c, 0x20, 0x05);             // INC  $2005   ; fgvideoram[5]++
emit(0x3b);                         // RTI
// vectors (identity rom range covers 0xfff8-0xffff)
main[0xfff8] = 0x70; main[0xfff9] = 0x00; // IRQ  -> $7000
main[0xfffe] = 0x60; main[0xffff] = 0x00; // RESET-> $6000

// --- Z80 sound program -------------------------------------------------------
let q = 0;
const emitA = (...bytes: number[]) => { for (const b of bytes) audio[q++] = b; };
emitA(0xed, 0x56);                  // IM 1
emitA(0xfb);                        // EI
emitA(0x3a, 0x00, 0xc8);            // loop: LD A,($C800) ; soundlatch
emitA(0x32, 0x00, 0xc0);            // LD ($C000),A
emitA(0x18, 0xf8);                  // JR loop
q = 0x38;                            // IM1 ISR
emitA(0x3e, 0x30);                  // LD A,$30
emitA(0x32, 0x00, 0xe0);            // LD ($E000),A  ; ym1 address
emitA(0x3e, 0x55);                  // LD A,$55
emitA(0x32, 0x01, 0xe0);            // LD ($E001),A  ; ym1 data
emitA(0xfb, 0xed, 0x4d);            // EI / RETI

// --- run ---------------------------------------------------------------------
const idle: InputPorts = { read: () => 0xff };
const writes: [number, number][] = [];
const board = new GngBoard(config, regions, idle, {
  soundWrite: (off, d) => writes.push([off, d]),
});

const fb = new Uint32Array(board.fbWidth * board.fbHeight);
const FRAMES = 5;
for (let i = 0; i < FRAMES; i++) board.frame(fb);

const snap = board.snapshot() as ReturnType<GngBoard['snapshot']>;
const fgram = board.shares['fgvideoram'];

check('framebuffer sized 256x224', board.fbWidth === 256 && board.fbHeight === 224);
check('fgvideoram share exists', !!fgram);
check('bank 0 marker read', fgram[0] === 0xb0);
check('bank 1 marker read', fgram[1] === 0xb1);
check('bank 2 marker read', fgram[2] === 0xb2);
check('bank 3 marker read', fgram[3] === 0xb3);
check('bank entry-4 alias read', fgram[4] === 0xb4);
check('main parked in spin loop', snap.cpus[0].pc >= 0x6000 && snap.cpus[0].pc < 0x7000);
check(`vblank ISR ran once per frame (${fgram[5]}/${FRAMES})`, fgram[5] === FRAMES);
check('audio released from reset (mainlatch Q1)', snap.cpus[1].held === false);
check('soundlatch delivered', snap.soundlatch === 0x5a);
check('ym1 address write reached the sink', writes.some(([o, d]) => o === 0 && d === 0x30));
check('ym1 data write reached the sink', writes.some(([o, d]) => o === 1 && d === 0x55));
check('audio ISR fired 4x/frame-ish', writes.filter(([o]) => o === 1).length >= FRAMES * 3);
check('bankBase parked on entry 4', snap.bankBase === 0x4000);

console.log(fail ? `\n${fail} FAILED` : '\nALL PASS');
process.exitCode = fail ? 1 : 0;
