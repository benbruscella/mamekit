// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './neogeo_mjctrl_ac.device.ir.json' with { type: 'json' };

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


  function method_read_ctrl(runtime: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any, __t2: any;

    const h_m_mjpanel = members.m_mjpanel ?? 0;
    let res: any = ((((255) & 0xff)) & 0xff);
    if (((((members.m_ctrl_sel ?? 0)) >>> (0)) & 1)) {
      res = ((((res) & ((__t0 = __deref_read_ctrl(runtime, runtime.readIndex(h_m_mjpanel, 0)), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(runtime.readIndex(h_m_mjpanel, 0), "read"))))) & 0xff);
    }
    if (((((members.m_ctrl_sel ?? 0)) >>> (1)) & 1)) {
      res = ((((res) & ((__t1 = __deref_read_ctrl(runtime, runtime.readIndex(h_m_mjpanel, 1)), typeof __t1.read === 'function' ? __t1.read() : typeof __t1.read === 'number' || typeof __t1.read === 'boolean' ? __t1.read : runtime.container(runtime.readIndex(h_m_mjpanel, 1), "read"))))) & 0xff);
    }
    if (((((members.m_ctrl_sel ?? 0)) >>> (2)) & 1)) {
      res = ((((res) & ((__t2 = __deref_read_ctrl(runtime, runtime.readIndex(h_m_mjpanel, 2)), typeof __t2.read === 'function' ? __t2.read() : typeof __t2.read === 'number' || typeof __t2.read === 'boolean' ? __t2.read : runtime.container(runtime.readIndex(h_m_mjpanel, 2), "read"))))) & 0xff);
    }
    return ((res) & 0xff);
  }
  function __deref_read_ctrl(runtime: any, p: any): any {
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

  function method_read_start_sel(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    return (((__t0 = __deref_read_start_sel(runtime, members.m_ss), typeof __t0.read === 'function' ? __t0.read() : typeof __t0.read === 'number' || typeof __t0.read === 'boolean' ? __t0.read : runtime.container(members.m_ss, "read"))) & 0xff);
  }
  function __deref_read_start_sel(runtime: any, p: any): any {
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

  function method_write_ctrlsel(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_ctrl_sel = ((data) & 0xff);
  }

  function method_device_neogeo_control_port_interface__read_ctrl(runtime: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_neogeo_control_port_interface__read_start_sel(runtime: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_neogeo_control_port_interface__write_ctrlsel(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["NAME"], __L1: any = __l["save_item"];

    (__L1 ? __L1((__L0 ? __L0((members.m_ctrl_sel ?? 0)) : runtime.macro("NAME", (members.m_ctrl_sel ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_ctrl_sel ?? 0)) : runtime.macro("NAME", (members.m_ctrl_sel ?? 0)))));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "read_ctrl": method_read_ctrl,
    "read_start_sel": method_read_start_sel,
    "write_ctrlsel": method_write_ctrlsel,
    "device_neogeo_control_port_interface::read_ctrl": method_device_neogeo_control_port_interface__read_ctrl,
    "device_neogeo_control_port_interface::read_start_sel": method_device_neogeo_control_port_interface__read_start_sel,
    "device_neogeo_control_port_interface::write_ctrlsel": method_device_neogeo_control_port_interface__write_ctrlsel,
    "device_start": method_device_start
  };
  return __methodTable;
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["NAME","save_item"];

export const device = definition;
export default device;
