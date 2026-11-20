// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_sunsoft_5.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  const cppMin = (a: number, b: number) => (b < a ? b : a);
  const cppMax = (a: number, b: number) => (a < b ? b : a);
  // An aggregate initializer's struct, marked as one (execute.ts's
  // isGeneratedStruct) through its prototype: like generatedStruct's
  // non-enumerable marker, field walks and spreads never see it, and a
  // literal with a prototype costs nothing next to defineProperty.
  const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
  // CALL_METHOD through a table of method names: each entry's emitted method,
  // resolved once and again only if that entry's name changes (see the
  // CALL_METHOD emission). The last table is held, as a core keeps one until
  // its mode changes.
  const cppDispatch = new WeakMap<object, { names: unknown[]; methods: any[] }>();
  let cppLastTable: unknown, cppLastEntry: { names: unknown[]; methods: any[] } | undefined;
  const cppMethodAt = (table: any, index: number): any => {
    if (!Array.isArray(table)) return undefined;
    let entry = table === cppLastTable ? cppLastEntry : undefined;
    if (!entry) {
      entry = cppDispatch.get(table);
      if (!entry) cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
      cppLastTable = table;
      cppLastEntry = entry;
    }
    const name = table[index];
    if (entry.names[index] === name && name !== undefined) return entry.methods[index];
    entry.names[index] = name;
    return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
  };
  // execute.ts's clearGeneratedStruct, field names read once per struct.
  const cppUnionElements = Symbol.for('mamekit.unionElements');
  const cppStructKeys = new WeakMap<object, string[]>();
  const cppClearStruct = (target: any, value: number): void => {
    let keys = cppStructKeys.get(target);
    if (!keys) cppStructKeys.set(target, keys = Object.keys(target));
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]!;
      const field = target[key];
      if (ArrayBuffer.isView(field) || Array.isArray(field)) (field as any).fill(value);
      else if (field && typeof field === 'object') cppClearStruct(field, value);
      else target[key] = value;
    }
  };
  // memset: typed memory fills in place; a plain array of numbers is set
  // element by element (as the interpreter's fillGeneratedMemory writes it,
  // count elements from 0); an array holding structs, or a pointer into a
  // plain array, goes to the interpreter's rule, which clears each struct.
  const cppMemset = (runtime: any, target: any, value: number, count: any) => {
    const bytes = Number(count);
    if (Array.isArray(target)) {
      for (let index = 0; index < bytes; index++) {
        const element = target[index];
        if (element !== null && typeof element === 'object') {
          // A struct element is cleared field by field (cppClearStruct);
          // anything else array-like takes the interpreter's rule.
          if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
            return runtime.macro("memset", target, value, bytes);
          }
          cppClearStruct(element, value);
          continue;
        }
        target[index] = value;
      }
      return target;
    }
    if (Array.isArray(target?.source)) return runtime.macro("memset", target, value, bytes);
    if (target?.generatedPointer) {
      const width = target.source.BYTES_PER_ELEMENT ?? 1;
      target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
      return target;
    }
    target.fill(value, 0, bytes);
    return target;
  };
  // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
  // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
  // execute.ts's wide operators answer them (a shift of 64 or more is 0).
  const cppLo64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
  const cppHi64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
  const cppShl64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
  const cppShl64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
  const cppShr64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
  const cppShr64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
  const cppStringText = (value: unknown) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);


  function method_read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_get_mirroring(runtime: any): any {
    const members = runtime.members;

    return (((members.m_mirroring ?? 0)) | 0);
  }

  function method_set_mirroring(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mirroring = ((val) | 0);
  }

  function method_get_pcb_ctrl_mirror(runtime: any): any {
    const members = runtime.members;

    return (members.m_pcb_ctrl_mirror ?? 0);
  }

  function method_set_pcb_ctrl_mirror(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
  }

  function method_get_four_screen_vram(runtime: any): any {
    const members = runtime.members;

    return (members.m_four_screen_vram ?? 0);
  }

  function method_set_four_screen_vram(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_four_screen_vram = ((val) ? 1 : 0);
  }

  function method_get_trainer(runtime: any): any {
    const members = runtime.members;

    return (members.m_has_trainer ?? 0);
  }

  function method_set_trainer(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_has_trainer = ((val) ? 1 : 0);
  }

  function method_set_mmc1_type(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mmc1_type = val;
  }

  function method_set_n163_vol(runtime: any, vol: any): any {
    const members = runtime.members;

    members.m_n163_vol = ((vol) | 0);
  }

  function method_set_outer_prg_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_prg_size = ((val) >>> 0);
  }

  function method_set_outer_chr_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_chr_size = ((val) >>> 0);
  }

  function method_set_smd133_addr(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_smd133_addr = ((val) | 0);
  }

  function method_set_x1_005_alt(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
  }

  function method_set_bus_conflict(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_bus_conflict = ((val) ? 1 : 0);
  }

  function method_get_open_bus(runtime: any): any {
    const members = runtime.members;

    return (((members.m_open_bus ?? 0)) & 0xff);
  }

  function method_set_open_bus(runtime: any, val: any): any {
    const members = runtime.members;

    val = ((val) & 0xff);
    members.m_open_bus = ((val) & 0xff);
  }

  function method_get_prg_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_prg ?? 0);
  }

  function method_get_prgram_base(runtime: any): any {
    const members = runtime.members;

    return __addr_get_prgram_base(runtime, (members.m_prgram ?? 0), 0);
  }
  function __addr_get_prgram_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_vrom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_vrom ?? 0);
  }

  function method_get_vram_base(runtime: any): any {
    const members = runtime.members;

    return __addr_get_vram_base(runtime, (members.m_vram ?? 0), 0);
  }
  function __addr_get_vram_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_ciram_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_ciram ?? 0);
  }

  function method_get_battery_base(runtime: any): any {
    const members = runtime.members;

    return __addr_get_battery_base(runtime, (members.m_battery ?? 0), 0);
  }
  function __addr_get_battery_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_mapper_sram_base(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram = members.m_mapper_sram ?? 0;
    return h_m_mapper_sram;
  }

  function method_get_misc_rom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_misc_rom ?? 0);
  }

  function method_get_prg_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_prg_size ?? 0)) >>> 0);
  }

  function method_get_prgram_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_prgram).length) >>> 0);
  }

  function method_get_vrom_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_vrom_size ?? 0)) >>> 0);
  }

  function method_get_vram_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_vram).length) >>> 0);
  }

  function method_get_battery_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_battery).length) >>> 0);
  }

  function method_get_mapper_sram_size(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
    return ((h_m_mapper_sram_size) >>> 0);
  }

  function method_get_misc_rom_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_misc_rom_size ?? 0)) >>> 0);
  }

  function method_ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_hblank_irq(runtime: any, scanline: any, vblank: any, blanked: any): any {
    const members = runtime.members;


  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any): any {
    const members = runtime.members;


  }

  function method_prgram_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_prgram = runtime.resize(members.m_prgram, size));
  }

  function method_battery_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_battery = runtime.resize(members.m_battery, size));
  }

  function method_set_irq_line(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    (__L0 ? __L0(0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
  }

  function method_hi_access_rom(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    let bank: any = (((((offset) >>> (13)) & ((1 << (2)) - 1))) | 0);
    return ((runtime.readIndex((members.m_prg ?? 0), __add_hi_access_rom(runtime, ((h_m_prg_bank[bank]) * (8192)), ((offset) & (8191))))) & 0xff);
  }
  function __add_hi_access_rom(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_account_bus_conflict(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if ((members.m_bus_conflict ?? 0)) {
      return ((((data) & (method_hi_access_rom(runtime, offset)))) & 0xff);
    } else {
      return ((data) & 0xff);
    }
  }

  function method_chr_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    const h_m_chr_src = members.m_chr_src ?? 0;
    const h_m_chr_access = members.m_chr_access ?? 0;
    let bank: any = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
    if (((Number(h_m_chr_src[bank]) === Number(1)) ? 1 : 0)) {
      runtime.writeIndex(h_m_chr_access[bank], ((offset) & (1023)), data);
    }
  }

  function method_chr_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_chr_access = members.m_chr_access ?? 0;
    let bank: any = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
    return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
  }

  function method_device_nes_cart_interface__chr_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_chr_access = members.m_chr_access ?? 0;
    let bank: any = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
    return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
  }

  function method_nt_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    const h_m_nt_writable = members.m_nt_writable ?? 0;
    const h_m_nt_access = members.m_nt_access ?? 0;
    let page: any = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
    if (h_m_nt_writable[page]) {
      runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
    }
  }

  function method_nt_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_nt_access = members.m_nt_access ?? 0;
    let page: any = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
    return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
  }

  function method_read_l(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_get_open_bus(runtime)) & 0xff);
  }

  function method_read_m(runtime: any, offset: any): any {
    const members = runtime.members;

    let bank: any = (((((members.m_wram_bank ?? 0)) & (63))) & 0xff);
    0;
    if ((((((members.m_wram_bank ?? 0)) & (64))) ? 0 : 1)) {
      return ((runtime.readIndex((members.m_prg ?? 0), ((((((bank) * (8192))) + (offset))) & ((((members.m_prg_size ?? 0)) - (1)))))) & 0xff);
    } else {
      if ((((members.m_wram_bank ?? 0)) & (128))) {
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
          return ((runtime.readIndex((members.m_battery ?? 0), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
          return ((runtime.readIndex((members.m_prgram ?? 0), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
        }
      }
    }
    return ((method_get_open_bus(runtime)) & 0xff);
  }

  function method_device_nes_cart_interface__read_m(runtime: any, offset: any): any {
    const members = runtime.members;

    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return ((runtime.readIndex((members.m_battery ?? 0), ((offset) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return ((runtime.readIndex((members.m_prgram ?? 0), ((offset) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
    }
    return ((method_get_open_bus(runtime)) & 0xff);
  }

  function method_write_l(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_write_m(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let bank: any = (((((members.m_wram_bank ?? 0)) & (63))) & 0xff);
    0;
    if ((((((members.m_wram_bank ?? 0)) & (64))) ? 0 : 1)) {
      return;
    } else {
      if ((((members.m_wram_bank ?? 0)) & (128))) {
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_battery"), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_prgram"), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_prgram).length, 1))), data);
        }
      }
    }
  }

  function method_device_nes_cart_interface__write_m(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
    }
  }

  function method_write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ym2149.address_w"], __L1: any = __l["m_ym2149.data_w"];

    data = ((data) & 0xff);
    0;
    switch ((((offset) & (24576)) as number)) {
      case 16384:
      {
        (__L0 ? __L0(((data) & (15))) : ((members.m_ym2149)?.address_w?.(((data) & (15))) ?? 0));
        break;
      }
      case 24576:
      {
        (__L1 ? __L1(data) : ((members.m_ym2149)?.data_w?.(data) ?? 0));
        break;
      }
      default:
      {
        method_fme7_write(runtime, offset, data);
        break;
      }
    }
  }

  function method_fme7_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    0;
    switch ((((offset) & (24576)) as number)) {
      case 0:
      {
        members.m_latch = ((((data) & (15))) & 0xff);
        break;
      }
      case 8192:
      {
        switch (((members.m_latch ?? 0) as number)) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          {
            method_chr1_x(runtime, (members.m_latch ?? 0), data, 0);
            break;
          }
          case 8:
          {
            members.m_wram_bank = ((data) & 0xff);
            break;
          }
          case 9:
          {
            method_prg8_89(runtime, data);
            break;
          }
          case 10:
          {
            method_prg8_ab(runtime, data);
            break;
          }
          case 11:
          {
            method_prg8_cd(runtime, data);
            break;
          }
          case 12:
          {
            switch ((((data) & (3)) as number)) {
              case 0:
              {
                method_set_nt_mirroring(runtime, 1);
                break;
              }
              case 1:
              {
                method_set_nt_mirroring(runtime, 2);
                break;
              }
              case 2:
              {
                method_set_nt_mirroring(runtime, 4);
                break;
              }
              case 3:
              {
                method_set_nt_mirroring(runtime, 3);
                break;
              }
            }
            break;
          }
          case 13:
          {
            members.m_irq_enable = ((data) | 0);
            method_set_irq_line(runtime, 0);
            break;
          }
          case 14:
          {
            members.m_irq_count = (((((((members.m_irq_count ?? 0)) & (65280))) | (data))) & 0xffff);
            break;
          }
          case 15:
          {
            members.m_irq_count = (((((((members.m_irq_count ?? 0)) & (255))) | (((data) << (8))))) & 0xffff);
            break;
          }
        }
        break;
      }
      default:
      {
        0;
        break;
      }
    }
  }

  function method_chr1_x(runtime: any, start: any, bank: any, source: any): any {
    const members = runtime.members;

    method_bank_chr(runtime, 0, start, bank, source);
  }

  function method_bank_chr(runtime: any, shift: any, start: any, bank: any, source: any): any {
    const members = runtime.members;

    const h_m_chr_src = members.m_chr_src ?? 0;
    const h_m_chr_orig = members.m_chr_orig ?? 0;
    const h_m_chr_access = members.m_chr_access ?? 0;
    let base_ptr: any = 0;
    let chr_chunks: any = ((0) >>> 0);
    if (((Number(source) === Number(1)) ? 1 : 0)) {
      base_ptr = __addr_bank_chr(runtime, (members.m_vram ?? 0), 0);
      chr_chunks = (((members.m_vram_chunks ?? 0)) >>> 0);
    } else {
      base_ptr = (members.m_vrom ?? 0);
      chr_chunks = (((members.m_vrom_chunks ?? 0)) >>> 0);
    }
    bank = ((((bank) & (((((chr_chunks) << (((3) - (shift))))) - (1))))) | 0);
    let size: any = ((((1024) << (shift))) | 0);
    let bank_start: any = ((((bank) * (size))) | 0);
    let kbyte: any = ((((1) << (shift))) | 0);
    for (let i: any = ((0) | 0); (((i) < (kbyte)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      h_m_chr_src[((i) + (start))] = source;
      h_m_chr_orig[((i) + (start))] = ((bank_start) + (((i) * (1024))));
      h_m_chr_access[((i) + (start))] = __addr_bank_chr(runtime, base_ptr, h_m_chr_orig[((i) + (start))]);
    }
  }
  function __addr_bank_chr(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_prg8_89(runtime: any, bank: any): any {
    const members = runtime.members;

    method_prg8_x(runtime, 0, bank);
  }

  function method_prg8_x(runtime: any, start: any, bank: any): any {
    const members = runtime.members;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    bank = ((method_prg_8k_bank_num(runtime, bank)) | 0);
    h_m_prg_bank[start] = bank;
    method_update_prg_banks(runtime, start, start);
  }

  function method_prg_8k_bank_num(runtime: any, bank_8k: any): any {
    const members = runtime.members;

    if (((Number((members.m_prg_mask ?? 0)) === Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
      return ((((bank_8k) & ((members.m_prg_mask ?? 0)))) | 0);
    }
    if (((Number(bank_8k) < Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
      return ((bank_8k) | 0);
    }
    bank_8k = ((((bank_8k) & ((members.m_prg_mask ?? 0)))) | 0);
    bank_8k = ((((bank_8k) - (__add_prg_8k_bank_num(runtime, runtime.divide((members.m_prg_mask ?? 0), 2), 1)))) | 0);
    return ((runtime.readIndex((members.m_prg_bank_map ?? 0), bank_8k)) | 0);
  }
  function __add_prg_8k_bank_num(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_update_prg_banks(runtime: any, prg_bank_start: any, prg_bank_end: any): any {
    const members = runtime.members;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    const h_m_prg_bank_mem = members.m_prg_bank_mem ?? 0;
    for (let prg_bank: any = ((prg_bank_start) | 0); (((prg_bank) <= (prg_bank_end)) ? 1 : 0); prg_bank = ((((prg_bank) + (1))) | 0)) {
      (__deref_update_prg_banks(runtime, h_m_prg_bank_mem[prg_bank]).set_entry?.(h_m_prg_bank[prg_bank]) ?? 0);
    }
  }
  function __deref_update_prg_banks(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_prg8_ab(runtime: any, bank: any): any {
    const members = runtime.members;

    method_prg8_x(runtime, 1, bank);
  }

  function method_prg8_cd(runtime: any, bank: any): any {
    const members = runtime.members;

    method_prg8_x(runtime, 2, bank);
  }

  function method_set_nt_mirroring(runtime: any, mirroring: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["fatalerror"];

    switch ((mirroring as number)) {
      default:
      {
        method_set_nt_page(runtime, 0, 0, 0, 1);
        method_set_nt_page(runtime, 1, 0, 0, 1);
        method_set_nt_page(runtime, 2, 0, 1, 1);
        method_set_nt_page(runtime, 3, 0, 1, 1);
        break;
      }
      case 1:
      {
        method_set_nt_page(runtime, 0, 0, 0, 1);
        method_set_nt_page(runtime, 1, 0, 1, 1);
        method_set_nt_page(runtime, 2, 0, 0, 1);
        method_set_nt_page(runtime, 3, 0, 1, 1);
        break;
      }
      case 3:
      {
        method_set_nt_page(runtime, 0, 0, 1, 1);
        method_set_nt_page(runtime, 1, 0, 1, 1);
        method_set_nt_page(runtime, 2, 0, 1, 1);
        method_set_nt_page(runtime, 3, 0, 1, 1);
        break;
      }
      case 4:
      {
        method_set_nt_page(runtime, 0, 0, 0, 1);
        method_set_nt_page(runtime, 1, 0, 0, 1);
        method_set_nt_page(runtime, 2, 0, 0, 1);
        method_set_nt_page(runtime, 3, 0, 0, 1);
        break;
      }
      case 5:
      {
        if (((members.m_ext_ntram).length === 0 ? 1 : 0)) {
          (__L0 ? __L0("4-screen mirroring without on-cart NTRAM!\n") : runtime.macro("fatalerror", "4-screen mirroring without on-cart NTRAM!\n"));
        }
        method_set_nt_page(runtime, 0, 4, 0, 1);
        method_set_nt_page(runtime, 1, 4, 1, 1);
        method_set_nt_page(runtime, 2, 4, 2, 1);
        method_set_nt_page(runtime, 3, 4, 3, 1);
        break;
      }
    }
  }

  function method_set_nt_page(runtime: any, page: any, source: any, bank: any, writable: any): any {
    const members = runtime.members;

    const h_m_nt_src = members.m_nt_src ?? 0;
    const h_m_nt_orig = members.m_nt_orig ?? 0;
    const h_m_nt_access = members.m_nt_access ?? 0;
    const h_m_nt_writable = members.m_nt_writable ?? 0;
    let base_ptr: any = 0;
    switch ((source as number)) {
      case 4:
      {
        base_ptr = __addr_set_nt_page(runtime, (members.m_ext_ntram ?? 0), 0);
        break;
      }
      case 1:
      {
        bank = ((((bank) & ((((((members.m_vrom_chunks ?? 0)) << (3))) - (1))))) | 0);
        base_ptr = (members.m_vrom ?? 0);
        break;
      }
      case 2:
      case 3:
      {
        base_ptr = 0;
        break;
      }
      default:
      {
        base_ptr = (members.m_ciram ?? 0);
        break;
      }
    }
    page = ((((page) & (3))) | 0);
    h_m_nt_src[page] = source;
    if (base_ptr) {
      h_m_nt_orig[page] = ((bank) * (1024));
      h_m_nt_access[page] = __addr_set_nt_page(runtime, base_ptr, h_m_nt_orig[page]);
    }
    h_m_nt_writable[page] = writable;
  }
  function __addr_set_nt_page(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_device_nes_cart_interface__get_mirroring(runtime: any): any {
    const members = runtime.members;

    return (((members.m_mirroring ?? 0)) | 0);
  }

  function method_device_nes_cart_interface__set_mirroring(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mirroring = ((val) | 0);
  }

  function method_device_nes_cart_interface__get_pcb_ctrl_mirror(runtime: any): any {
    const members = runtime.members;

    return (members.m_pcb_ctrl_mirror ?? 0);
  }

  function method_device_nes_cart_interface__set_pcb_ctrl_mirror(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__get_four_screen_vram(runtime: any): any {
    const members = runtime.members;

    return (members.m_four_screen_vram ?? 0);
  }

  function method_device_nes_cart_interface__set_four_screen_vram(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_four_screen_vram = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__get_trainer(runtime: any): any {
    const members = runtime.members;

    return (members.m_has_trainer ?? 0);
  }

  function method_device_nes_cart_interface__set_trainer(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_has_trainer = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__set_mmc1_type(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mmc1_type = val;
  }

  function method_device_nes_cart_interface__set_n163_vol(runtime: any, vol: any): any {
    const members = runtime.members;

    members.m_n163_vol = ((vol) | 0);
  }

  function method_device_nes_cart_interface__set_outer_prg_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_prg_size = ((val) >>> 0);
  }

  function method_device_nes_cart_interface__set_outer_chr_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_chr_size = ((val) >>> 0);
  }

  function method_device_nes_cart_interface__set_smd133_addr(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_smd133_addr = ((val) | 0);
  }

  function method_device_nes_cart_interface__set_x1_005_alt(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__set_bus_conflict(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_bus_conflict = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__get_open_bus(runtime: any): any {
    const members = runtime.members;

    return (((members.m_open_bus ?? 0)) & 0xff);
  }

  function method_device_nes_cart_interface__set_open_bus(runtime: any, val: any): any {
    const members = runtime.members;

    val = ((val) & 0xff);
    members.m_open_bus = ((val) & 0xff);
  }

  function method_device_nes_cart_interface__get_prg_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_prg ?? 0);
  }

  function method_device_nes_cart_interface__get_prgram_base(runtime: any): any {
    const members = runtime.members;

    return __addr_device_nes_cart_interface__get_prgram_base(runtime, (members.m_prgram ?? 0), 0);
  }
  function __addr_device_nes_cart_interface__get_prgram_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_nes_cart_interface__get_vrom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_vrom ?? 0);
  }

  function method_device_nes_cart_interface__get_vram_base(runtime: any): any {
    const members = runtime.members;

    return __addr_device_nes_cart_interface__get_vram_base(runtime, (members.m_vram ?? 0), 0);
  }
  function __addr_device_nes_cart_interface__get_vram_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_nes_cart_interface__get_ciram_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_ciram ?? 0);
  }

  function method_device_nes_cart_interface__get_battery_base(runtime: any): any {
    const members = runtime.members;

    return __addr_device_nes_cart_interface__get_battery_base(runtime, (members.m_battery ?? 0), 0);
  }
  function __addr_device_nes_cart_interface__get_battery_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_nes_cart_interface__get_mapper_sram_base(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram = members.m_mapper_sram ?? 0;
    return h_m_mapper_sram;
  }

  function method_device_nes_cart_interface__get_misc_rom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_misc_rom ?? 0);
  }

  function method_device_nes_cart_interface__get_prg_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_prg_size ?? 0)) >>> 0);
  }

  function method_device_nes_cart_interface__get_prgram_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_prgram).length) >>> 0);
  }

  function method_device_nes_cart_interface__get_vrom_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_vrom_size ?? 0)) >>> 0);
  }

  function method_device_nes_cart_interface__get_vram_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_vram).length) >>> 0);
  }

  function method_device_nes_cart_interface__get_battery_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_battery).length) >>> 0);
  }

  function method_device_nes_cart_interface__get_mapper_sram_size(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
    return ((h_m_mapper_sram_size) >>> 0);
  }

  function method_device_nes_cart_interface__get_misc_rom_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_misc_rom_size ?? 0)) >>> 0);
  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_irq_timer_tick(runtime: any, param: any): any {
    const members = runtime.members;

    if (((((members.m_irq_enable ?? 0)) >>> (7)) & 1)) {
      if (((Number((members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xffff))) === Number(65535)) ? 1 : 0)) {
        if (((((members.m_irq_enable ?? 0)) >>> (0)) & 1)) {
          method_set_irq_line(runtime, 1);
        }
      }
    }
  }

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_nes_sunsoft_fme7_device__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_fme7_write(runtime, offset, data);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "get_mirroring": method_get_mirroring,
    "set_mirroring": method_set_mirroring,
    "get_pcb_ctrl_mirror": method_get_pcb_ctrl_mirror,
    "set_pcb_ctrl_mirror": method_set_pcb_ctrl_mirror,
    "get_four_screen_vram": method_get_four_screen_vram,
    "set_four_screen_vram": method_set_four_screen_vram,
    "get_trainer": method_get_trainer,
    "set_trainer": method_set_trainer,
    "set_mmc1_type": method_set_mmc1_type,
    "set_n163_vol": method_set_n163_vol,
    "set_outer_prg_size": method_set_outer_prg_size,
    "set_outer_chr_size": method_set_outer_chr_size,
    "set_smd133_addr": method_set_smd133_addr,
    "set_x1_005_alt": method_set_x1_005_alt,
    "set_bus_conflict": method_set_bus_conflict,
    "get_open_bus": method_get_open_bus,
    "set_open_bus": method_set_open_bus,
    "get_prg_base": method_get_prg_base,
    "get_prgram_base": method_get_prgram_base,
    "get_vrom_base": method_get_vrom_base,
    "get_vram_base": method_get_vram_base,
    "get_ciram_base": method_get_ciram_base,
    "get_battery_base": method_get_battery_base,
    "get_mapper_sram_base": method_get_mapper_sram_base,
    "get_misc_rom_base": method_get_misc_rom_base,
    "get_prg_size": method_get_prg_size,
    "get_prgram_size": method_get_prgram_size,
    "get_vrom_size": method_get_vrom_size,
    "get_vram_size": method_get_vram_size,
    "get_battery_size": method_get_battery_size,
    "get_mapper_sram_size": method_get_mapper_sram_size,
    "get_misc_rom_size": method_get_misc_rom_size,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
    "scanline_irq": method_scanline_irq,
    "prgram_alloc": method_prgram_alloc,
    "battery_alloc": method_battery_alloc,
    "set_irq_line": method_set_irq_line,
    "hi_access_rom": method_hi_access_rom,
    "account_bus_conflict": method_account_bus_conflict,
    "chr_w": method_chr_w,
    "chr_r": method_chr_r,
    "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
    "nt_w": method_nt_w,
    "nt_r": method_nt_r,
    "read_l": method_read_l,
    "read_m": method_read_m,
    "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
    "write_h": method_write_h,
    "fme7_write": method_fme7_write,
    "chr1_x": method_chr1_x,
    "bank_chr": method_bank_chr,
    "prg8_89": method_prg8_89,
    "prg8_x": method_prg8_x,
    "prg_8k_bank_num": method_prg_8k_bank_num,
    "update_prg_banks": method_update_prg_banks,
    "prg8_ab": method_prg8_ab,
    "prg8_cd": method_prg8_cd,
    "set_nt_mirroring": method_set_nt_mirroring,
    "set_nt_page": method_set_nt_page,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::get_mirroring": method_device_nes_cart_interface__get_mirroring,
    "device_nes_cart_interface::set_mirroring": method_device_nes_cart_interface__set_mirroring,
    "device_nes_cart_interface::get_pcb_ctrl_mirror": method_device_nes_cart_interface__get_pcb_ctrl_mirror,
    "device_nes_cart_interface::set_pcb_ctrl_mirror": method_device_nes_cart_interface__set_pcb_ctrl_mirror,
    "device_nes_cart_interface::get_four_screen_vram": method_device_nes_cart_interface__get_four_screen_vram,
    "device_nes_cart_interface::set_four_screen_vram": method_device_nes_cart_interface__set_four_screen_vram,
    "device_nes_cart_interface::get_trainer": method_device_nes_cart_interface__get_trainer,
    "device_nes_cart_interface::set_trainer": method_device_nes_cart_interface__set_trainer,
    "device_nes_cart_interface::set_mmc1_type": method_device_nes_cart_interface__set_mmc1_type,
    "device_nes_cart_interface::set_n163_vol": method_device_nes_cart_interface__set_n163_vol,
    "device_nes_cart_interface::set_outer_prg_size": method_device_nes_cart_interface__set_outer_prg_size,
    "device_nes_cart_interface::set_outer_chr_size": method_device_nes_cart_interface__set_outer_chr_size,
    "device_nes_cart_interface::set_smd133_addr": method_device_nes_cart_interface__set_smd133_addr,
    "device_nes_cart_interface::set_x1_005_alt": method_device_nes_cart_interface__set_x1_005_alt,
    "device_nes_cart_interface::set_bus_conflict": method_device_nes_cart_interface__set_bus_conflict,
    "device_nes_cart_interface::get_open_bus": method_device_nes_cart_interface__get_open_bus,
    "device_nes_cart_interface::set_open_bus": method_device_nes_cart_interface__set_open_bus,
    "device_nes_cart_interface::get_prg_base": method_device_nes_cart_interface__get_prg_base,
    "device_nes_cart_interface::get_prgram_base": method_device_nes_cart_interface__get_prgram_base,
    "device_nes_cart_interface::get_vrom_base": method_device_nes_cart_interface__get_vrom_base,
    "device_nes_cart_interface::get_vram_base": method_device_nes_cart_interface__get_vram_base,
    "device_nes_cart_interface::get_ciram_base": method_device_nes_cart_interface__get_ciram_base,
    "device_nes_cart_interface::get_battery_base": method_device_nes_cart_interface__get_battery_base,
    "device_nes_cart_interface::get_mapper_sram_base": method_device_nes_cart_interface__get_mapper_sram_base,
    "device_nes_cart_interface::get_misc_rom_base": method_device_nes_cart_interface__get_misc_rom_base,
    "device_nes_cart_interface::get_prg_size": method_device_nes_cart_interface__get_prg_size,
    "device_nes_cart_interface::get_prgram_size": method_device_nes_cart_interface__get_prgram_size,
    "device_nes_cart_interface::get_vrom_size": method_device_nes_cart_interface__get_vrom_size,
    "device_nes_cart_interface::get_vram_size": method_device_nes_cart_interface__get_vram_size,
    "device_nes_cart_interface::get_battery_size": method_device_nes_cart_interface__get_battery_size,
    "device_nes_cart_interface::get_mapper_sram_size": method_device_nes_cart_interface__get_mapper_sram_size,
    "device_nes_cart_interface::get_misc_rom_size": method_device_nes_cart_interface__get_misc_rom_size,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "irq_timer_tick": method_irq_timer_tick,
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
    "nes_sunsoft_fme7_device::write_h": method_nes_sunsoft_fme7_device__write_h
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["fatalerror","m_maincpu.set_input_line","m_ym2149.address_w","m_ym2149.data_w"];
definition.children![0]!.definition.compiledMethods = (() => {
  const cppMin = (a: number, b: number) => (b < a ? b : a);
  const cppMax = (a: number, b: number) => (a < b ? b : a);
  // An aggregate initializer's struct, marked as one (execute.ts's
  // isGeneratedStruct) through its prototype: like generatedStruct's
  // non-enumerable marker, field walks and spreads never see it, and a
  // literal with a prototype costs nothing next to defineProperty.
  const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
  // CALL_METHOD through a table of method names: each entry's emitted method,
  // resolved once and again only if that entry's name changes (see the
  // CALL_METHOD emission). The last table is held, as a core keeps one until
  // its mode changes.
  const cppDispatch = new WeakMap<object, { names: unknown[]; methods: any[] }>();
  let cppLastTable: unknown, cppLastEntry: { names: unknown[]; methods: any[] } | undefined;
  const cppMethodAt = (table: any, index: number): any => {
    if (!Array.isArray(table)) return undefined;
    let entry = table === cppLastTable ? cppLastEntry : undefined;
    if (!entry) {
      entry = cppDispatch.get(table);
      if (!entry) cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
      cppLastTable = table;
      cppLastEntry = entry;
    }
    const name = table[index];
    if (entry.names[index] === name && name !== undefined) return entry.methods[index];
    entry.names[index] = name;
    return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
  };
  // execute.ts's clearGeneratedStruct, field names read once per struct.
  const cppUnionElements = Symbol.for('mamekit.unionElements');
  const cppStructKeys = new WeakMap<object, string[]>();
  const cppClearStruct = (target: any, value: number): void => {
    let keys = cppStructKeys.get(target);
    if (!keys) cppStructKeys.set(target, keys = Object.keys(target));
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]!;
      const field = target[key];
      if (ArrayBuffer.isView(field) || Array.isArray(field)) (field as any).fill(value);
      else if (field && typeof field === 'object') cppClearStruct(field, value);
      else target[key] = value;
    }
  };
  // memset: typed memory fills in place; a plain array of numbers is set
  // element by element (as the interpreter's fillGeneratedMemory writes it,
  // count elements from 0); an array holding structs, or a pointer into a
  // plain array, goes to the interpreter's rule, which clears each struct.
  const cppMemset = (runtime: any, target: any, value: number, count: any) => {
    const bytes = Number(count);
    if (Array.isArray(target)) {
      for (let index = 0; index < bytes; index++) {
        const element = target[index];
        if (element !== null && typeof element === 'object') {
          // A struct element is cleared field by field (cppClearStruct);
          // anything else array-like takes the interpreter's rule.
          if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
            return runtime.macro("memset", target, value, bytes);
          }
          cppClearStruct(element, value);
          continue;
        }
        target[index] = value;
      }
      return target;
    }
    if (Array.isArray(target?.source)) return runtime.macro("memset", target, value, bytes);
    if (target?.generatedPointer) {
      const width = target.source.BYTES_PER_ELEMENT ?? 1;
      target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
      return target;
    }
    target.fill(value, 0, bytes);
    return target;
  };
  // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
  // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
  // execute.ts's wide operators answer them (a shift of 64 or more is 0).
  const cppLo64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
  const cppHi64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
  const cppShl64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
  const cppShl64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
  const cppShr64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
  const cppShr64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
  const cppStringText = (value: unknown) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);
  const __mame_table_0 = [2147483648, 3221225472, 4026531840, 4278190080, 4294901760, 4294967040, 4294967280, 4294967292, 4294967294];
  const cppScratch_build_single_table_temp = new Float64Array(new Uint8Array(Math.max(0, Number(32))));
  function method_ay8910_write_reg(runtime: any, r: any, v: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_port_a_write_cb"], __L1: any = __l["m_port_b_write_cb"];
    let __t0: any, __t1: any, __t2: any, __t3: any;

    const h_m_regs = members.m_regs ?? 0;
    const h_m_tone = members.m_tone ?? 0;
    const h_m_envelope = members.m_envelope ?? 0;
    const h_m_feature = members.m_feature ?? 0;
    if (((Number(((r) & (15))) === Number(13)) ? 1 : 0)) {
      r = ((((r) & (15))) | 0);
    }
    h_m_regs[r] = v;
    let coarse: any = ((0) & 0xff);
    switch ((r as number)) {
      case 0:
      case 1:
      {
        coarse = ((((h_m_regs[1]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
        (__deref_ay8910_write_reg(runtime, h_m_tone[0]).set_period?.(h_m_regs[0], coarse) ?? 0);
        break;
      }
      case 2:
      case 3:
      {
        coarse = ((((h_m_regs[3]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
        (__deref_ay8910_write_reg(runtime, h_m_tone[1]).set_period?.(h_m_regs[2], coarse) ?? 0);
        break;
      }
      case 4:
      case 5:
      {
        coarse = ((((h_m_regs[5]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
        (__deref_ay8910_write_reg(runtime, h_m_tone[2]).set_period?.(h_m_regs[4], coarse) ?? 0);
        break;
      }
      case 6:
      {
        break;
      }
      case 8:
      {
        (__deref_ay8910_write_reg(runtime, h_m_tone[0]).set_volume?.(h_m_regs[8]) ?? 0);
        break;
      }
      case 9:
      {
        (__deref_ay8910_write_reg(runtime, h_m_tone[1]).set_volume?.(h_m_regs[9]) ?? 0);
        break;
      }
      case 10:
      {
        (__deref_ay8910_write_reg(runtime, h_m_tone[2]).set_volume?.(h_m_regs[10]) ?? 0);
        break;
      }
      case 12:
      case 11:
      {
        (__deref_ay8910_write_reg(runtime, h_m_envelope[0]).set_period?.(h_m_regs[11], h_m_regs[12]) ?? 0);
        break;
      }
      case 7:
      {
        if (1) {
          let enable: any = ((((h_m_regs[7]) & (64))) & 0xff);
          if (((Number(enable) !== Number((((members.m_last_enable ?? 0)) & (64)))) ? 1 : 0)) {
            if ((((__t0 = __deref_ay8910_write_reg(runtime, members.m_port_a_write_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_port_a_write_cb, "isunset"))) ? 0 : 1)) {
              (__L0 ? __L0(Number(0), Number(((enable) ? (h_m_regs[14]) : (255))), Number(((enable) ? (255) : (0)))) : typeof members.m_port_a_write_cb === 'function' ? members.m_port_a_write_cb(0, ((enable) ? (h_m_regs[14]) : (255)), ((enable) ? (255) : (0))) : runtime.invoke("m_port_a_write_cb", 0, ((enable) ? (h_m_regs[14]) : (255)), ((enable) ? (255) : (0))));
            }
          }
        }
        if (1) {
          let enable: any = ((((h_m_regs[7]) & (128))) & 0xff);
          if (((Number(enable) !== Number((((members.m_last_enable ?? 0)) & (128)))) ? 1 : 0)) {
            if ((((__t1 = __deref_ay8910_write_reg(runtime, members.m_port_b_write_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_port_b_write_cb, "isunset"))) ? 0 : 1)) {
              (__L1 ? __L1(Number(0), Number(((enable) ? (h_m_regs[15]) : (255))), Number(((enable) ? (255) : (0)))) : typeof members.m_port_b_write_cb === 'function' ? members.m_port_b_write_cb(0, ((enable) ? (h_m_regs[15]) : (255)), ((enable) ? (255) : (0))) : runtime.invoke("m_port_b_write_cb", 0, ((enable) ? (h_m_regs[15]) : (255)), ((enable) ? (255) : (0))));
            }
          }
        }
        members.m_last_enable = ((h_m_regs[7]) & 0xff);
        break;
      }
      case 13:
      {
        if (((h_m_feature) & (8))) {
          let old_mode: any = (((members.m_mode ?? 0)) & 0xff);
          members.m_mode = ((((runtime.shiftRight(v, 4)) & (15))) & 0xff);
          if ((((old_mode) !== ((members.m_mode ?? 0))) ? 1 : 0)) {
            if (((((Number(((old_mode) & (14))) === Number(10)) ? 1 : 0)) ^ (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0)))) {
              for (let i: any = ((0) | 0); ((Number(i) < Number(13)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                method_ay8910_write_reg(runtime, i, 0);
                method_ay8910_write_reg(runtime, ((i) + (16)), 0);
              }
            } else {
              if ((((members.m_mode ?? 0)) & (15))) {
                0;
              }
            }
          }
        }
        (__deref_ay8910_write_reg(runtime, h_m_envelope[0]).set_shape?.(h_m_regs[13], (members.m_env_step_mask ?? 0)) ?? 0);
        break;
      }
      case 14:
      {
        if (((h_m_regs[7]) & (64))) {
          if ((((__t2 = __deref_ay8910_write_reg(runtime, members.m_port_a_write_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_port_a_write_cb, "isunset"))) ? 0 : 1)) {
            (__L0 ? __L0(Number(h_m_regs[14])) : typeof members.m_port_a_write_cb === 'function' ? members.m_port_a_write_cb(h_m_regs[14]) : runtime.invoke("m_port_a_write_cb", h_m_regs[14]));
          } else {
            0;
          }
        } else {
          0;
        }
        break;
      }
      case 15:
      {
        if (((h_m_regs[7]) & (128))) {
          if ((((__t3 = __deref_ay8910_write_reg(runtime, members.m_port_b_write_cb), typeof __t3.isunset === 'function' ? __t3.isunset() : typeof __t3.isunset === 'number' || typeof __t3.isunset === 'boolean' ? __t3.isunset : runtime.container(members.m_port_b_write_cb, "isunset"))) ? 0 : 1)) {
            (__L1 ? __L1(Number(h_m_regs[15])) : typeof members.m_port_b_write_cb === 'function' ? members.m_port_b_write_cb(h_m_regs[15]) : runtime.invoke("m_port_b_write_cb", h_m_regs[15]));
          } else {
            0;
          }
        } else {
          0;
        }
        break;
      }
      case 16:
      case 17:
      {
        (__deref_ay8910_write_reg(runtime, h_m_envelope[1]).set_period?.(h_m_regs[16], h_m_regs[17]) ?? 0);
        break;
      }
      case 18:
      case 19:
      {
        (__deref_ay8910_write_reg(runtime, h_m_envelope[2]).set_period?.(h_m_regs[18], h_m_regs[19]) ?? 0);
        break;
      }
      case 20:
      {
        (__deref_ay8910_write_reg(runtime, h_m_envelope[1]).set_shape?.(h_m_regs[20], (members.m_env_step_mask ?? 0)) ?? 0);
        break;
      }
      case 21:
      {
        (__deref_ay8910_write_reg(runtime, h_m_envelope[2]).set_shape?.(h_m_regs[21], (members.m_env_step_mask ?? 0)) ?? 0);
        break;
      }
      case 22:
      {
        (__deref_ay8910_write_reg(runtime, h_m_tone[0]).set_duty?.(h_m_regs[22]) ?? 0);
        break;
      }
      case 23:
      {
        (__deref_ay8910_write_reg(runtime, h_m_tone[1]).set_duty?.(h_m_regs[23]) ?? 0);
        break;
      }
      case 24:
      {
        (__deref_ay8910_write_reg(runtime, h_m_tone[2]).set_duty?.(h_m_regs[24]) ?? 0);
        break;
      }
      case 25:
      case 26:
      {
        break;
      }
      default:
      {
        h_m_regs[r] = 0;
        break;
      }
    }
  }
  function __deref_ay8910_write_reg(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_is_expanded_mode(runtime: any): any {
    const members = runtime.members;

    const h_m_feature = members.m_feature ?? 0;
    return (((((h_m_feature) & (8))) && (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0))) ? 1 : 0);
  }

  function method_sound_stream_update(runtime: any, stream: any): any {
    const members = runtime.members;
    let __t0: any;

    const h_m_tone = members.m_tone ?? 0;
    const h_m_vol_enabled = members.m_vol_enabled ?? 0;
    const h_m_envelope = members.m_envelope ?? 0;
    const h_m_feature = members.m_feature ?? 0;
    const h_m_vol_table = members.m_vol_table ?? 0;
    const h_m_env_table = members.m_env_table ?? 0;
    let tone: any = 0; let __pointee_tone: any = __deref_sound_stream_update(runtime, tone);
    let envelope: any = 0; let __pointee_envelope: any = __deref_sound_stream_update(runtime, envelope);
    for (let sampindex: any = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
      for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
        tone = __addr_sound_stream_update(runtime, h_m_tone, chan); __pointee_tone = __deref_sound_stream_update(runtime, tone);
        let period: any = ((cppMax(+(1), +(__pointee_tone.period))) | 0);
        __pointee_tone.count = ((((__pointee_tone.count) + (((method_is_expanded_mode(runtime)) ? (16) : (1))))) | 0);
        while ((((__pointee_tone.count) >= (period)) ? 1 : 0)) {
          __pointee_tone.duty_cycle = ((((((__pointee_tone.duty_cycle) - (1))) & (31))) & 0xff);
          __pointee_tone.output = ((((method_is_expanded_mode(runtime)) ? (((((__mame_table_0[(((method_tone_duty(runtime, tone)) % 9) + 9) % 9] ?? 0)) >>> (__pointee_tone.duty_cycle)) & 1)) : ((((__pointee_tone.duty_cycle) >>> (0)) & 1)))) & 0xff);
          __pointee_tone.count = ((((__pointee_tone.count) - (period))) | 0);
        }
      }
      if (((Number((members.m_count_noise = ((((members.m_count_noise) + (1))) << 16 >> 16))) >= Number(method_noise_period(runtime))) ? 1 : 0)) {
        members.m_count_noise = ((0) << 16 >> 16);
        members.m_prescale_noise = ((((members.m_prescale_noise) ^ (1))) & 0xff);
        if (method_is_expanded_mode(runtime)) {
          if (((Number((members.m_noise_value = ((((members.m_noise_value) + (1))) << 16 >> 16))) >= Number((((((((members.m_rng ?? 0)) & 0xff)) & (method_noise_and(runtime)))) | (method_noise_or(runtime))))) ? 1 : 0)) {
            members.m_noise_value = ((0) << 16 >> 16);
            members.m_noise_out = ((((members.m_noise_out) ^ (1))) & 0xff);
            method_noise_rng_tick(runtime);
          }
        } else {
          if ((((members.m_prescale_noise ?? 0)) ? 0 : 1)) {
            method_noise_rng_tick(runtime);
          }
        }
      }
      for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
        tone = __addr_sound_stream_update(runtime, h_m_tone, chan); __pointee_tone = __deref_sound_stream_update(runtime, tone);
        h_m_vol_enabled[chan] = ((((__pointee_tone.output) | (method_tone_enable(runtime, chan)))) & (((method_noise_output(runtime)) | (method_noise_enable(runtime, chan)))));
      }
      for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
        envelope = __addr_sound_stream_update(runtime, h_m_envelope, chan); __pointee_envelope = __deref_sound_stream_update(runtime, envelope);
        if ((((__pointee_envelope.holding) === (0)) ? 1 : 0)) {
          let period: any = ((((__pointee_envelope.period) * ((members.m_step ?? 0)))) >>> 0);
          if (((Number((__pointee_envelope.count = ((((__pointee_envelope.count) + (1))) | 0))) >= Number(period)) ? 1 : 0)) {
            __pointee_envelope.count = ((0) | 0);
            __pointee_envelope.step = ((((__pointee_envelope.step) - (1))) << 24 >> 24);
            if ((((__pointee_envelope.step) < (0)) ? 1 : 0)) {
              if (__pointee_envelope.hold) {
                if (__pointee_envelope.alternate) {
                  __pointee_envelope.attack = ((((__pointee_envelope.attack) ^ ((members.m_env_step_mask ?? 0)))) & 0xff);
                }
                __pointee_envelope.holding = ((1) & 0xff);
                __pointee_envelope.step = ((0) << 24 >> 24);
              } else {
                if ((((__pointee_envelope.alternate) && (((__pointee_envelope.step) & ((((members.m_env_step_mask ?? 0)) + (1)))))) ? 1 : 0)) {
                  __pointee_envelope.attack = ((((__pointee_envelope.attack) ^ ((members.m_env_step_mask ?? 0)))) & 0xff);
                }
                __pointee_envelope.step = ((((__pointee_envelope.step) & ((members.m_env_step_mask ?? 0)))) << 24 >> 24);
              }
            }
          }
        }
        __pointee_envelope.volume = ((((__pointee_envelope.step) ^ (__pointee_envelope.attack))) >>> 0);
      }
      if (((((members.m_streams ?? 0)) === (3)) ? 1 : 0)) {
        for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
          tone = __addr_sound_stream_update(runtime, h_m_tone, chan); __pointee_tone = __deref_sound_stream_update(runtime, tone);
          if (((Number(method_tone_envelope(runtime, tone)) !== Number(0)) ? 1 : 0)) {
            envelope = __addr_sound_stream_update(runtime, h_m_envelope, method_get_envelope_chan(runtime, chan)); __pointee_envelope = __deref_sound_stream_update(runtime, envelope);
            let env_volume: any = ((__pointee_envelope.volume) >>> 0);
            if (((h_m_feature) & (8))) {
              if (((method_is_expanded_mode(runtime)) ? 0 : 1)) {
                env_volume = ((((env_volume) >>> (1))) >>> 0);
                if (((h_m_feature) & (4))) {
                  (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_vol_table[chan], ((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0)))) ?? 0);
                } else {
                  (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_vol_table[chan], ((h_m_vol_enabled[chan]) ? (env_volume) : (0)))) ?? 0);
                }
              } else {
                if (((h_m_feature) & (4))) {
                  (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0)))) ?? 0);
                } else {
                  (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (env_volume) : (0)))) ?? 0);
                }
              }
            } else {
              if (((h_m_feature) & (4))) {
                (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0)))) ?? 0);
              } else {
                (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (env_volume) : (0)))) ?? 0);
              }
            }
          } else {
            if (method_is_expanded_mode(runtime)) {
              (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (method_tone_volume(runtime, tone)) : (0)))) ?? 0);
            } else {
              (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_vol_table[chan], ((h_m_vol_enabled[chan]) ? (method_tone_volume(runtime, tone)) : (0)))) ?? 0);
            }
          }
        }
      } else {
        (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, method_mix_3D(runtime)) ?? 0);
      }
    }
  }
  function __addr_sound_stream_update(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_sound_stream_update(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_tone_duty(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_tone_duty(runtime, tone);
    return ((((method_is_expanded_mode(runtime)) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
  }
  function __deref_tone_duty(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_noise_period(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((((method_is_expanded_mode(runtime)) ? (((h_m_regs[6]) & (255))) : (((h_m_regs[6]) & (31))))) & 0xff);
  }

  function method_noise_and(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((((h_m_regs[25]) & (255))) & 0xff);
  }

  function method_noise_or(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((((h_m_regs[26]) & (255))) & 0xff);
  }

  function method_noise_rng_tick(runtime: any): any {
    const members = runtime.members;

    const h_m_feature = members.m_feature ?? 0;
    if (((h_m_feature) & (8))) {
      members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (2)) & 1)))) << (16))))) >>> 0);
    } else {
      members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (3)) & 1)))) << (16))))) >>> 0);
    }
  }

  function method_tone_enable(runtime: any, chan: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return (((h_m_regs[7]) >>> (chan)) & 1);
  }

  function method_noise_output(runtime: any): any {
    const members = runtime.members;

    return ((((method_is_expanded_mode(runtime)) ? ((((members.m_noise_out ?? 0)) & (1))) : ((((members.m_rng ?? 0)) & (1))))) & 0xff);
  }

  function method_noise_enable(runtime: any, chan: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return (((h_m_regs[7]) >>> (((3) + (chan)))) & 1);
  }

  function method_tone_envelope(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_tone_envelope(runtime, tone);
    const h_m_feature = members.m_feature ?? 0;
    return ((((((__pointee_tone.volume) >>> (((method_is_expanded_mode(runtime)) ? (5) : (4))))) & (((((h_m_feature) & (4))) ? (3) : (1))))) & 0xff);
  }
  function __deref_tone_envelope(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_get_envelope_chan(runtime: any, chan: any): any {
    const members = runtime.members;

    return ((((method_is_expanded_mode(runtime)) ? (chan) : (0))) & 0xff);
  }

  function method_tone_volume(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_tone_volume(runtime, tone);
    return ((((__pointee_tone.volume) & (((method_is_expanded_mode(runtime)) ? (31) : (15))))) & 0xff);
  }
  function __deref_tone_volume(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_mix_3D(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    const h_m_tone = members.m_tone ?? 0;
    const h_m_envelope = members.m_envelope ?? 0;
    const h_m_feature = members.m_feature ?? 0;
    const h_m_vol_enabled = members.m_vol_enabled ?? 0;
    let indx: any = ((0) | 0);
    for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
      let tone: any = __addr_mix_3D(runtime, h_m_tone, chan); let __pointee_tone: any = __deref_mix_3D(runtime, tone);
      if (((Number(method_tone_envelope(runtime, tone)) !== Number(0)) ? 1 : 0)) {
        let envelope: any = __addr_mix_3D(runtime, h_m_envelope, method_get_envelope_chan(runtime, chan)); let __pointee_envelope: any = __deref_mix_3D(runtime, envelope);
        let env_volume: any = ((__pointee_envelope.volume) >>> 0);
        let env_mask: any = ((((1) << (((chan) + (15))))) >>> 0);
        if (((h_m_feature) & (8))) {
          if (((method_is_expanded_mode(runtime)) ? 0 : 1)) {
            env_volume = ((((env_volume) >>> (1))) >>> 0);
            env_mask = ((0) >>> 0);
          }
        }
        if (((h_m_feature) & (4))) {
          indx = ((((indx) | (((env_mask) | (((h_m_vol_enabled[chan]) ? (((((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) << (((chan) * (5))))) : (0))))))) | 0);
        } else {
          indx = ((((indx) | (((env_mask) | (((h_m_vol_enabled[chan]) ? (((env_volume) << (((chan) * (5))))) : (0))))))) | 0);
        }
      } else {
        let tone_mask: any = ((((method_is_expanded_mode(runtime)) ? (((1) << (((chan) + (15))))) : (0))) >>> 0);
        indx = ((((indx) | (((tone_mask) | (((h_m_vol_enabled[chan]) ? (((method_tone_volume(runtime, tone)) << (((chan) * (5))))) : (0))))))) | 0);
      }
    }
    return (__t0 = (members.m_vol3d_table ?? 0), ArrayBuffer.isView(__t0) ? ((__t0 as any)[indx] ?? 0) : runtime.readIndex(__t0, indx));
  }
  function __addr_mix_3D(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_mix_3D(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_build_mixer_table(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["fatalerror"];

    const h_ay8910_mosfet_param = members.ay8910_mosfet_param ?? 0;
    const h_m_res_load = members.m_res_load ?? 0;
    const h_m_vol_table = members.m_vol_table ?? 0;
    const h_m_env_table = members.m_env_table ?? 0;
    let normalize: any = ((0) | 0);
    if (((Number((((members.m_flags ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) {
      0;
      normalize = ((1) | 0);
    }
    if (((Number((((members.m_flags ?? 0)) & (8))) !== Number(0)) ? 1 : 0)) {
      if (((Number((members.m_type ?? 0)) !== Number(0)) ? 1 : 0)) {
        (__L0 ? __L0("AY8910_RESISTOR_OUTPUT currently only supported for AY8910 devices.") : runtime.macro("fatalerror", "AY8910_RESISTOR_OUTPUT currently only supported for AY8910 devices."));
      }
      for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
        method_build_mosfet_resistor_table(runtime, h_ay8910_mosfet_param, h_m_res_load[chan], h_m_vol_table[chan]);
        method_build_mosfet_resistor_table(runtime, h_ay8910_mosfet_param, h_m_res_load[chan], h_m_env_table[chan]);
      }
    } else {
      if (((Number((members.m_streams ?? 0)) === Number(3)) ? 1 : 0)) {
        for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
          method_build_single_table(runtime, h_m_res_load[chan], (members.m_par ?? 0), normalize, h_m_vol_table[chan], (members.m_zero_is_off ?? 0));
          method_build_single_table(runtime, h_m_res_load[chan], (members.m_par_env ?? 0), normalize, h_m_env_table[chan], 0);
        }
      } else {
        method_build_3D_table(runtime, h_m_res_load[0], (members.m_par ?? 0), (members.m_par_env ?? 0), normalize, 3, (members.m_zero_is_off ?? 0), (members.m_vol3d_table ?? 0));
      }
    }
  }

  function method_build_mosfet_resistor_table(runtime: any, par: any, rd: any, tab: any): any {
    const members = runtime.members;

    for (let j: any = ((0) | 0); ((Number(j) < Number(par.m_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
      let Vd: any = 5;
      let Vg: any = runtime.subtract(par.m_Vg, par.m_Vth);
      let kn: any = ((runtime.readIndex(par.m_Kn, j)) / (1000000));
      let p2: any = ((((1) / (((((2) * (kn))) * (rd))))) + (Vg));
      let Vs: any = ((p2) - (Math.sqrt(Number(((((p2) * (p2))) - (((Vg) * (Vg))))))));
      let res: any = ((rd) * (((((Vd) / (Vs))) - (1))));
      runtime.writeIndex(tab, j, res);
    }
  }

  function method_build_single_table(runtime: any, rl: any, par: any, normalize: any, tab: any, zero_is_off: any): any {
    const members = runtime.members;

    let rt: any = 0;
    let rw: any = 0;
    let temp: any = cppScratch_build_single_table_temp.fill(0);
    let min: any = 10;
    let max: any = 0;
    for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
      rt = __add_build_single_table(runtime, ((1) / (__deref_build_single_table(runtime, par).r_down)), ((1) / (rl)));
      rw = ((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)));
      rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)))));
      if ((((((zero_is_off) && ((((j) === (0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
        rw = ((rw) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
        rt = ((rt) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
      }
      temp[j] = ((rw) / (rt));
      if (((Number((temp[j] ?? 0)) < Number(min)) ? 1 : 0)) {
        min = (temp[j] ?? 0);
      }
      if (((Number((temp[j] ?? 0)) > Number(max)) ? 1 : 0)) {
        max = (temp[j] ?? 0);
      }
    }
    if (normalize) {
      for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((((1) * ((((((((temp[j] ?? 0)) - (min))) / (((max) - (min))))) - (0.25))))) * (0.5)));
      }
    } else {
      for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((1) * ((temp[j] ?? 0))));
      }
    }
  }
  function __add_build_single_table(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_build_single_table(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_build_3D_table(runtime: any, rl: any, par: any, par_env: any, normalize: any, factor: any, zero_is_off: any, tab: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["VECTOR_OF"];

    let min: any = 10;
    let max: any = 0;
    let temp: any = (__L0 ? __L0("double", 262144, 0) : runtime.macro("VECTOR_OF", "double", 262144, 0));
    for (let e: any = ((0) | 0); (((e) < (8)) ? 1 : 0); e = ((((e) + (1))) | 0)) {
      let par_ch1: any = ((((e) & (1))) ? (par_env) : (par)); let par_ch1$s: any = undefined, par_ch1$o: any = 0; if (ArrayBuffer.isView(par_ch1) || Array.isArray(par_ch1)) par_ch1$s = par_ch1; else if (par_ch1 !== null && typeof par_ch1 === 'object' && par_ch1.generatedPointer === true && par_ch1.path === undefined && par_ch1.target === undefined && (ArrayBuffer.isView(par_ch1.source) || Array.isArray(par_ch1.source))) { par_ch1$s = par_ch1.source; par_ch1$o = par_ch1.offset; }
      let par_ch2: any = ((((e) & (2))) ? (par_env) : (par)); let par_ch2$s: any = undefined, par_ch2$o: any = 0; if (ArrayBuffer.isView(par_ch2) || Array.isArray(par_ch2)) par_ch2$s = par_ch2; else if (par_ch2 !== null && typeof par_ch2 === 'object' && par_ch2.generatedPointer === true && par_ch2.path === undefined && par_ch2.target === undefined && (ArrayBuffer.isView(par_ch2.source) || Array.isArray(par_ch2.source))) { par_ch2$s = par_ch2.source; par_ch2$o = par_ch2.offset; }
      let par_ch3: any = ((((e) & (4))) ? (par_env) : (par)); let par_ch3$s: any = undefined, par_ch3$o: any = 0; if (ArrayBuffer.isView(par_ch3) || Array.isArray(par_ch3)) par_ch3$s = par_ch3; else if (par_ch3 !== null && typeof par_ch3 === 'object' && par_ch3.generatedPointer === true && par_ch3.path === undefined && par_ch3.target === undefined && (ArrayBuffer.isView(par_ch3.source) || Array.isArray(par_ch3.source))) { par_ch3$s = par_ch3.source; par_ch3$o = par_ch3.offset; }
      for (let j1: any = ((0) | 0); ((Number(j1) < Number(__deref_build_3D_table(runtime, par_ch1).res_count)) ? 1 : 0); j1 = ((((j1) + (1))) | 0)) {
        for (let j2: any = ((0) | 0); ((Number(j2) < Number(__deref_build_3D_table(runtime, par_ch2).res_count)) ? 1 : 0); j2 = ((((j2) + (1))) | 0)) {
          for (let j3: any = ((0) | 0); ((Number(j3) < Number(__deref_build_3D_table(runtime, par_ch3).res_count)) ? 1 : 0); j3 = ((((j3) + (1))) | 0)) {
            let n: any = 0;
            if (zero_is_off) {
              n = ((((((((j1) !== (0)) ? 1 : 0)) || (((e) & (1)))) ? 1 : 0)) ? (1) : (0));
              n = ((n) + (((((((((j2) !== (0)) ? 1 : 0)) || (((e) & (2)))) ? 1 : 0)) ? (1) : (0))));
              n = ((n) + (((((((((j3) !== (0)) ? 1 : 0)) || (((e) & (4)))) ? 1 : 0)) ? (1) : (0))));
            } else {
              n = 3;
            }
            let rt: any = __add_build_3D_table(runtime, __add_build_3D_table(runtime, ((n) / (__deref_build_3D_table(runtime, par).r_up)), ((3) / (__deref_build_3D_table(runtime, par).r_down))), ((1) / (rl)));
            let rw: any = ((n) / (__deref_build_3D_table(runtime, par).r_up));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
            let indx: any = ((((((((((e) << (15))) | (((j3) << (10))))) | (((j2) << (5))))) | (j1))) | 0);
            runtime.writeIndex(temp, indx, ((rw) / (rt)));
            if (((Number(runtime.readIndex(temp, indx)) < Number(min)) ? 1 : 0)) {
              min = runtime.readIndex(temp, indx);
            }
            if (((Number(runtime.readIndex(temp, indx)) > Number(max)) ? 1 : 0)) {
              max = runtime.readIndex(temp, indx);
            }
          }
        }
      }
    }
    if (normalize) {
      for (let j: any = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((((1) * (((((runtime.readIndex(temp, j)) - (min))) / (((max) - (min))))))) * (factor)));
      }
    } else {
      for (let j: any = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((1) * (runtime.readIndex(temp, j))));
      }
    }
  }
  function __add_build_3D_table(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_build_3D_table(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_reset_ym(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    const h_m_tone = members.m_tone ?? 0;
    const h_m_envelope = members.m_envelope ?? 0;
    members.m_active = ((0) ? 1 : 0);
    members.m_register_latch = ((0) & 0xff);
    members.m_rng = ((1) >>> 0);
    members.m_noise_out = ((0) & 0xff);
    members.m_mode = ((0) & 0xff);
    for (let chan: any = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
      (__t0 = __deref_ay8910_reset_ym(runtime, h_m_tone[chan]), typeof __t0.reset === 'function' ? (__t0.reset() ?? 0) : runtime.container(h_m_tone[chan], "reset"));
      (__t1 = __deref_ay8910_reset_ym(runtime, h_m_envelope[chan]), typeof __t1.reset === 'function' ? (__t1.reset() ?? 0) : runtime.container(h_m_envelope[chan], "reset"));
    }
    members.m_noise_value = ((0) << 16 >> 16);
    members.m_count_noise = ((0) << 16 >> 16);
    members.m_prescale_noise = ((0) & 0xff);
    members.m_last_enable = ((192) & 0xff);
    for (let i: any = ((0) | 0); ((Number(i) < Number(14)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      method_ay8910_write_reg(runtime, i, 0);
    }
    members.m_ready = ((1) | 0);
  }
  function __deref_ay8910_reset_ym(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay_set_clock(runtime: any, clock: any): any {
    const members = runtime.members;

    const h_m_feature = members.m_feature ?? 0;
    if (((((((((h_m_feature) & (1))) && ((((members.m_flags ?? 0)) & (16)))) ? 1 : 0)) || (((h_m_feature) & (2)))) ? 1 : 0)) {
      (__deref_ay_set_clock(runtime, members.m_channel).set_sample_rate?.(runtime.divide(clock, 16)) ?? 0);
    } else {
      (__deref_ay_set_clock(runtime, members.m_channel).set_sample_rate?.(runtime.divide(clock, 8)) ?? 0);
    }
  }
  function __deref_ay_set_clock(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_write_bc1_bc2(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    switch ((((offset) & (3)) as number)) {
      case 0:
      {
        method_address_w(runtime, data);
        break;
      }
      case 1:
      {
        break;
      }
      case 2:
      {
        method_data_w(runtime, data);
        break;
      }
      case 3:
      {
        method_address_w(runtime, data);
        break;
      }
    }
  }

  function method_address_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_ay8910_write_ym(runtime, 0, data);
  }

  function method_ay8910_write_ym(runtime: any, addr: any, data: any): any {
    const members = runtime.members;
    let __t0: any;

    data = ((data) & 0xff);
    const h_m_regs = members.m_regs ?? 0;
    if (((addr) & (1))) {
      if ((members.m_active ?? 0)) {
        let register_latch: any = (((((members.m_register_latch ?? 0)) + (method_get_register_bank(runtime)))) & 0xff);
        if ((((((Number((members.m_register_latch ?? 0)) === Number(13)) ? 1 : 0)) || ((((h_m_regs[register_latch]) !== (data)) ? 1 : 0))) ? 1 : 0)) {
          (__t0 = __deref_ay8910_write_ym(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        }
        method_ay8910_write_reg(runtime, register_latch, data);
      }
    } else {
      members.m_active = ((((Number(((data) >>> (4))) === Number(0)) ? 1 : 0)) ? 1 : 0);
      if ((members.m_active ?? 0)) {
        members.m_register_latch = ((((data) & (15))) & 0xff);
      } else {
        0;
      }
    }
  }
  function __deref_ay8910_write_ym(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_get_register_bank(runtime: any): any {
    const members = runtime.members;

    return ((((method_is_expanded_mode(runtime)) ? ((((((members.m_mode ?? 0)) & (1))) << (4))) : (0))) & 0xff);
  }

  function method_data_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_ay8910_write_ym(runtime, 1, data);
  }

  function method_set_flags(runtime: any, flags: any): any {
    const members = runtime.members;

    members.m_flags = ((flags) | 0);
  }

  function method_port_a_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
  }
  function __deref_port_a_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_b_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
  }
  function __deref_port_b_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_a_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
  }
  function __deref_port_a_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_b_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
  }
  function __deref_port_b_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_data_r(runtime: any): any {
    const members = runtime.members;

    return ((method_ay8910_read_ym(runtime)) & 0xff);
  }

  function method_ay8910_read_ym(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["type"], __L1: any = __l["m_port_a_read_cb"], __L2: any = __l["m_port_b_read_cb"];
    let __t0: any, __t1: any;

    const h_m_regs = members.m_regs ?? 0;
    let chip_type: any = (__L0 ? __L0() : runtime.macro("type"));
    let r: any = (((((members.m_register_latch ?? 0)) + (method_get_register_bank(runtime)))) & 0xff);
    if ((((members.m_active ?? 0)) ? 0 : 1)) {
      return 255;
    }
    if (((Number(((r) & (15))) === Number(13)) ? 1 : 0)) {
      r = ((((r) & (15))) & 0xff);
    }
    switch ((r as number)) {
      case 14:
      {
        if (((h_m_regs[7]) & (64))) {
          0;
        }
        if ((((__t0 = __deref_ay8910_read_ym(runtime, members.m_port_a_read_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_port_a_read_cb, "isunset"))) ? 0 : 1)) {
          h_m_regs[14] = (__L1 ? __L1() : typeof members.m_port_a_read_cb === 'function' ? members.m_port_a_read_cb() : runtime.invoke("m_port_a_read_cb"));
        } else {
          0;
        }
        break;
      }
      case 15:
      {
        if (((h_m_regs[7]) & (128))) {
          0;
        }
        if ((((__t1 = __deref_ay8910_read_ym(runtime, members.m_port_b_read_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_port_b_read_cb, "isunset"))) ? 0 : 1)) {
          h_m_regs[15] = (__L2 ? __L2() : typeof members.m_port_b_read_cb === 'function' ? members.m_port_b_read_cb() : runtime.invoke("m_port_b_read_cb"));
        } else {
          0;
        }
        break;
      }
    }
    if (((Number(chip_type) === Number(2748346829)) ? 1 : 0)) {
      let mask: any = [255, 15, 255, 15, 255, 15, 31, 255, 31, 31, 31, 255, 255, 15, 255, 255];
      return ((h_m_regs[r]) & ((mask[r] ?? 0)));
    } else {
      if (((Number(chip_type) === Number(2681236353)) ? 1 : 0)) {
        let mask: any = [255, 15, 255, 15, 255, 15, 31, 255, 63, 63, 63, 255, 255, 15, 255, 255];
        return ((h_m_regs[r]) & ((mask[r] ?? 0)));
      } else {
        return h_m_regs[r];
      }
    }
  }
  function __deref_ay8910_read_ym(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_data_address_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_ay8910_write_ym(runtime, (((~offset)) & (1)), data);
  }

  function method_address_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_ay8910_write_ym(runtime, ((offset) & (1)), data);
  }

  function method_ay8910_device__set_flags(runtime: any, flags: any): any {
    const members = runtime.members;

    members.m_flags = ((flags) | 0);
  }

  function method_ay8910_device__port_a_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
  }
  function __deref_ay8910_device__port_a_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_b_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
  }
  function __deref_ay8910_device__port_b_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_a_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
  }
  function __deref_ay8910_device__port_a_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_b_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
  }
  function __deref_ay8910_device__port_b_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__data_r(runtime: any): any {
    const members = runtime.members;

    return ((method_ay8910_read_ym(runtime)) & 0xff);
  }

  function method_ay8910_device__data_address_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_ay8910_write_ym(runtime, (((~offset)) & (1)), data);
  }

  function method_ay8910_device__address_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_ay8910_write_ym(runtime, ((offset) & (1)), data);
  }

  function method_ay8910_device__tone_enable(runtime: any, chan: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return (((h_m_regs[7]) >>> (chan)) & 1);
  }

  function method_ay8910_device__tone_volume(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_ay8910_device__tone_volume(runtime, tone);
    return ((((__pointee_tone.volume) & (((method_is_expanded_mode(runtime)) ? (31) : (15))))) & 0xff);
  }
  function __deref_ay8910_device__tone_volume(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__tone_envelope(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_ay8910_device__tone_envelope(runtime, tone);
    const h_m_feature = members.m_feature ?? 0;
    return ((((((__pointee_tone.volume) >>> (((method_is_expanded_mode(runtime)) ? (5) : (4))))) & (((((h_m_feature) & (4))) ? (3) : (1))))) & 0xff);
  }
  function __deref_ay8910_device__tone_envelope(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__tone_duty(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_ay8910_device__tone_duty(runtime, tone);
    return ((((method_is_expanded_mode(runtime)) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
  }
  function __deref_ay8910_device__tone_duty(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__get_envelope_chan(runtime: any, chan: any): any {
    const members = runtime.members;

    return ((((method_is_expanded_mode(runtime)) ? (chan) : (0))) & 0xff);
  }

  function method_ay8910_device__noise_enable(runtime: any, chan: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return (((h_m_regs[7]) >>> (((3) + (chan)))) & 1);
  }

  function method_ay8910_device__noise_period(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((((method_is_expanded_mode(runtime)) ? (((h_m_regs[6]) & (255))) : (((h_m_regs[6]) & (31))))) & 0xff);
  }

  function method_ay8910_device__noise_output(runtime: any): any {
    const members = runtime.members;

    return ((((method_is_expanded_mode(runtime)) ? ((((members.m_noise_out ?? 0)) & (1))) : ((((members.m_rng ?? 0)) & (1))))) & 0xff);
  }

  function method_ay8910_device__is_expanded_mode(runtime: any): any {
    const members = runtime.members;

    const h_m_feature = members.m_feature ?? 0;
    return (((((h_m_feature) & (8))) && (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0))) ? 1 : 0);
  }

  function method_ay8910_device__get_register_bank(runtime: any): any {
    const members = runtime.members;

    return ((((method_is_expanded_mode(runtime)) ? ((((((members.m_mode ?? 0)) & (1))) << (4))) : (0))) & 0xff);
  }

  function method_ay8910_device__noise_and(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((((h_m_regs[25]) & (255))) & 0xff);
  }

  function method_ay8910_device__noise_or(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((((h_m_regs[26]) & (255))) & 0xff);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "ay8910_write_reg": method_ay8910_write_reg,
    "is_expanded_mode": method_is_expanded_mode,
    "sound_stream_update": method_sound_stream_update,
    "tone_duty": method_tone_duty,
    "noise_period": method_noise_period,
    "noise_and": method_noise_and,
    "noise_or": method_noise_or,
    "noise_rng_tick": method_noise_rng_tick,
    "tone_enable": method_tone_enable,
    "noise_output": method_noise_output,
    "noise_enable": method_noise_enable,
    "tone_envelope": method_tone_envelope,
    "get_envelope_chan": method_get_envelope_chan,
    "tone_volume": method_tone_volume,
    "mix_3D": method_mix_3D,
    "build_mixer_table": method_build_mixer_table,
    "build_mosfet_resistor_table": method_build_mosfet_resistor_table,
    "build_single_table": method_build_single_table,
    "build_3D_table": method_build_3D_table,
    "ay8910_reset_ym": method_ay8910_reset_ym,
    "ay_set_clock": method_ay_set_clock,
    "write_bc1_bc2": method_write_bc1_bc2,
    "address_w": method_address_w,
    "ay8910_write_ym": method_ay8910_write_ym,
    "get_register_bank": method_get_register_bank,
    "data_w": method_data_w,
    "set_flags": method_set_flags,
    "port_a_read_callback": method_port_a_read_callback,
    "port_b_read_callback": method_port_b_read_callback,
    "port_a_write_callback": method_port_a_write_callback,
    "port_b_write_callback": method_port_b_write_callback,
    "data_r": method_data_r,
    "ay8910_read_ym": method_ay8910_read_ym,
    "data_address_w": method_data_address_w,
    "address_data_w": method_address_data_w,
    "ay8910_device::set_flags": method_ay8910_device__set_flags,
    "ay8910_device::port_a_read_callback": method_ay8910_device__port_a_read_callback,
    "ay8910_device::port_b_read_callback": method_ay8910_device__port_b_read_callback,
    "ay8910_device::port_a_write_callback": method_ay8910_device__port_a_write_callback,
    "ay8910_device::port_b_write_callback": method_ay8910_device__port_b_write_callback,
    "ay8910_device::data_r": method_ay8910_device__data_r,
    "ay8910_device::data_address_w": method_ay8910_device__data_address_w,
    "ay8910_device::address_data_w": method_ay8910_device__address_data_w,
    "ay8910_device::tone_enable": method_ay8910_device__tone_enable,
    "ay8910_device::tone_volume": method_ay8910_device__tone_volume,
    "ay8910_device::tone_envelope": method_ay8910_device__tone_envelope,
    "ay8910_device::tone_duty": method_ay8910_device__tone_duty,
    "ay8910_device::get_envelope_chan": method_ay8910_device__get_envelope_chan,
    "ay8910_device::noise_enable": method_ay8910_device__noise_enable,
    "ay8910_device::noise_period": method_ay8910_device__noise_period,
    "ay8910_device::noise_output": method_ay8910_device__noise_output,
    "ay8910_device::is_expanded_mode": method_ay8910_device__is_expanded_mode,
    "ay8910_device::get_register_bank": method_ay8910_device__get_register_bank,
    "ay8910_device::noise_and": method_ay8910_device__noise_and,
    "ay8910_device::noise_or": method_ay8910_device__noise_or
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.compiledMethodLinks = ["VECTOR_OF","fatalerror","m_port_a_read_cb","m_port_a_write_cb","m_port_b_read_cb","m_port_b_write_cb","type"];
definition.children![0]!.definition.compiledStructMethods = {
  "tone_t": (() => {
  const cppMin = (a: number, b: number) => (b < a ? b : a);
  const cppMax = (a: number, b: number) => (a < b ? b : a);
  // An aggregate initializer's struct, marked as one (execute.ts's
  // isGeneratedStruct) through its prototype: like generatedStruct's
  // non-enumerable marker, field walks and spreads never see it, and a
  // literal with a prototype costs nothing next to defineProperty.
  const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
  // CALL_METHOD through a table of method names: each entry's emitted method,
  // resolved once and again only if that entry's name changes (see the
  // CALL_METHOD emission). The last table is held, as a core keeps one until
  // its mode changes.
  const cppDispatch = new WeakMap<object, { names: unknown[]; methods: any[] }>();
  let cppLastTable: unknown, cppLastEntry: { names: unknown[]; methods: any[] } | undefined;
  const cppMethodAt = (table: any, index: number): any => {
    if (!Array.isArray(table)) return undefined;
    let entry = table === cppLastTable ? cppLastEntry : undefined;
    if (!entry) {
      entry = cppDispatch.get(table);
      if (!entry) cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
      cppLastTable = table;
      cppLastEntry = entry;
    }
    const name = table[index];
    if (entry.names[index] === name && name !== undefined) return entry.methods[index];
    entry.names[index] = name;
    return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
  };
  // execute.ts's clearGeneratedStruct, field names read once per struct.
  const cppUnionElements = Symbol.for('mamekit.unionElements');
  const cppStructKeys = new WeakMap<object, string[]>();
  const cppClearStruct = (target: any, value: number): void => {
    let keys = cppStructKeys.get(target);
    if (!keys) cppStructKeys.set(target, keys = Object.keys(target));
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]!;
      const field = target[key];
      if (ArrayBuffer.isView(field) || Array.isArray(field)) (field as any).fill(value);
      else if (field && typeof field === 'object') cppClearStruct(field, value);
      else target[key] = value;
    }
  };
  // memset: typed memory fills in place; a plain array of numbers is set
  // element by element (as the interpreter's fillGeneratedMemory writes it,
  // count elements from 0); an array holding structs, or a pointer into a
  // plain array, goes to the interpreter's rule, which clears each struct.
  const cppMemset = (runtime: any, target: any, value: number, count: any) => {
    const bytes = Number(count);
    if (Array.isArray(target)) {
      for (let index = 0; index < bytes; index++) {
        const element = target[index];
        if (element !== null && typeof element === 'object') {
          // A struct element is cleared field by field (cppClearStruct);
          // anything else array-like takes the interpreter's rule.
          if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
            return runtime.macro("memset", target, value, bytes);
          }
          cppClearStruct(element, value);
          continue;
        }
        target[index] = value;
      }
      return target;
    }
    if (Array.isArray(target?.source)) return runtime.macro("memset", target, value, bytes);
    if (target?.generatedPointer) {
      const width = target.source.BYTES_PER_ELEMENT ?? 1;
      target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
      return target;
    }
    target.fill(value, 0, bytes);
    return target;
  };
  // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
  // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
  // execute.ts's wide operators answer them (a shift of 64 or more is 0).
  const cppLo64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
  const cppHi64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
  const cppShl64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
  const cppShl64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
  const cppShr64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
  const cppShr64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
  const cppStringText = (value: unknown) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);

  const cppScratch_build_single_table_temp = new Float64Array(new Uint8Array(Math.max(0, Number(32))));
  function method_reset(runtime: any): any {
    const members = runtime.members;

    members.period = ((0) >>> 0);
    members.volume = ((0) & 0xff);
    members.duty = ((0) & 0xff);
    members.count = ((0) | 0);
    members.duty_cycle = ((0) & 0xff);
    members.output = ((0) & 0xff);
  }

  function method_set_period(runtime: any, fine: any, coarse: any): any {
    const members = runtime.members;

    fine = ((fine) & 0xff);
    coarse = ((coarse) & 0xff);
    members.period = ((((fine) | (((coarse) << (8))))) >>> 0);
  }

  function method_set_volume(runtime: any, val: any): any {
    const members = runtime.members;

    val = ((val) & 0xff);
    members.volume = ((val) & 0xff);
  }

  function method_set_duty(runtime: any, val: any): any {
    const members = runtime.members;

    val = ((val) & 0xff);
    members.duty = ((val) & 0xff);
  }

  function method_tone_duty(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_tone_duty(runtime, tone);
    return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
  }
  function __deref_tone_duty(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_get_envelope_chan(runtime: any, chan: any): any {
    const members = runtime.members;

    return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
  }

  function method_tone_volume(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_tone_volume(runtime, tone);
    return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
  }
  function __deref_tone_volume(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_build_mosfet_resistor_table(runtime: any, par: any, rd: any, tab: any): any {
    const members = runtime.members;

    for (let j: any = ((0) | 0); ((Number(j) < Number(par.m_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
      let Vd: any = 5;
      let Vg: any = runtime.subtract(par.m_Vg, par.m_Vth);
      let kn: any = ((runtime.readIndex(par.m_Kn, j)) / (1000000));
      let p2: any = ((((1) / (((((2) * (kn))) * (rd))))) + (Vg));
      let Vs: any = ((p2) - (Math.sqrt(Number(((((p2) * (p2))) - (((Vg) * (Vg))))))));
      let res: any = ((rd) * (((((Vd) / (Vs))) - (1))));
      runtime.writeIndex(tab, j, res);
    }
  }

  function method_build_single_table(runtime: any, rl: any, par: any, normalize: any, tab: any, zero_is_off: any): any {
    const members = runtime.members;

    let rt: any = 0;
    let rw: any = 0;
    let temp: any = cppScratch_build_single_table_temp.fill(0);
    let min: any = 10;
    let max: any = 0;
    for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
      rt = __add_build_single_table(runtime, ((1) / (__deref_build_single_table(runtime, par).r_down)), ((1) / (rl)));
      rw = ((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)));
      rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)))));
      if ((((((zero_is_off) && ((((j) === (0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
        rw = ((rw) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
        rt = ((rt) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
      }
      temp[j] = ((rw) / (rt));
      if (((Number((temp[j] ?? 0)) < Number(min)) ? 1 : 0)) {
        min = (temp[j] ?? 0);
      }
      if (((Number((temp[j] ?? 0)) > Number(max)) ? 1 : 0)) {
        max = (temp[j] ?? 0);
      }
    }
    if (normalize) {
      for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((((1) * ((((((((temp[j] ?? 0)) - (min))) / (((max) - (min))))) - (0.25))))) * (0.5)));
      }
    } else {
      for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((1) * ((temp[j] ?? 0))));
      }
    }
  }
  function __add_build_single_table(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_build_single_table(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_build_3D_table(runtime: any, rl: any, par: any, par_env: any, normalize: any, factor: any, zero_is_off: any, tab: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["VECTOR_OF"];

    let min: any = 10;
    let max: any = 0;
    let temp: any = (__L0 ? __L0("double", 262144, 0) : runtime.macro("VECTOR_OF", "double", 262144, 0));
    for (let e: any = ((0) | 0); (((e) < (8)) ? 1 : 0); e = ((((e) + (1))) | 0)) {
      let par_ch1: any = ((((e) & (1))) ? (par_env) : (par)); let par_ch1$s: any = undefined, par_ch1$o: any = 0; if (ArrayBuffer.isView(par_ch1) || Array.isArray(par_ch1)) par_ch1$s = par_ch1; else if (par_ch1 !== null && typeof par_ch1 === 'object' && par_ch1.generatedPointer === true && par_ch1.path === undefined && par_ch1.target === undefined && (ArrayBuffer.isView(par_ch1.source) || Array.isArray(par_ch1.source))) { par_ch1$s = par_ch1.source; par_ch1$o = par_ch1.offset; }
      let par_ch2: any = ((((e) & (2))) ? (par_env) : (par)); let par_ch2$s: any = undefined, par_ch2$o: any = 0; if (ArrayBuffer.isView(par_ch2) || Array.isArray(par_ch2)) par_ch2$s = par_ch2; else if (par_ch2 !== null && typeof par_ch2 === 'object' && par_ch2.generatedPointer === true && par_ch2.path === undefined && par_ch2.target === undefined && (ArrayBuffer.isView(par_ch2.source) || Array.isArray(par_ch2.source))) { par_ch2$s = par_ch2.source; par_ch2$o = par_ch2.offset; }
      let par_ch3: any = ((((e) & (4))) ? (par_env) : (par)); let par_ch3$s: any = undefined, par_ch3$o: any = 0; if (ArrayBuffer.isView(par_ch3) || Array.isArray(par_ch3)) par_ch3$s = par_ch3; else if (par_ch3 !== null && typeof par_ch3 === 'object' && par_ch3.generatedPointer === true && par_ch3.path === undefined && par_ch3.target === undefined && (ArrayBuffer.isView(par_ch3.source) || Array.isArray(par_ch3.source))) { par_ch3$s = par_ch3.source; par_ch3$o = par_ch3.offset; }
      for (let j1: any = ((0) | 0); ((Number(j1) < Number(__deref_build_3D_table(runtime, par_ch1).res_count)) ? 1 : 0); j1 = ((((j1) + (1))) | 0)) {
        for (let j2: any = ((0) | 0); ((Number(j2) < Number(__deref_build_3D_table(runtime, par_ch2).res_count)) ? 1 : 0); j2 = ((((j2) + (1))) | 0)) {
          for (let j3: any = ((0) | 0); ((Number(j3) < Number(__deref_build_3D_table(runtime, par_ch3).res_count)) ? 1 : 0); j3 = ((((j3) + (1))) | 0)) {
            let n: any = 0;
            if (zero_is_off) {
              n = ((((((((j1) !== (0)) ? 1 : 0)) || (((e) & (1)))) ? 1 : 0)) ? (1) : (0));
              n = ((n) + (((((((((j2) !== (0)) ? 1 : 0)) || (((e) & (2)))) ? 1 : 0)) ? (1) : (0))));
              n = ((n) + (((((((((j3) !== (0)) ? 1 : 0)) || (((e) & (4)))) ? 1 : 0)) ? (1) : (0))));
            } else {
              n = 3;
            }
            let rt: any = __add_build_3D_table(runtime, __add_build_3D_table(runtime, ((n) / (__deref_build_3D_table(runtime, par).r_up)), ((3) / (__deref_build_3D_table(runtime, par).r_down))), ((1) / (rl)));
            let rw: any = ((n) / (__deref_build_3D_table(runtime, par).r_up));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
            let indx: any = ((((((((((e) << (15))) | (((j3) << (10))))) | (((j2) << (5))))) | (j1))) | 0);
            runtime.writeIndex(temp, indx, ((rw) / (rt)));
            if (((Number(runtime.readIndex(temp, indx)) < Number(min)) ? 1 : 0)) {
              min = runtime.readIndex(temp, indx);
            }
            if (((Number(runtime.readIndex(temp, indx)) > Number(max)) ? 1 : 0)) {
              max = runtime.readIndex(temp, indx);
            }
          }
        }
      }
    }
    if (normalize) {
      for (let j: any = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((((1) * (((((runtime.readIndex(temp, j)) - (min))) / (((max) - (min))))))) * (factor)));
      }
    } else {
      for (let j: any = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((1) * (runtime.readIndex(temp, j))));
      }
    }
  }
  function __add_build_3D_table(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_build_3D_table(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_write_bc1_bc2(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    switch ((((offset) & (3)) as number)) {
      case 0:
      {
        method_address_w(runtime, data);
        break;
      }
      case 1:
      {
        break;
      }
      case 2:
      {
        method_data_w(runtime, data);
        break;
      }
      case 3:
      {
        method_address_w(runtime, data);
        break;
      }
    }
  }

  function method_address_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", 0, data);
  }

  function method_data_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", 1, data);
  }

  function method_port_a_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
  }
  function __deref_port_a_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_b_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
  }
  function __deref_port_b_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_a_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
  }
  function __deref_port_a_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_b_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
  }
  function __deref_port_b_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_data_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.invoke("ay8910_read_ym")) & 0xff);
  }

  function method_data_address_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
  }

  function method_address_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
  }

  function method_ay8910_device__port_a_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
  }
  function __deref_ay8910_device__port_a_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_b_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
  }
  function __deref_ay8910_device__port_b_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_a_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
  }
  function __deref_ay8910_device__port_a_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_b_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
  }
  function __deref_ay8910_device__port_b_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__data_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.invoke("ay8910_read_ym")) & 0xff);
  }

  function method_ay8910_device__data_address_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
  }

  function method_ay8910_device__address_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
  }

  function method_ay8910_device__tone_volume(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_ay8910_device__tone_volume(runtime, tone);
    return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
  }
  function __deref_ay8910_device__tone_volume(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__tone_duty(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_ay8910_device__tone_duty(runtime, tone);
    return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
  }
  function __deref_ay8910_device__tone_duty(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__get_envelope_chan(runtime: any, chan: any): any {
    const members = runtime.members;

    return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "reset": method_reset,
    "set_period": method_set_period,
    "set_volume": method_set_volume,
    "set_duty": method_set_duty,
    "tone_duty": method_tone_duty,
    "get_envelope_chan": method_get_envelope_chan,
    "tone_volume": method_tone_volume,
    "build_mosfet_resistor_table": method_build_mosfet_resistor_table,
    "build_single_table": method_build_single_table,
    "build_3D_table": method_build_3D_table,
    "write_bc1_bc2": method_write_bc1_bc2,
    "address_w": method_address_w,
    "data_w": method_data_w,
    "port_a_read_callback": method_port_a_read_callback,
    "port_b_read_callback": method_port_b_read_callback,
    "port_a_write_callback": method_port_a_write_callback,
    "port_b_write_callback": method_port_b_write_callback,
    "data_r": method_data_r,
    "data_address_w": method_data_address_w,
    "address_data_w": method_address_data_w,
    "ay8910_device::port_a_read_callback": method_ay8910_device__port_a_read_callback,
    "ay8910_device::port_b_read_callback": method_ay8910_device__port_b_read_callback,
    "ay8910_device::port_a_write_callback": method_ay8910_device__port_a_write_callback,
    "ay8910_device::port_b_write_callback": method_ay8910_device__port_b_write_callback,
    "ay8910_device::data_r": method_ay8910_device__data_r,
    "ay8910_device::data_address_w": method_ay8910_device__data_address_w,
    "ay8910_device::address_data_w": method_ay8910_device__address_data_w,
    "ay8910_device::tone_volume": method_ay8910_device__tone_volume,
    "ay8910_device::tone_duty": method_ay8910_device__tone_duty,
    "ay8910_device::get_envelope_chan": method_ay8910_device__get_envelope_chan
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap,
  "envelope_t": (() => {
  const cppMin = (a: number, b: number) => (b < a ? b : a);
  const cppMax = (a: number, b: number) => (a < b ? b : a);
  // An aggregate initializer's struct, marked as one (execute.ts's
  // isGeneratedStruct) through its prototype: like generatedStruct's
  // non-enumerable marker, field walks and spreads never see it, and a
  // literal with a prototype costs nothing next to defineProperty.
  const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
  // CALL_METHOD through a table of method names: each entry's emitted method,
  // resolved once and again only if that entry's name changes (see the
  // CALL_METHOD emission). The last table is held, as a core keeps one until
  // its mode changes.
  const cppDispatch = new WeakMap<object, { names: unknown[]; methods: any[] }>();
  let cppLastTable: unknown, cppLastEntry: { names: unknown[]; methods: any[] } | undefined;
  const cppMethodAt = (table: any, index: number): any => {
    if (!Array.isArray(table)) return undefined;
    let entry = table === cppLastTable ? cppLastEntry : undefined;
    if (!entry) {
      entry = cppDispatch.get(table);
      if (!entry) cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
      cppLastTable = table;
      cppLastEntry = entry;
    }
    const name = table[index];
    if (entry.names[index] === name && name !== undefined) return entry.methods[index];
    entry.names[index] = name;
    return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
  };
  // execute.ts's clearGeneratedStruct, field names read once per struct.
  const cppUnionElements = Symbol.for('mamekit.unionElements');
  const cppStructKeys = new WeakMap<object, string[]>();
  const cppClearStruct = (target: any, value: number): void => {
    let keys = cppStructKeys.get(target);
    if (!keys) cppStructKeys.set(target, keys = Object.keys(target));
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]!;
      const field = target[key];
      if (ArrayBuffer.isView(field) || Array.isArray(field)) (field as any).fill(value);
      else if (field && typeof field === 'object') cppClearStruct(field, value);
      else target[key] = value;
    }
  };
  // memset: typed memory fills in place; a plain array of numbers is set
  // element by element (as the interpreter's fillGeneratedMemory writes it,
  // count elements from 0); an array holding structs, or a pointer into a
  // plain array, goes to the interpreter's rule, which clears each struct.
  const cppMemset = (runtime: any, target: any, value: number, count: any) => {
    const bytes = Number(count);
    if (Array.isArray(target)) {
      for (let index = 0; index < bytes; index++) {
        const element = target[index];
        if (element !== null && typeof element === 'object') {
          // A struct element is cleared field by field (cppClearStruct);
          // anything else array-like takes the interpreter's rule.
          if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
            return runtime.macro("memset", target, value, bytes);
          }
          cppClearStruct(element, value);
          continue;
        }
        target[index] = value;
      }
      return target;
    }
    if (Array.isArray(target?.source)) return runtime.macro("memset", target, value, bytes);
    if (target?.generatedPointer) {
      const width = target.source.BYTES_PER_ELEMENT ?? 1;
      target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
      return target;
    }
    target.fill(value, 0, bytes);
    return target;
  };
  // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
  // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
  // execute.ts's wide operators answer them (a shift of 64 or more is 0).
  const cppLo64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
  const cppHi64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
  const cppShl64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
  const cppShl64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
  const cppShr64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
  const cppShr64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
  const cppStringText = (value: unknown) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);

  const cppScratch_build_single_table_temp = new Float64Array(new Uint8Array(Math.max(0, Number(32))));
  function method_reset(runtime: any): any {
    const members = runtime.members;

    members.period = ((0) >>> 0);
    members.count = ((0) | 0);
    members.step = ((0) << 24 >> 24);
    members.volume = ((0) >>> 0);
    members.hold = ((0) & 0xff);
    members.alternate = ((0) & 0xff);
    members.attack = ((0) & 0xff);
    members.holding = ((0) & 0xff);
  }

  function method_set_period(runtime: any, fine: any, coarse: any): any {
    const members = runtime.members;

    fine = ((fine) & 0xff);
    coarse = ((coarse) & 0xff);
    members.period = ((((fine) | (((coarse) << (8))))) >>> 0);
  }

  function method_set_shape(runtime: any, shape: any, mask: any): any {
    const members = runtime.members;

    shape = ((shape) & 0xff);
    mask = ((mask) & 0xff);
    members.attack = ((((((shape) & (4))) ? (mask) : (0))) & 0xff);
    if (((Number(((shape) & (8))) === Number(0)) ? 1 : 0)) {
      members.hold = ((1) & 0xff);
      members.alternate = (((members.attack ?? 0)) & 0xff);
    } else {
      members.hold = ((((shape) & (1))) & 0xff);
      members.alternate = ((((shape) & (2))) & 0xff);
    }
    members.step = ((mask) << 24 >> 24);
    members.holding = ((0) & 0xff);
    members.volume = (((((members.step ?? 0)) ^ ((members.attack ?? 0)))) >>> 0);
  }

  function method_tone_duty(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_tone_duty(runtime, tone);
    return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
  }
  function __deref_tone_duty(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_get_envelope_chan(runtime: any, chan: any): any {
    const members = runtime.members;

    return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
  }

  function method_tone_volume(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_tone_volume(runtime, tone);
    return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
  }
  function __deref_tone_volume(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_build_mosfet_resistor_table(runtime: any, par: any, rd: any, tab: any): any {
    const members = runtime.members;

    for (let j: any = ((0) | 0); ((Number(j) < Number(par.m_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
      let Vd: any = 5;
      let Vg: any = runtime.subtract(par.m_Vg, par.m_Vth);
      let kn: any = ((runtime.readIndex(par.m_Kn, j)) / (1000000));
      let p2: any = ((((1) / (((((2) * (kn))) * (rd))))) + (Vg));
      let Vs: any = ((p2) - (Math.sqrt(Number(((((p2) * (p2))) - (((Vg) * (Vg))))))));
      let res: any = ((rd) * (((((Vd) / (Vs))) - (1))));
      runtime.writeIndex(tab, j, res);
    }
  }

  function method_build_single_table(runtime: any, rl: any, par: any, normalize: any, tab: any, zero_is_off: any): any {
    const members = runtime.members;

    let rt: any = 0;
    let rw: any = 0;
    let temp: any = cppScratch_build_single_table_temp.fill(0);
    let min: any = 10;
    let max: any = 0;
    for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
      rt = __add_build_single_table(runtime, ((1) / (__deref_build_single_table(runtime, par).r_down)), ((1) / (rl)));
      rw = ((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)));
      rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)))));
      if ((((((zero_is_off) && ((((j) === (0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
        rw = ((rw) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
        rt = ((rt) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
      }
      temp[j] = ((rw) / (rt));
      if (((Number((temp[j] ?? 0)) < Number(min)) ? 1 : 0)) {
        min = (temp[j] ?? 0);
      }
      if (((Number((temp[j] ?? 0)) > Number(max)) ? 1 : 0)) {
        max = (temp[j] ?? 0);
      }
    }
    if (normalize) {
      for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((((1) * ((((((((temp[j] ?? 0)) - (min))) / (((max) - (min))))) - (0.25))))) * (0.5)));
      }
    } else {
      for (let j: any = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((1) * ((temp[j] ?? 0))));
      }
    }
  }
  function __add_build_single_table(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_build_single_table(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_build_3D_table(runtime: any, rl: any, par: any, par_env: any, normalize: any, factor: any, zero_is_off: any, tab: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["VECTOR_OF"];

    let min: any = 10;
    let max: any = 0;
    let temp: any = (__L0 ? __L0("double", 262144, 0) : runtime.macro("VECTOR_OF", "double", 262144, 0));
    for (let e: any = ((0) | 0); (((e) < (8)) ? 1 : 0); e = ((((e) + (1))) | 0)) {
      let par_ch1: any = ((((e) & (1))) ? (par_env) : (par)); let par_ch1$s: any = undefined, par_ch1$o: any = 0; if (ArrayBuffer.isView(par_ch1) || Array.isArray(par_ch1)) par_ch1$s = par_ch1; else if (par_ch1 !== null && typeof par_ch1 === 'object' && par_ch1.generatedPointer === true && par_ch1.path === undefined && par_ch1.target === undefined && (ArrayBuffer.isView(par_ch1.source) || Array.isArray(par_ch1.source))) { par_ch1$s = par_ch1.source; par_ch1$o = par_ch1.offset; }
      let par_ch2: any = ((((e) & (2))) ? (par_env) : (par)); let par_ch2$s: any = undefined, par_ch2$o: any = 0; if (ArrayBuffer.isView(par_ch2) || Array.isArray(par_ch2)) par_ch2$s = par_ch2; else if (par_ch2 !== null && typeof par_ch2 === 'object' && par_ch2.generatedPointer === true && par_ch2.path === undefined && par_ch2.target === undefined && (ArrayBuffer.isView(par_ch2.source) || Array.isArray(par_ch2.source))) { par_ch2$s = par_ch2.source; par_ch2$o = par_ch2.offset; }
      let par_ch3: any = ((((e) & (4))) ? (par_env) : (par)); let par_ch3$s: any = undefined, par_ch3$o: any = 0; if (ArrayBuffer.isView(par_ch3) || Array.isArray(par_ch3)) par_ch3$s = par_ch3; else if (par_ch3 !== null && typeof par_ch3 === 'object' && par_ch3.generatedPointer === true && par_ch3.path === undefined && par_ch3.target === undefined && (ArrayBuffer.isView(par_ch3.source) || Array.isArray(par_ch3.source))) { par_ch3$s = par_ch3.source; par_ch3$o = par_ch3.offset; }
      for (let j1: any = ((0) | 0); ((Number(j1) < Number(__deref_build_3D_table(runtime, par_ch1).res_count)) ? 1 : 0); j1 = ((((j1) + (1))) | 0)) {
        for (let j2: any = ((0) | 0); ((Number(j2) < Number(__deref_build_3D_table(runtime, par_ch2).res_count)) ? 1 : 0); j2 = ((((j2) + (1))) | 0)) {
          for (let j3: any = ((0) | 0); ((Number(j3) < Number(__deref_build_3D_table(runtime, par_ch3).res_count)) ? 1 : 0); j3 = ((((j3) + (1))) | 0)) {
            let n: any = 0;
            if (zero_is_off) {
              n = ((((((((j1) !== (0)) ? 1 : 0)) || (((e) & (1)))) ? 1 : 0)) ? (1) : (0));
              n = ((n) + (((((((((j2) !== (0)) ? 1 : 0)) || (((e) & (2)))) ? 1 : 0)) ? (1) : (0))));
              n = ((n) + (((((((((j3) !== (0)) ? 1 : 0)) || (((e) & (4)))) ? 1 : 0)) ? (1) : (0))));
            } else {
              n = 3;
            }
            let rt: any = __add_build_3D_table(runtime, __add_build_3D_table(runtime, ((n) / (__deref_build_3D_table(runtime, par).r_up)), ((3) / (__deref_build_3D_table(runtime, par).r_down))), ((1) / (rl)));
            let rw: any = ((n) / (__deref_build_3D_table(runtime, par).r_up));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
            let indx: any = ((((((((((e) << (15))) | (((j3) << (10))))) | (((j2) << (5))))) | (j1))) | 0);
            runtime.writeIndex(temp, indx, ((rw) / (rt)));
            if (((Number(runtime.readIndex(temp, indx)) < Number(min)) ? 1 : 0)) {
              min = runtime.readIndex(temp, indx);
            }
            if (((Number(runtime.readIndex(temp, indx)) > Number(max)) ? 1 : 0)) {
              max = runtime.readIndex(temp, indx);
            }
          }
        }
      }
    }
    if (normalize) {
      for (let j: any = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((((1) * (((((runtime.readIndex(temp, j)) - (min))) / (((max) - (min))))))) * (factor)));
      }
    } else {
      for (let j: any = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(tab, j, ((1) * (runtime.readIndex(temp, j))));
      }
    }
  }
  function __add_build_3D_table(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_build_3D_table(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_write_bc1_bc2(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    switch ((((offset) & (3)) as number)) {
      case 0:
      {
        method_address_w(runtime, data);
        break;
      }
      case 1:
      {
        break;
      }
      case 2:
      {
        method_data_w(runtime, data);
        break;
      }
      case 3:
      {
        method_address_w(runtime, data);
        break;
      }
    }
  }

  function method_address_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", 0, data);
  }

  function method_data_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", 1, data);
  }

  function method_port_a_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
  }
  function __deref_port_a_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_b_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
  }
  function __deref_port_b_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_a_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
  }
  function __deref_port_a_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_port_b_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
  }
  function __deref_port_b_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_data_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.invoke("ay8910_read_ym")) & 0xff);
  }

  function method_data_address_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
  }

  function method_address_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
  }

  function method_ay8910_device__port_a_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
  }
  function __deref_ay8910_device__port_a_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_b_read_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
  }
  function __deref_ay8910_device__port_b_read_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_a_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
  }
  function __deref_ay8910_device__port_a_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__port_b_write_callback(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (__t0 = __deref_ay8910_device__port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
  }
  function __deref_ay8910_device__port_b_write_callback(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__data_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.invoke("ay8910_read_ym")) & 0xff);
  }

  function method_ay8910_device__data_address_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
  }

  function method_ay8910_device__address_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
  }

  function method_ay8910_device__tone_volume(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_ay8910_device__tone_volume(runtime, tone);
    return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
  }
  function __deref_ay8910_device__tone_volume(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__tone_duty(runtime: any, tone: any): any {
    const members = runtime.members;
    const __pointee_tone = __deref_ay8910_device__tone_duty(runtime, tone);
    return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
  }
  function __deref_ay8910_device__tone_duty(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }

  function method_ay8910_device__get_envelope_chan(runtime: any, chan: any): any {
    const members = runtime.members;

    return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "reset": method_reset,
    "set_period": method_set_period,
    "set_shape": method_set_shape,
    "tone_duty": method_tone_duty,
    "get_envelope_chan": method_get_envelope_chan,
    "tone_volume": method_tone_volume,
    "build_mosfet_resistor_table": method_build_mosfet_resistor_table,
    "build_single_table": method_build_single_table,
    "build_3D_table": method_build_3D_table,
    "write_bc1_bc2": method_write_bc1_bc2,
    "address_w": method_address_w,
    "data_w": method_data_w,
    "port_a_read_callback": method_port_a_read_callback,
    "port_b_read_callback": method_port_b_read_callback,
    "port_a_write_callback": method_port_a_write_callback,
    "port_b_write_callback": method_port_b_write_callback,
    "data_r": method_data_r,
    "data_address_w": method_data_address_w,
    "address_data_w": method_address_data_w,
    "ay8910_device::port_a_read_callback": method_ay8910_device__port_a_read_callback,
    "ay8910_device::port_b_read_callback": method_ay8910_device__port_b_read_callback,
    "ay8910_device::port_a_write_callback": method_ay8910_device__port_a_write_callback,
    "ay8910_device::port_b_write_callback": method_ay8910_device__port_b_write_callback,
    "ay8910_device::data_r": method_ay8910_device__data_r,
    "ay8910_device::data_address_w": method_ay8910_device__data_address_w,
    "ay8910_device::address_data_w": method_ay8910_device__address_data_w,
    "ay8910_device::tone_volume": method_ay8910_device__tone_volume,
    "ay8910_device::tone_duty": method_ay8910_device__tone_duty,
    "ay8910_device::get_envelope_chan": method_ay8910_device__get_envelope_chan
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap,
};
definition.compiledStructMethods = {
  "tone_t": (() => {
  const cppMin = (a: number, b: number) => (b < a ? b : a);
  const cppMax = (a: number, b: number) => (a < b ? b : a);
  // An aggregate initializer's struct, marked as one (execute.ts's
  // isGeneratedStruct) through its prototype: like generatedStruct's
  // non-enumerable marker, field walks and spreads never see it, and a
  // literal with a prototype costs nothing next to defineProperty.
  const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
  // CALL_METHOD through a table of method names: each entry's emitted method,
  // resolved once and again only if that entry's name changes (see the
  // CALL_METHOD emission). The last table is held, as a core keeps one until
  // its mode changes.
  const cppDispatch = new WeakMap<object, { names: unknown[]; methods: any[] }>();
  let cppLastTable: unknown, cppLastEntry: { names: unknown[]; methods: any[] } | undefined;
  const cppMethodAt = (table: any, index: number): any => {
    if (!Array.isArray(table)) return undefined;
    let entry = table === cppLastTable ? cppLastEntry : undefined;
    if (!entry) {
      entry = cppDispatch.get(table);
      if (!entry) cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
      cppLastTable = table;
      cppLastEntry = entry;
    }
    const name = table[index];
    if (entry.names[index] === name && name !== undefined) return entry.methods[index];
    entry.names[index] = name;
    return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
  };
  // execute.ts's clearGeneratedStruct, field names read once per struct.
  const cppUnionElements = Symbol.for('mamekit.unionElements');
  const cppStructKeys = new WeakMap<object, string[]>();
  const cppClearStruct = (target: any, value: number): void => {
    let keys = cppStructKeys.get(target);
    if (!keys) cppStructKeys.set(target, keys = Object.keys(target));
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]!;
      const field = target[key];
      if (ArrayBuffer.isView(field) || Array.isArray(field)) (field as any).fill(value);
      else if (field && typeof field === 'object') cppClearStruct(field, value);
      else target[key] = value;
    }
  };
  // memset: typed memory fills in place; a plain array of numbers is set
  // element by element (as the interpreter's fillGeneratedMemory writes it,
  // count elements from 0); an array holding structs, or a pointer into a
  // plain array, goes to the interpreter's rule, which clears each struct.
  const cppMemset = (runtime: any, target: any, value: number, count: any) => {
    const bytes = Number(count);
    if (Array.isArray(target)) {
      for (let index = 0; index < bytes; index++) {
        const element = target[index];
        if (element !== null && typeof element === 'object') {
          // A struct element is cleared field by field (cppClearStruct);
          // anything else array-like takes the interpreter's rule.
          if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
            return runtime.macro("memset", target, value, bytes);
          }
          cppClearStruct(element, value);
          continue;
        }
        target[index] = value;
      }
      return target;
    }
    if (Array.isArray(target?.source)) return runtime.macro("memset", target, value, bytes);
    if (target?.generatedPointer) {
      const width = target.source.BYTES_PER_ELEMENT ?? 1;
      target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
      return target;
    }
    target.fill(value, 0, bytes);
    return target;
  };
  // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
  // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
  // execute.ts's wide operators answer them (a shift of 64 or more is 0).
  const cppLo64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
  const cppHi64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
  const cppShl64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
  const cppShl64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
  const cppShr64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
  const cppShr64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
  const cppStringText = (value: unknown) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);


  function method_reset(runtime: any): any {
    const members = runtime.members;

    members.period = ((0) >>> 0);
    members.volume = ((0) & 0xff);
    members.duty = ((0) & 0xff);
    members.count = ((0) | 0);
    members.duty_cycle = ((0) & 0xff);
    members.output = ((0) & 0xff);
  }

  function method_set_period(runtime: any, fine: any, coarse: any): any {
    const members = runtime.members;

    fine = ((fine) & 0xff);
    coarse = ((coarse) & 0xff);
    members.period = ((((fine) | (((coarse) << (8))))) >>> 0);
  }

  function method_set_volume(runtime: any, val: any): any {
    const members = runtime.members;

    val = ((val) & 0xff);
    members.volume = ((val) & 0xff);
  }

  function method_set_duty(runtime: any, val: any): any {
    const members = runtime.members;

    val = ((val) & 0xff);
    members.duty = ((val) & 0xff);
  }

  function method_read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_read_l(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.invoke("get_open_bus")) & 0xff);
  }

  function method_write_l(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_chr1_x(runtime: any, start: any, bank: any, source: any): any {
    const members = runtime.members;

    runtime.invoke("bank_chr", 0, start, bank, source);
  }

  function method_prg8_89(runtime: any, bank: any): any {
    const members = runtime.members;

    runtime.invoke("prg8_x", 0, bank);
  }

  function method_prg8_ab(runtime: any, bank: any): any {
    const members = runtime.members;

    runtime.invoke("prg8_x", 1, bank);
  }

  function method_prg8_cd(runtime: any, bank: any): any {
    const members = runtime.members;

    runtime.invoke("prg8_x", 2, bank);
  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_nes_sunsoft_fme7_device__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("fme7_write", offset, data);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "reset": method_reset,
    "set_period": method_set_period,
    "set_volume": method_set_volume,
    "set_duty": method_set_duty,
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "read_l": method_read_l,
    "write_l": method_write_l,
    "chr1_x": method_chr1_x,
    "prg8_89": method_prg8_89,
    "prg8_ab": method_prg8_ab,
    "prg8_cd": method_prg8_cd,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
    "nes_sunsoft_fme7_device::write_h": method_nes_sunsoft_fme7_device__write_h
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap,
  "envelope_t": (() => {
  const cppMin = (a: number, b: number) => (b < a ? b : a);
  const cppMax = (a: number, b: number) => (a < b ? b : a);
  // An aggregate initializer's struct, marked as one (execute.ts's
  // isGeneratedStruct) through its prototype: like generatedStruct's
  // non-enumerable marker, field walks and spreads never see it, and a
  // literal with a prototype costs nothing next to defineProperty.
  const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
  // CALL_METHOD through a table of method names: each entry's emitted method,
  // resolved once and again only if that entry's name changes (see the
  // CALL_METHOD emission). The last table is held, as a core keeps one until
  // its mode changes.
  const cppDispatch = new WeakMap<object, { names: unknown[]; methods: any[] }>();
  let cppLastTable: unknown, cppLastEntry: { names: unknown[]; methods: any[] } | undefined;
  const cppMethodAt = (table: any, index: number): any => {
    if (!Array.isArray(table)) return undefined;
    let entry = table === cppLastTable ? cppLastEntry : undefined;
    if (!entry) {
      entry = cppDispatch.get(table);
      if (!entry) cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
      cppLastTable = table;
      cppLastEntry = entry;
    }
    const name = table[index];
    if (entry.names[index] === name && name !== undefined) return entry.methods[index];
    entry.names[index] = name;
    return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
  };
  // execute.ts's clearGeneratedStruct, field names read once per struct.
  const cppUnionElements = Symbol.for('mamekit.unionElements');
  const cppStructKeys = new WeakMap<object, string[]>();
  const cppClearStruct = (target: any, value: number): void => {
    let keys = cppStructKeys.get(target);
    if (!keys) cppStructKeys.set(target, keys = Object.keys(target));
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]!;
      const field = target[key];
      if (ArrayBuffer.isView(field) || Array.isArray(field)) (field as any).fill(value);
      else if (field && typeof field === 'object') cppClearStruct(field, value);
      else target[key] = value;
    }
  };
  // memset: typed memory fills in place; a plain array of numbers is set
  // element by element (as the interpreter's fillGeneratedMemory writes it,
  // count elements from 0); an array holding structs, or a pointer into a
  // plain array, goes to the interpreter's rule, which clears each struct.
  const cppMemset = (runtime: any, target: any, value: number, count: any) => {
    const bytes = Number(count);
    if (Array.isArray(target)) {
      for (let index = 0; index < bytes; index++) {
        const element = target[index];
        if (element !== null && typeof element === 'object') {
          // A struct element is cleared field by field (cppClearStruct);
          // anything else array-like takes the interpreter's rule.
          if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
            return runtime.macro("memset", target, value, bytes);
          }
          cppClearStruct(element, value);
          continue;
        }
        target[index] = value;
      }
      return target;
    }
    if (Array.isArray(target?.source)) return runtime.macro("memset", target, value, bytes);
    if (target?.generatedPointer) {
      const width = target.source.BYTES_PER_ELEMENT ?? 1;
      target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
      return target;
    }
    target.fill(value, 0, bytes);
    return target;
  };
  // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
  // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
  // execute.ts's wide operators answer them (a shift of 64 or more is 0).
  const cppLo64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
  const cppHi64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
  const cppShl64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
  const cppShl64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
  const cppShr64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
  const cppShr64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
  const cppStringText = (value: unknown) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);


  function method_reset(runtime: any): any {
    const members = runtime.members;

    members.period = ((0) >>> 0);
    members.count = ((0) | 0);
    members.step = ((0) << 24 >> 24);
    members.volume = ((0) >>> 0);
    members.hold = ((0) & 0xff);
    members.alternate = ((0) & 0xff);
    members.attack = ((0) & 0xff);
    members.holding = ((0) & 0xff);
  }

  function method_set_period(runtime: any, fine: any, coarse: any): any {
    const members = runtime.members;

    fine = ((fine) & 0xff);
    coarse = ((coarse) & 0xff);
    members.period = ((((fine) | (((coarse) << (8))))) >>> 0);
  }

  function method_set_shape(runtime: any, shape: any, mask: any): any {
    const members = runtime.members;

    shape = ((shape) & 0xff);
    mask = ((mask) & 0xff);
    members.attack = ((((((shape) & (4))) ? (mask) : (0))) & 0xff);
    if (((Number(((shape) & (8))) === Number(0)) ? 1 : 0)) {
      members.hold = ((1) & 0xff);
      members.alternate = (((members.attack ?? 0)) & 0xff);
    } else {
      members.hold = ((((shape) & (1))) & 0xff);
      members.alternate = ((((shape) & (2))) & 0xff);
    }
    members.step = ((mask) << 24 >> 24);
    members.holding = ((0) & 0xff);
    members.volume = (((((members.step ?? 0)) ^ ((members.attack ?? 0)))) >>> 0);
  }

  function method_read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_read_l(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.invoke("get_open_bus")) & 0xff);
  }

  function method_write_l(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_chr1_x(runtime: any, start: any, bank: any, source: any): any {
    const members = runtime.members;

    runtime.invoke("bank_chr", 0, start, bank, source);
  }

  function method_prg8_89(runtime: any, bank: any): any {
    const members = runtime.members;

    runtime.invoke("prg8_x", 0, bank);
  }

  function method_prg8_ab(runtime: any, bank: any): any {
    const members = runtime.members;

    runtime.invoke("prg8_x", 1, bank);
  }

  function method_prg8_cd(runtime: any, bank: any): any {
    const members = runtime.members;

    runtime.invoke("prg8_x", 2, bank);
  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_nes_sunsoft_fme7_device__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("fme7_write", offset, data);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "reset": method_reset,
    "set_period": method_set_period,
    "set_shape": method_set_shape,
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "read_l": method_read_l,
    "write_l": method_write_l,
    "chr1_x": method_chr1_x,
    "prg8_89": method_prg8_89,
    "prg8_ab": method_prg8_ab,
    "prg8_cd": method_prg8_cd,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
    "nes_sunsoft_fme7_device::write_h": method_nes_sunsoft_fme7_device__write_h
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap,
};

export const device = definition;
export default device;
