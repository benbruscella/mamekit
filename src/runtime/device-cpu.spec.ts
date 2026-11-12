// A CPU compiled whole as its MAME class, run through DeviceCpu as a board
// processor runs it: MAME's m6800/m6801 classes, from source, with a bus.
import assert from 'node:assert/strict';
import { indexMameHardware } from '../mame/hardware.ts';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { createDevice, registerGeneratedDevice, type Device } from './generated-device.ts';
import { DeviceCpu } from './device-cpu.ts';
import type { CpuBus } from './generated-cpu.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const index = indexMameHardware(mameSrc);

function deviceCpu(type: string, bus: CpuBus, regions: Record<string, Uint8Array> = {}): { cpu: DeviceCpu; device: Device } {
  const definition = compileMameDevice(mameSrc, index.get(type)!, type);
  assert.equal(definition.summary.diagnostics, 0, `${type} compiles whole`);
  registerGeneratedDevice(definition);
  const device = createDevice(type, { tag: 'cpu', clock: 4_000_000, configuredSpaces: [0], regions });
  const cpu = new DeviceCpu(device, bus, {
    setInputLine: (line, state) => { device.call('execute_set_input', line, state === 2 ? 1 : state); },
    acknowledgeLine: () => 0,
  });
  return { cpu, device };
}

const registers = (device: Device) => (device as unknown as { members: Record<string, { b: { h: number }; w: { l: number } }> }).members;

// The 6803 from m6801.cpp: the reset vector, execute_run's opcode table
// (m6803_insn, handed down two constructors) and its on-chip port 1, which a
// write to 0x02 drives through out_p1_cb as MAME drives it: data bits under
// the direction register, the rest pulled high.
{
  const memory = new Uint8Array(0x10000);
  memory.set([0x86, 0x5a, 0x97, 0x02, 0x01, 0x20, 0xfe], 0x0200); // LDAA #$5A; STAA $02; NOP; BRA *
  memory[0xfffe] = 0x02;
  memory[0xffff] = 0x00;
  const { cpu, device } = deviceCpu('M6803', {
    read: address => memory[address]!,
    write: (address, data) => { memory[address] = data; },
    in: () => 0xff,
    out: () => {},
  });
  const port1: number[] = [];
  device.on('out_p1_cb', (...args: unknown[]) => { port1.push(Number(args.length >= 3 ? args.at(-2) : args.at(-1))); return 0; });
  cpu.reset();
  assert.ok(cpu.run(40) >= 40, 'execute_run spends its slice');
  assert.equal(registers(device).m_d!.b.h, 0x5a);
  assert.equal(registers(device).m_pc!.w.l, 0x0205, 'the loop at the end is where it stops');
  assert.deepEqual(port1, [0xff]);
  assert.equal(memory[0x02], 0, 'port 1 is on-chip: the write never reaches the bus');
}

// The 6802's CLI takes a level IRQ only once the instruction after it has run
// (m6800's own cli handler), so the handler's read of the PIA that drops the
// line happens exactly once.
{
  const memory = new Uint8Array(0x10000);
  memory.set([0x0e, 0x01, 0x01, 0x20, 0xfe], 0x8000); // CLI; NOP; NOP; BRA *
  memory.set([0x0e, 0xb6, 0x40, 0x00, 0x3b], 0x9000); // CLI; LDAA $4000; RTI
  memory[0xfff8] = 0x90;
  memory[0xfff9] = 0x00;
  memory[0xfffe] = 0x80;
  memory[0xffff] = 0x00;
  let reads = 0;
  let cpu: DeviceCpu | undefined;
  ({ cpu } = deviceCpu('M6802', {
    read: address => {
      if (address === 0x4000) {
        reads++;
        cpu!.setIrqLine(false);
      }
      return memory[address]!;
    },
    write: (address, data) => { memory[address] = data; },
    in: () => 0xff,
    out: () => {},
  }));
  cpu.reset();
  cpu.setIrqLine(true);
  for (let slice = 0; slice < 8; slice++) cpu.run(8);
  assert.equal(reads, 1, 'the handler reads the PIA once, and the dropped line is not taken again');
}

