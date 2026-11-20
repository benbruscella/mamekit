import deviceData from './s14001a.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    const cppMin = (a, b) => (b < a ? b : a);
    const cppMax = (a, b) => (a < b ? b : a);
    // An aggregate initializer's struct, marked as one (execute.ts's
    // isGeneratedStruct) through its prototype: like generatedStruct's
    // non-enumerable marker, field walks and spreads never see it, and a
    // literal with a prototype costs nothing next to defineProperty.
    const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
    // CALL_METHOD through a table of method names: each entry's emitted method,
    // resolved once and again only if that entry's name changes (see the
    // CALL_METHOD emission). The last table is held, as a core keeps one until
    // its mode changes.
    const cppDispatch = new WeakMap();
    let cppLastTable, cppLastEntry;
    const cppMethodAt = (table, index) => {
        if (!Array.isArray(table))
            return undefined;
        let entry = table === cppLastTable ? cppLastEntry : undefined;
        if (!entry) {
            entry = cppDispatch.get(table);
            if (!entry)
                cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
            cppLastTable = table;
            cppLastEntry = entry;
        }
        const name = table[index];
        if (entry.names[index] === name && name !== undefined)
            return entry.methods[index];
        entry.names[index] = name;
        return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
    };
    // execute.ts's clearGeneratedStruct, field names read once per struct.
    const cppUnionElements = Symbol.for('mamekit.unionElements');
    const cppStructKeys = new WeakMap();
    const cppClearStruct = (target, value) => {
        let keys = cppStructKeys.get(target);
        if (!keys)
            cppStructKeys.set(target, keys = Object.keys(target));
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const field = target[key];
            if (ArrayBuffer.isView(field) || Array.isArray(field))
                field.fill(value);
            else if (field && typeof field === 'object')
                cppClearStruct(field, value);
            else
                target[key] = value;
        }
    };
    // memset: typed memory fills in place; a plain array of numbers is set
    // element by element (as the interpreter's fillGeneratedMemory writes it,
    // count elements from 0); an array holding structs, or a pointer into a
    // plain array, goes to the interpreter's rule, which clears each struct.
    const cppMemset = (runtime, target, value, count) => {
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
        if (Array.isArray(target?.source))
            return runtime.macro("memset", target, value, bytes);
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
    const cppLo64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
    const cppHi64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
    const cppShl64Lo = (lo, hi, s) => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
    const cppShl64Hi = (lo, hi, s) => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
    const cppShr64Lo = (lo, hi, s) => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
    const cppShr64Hi = (lo, hi, s) => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
    const cppStringText = (value) => typeof value === 'string' ? value
        : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
            : value === undefined || value === null ? '' : String(value);
    const __mame_table_0 = [3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 3, 3];
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["machine"], __L2 = __l["machine().sample_rate"], __L3 = __l["stream_alloc"], __L4 = __l["NAME"], __L5 = __l["save_item"];
        members.m_stream = (__L3 ? __L3(0, 1, (((__L0 ? __L0() : runtime.macro("clock"))) ? ((__L0 ? __L0() : runtime.macro("clock"))) : (((__L2 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)))) : runtime.macro("stream_alloc", 0, 1, (((__L0 ? __L0() : runtime.macro("clock"))) ? ((__L0 ? __L0() : runtime.macro("clock"))) : (((__L2 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)))));
        members.m_bPhase1 = ((0) ? 1 : 0);
        members.m_uStateP1 = (members.m_uStateP2 = 0);
        members.m_uDAR13To05P1 = ((0) & 0xffff);
        members.m_uDAR13To05P2 = ((0) & 0xffff);
        members.m_uDAR04To00P1 = ((0) & 0xffff);
        members.m_uDAR04To00P2 = ((0) & 0xffff);
        members.m_uCWARP1 = ((0) & 0xffff);
        members.m_uCWARP2 = ((0) & 0xffff);
        members.m_bStopP1 = ((0) ? 1 : 0);
        members.m_bStopP2 = ((0) ? 1 : 0);
        members.m_bVoicedP1 = ((0) ? 1 : 0);
        members.m_bVoicedP2 = ((0) ? 1 : 0);
        members.m_bSilenceP1 = ((0) ? 1 : 0);
        members.m_bSilenceP2 = ((0) ? 1 : 0);
        members.m_uLengthP1 = ((0) & 0xff);
        members.m_uLengthP2 = ((0) & 0xff);
        members.m_uXRepeatP1 = ((0) & 0xff);
        members.m_uXRepeatP2 = ((0) & 0xff);
        members.m_uDeltaOldP1 = ((0) & 0xff);
        members.m_uDeltaOldP2 = ((0) & 0xff);
        members.m_bDAR04To00CarryP2 = ((0) ? 1 : 0);
        members.m_bPPQCarryP2 = ((0) ? 1 : 0);
        members.m_bRepeatCarryP2 = ((0) ? 1 : 0);
        members.m_bLengthCarryP2 = ((0) ? 1 : 0);
        members.m_uRomAddrP1 = ((0) & 0xffff);
        members.m_uRomAddrP2 = ((0) & 0xffff);
        members.m_bBusyP1 = ((0) ? 1 : 0);
        members.m_bStart = ((0) ? 1 : 0);
        members.m_uWord = ((0) & 0xff);
        members.m_uOutputP1 = (((members.m_uOutputP2 = ((7) & 0xff))) & 0xff);
        (__L5 ? __L5((__L4 ? __L4((members.m_bPhase1 ?? 0)) : runtime.macro("NAME", (members.m_bPhase1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bPhase1 ?? 0)) : runtime.macro("NAME", (members.m_bPhase1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uStateP1 ?? 0)) : runtime.macro("NAME", (members.m_uStateP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uStateP1 ?? 0)) : runtime.macro("NAME", (members.m_uStateP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uStateP2 ?? 0)) : runtime.macro("NAME", (members.m_uStateP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uStateP2 ?? 0)) : runtime.macro("NAME", (members.m_uStateP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uDAR13To05P1 ?? 0)) : runtime.macro("NAME", (members.m_uDAR13To05P1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uDAR13To05P1 ?? 0)) : runtime.macro("NAME", (members.m_uDAR13To05P1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uDAR13To05P2 ?? 0)) : runtime.macro("NAME", (members.m_uDAR13To05P2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uDAR13To05P2 ?? 0)) : runtime.macro("NAME", (members.m_uDAR13To05P2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uDAR04To00P1 ?? 0)) : runtime.macro("NAME", (members.m_uDAR04To00P1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uDAR04To00P1 ?? 0)) : runtime.macro("NAME", (members.m_uDAR04To00P1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uDAR04To00P2 ?? 0)) : runtime.macro("NAME", (members.m_uDAR04To00P2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uDAR04To00P2 ?? 0)) : runtime.macro("NAME", (members.m_uDAR04To00P2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uCWARP1 ?? 0)) : runtime.macro("NAME", (members.m_uCWARP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uCWARP1 ?? 0)) : runtime.macro("NAME", (members.m_uCWARP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uCWARP2 ?? 0)) : runtime.macro("NAME", (members.m_uCWARP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uCWARP2 ?? 0)) : runtime.macro("NAME", (members.m_uCWARP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bStopP1 ?? 0)) : runtime.macro("NAME", (members.m_bStopP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bStopP1 ?? 0)) : runtime.macro("NAME", (members.m_bStopP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bStopP2 ?? 0)) : runtime.macro("NAME", (members.m_bStopP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bStopP2 ?? 0)) : runtime.macro("NAME", (members.m_bStopP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bVoicedP1 ?? 0)) : runtime.macro("NAME", (members.m_bVoicedP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bVoicedP1 ?? 0)) : runtime.macro("NAME", (members.m_bVoicedP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bVoicedP2 ?? 0)) : runtime.macro("NAME", (members.m_bVoicedP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bVoicedP2 ?? 0)) : runtime.macro("NAME", (members.m_bVoicedP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bSilenceP1 ?? 0)) : runtime.macro("NAME", (members.m_bSilenceP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bSilenceP1 ?? 0)) : runtime.macro("NAME", (members.m_bSilenceP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bSilenceP2 ?? 0)) : runtime.macro("NAME", (members.m_bSilenceP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bSilenceP2 ?? 0)) : runtime.macro("NAME", (members.m_bSilenceP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uLengthP1 ?? 0)) : runtime.macro("NAME", (members.m_uLengthP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uLengthP1 ?? 0)) : runtime.macro("NAME", (members.m_uLengthP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uLengthP2 ?? 0)) : runtime.macro("NAME", (members.m_uLengthP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uLengthP2 ?? 0)) : runtime.macro("NAME", (members.m_uLengthP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uXRepeatP1 ?? 0)) : runtime.macro("NAME", (members.m_uXRepeatP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uXRepeatP1 ?? 0)) : runtime.macro("NAME", (members.m_uXRepeatP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uXRepeatP2 ?? 0)) : runtime.macro("NAME", (members.m_uXRepeatP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uXRepeatP2 ?? 0)) : runtime.macro("NAME", (members.m_uXRepeatP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uDeltaOldP1 ?? 0)) : runtime.macro("NAME", (members.m_uDeltaOldP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uDeltaOldP1 ?? 0)) : runtime.macro("NAME", (members.m_uDeltaOldP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uDeltaOldP2 ?? 0)) : runtime.macro("NAME", (members.m_uDeltaOldP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uDeltaOldP2 ?? 0)) : runtime.macro("NAME", (members.m_uDeltaOldP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uOutputP1 ?? 0)) : runtime.macro("NAME", (members.m_uOutputP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uOutputP1 ?? 0)) : runtime.macro("NAME", (members.m_uOutputP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bDAR04To00CarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bDAR04To00CarryP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bDAR04To00CarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bDAR04To00CarryP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bPPQCarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bPPQCarryP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bPPQCarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bPPQCarryP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bRepeatCarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bRepeatCarryP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bRepeatCarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bRepeatCarryP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bLengthCarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bLengthCarryP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bLengthCarryP2 ?? 0)) : runtime.macro("NAME", (members.m_bLengthCarryP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uRomAddrP1 ?? 0)) : runtime.macro("NAME", (members.m_uRomAddrP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uRomAddrP1 ?? 0)) : runtime.macro("NAME", (members.m_uRomAddrP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uOutputP2 ?? 0)) : runtime.macro("NAME", (members.m_uOutputP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uOutputP2 ?? 0)) : runtime.macro("NAME", (members.m_uOutputP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uRomAddrP2 ?? 0)) : runtime.macro("NAME", (members.m_uRomAddrP2 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uRomAddrP2 ?? 0)) : runtime.macro("NAME", (members.m_uRomAddrP2 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bBusyP1 ?? 0)) : runtime.macro("NAME", (members.m_bBusyP1 ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bBusyP1 ?? 0)) : runtime.macro("NAME", (members.m_bBusyP1 ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_bStart ?? 0)) : runtime.macro("NAME", (members.m_bStart ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bStart ?? 0)) : runtime.macro("NAME", (members.m_bStart ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4((members.m_uWord ?? 0)) : runtime.macro("NAME", (members.m_uWord ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_uWord ?? 0)) : runtime.macro("NAME", (members.m_uWord ?? 0)))));
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0;
        for (let i = ((0) | 0); ((Number(i) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_Clock(runtime);
            let sample = (((((members.m_uOutputP2 ?? 0)) - (7))) << 16 >> 16);
            (__deref_sound_stream_update(runtime, stream).put_int?.(0, i, sample, 8) ?? 0);
        }
    }
    function __deref_sound_stream_update(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_Clock(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_bsy_handler"];
        if ((members.m_bPhase1 ?? 0)) {
            members.m_bPhase1 = ((0) ? 1 : 0);
            members.m_uStateP2 = (members.m_uStateP1 ?? 0);
            members.m_uDAR13To05P2 = (((members.m_uDAR13To05P1 ?? 0)) & 0xffff);
            members.m_uDAR04To00P2 = (((members.m_uDAR04To00P1 ?? 0)) & 0xffff);
            members.m_uCWARP2 = (((members.m_uCWARP1 ?? 0)) & 0xffff);
            members.m_bStopP2 = (((members.m_bStopP1 ?? 0)) ? 1 : 0);
            members.m_bVoicedP2 = (((members.m_bVoicedP1 ?? 0)) ? 1 : 0);
            members.m_bSilenceP2 = (((members.m_bSilenceP1 ?? 0)) ? 1 : 0);
            members.m_uLengthP2 = (((members.m_uLengthP1 ?? 0)) & 0xff);
            members.m_uXRepeatP2 = (((members.m_uXRepeatP1 ?? 0)) & 0xff);
            members.m_uDeltaOldP2 = (((members.m_uDeltaOldP1 ?? 0)) & 0xff);
            members.m_uOutputP2 = (((members.m_uOutputP1 ?? 0)) & 0xff);
            members.m_uRomAddrP2 = (((members.m_uRomAddrP1 ?? 0)) & 0xffff);
            members.m_bDAR04To00CarryP2 = ((((((members.m_uDAR04To00P2 ?? 0)) === (31)) ? 1 : 0)) ? 1 : 0);
            members.m_bPPQCarryP2 = ((((((members.m_bDAR04To00CarryP2 ?? 0)) && (((Number((((members.m_uLengthP2 ?? 0)) & (3))) === Number(3)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
            members.m_bRepeatCarryP2 = ((((((members.m_bPPQCarryP2 ?? 0)) && (((Number((((members.m_uLengthP2 ?? 0)) & (12))) === Number(12)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
            members.m_bLengthCarryP2 = ((((((members.m_bRepeatCarryP2 ?? 0)) && (((((members.m_uLengthP2 ?? 0)) === (127)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
            return 1;
        }
        members.m_bPhase1 = ((1) ? 1 : 0);
        switch ((members.m_uStateP1 ?? 0)) {
            case 0:
                {
                    members.m_uOutputP1 = ((7) & 0xff);
                    if ((members.m_bStart ?? 0)) {
                        members.m_uStateP1 = 1;
                    }
                    if ((members.m_bBusyP1 ?? 0)) {
                        (__L0 ? __L0(Number(0)) : typeof members.m_bsy_handler === 'function' ? members.m_bsy_handler(0) : runtime.invoke("m_bsy_handler", 0));
                    }
                    members.m_bBusyP1 = ((0) ? 1 : 0);
                    break;
                }
            case 1:
                {
                    members.m_uDAR13To05P1 = ((runtime.shiftRight((((members.m_uWord ?? 0)) & (60)), 2)) & 0xffff);
                    members.m_uDAR04To00P1 = (((((((members.m_uWord ?? 0)) & (3))) << (3))) & 0xffff);
                    members.m_uRomAddrP1 = (((((((members.m_uDAR13To05P1 ?? 0)) << (3))) | ((((members.m_uDAR04To00P1 ?? 0)) >>> (2))))) & 0xffff);
                    members.m_uOutputP1 = ((7) & 0xff);
                    members.m_uStateP1 = (((members.m_bStart ?? 0)) ? (1) : (2));
                    if ((((members.m_bBusyP1 ?? 0)) ? 0 : 1)) {
                        (__L0 ? __L0(Number(1)) : typeof members.m_bsy_handler === 'function' ? members.m_bsy_handler(1) : runtime.invoke("m_bsy_handler", 1));
                    }
                    members.m_bBusyP1 = ((1) ? 1 : 0);
                    break;
                }
            case 2:
                {
                    0;
                    members.m_uCWARP1 = ((((method_ReadMem(runtime, (members.m_uRomAddrP2 ?? 0), (members.m_bPhase1 ?? 0))) << (4))) & 0xffff);
                    members.m_uDAR04To00P1 = ((((members.m_uDAR04To00P1) + (4))) & 0xffff);
                    if (((((members.m_uDAR04To00P1 ?? 0)) >= (32)) ? 1 : 0)) {
                        members.m_uDAR04To00P1 = ((0) & 0xffff);
                    }
                    members.m_uRomAddrP1 = (((((((members.m_uDAR13To05P1 ?? 0)) << (3))) | ((((members.m_uDAR04To00P1 ?? 0)) >>> (2))))) & 0xffff);
                    members.m_uOutputP1 = ((7) & 0xff);
                    members.m_uStateP1 = (((members.m_bStart ?? 0)) ? (1) : (3));
                    break;
                }
            case 3:
                {
                    members.m_uCWARP1 = (((((members.m_uCWARP2 ?? 0)) | (runtime.shiftRight(method_ReadMem(runtime, (members.m_uRomAddrP2 ?? 0), (members.m_bPhase1 ?? 0)), 4)))) & 0xffff);
                    members.m_uRomAddrP1 = (((members.m_uCWARP1 ?? 0)) & 0xffff);
                    members.m_uOutputP1 = ((7) & 0xff);
                    members.m_uStateP1 = (((members.m_bStart ?? 0)) ? (1) : (4));
                    break;
                }
            case 4:
                {
                    members.m_uDAR13To05P1 = ((((method_ReadMem(runtime, (members.m_uRomAddrP2 ?? 0), (members.m_bPhase1 ?? 0))) << (1))) & 0xffff);
                    members.m_uDAR04To00P1 = ((0) & 0xffff);
                    members.m_uCWARP1 = ((((members.m_uCWARP1) + (1))) & 0xffff);
                    members.m_uRomAddrP1 = (((members.m_uCWARP1 ?? 0)) & 0xffff);
                    members.m_uOutputP1 = ((7) & 0xff);
                    members.m_uStateP1 = (((members.m_bStart ?? 0)) ? (1) : (5));
                    break;
                }
            case 5:
                {
                    let data = ((method_ReadMem(runtime, (members.m_uRomAddrP2 ?? 0), (members.m_bPhase1 ?? 0))) & 0xff);
                    members.m_bStopP1 = ((((((data) & (128))) ? 1 : 0)) ? 1 : 0);
                    members.m_bVoicedP1 = ((((((data) & (64))) ? 1 : 0)) ? 1 : 0);
                    members.m_bSilenceP1 = ((((((data) & (32))) ? 1 : 0)) ? 1 : 0);
                    members.m_uXRepeatP1 = ((((data) & (3))) & 0xff);
                    members.m_uLengthP1 = ((((((data) & (31))) << (2))) & 0xff);
                    members.m_uDAR04To00P1 = ((0) & 0xffff);
                    members.m_uCWARP1 = ((((members.m_uCWARP1) + (1))) & 0xffff);
                    members.m_uRomAddrP1 = (((((((members.m_uDAR13To05P1 ?? 0)) << (3))) | ((((members.m_uDAR04To00P1 ?? 0)) >>> (2))))) & 0xffff);
                    members.m_uOutputP1 = ((7) & 0xff);
                    members.m_uStateP1 = (((members.m_bStart ?? 0)) ? (1) : (6));
                    0;
                    break;
                }
            case 6:
                {
                    if ((members.m_bPPQCarryP2 ?? 0)) {
                        0;
                    }
                    let uDeltaP2 = ((0) & 0xff);
                    let uIncrementP2 = ((0) & 0xff);
                    let bAddP2 = ((0) ? 1 : 0);
                    uDeltaP2 = ((method_Mux8To2(runtime, (members.m_bVoicedP2 ?? 0), (((members.m_uLengthP2 ?? 0)) & (3)), (((members.m_uDAR04To00P2 ?? 0)) & (3)), method_ReadMem(runtime, (members.m_uRomAddrP2 ?? 0), (members.m_bPhase1 ?? 0)))) & 0xff);
                    let __inline0_bVoicedP2 = (members.m_bVoicedP2 ?? 0);
                    let __inline0_uPPQtrP2 = (((members.m_uLengthP2 ?? 0)) & (3));
                    let __inline0_bPPQStartP2 = ((((members.m_uDAR04To00P2 ?? 0)) === (0)) ? 1 : 0);
                    let __inline0_uDelta = uDeltaP2;
                    let __inline0_uDeltaOldP2 = (members.m_uDeltaOldP2 ?? 0);
                    if ((((((Number(__inline0_uPPQtrP2) === Number(0)) ? 1 : 0)) && (__inline0_bPPQStartP2)) ? 1 : 0)) {
                        __inline0_uDeltaOldP2 = ((2) & 0xff);
                    }
                    let __inline0_MIRROR = (((((__inline0_uPPQtrP2) >>> (0)) & 1)) ? 1 : 0);
                    if ((((((__inline0_bVoicedP2) ? 0 : 1)) || (((__inline0_MIRROR) ? 0 : 1))) ? 1 : 0)) {
                        uIncrementP2 = (((__mame_table_0[(((((((__inline0_uDelta) * (4))) + (__inline0_uDeltaOldP2))) % 16) + 16) % 16] ?? 0)) & 0xff);
                        bAddP2 = (((((__inline0_uDelta) >= (2)) ? 1 : 0)) ? 1 : 0);
                    }
                    else {
                        uIncrementP2 = (((__mame_table_0[(((((((__inline0_uDeltaOldP2) * (4))) + (__inline0_uDelta))) % 16) + 16) % 16] ?? 0)) & 0xff);
                        bAddP2 = (((((__inline0_uDeltaOldP2) < (2)) ? 1 : 0)) ? 1 : 0);
                    }
                    members.m_uDeltaOldP1 = ((__inline0_uDelta) & 0xff);
                    if (((((((__inline0_bVoicedP2) && (__inline0_bPPQStartP2)) ? 1 : 0)) && (__inline0_MIRROR)) ? 1 : 0)) {
                        uIncrementP2 = ((0) & 0xff);
                    }
                    members.m_uOutputP1 = ((method_CalculateOutput(runtime, (members.m_bVoicedP2 ?? 0), (members.m_bSilenceP2 ?? 0), (((members.m_uLengthP2 ?? 0)) & (3)), ((((members.m_uDAR04To00P2 ?? 0)) === (0)) ? 1 : 0), (members.m_uOutputP2 ?? 0), uIncrementP2, bAddP2)) & 0xff);
                    members.m_uDAR04To00P1 = ((((members.m_uDAR04To00P1) + (1))) & 0xffff);
                    if ((members.m_bDAR04To00CarryP2 ?? 0)) {
                        members.m_uDAR04To00P1 = ((0) & 0xffff);
                        members.m_uLengthP1 = ((((members.m_uLengthP1) + (1))) & 0xff);
                        if (((((members.m_uLengthP1 ?? 0)) >= (128)) ? 1 : 0)) {
                            members.m_uLengthP1 = ((0) & 0xff);
                        }
                    }
                    if (((((members.m_bVoicedP2 ?? 0)) && ((members.m_bRepeatCarryP2 ?? 0))) ? 1 : 0)) {
                        members.m_uLengthP1 = ((((members.m_uLengthP1) & (112))) & 0xff);
                        members.m_uLengthP1 = ((((members.m_uLengthP1) | ((((members.m_uXRepeatP1 ?? 0)) << (2))))) & 0xff);
                        members.m_uDAR13To05P1 = ((((members.m_uDAR13To05P1) + (1))) & 0xffff);
                        if (((((members.m_uDAR13To05P1 ?? 0)) >= (512)) ? 1 : 0)) {
                            members.m_uDAR13To05P1 = ((0) & 0xffff);
                        }
                    }
                    if (((((((members.m_bVoicedP2 ?? 0)) ? 0 : 1)) && ((members.m_bDAR04To00CarryP2 ?? 0))) ? 1 : 0)) {
                        members.m_uDAR13To05P1 = ((((members.m_uDAR13To05P1) + (1))) & 0xffff);
                        if (((((members.m_uDAR13To05P1 ?? 0)) >= (512)) ? 1 : 0)) {
                            members.m_uDAR13To05P1 = ((0) & 0xffff);
                        }
                    }
                    members.m_uRomAddrP1 = (((members.m_uDAR04To00P1 ?? 0)) & 0xffff);
                    if (((((members.m_bVoicedP2 ?? 0)) && ((((members.m_uLengthP1 ?? 0)) & (1)))) ? 1 : 0)) {
                        members.m_uRomAddrP1 = ((((members.m_uRomAddrP1) ^ (31))) & 0xffff);
                    }
                    members.m_uRomAddrP1 = (((((((members.m_uDAR13To05P1 ?? 0)) << (3))) | ((((members.m_uRomAddrP1 ?? 0)) >>> (2))))) & 0xffff);
                    if ((members.m_bStart ?? 0)) {
                        members.m_uStateP1 = 1;
                    }
                    else {
                        if (((((members.m_bStopP2 ?? 0)) && ((members.m_bLengthCarryP2 ?? 0))) ? 1 : 0)) {
                            members.m_uStateP1 = 7;
                        }
                        else {
                            if ((members.m_bLengthCarryP2 ?? 0)) {
                                members.m_uStateP1 = 4;
                                members.m_uRomAddrP1 = (((members.m_uCWARP1 ?? 0)) & 0xffff);
                            }
                            else {
                                members.m_uStateP1 = 6;
                            }
                        }
                    }
                    break;
                }
            case 7:
                {
                    members.m_uOutputP1 = ((7) & 0xff);
                    members.m_uStateP1 = (((members.m_bStart ?? 0)) ? (1) : (0));
                    break;
                }
        }
        return 1;
    }
    function method_ReadMem(runtime, offset, phase) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_byte"];
        offset = ((offset) & 0xffff);
        offset = ((((offset) & (4095))) & 0xffff);
        return (((__L0 ? __L0(offset) : runtime.macro("read_byte", offset))) & 0xff);
    }
    function method_Mux8To2(runtime, bVoicedP2, uPPQtrP2, uDeltaAdrP2, uRomDataP2) {
        const members = runtime.members;
        uPPQtrP2 = ((uPPQtrP2) & 0xff);
        uDeltaAdrP2 = ((uDeltaAdrP2) & 0xff);
        uRomDataP2 = ((uRomDataP2) & 0xff);
        if ((((bVoicedP2) && (((uPPQtrP2) & (1)))) ? 1 : 0)) {
            uDeltaAdrP2 = ((((uDeltaAdrP2) ^ (3))) & 0xff);
        }
        return ((((uRomDataP2) >>> ((((((~uDeltaAdrP2)) << (1))) & (6))))) & (3));
    }
    function method_CalculateOutput(runtime, bVoiced, bXSilence, uPPQtr, bPPQStart, uLOutput, uIncrementP2, bAddP2) {
        const members = runtime.members;
        uPPQtr = ((uPPQtr) & 0xff);
        uLOutput = ((uLOutput) & 0xff);
        uIncrementP2 = ((uIncrementP2) & 0xff);
        let SILENCE = (((((uPPQtr) >>> (1)) & 1)) ? 1 : 0);
        if ((((bXSilence) || ((((bVoiced) && (SILENCE)) ? 1 : 0))) ? 1 : 0)) {
            return 7;
        }
        if (((((((uPPQtr) === (0)) ? 1 : 0)) && (bPPQStart)) ? 1 : 0)) {
            uLOutput = ((7) & 0xff);
        }
        let uTmp = ((uLOutput) & 0xff);
        if (((bAddP2) ? 0 : 1)) {
            uTmp = ((((uTmp) ^ (15))) & 0xff);
        }
        uTmp = ((((uTmp) + (uIncrementP2))) & 0xff);
        if ((((uTmp) > (15)) ? 1 : 0)) {
            uTmp = ((15) & 0xff);
        }
        if (((bAddP2) ? 0 : 1)) {
            uTmp = ((((uTmp) ^ (15))) & 0xff);
        }
        return uTmp;
    }
    function method_romen_r(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_romen_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        return (((((members.m_bPhase1 ?? 0)) ? (1) : (0))) | 0);
    }
    function __deref_romen_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_busy_r(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_busy_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        return (((((members.m_bBusyP1 ?? 0)) ? (1) : (0))) | 0);
    }
    function __deref_busy_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_data_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        (__t0 = __deref_data_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_uWord = ((((data) & (63))) & 0xff);
    }
    function __deref_data_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_start_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_start_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        if ((((state) && ((((members.m_bStart ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_uStateP1 = 1;
        }
        members.m_bStart = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
    }
    function __deref_start_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_bsy(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_bsy(runtime, members.m_bsy_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bsy_handler, "bind"));
    }
    function __deref_bsy(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        let __t0;
        (__t0 = __deref_device_clock_changed(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        (__deref_device_clock_changed(runtime, members.m_stream).set_sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0);
    }
    function __deref_device_clock_changed(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_rom_bank_pre_change(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_rom_bank_pre_change(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
    }
    function __deref_rom_bank_pre_change(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_s14001a_device__bsy(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_s14001a_device__bsy(runtime, members.m_bsy_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bsy_handler, "bind"));
    }
    function __deref_s14001a_device__bsy(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_s14001a_device__device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        let __t0;
        (__t0 = __deref_s14001a_device__device_clock_changed(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        (__deref_s14001a_device__device_clock_changed(runtime, members.m_stream).set_sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0);
    }
    function __deref_s14001a_device__device_clock_changed(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_s14001a_device__rom_bank_pre_change(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_s14001a_device__rom_bank_pre_change(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
    }
    function __deref_s14001a_device__rom_bank_pre_change(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_CalculateIncrement(runtime, bVoicedP2, uPPQtrP2, bPPQStartP2, uDelta, uDeltaOldP2, uDeltaOldP1, uIncrementP2, bAddP2) {
        const members = runtime.members;
        uPPQtrP2 = ((uPPQtrP2) & 0xff);
        uDelta = ((uDelta) & 0xff);
        uDeltaOldP2 = ((uDeltaOldP2) & 0xff);
        if (((((((uPPQtrP2) === (0)) ? 1 : 0)) && (bPPQStartP2)) ? 1 : 0)) {
            uDeltaOldP2 = ((2) & 0xff);
        }
        let MIRROR = (((((uPPQtrP2) >>> (0)) & 1)) ? 1 : 0);
        if ((((((bVoicedP2) ? 0 : 1)) || (((MIRROR) ? 0 : 1))) ? 1 : 0)) {
            uIncrementP2.set((((__mame_table_0[(((((((uDelta) * (4))) + (uDeltaOldP2))) % 16) + 16) % 16] ?? 0)) & 0xff));
            bAddP2.set((((((uDelta) >= (2)) ? 1 : 0)) ? 1 : 0));
        }
        else {
            uIncrementP2.set((((__mame_table_0[(((((((uDeltaOldP2) * (4))) + (uDelta))) % 16) + 16) % 16] ?? 0)) & 0xff));
            bAddP2.set((((((uDeltaOldP2) < (2)) ? 1 : 0)) ? 1 : 0));
        }
        uDeltaOldP1.set(((uDelta) & 0xff));
        if (((((((bVoicedP2) && (bPPQStartP2)) ? 1 : 0)) && (MIRROR)) ? 1 : 0)) {
            uIncrementP2.set(((0) & 0xff));
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "sound_stream_update": method_sound_stream_update,
        "Clock": method_Clock,
        "ReadMem": method_ReadMem,
        "Mux8To2": method_Mux8To2,
        "CalculateOutput": method_CalculateOutput,
        "romen_r": method_romen_r,
        "busy_r": method_busy_r,
        "data_w": method_data_w,
        "start_w": method_start_w,
        "bsy": method_bsy,
        "device_clock_changed": method_device_clock_changed,
        "rom_bank_pre_change": method_rom_bank_pre_change,
        "s14001a_device::bsy": method_s14001a_device__bsy,
        "s14001a_device::device_clock_changed": method_s14001a_device__device_clock_changed,
        "s14001a_device::rom_bank_pre_change": method_s14001a_device__rom_bank_pre_change
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "clock", "m_bsy_handler", "machine", "machine().sample_rate", "read_byte", "save_item", "stream_alloc"];
export const device = definition;
export default device;
