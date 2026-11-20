// GENERATED executable machine composition from src/mame/konami/simpsons.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'simpsons');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
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
  const __mame_table_0 = [1, 1, 32, 256];

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_nmi_handler"], __L1: any = __l["m_firq_handler"], __L2: any = __l["m_irq_handler"];
    let __t0: any;

    data = ((data) & 0xff);
    if (((Number(((offset) & (8191))) < Number(6144)) ? 1 : 0)) {
      if ((((offset) >= (16384)) ? 1 : 0)) {
        members.m_has_extra_video_ram = 1;
      }
      runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
      runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), runtime.shiftRight(((offset) & (6144)), 11)), "mark_tile_dirty", 0, undefined)(((offset) & (2047)));
    } else {
      runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
      if (((((((offset) >= (6156)) ? 1 : 0)) && ((((offset) < (6196)) ? 1 : 0))) ? 1 : 0)) {
      } else {
        if (((((((offset) >= (6656)) ? 1 : 0)) && ((((offset) < (7168)) ? 1 : 0))) ? 1 : 0)) {
        } else {
          if ((((offset) === (7168)) ? 1 : 0)) {
            members.m_addrmap = data;
          } else {
            if ((((offset) === (7296)) ? 1 : 0)) {
              if (((Number((members.m_scrollctrl ?? runtime.member("m_scrollctrl"))) !== Number(data)) ? 1 : 0)) {
                members.m_scrollctrl = data;
              }
            } else {
              if ((((offset) === (7424)) ? 1 : 0)) {
                if (((((((~data)) & ((members.m_irq_control ?? runtime.member("m_irq_control"))))) >>> (0)) & 1)) {
                  (__L0 ? __L0(0) : runtime.macro("m_nmi_handler", 0));
                }
                if (((((((~data)) & ((members.m_irq_control ?? runtime.member("m_irq_control"))))) >>> (1)) & 1)) {
                  (__L1 ? __L1(0) : runtime.macro("m_firq_handler", 0));
                }
                if (((((((~data)) & ((members.m_irq_control ?? runtime.member("m_irq_control"))))) >>> (2)) & 1)) {
                  (__L2 ? __L2(0) : runtime.macro("m_irq_handler", 0));
                }
                members.m_irq_control = data;
              } else {
                if ((((offset) === (7552)) ? 1 : 0)) {
                  let dirty: any = ((0) | 0);
                  if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 0)) !== Number(((data) & (15)))) ? 1 : 0)) {
                    dirty = ((((dirty) | (1))) | 0);
                  }
                  if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 1)) !== Number(((((data) >>> (4))) & (15)))) ? 1 : 0)) {
                    dirty = ((((dirty) | (2))) | 0);
                  }
                  if (dirty) {
                    runtime.writeIndex(runtime.writableMember("m_charrombank"), 0, ((data) & (15)));
                    runtime.writeIndex(runtime.writableMember("m_charrombank"), 1, ((((data) >>> (4))) & (15)));
                    for (let i: any = ((0) | 0); (((i) < (6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                      let bank: any = ((runtime.shiftRight(((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), i)) & (12)), 2)) | 0);
                      if ((((((((((bank) === (0)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || (((((((bank) === (1)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                        runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), runtime.shiftRight(((i) & (6144)), 11)), "mark_tile_dirty", 0, undefined)(((i) & (2047)));
                      }
                    }
                  }
                } else {
                  if (((((((offset) === (7680)) ? 1 : 0)) || ((((offset) === (15872)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_romsubbank = data;
                  } else {
                    if ((((offset) === (7808)) ? 1 : 0)) {
                      if (((Number((((members.m_tileflip_enable ?? runtime.member("m_tileflip_enable"))) & (6))) !== Number(((data) & (6)))) ? 1 : 0)) {
                        for (let i: any = ((0) | 0); (((i) < (3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                          (__t0 = __deref_write(runtime, runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), i)), typeof __t0.mark_all_dirty === 'function' ? (__t0.mark_all_dirty() ?? 0) : runtime.container(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), i), "mark_all_dirty"));
                        }
                      }
                      members.m_tileflip_enable = ((data) & (7));
                      (runtime.overrides["tileflip_reset"] ? runtime.overrides["tileflip_reset"]() : method_tileflip_reset(runtime));
                    } else {
                      if ((((offset) === (7936)) ? 1 : 0)) {
                        let dirty: any = ((0) | 0);
                        if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 2)) !== Number(((data) & (15)))) ? 1 : 0)) {
                          dirty = ((((dirty) | (1))) | 0);
                        }
                        if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 3)) !== Number(((((data) >>> (4))) & (15)))) ? 1 : 0)) {
                          dirty = ((((dirty) | (2))) | 0);
                        }
                        if (dirty) {
                          runtime.writeIndex(runtime.writableMember("m_charrombank"), 2, ((data) & (15)));
                          runtime.writeIndex(runtime.writableMember("m_charrombank"), 3, ((((data) >>> (4))) & (15)));
                          for (let i: any = ((0) | 0); (((i) < (6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let bank: any = ((runtime.shiftRight(((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), i)) & (12)), 2)) | 0);
                            if ((((((((((bank) === (2)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || (((((((bank) === (3)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                              runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), runtime.shiftRight(((i) & (6144)), 11)), "mark_tile_dirty", 0, undefined)(((i) & (2047)));
                            }
                          }
                        }
                      } else {
                        if (((((((offset) >= (14348)) ? 1 : 0)) && ((((offset) < (14388)) ? 1 : 0))) ? 1 : 0)) {
                        } else {
                          if (((((((offset) >= (14848)) ? 1 : 0)) && ((((offset) < (15360)) ? 1 : 0))) ? 1 : 0)) {
                          } else {
                            if ((((offset) === (15744)) ? 1 : 0)) {
                              runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 0, ((data) & (15)));
                              runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 1, ((((data) >>> (4))) & (15)));
                            } else {
                              if ((((offset) === (16128)) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 2, ((data) & (15)));
                                runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 3, ((((data) >>> (4))) & (15)));
                              } else {
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  function __deref_write(runtime: any, p: any): any {
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

  function method_tileflip_reset(runtime: any): any {
    const members = runtime.members;

    let flip: any = ((((((((members.m_tileflip_enable ?? runtime.member("m_tileflip_enable"))) >>> (0)) & 1)) ? (3) : (0))) >>> 0);
    for (let i: any = ((0) | 0); (((i) < (3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), i), "set_flip", 0, undefined)(flip);
    }
  }

  function method_k053246_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_kx46_regs"), offset, data);
  }

  function method_set_rmrd_line(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_rmrd_line = state;
  }

  function method_k053246_set_objcha_line(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_objcha_line = state;
  }

  function method_eeprom_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_io_eepromout.write"], __L1: any = __l["write"], __L2: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    if ((((data) === (255)) ? 1 : 0)) {
      return;
    }
    (__L0 ?? runtime.memberCall(members.m_io_eepromout, "write", 0, __L1))(data, 255);
    (runtime.overrides["video_bank_select"] ? runtime.overrides["video_bank_select"](((data) & (3))) : method_video_bank_select(runtime, ((data) & (3))));
    members.m_firq_enabled = (((((data) >>> (2)) & 1)) ? 1 : 0);
    if ((((members.m_firq_enabled ?? runtime.member("m_firq_enabled"))) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
    }
  }

  function method_video_bank_select(runtime: any, bank: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette_view.select"], __L1: any = __l["select"], __L2: any = __l["m_palette_view.disable"], __L3: any = __l["disable"], __L4: any = __l["m_video_view.select"];
    let __t0: any;

    if ((((bank) >>> (0)) & 1)) {
      (__L0 ?? runtime.memberCall(members.m_palette_view, "select", 0, __L1))(0);
    } else {
      (__L2 ?? runtime.memberCall(members.m_palette_view, "disable", 0, __L3))();
    }
    (__L4 ?? runtime.memberCall(members.m_video_view, "select", 0, __L1))((((bank) >>> (1)) & 1));
  }

  function method_sound_interrupt_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_audiocpu.set_input_line"];

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 2);
    }
    return 0;
  }

  function method_k052109_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k052109.read"];

    return (__L0 ?? runtime.memberCall(members.m_k052109, "read", 0, undefined))(((offset) + (8192)));
  }

  function method_k052109_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k052109.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_k052109, "write", 0, undefined))(((offset) + (8192)), data);
  }

  function method_k053247_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let offs: any = ((((offset) >>> (1))) | 0);
    if ((((offset) >>> (0)) & 1)) {
      return ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (255));
    } else {
      return runtime.shiftRight(runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs), 8);
    }
  }

  function method_k053247_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let offs: any = ((((offset) >>> (1))) | 0);
    if ((((offset) >>> (0)) & 1)) {
      runtime.writeIndex(runtime.writableMember("m_spriteram"), offs, ((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (65280))) | (data)));
    } else {
      runtime.writeIndex(runtime.writableMember("m_spriteram"), offs, ((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (255))) | (((data) << (8)))));
    }
  }

  function method_z80_arm_nmi_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audiocpu.set_input_line"], __L1: any = __l["m_audiocpu.cycles_to_attotime"], __L2: any = __l["m_nmi_blocked.adjust"], __L3: any = __l["adjust"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-1, 0);
    (__L2 ?? runtime.memberCall(members.m_nmi_blocked, "adjust", 0, __L3))((__L1 ?? runtime.memberCall(members.m_audiocpu, "cycles_to_attotime", 0, undefined))(4));
  }

  function method_z80_bankswitch_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audiobank.set_entry"], __L1: any = __l["set_entry"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_audiobank, "set_entry", 0, __L1))(((data) & (7)));
  }

  function method_dma_start(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    if ((members.m_firq_enabled ?? runtime.member("m_firq_enabled"))) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 1);
    }
  }

  function method_dma_end(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
  }

  function method_periodic_irq(runtime: any, device: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k053246.k053246_is_irq_enabled"], __L1: any = __l["attotime::from_ticks"], __L2: any = __l["m_dma_start_timer.adjust"], __L3: any = __l["adjust"], __L4: any = __l["m_dma_end_timer.adjust"];
    let __t0: any;

    if ((__L0 ?? runtime.memberCall(members.m_k053246, "k053246_is_irq_enabled", 0, undefined))()) {
      runtime.invoke("object_dma");
      (__L2 ?? runtime.memberCall(members.m_dma_start_timer, "adjust", 0, __L3))((__L1 ? __L1(256, runtime.divide(24000000, 4)) : runtime.macro("attotime::from_ticks", 256, runtime.divide(24000000, 4))));
      (__L4 ?? runtime.memberCall(members.m_dma_end_timer, "adjust", 0, __L3))((__L1 ? __L1(2304, runtime.divide(24000000, 4)) : runtime.macro("attotime::from_ticks", 2304, runtime.divide(24000000, 4))));
    }
  }

  function method_banking_callback(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_mainbank.set_entry"], __L1: any = __l["set_entry"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_mainbank, "set_entry", 0, __L1))(((data) & (63)));
  }

  function method_konami_sortlayers3(runtime: any, layer: any, pri: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["std::less"], __L1: any = __l["konami_sortlayers_3"];

    (__L1 ? __L1((__L0 ? __L0() : runtime.macro("std::less")), layer, pri) : runtime.macro("konami_sortlayers_3", (__L0 ? __L0() : runtime.macro("std::less")), layer, pri));
  }

  function method_tile_callback(runtime: any, layer: any, bank: any, code: any, color: any, flags: any, priority: any): any {
    const members = runtime.members;

    code.set(((((code.get()) | (((((((color.get()) & (63))) << (8))) | (((bank) << (14))))))) | 0));
    color.set(((__add_tile_callback(runtime, runtime.readIndex((members.m_layer_colorbase ?? runtime.member("m_layer_colorbase")), layer), runtime.shiftRight(((color.get()) & (192)), 6))) | 0));
  }
  function __add_tile_callback(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_sprite_callback(runtime: any, code: any, color: any, priority_mask: any): any {
    const members = runtime.members;

    let pri: any = ((runtime.shiftRight(((color.get()) & (3968)), 6)) | 0);
    if (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 2))) ? 1 : 0)) {
      priority_mask.set(((0) | 0));
    } else {
      if ((((((Number(pri) > Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 2))) ? 1 : 0)) && (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 1))) ? 1 : 0))) ? 1 : 0)) {
        priority_mask.set(((240) | 0));
      } else {
        if ((((((Number(pri) > Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 1))) ? 1 : 0)) && (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 0))) ? 1 : 0))) ? 1 : 0)) {
          priority_mask.set(((252) | 0));
        } else {
          priority_mask.set(((254) | 0));
        }
      }
    }
    color.set(((__add_sprite_callback(runtime, (members.m_sprite_colorbase ?? runtime.member("m_sprite_colorbase")), ((color.get()) & (31)))) | 0));
  }
  function __add_sprite_callback(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_z80_nmi_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_nmi_blocked.enabled"], __L1: any = __l["enabled"], __L2: any = __l["m_audiocpu.set_input_line"];
    let __t0: any;

    if ((((state) && ((((__L0 ?? runtime.memberCall(members.m_nmi_blocked, "enabled", 0, __L1))()) ? 0 : 1))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-1, 1);
    }
  }

  function method_update_scroll(runtime: any): any {
    const members = runtime.members;

    for (let tmap: any = ((0) | 0); (((tmap) < (2)) ? 1 : 0); tmap = ((((tmap) + (1))) | 0)) {
      let scrollctrl: any = ((((runtime.shiftRight((members.m_scrollctrl ?? runtime.member("m_scrollctrl")), ((tmap) * (3)))) & (7))) & 0xff);
      let rows: any = (((__mame_table_0[(((((scrollctrl) & (3))) % 4) + 4) % 4] ?? 0)) | 0);
      let cols: any = (((((((scrollctrl) >>> (2)) & 1)) ? (64) : (1))) | 0);
      let tmap_mask: any = ((((tmap) ? (8192) : (0))) | 0);
      let scrollram_y: any = __addr_update_scroll(runtime, (members.m_ram ?? runtime.member("m_ram")), ((6144) | (tmap_mask))); let scrollram_y$s: any = undefined, scrollram_y$o: any = 0; if (ArrayBuffer.isView(scrollram_y) || Array.isArray(scrollram_y)) scrollram_y$s = scrollram_y; else if (scrollram_y !== null && typeof scrollram_y === 'object' && scrollram_y.generatedPointer === true && scrollram_y.path === undefined && scrollram_y.target === undefined && (ArrayBuffer.isView(scrollram_y.source) || Array.isArray(scrollram_y.source))) { scrollram_y$s = scrollram_y.source; scrollram_y$o = scrollram_y.offset; }
      let scrollram_x: any = __addr_update_scroll(runtime, (members.m_ram ?? runtime.member("m_ram")), ((6656) | (tmap_mask))); let scrollram_x$s: any = undefined, scrollram_x$o: any = 0; if (ArrayBuffer.isView(scrollram_x) || Array.isArray(scrollram_x)) scrollram_x$s = scrollram_x; else if (scrollram_x !== null && typeof scrollram_x === 'object' && scrollram_x.generatedPointer === true && scrollram_x.path === undefined && scrollram_x.target === undefined && (ArrayBuffer.isView(scrollram_x.source) || Array.isArray(scrollram_x.source))) { scrollram_x$s = scrollram_x.source; scrollram_x$o = scrollram_x.offset; }
      let t: any = ((((tmap) + (1))) | 0);
      if (((((((rows) === (1)) ? 1 : 0)) && ((((cols) === (1)) ? 1 : 0))) ? 1 : 0)) {
        runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_rows", 0, undefined)(1);
        runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_cols", 0, undefined)(1);
        let xscroll: any = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (0)] ?? 0) : runtime.readIndex(scrollram_x, 0)), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (1)] ?? 0) : runtime.readIndex(scrollram_x, 1)))))) | 0);
        let yscroll: any = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (12)] ?? 0) : runtime.readIndex(scrollram_y, 12))) | 0);
        runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrollx", 0, undefined)(0, xscroll);
        runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrolly", 0, undefined)(0, yscroll);
      } else {
        if ((((cols) === (1)) ? 1 : 0)) {
          runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_rows", 0, undefined)(256);
          runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_cols", 0, undefined)(1);
          let yscroll: any = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (12)] ?? 0) : runtime.readIndex(scrollram_y, 12))) | 0);
          runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrolly", 0, undefined)(0, yscroll);
          let offs_mask: any = (((((((rows) === (256)) ? 1 : 0)) ? (255) : (248))) | 0);
          for (let offs: any = ((0) | 0); (((offs) < (256)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
            let xscroll: any = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (((2) * (((offs) & (offs_mask)))))] ?? 0) : runtime.readIndex(scrollram_x, ((2) * (((offs) & (offs_mask)))))), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (__add_update_scroll(runtime, ((2) * (((offs) & (offs_mask)))), 1))] ?? 0) : runtime.readIndex(scrollram_x, __add_update_scroll(runtime, ((2) * (((offs) & (offs_mask)))), 1))))))) | 0);
            runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrollx", 0, undefined)(((((offs) + (yscroll))) & (255)), xscroll);
          }
        } else {
          if ((((rows) === (1)) ? 1 : 0)) {
            runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_rows", 0, undefined)(1);
            runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_cols", 0, undefined)(64);
            let xscroll: any = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (0)] ?? 0) : runtime.readIndex(scrollram_x, 0)), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (1)] ?? 0) : runtime.readIndex(scrollram_x, 1)))))) | 0);
            runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrollx", 0, undefined)(0, xscroll);
            xscroll = ((((xscroll) / (8))) | 0);
            for (let offs: any = ((0) | 0); (((offs) < (64)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
              let yscroll: any = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (offs)] ?? 0) : runtime.readIndex(scrollram_y, offs))) | 0);
              runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrolly", 0, undefined)(((((offs) + (xscroll))) & (63)), yscroll);
            }
          } else {
            runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_rows", 0, undefined)(rows);
            runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scroll_cols", 0, undefined)(64);
            let offs_step: any = (((((((rows) === (256)) ? 1 : 0)) ? (2) : (16))) | 0);
            for (let offs: any = ((0) | 0); (((offs) < (rows)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
              let xscroll: any = ((__add_update_scroll(runtime, (scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (((offs_step) * (offs)))] ?? 0) : runtime.readIndex(scrollram_x, ((offs_step) * (offs)))), ((256) * ((scrollram_x$s !== undefined ? (scrollram_x$s[scrollram_x$o + (__add_update_scroll(runtime, ((offs_step) * (offs)), 1))] ?? 0) : runtime.readIndex(scrollram_x, __add_update_scroll(runtime, ((offs_step) * (offs)), 1))))))) | 0);
              runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrollx", 0, undefined)(offs, xscroll);
            }
            for (let offs: any = ((0) | 0); (((offs) < (64)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
              let yscroll: any = (((scrollram_y$s !== undefined ? (scrollram_y$s[scrollram_y$o + (offs)] ?? 0) : runtime.readIndex(scrollram_y, offs))) | 0);
              runtime.memberCall(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t), "set_scrolly", 0, undefined)(offs, yscroll);
            }
          }
        }
      }
    }
  }
  function __add_update_scroll(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_update_scroll(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "write": method_write,
    "tileflip_reset": method_tileflip_reset,
    "k053246_w": method_k053246_w,
    "set_rmrd_line": method_set_rmrd_line,
    "k053246_set_objcha_line": method_k053246_set_objcha_line,
    "eeprom_w": method_eeprom_w,
    "video_bank_select": method_video_bank_select,
    "sound_interrupt_r": method_sound_interrupt_r,
    "k052109_r": method_k052109_r,
    "k052109_w": method_k052109_w,
    "k053247_r": method_k053247_r,
    "k053247_w": method_k053247_w,
    "z80_arm_nmi_w": method_z80_arm_nmi_w,
    "z80_bankswitch_w": method_z80_bankswitch_w,
    "dma_start": method_dma_start,
    "dma_end": method_dma_end,
    "periodic_irq": method_periodic_irq,
    "banking_callback": method_banking_callback,
    "konami_sortlayers3": method_konami_sortlayers3,
    "z80_nmi_w": method_z80_nmi_w,
    "update_scroll": method_update_scroll
  };
  return __methodTable;
})();
    return {
      "simpsons_state.eeprom_w": methods["eeprom_w"],
      "simpsons_state.video_bank_select": methods["video_bank_select"],
      "simpsons_state.sound_interrupt_r": methods["sound_interrupt_r"],
      "simpsons_state.k052109_r": methods["k052109_r"],
      "simpsons_state.k052109_w": methods["k052109_w"],
      "simpsons_state.k053247_r": methods["k053247_r"],
      "simpsons_state.k053247_w": methods["k053247_w"],
      "simpsons_state.z80_arm_nmi_w": methods["z80_arm_nmi_w"],
      "simpsons_state.z80_bankswitch_w": methods["z80_bankswitch_w"],
      "simpsons_state.dma_start": methods["dma_start"],
      "simpsons_state.dma_end": methods["dma_end"],
      "simpsons_state.periodic_irq": methods["periodic_irq"],
      "simpsons_state.banking_callback": methods["banking_callback"],
      "simpsons_state.konami_sortlayers3": methods["konami_sortlayers3"],
      "simpsons_state.z80_nmi_w": methods["z80_nmi_w"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust","attotime::from_ticks","disable","enabled","konami_sortlayers_3","m_audiobank.set_entry","m_audiocpu.cycles_to_attotime","m_audiocpu.set_input_line","m_dma_end_timer.adjust","m_dma_start_timer.adjust","m_firq_handler","m_io_eepromout.write","m_irq_handler","m_k052109.read","m_k052109.write","m_k053246.k053246_is_irq_enabled","m_mainbank.set_entry","m_maincpu.set_input_line","m_nmi_blocked.adjust","m_nmi_blocked.enabled","m_nmi_handler","m_palette_view.disable","m_palette_view.select","m_video_view.select","machine","machine().side_effects_disabled","select","set_entry","std::less","write"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
