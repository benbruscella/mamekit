// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './neogeo_pcm2_mslug4_cart.device.ir.json' with { type: 'json' };

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


  function method_rom_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let rom: any = ((method_get_rom_size(runtime)) ? (method_get_rom_base(runtime)) : (method_get_region_rom_base(runtime))); let rom$s: any = undefined, rom$o: any = 0; if (ArrayBuffer.isView(rom) || Array.isArray(rom)) rom$s = rom; else if (rom !== null && typeof rom === 'object' && rom.generatedPointer === true && rom.path === undefined && rom.target === undefined && (ArrayBuffer.isView(rom.source) || Array.isArray(rom.source))) { rom$s = rom.source; rom$o = rom.offset; }
    return (((rom$s !== undefined ? (rom$s[rom$o + (offset)] ?? 0) : runtime.readIndex(rom, offset))) & 0xffff);
  }

  function method_get_rom_size(runtime: any): any {
    const members = runtime.members;

    return (((((members.m_rom).length) * (2))) >>> 0);
  }

  function method_get_rom_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_rom).length) > Number(0)) ? 1 : 0)) ? (__addr_get_rom_base(runtime, (members.m_rom ?? 0), 0)) : (0));
  }
  function __addr_get_rom_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_region_rom_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    const h_m_region_rom = members.m_region_rom ?? 0;
    if ((__t0 = __deref_get_region_rom_base(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
      return h_m_region_rom["as_u16&"](0);
    }
    return 0;
  }
  function __deref_get_region_rom_base(runtime: any, p: any): any {
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

  function method_banksel_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);

  }

  function method_ram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((65535) & 0xffff);
  }

  function method_ram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);

  }

  function method_protection_r(runtime: any, space: any, offset: any): any {
    const members = runtime.members;

    return ((65535) & 0xffff);
  }

  function method_protection_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);

  }

  function method_addon_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((65535) & 0xffff);
  }

  function method_get_bank_base(runtime: any, sel: any): any {
    const members = runtime.members;

    sel = ((sel) & 0xffff);
    return ((0) >>> 0);
  }

  function method_get_special_bank(runtime: any): any {
    const members = runtime.members;

    return ((0) >>> 0);
  }

  function method_get_helper(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xffff);
  }

  function method_get_fixed_bank_type(runtime: any): any {
    const members = runtime.members;

    return ((1) | 0);
  }

  function method_rom_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_rom = runtime.resize(members.m_rom, runtime.divide(size, 2)));
  }

  function method_get_region_rom_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_get_region_rom_size(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
      return ((runtime.container(members.m_region_rom, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_get_region_rom_size(runtime: any, p: any): any {
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

  function method_fixed_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_fixed = runtime.resize(members.m_fixed, size));
  }

  function method_get_fixed_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_fixed).length) > Number(0)) ? 1 : 0)) ? (__addr_get_fixed_base(runtime, (members.m_fixed ?? 0), 0)) : (0));
  }
  function __addr_get_fixed_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_fixed_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_fixed).length) >>> 0);
  }

  function method_get_region_fixed_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_get_region_fixed_base(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
      return (__t1 = __deref_get_region_fixed_base(runtime, members.m_region_fixed), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_fixed, "base"));
    }
    return 0;
  }
  function __deref_get_region_fixed_base(runtime: any, p: any): any {
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

  function method_get_region_fixed_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_get_region_fixed_size(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
      return ((runtime.container(members.m_region_fixed, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_get_region_fixed_size(runtime: any, p: any): any {
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

  function method_audio_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_audio = runtime.resize(members.m_audio, size));
  }

  function method_get_audio_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_audio).length) > Number(0)) ? 1 : 0)) ? (__addr_get_audio_base(runtime, (members.m_audio ?? 0), 0)) : (0));
  }
  function __addr_get_audio_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_audio_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_audio).length) >>> 0);
  }

  function method_get_region_audio_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_get_region_audio_base(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
      return (__t1 = __deref_get_region_audio_base(runtime, members.m_region_audio), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audio, "base"));
    }
    return 0;
  }
  function __deref_get_region_audio_base(runtime: any, p: any): any {
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

  function method_get_region_audio_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_get_region_audio_size(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
      return ((runtime.container(members.m_region_audio, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_get_region_audio_size(runtime: any, p: any): any {
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

  function method_audiocrypt_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_audiocrypt = runtime.resize(members.m_audiocrypt, size));
  }

  function method_get_audiocrypt_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_audiocrypt).length) > Number(0)) ? 1 : 0)) ? (__addr_get_audiocrypt_base(runtime, (members.m_audiocrypt ?? 0), 0)) : (0));
  }
  function __addr_get_audiocrypt_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_audiocrypt_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_audiocrypt).length) >>> 0);
  }

  function method_get_region_audiocrypt_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
      return (__t1 = __deref_get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audiocrypt, "base"));
    }
    return 0;
  }
  function __deref_get_region_audiocrypt_base(runtime: any, p: any): any {
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

  function method_get_region_audiocrypt_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_get_region_audiocrypt_size(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
      return ((runtime.container(members.m_region_audiocrypt, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_get_region_audiocrypt_size(runtime: any, p: any): any {
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

  function method_sprites_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_sprites = runtime.resize(members.m_sprites, size));
  }

  function method_get_sprites_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_sprites).length) > Number(0)) ? 1 : 0)) ? (__addr_get_sprites_base(runtime, (members.m_sprites ?? 0), 0)) : (0));
  }
  function __addr_get_sprites_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_sprites_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_sprites).length) >>> 0);
  }

  function method_get_region_sprites_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_get_region_sprites_base(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
      return (__t1 = __deref_get_region_sprites_base(runtime, members.m_region_spr), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_spr, "base"));
    }
    return 0;
  }
  function __deref_get_region_sprites_base(runtime: any, p: any): any {
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

  function method_get_region_sprites_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_get_region_sprites_size(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
      return ((runtime.container(members.m_region_spr, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_get_region_sprites_size(runtime: any, p: any): any {
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

  function method_ym_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_ym = runtime.resize(members.m_ym, size));
  }

  function method_get_ym_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_ym).length) > Number(0)) ? 1 : 0)) ? (__addr_get_ym_base(runtime, (members.m_ym ?? 0), 0)) : (0));
  }
  function __addr_get_ym_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_ym_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_ym).length) >>> 0);
  }

  function method_get_region_ym_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_get_region_ym_base(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
      return (__t1 = __deref_get_region_ym_base(runtime, members.m_region_ym), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ym, "base"));
    }
    return 0;
  }
  function __deref_get_region_ym_base(runtime: any, p: any): any {
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

  function method_get_region_ym_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_get_region_ym_size(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
      return ((runtime.container(members.m_region_ym, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_get_region_ym_size(runtime: any, p: any): any {
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

  function method_ymdelta_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_ymdelta = runtime.resize(members.m_ymdelta, size));
  }

  function method_get_ymdelta_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_ymdelta).length) > Number(0)) ? 1 : 0)) ? (__addr_get_ymdelta_base(runtime, (members.m_ymdelta ?? 0), 0)) : (0));
  }
  function __addr_get_ymdelta_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_ymdelta_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_ymdelta).length) >>> 0);
  }

  function method_get_region_ymdelta_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
      return (__t1 = __deref_get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ymd, "base"));
    }
    return 0;
  }
  function __deref_get_region_ymdelta_base(runtime: any, p: any): any {
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

  function method_get_region_ymdelta_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_get_region_ymdelta_size(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
      return ((runtime.container(members.m_region_ymd, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_get_region_ymdelta_size(runtime: any, p: any): any {
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

  function method_get_sprites_opt_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_sprites_opt).length) > Number(0)) ? 1 : 0)) ? (__addr_get_sprites_opt_base(runtime, (members.m_sprites_opt ?? 0), 0)) : (0));
  }
  function __addr_get_sprites_opt_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_sprites_opt_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_sprites_opt).length) >>> 0);
  }

  function method_get_region_mask(runtime: any, rgn: any, rgn_size: any): any {
    const members = runtime.members;

    let mask: any = ((4294967295) >>> 0);
    let len: any = ((rgn_size) >>> 0);
    for (let bit: any = ((2147483648) >>> 0); (((bit) !== (0)) ? 1 : 0); bit = ((((bit) >>> (1))) >>> 0)) {
      if (((((((len) * (2))) - (1))) & (bit))) {
        break;
      }
      mask = ((((mask) >>> (1))) >>> 0);
    }
    return ((mask) >>> 0);
  }

  function method_optimize_sprites(runtime: any, region_sprites: any, region_sprites_size: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    let spritegfx_address_mask: any = ((method_get_region_mask(runtime, region_sprites, region_sprites_size)) >>> 0);
    let src: any = region_sprites;
    (members.m_sprites_opt = runtime.resize(members.m_sprites_opt, ((spritegfx_address_mask) + (1))));
    let dest: any = __addr_optimize_sprites(runtime, (members.m_sprites_opt ?? 0), 0);
    for (let i: any = 0; (((i) < (region_sprites_size)) ? 1 : 0); i = ((i) + (128)), src = __add_optimize_sprites(runtime, src, 128)) {
      for (let y: any = 0; (((y) < (16)) ? 1 : 0); y = ((y) + (1))) {
        for (let x: any = 0; (((x) < (8)) ? 1 : 0); x = ((x) + (1))) {
          runtime.pointerStore((__t0 = dest, dest = __add_optimize_sprites(runtime, dest, 1), __t0), ((((((((((runtime.shiftRight(runtime.readIndex(src, ((67) | (((y) << (2))))), x)) & (1))) << (3))) | (((((runtime.shiftRight(runtime.readIndex(src, ((65) | (((y) << (2))))), x)) & (1))) << (2))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((66) | (((y) << (2))))), x)) & (1))) << (1))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((64) | (((y) << (2))))), x)) & (1))) << (0)))));
        }
        for (let x: any = 0; (((x) < (8)) ? 1 : 0); x = ((x) + (1))) {
          runtime.pointerStore((__t1 = dest, dest = __add_optimize_sprites(runtime, dest, 1), __t1), ((((((((((runtime.shiftRight(runtime.readIndex(src, ((3) | (((y) << (2))))), x)) & (1))) << (3))) | (((((runtime.shiftRight(runtime.readIndex(src, ((1) | (((y) << (2))))), x)) & (1))) << (2))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((2) | (((y) << (2))))), x)) & (1))) << (1))))) | (((((runtime.shiftRight(runtime.readIndex(src, ((0) | (((y) << (2))))), x)) & (1))) << (0)))));
        }
      }
    }
  }
  function __add_optimize_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_optimize_sprites(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__rom_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((65535) & 0xffff);
  }

  function method_device_neogeo_cart_interface__banksel_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);

  }

  function method_device_neogeo_cart_interface__ram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((65535) & 0xffff);
  }

  function method_device_neogeo_cart_interface__ram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);

  }

  function method_device_neogeo_cart_interface__protection_r(runtime: any, space: any, offset: any): any {
    const members = runtime.members;

    return ((65535) & 0xffff);
  }

  function method_device_neogeo_cart_interface__protection_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);

  }

  function method_device_neogeo_cart_interface__addon_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((65535) & 0xffff);
  }

  function method_device_neogeo_cart_interface__get_bank_base(runtime: any, sel: any): any {
    const members = runtime.members;

    sel = ((sel) & 0xffff);
    return ((0) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_special_bank(runtime: any): any {
    const members = runtime.members;

    return ((0) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_helper(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xffff);
  }

  function method_device_neogeo_cart_interface__decrypt_all(runtime: any, DECRYPT_ALL_PARAMS: any): any {
    const members = runtime.members;


  }

  function method_device_neogeo_cart_interface__get_fixed_bank_type(runtime: any): any {
    const members = runtime.members;

    return ((0) | 0);
  }

  function method_device_neogeo_cart_interface__rom_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_rom = runtime.resize(members.m_rom, runtime.divide(size, 2)));
  }

  function method_device_neogeo_cart_interface__get_rom_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_rom).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_rom_base(runtime, (members.m_rom ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_rom_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_rom_size(runtime: any): any {
    const members = runtime.members;

    return (((((members.m_rom).length) * (2))) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_region_rom_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    const h_m_region_rom = members.m_region_rom ?? 0;
    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_rom_base(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
      return h_m_region_rom["as_u16&"](0);
    }
    return 0;
  }
  function __deref_device_neogeo_cart_interface__get_region_rom_base(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_region_rom_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_rom_size(runtime, members.m_region_rom), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_rom, "found"))) {
      return ((runtime.container(members.m_region_rom, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_device_neogeo_cart_interface__get_region_rom_size(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__fixed_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_fixed = runtime.resize(members.m_fixed, size));
  }

  function method_device_neogeo_cart_interface__get_fixed_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_fixed).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_fixed_base(runtime, (members.m_fixed ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_fixed_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_fixed_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_fixed).length) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_region_fixed_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_fixed_base(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
      return (__t1 = __deref_device_neogeo_cart_interface__get_region_fixed_base(runtime, members.m_region_fixed), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_fixed, "base"));
    }
    return 0;
  }
  function __deref_device_neogeo_cart_interface__get_region_fixed_base(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_region_fixed_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_fixed_size(runtime, members.m_region_fixed), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_fixed, "found"))) {
      return ((runtime.container(members.m_region_fixed, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_device_neogeo_cart_interface__get_region_fixed_size(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__audio_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_audio = runtime.resize(members.m_audio, size));
  }

  function method_device_neogeo_cart_interface__get_audio_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_audio).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_audio_base(runtime, (members.m_audio ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_audio_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_audio_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_audio).length) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_region_audio_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audio_base(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
      return (__t1 = __deref_device_neogeo_cart_interface__get_region_audio_base(runtime, members.m_region_audio), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audio, "base"));
    }
    return 0;
  }
  function __deref_device_neogeo_cart_interface__get_region_audio_base(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_region_audio_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audio_size(runtime, members.m_region_audio), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audio, "found"))) {
      return ((runtime.container(members.m_region_audio, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_device_neogeo_cart_interface__get_region_audio_size(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__audiocrypt_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_audiocrypt = runtime.resize(members.m_audiocrypt, size));
  }

  function method_device_neogeo_cart_interface__get_audiocrypt_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_audiocrypt).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_audiocrypt_base(runtime, (members.m_audiocrypt ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_audiocrypt_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_audiocrypt_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_audiocrypt).length) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
      return (__t1 = __deref_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime, members.m_region_audiocrypt), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_audiocrypt, "base"));
    }
    return 0;
  }
  function __deref_device_neogeo_cart_interface__get_region_audiocrypt_base(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_region_audiocrypt_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_audiocrypt_size(runtime, members.m_region_audiocrypt), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_audiocrypt, "found"))) {
      return ((runtime.container(members.m_region_audiocrypt, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_device_neogeo_cart_interface__get_region_audiocrypt_size(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__sprites_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_sprites = runtime.resize(members.m_sprites, size));
  }

  function method_device_neogeo_cart_interface__get_sprites_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_sprites).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_sprites_base(runtime, (members.m_sprites ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_sprites_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_sprites_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_sprites).length) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_region_sprites_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_sprites_base(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
      return (__t1 = __deref_device_neogeo_cart_interface__get_region_sprites_base(runtime, members.m_region_spr), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_spr, "base"));
    }
    return 0;
  }
  function __deref_device_neogeo_cart_interface__get_region_sprites_base(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_region_sprites_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_sprites_size(runtime, members.m_region_spr), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_spr, "found"))) {
      return ((runtime.container(members.m_region_spr, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_device_neogeo_cart_interface__get_region_sprites_size(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__ym_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_ym = runtime.resize(members.m_ym, size));
  }

  function method_device_neogeo_cart_interface__get_ym_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_ym).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_ym_base(runtime, (members.m_ym ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_ym_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_ym_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_ym).length) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_region_ym_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ym_base(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
      return (__t1 = __deref_device_neogeo_cart_interface__get_region_ym_base(runtime, members.m_region_ym), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ym, "base"));
    }
    return 0;
  }
  function __deref_device_neogeo_cart_interface__get_region_ym_base(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_region_ym_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ym_size(runtime, members.m_region_ym), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ym, "found"))) {
      return ((runtime.container(members.m_region_ym, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_device_neogeo_cart_interface__get_region_ym_size(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__ymdelta_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_ymdelta = runtime.resize(members.m_ymdelta, size));
  }

  function method_device_neogeo_cart_interface__get_ymdelta_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_ymdelta).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_ymdelta_base(runtime, (members.m_ymdelta ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_ymdelta_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_ymdelta_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_ymdelta).length) >>> 0);
  }

  function method_device_neogeo_cart_interface__get_region_ymdelta_base(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
      return (__t1 = __deref_device_neogeo_cart_interface__get_region_ymdelta_base(runtime, members.m_region_ymd), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_region_ymd, "base"));
    }
    return 0;
  }
  function __deref_device_neogeo_cart_interface__get_region_ymdelta_base(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_region_ymdelta_size(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    if ((__t0 = __deref_device_neogeo_cart_interface__get_region_ymdelta_size(runtime, members.m_region_ymd), typeof __t0.found === 'function' ? __t0.found() : typeof __t0.found === 'number' || typeof __t0.found === 'boolean' ? __t0.found : runtime.container(members.m_region_ymd, "found"))) {
      return ((runtime.container(members.m_region_ymd, "bytes")) >>> 0);
    }
    return ((0) >>> 0);
  }
  function __deref_device_neogeo_cart_interface__get_region_ymdelta_size(runtime: any, p: any): any {
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

  function method_device_neogeo_cart_interface__get_sprites_opt_base(runtime: any): any {
    const members = runtime.members;

    return ((((Number((members.m_sprites_opt).length) > Number(0)) ? 1 : 0)) ? (__addr_device_neogeo_cart_interface__get_sprites_opt_base(runtime, (members.m_sprites_opt ?? 0), 0)) : (0));
  }
  function __addr_device_neogeo_cart_interface__get_sprites_opt_base(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_device_neogeo_cart_interface__get_sprites_opt_size(runtime: any): any {
    const members = runtime.members;

    return (((members.m_sprites_opt).length) >>> 0);
  }

  function method_device_start(runtime: any): any {
    const members = runtime.members;


  }

  function method_device_reset(runtime: any): any {
    const members = runtime.members;


  }

  function method_neogeo_rom_device__device_start(runtime: any): any {
    const members = runtime.members;


  }

  function method_neogeo_rom_device__device_reset(runtime: any): any {
    const members = runtime.members;


  }

  function method_neogeo_pcm2_cart_device__decrypt_all(runtime: any, DECRYPT_ALL_PARAMS: any): any {
    const members = runtime.members;


  }

  function method_neogeo_pcm2_cart_device__get_fixed_bank_type(runtime: any): any {
    const members = runtime.members;

    return ((0) | 0);
  }

  function method_neogeo_pcm2_mslug4_cart_device__get_fixed_bank_type(runtime: any): any {
    const members = runtime.members;

    return ((1) | 0);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "rom_r": method_rom_r,
    "get_rom_size": method_get_rom_size,
    "get_rom_base": method_get_rom_base,
    "get_region_rom_base": method_get_region_rom_base,
    "banksel_w": method_banksel_w,
    "ram_r": method_ram_r,
    "ram_w": method_ram_w,
    "protection_r": method_protection_r,
    "protection_w": method_protection_w,
    "addon_r": method_addon_r,
    "get_bank_base": method_get_bank_base,
    "get_special_bank": method_get_special_bank,
    "get_helper": method_get_helper,
    "get_fixed_bank_type": method_get_fixed_bank_type,
    "rom_alloc": method_rom_alloc,
    "get_region_rom_size": method_get_region_rom_size,
    "fixed_alloc": method_fixed_alloc,
    "get_fixed_base": method_get_fixed_base,
    "get_fixed_size": method_get_fixed_size,
    "get_region_fixed_base": method_get_region_fixed_base,
    "get_region_fixed_size": method_get_region_fixed_size,
    "audio_alloc": method_audio_alloc,
    "get_audio_base": method_get_audio_base,
    "get_audio_size": method_get_audio_size,
    "get_region_audio_base": method_get_region_audio_base,
    "get_region_audio_size": method_get_region_audio_size,
    "audiocrypt_alloc": method_audiocrypt_alloc,
    "get_audiocrypt_base": method_get_audiocrypt_base,
    "get_audiocrypt_size": method_get_audiocrypt_size,
    "get_region_audiocrypt_base": method_get_region_audiocrypt_base,
    "get_region_audiocrypt_size": method_get_region_audiocrypt_size,
    "sprites_alloc": method_sprites_alloc,
    "get_sprites_base": method_get_sprites_base,
    "get_sprites_size": method_get_sprites_size,
    "get_region_sprites_base": method_get_region_sprites_base,
    "get_region_sprites_size": method_get_region_sprites_size,
    "ym_alloc": method_ym_alloc,
    "get_ym_base": method_get_ym_base,
    "get_ym_size": method_get_ym_size,
    "get_region_ym_base": method_get_region_ym_base,
    "get_region_ym_size": method_get_region_ym_size,
    "ymdelta_alloc": method_ymdelta_alloc,
    "get_ymdelta_base": method_get_ymdelta_base,
    "get_ymdelta_size": method_get_ymdelta_size,
    "get_region_ymdelta_base": method_get_region_ymdelta_base,
    "get_region_ymdelta_size": method_get_region_ymdelta_size,
    "get_sprites_opt_base": method_get_sprites_opt_base,
    "get_sprites_opt_size": method_get_sprites_opt_size,
    "get_region_mask": method_get_region_mask,
    "optimize_sprites": method_optimize_sprites,
    "device_neogeo_cart_interface::rom_r": method_device_neogeo_cart_interface__rom_r,
    "device_neogeo_cart_interface::banksel_w": method_device_neogeo_cart_interface__banksel_w,
    "device_neogeo_cart_interface::ram_r": method_device_neogeo_cart_interface__ram_r,
    "device_neogeo_cart_interface::ram_w": method_device_neogeo_cart_interface__ram_w,
    "device_neogeo_cart_interface::protection_r": method_device_neogeo_cart_interface__protection_r,
    "device_neogeo_cart_interface::protection_w": method_device_neogeo_cart_interface__protection_w,
    "device_neogeo_cart_interface::addon_r": method_device_neogeo_cart_interface__addon_r,
    "device_neogeo_cart_interface::get_bank_base": method_device_neogeo_cart_interface__get_bank_base,
    "device_neogeo_cart_interface::get_special_bank": method_device_neogeo_cart_interface__get_special_bank,
    "device_neogeo_cart_interface::get_helper": method_device_neogeo_cart_interface__get_helper,
    "device_neogeo_cart_interface::decrypt_all": method_device_neogeo_cart_interface__decrypt_all,
    "device_neogeo_cart_interface::get_fixed_bank_type": method_device_neogeo_cart_interface__get_fixed_bank_type,
    "device_neogeo_cart_interface::rom_alloc": method_device_neogeo_cart_interface__rom_alloc,
    "device_neogeo_cart_interface::get_rom_base": method_device_neogeo_cart_interface__get_rom_base,
    "device_neogeo_cart_interface::get_rom_size": method_device_neogeo_cart_interface__get_rom_size,
    "device_neogeo_cart_interface::get_region_rom_base": method_device_neogeo_cart_interface__get_region_rom_base,
    "device_neogeo_cart_interface::get_region_rom_size": method_device_neogeo_cart_interface__get_region_rom_size,
    "device_neogeo_cart_interface::fixed_alloc": method_device_neogeo_cart_interface__fixed_alloc,
    "device_neogeo_cart_interface::get_fixed_base": method_device_neogeo_cart_interface__get_fixed_base,
    "device_neogeo_cart_interface::get_fixed_size": method_device_neogeo_cart_interface__get_fixed_size,
    "device_neogeo_cart_interface::get_region_fixed_base": method_device_neogeo_cart_interface__get_region_fixed_base,
    "device_neogeo_cart_interface::get_region_fixed_size": method_device_neogeo_cart_interface__get_region_fixed_size,
    "device_neogeo_cart_interface::audio_alloc": method_device_neogeo_cart_interface__audio_alloc,
    "device_neogeo_cart_interface::get_audio_base": method_device_neogeo_cart_interface__get_audio_base,
    "device_neogeo_cart_interface::get_audio_size": method_device_neogeo_cart_interface__get_audio_size,
    "device_neogeo_cart_interface::get_region_audio_base": method_device_neogeo_cart_interface__get_region_audio_base,
    "device_neogeo_cart_interface::get_region_audio_size": method_device_neogeo_cart_interface__get_region_audio_size,
    "device_neogeo_cart_interface::audiocrypt_alloc": method_device_neogeo_cart_interface__audiocrypt_alloc,
    "device_neogeo_cart_interface::get_audiocrypt_base": method_device_neogeo_cart_interface__get_audiocrypt_base,
    "device_neogeo_cart_interface::get_audiocrypt_size": method_device_neogeo_cart_interface__get_audiocrypt_size,
    "device_neogeo_cart_interface::get_region_audiocrypt_base": method_device_neogeo_cart_interface__get_region_audiocrypt_base,
    "device_neogeo_cart_interface::get_region_audiocrypt_size": method_device_neogeo_cart_interface__get_region_audiocrypt_size,
    "device_neogeo_cart_interface::sprites_alloc": method_device_neogeo_cart_interface__sprites_alloc,
    "device_neogeo_cart_interface::get_sprites_base": method_device_neogeo_cart_interface__get_sprites_base,
    "device_neogeo_cart_interface::get_sprites_size": method_device_neogeo_cart_interface__get_sprites_size,
    "device_neogeo_cart_interface::get_region_sprites_base": method_device_neogeo_cart_interface__get_region_sprites_base,
    "device_neogeo_cart_interface::get_region_sprites_size": method_device_neogeo_cart_interface__get_region_sprites_size,
    "device_neogeo_cart_interface::ym_alloc": method_device_neogeo_cart_interface__ym_alloc,
    "device_neogeo_cart_interface::get_ym_base": method_device_neogeo_cart_interface__get_ym_base,
    "device_neogeo_cart_interface::get_ym_size": method_device_neogeo_cart_interface__get_ym_size,
    "device_neogeo_cart_interface::get_region_ym_base": method_device_neogeo_cart_interface__get_region_ym_base,
    "device_neogeo_cart_interface::get_region_ym_size": method_device_neogeo_cart_interface__get_region_ym_size,
    "device_neogeo_cart_interface::ymdelta_alloc": method_device_neogeo_cart_interface__ymdelta_alloc,
    "device_neogeo_cart_interface::get_ymdelta_base": method_device_neogeo_cart_interface__get_ymdelta_base,
    "device_neogeo_cart_interface::get_ymdelta_size": method_device_neogeo_cart_interface__get_ymdelta_size,
    "device_neogeo_cart_interface::get_region_ymdelta_base": method_device_neogeo_cart_interface__get_region_ymdelta_base,
    "device_neogeo_cart_interface::get_region_ymdelta_size": method_device_neogeo_cart_interface__get_region_ymdelta_size,
    "device_neogeo_cart_interface::get_sprites_opt_base": method_device_neogeo_cart_interface__get_sprites_opt_base,
    "device_neogeo_cart_interface::get_sprites_opt_size": method_device_neogeo_cart_interface__get_sprites_opt_size,
    "device_start": method_device_start,
    "device_reset": method_device_reset,
    "neogeo_rom_device::device_start": method_neogeo_rom_device__device_start,
    "neogeo_rom_device::device_reset": method_neogeo_rom_device__device_reset,
    "neogeo_pcm2_cart_device::decrypt_all": method_neogeo_pcm2_cart_device__decrypt_all,
    "neogeo_pcm2_cart_device::get_fixed_bank_type": method_neogeo_pcm2_cart_device__get_fixed_bank_type,
    "neogeo_pcm2_mslug4_cart_device::get_fixed_bank_type": method_neogeo_pcm2_mslug4_cart_device__get_fixed_bank_type
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.children![1]!.definition.compiledMethods = (() => {
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


  function method_decrypt(runtime: any, ymrom: any, ymsize: any, value: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["VECTOR_OF"], __L1: any = __l["memcpy"];

    let rom: any = runtime.packedView(ymrom, false); let rom$s: any = undefined, rom$o: any = 0; if (ArrayBuffer.isView(rom) || Array.isArray(rom)) rom$s = rom; else if (rom !== null && typeof rom === 'object' && rom.generatedPointer === true && rom.path === undefined && rom.target === undefined && (ArrayBuffer.isView(rom.source) || Array.isArray(rom.source))) { rom$s = rom.source; rom$o = rom.offset; }
    let size: any = ((ymsize) | 0);
    if (((rom) ? 1 : 0)) {
      let buffer: any = (__L0 ? __L0("uint16_t", runtime.divide(value, 2)) : runtime.macro("VECTOR_OF", "uint16_t", runtime.divide(value, 2)));
      for (let i: any = ((0) | 0); ((Number(i) < Number(runtime.divide(size, 2))) ? 1 : 0); i = ((((i) + (runtime.divide(value, 2)))) | 0)) {
        (__L1 ? __L1(({ generatedPointer: true, source: buffer, offset: 0 }), ({ generatedPointer: true, source: rom, offset: i }), value) : runtime.macro("memcpy", ({ generatedPointer: true, source: buffer, offset: 0 }), ({ generatedPointer: true, source: rom, offset: i }), value));
        for (let j: any = ((0) | 0); ((Number(j) < Number(runtime.divide(value, 2))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
          rom[((i) + (j))] = buffer[((j) ^ (runtime.divide(value, 4)))];
        }
      }
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "decrypt": method_decrypt
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap;
definition.children![1]!.definition.compiledMethodLinks = ["VECTOR_OF","memcpy"];

export const device = definition;
export default device;