// The 8080 from i8085.cpp: OUT reaches the IO space, and an IRQ taken after EI
// fetches the vector the board gave with the line (an RST, as invaders' is).
{
  const memory = new Uint8Array(0x10000);
  memory.set([0x3e, 0x5a, 0xd3, 0x03, 0xfb, 0x00, 0xc3, 0x45, 0x00], 0x0040); // MVI A,$5A; OUT 3; EI; NOP; JMP $45
  memory.set([0xc3, 0x40, 0x00], 0x0000); // JMP $40
  memory.set([0x3e, 0x77, 0xd3, 0x04, 0x76], 0x0008); // RST 1: MVI A,$77; OUT 4; HLT
  const writes: string[] = [];
  const { cpu, device } = deviceCpu('I8080', {
    read: address => memory[address]!,
    write: (address, data) => { memory[address] = data; },
    in: () => 0xff,
    out: (port, data) => { writes.push(`${port}=${data.toString(16)}`); },
  });
  cpu.reset();
  cpu.run(40);
  assert.deepEqual(writes, ['3=5a']);
  cpu.setIrqLine(true, 0xcf);
  cpu.run(60);
  assert.deepEqual(writes, ['3=5a', '4=77'], 'RST 1 from the data bus');
  assert.equal(device.get('m_halt'), 1, 'HLT');
}

// The MCS-48 from mcs48.cpp. R0 is m_regptr[0], a pointer into the RAM its
// own data map shares as "data" (m_dataptr). An 8039 has no ROM and runs from
// the bus; an M58715's 2K is a view of its own region that EA takes away,
// and the external ROM under it shows through (memory_view::disable).
{
  // MOV A,#n; MOV R0,A; MOV A,#0; MOV A,R0; OUTL P1,A; JMP $07
  const program = (value: number) => [0x23, value, 0xa8, 0x23, 0x00, 0xf8, 0x39, 0x04, 0x07];
  const run = (type: string, regions: Record<string, Uint8Array>, ea?: boolean) => {
    const external = new Uint8Array(0x1000);
    external.set(program(0x22));
    const p1: number[] = [];
    const { cpu, device } = deviceCpu(type, {
      read: address => external[address]!,
      write: () => {},
      in: () => 0xff,
      out: () => {},
    }, regions);
    device.on('p1_out_cb', (...args: unknown[]) => { p1.push(Number(args.length >= 3 ? args.at(-2) : args.at(-1))); return 0; });
    if (ea !== undefined) cpu.setInputLine(device.constant('MCS48_INPUT_EA')!, ea ? 1 : 0);
    cpu.reset();
    cpu.run(30);
    return p1;
  };
  // device_reset puts port 1 in input mode, 0xff, before the program runs.
  assert.deepEqual(run('I8039', {}), [0xff, 0x22], 'an 8039 runs from the bus');
  const internal = new Uint8Array(0x800);
  internal.set(program(0x11));
  assert.deepEqual(run('M58715', { cpu: internal }), [0xff, 0x11], 'EA low: the internal ROM view');
  assert.deepEqual(run('M58715', { cpu: internal }, true), [0xff, 0x22], 'EA high: the view disabled, the bus beneath');
}

// The 6809 from m6809.cpp, its execute_run the m6809.hxx state machine MAME
// generates at build time; and the KONAMI-1 beside it, whose own memory
// interface (mi_konami1::read_opcode) unscrambles every opcode byte by its
// address: xor 0x22, 0x82, 0x28 or 0x88 on address bits 1 and 3.
{
  // LDA #$5A; STA $2000; BRA *
  const program = [0x86, 0x5a, 0xb7, 0x20, 0x00, 0x20, 0xfe];
  const run = (type: string, encrypt: boolean) => {
    const memory = new Uint8Array(0x10000);
    const key: Record<number, number> = { 0x0: 0x22, 0x2: 0x82, 0x8: 0x28, 0xa: 0x88 };
    // Only opcode fetches are scrambled: the operands stay as written.
    const opcodes = new Set([0, 2, 5]);
    program.forEach((byte, offset) => {
      const address = 0x8000 + offset;
      memory[address] = encrypt && opcodes.has(offset) ? byte ^ key[address & 0xa]! : byte;
    });
    memory[0xfffe] = 0x80;
    memory[0xffff] = 0x00;
    const { cpu } = deviceCpu(type, {
      read: address => memory[address]!,
      write: (address, data) => { memory[address] = data; },
      in: () => 0xff,
      out: () => {},
    });
    cpu.reset();
    cpu.run(40);
    return memory[0x2000];
  };
  assert.equal(run('MC6809', false), 0x5a, 'MC6809: m6809.hxx runs');
  assert.equal(run('KONAMI1', true), 0x5a, 'KONAMI-1: opcodes unscrambled by mi_konami1');
}

console.log('device-cpu.spec: MAME 6801, 6802, 8080, MCS-48, 6809 and KONAMI-1 classes compiled whole run as processors');
