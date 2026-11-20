import deviceData from './mos6581.device.ir.json' with { type: 'json' };
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
    const cppScratch_syncEm_sync = new Uint8Array(Math.max(0, Number(3)));
    function method_syncEm(runtime) {
        const members = runtime.members;
        const h_optr = members.optr ?? 0;
        let sync = cppScratch_syncEm_sync.fill(0);
        for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            sync[v] = (((__deref_syncEm(runtime, h_optr[v].modulator).cycleLenCount) <= (0)) ? 1 : 0);
            h_optr[v].cycleLenCount = ((((h_optr[v].cycleLenCount) - (1))) | 0);
        }
        for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            if ((((h_optr[v].sync) && ((sync[v] ?? 0))) ? 1 : 0)) {
                h_optr[v].cycleLenCount = ((0) | 0);
                h_optr[v].outProc = method_sidOperator_wave_calc_normal.bind(undefined, runtime);
                h_optr[v].waveStep = (((h_optr[v].waveStepPnt = ((0) >>> 0))) & 0xffff);
            }
        }
    }
    function __deref_syncEm(runtime, p) {
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
    function method_fill_buffer(runtime, stream) {
        const members = runtime.members;
        let __t0;
        const h_optr = members.optr ?? 0;
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_fill_buffer(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            (__deref_fill_buffer(runtime, stream).put?.(0, sampindex, method_mix_mono(runtime, __add_fill_buffer(runtime, __add_fill_buffer(runtime, __add_fill_buffer(runtime, __deref_fill_buffer(runtime, h_optr[0].outProc)(__addr_fill_buffer(runtime, h_optr, 0)), __deref_fill_buffer(runtime, h_optr[1].outProc)(__addr_fill_buffer(runtime, h_optr, 1))), ((__deref_fill_buffer(runtime, h_optr[2].outProc)(__addr_fill_buffer(runtime, h_optr, 2))) & ((members.optr3_outputmask ?? 0)))), (((members.masterVolume ?? 0)) << (2))))) ?? 0);
            method_syncEm(runtime);
        }
    }
    function __add_fill_buffer(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_fill_buffer(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_fill_buffer(runtime, p) {
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
    function method_mix_mono(runtime, usum) {
        const members = runtime.members;
        usum = ((usum) & 0xffff);
        return ((((((usum) - (512))) << 16 >> 16)) * (((1) / (1024))));
    }
    function method_reset(runtime) {
        const members = runtime.members;
        const h_optr = members.optr ?? 0;
        const h_filter = members.filter ?? 0;
        for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            method_sidOperator_clear(runtime, __addr_reset(runtime, h_optr, v));
            method_enveEmuResetOperator(runtime, __addr_reset(runtime, h_optr, v));
        }
        members.optr3_outputmask = ((-1) | 0);
        h_filter.Type = (((h_filter.CurType = ((0) & 0xff))) & 0xff);
        h_filter.Value = ((0) & 0xffff);
        h_filter.Dy = (h_filter.ResDy = 0);
        for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            method_sidOperator_set(runtime, __addr_reset(runtime, h_optr, v));
            method_sidOperator_set2(runtime, __addr_reset(runtime, h_optr, v));
        }
        return 1;
    }
    function __addr_reset(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_sidOperator_clear(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = __deref_sidOperator_clear(runtime, voice);
        __pointee_voice.SIDfreq = ((0) >>> 0);
        __pointee_voice.SIDctrl = ((0) & 0xff);
        __pointee_voice.SIDAD = ((0) & 0xff);
        __pointee_voice.SIDSR = ((0) & 0xff);
        __pointee_voice.sync = ((0) | 0);
        __pointee_voice.pulseIndex = (((__pointee_voice.newPulseIndex = (((__pointee_voice.SIDpulseWidth = ((0) & 0xffff))) & 0xffff))) & 0xffff);
        __pointee_voice.curSIDfreq = (((__pointee_voice.curNoiseFreq = ((0) & 0xffff))) & 0xffff);
        __pointee_voice.output = (((__pointee_voice.noiseOutput = ((0) & 0xff))) & 0xff);
        __pointee_voice.filtIO = ((0) << 24 >> 24);
        __pointee_voice.filtEnabled = ((0) | 0);
        __pointee_voice.filtLow = (__pointee_voice.filtRef = 0);
        __pointee_voice.cycleLenCount = ((0) | 0);
        __pointee_voice.cycleLen = (((__pointee_voice.cycleLenPnt = ((0) & 0xffff))) & 0xffff);
        __pointee_voice.cycleAddLenPnt = ((0) >>> 0);
        __pointee_voice.outProc = method_waveCalcMute.bind(undefined, runtime);
        __pointee_voice.waveStepAdd = (((__pointee_voice.waveStepAddPnt = ((0) >>> 0))) & 0xffff);
        __pointee_voice.waveStep = (((__pointee_voice.waveStepPnt = ((0) >>> 0))) & 0xffff);
        runtime.readIndex(__pointee_voice.wavePre, 0).len = ((0) & 0xffff);
        runtime.readIndex(__pointee_voice.wavePre, 0).stp = (((runtime.readIndex(__pointee_voice.wavePre, 0).pnt = ((0) >>> 0))) << 16 >> 16);
        runtime.readIndex(__pointee_voice.wavePre, 1).len = ((0) & 0xffff);
        runtime.readIndex(__pointee_voice.wavePre, 1).stp = (((runtime.readIndex(__pointee_voice.wavePre, 1).pnt = ((0) >>> 0))) << 16 >> 16);
        __pointee_voice.waveStepOld = ((0) & 0xffff);
        __pointee_voice.noiseReg = ((8388600) >>> 0);
        __pointee_voice.noiseStepAdd = (((__pointee_voice.noiseStep = ((0) >>> 0))) >>> 0);
        __pointee_voice.noiseIsLocked = ((0) | 0);
    }
    function __deref_sidOperator_clear(runtime, p) {
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
    function method_enveEmuResetOperator(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuResetOperator(runtime, pVoice);
        __pointee_pVoice.ADSRctrl = ((14) & 0xff);
        __pointee_pVoice.enveStep = (((__pointee_pVoice.enveStepPnt = ((0) >>> 0))) & 0xffff);
        __pointee_pVoice.enveStepAdd = (((__pointee_pVoice.enveStepAddPnt = ((0) >>> 0))) & 0xffff);
        __pointee_pVoice.enveSusVol = ((0) & 0xff);
        __pointee_pVoice.enveVol = ((0) & 0xff);
        __pointee_pVoice.enveShortAttackCount = ((0) & 0xffff);
    }
    function __deref_enveEmuResetOperator(runtime, p) {
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
    function method_sidOperator_set(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = __deref_sidOperator_set(runtime, voice);
        const h_masterVolumeLevels = members.masterVolumeLevels ?? 0;
        const h_enveModeTable = members.enveModeTable ?? 0;
        __pointee_voice.SIDfreq = ((((__pointee_voice.reg[0]) | (((__pointee_voice.reg[1]) << (8))))) >>> 0);
        __pointee_voice.SIDpulseWidth = ((((((__pointee_voice.reg[2]) | (((__pointee_voice.reg[3]) << (8))))) & (4095))) & 0xffff);
        __pointee_voice.newPulseIndex = ((((4096) - (__pointee_voice.SIDpulseWidth))) & 0xffff);
        if ((((((Number(((__pointee_voice.waveStep) + (__pointee_voice.pulseIndex))) >= Number(4096)) ? 1 : 0)) && (((Number(((__pointee_voice.waveStep) + (__pointee_voice.newPulseIndex))) >= Number(4096)) ? 1 : 0))) ? 1 : 0)) {
            __pointee_voice.pulseIndex = ((__pointee_voice.newPulseIndex) & 0xffff);
        }
        else {
            if ((((((Number(((__pointee_voice.waveStep) + (__pointee_voice.pulseIndex))) < Number(4096)) ? 1 : 0)) && (((Number(((__pointee_voice.waveStep) + (__pointee_voice.newPulseIndex))) < Number(4096)) ? 1 : 0))) ? 1 : 0)) {
                __pointee_voice.pulseIndex = ((__pointee_voice.newPulseIndex) & 0xffff);
            }
        }
        let oldWave = ((__pointee_voice.SIDctrl) & 0xff);
        let newWave = ((((__pointee_voice.reg[4]) | (((__pointee_voice.reg[5]) << (8))))) & 0xff);
        let enveTemp = ((__pointee_voice.ADSRctrl) & 0xff);
        __pointee_voice.SIDctrl = ((newWave) & 0xff);
        if (((((newWave) & (1))) ? 0 : 1)) {
            if (((oldWave) & (1))) {
                enveTemp = ((2) & 0xff);
            }
        }
        else {
            if (((((oldWave) & (1))) ? 0 : 1)) {
                enveTemp = ((0) & 0xff);
            }
        }
        if (((((oldWave) ^ (newWave))) & (240))) {
            __pointee_voice.cycleLenCount = ((0) | 0);
        }
        let ADtemp = ((__pointee_voice.reg[5]) & 0xff);
        let SRtemp = ((__pointee_voice.reg[6]) & 0xff);
        if ((((__pointee_voice.SIDAD) !== (ADtemp)) ? 1 : 0)) {
            enveTemp = ((((enveTemp) | (32))) & 0xff);
        }
        else {
            if ((((__pointee_voice.SIDSR) !== (SRtemp)) ? 1 : 0)) {
                enveTemp = ((((enveTemp) | (32))) & 0xff);
            }
        }
        __pointee_voice.SIDAD = ((ADtemp) & 0xff);
        __pointee_voice.SIDSR = ((SRtemp) & 0xff);
        let tmpSusVol = ((h_masterVolumeLevels[((SRtemp) >>> (4))]) & 0xff);
        if (((Number(__pointee_voice.ADSRctrl) !== Number(8)) ? 1 : 0)) {
            __pointee_voice.enveSusVol = ((tmpSusVol) & 0xff);
        }
        else {
            if ((((__pointee_voice.enveSusVol) > (__pointee_voice.enveVol)) ? 1 : 0)) {
                __pointee_voice.enveSusVol = ((0) & 0xff);
            }
            else {
                __pointee_voice.enveSusVol = ((tmpSusVol) & 0xff);
            }
        }
        __pointee_voice.ADSRproc = h_enveModeTable[((enveTemp) >>> (1))];
        __pointee_voice.ADSRctrl = ((((enveTemp) & (222))) & 0xff);
        __pointee_voice.filtEnabled = (((((__deref_sidOperator_set(runtime, __pointee_voice.sid).filter.Enabled) && (((__deref_sidOperator_set(runtime, __pointee_voice.sid).reg[23]) & (__pointee_voice.filtVoiceMask)))) ? 1 : 0)) | 0);
    }
    function __deref_sidOperator_set(runtime, p) {
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
    function method_sidOperator_set2(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = __deref_sidOperator_set2(runtime, voice);
        const h_sidModeNormalTable = members.sidModeNormalTable ?? 0;
        const h_sidModeRingTable = members.sidModeRingTable ?? 0;
        __pointee_voice.outProc = method_sidOperator_wave_calc_normal.bind(undefined, runtime);
        __pointee_voice.sync = ((0) | 0);
        if (((((((__pointee_voice.SIDfreq) < (16)) ? 1 : 0)) || (((__pointee_voice.SIDctrl) & (8)))) ? 1 : 0)) {
            __pointee_voice.outProc = method_waveCalcMute.bind(undefined, runtime);
            if ((((__pointee_voice.SIDfreq) === (0)) ? 1 : 0)) {
                __pointee_voice.cycleLen = (((__pointee_voice.cycleLenPnt = ((0) & 0xffff))) & 0xffff);
                __pointee_voice.cycleAddLenPnt = ((0) >>> 0);
                __pointee_voice.waveStep = ((0) & 0xffff);
                __pointee_voice.waveStepPnt = ((0) >>> 0);
                __pointee_voice.curSIDfreq = (((__pointee_voice.curNoiseFreq = ((0) & 0xffff))) & 0xffff);
                __pointee_voice.noiseStepAdd = ((0) >>> 0);
                __pointee_voice.cycleLenCount = ((0) | 0);
            }
            if (((__pointee_voice.SIDctrl) & (8))) {
                if (__pointee_voice.noiseIsLocked) {
                    __pointee_voice.noiseIsLocked = ((0) | 0);
                    __pointee_voice.noiseReg = ((8388600) >>> 0);
                }
            }
        }
        else {
            if ((((__pointee_voice.curSIDfreq) !== (__pointee_voice.SIDfreq)) ? 1 : 0)) {
                __pointee_voice.curSIDfreq = ((__pointee_voice.SIDfreq) & 0xffff);
                __pointee_voice.cycleLen = ((runtime.divide(__deref_sidOperator_set2(runtime, __pointee_voice.sid).PCMsid, __pointee_voice.SIDfreq)) & 0xffff);
                __pointee_voice.cycleLenPnt = ((runtime.divide(((((__deref_sidOperator_set2(runtime, __pointee_voice.sid).PCMsid) % (__pointee_voice.SIDfreq))) * (65536)), __pointee_voice.SIDfreq)) & 0xffff);
                if ((((__pointee_voice.cycleLenCount) > (0)) ? 1 : 0)) {
                    method_sidOperator_wave_calc_cycle_len(runtime, voice);
                    __pointee_voice.outProc = method_waveCalcRangeCheck.bind(undefined, runtime);
                }
            }
            if ((((((__pointee_voice.SIDctrl) & (128))) && ((((__pointee_voice.curNoiseFreq) !== (__pointee_voice.SIDfreq)) ? 1 : 0))) ? 1 : 0)) {
                __pointee_voice.curNoiseFreq = ((__pointee_voice.SIDfreq) & 0xffff);
                __pointee_voice.noiseStepAdd = ((runtime.shiftRight(((__deref_sidOperator_set2(runtime, __pointee_voice.sid).PCMsidNoise) * (__pointee_voice.SIDfreq)), 8)) >>> 0);
                if (((Number(__pointee_voice.noiseStepAdd) >= Number(2097152)) ? 1 : 0)) {
                    h_sidModeNormalTable[8] = method_sidMode80hp.bind(undefined, runtime);
                }
                else {
                    h_sidModeNormalTable[8] = method_sidMode80.bind(undefined, runtime);
                }
            }
            if (((__pointee_voice.SIDctrl) & (2))) {
                if ((((((__deref_sidOperator_set2(runtime, __pointee_voice.modulator).SIDfreq) ? 0 : 1)) || (((__deref_sidOperator_set2(runtime, __pointee_voice.modulator).SIDctrl) & (8)))) ? 1 : 0)) {
                }
                else {
                    if ((((((__deref_sidOperator_set2(runtime, __pointee_voice.carrier).SIDctrl) & (2))) && (((Number(__deref_sidOperator_set2(runtime, __pointee_voice.modulator).SIDfreq) >= Number(((__pointee_voice.SIDfreq) << (1)))) ? 1 : 0))) ? 1 : 0)) {
                    }
                    else {
                        __pointee_voice.sync = ((1) | 0);
                    }
                }
            }
            if ((((((Number(((__pointee_voice.SIDctrl) & (20))) === Number(20)) ? 1 : 0)) && (__deref_sidOperator_set2(runtime, __pointee_voice.modulator).SIDfreq)) ? 1 : 0)) {
                __pointee_voice.waveProc = h_sidModeRingTable[((__pointee_voice.SIDctrl) >>> (4))];
            }
            else {
                __pointee_voice.waveProc = h_sidModeNormalTable[((__pointee_voice.SIDctrl) >>> (4))];
            }
        }
    }
    function __deref_sidOperator_set2(runtime, p) {
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
    function method_sidOperator_wave_calc_cycle_len(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = __deref_sidOperator_wave_calc_cycle_len(runtime, voice);
        __pointee_voice.cycleAddLenPnt = ((((__pointee_voice.cycleAddLenPnt) + (__pointee_voice.cycleLenPnt))) >>> 0);
        __pointee_voice.cycleLenCount = ((__pointee_voice.cycleLen) | 0);
        if ((((__pointee_voice.cycleAddLenPnt) > (65535)) ? 1 : 0)) {
            __pointee_voice.cycleLenCount = ((((__pointee_voice.cycleLenCount) + (1))) | 0);
        }
        __pointee_voice.cycleAddLenPnt = ((((__pointee_voice.cycleAddLenPnt) & (65535))) >>> 0);
        let diff = ((((__pointee_voice.cycleLenCount) - (__pointee_voice.cycleLen))) & 0xffff);
        if ((((runtime.readIndex(__pointee_voice.wavePre, diff).len) !== (__pointee_voice.cycleLenCount)) ? 1 : 0)) {
            runtime.readIndex(__pointee_voice.wavePre, diff).len = ((__pointee_voice.cycleLenCount) & 0xffff);
            runtime.readIndex(__pointee_voice.wavePre, diff).stp = (((__pointee_voice.waveStepAdd = ((runtime.divide(4096, __pointee_voice.cycleLenCount)) & 0xffff))) << 16 >> 16);
            runtime.readIndex(__pointee_voice.wavePre, diff).pnt = (((__pointee_voice.waveStepAddPnt = ((runtime.divide(((((4096) % (__pointee_voice.cycleLenCount))) * (65536)), __pointee_voice.cycleLenCount)) >>> 0))) >>> 0);
        }
        else {
            __pointee_voice.waveStepAdd = ((runtime.readIndex(__pointee_voice.wavePre, diff).stp) & 0xffff);
            __pointee_voice.waveStepAddPnt = ((runtime.readIndex(__pointee_voice.wavePre, diff).pnt) >>> 0);
        }
    }
    function __deref_sidOperator_wave_calc_cycle_len(runtime, p) {
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
    function method_postload(runtime) {
        const members = runtime.members;
        const h_optr = members.optr ?? 0;
        for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            method_sidOperator_set(runtime, __addr_postload(runtime, h_optr, v));
            method_sidOperator_set2(runtime, __addr_postload(runtime, h_optr, v));
        }
    }
    function __addr_postload(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_init(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        const h_optr = members.optr ?? 0;
        const h_filter = members.filter ?? 0;
        for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            h_optr[v].sid = (members.this ?? 0);
            let mod_voi = ((((((((v) + (3))) - (1))) % (3))) & 0xff);
            h_optr[v].modulator = __addr_init(runtime, h_optr, mod_voi);
            h_optr[mod_voi].carrier = __addr_init(runtime, h_optr, v);
            h_optr[v].filtVoiceMask = ((((1) << (v))) << 24 >> 24);
        }
        members.PCMsid = (((((((members.PCMfreq ?? 0)) * (((16777216) / ((members.clock ?? 0)))))) >>> 0)) >>> 0);
        members.PCMsidNoise = (((((((((members.clock ?? 0)) * (256))) / ((members.PCMfreq ?? 0)))) >>> 0)) >>> 0);
        h_filter.Enabled = ((1) | 0);
        method_sidInitMixerEngine(runtime, (__t0 = __deref_init(runtime, (members.device ?? 0)), typeof __t0.machine === 'function' ? __t0.machine() : typeof __t0.machine === 'number' || typeof __t0.machine === 'boolean' ? __t0.machine : runtime.container((members.device ?? 0), "machine")));
        method_filterTableInit(runtime, (__t1 = __deref_init(runtime, (members.device ?? 0)), typeof __t1.machine === 'function' ? __t1.machine() : typeof __t1.machine === 'number' || typeof __t1.machine === 'boolean' ? __t1.machine : runtime.container((members.device ?? 0), "machine")));
        method_sidInitWaveformTables(runtime, (members.type ?? 0));
        method_enveEmuInit(runtime, (members.PCMfreq ?? 0), 1);
        method_reset(runtime);
    }
    function __addr_init(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_init(runtime, p) {
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
    function method_sidInitMixerEngine(runtime, machine) {
        const members = runtime.members;
        const h_ampMod1x8 = members.ampMod1x8 ?? 0;
        let filterAmpl = 0.7;
        let uk = ((0) & 0xffff);
        for (let si = ((0) | 0); (((si) < (256)) ? 1 : 0); si = ((((si) + (1))) | 0)) {
            for (let sj = ((-128) | 0); (((sj) < (128)) ? 1 : 0); sj = ((((sj) + (1))) | 0), uk = ((((uk) + (1))) & 0xffff)) {
                h_ampMod1x8[uk] = ((((runtime.divide(((si) * (sj)), 255)) * (filterAmpl))) << 24 >> 24);
            }
        }
    }
    function method_filterTableInit(runtime, machine) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["logf"], __L1 = __l["expf"];
        let __t0;
        const h_filterTable = members.filterTable ?? 0;
        const h_bandPassParam = members.bandPassParam ?? 0;
        const h_filterResTable = members.filterResTable ?? 0;
        let sample_rate = (((__t0 = __deref_filterTableInit(runtime, machine), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(machine, "sample_rate"))) | 0);
        let uk = ((0) & 0xffff);
        let filterRefFreq = 44100;
        let yMax = 1;
        let yMin = 0.01;
        let yAdd = 0;
        let yTmp = 0;
        let rk = 0;
        let rk2 = 0;
        let resDyMax = 0;
        let resDyMin = 0;
        let resDy = 0;
        uk = ((0) & 0xffff);
        for (rk = 0; (((rk) < (2048)) ? 1 : 0); rk = ((rk) + (1))) {
            h_filterTable[uk] = ((((__add_filterTableInit(runtime, (((__L1 ? __L1(((((rk) / (2048))) * ((__L0 ? __L0(400) : runtime.macro("logf", 400))))) : runtime.macro("expf", ((((rk) / (2048))) * ((__L0 ? __L0(400) : runtime.macro("logf", 400))))))) / (60)), 0.05)) * (filterRefFreq))) / (sample_rate));
            if (((Number(h_filterTable[uk]) < Number(yMin)) ? 1 : 0)) {
                h_filterTable[uk] = yMin;
            }
            if (((Number(h_filterTable[uk]) > Number(yMax)) ? 1 : 0)) {
                h_filterTable[uk] = yMax;
            }
            uk = ((((uk) + (1))) & 0xffff);
        }
        yMax = 0.22;
        yMin = 0.05;
        yAdd = ((((yMax) - (yMin))) / (2048));
        yTmp = yMin;
        uk = ((0) & 0xffff);
        for (rk2 = 0; (((rk2) < (2048)) ? 1 : 0); rk2 = ((rk2) + (1))) {
            h_bandPassParam[uk] = ((((yTmp) * (filterRefFreq))) / (sample_rate));
            yTmp = ((yTmp) + (yAdd));
            uk = ((((uk) + (1))) & 0xffff);
        }
        resDyMax = 1;
        resDyMin = 2;
        resDy = resDyMin;
        for (uk = ((0) & 0xffff); (((uk) < (16)) ? 1 : 0); uk = ((((uk) + (1))) & 0xffff)) {
            h_filterResTable[uk] = resDy;
            resDy = ((resDy) - (((((resDyMin) - (resDyMax))) / (15))));
        }
        h_filterResTable[0] = resDyMin;
        h_filterResTable[15] = resDyMax;
    }
    function __add_filterTableInit(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_filterTableInit(runtime, p) {
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
    function method_sidInitWaveformTables(runtime, type) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4;
        const h_triangleTable = members.triangleTable ?? 0;
        const h_sawtoothTable = members.sawtoothTable ?? 0;
        const h_squareTable = members.squareTable ?? 0;
        const h_waveform30_8580 = members.waveform30_8580 ?? 0;
        const h_waveform50_8580 = members.waveform50_8580 ?? 0;
        const h_waveform60_8580 = members.waveform60_8580 ?? 0;
        const h_waveform70_8580 = members.waveform70_8580 ?? 0;
        const h_waveform30_6581 = members.waveform30_6581 ?? 0;
        const h_waveform50_6581 = members.waveform50_6581 ?? 0;
        const h_waveform60_6581 = members.waveform60_6581 ?? 0;
        const h_waveform70_6581 = members.waveform70_6581 ?? 0;
        const h_sidModeNormalTable = members.sidModeNormalTable ?? 0;
        const h_sidModeRingTable = members.sidModeRingTable ?? 0;
        const h_noiseTableLSB = members.noiseTableLSB ?? 0;
        const h_noiseTableMID = members.noiseTableMID ?? 0;
        const h_noiseTableMSB = members.noiseTableMSB ?? 0;
        let i = ((0) | 0);
        let j = ((0) | 0);
        let k = ((0) & 0xffff);
        k = ((0) & 0xffff);
        for (i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            for (j = ((0) | 0); (((j) < (8)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                h_triangleTable[(__t0 = k, k = ((((k) + (1))) & 0xffff), __t0)] = i;
            }
        }
        for (i = ((255) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            for (j = ((0) | 0); (((j) < (8)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                h_triangleTable[(__t1 = k, k = ((((k) + (1))) & 0xffff), __t1)] = i;
            }
        }
        k = ((0) & 0xffff);
        for (i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            for (j = ((0) | 0); (((j) < (16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                h_sawtoothTable[(__t2 = k, k = ((((k) + (1))) & 0xffff), __t2)] = i;
            }
        }
        k = ((0) & 0xffff);
        for (i = ((0) | 0); (((i) < (4096)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_squareTable[(__t3 = k, k = ((((k) + (1))) & 0xffff), __t3)] = 255;
        }
        for (i = ((0) | 0); (((i) < (4096)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_squareTable[(__t4 = k, k = ((((k) + (1))) & 0xffff), __t4)] = 0;
        }
        if (((Number(type) === Number(1)) ? 1 : 0)) {
            members.waveform30 = h_waveform30_8580;
            members.waveform50 = h_waveform50_8580;
            members.waveform60 = h_waveform60_8580;
            members.waveform70 = h_waveform70_8580;
        }
        else {
            members.waveform30 = h_waveform30_6581;
            members.waveform50 = h_waveform50_6581;
            members.waveform60 = h_waveform60_6581;
            members.waveform70 = h_waveform70_6581;
        }
        if (((Number(type) === Number(1)) ? 1 : 0)) {
            h_sidModeNormalTable[3] = method_sidMode30.bind(undefined, runtime);
            h_sidModeNormalTable[6] = method_sidMode60.bind(undefined, runtime);
            h_sidModeNormalTable[7] = method_sidMode70.bind(undefined, runtime);
            h_sidModeRingTable[7] = method_sidMode74.bind(undefined, runtime);
        }
        else {
            h_sidModeNormalTable[3] = method_sidMode30.bind(undefined, runtime);
            h_sidModeNormalTable[6] = method_sidMode60.bind(undefined, runtime);
            h_sidModeNormalTable[7] = method_sidMode00.bind(undefined, runtime);
            h_sidModeRingTable[7] = method_sidMode00.bind(undefined, runtime);
        }
        let ni = ((0) >>> 0);
        for (ni = ((0) >>> 0); ((Number(ni) < Number(256)) ? 1 : 0); ni = ((((ni) + (1))) >>> 0)) {
            h_noiseTableLSB[ni] = ((((((((((ni) >>> (5))) & (4))) | (((((ni) >>> (3))) & (2))))) | (((((ni) >>> (2))) & (1))))) & 0xff);
        }
        for (ni = ((0) >>> 0); ((Number(ni) < Number(256)) ? 1 : 0); ni = ((((ni) + (1))) >>> 0)) {
            h_noiseTableMID[ni] = ((((((((ni) >>> (1))) & (16))) | (((((ni) << (0))) & (8))))) & 0xff);
        }
        for (ni = ((0) >>> 0); ((Number(ni) < Number(256)) ? 1 : 0); ni = ((((ni) + (1))) >>> 0)) {
            h_noiseTableMSB[ni] = ((((((((((ni) << (1))) & (128))) | (((((ni) << (2))) & (64))))) | (((((ni) << (5))) & (32))))) & 0xff);
        }
    }
    function method_enveEmuInit(runtime, updateFreq, measuredValues) {
        const members = runtime.members;
        let __t0;
        const h_releaseTab = members.releaseTab ?? 0;
        const h_releasePos = members.releasePos ?? 0;
        const h_masterVolumeLevels = members.masterVolumeLevels ?? 0;
        const h_masterAmplModTable = members.masterAmplModTable ?? 0;
        const h_attackTimes = members.attackTimes ?? 0;
        const h_attackRates = members.attackRates ?? 0;
        const h_attackRatesP = members.attackRatesP ?? 0;
        const h_decayReleaseTimes = members.decayReleaseTimes ?? 0;
        const h_decayReleaseRates = members.decayReleaseRates ?? 0;
        const h_decayReleaseRatesP = members.decayReleaseRatesP ?? 0;
        let i = ((0) >>> 0);
        let j = ((0) >>> 0);
        let k = ((0) >>> 0);
        members.releaseTabLen = ((1571) >>> 0);
        for (i = ((0) >>> 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            j = ((0) >>> 0);
            while (((((((j) < ((members.releaseTabLen ?? 0))) ? 1 : 0)) && ((((h_releaseTab[j]) > (i)) ? 1 : 0))) ? 1 : 0)) {
                j = ((((j) + (1))) >>> 0);
            }
            if ((((j) < ((members.releaseTabLen ?? 0))) ? 1 : 0)) {
                h_releasePos[i] = j;
            }
            else {
                h_releasePos[i] = (((members.releaseTabLen ?? 0)) - (1));
            }
        }
        k = ((0) >>> 0);
        for (i = ((0) >>> 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            for (j = ((0) >>> 0); (((j) < (256)) ? 1 : 0); j = ((((j) + (1))) >>> 0)) {
                let tmpVol = ((j) & 0xffff);
                if (measuredValues) {
                    tmpVol = ((((__add_enveEmuInit(runtime, ((293) * (runtime.subtract(1, Math.exp(Number(((j) / ((-130)))))))), 4)) & 0xffff)) & 0xffff);
                    if ((((j) === (0)) ? 1 : 0)) {
                        tmpVol = ((0) & 0xffff);
                    }
                    if ((((tmpVol) > (255)) ? 1 : 0)) {
                        tmpVol = ((255) & 0xffff);
                    }
                }
                h_masterAmplModTable[(__t0 = k, k = ((((k) + (1))) >>> 0), __t0)] = ((runtime.divide(((tmpVol) * (h_masterVolumeLevels[i])), 255)) << (8));
            }
        }
        for (i = ((0) >>> 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            let scaledenvelen = ((((runtime.divide(((h_attackTimes[i]) * (updateFreq)), 1000)) >>> 0)) >>> 0);
            if ((((scaledenvelen) === (0)) ? 1 : 0)) {
                scaledenvelen = ((1) >>> 0);
            }
            h_attackRates[i] = runtime.divide(255, scaledenvelen);
            h_attackRatesP[i] = runtime.divide(((((255) % (scaledenvelen))) * (65536)), scaledenvelen);
            scaledenvelen = ((((runtime.divide(((h_decayReleaseTimes[i]) * (updateFreq)), 1000)) >>> 0)) >>> 0);
            if ((((scaledenvelen) === (0)) ? 1 : 0)) {
                scaledenvelen = ((1) >>> 0);
            }
            h_decayReleaseRates[i] = runtime.divide((members.releaseTabLen ?? 0), scaledenvelen);
            h_decayReleaseRatesP[i] = runtime.divide((((((members.releaseTabLen ?? 0)) % (scaledenvelen))) * (65536)), scaledenvelen);
        }
    }
    function __add_enveEmuInit(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_port_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0, __t1;
        const h_reg = members.reg ?? 0;
        const h_optr = members.optr ?? 0;
        const h_filter = members.filter ?? 0;
        const h_bandPassParam = members.bandPassParam ?? 0;
        const h_filterTable = members.filterTable ?? 0;
        const h_filterResTable = members.filterResTable ?? 0;
        offset = ((((offset) & (31))) | 0);
        switch (offset) {
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
                {
                    break;
                }
            case 21:
            case 22:
            case 23:
            case 24:
                {
                    (__t0 = __deref_port_w(runtime, (members.mixer_channel ?? 0)), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container((members.mixer_channel ?? 0), "update"));
                    h_reg[offset] = data;
                    members.masterVolume = ((((h_reg[24]) & (15))) & 0xff);
                    members.masterVolumeAmplIndex = (((((members.masterVolume ?? 0)) << (8))) & 0xffff);
                    if ((((((h_reg[24]) & (128))) && (((((h_reg[23]) & (h_optr[2].filtVoiceMask))) ? 0 : 1))) ? 1 : 0)) {
                        members.optr3_outputmask = ((0) | 0);
                    }
                    else {
                        members.optr3_outputmask = ((-1) | 0);
                    }
                    h_filter.Type = ((((h_reg[24]) & (112))) & 0xff);
                    if ((((h_filter.Type) !== (h_filter.CurType)) ? 1 : 0)) {
                        h_filter.CurType = ((h_filter.Type) & 0xff);
                        for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
                            h_optr[v].filtLow = (h_optr[v].filtRef = 0);
                        }
                    }
                    if (h_filter.Enabled) {
                        h_filter.Value = ((((2047) & (((((h_reg[21]) & (7))) | (((((h_reg[22]) & 0xffff)) << (3))))))) & 0xffff);
                        if ((((h_filter.Type) === (32)) ? 1 : 0)) {
                            h_filter.Dy = ((h_bandPassParam) ? (h_bandPassParam[h_filter.Value]) : (0));
                        }
                        else {
                            h_filter.Dy = ((h_filterTable) ? (h_filterTable[h_filter.Value]) : (0));
                        }
                        h_filter.ResDy = ((h_filterResTable[runtime.shiftRight(h_reg[23], 4)]) - (h_filter.Dy));
                        if ((((h_filter.ResDy) < (1)) ? 1 : 0)) {
                            h_filter.ResDy = 1;
                        }
                    }
                    for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
                        method_sidOperator_set(runtime, __addr_port_w(runtime, h_optr, v));
                        method_sidOperator_set2(runtime, __addr_port_w(runtime, h_optr, v));
                    }
                    break;
                }
            default:
                {
                    (__t1 = __deref_port_w(runtime, (members.mixer_channel ?? 0)), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container((members.mixer_channel ?? 0), "update"));
                    h_reg[offset] = data;
                    if ((((offset) < (7)) ? 1 : 0)) {
                        h_optr[0].reg[offset] = data;
                    }
                    else {
                        if ((((offset) < (14)) ? 1 : 0)) {
                            h_optr[1].reg[((offset) - (7))] = data;
                        }
                        else {
                            if ((((offset) < (21)) ? 1 : 0)) {
                                h_optr[2].reg[((offset) - (14))] = data;
                            }
                        }
                    }
                    for (let v = ((0) | 0); (((v) < (3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
                        method_sidOperator_set(runtime, __addr_port_w(runtime, h_optr, v));
                        method_sidOperator_set2(runtime, __addr_port_w(runtime, h_optr, v));
                    }
                    break;
                }
        }
    }
    function __addr_port_w(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_port_w(runtime, p) {
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
    function method_port_r(runtime, machine, offset) {
        const members = runtime.members;
        let __t0, __t1;
        const h_optr = members.optr ?? 0;
        const h_reg = members.reg ?? 0;
        let data = ((0) | 0);
        offset = ((((offset) & (31))) | 0);
        switch (offset) {
            case 29:
            case 30:
            case 31:
                {
                    data = ((255) | 0);
                    break;
                }
            case 27:
                {
                    (__t0 = __deref_port_r(runtime, (members.mixer_channel ?? 0)), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container((members.mixer_channel ?? 0), "update"));
                    data = ((h_optr[2].output) | 0);
                    break;
                }
            case 28:
                {
                    (__t1 = __deref_port_r(runtime, (members.mixer_channel ?? 0)), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container((members.mixer_channel ?? 0), "update"));
                    data = ((h_optr[2].enveVol) | 0);
                    break;
                }
            default:
                {
                    data = ((h_reg[offset]) | 0);
                }
        }
        return data;
    }
    function __deref_port_r(runtime, p) {
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
    function method_sidOperator_wave_calc_normal(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidOperator_wave_calc_normal(runtime, pVoice);
        const h_ampMod1x8 = members.ampMod1x8 ?? 0;
        if ((((__pointee_pVoice.cycleLenCount) <= (0)) ? 1 : 0)) {
            method_sidOperator_wave_calc_cycle_len(runtime, pVoice);
            if (((__pointee_pVoice.SIDctrl) & (64))) {
                __pointee_pVoice.pulseIndex = ((__pointee_pVoice.newPulseIndex) & 0xffff);
                if ((((__pointee_pVoice.pulseIndex) > (2048)) ? 1 : 0)) {
                    __pointee_pVoice.waveStep = ((0) & 0xffff);
                }
            }
        }
        __deref_sidOperator_wave_calc_normal(runtime, __pointee_pVoice.waveProc)(pVoice);
        __pointee_pVoice.filtIO = ((h_ampMod1x8[((__deref_sidOperator_wave_calc_normal(runtime, __pointee_pVoice.ADSRproc)(pVoice)) | (__pointee_pVoice.output))]) << 24 >> 24);
        method_waveCalcFilter(runtime, pVoice);
        return __pointee_pVoice.filtIO;
    }
    function __deref_sidOperator_wave_calc_normal(runtime, p) {
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
    function method_waveCalcFilter(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_waveCalcFilter(runtime, pVoice);
        if (__pointee_pVoice.filtEnabled) {
            if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) !== (0)) ? 1 : 0)) {
                if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) === (32)) ? 1 : 0)) {
                    let tmp = 0;
                    __pointee_pVoice.filtLow = ((__pointee_pVoice.filtLow) + (((__pointee_pVoice.filtRef) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Dy))));
                    tmp = ((__pointee_pVoice.filtIO) - (__pointee_pVoice.filtLow));
                    tmp = ((tmp) - (((__pointee_pVoice.filtRef) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.ResDy))));
                    __pointee_pVoice.filtRef = ((__pointee_pVoice.filtRef) + (((tmp) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Dy))));
                    __pointee_pVoice.filtIO = ((((((__pointee_pVoice.filtRef) - (runtime.divide(__pointee_pVoice.filtLow, 4)))) << 24 >> 24)) << 24 >> 24);
                }
                else {
                    if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) === (64)) ? 1 : 0)) {
                        let tmp = 0;
                        let tmp2 = 0;
                        __pointee_pVoice.filtLow = ((__pointee_pVoice.filtLow) + (((((__pointee_pVoice.filtRef) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Dy))) * (0.1))));
                        tmp = ((__pointee_pVoice.filtIO) - (__pointee_pVoice.filtLow));
                        tmp = ((tmp) - (((__pointee_pVoice.filtRef) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.ResDy))));
                        __pointee_pVoice.filtRef = ((__pointee_pVoice.filtRef) + (((tmp) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Dy))));
                        tmp2 = ((__pointee_pVoice.filtRef) - (runtime.divide(__pointee_pVoice.filtIO, 8)));
                        if (((Number(tmp2) < Number(-128)) ? 1 : 0)) {
                            tmp2 = -128;
                        }
                        if ((((tmp2) > (127)) ? 1 : 0)) {
                            tmp2 = 127;
                        }
                        __pointee_pVoice.filtIO = ((((tmp2) << 24 >> 24)) << 24 >> 24);
                    }
                    else {
                        let sample = 0;
                        let sample2 = 0;
                        let tmp = ((0) | 0);
                        __pointee_pVoice.filtLow = ((__pointee_pVoice.filtLow) + (((__pointee_pVoice.filtRef) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Dy))));
                        sample = __pointee_pVoice.filtIO;
                        sample2 = ((sample) - (__pointee_pVoice.filtLow));
                        tmp = ((((sample2) | 0)) | 0);
                        sample2 = ((sample2) - (((__pointee_pVoice.filtRef) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.ResDy))));
                        __pointee_pVoice.filtRef = ((__pointee_pVoice.filtRef) + (((sample2) * (__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Dy))));
                        if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) === (16)) ? 1 : 0)) {
                            __pointee_pVoice.filtIO = ((((__pointee_pVoice.filtLow) << 24 >> 24)) << 24 >> 24);
                        }
                        else {
                            if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) === (48)) ? 1 : 0)) {
                                __pointee_pVoice.filtIO = ((((__pointee_pVoice.filtLow) << 24 >> 24)) << 24 >> 24);
                            }
                            else {
                                if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) === (80)) ? 1 : 0)) {
                                    __pointee_pVoice.filtIO = ((((((sample) - (runtime.shiftRight(tmp, 1)))) << 24 >> 24)) << 24 >> 24);
                                }
                                else {
                                    if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) === (96)) ? 1 : 0)) {
                                        __pointee_pVoice.filtIO = ((((tmp) << 24 >> 24)) << 24 >> 24);
                                    }
                                    else {
                                        if ((((__deref_waveCalcFilter(runtime, __pointee_pVoice.sid).filter.Type) === (112)) ? 1 : 0)) {
                                            __pointee_pVoice.filtIO = ((((((sample) - (runtime.shiftRight(tmp, 1)))) << 24 >> 24)) << 24 >> 24);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                __pointee_pVoice.filtIO = ((0) << 24 >> 24);
            }
        }
    }
    function __deref_waveCalcFilter(runtime, p) {
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
    function method_waveAdvance(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_waveAdvance(runtime, pVoice);
        __pointee_pVoice.waveStepPnt = ((((__pointee_pVoice.waveStepPnt) + (__pointee_pVoice.waveStepAddPnt))) >>> 0);
        __pointee_pVoice.waveStep = ((((__pointee_pVoice.waveStep) + (__pointee_pVoice.waveStepAdd))) & 0xffff);
        if ((((__pointee_pVoice.waveStepPnt) > (65535)) ? 1 : 0)) {
            __pointee_pVoice.waveStep = ((((__pointee_pVoice.waveStep) + (1))) & 0xffff);
        }
        __pointee_pVoice.waveStepPnt = ((((__pointee_pVoice.waveStepPnt) & (65535))) >>> 0);
        __pointee_pVoice.waveStep = ((((__pointee_pVoice.waveStep) & (4095))) & 0xffff);
    }
    function __deref_waveAdvance(runtime, p) {
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
    function method_noiseAdvance(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_noiseAdvance(runtime, pVoice);
        const h_noiseTableLSB = members.noiseTableLSB ?? 0;
        const h_noiseTableMID = members.noiseTableMID ?? 0;
        const h_noiseTableMSB = members.noiseTableMSB ?? 0;
        __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) + (__pointee_pVoice.noiseStepAdd))) >>> 0);
        if (((Number(__pointee_pVoice.noiseStep) >= Number(1048576)) ? 1 : 0)) {
            __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) - (1048576))) >>> 0);
            __pointee_pVoice.noiseReg = ((((((__pointee_pVoice.noiseReg) << (1))) | (((((((__pointee_pVoice.noiseReg) >>> (22))) ^ (((__pointee_pVoice.noiseReg) >>> (17))))) & (1))))) >>> 0);
            __pointee_pVoice.noiseOutput = ((((((h_noiseTableLSB[((__pointee_pVoice.noiseReg) & (255))]) | (h_noiseTableMID[((((__pointee_pVoice.noiseReg) >>> (8))) & (255))]))) | (h_noiseTableMSB[((((__pointee_pVoice.noiseReg) >>> (16))) & (255))]))) & 0xff);
        }
    }
    function __deref_noiseAdvance(runtime, p) {
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
    function method_noiseAdvanceHp(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_noiseAdvanceHp(runtime, pVoice);
        const h_noiseTableLSB = members.noiseTableLSB ?? 0;
        const h_noiseTableMID = members.noiseTableMID ?? 0;
        const h_noiseTableMSB = members.noiseTableMSB ?? 0;
        let tmp = ((__pointee_pVoice.noiseStepAdd) >>> 0);
        while (((Number(tmp) >= Number(1048576)) ? 1 : 0)) {
            tmp = ((((tmp) - (1048576))) >>> 0);
            __pointee_pVoice.noiseReg = ((((((__pointee_pVoice.noiseReg) << (1))) | (((((((__pointee_pVoice.noiseReg) >>> (22))) ^ (((__pointee_pVoice.noiseReg) >>> (17))))) & (1))))) >>> 0);
        }
        __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) + (tmp))) >>> 0);
        if (((Number(__pointee_pVoice.noiseStep) >= Number(1048576)) ? 1 : 0)) {
            __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) - (1048576))) >>> 0);
            __pointee_pVoice.noiseReg = ((((((__pointee_pVoice.noiseReg) << (1))) | (((((((__pointee_pVoice.noiseReg) >>> (22))) ^ (((__pointee_pVoice.noiseReg) >>> (17))))) & (1))))) >>> 0);
        }
        __pointee_pVoice.noiseOutput = ((((((h_noiseTableLSB[((__pointee_pVoice.noiseReg) & (255))]) | (h_noiseTableMID[((((__pointee_pVoice.noiseReg) >>> (8))) & (255))]))) | (h_noiseTableMSB[((((__pointee_pVoice.noiseReg) >>> (16))) & (255))]))) & 0xff);
    }
    function __deref_noiseAdvanceHp(runtime, p) {
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
    function method_sidMode00(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode00(runtime, pVoice);
        __pointee_pVoice.output = ((((__pointee_pVoice.filtIO) - (128))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode00(runtime, p) {
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
    function method_sidMode10(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode10(runtime, pVoice);
        const h_triangleTable = members.triangleTable ?? 0;
        __pointee_pVoice.output = ((h_triangleTable[__pointee_pVoice.waveStep]) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode10(runtime, p) {
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
    function method_sidMode20(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode20(runtime, pVoice);
        const h_sawtoothTable = members.sawtoothTable ?? 0;
        __pointee_pVoice.output = ((h_sawtoothTable[__pointee_pVoice.waveStep]) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode20(runtime, p) {
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
    function method_sidMode30(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode30(runtime, pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform30 ?? 0), __pointee_pVoice.waveStep)) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode30(runtime, p) {
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
    function method_sidMode40(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode40(runtime, pVoice);
        const h_squareTable = members.squareTable ?? 0;
        __pointee_pVoice.output = ((h_squareTable[((__pointee_pVoice.waveStep) + (__pointee_pVoice.pulseIndex))]) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode40(runtime, p) {
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
    function method_sidMode50(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode50(runtime, pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform50 ?? 0), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode50(runtime, p) {
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
    function method_sidMode60(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode60(runtime, pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform60 ?? 0), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode60(runtime, p) {
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
    function method_sidMode70(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode70(runtime, pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform70 ?? 0), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode70(runtime, p) {
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
    function method_sidMode80(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode80(runtime, pVoice);
        __pointee_pVoice.output = ((__pointee_pVoice.noiseOutput) & 0xff);
        method_waveAdvance(runtime, pVoice);
        method_noiseAdvance(runtime, pVoice);
    }
    function __deref_sidMode80(runtime, p) {
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
    function method_sidMode80hp(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode80hp(runtime, pVoice);
        __pointee_pVoice.output = ((__pointee_pVoice.noiseOutput) & 0xff);
        method_waveAdvance(runtime, pVoice);
        method_noiseAdvanceHp(runtime, pVoice);
    }
    function __deref_sidMode80hp(runtime, p) {
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
    function method_sidModeLock(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidModeLock(runtime, pVoice);
        __pointee_pVoice.noiseIsLocked = ((1) | 0);
        __pointee_pVoice.output = ((((__pointee_pVoice.filtIO) - (128))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidModeLock(runtime, p) {
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
    function method_sidMode14(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode14(runtime, pVoice);
        const h_triangleTable = members.triangleTable ?? 0;
        if ((((__deref_sidMode14(runtime, __pointee_pVoice.modulator).waveStep) < (2048)) ? 1 : 0)) {
            __pointee_pVoice.output = ((h_triangleTable[__pointee_pVoice.waveStep]) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ (h_triangleTable[__pointee_pVoice.waveStep]))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode14(runtime, p) {
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
    function method_sidMode34(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode34(runtime, pVoice);
        if ((((__deref_sidMode34(runtime, __pointee_pVoice.modulator).waveStep) < (2048)) ? 1 : 0)) {
            __pointee_pVoice.output = ((runtime.readIndex((members.waveform30 ?? 0), __pointee_pVoice.waveStep)) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ (runtime.readIndex((members.waveform30 ?? 0), __pointee_pVoice.waveStep)))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode34(runtime, p) {
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
    function method_sidMode54(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode54(runtime, pVoice);
        if ((((__deref_sidMode54(runtime, __pointee_pVoice.modulator).waveStep) < (2048)) ? 1 : 0)) {
            __pointee_pVoice.output = ((runtime.readIndex((members.waveform50 ?? 0), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ (runtime.readIndex((members.waveform50 ?? 0), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode54(runtime, p) {
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
    function method_sidMode74(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_sidMode74(runtime, pVoice);
        if ((((__deref_sidMode74(runtime, __pointee_pVoice.modulator).waveStep) < (2048)) ? 1 : 0)) {
            __pointee_pVoice.output = ((runtime.readIndex((members.waveform70 ?? 0), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ (runtime.readIndex((members.waveform70 ?? 0), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function __deref_sidMode74(runtime, p) {
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
    function method_waveCalcMute(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_waveCalcMute(runtime, pVoice);
        __deref_waveCalcMute(runtime, __pointee_pVoice.ADSRproc)(pVoice);
        return __pointee_pVoice.filtIO;
    }
    function __deref_waveCalcMute(runtime, p) {
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
    function method_waveCalcRangeCheck(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_waveCalcRangeCheck(runtime, pVoice);
        const h_ampMod1x8 = members.ampMod1x8 ?? 0;
        __pointee_pVoice.waveStepOld = ((__pointee_pVoice.waveStep) & 0xffff);
        __deref_waveCalcRangeCheck(runtime, __pointee_pVoice.waveProc)(pVoice);
        if ((((__pointee_pVoice.waveStep) < (__pointee_pVoice.waveStepOld)) ? 1 : 0)) {
            __pointee_pVoice.cycleLenCount = ((0) | 0);
            __pointee_pVoice.outProc = method_sidOperator_wave_calc_normal.bind(undefined, runtime);
            __pointee_pVoice.waveStep = ((4095) & 0xffff);
        }
        __pointee_pVoice.filtIO = ((h_ampMod1x8[((__deref_waveCalcRangeCheck(runtime, __pointee_pVoice.ADSRproc)(pVoice)) | (__pointee_pVoice.output))]) << 24 >> 24);
        method_waveCalcFilter(runtime, pVoice);
        return __pointee_pVoice.filtIO;
    }
    function __deref_waveCalcRangeCheck(runtime, p) {
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
    function method_enveEmuEnveAdvance(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuEnveAdvance(runtime, pVoice);
        __pointee_pVoice.enveStepPnt = ((((__pointee_pVoice.enveStepPnt) + (__pointee_pVoice.enveStepAddPnt))) >>> 0);
        __pointee_pVoice.enveStep = ((((__pointee_pVoice.enveStep) + (((__pointee_pVoice.enveStepAdd) + ((((__pointee_pVoice.enveStepPnt) > (65535)) ? 1 : 0)))))) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((((__pointee_pVoice.enveStepPnt) & (65535))) >>> 0);
    }
    function __deref_enveEmuEnveAdvance(runtime, p) {
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
    function method_enveEmuMute(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuMute(runtime, pVoice);
        return 0;
    }
    function __deref_enveEmuMute(runtime, p) {
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
    function method_enveEmuRelease(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuRelease(runtime, pVoice);
        const h_releaseTab = members.releaseTab ?? 0;
        const h_masterAmplModTable = members.masterAmplModTable ?? 0;
        if ((((__pointee_pVoice.enveStep) >= ((members.releaseTabLen ?? 0))) ? 1 : 0)) {
            __pointee_pVoice.enveVol = ((h_releaseTab[(((members.releaseTabLen ?? 0)) - (1))]) & 0xff);
            return h_masterAmplModTable[((__deref_enveEmuRelease(runtime, __pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
        }
        else {
            __pointee_pVoice.enveVol = ((h_releaseTab[__pointee_pVoice.enveStep]) & 0xff);
            method_enveEmuEnveAdvance(runtime, pVoice);
            return h_masterAmplModTable[((__deref_enveEmuRelease(runtime, __pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
        }
    }
    function __deref_enveEmuRelease(runtime, p) {
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
    function method_enveEmuAlterRelease(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuAlterRelease(runtime, pVoice);
        const h_decayReleaseRates = members.decayReleaseRates ?? 0;
        const h_decayReleaseRatesP = members.decayReleaseRatesP ?? 0;
        let release = ((((__pointee_pVoice.SIDSR) & (15))) & 0xff);
        __pointee_pVoice.enveStepAdd = ((h_decayReleaseRates[release]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = ((h_decayReleaseRatesP[release]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuRelease.bind(undefined, runtime);
        return method_enveEmuRelease(runtime, pVoice);
    }
    function __deref_enveEmuAlterRelease(runtime, p) {
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
    function method_enveEmuStartRelease(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuStartRelease(runtime, pVoice);
        const h_releasePos = members.releasePos ?? 0;
        __pointee_pVoice.ADSRctrl = ((10) & 0xff);
        __pointee_pVoice.enveStep = ((h_releasePos[__pointee_pVoice.enveVol]) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((0) >>> 0);
        return method_enveEmuAlterRelease(runtime, pVoice);
    }
    function __deref_enveEmuStartRelease(runtime, p) {
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
    function method_enveEmuSustain(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuSustain(runtime, pVoice);
        const h_masterAmplModTable = members.masterAmplModTable ?? 0;
        return h_masterAmplModTable[((__deref_enveEmuSustain(runtime, __pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
    }
    function __deref_enveEmuSustain(runtime, p) {
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
    function method_enveEmuSustainDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuSustainDecay(runtime, pVoice);
        const h_releaseTab = members.releaseTab ?? 0;
        const h_masterAmplModTable = members.masterAmplModTable ?? 0;
        if ((((__pointee_pVoice.enveStep) >= ((members.releaseTabLen ?? 0))) ? 1 : 0)) {
            __pointee_pVoice.enveVol = ((h_releaseTab[(((members.releaseTabLen ?? 0)) - (1))]) & 0xff);
            return method_enveEmuAlterSustain(runtime, pVoice);
        }
        else {
            __pointee_pVoice.enveVol = ((h_releaseTab[__pointee_pVoice.enveStep]) & 0xff);
            if ((((__pointee_pVoice.enveVol) <= (__pointee_pVoice.enveSusVol)) ? 1 : 0)) {
                __pointee_pVoice.enveVol = ((__pointee_pVoice.enveSusVol) & 0xff);
                return method_enveEmuAlterSustain(runtime, pVoice);
            }
            else {
                method_enveEmuEnveAdvance(runtime, pVoice);
                return h_masterAmplModTable[((__deref_enveEmuSustainDecay(runtime, __pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
            }
        }
    }
    function __deref_enveEmuSustainDecay(runtime, p) {
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
    function method_enveEmuAlterSustain(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuAlterSustain(runtime, pVoice);
        if ((((__pointee_pVoice.enveVol) > (__pointee_pVoice.enveSusVol)) ? 1 : 0)) {
            __pointee_pVoice.ADSRctrl = ((12) & 0xff);
            __pointee_pVoice.ADSRproc = method_enveEmuSustainDecay.bind(undefined, runtime);
            return method_enveEmuAlterSustainDecay(runtime, pVoice);
        }
        else {
            __pointee_pVoice.ADSRctrl = ((8) & 0xff);
            __pointee_pVoice.ADSRproc = method_enveEmuSustain.bind(undefined, runtime);
            return method_enveEmuSustain(runtime, pVoice);
        }
    }
    function __deref_enveEmuAlterSustain(runtime, p) {
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
    function method_enveEmuAlterSustainDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuAlterSustainDecay(runtime, pVoice);
        const h_decayReleaseRates = members.decayReleaseRates ?? 0;
        const h_decayReleaseRatesP = members.decayReleaseRatesP ?? 0;
        let decay = ((((__pointee_pVoice.SIDAD) & (15))) & 0xff);
        __pointee_pVoice.enveStepAdd = ((h_decayReleaseRates[decay]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = ((h_decayReleaseRatesP[decay]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuSustainDecay.bind(undefined, runtime);
        return method_enveEmuSustainDecay(runtime, pVoice);
    }
    function __deref_enveEmuAlterSustainDecay(runtime, p) {
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
    function method_enveEmuDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuDecay(runtime, pVoice);
        const h_releaseTab = members.releaseTab ?? 0;
        const h_masterAmplModTable = members.masterAmplModTable ?? 0;
        if ((((__pointee_pVoice.enveStep) >= ((members.releaseTabLen ?? 0))) ? 1 : 0)) {
            __pointee_pVoice.enveVol = ((__pointee_pVoice.enveSusVol) & 0xff);
            return method_enveEmuAlterSustain(runtime, pVoice);
        }
        else {
            __pointee_pVoice.enveVol = ((h_releaseTab[__pointee_pVoice.enveStep]) & 0xff);
            if ((((__pointee_pVoice.enveVol) <= (__pointee_pVoice.enveSusVol)) ? 1 : 0)) {
                __pointee_pVoice.enveVol = ((__pointee_pVoice.enveSusVol) & 0xff);
                return method_enveEmuAlterSustain(runtime, pVoice);
            }
            else {
                method_enveEmuEnveAdvance(runtime, pVoice);
                return h_masterAmplModTable[((__deref_enveEmuDecay(runtime, __pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
            }
        }
    }
    function __deref_enveEmuDecay(runtime, p) {
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
    function method_enveEmuAlterDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuAlterDecay(runtime, pVoice);
        const h_decayReleaseRates = members.decayReleaseRates ?? 0;
        const h_decayReleaseRatesP = members.decayReleaseRatesP ?? 0;
        let decay = ((((__pointee_pVoice.SIDAD) & (15))) & 0xff);
        __pointee_pVoice.enveStepAdd = ((h_decayReleaseRates[decay]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = ((h_decayReleaseRatesP[decay]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuDecay.bind(undefined, runtime);
        return method_enveEmuDecay(runtime, pVoice);
    }
    function __deref_enveEmuAlterDecay(runtime, p) {
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
    function method_enveEmuStartDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuStartDecay(runtime, pVoice);
        __pointee_pVoice.ADSRctrl = ((6) & 0xff);
        __pointee_pVoice.enveStep = (((__pointee_pVoice.enveStepPnt = ((0) >>> 0))) & 0xffff);
        return method_enveEmuAlterDecay(runtime, pVoice);
    }
    function __deref_enveEmuStartDecay(runtime, p) {
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
    function method_enveEmuAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuAttack(runtime, pVoice);
        const h_masterAmplModTable = members.masterAmplModTable ?? 0;
        if ((((__pointee_pVoice.enveStep) >= (255)) ? 1 : 0)) {
            return method_enveEmuStartDecay(runtime, pVoice);
        }
        else {
            __pointee_pVoice.enveVol = ((__pointee_pVoice.enveStep) & 0xff);
            method_enveEmuEnveAdvance(runtime, pVoice);
            return h_masterAmplModTable[((__deref_enveEmuAttack(runtime, __pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
        }
    }
    function __deref_enveEmuAttack(runtime, p) {
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
    function method_enveEmuAlterAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuAlterAttack(runtime, pVoice);
        const h_attackRates = members.attackRates ?? 0;
        const h_attackRatesP = members.attackRatesP ?? 0;
        let attack = ((((__pointee_pVoice.SIDAD) >>> (4))) & 0xff);
        __pointee_pVoice.enveStepAdd = ((h_attackRates[attack]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = ((h_attackRatesP[attack]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuAttack.bind(undefined, runtime);
        return method_enveEmuAttack(runtime, pVoice);
    }
    function __deref_enveEmuAlterAttack(runtime, p) {
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
    function method_enveEmuStartAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuStartAttack(runtime, pVoice);
        __pointee_pVoice.ADSRctrl = ((4) & 0xff);
        __pointee_pVoice.enveStep = ((__pointee_pVoice.enveVol) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((0) >>> 0);
        return method_enveEmuAlterAttack(runtime, pVoice);
    }
    function __deref_enveEmuStartAttack(runtime, p) {
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
    function method_enveEmuShortAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuShortAttack(runtime, pVoice);
        const h_masterAmplModTable = members.masterAmplModTable ?? 0;
        if (((((((__pointee_pVoice.enveStep) >= (255)) ? 1 : 0)) || ((((__pointee_pVoice.enveShortAttackCount) === (0)) ? 1 : 0))) ? 1 : 0)) {
            return method_enveEmuStartDecay(runtime, pVoice);
        }
        __pointee_pVoice.enveVol = ((__pointee_pVoice.enveStep) & 0xff);
        __pointee_pVoice.enveShortAttackCount = ((((__pointee_pVoice.enveShortAttackCount) - (1))) & 0xffff);
        method_enveEmuEnveAdvance(runtime, pVoice);
        return h_masterAmplModTable[((__deref_enveEmuShortAttack(runtime, __pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
    }
    function __deref_enveEmuShortAttack(runtime, p) {
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
    function method_enveEmuAlterShortAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuAlterShortAttack(runtime, pVoice);
        const h_attackRates = members.attackRates ?? 0;
        const h_attackRatesP = members.attackRatesP ?? 0;
        let attack = ((((__pointee_pVoice.SIDAD) >>> (4))) & 0xff);
        __pointee_pVoice.enveStepAdd = ((h_attackRates[attack]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = ((h_attackRatesP[attack]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuShortAttack.bind(undefined, runtime);
        return method_enveEmuShortAttack(runtime, pVoice);
    }
    function __deref_enveEmuAlterShortAttack(runtime, p) {
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
    function method_enveEmuStartShortAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = __deref_enveEmuStartShortAttack(runtime, pVoice);
        __pointee_pVoice.ADSRctrl = ((16) & 0xff);
        __pointee_pVoice.enveStep = ((__pointee_pVoice.enveVol) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((0) >>> 0);
        __pointee_pVoice.enveShortAttackCount = ((65535) & 0xffff);
        return method_enveEmuAlterShortAttack(runtime, pVoice);
    }
    function __deref_enveEmuStartShortAttack(runtime, p) {
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["clock"];
        const h_sidModeNormalTable = members.sidModeNormalTable ?? 0;
        const h_sidModeRingTable = members.sidModeRingTable ?? 0;
        const h_enveModeTable = members.enveModeTable ?? 0;
        h_sidModeNormalTable[0] = method_sidMode00.bind(undefined, runtime);
        h_sidModeNormalTable[1] = method_sidMode10.bind(undefined, runtime);
        h_sidModeNormalTable[2] = method_sidMode20.bind(undefined, runtime);
        h_sidModeNormalTable[3] = method_sidMode30.bind(undefined, runtime);
        h_sidModeNormalTable[4] = method_sidMode40.bind(undefined, runtime);
        h_sidModeNormalTable[5] = method_sidMode50.bind(undefined, runtime);
        h_sidModeNormalTable[6] = method_sidMode60.bind(undefined, runtime);
        h_sidModeNormalTable[7] = method_sidMode70.bind(undefined, runtime);
        h_sidModeNormalTable[8] = method_sidMode80.bind(undefined, runtime);
        h_sidModeNormalTable[9] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeNormalTable[10] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeNormalTable[11] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeNormalTable[12] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeNormalTable[13] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeNormalTable[14] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeNormalTable[15] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[0] = method_sidMode00.bind(undefined, runtime);
        h_sidModeRingTable[1] = method_sidMode14.bind(undefined, runtime);
        h_sidModeRingTable[2] = method_sidMode00.bind(undefined, runtime);
        h_sidModeRingTable[3] = method_sidMode34.bind(undefined, runtime);
        h_sidModeRingTable[4] = method_sidMode00.bind(undefined, runtime);
        h_sidModeRingTable[5] = method_sidMode54.bind(undefined, runtime);
        h_sidModeRingTable[6] = method_sidMode00.bind(undefined, runtime);
        h_sidModeRingTable[7] = method_sidMode74.bind(undefined, runtime);
        h_sidModeRingTable[8] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[9] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[10] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[11] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[12] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[13] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[14] = method_sidModeLock.bind(undefined, runtime);
        h_sidModeRingTable[15] = method_sidModeLock.bind(undefined, runtime);
        h_enveModeTable[0] = method_enveEmuStartAttack.bind(undefined, runtime);
        h_enveModeTable[1] = method_enveEmuStartRelease.bind(undefined, runtime);
        h_enveModeTable[2] = method_enveEmuAttack.bind(undefined, runtime);
        h_enveModeTable[3] = method_enveEmuDecay.bind(undefined, runtime);
        h_enveModeTable[4] = method_enveEmuSustain.bind(undefined, runtime);
        h_enveModeTable[5] = method_enveEmuRelease.bind(undefined, runtime);
        h_enveModeTable[6] = method_enveEmuSustainDecay.bind(undefined, runtime);
        h_enveModeTable[7] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[8] = method_enveEmuStartShortAttack.bind(undefined, runtime);
        h_enveModeTable[9] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[10] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[11] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[12] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[13] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[14] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[15] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[16] = method_enveEmuStartAttack.bind(undefined, runtime);
        h_enveModeTable[17] = method_enveEmuStartRelease.bind(undefined, runtime);
        h_enveModeTable[18] = method_enveEmuAlterAttack.bind(undefined, runtime);
        h_enveModeTable[19] = method_enveEmuAlterDecay.bind(undefined, runtime);
        h_enveModeTable[20] = method_enveEmuAlterSustain.bind(undefined, runtime);
        h_enveModeTable[21] = method_enveEmuAlterRelease.bind(undefined, runtime);
        h_enveModeTable[22] = method_enveEmuAlterSustainDecay.bind(undefined, runtime);
        h_enveModeTable[23] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[24] = method_enveEmuStartShortAttack.bind(undefined, runtime);
        h_enveModeTable[25] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[26] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[27] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[28] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[29] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[30] = method_enveEmuMute.bind(undefined, runtime);
        h_enveModeTable[31] = method_enveEmuMute.bind(undefined, runtime);
        members.m_stream = (__L2 ? __L2(0, 1, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, 1, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        members.device = (members.this ?? 0);
        members.mixer_channel = (members.m_stream ?? 0);
        members.PCMfreq = ((((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) & 0xffff);
        members.clock = (((__L3 ? __L3() : runtime.macro("clock"))) >>> 0);
        members.type = ((0) | 0);
        method_init(runtime);
        method_sidInitWaveformTables(runtime, 0);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        method_reset(runtime);
    }
    function method_device_post_load(runtime) {
        const members = runtime.members;
        method_postload(runtime);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        method_fill_buffer(runtime, stream);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_read_potx"], __L1 = __l["m_read_poty"], __L2 = __l["machine"];
        let data = ((0) & 0xff);
        switch (((offset) & (31))) {
            case 25:
                {
                    data = (((__L0 ? __L0(Number(0)) : typeof members.m_read_potx === 'function' ? members.m_read_potx(0) : runtime.invoke("m_read_potx", 0))) & 0xff);
                    break;
                }
            case 26:
                {
                    data = (((__L1 ? __L1(Number(0)) : typeof members.m_read_poty === 'function' ? members.m_read_poty(0) : runtime.invoke("m_read_poty", 0))) & 0xff);
                    break;
                }
            default:
                {
                    data = ((method_port_r(runtime, (__L2 ? __L2() : runtime.macro("machine")), offset)) & 0xff);
                    break;
                }
        }
        return data;
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_port_w(runtime, offset, data);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "syncEm": method_syncEm,
        "fill_buffer": method_fill_buffer,
        "mix_mono": method_mix_mono,
        "reset": method_reset,
        "sidOperator_clear": method_sidOperator_clear,
        "enveEmuResetOperator": method_enveEmuResetOperator,
        "sidOperator_set": method_sidOperator_set,
        "sidOperator_set2": method_sidOperator_set2,
        "sidOperator_wave_calc_cycle_len": method_sidOperator_wave_calc_cycle_len,
        "postload": method_postload,
        "init": method_init,
        "sidInitMixerEngine": method_sidInitMixerEngine,
        "filterTableInit": method_filterTableInit,
        "sidInitWaveformTables": method_sidInitWaveformTables,
        "enveEmuInit": method_enveEmuInit,
        "port_w": method_port_w,
        "port_r": method_port_r,
        "sidOperator_wave_calc_normal": method_sidOperator_wave_calc_normal,
        "waveCalcFilter": method_waveCalcFilter,
        "waveAdvance": method_waveAdvance,
        "noiseAdvance": method_noiseAdvance,
        "noiseAdvanceHp": method_noiseAdvanceHp,
        "sidMode00": method_sidMode00,
        "sidMode10": method_sidMode10,
        "sidMode20": method_sidMode20,
        "sidMode30": method_sidMode30,
        "sidMode40": method_sidMode40,
        "sidMode50": method_sidMode50,
        "sidMode60": method_sidMode60,
        "sidMode70": method_sidMode70,
        "sidMode80": method_sidMode80,
        "sidMode80hp": method_sidMode80hp,
        "sidModeLock": method_sidModeLock,
        "sidMode14": method_sidMode14,
        "sidMode34": method_sidMode34,
        "sidMode54": method_sidMode54,
        "sidMode74": method_sidMode74,
        "waveCalcMute": method_waveCalcMute,
        "waveCalcRangeCheck": method_waveCalcRangeCheck,
        "enveEmuEnveAdvance": method_enveEmuEnveAdvance,
        "enveEmuMute": method_enveEmuMute,
        "enveEmuRelease": method_enveEmuRelease,
        "enveEmuAlterRelease": method_enveEmuAlterRelease,
        "enveEmuStartRelease": method_enveEmuStartRelease,
        "enveEmuSustain": method_enveEmuSustain,
        "enveEmuSustainDecay": method_enveEmuSustainDecay,
        "enveEmuAlterSustain": method_enveEmuAlterSustain,
        "enveEmuAlterSustainDecay": method_enveEmuAlterSustainDecay,
        "enveEmuDecay": method_enveEmuDecay,
        "enveEmuAlterDecay": method_enveEmuAlterDecay,
        "enveEmuStartDecay": method_enveEmuStartDecay,
        "enveEmuAttack": method_enveEmuAttack,
        "enveEmuAlterAttack": method_enveEmuAlterAttack,
        "enveEmuStartAttack": method_enveEmuStartAttack,
        "enveEmuShortAttack": method_enveEmuShortAttack,
        "enveEmuAlterShortAttack": method_enveEmuAlterShortAttack,
        "enveEmuStartShortAttack": method_enveEmuStartShortAttack,
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "device_post_load": method_device_post_load,
        "sound_stream_update": method_sound_stream_update,
        "read": method_read,
        "write": method_write
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["clock", "expf", "logf", "m_read_potx", "m_read_poty", "machine", "machine().sample_rate", "stream_alloc"];
export const device = definition;
export default device;
