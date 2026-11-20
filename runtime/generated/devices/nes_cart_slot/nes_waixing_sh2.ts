// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_waixing_sh2.device.ir.json' with { type: 'json' };

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

    if (((Number(scanline) < Number(239)) ? 1 : 0)) {
      let prior_count: any = (((members.m_irq_count ?? 0)) | 0);
      if ((((((((members.m_irq_count ?? 0)) === (0)) ? 1 : 0)) || ((members.m_irq_clear ?? 0))) ? 1 : 0)) {
        members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xffff);
      } else {
        members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xffff);
      }
      if (((((((((((members.m_irq_enable ?? 0)) && (((blanked) ? 0 : 1))) ? 1 : 0)) && (((((members.m_irq_count ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) && ((((prior_count) || ((members.m_irq_clear ?? 0))) ? 1 : 0))) ? 1 : 0)) {
        0;
        method_set_irq_line(runtime, 1);
      }
    }
    members.m_irq_clear = ((0) & 0xff);
  }

  function method_set_irq_line(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    (__L0 ? __L0(0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
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

    const h_m_reg = members.m_reg ?? 0;
    const h_m_chr_base = members.m_chr_base ?? 0;
    let val: any = ((method_device_nes_cart_interface__chr_r(runtime, offset)) | 0);
    switch ((((offset) & (4088)) as number)) {
      case 4048:
      case 4072:
      {
        h_m_reg[(((offset) >>> (12)) & 1)] = (((offset) >>> (3)) & 1);
        runtime.invoke("set_chr", (members.m_chr_source ?? 0), h_m_chr_base, (members.m_chr_mask ?? 0));
        break;
      }
    }
    return ((val) & 0xff);
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

    0;
    if (((((members.m_wram_protect ?? 0)) >>> (7)) & 1)) {
      if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
        return ((runtime.readIndex((members.m_battery ?? 0), ((offset) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
      }
      if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
        return ((runtime.readIndex((members.m_prgram ?? 0), ((offset) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
      }
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
    0;
    if ((((((((members.m_wram_protect ?? 0)) >>> (7)) & 1)) && (((((((members.m_wram_protect ?? 0)) >>> (6)) & 1)) ? 0 : 1))) ? 1 : 0)) {
      if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
        runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
      } else {
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
        }
      }
    }
  }

  function method_write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_txrom_write(runtime, offset, data);
  }

  function method_txrom_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    const h_m_chr_base = members.m_chr_base ?? 0;
    const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
    const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
    let mmc_helper: any = ((0) & 0xff);
    let cmd: any = ((0) & 0xff);
    0;
    switch ((((offset) & (24577)) as number)) {
      case 0:
      {
        mmc_helper = (((((members.m_latch ?? 0)) ^ (data))) & 0xff);
        members.m_latch = ((data) | 0);
        if (((mmc_helper) & (64))) {
          method_set_prg(runtime, (members.m_prg_base ?? 0), (members.m_prg_mask__nes_txrom_device ?? 0));
        }
        if (((mmc_helper) & (128))) {
          runtime.invoke("set_chr", (members.m_chr_source ?? 0), h_m_chr_base, (members.m_chr_mask ?? 0));
        }
        break;
      }
      case 1:
      {
        cmd = (((((members.m_latch ?? 0)) & (7))) & 0xff);
        switch ((cmd as number)) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          {
            h_m_mmc_vrom_bank[cmd] = data;
            runtime.invoke("set_chr", (members.m_chr_source ?? 0), h_m_chr_base, (members.m_chr_mask ?? 0));
            break;
          }
          case 6:
          case 7:
          {
            h_m_mmc_prg_bank[((cmd) - (6))] = data;
            method_set_prg(runtime, (members.m_prg_base ?? 0), (members.m_prg_mask__nes_txrom_device ?? 0));
            break;
          }
        }
        break;
      }
      case 8192:
      {
        members.m_mmc_mirror = ((data) & 0xff);
        if (((Number((members.m_mirroring ?? 0)) !== Number(5)) ? 1 : 0)) {
          method_set_nt_mirroring(runtime, (((((data) >>> (0)) & 1)) ? (2) : (1)));
        }
        break;
      }
      case 8193:
      {
        members.m_wram_protect = ((data) | 0);
        break;
      }
      case 16384:
      {
        members.m_irq_count_latch = ((data) & 0xffff);
        break;
      }
      case 16385:
      {
        members.m_irq_count = ((0) & 0xffff);
        break;
      }
      case 24576:
      {
        members.m_irq_enable = ((0) | 0);
        method_set_irq_line(runtime, 0);
        break;
      }
      case 24577:
      {
        members.m_irq_enable = ((1) | 0);
        break;
      }
      default:
      {
        0;
        break;
      }
    }
  }

  function method_set_prg(runtime: any, prg_base: any, prg_mask: any): any {
    const members = runtime.members;

    const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
    let prg_flip: any = (((((((members.m_latch ?? 0)) & (64))) ? (2) : (0))) & 0xff);
    method_prg_cb(runtime, 0, ((prg_base) | (((h_m_mmc_prg_bank[((0) ^ (prg_flip))]) & (prg_mask)))));
    method_prg_cb(runtime, 1, ((prg_base) | (((h_m_mmc_prg_bank[1]) & (prg_mask)))));
    method_prg_cb(runtime, 2, ((prg_base) | (((h_m_mmc_prg_bank[((2) ^ (prg_flip))]) & (prg_mask)))));
    method_prg_cb(runtime, 3, ((prg_base) | (((h_m_mmc_prg_bank[3]) & (prg_mask)))));
  }

  function method_prg_cb(runtime: any, start: any, bank: any): any {
    const members = runtime.members;

    method_prg8_x(runtime, start, bank);
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

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

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

  function method_nes_txrom_device__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    method_txrom_write(runtime, offset, data);
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
    "set_irq_line": method_set_irq_line,
    "scanline_irq": method_scanline_irq,
    "prgram_alloc": method_prgram_alloc,
    "battery_alloc": method_battery_alloc,
    "hi_access_rom": method_hi_access_rom,
    "account_bus_conflict": method_account_bus_conflict,
    "chr_w": method_chr_w,
    "chr_r": method_chr_r,
    "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
    "nt_w": method_nt_w,
    "nt_r": method_nt_r,
    "read_l": method_read_l,
    "read_m": method_read_m,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "write_h": method_write_h,
    "txrom_write": method_txrom_write,
    "set_prg": method_set_prg,
    "prg_cb": method_prg_cb,
    "prg8_x": method_prg8_x,
    "prg_8k_bank_num": method_prg_8k_bank_num,
    "update_prg_banks": method_update_prg_banks,
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
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
    "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
    "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
    "nes_txrom_device::write_h": method_nes_txrom_device__write_h
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["fatalerror","m_maincpu.set_input_line"];

export const device = definition;
export default device;
