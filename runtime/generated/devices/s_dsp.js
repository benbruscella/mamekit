import deviceData from './s_dsp.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 15, 20, 24, 30, 40, 48, 60, 80, 96, 120, 160, 192, 240, 320, 384, 480, 640, 768, 960, 1280, 1536, 1920, 2560, 3072, 3840, 5120, 6144, 7680, 10240, 15360, 30720];
    const __mame_table_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 16, 16, 17, 17, 18, 19, 19, 20, 20, 21, 21, 22, 23, 23, 24, 24, 25, 26, 27, 27, 28, 29, 29, 30, 31, 32, 32, 33, 34, 35, 36, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62, 64, 65, 66, 67, 69, 70, 71, 73, 74, 76, 77, 78, 80, 81, 83, 84, 86, 87, 89, 90, 92, 94, 95, 97, 99, 100, 102, 104, 106, 107, 109, 111, 113, 115, 117, 118, 120, 122, 124, 126, 128, 130, 132, 134, 137, 139, 141, 143, 145, 147, 150, 152, 154, 156, 159, 161, 163, 166, 168, 171, 173, 175, 178, 180, 183, 186, 188, 191, 193, 196, 199, 201, 204, 207, 210, 212, 215, 218, 221, 224, 227, 230, 233, 236, 239, 242, 245, 248, 251, 254, 257, 260, 263, 267, 270, 273, 276, 280, 283, 286, 290, 293, 297, 300, 304, 307, 311, 314, 318, 321, 325, 328, 332, 336, 339, 343, 347, 351, 354, 358, 362, 366, 370, 374, 378, 381, 385, 389, 393, 397, 401, 405, 410, 414, 418, 422, 426, 430, 434, 439, 443, 447, 451, 456, 460, 464, 469, 473, 477, 482, 486, 491, 495, 499, 504, 508, 513, 517, 522, 527, 531, 536, 540, 545, 550, 554, 559, 563, 568, 573, 577, 582, 587, 592, 596, 601, 606, 611, 615, 620, 625, 630, 635, 640, 644, 649, 654, 659, 664, 669, 674, 678, 683, 688, 693, 698, 703, 708, 713, 718, 723, 728, 732, 737, 742, 747, 752, 757, 762, 767, 772, 777, 782, 787, 792, 797, 802, 806, 811, 816, 821, 826, 831, 836, 841, 846, 851, 855, 860, 865, 870, 875, 880, 884, 889, 894, 899, 904, 908, 913, 918, 923, 927, 932, 937, 941, 946, 951, 955, 960, 965, 969, 974, 978, 983, 988, 992, 997, 1001, 1005, 1010, 1014, 1019, 1023, 1027, 1032, 1036, 1040, 1045, 1049, 1053, 1057, 1061, 1066, 1070, 1074, 1078, 1082, 1086, 1090, 1094, 1098, 1102, 1106, 1109, 1113, 1117, 1121, 1125, 1128, 1132, 1136, 1139, 1143, 1146, 1150, 1153, 1157, 1160, 1164, 1167, 1170, 1174, 1177, 1180, 1183, 1186, 1190, 1193, 1196, 1199, 1202, 1205, 1207, 1210, 1213, 1216, 1219, 1221, 1224, 1227, 1229, 1232, 1234, 1237, 1239, 1241, 1244, 1246, 1248, 1251, 1253, 1255, 1257, 1259, 1261, 1263, 1265, 1267, 1269, 1270, 1272, 1274, 1275, 1277, 1279, 1280, 1282, 1283, 1284, 1286, 1287, 1288, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1297, 1297, 1298, 1299, 1300, 1300, 1301, 1302, 1302, 1303, 1303, 1303, 1304, 1304, 1304, 1304, 1304, 1305, 1305, 1305, 1305, 1305, 1305, 1305, 1305, 1305, 1305];
    const cppScratch_sound_stream_update_mix = new Int16Array(new Uint8Array(Math.max(0, Number(2))));
    function method_dsp_update(runtime, sound_ptr) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::clamp"];
        let __t0, __t1;
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        const h_m_voice_state = members.m_voice_state ?? 0;
        const h_m_fir_lbuf = members.m_fir_lbuf ?? 0;
        const h_m_fir_rbuf = members.m_fir_rbuf ?? 0;
        let envx = ((0) | 0);
        let vl = ((0) | 0);
        let vr = ((0) | 0);
        let sd = ((h_m_dsp_regs[93]) & 0xffff);
        if (((h_m_dsp_regs[108]) & (128))) {
            method_dsp_reset(runtime);
        }
        h_m_dsp_regs[124] = ((h_m_dsp_regs[124]) & ((~h_m_dsp_regs[76])));
        let outx = ((0) | 0);
        members.m_noise_cnt = ((((members.m_noise_cnt) - ((__mame_table_0[(((((h_m_dsp_regs[108]) & (31))) % 32) + 32) % 32] ?? 0)))) >>> 0);
        if (((((members.m_noise_cnt ?? 0)) <= (0)) ? 1 : 0)) {
            members.m_noise_cnt = ((30720) >>> 0);
            members.m_noise_lev = (((((((((((members.m_noise_lev ?? 0)) << (13))) ^ ((((members.m_noise_lev ?? 0)) << (14))))) & (16384))) | ((((members.m_noise_lev ?? 0)) >>> (1))))) >>> 0);
        }
        let outl = ((0) | 0);
        let outr = ((0) | 0);
        let echol = ((0) | 0);
        let echor = ((0) | 0);
        for (let v = ((0) | 0), m = ((1) | 0), V = ((0) | 0); (((v) < (8)) ? 1 : 0); v = ((((v) + (1))) | 0), V = ((((V) + (16))) | 0), m = ((((m) << (1))) | 0)) {
            let vp = h_m_voice_state[v];
            if ((((vp.on_cnt) && (((Number((vp.on_cnt = ((((vp.on_cnt) - (1))) | 0))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                members.m_keys = ((((members.m_keys) | (m))) & 0xff);
                members.m_keyed_on = ((((members.m_keyed_on) | (m))) & 0xff);
                vp.samp_id = ((((((method_vptr(runtime, sd, V)) << (16))) | (method_lptr(runtime, sd, V)))) >>> 0);
                vp.mem_ptr = ((method_vptr(runtime, sd, V)) & 0xffff);
                0;
                vp.header_cnt = ((0) << 24 >> 24);
                vp.half = ((0) ? 1 : 0);
                vp.envx = ((0) | 0);
                vp.end = ((0) & 0xff);
                vp.sampptr = ((0) << 24 >> 24);
                vp.mixfrac = ((12288) | 0);
                vp.envcnt = ((30720) | 0);
                vp.envstate = 0;
            }
            if (((((h_m_dsp_regs[76]) & (m))) & ((~h_m_dsp_regs[92])))) {
                h_m_dsp_regs[76] = ((h_m_dsp_regs[76]) & ((~m)));
                vp.on_cnt = ((8) | 0);
                0;
            }
            if ((((((members.m_keys ?? 0)) & (h_m_dsp_regs[92]))) & (m))) {
                vp.envstate = 3;
                vp.on_cnt = ((0) | 0);
                0;
            }
            if (((((((((((members.m_keys ?? 0)) & (m))) & (255))) ? 0 : 1)) || (((Number((envx = ((method_advance_envelope(runtime, v)) | 0))) < Number(0)) ? 1 : 0))) ? 1 : 0)) {
                h_m_dsp_regs[((V) + (8))] = 0;
                h_m_dsp_regs[((V) + (9))] = 0;
                outx = ((0) | 0);
                continue;
            }
            vp.pitch = ((method_pitch(runtime, V)) | 0);
            if (((h_m_dsp_regs[45]) & (m))) {
                0;
                vp.pitch = ((((vp.pitch) + (runtime.shiftRight(((runtime.shiftRight(outx, 5)) * (vp.pitch)), 10)))) | 0);
            }
            0;
            for (; (((vp.mixfrac) >= (0)) ? 1 : 0); vp.mixfrac = ((((vp.mixfrac) - (4096))) | 0)) {
                if (((vp.header_cnt) ? 0 : 1)) {
                    if ((((vp.end) >>> (0)) & 1)) {
                        h_m_dsp_regs[124] = ((h_m_dsp_regs[124]) | (m));
                        if ((((vp.end) >>> (1)) & 1)) {
                            vp.mem_ptr = ((method_lptr(runtime, sd, V)) & 0xffff);
                            0;
                        }
                        else {
                            0;
                            members.m_keys = ((((members.m_keys) & ((~m)))) & 0xff);
                            h_m_dsp_regs[((V) + (8))] = 0;
                            vp.envx = ((0) | 0);
                            while ((((vp.mixfrac) >= (0)) ? 1 : 0)) {
                                vp.sampbuf[vp.sampptr] = 0;
                                outx = ((0) | 0);
                                vp.sampptr = ((((((vp.sampptr) + (1))) & (3))) << 24 >> 24);
                                vp.mixfrac = ((((vp.mixfrac) - (4096))) | 0);
                            }
                            break;
                        }
                    }
                    vp.header_cnt = ((8) << 24 >> 24);
                    vl = ((((method_read_byte(runtime, (__t0 = vp.mem_ptr, vp.mem_ptr = ((((vp.mem_ptr) + (1))) & 0xffff), __t0))) & 0xff)) | 0);
                    vp.range = ((runtime.shiftRight(vl, 4)) & 0xff);
                    vp.end = ((((vl) & (3))) & 0xff);
                    vp.filter = ((runtime.shiftRight(((vl) & (12)), 2)) & 0xff);
                    0;
                }
                if (((vp.half) ? 0 : 1)) {
                    vp.half = ((1) ? 1 : 0);
                    outx = ((runtime.shiftRight(((method_read_byte(runtime, vp.mem_ptr)) << 24 >> 24), 4)) | 0);
                }
                else {
                    vp.half = ((0) ? 1 : 0);
                    outx = ((((((method_read_byte(runtime, (__t1 = vp.mem_ptr, vp.mem_ptr = ((((vp.mem_ptr) + (1))) & 0xffff), __t1))) << (4))) << 24 >> 24)) | 0);
                    outx = ((((outx) >> (4))) | 0);
                    vp.header_cnt = ((((vp.header_cnt) - (1))) << 24 >> 24);
                }
                0;
                if ((((vp.range) <= (12)) ? 1 : 0)) {
                    outx = ((runtime.shiftRight(((outx) << (vp.range)), 1)) | 0);
                }
                else {
                    outx = ((((outx) & (-2048))) | 0);
                    0;
                }
                0;
                switch (vp.filter) {
                    case 0:
                        {
                            break;
                        }
                    case 1:
                        {
                            outx = ((((outx) + (__add_dsp_update(runtime, runtime.shiftRight(vp.smp1, 1), runtime.shiftRight((-vp.smp1), 5))))) | 0);
                            break;
                        }
                    case 2:
                        {
                            outx = ((((outx) + (__add_dsp_update(runtime, ((((vp.smp1) + (runtime.shiftRight((-((vp.smp1) + (runtime.shiftRight(vp.smp1, 1)))), 5)))) - (runtime.shiftRight(vp.smp2, 1))), runtime.shiftRight(vp.smp2, 5))))) | 0);
                            break;
                        }
                    case 3:
                        {
                            outx = ((((outx) + (__add_dsp_update(runtime, ((((vp.smp1) + (runtime.shiftRight((-__add_dsp_update(runtime, ((vp.smp1) + (((vp.smp1) << (2)))), ((vp.smp1) << (3)))), 7)))) - (runtime.shiftRight(vp.smp2, 1))), runtime.shiftRight(((vp.smp2) + (runtime.shiftRight(vp.smp2, 1))), 4))))) | 0);
                            break;
                        }
                }
                outx = (((__L0 ? __L0(outx, -32768, 32767) : runtime.macro("std::clamp", outx, -32768, 32767))) | 0);
                0;
                vp.smp2 = ((((vp.smp1) << 16 >> 16)) | 0);
                vp.smp1 = ((((((outx) << (1))) << 16 >> 16)) | 0);
                vp.sampbuf[vp.sampptr] = vp.smp1;
                0;
                vp.sampptr = ((((((vp.sampptr) + (1))) & (3))) << 24 >> 24);
            }
            if (((h_m_dsp_regs[61]) & (m))) {
                0;
                outx = (((((((members.m_noise_lev ?? 0)) << (1))) << 16 >> 16)) | 0);
            }
            else {
                vl = ((runtime.shiftRight(vp.mixfrac, 4)) | 0);
                vr = ((((runtime.shiftRight((((__mame_table_1[(((__add_dsp_update(runtime, 0, (((-vl)) - (1)))) % 520) + 520) % 520] ?? 0)) * (vp.sampbuf[vp.sampptr])), 11)) & (-2))) | 0);
                vr = ((((vr) + (((runtime.shiftRight((((__mame_table_1[(((__add_dsp_update(runtime, 255, (-vl))) % 520) + 520) % 520] ?? 0)) * (vp.sampbuf[((((vp.sampptr) + (1))) & (3))])), 11)) & (-2))))) | 0);
                vr = ((((vr) + (((runtime.shiftRight((((__mame_table_1[(((((512) + (vl))) % 520) + 520) % 520] ?? 0)) * (vp.sampbuf[((((vp.sampptr) + (2))) & (3))])), 11)) & (-2))))) | 0);
                vr = ((((vr) << 16 >> 16)) | 0);
                vr = ((((vr) + (((runtime.shiftRight((((__mame_table_1[(((((256) + (vl))) % 520) + 520) % 520] ?? 0)) * (vp.sampbuf[((((vp.sampptr) + (3))) & (3))])), 11)) & (-2))))) | 0);
                vr = (((__L0 ? __L0(vr, -32768, 32767) : runtime.macro("std::clamp", vr, -32768, 32767))) | 0);
                outx = ((((vr) << 16 >> 16)) | 0);
                0;
            }
            vp.mixfrac = ((((vp.mixfrac) + (vp.pitch))) | 0);
            outx = ((((runtime.shiftRight(((outx) * (envx)), 11)) & (-2))) | 0);
            h_m_dsp_regs[((V) + (9))] = runtime.shiftRight(outx, 8);
            vl = ((runtime.shiftRight(((((((h_m_dsp_regs[V]) << 24 >> 24)) | 0)) * (outx)), 7)) | 0);
            vr = ((runtime.shiftRight(((((((h_m_dsp_regs[((V) + (1))]) << 24 >> 24)) | 0)) * (outx)), 7)) | 0);
            outl = ((((outl) + (vl))) | 0);
            outr = ((((outr) + (vr))) | 0);
            if (((h_m_dsp_regs[77]) & (m))) {
                echol = ((((echol) + (vl))) | 0);
                echor = ((((echor) + (vr))) | 0);
            }
        }
        outl = ((runtime.shiftRight(((outl) * (((h_m_dsp_regs[12]) << 24 >> 24))), 7)) | 0);
        outr = ((runtime.shiftRight(((outr) * (((h_m_dsp_regs[28]) << 24 >> 24))), 7)) | 0);
        0;
        let echo_base = ((((((((h_m_dsp_regs[109]) << (8))) + ((members.m_echo_ptr ?? 0)))) & (65535))) & 0xffff);
        h_m_fir_lbuf[(members.m_fir_ptr ?? 0)] = ((method_read_word(runtime, echo_base)) << 16 >> 16);
        h_m_fir_rbuf[(members.m_fir_ptr ?? 0)] = ((method_read_word(runtime, ((echo_base) + (2)))) << 16 >> 16);
        vl = ((((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[127]) << 24 >> 24)))) | 0);
        vr = ((((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[127]) << 24 >> 24)))) | 0);
        members.m_fir_ptr = (((((((members.m_fir_ptr ?? 0)) + (1))) & (7))) & 0xff);
        vl = ((((vl) + (((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[111]) << 24 >> 24)))))) | 0);
        vr = ((((vr) + (((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[111]) << 24 >> 24)))))) | 0);
        members.m_fir_ptr = (((((((members.m_fir_ptr ?? 0)) + (1))) & (7))) & 0xff);
        vl = ((((vl) + (((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[95]) << 24 >> 24)))))) | 0);
        vr = ((((vr) + (((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[95]) << 24 >> 24)))))) | 0);
        members.m_fir_ptr = (((((((members.m_fir_ptr ?? 0)) + (1))) & (7))) & 0xff);
        vl = ((((vl) + (((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[79]) << 24 >> 24)))))) | 0);
        vr = ((((vr) + (((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[79]) << 24 >> 24)))))) | 0);
        members.m_fir_ptr = (((((((members.m_fir_ptr ?? 0)) + (1))) & (7))) & 0xff);
        vl = ((((vl) + (((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[63]) << 24 >> 24)))))) | 0);
        vr = ((((vr) + (((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[63]) << 24 >> 24)))))) | 0);
        members.m_fir_ptr = (((((((members.m_fir_ptr ?? 0)) + (1))) & (7))) & 0xff);
        vl = ((((vl) + (((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[47]) << 24 >> 24)))))) | 0);
        vr = ((((vr) + (((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[47]) << 24 >> 24)))))) | 0);
        members.m_fir_ptr = (((((((members.m_fir_ptr ?? 0)) + (1))) & (7))) & 0xff);
        vl = ((((vl) + (((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[31]) << 24 >> 24)))))) | 0);
        vr = ((((vr) + (((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[31]) << 24 >> 24)))))) | 0);
        members.m_fir_ptr = (((((((members.m_fir_ptr ?? 0)) + (1))) & (7))) & 0xff);
        vl = ((((vl) + (((h_m_fir_lbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[15]) << 24 >> 24)))))) | 0);
        vr = ((((vr) + (((h_m_fir_rbuf[(members.m_fir_ptr ?? 0)]) * (((h_m_dsp_regs[15]) << 24 >> 24)))))) | 0);
        0;
        outl = ((((outl) + (runtime.shiftRight(((vl) * (((h_m_dsp_regs[44]) << 24 >> 24))), 14)))) | 0);
        outr = ((((outr) + (runtime.shiftRight(((vr) * (((h_m_dsp_regs[60]) << 24 >> 24))), 14)))) | 0);
        if (((((~h_m_dsp_regs[108])) >>> (5)) & 1)) {
            echol = ((((echol) + (runtime.shiftRight(((vl) * (((h_m_dsp_regs[13]) << 24 >> 24))), 14)))) | 0);
            echor = ((((echor) + (runtime.shiftRight(((vr) * (((h_m_dsp_regs[13]) << 24 >> 24))), 14)))) | 0);
            echol = (((__L0 ? __L0(echol, -32768, 32767) : runtime.macro("std::clamp", echol, -32768, 32767))) | 0);
            echor = (((__L0 ? __L0(echol, -32768, 32767) : runtime.macro("std::clamp", echol, -32768, 32767))) | 0);
            0;
            method_write_word(runtime, echo_base, ((echol) & 0xffff));
            method_write_word(runtime, ((echo_base) + (2)), ((echor) & 0xffff));
        }
        members.m_echo_ptr = ((((members.m_echo_ptr) + (((2) * (2))))) & 0xffff);
        if (((Number((members.m_echo_ptr ?? 0)) >= Number(((((h_m_dsp_regs[125]) & (15))) << (11)))) ? 1 : 0)) {
            members.m_echo_ptr = ((0) & 0xffff);
        }
        if (((sound_ptr) ? 1 : 0)) {
            if ((((h_m_dsp_regs[108]) >>> (6)) & 1)) {
                runtime.pointerStore(sound_ptr, 0);
                sound_ptr = runtime.packedView(__add_dsp_update(runtime, sound_ptr, 1), true);
                runtime.pointerStore(sound_ptr, 0);
                sound_ptr = runtime.packedView(__add_dsp_update(runtime, sound_ptr, 1), true);
            }
            else {
                runtime.pointerStore(sound_ptr, (__L0 ? __L0(outl, -32768, 32767) : runtime.macro("std::clamp", outl, -32768, 32767)));
                sound_ptr = runtime.packedView(__add_dsp_update(runtime, sound_ptr, 1), true);
                runtime.pointerStore(sound_ptr, (__L0 ? __L0(outr, -32768, 32767) : runtime.macro("std::clamp", outr, -32768, 32767)));
                sound_ptr = runtime.packedView(__add_dsp_update(runtime, sound_ptr, 1), true);
            }
        }
    }
    function __add_dsp_update(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_dsp_reset(runtime) {
        const members = runtime.members;
        const h_m_fir_lbuf = members.m_fir_lbuf ?? 0;
        const h_m_fir_rbuf = members.m_fir_rbuf ?? 0;
        const h_m_voice_state = members.m_voice_state ?? 0;
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_fir_lbuf[i] = 0;
            h_m_fir_rbuf[i] = 0;
            h_m_voice_state[i].on_cnt = ((0) | 0);
        }
        members.m_fir_ptr = ((0) & 0xff);
        members.m_echo_ptr = ((0) & 0xffff);
        members.m_keys = ((0) & 0xff);
        members.m_keyed_on = ((0) & 0xff);
        members.m_noise_cnt = ((0) >>> 0);
        members.m_noise_lev = ((16384) >>> 0);
        h_m_dsp_regs[108] = ((h_m_dsp_regs[108]) | (224));
        h_m_dsp_regs[76] = 0;
        h_m_dsp_regs[92] = 0;
    }
    function method_vptr(runtime, sd, v) {
        const members = runtime.members;
        sd = ((sd) & 0xff);
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((method_read_word(runtime, __add_vptr(runtime, ((sd) << (8)), ((h_m_dsp_regs[((v) + (4))]) << (2))))) & 0xffff);
    }
    function __add_vptr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read_word(runtime, a) {
        const members = runtime.members;
        return ((((method_read_byte(runtime, a)) | (((method_read_byte(runtime, ((a) + (1)))) << (8))))) & 0xffff);
    }
    function method_read_byte(runtime, a) {
        const members = runtime.members;
        return (((__deref_read_byte(runtime, members.m_cache).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_read_byte(runtime, p) {
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
    function method_lptr(runtime, sd, v) {
        const members = runtime.members;
        sd = ((sd) & 0xff);
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((method_read_word(runtime, __add_lptr(runtime, __add_lptr(runtime, ((sd) << (8)), ((h_m_dsp_regs[((v) + (4))]) << (2))), 2))) & 0xffff);
    }
    function __add_lptr(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_advance_envelope(runtime, v) {
        const members = runtime.members;
        const h_m_voice_state = members.m_voice_state ?? 0;
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        let t = ((0) | 0);
        let envx = ((h_m_voice_state[v].envx) | 0);
        if (((Number(h_m_voice_state[v].envstate) === Number(3)) ? 1 : 0)) {
            envx = ((((envx) - (8))) | 0);
            if ((((envx) <= (0)) ? 1 : 0)) {
                envx = ((0) | 0);
                members.m_keys = ((((members.m_keys) & ((~((1) << (v)))))) & 0xff);
                return ((-1) | 0);
            }
            h_m_voice_state[v].envx = ((envx) | 0);
            h_m_dsp_regs[__add_advance_envelope(runtime, ((v) << (4)), 8)] = runtime.shiftRight(envx, 8);
            0;
            return ((envx) | 0);
        }
        let cnt = ((h_m_voice_state[v].envcnt) | 0);
        let adsr1 = ((h_m_dsp_regs[__add_advance_envelope(runtime, ((v) << (4)), 5)]) | 0);
        if ((((adsr1) >>> (7)) & 1)) {
            switch (h_m_voice_state[v].envstate) {
                case 0:
                    {
                        t = ((((adsr1) & (15))) | 0);
                        if ((((t) === (15)) ? 1 : 0)) {
                            0;
                            envx = ((((envx) + (1024))) | 0);
                        }
                        else {
                            cnt = ((((cnt) - ((__mame_table_0[(((__add_advance_envelope(runtime, ((t) << (1)), 1)) % 32) + 32) % 32] ?? 0)))) | 0);
                            if ((((cnt) > (0)) ? 1 : 0)) {
                                break;
                            }
                            envx = ((((envx) + (32))) | 0);
                            cnt = ((30720) | 0);
                        }
                        if ((((envx) > (2047)) ? 1 : 0)) {
                            envx = ((2047) | 0);
                            h_m_voice_state[v].envstate = 1;
                        }
                        0;
                        h_m_voice_state[v].envx = ((envx) | 0);
                        break;
                    }
                case 1:
                    {
                        cnt = ((((cnt) - ((__mame_table_0[(((__add_advance_envelope(runtime, ((runtime.shiftRight(adsr1, 3)) & (14)), 16)) % 32) + 32) % 32] ?? 0)))) | 0);
                        if ((((cnt) <= (0)) ? 1 : 0)) {
                            cnt = ((30720) | 0);
                            envx = ((((envx) - (__add_advance_envelope(runtime, runtime.shiftRight(((envx) - (1)), 8), 1)))) | 0);
                            h_m_voice_state[v].envx = ((envx) | 0);
                        }
                        if (((Number(envx) <= Number(((256) * (__add_advance_envelope(runtime, method_SL(runtime, v), 1))))) ? 1 : 0)) {
                            h_m_voice_state[v].envstate = 2;
                        }
                        0;
                        break;
                    }
                case 2:
                    {
                        if (((Number((__mame_table_0[(((method_SR(runtime, v)) % 32) + 32) % 32] ?? 0)) === Number(0)) ? 1 : 0)) {
                            0;
                        }
                        cnt = ((((cnt) - ((__mame_table_0[(((method_SR(runtime, v)) % 32) + 32) % 32] ?? 0)))) | 0);
                        if ((((cnt) > (0)) ? 1 : 0)) {
                            break;
                        }
                        cnt = ((30720) | 0);
                        envx = ((((envx) - (__add_advance_envelope(runtime, runtime.shiftRight(((envx) - (1)), 8), 1)))) | 0);
                        0;
                        h_m_voice_state[v].envx = ((envx) | 0);
                        break;
                    }
                case 3:
                    {
                        break;
                    }
            }
        }
        else {
            t = ((h_m_dsp_regs[__add_advance_envelope(runtime, ((v) << (4)), 7)]) | 0);
            if ((((t) < (128)) ? 1 : 0)) {
                envx = ((((t) << (4))) | 0);
                h_m_voice_state[v].envx = ((envx) | 0);
                0;
            }
            else {
                switch (runtime.shiftRight(t, 5)) {
                    case 4:
                        {
                            cnt = ((((cnt) - ((__mame_table_0[(((((t) & (31))) % 32) + 32) % 32] ?? 0)))) | 0);
                            if ((((cnt) > (0)) ? 1 : 0)) {
                                break;
                            }
                            cnt = ((30720) | 0);
                            envx = ((((envx) - (32))) | 0);
                            if ((((envx) < (0)) ? 1 : 0)) {
                                envx = ((0) | 0);
                            }
                            0;
                            h_m_voice_state[v].envx = ((envx) | 0);
                            break;
                        }
                    case 5:
                        {
                            cnt = ((((cnt) - ((__mame_table_0[(((((t) & (31))) % 32) + 32) % 32] ?? 0)))) | 0);
                            if ((((cnt) > (0)) ? 1 : 0)) {
                                break;
                            }
                            cnt = ((30720) | 0);
                            envx = ((((envx) - (__add_advance_envelope(runtime, runtime.shiftRight(((envx) - (1)), 8), 1)))) | 0);
                            0;
                            h_m_voice_state[v].envx = ((envx) | 0);
                            break;
                        }
                    case 6:
                        {
                            cnt = ((((cnt) - ((__mame_table_0[(((((t) & (31))) % 32) + 32) % 32] ?? 0)))) | 0);
                            if ((((cnt) > (0)) ? 1 : 0)) {
                                break;
                            }
                            cnt = ((30720) | 0);
                            envx = ((((envx) + (32))) | 0);
                            envx = ((cppMin(+(envx), +(2047))) | 0);
                            0;
                            h_m_voice_state[v].envx = ((envx) | 0);
                            break;
                        }
                    case 7:
                        {
                            cnt = ((((cnt) - ((__mame_table_0[(((((t) & (31))) % 32) + 32) % 32] ?? 0)))) | 0);
                            if ((((cnt) > (0)) ? 1 : 0)) {
                                break;
                            }
                            cnt = ((30720) | 0);
                            if ((((envx) < (1536)) ? 1 : 0)) {
                                envx = ((((envx) + (32))) | 0);
                            }
                            else {
                                envx = ((((envx) + (8))) | 0);
                            }
                            envx = ((cppMin(+(envx), +(2047))) | 0);
                            0;
                            h_m_voice_state[v].envx = ((envx) | 0);
                            break;
                        }
                }
            }
        }
        h_m_voice_state[v].envcnt = ((cnt) | 0);
        h_m_dsp_regs[__add_advance_envelope(runtime, ((v) << (4)), 8)] = runtime.shiftRight(envx, 4);
        return ((envx) | 0);
    }
    function __add_advance_envelope(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_SL(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((((h_m_dsp_regs[__add_SL(runtime, ((v) << (4)), 6)]) >>> (5))) & 0xff);
    }
    function __add_SL(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_SR(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((((h_m_dsp_regs[__add_SR(runtime, ((v) << (4)), 6)]) & (31))) & 0xff);
    }
    function __add_SR(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_pitch(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((((((h_m_dsp_regs[((v) + (2))]) | (((h_m_dsp_regs[((v) + (3))]) << (8))))) & (16383))) & 0xffff);
    }
    function method_write_word(runtime, a, d) {
        const members = runtime.members;
        d = ((d) & 0xffff);
        method_write_byte(runtime, a, ((d) & (255)));
        method_write_byte(runtime, ((a) + (1)), ((((d) >>> (8))) & (255)));
    }
    function method_write_byte(runtime, a, d) {
        const members = runtime.members;
        d = ((d) & 0xff);
        (__deref_write_byte(runtime, members.m_data).write_byte?.(a, d) ?? 0);
    }
    function __deref_write_byte(runtime, p) {
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
    function method_dsp_io_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        (__t0 = __deref_dsp_io_r(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        if ((((offset) >>> (0)) & 1)) {
            return ((h_m_dsp_regs[(((members.m_dsp_addr ?? 0)) & (127))]) & 0xff);
        }
        return (((members.m_dsp_addr ?? 0)) & 0xff);
    }
    function __deref_dsp_io_r(runtime, p) {
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
    function method_dsp_io_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        (__t0 = __deref_dsp_io_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        if ((((offset) >>> (0)) & 1)) {
            if (((((~(members.m_dsp_addr ?? 0))) >>> (7)) & 1)) {
                offset = (((members.m_dsp_addr ?? 0)) & (127));
                if ((((offset) === (124)) ? 1 : 0)) {
                    h_m_dsp_regs[((offset) & (127))] = 0;
                }
                else {
                    h_m_dsp_regs[((offset) & (127))] = data;
                }
            }
        }
        else {
            members.m_dsp_addr = ((data) & 0xff);
        }
    }
    function __deref_dsp_io_w(runtime, p) {
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
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0;
        let mix = cppScratch_sound_stream_update_mix.fill(0);
        for (let i = ((0) | 0); ((Number(i) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            mix[0] = (mix[1] = 0);
            method_dsp_update(runtime, mix);
            (__deref_sound_stream_update(runtime, stream).put_int?.(0, i, (((mix[0] ?? 0)) | 0), 32768) ?? 0);
            (__deref_sound_stream_update(runtime, stream).put_int?.(1, i, (((mix[1] ?? 0)) | 0), 32768) ?? 0);
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
    function method_s_dsp_device__read_byte(runtime, a) {
        const members = runtime.members;
        return (((__deref_s_dsp_device__read_byte(runtime, members.m_cache).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_s_dsp_device__read_byte(runtime, p) {
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
    function method_s_dsp_device__read_word(runtime, a) {
        const members = runtime.members;
        return ((((method_read_byte(runtime, a)) | (((method_read_byte(runtime, ((a) + (1)))) << (8))))) & 0xffff);
    }
    function method_s_dsp_device__pitch(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((((((h_m_dsp_regs[((v) + (2))]) | (((h_m_dsp_regs[((v) + (3))]) << (8))))) & (16383))) & 0xffff);
    }
    function method_s_dsp_device__SL(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((((h_m_dsp_regs[__add_s_dsp_device__SL(runtime, ((v) << (4)), 6)]) >>> (5))) & 0xff);
    }
    function __add_s_dsp_device__SL(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_s_dsp_device__SR(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_dsp_regs = members.m_dsp_regs ?? 0;
        return ((((h_m_dsp_regs[__add_s_dsp_device__SR(runtime, ((v) << (4)), 6)]) & (31))) & 0xff);
    }
    function __add_s_dsp_device__SR(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "dsp_update": method_dsp_update,
        "dsp_reset": method_dsp_reset,
        "vptr": method_vptr,
        "read_word": method_read_word,
        "read_byte": method_read_byte,
        "lptr": method_lptr,
        "advance_envelope": method_advance_envelope,
        "SL": method_SL,
        "SR": method_SR,
        "pitch": method_pitch,
        "write_word": method_write_word,
        "write_byte": method_write_byte,
        "dsp_io_r": method_dsp_io_r,
        "dsp_io_w": method_dsp_io_w,
        "sound_stream_update": method_sound_stream_update,
        "s_dsp_device::read_byte": method_s_dsp_device__read_byte,
        "s_dsp_device::read_word": method_s_dsp_device__read_word,
        "s_dsp_device::pitch": method_s_dsp_device__pitch,
        "s_dsp_device::SL": method_s_dsp_device__SL,
        "s_dsp_device::SR": method_s_dsp_device__SR
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["std::clamp"];
export const device = definition;
export default device;
