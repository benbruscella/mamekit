import deviceData from './c64h156.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function struct_copy_live_info(t, s) {
        if (t === s || !t || !s || typeof s !== 'object')
            return s;
        if (s.tm !== undefined)
            t.tm = s.tm;
        if (s.state !== undefined)
            t.state = s.state;
        if (s.next_state !== undefined)
            t.next_state = s.next_state;
        if (s.sync !== undefined)
            t.sync = s.sync;
        if (s.byte !== undefined)
            t.byte = s.byte;
        if (s.ds !== undefined)
            t.ds = s.ds;
        if (s.oe !== undefined)
            t.oe = s.oe;
        if (s.soe !== undefined)
            t.soe = s.soe;
        if (s.accl !== undefined)
            t.accl = s.accl;
        if (s.accl_yb !== undefined)
            t.accl_yb = s.accl_yb;
        if (s.edge !== undefined)
            t.edge = s.edge;
        if (s.shift_reg !== undefined)
            t.shift_reg = s.shift_reg;
        if (s.cycle_counter !== undefined)
            t.cycle_counter = s.cycle_counter;
        if (s.cell_counter !== undefined)
            t.cell_counter = s.cell_counter;
        if (s.bit_counter !== undefined)
            t.bit_counter = s.bit_counter;
        if (s.zero_counter !== undefined)
            t.zero_counter = s.zero_counter;
        if (s.cycles_until_random_flux !== undefined)
            t.cycles_until_random_flux = s.cycles_until_random_flux;
        if (s.yb !== undefined)
            t.yb = s.yb;
        if (s.shift_reg_write !== undefined)
            t.shift_reg_write = s.shift_reg_write;
        if (s.write_start_time !== undefined)
            t.write_start_time = s.write_start_time;
        {
            const into = t.write_buffer, from = s.write_buffer;
            if (Array.isArray(into) && Array.isArray(from)) {
                for (let i = 0; i < into.length && i < from.length; i++)
                    into[i] = from[i];
            }
            else if (from !== undefined)
                t.write_buffer = from;
        }
        if (s.write_position !== undefined)
            t.write_position = s.write_position;
        return t;
    }
    function method_live_delay(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        const h_t_gen = members.t_gen ?? 0;
        h_cur_live.next_state = ((state) | 0);
        if (((Number(h_cur_live.tm) !== Number(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))) ? 1 : 0)) {
            ((runtime.dereference(h_t_gen)).adjust?.(((h_cur_live.tm) - (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)))) ?? 0);
        }
        else {
            method_live_sync(runtime);
        }
    }
    function method_live_sync(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        if ((((typeof h_cur_live.tm === 'number' ? ((h_cur_live.tm) === Infinity ? 1 : 0) : ((runtime.dereference(h_cur_live.tm)).is_never?.() ?? 0))) ? 0 : 1)) {
            if (((Number(h_cur_live.tm) > Number(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))) ? 1 : 0)) {
                method_rollback(runtime);
                method_live_run(runtime, ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0));
                method_commit(runtime, h_cur_live.tm);
            }
            else {
                method_commit(runtime, h_cur_live.tm);
                if (((Number(h_cur_live.next_state) !== Number(-1)) ? 1 : 0)) {
                    h_cur_live.state = ((h_cur_live.next_state) | 0);
                    h_cur_live.next_state = ((-1) | 0);
                }
                if (((Number(h_cur_live.state) === Number(0)) ? 1 : 0)) {
                    method_stop_writing(runtime, h_cur_live.tm);
                    h_cur_live.tm = Infinity;
                }
            }
            h_cur_live.next_state = ((-1) | 0);
            method_checkpoint(runtime);
        }
    }
    function method_rollback(runtime) {
        const members = runtime.members;
        const h_checkpoint_live = members.checkpoint_live ?? 0;
        const h_cur_live = members.cur_live ?? 0;
        struct_copy_live_info(members.cur_live, h_checkpoint_live);
        method_get_next_edge(runtime, h_cur_live.tm);
    }
    function method_get_next_edge(runtime, when) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        h_cur_live.edge = ((runtime.dereference(members.m_floppy)).get_next_transition?.(when) ?? 0);
    }
    function method_live_run(runtime, limit = Infinity) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        if ((((((Number(h_cur_live.state) === Number(0)) ? 1 : 0)) || (((Number(h_cur_live.next_state) !== Number(-1)) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        for (; 1;) {
            switch (h_cur_live.state) {
                case 1:
                    {
                        let syncpoint = ((0) ? 1 : 0);
                        if (((Number(h_cur_live.tm) > Number(limit)) ? 1 : 0)) {
                            return;
                        }
                        let bit = ((method_get_next_bit(runtime, h_cur_live.tm, limit)) | 0);
                        if (((Number(bit) < Number(0)) ? 1 : 0)) {
                            return;
                        }
                        let cell_counter = ((h_cur_live.cell_counter) | 0);
                        if (bit) {
                            h_cur_live.cycle_counter = ((h_cur_live.ds) | 0);
                            h_cur_live.cell_counter = ((0) | 0);
                        }
                        else {
                            h_cur_live.cycle_counter = ((((h_cur_live.cycle_counter) + (1))) | 0);
                            if (((Number(h_cur_live.cycle_counter) === Number(16)) ? 1 : 0)) {
                                h_cur_live.cycle_counter = ((h_cur_live.ds) | 0);
                                h_cur_live.cell_counter = ((((h_cur_live.cell_counter) + (1))) | 0);
                                h_cur_live.cell_counter = ((((h_cur_live.cell_counter) & (15))) | 0);
                            }
                            if (((((((((cell_counter) >>> (1)) & 1)) ? 0 : 1)) && ((((h_cur_live.cell_counter) >>> (1)) & 1))) ? 1 : 0)) {
                                h_cur_live.shift_reg = ((((h_cur_live.shift_reg) << (1))) & 0xffff);
                                h_cur_live.shift_reg = ((((h_cur_live.shift_reg) | (((((((((h_cur_live.cell_counter) >>> (3)) & 1)) || ((((h_cur_live.cell_counter) >>> (2)) & 1))) ? 1 : 0)) ? 0 : 1)))) & 0xffff);
                                h_cur_live.shift_reg = ((((h_cur_live.shift_reg) & (1023))) & 0xffff);
                                0;
                                syncpoint = ((1) ? 1 : 0);
                            }
                            if ((((((((((cell_counter) >>> (1)) & 1)) && ((((((h_cur_live.cell_counter) >>> (1)) & 1)) ? 0 : 1))) ? 1 : 0)) && (((h_cur_live.oe) ? 0 : 1))) ? 1 : 0)) {
                                method_write_next_bit(runtime, (((h_cur_live.shift_reg_write) >>> (7)) & 1), limit);
                            }
                            let sync = (((((((((Number(h_cur_live.shift_reg) === Number(1023)) ? 1 : 0)) && (h_cur_live.oe)) ? 1 : 0)) ? 0 : 1)) | 0);
                            if (((sync) ? 0 : 1)) {
                                h_cur_live.bit_counter = ((8) | 0);
                            }
                            else {
                                if ((((((((((((cell_counter) >>> (1)) & 1)) ? 0 : 1)) && ((((h_cur_live.cell_counter) >>> (1)) & 1))) ? 1 : 0)) && (h_cur_live.sync)) ? 1 : 0)) {
                                    h_cur_live.bit_counter = ((((h_cur_live.bit_counter) + (1))) | 0);
                                    h_cur_live.bit_counter = ((((h_cur_live.bit_counter) & (15))) | 0);
                                }
                            }
                            let byte = ((((((((((((Number(((h_cur_live.bit_counter) & (7))) === Number(7)) ? 1 : 0)) && (h_cur_live.soe)) ? 1 : 0)) && (((((h_cur_live.cell_counter) & (2))) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) | 0);
                            let load = (((((((((Number(((h_cur_live.bit_counter) & (7))) === Number(7)) ? 1 : 0)) && (((Number(((h_cur_live.cell_counter) & (3))) === Number(3)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) | 0);
                            if (((load) ? 0 : 1)) {
                                if (h_cur_live.oe) {
                                    h_cur_live.shift_reg_write = ((h_cur_live.shift_reg) & 0xff);
                                    0;
                                }
                                else {
                                    h_cur_live.shift_reg_write = ((h_cur_live.yb) & 0xff);
                                    0;
                                }
                            }
                            else {
                                if (((((((((cell_counter) >>> (1)) & 1)) ? 0 : 1)) && ((((h_cur_live.cell_counter) >>> (1)) & 1))) ? 1 : 0)) {
                                    h_cur_live.shift_reg_write = ((((h_cur_live.shift_reg_write) << (1))) & 0xff);
                                    h_cur_live.shift_reg_write = ((((h_cur_live.shift_reg_write) & (255))) & 0xff);
                                    0;
                                }
                            }
                            if (((Number(byte) !== Number(h_cur_live.byte)) ? 1 : 0)) {
                                if ((((((byte) ? 0 : 1)) || (((h_cur_live.accl) ? 0 : 1))) ? 1 : 0)) {
                                    0;
                                    h_cur_live.byte = ((byte) | 0);
                                    syncpoint = ((1) ? 1 : 0);
                                }
                                if (((byte) ? 0 : 1)) {
                                    h_cur_live.accl_yb = ((((h_cur_live.shift_reg) & (255))) & 0xff);
                                }
                            }
                            if (((Number(sync) !== Number(h_cur_live.sync)) ? 1 : 0)) {
                                0;
                                h_cur_live.sync = ((sync) | 0);
                                syncpoint = ((1) ? 1 : 0);
                            }
                        }
                        if (syncpoint) {
                            method_commit(runtime, h_cur_live.tm);
                            h_cur_live.tm = ((h_cur_live.tm) + ((members.m_period ?? 0)));
                            method_live_delay(runtime, 2);
                            return;
                        }
                        h_cur_live.tm = ((h_cur_live.tm) + ((members.m_period ?? 0)));
                        break;
                    }
                case 2:
                    {
                        (__l["m_write_sync"] ? __l["m_write_sync"](Number(h_cur_live.sync)) : typeof members.m_write_sync === 'function' ? members.m_write_sync(h_cur_live.sync) : runtime.invoke("m_write_sync", h_cur_live.sync));
                        (__l["m_write_byte"] ? __l["m_write_byte"](Number(h_cur_live.byte)) : typeof members.m_write_byte === 'function' ? members.m_write_byte(h_cur_live.byte) : runtime.invoke("m_write_byte", h_cur_live.byte));
                        h_cur_live.state = ((1) | 0);
                        method_checkpoint(runtime);
                        break;
                    }
            }
        }
    }
    function method_get_next_bit(runtime, tm, limit) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        let bit = ((0) | 0);
        if ((((typeof h_cur_live.edge === 'number' ? ((h_cur_live.edge) === Infinity ? 1 : 0) : ((runtime.dereference(h_cur_live.edge)).is_never?.() ?? 0))) ? 0 : 1)) {
            let next = ((tm) + ((members.m_period ?? 0)));
            if (((Number(h_cur_live.edge) < Number(next)) ? 1 : 0)) {
                bit = ((1) | 0);
                h_cur_live.zero_counter = ((0) | 0);
                h_cur_live.cycles_until_random_flux = ((runtime.add(((((__l["machine().rand"] ?? globalThis.mamekitMissingCall?.("machine().rand"))?.() ?? 0)) % (31)), 289)) | 0);
                method_get_next_edge(runtime, next);
            }
        }
        if (((Number(h_cur_live.zero_counter) >= Number(h_cur_live.cycles_until_random_flux)) ? 1 : 0)) {
            h_cur_live.zero_counter = ((0) | 0);
            h_cur_live.cycles_until_random_flux = ((runtime.add(((((__l["machine().rand"] ?? globalThis.mamekitMissingCall?.("machine().rand"))?.() ?? 0)) % (367)), 33)) | 0);
            bit = ((1) | 0);
        }
        return (((bit) && (h_cur_live.oe)) ? 1 : 0);
    }
    function method_write_next_bit(runtime, bit, limit) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        if ((typeof h_cur_live.write_start_time === 'number' ? ((h_cur_live.write_start_time) === Infinity ? 1 : 0) : ((runtime.dereference(h_cur_live.write_start_time)).is_never?.() ?? 0))) {
            h_cur_live.write_start_time = h_cur_live.tm;
            h_cur_live.write_position = ((0) | 0);
        }
        let etime = ((h_cur_live.tm) + ((members.m_period ?? 0)));
        if (((Number(etime) > Number(limit)) ? 1 : 0)) {
            return 1;
        }
        if ((((bit) && (((Number(h_cur_live.write_position) < Number(((h_cur_live.write_buffer)?.length ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            h_cur_live.write_buffer[(() => { const previous = h_cur_live.write_position; h_cur_live.write_position = ((((h_cur_live.write_position) + (1))) | 0); return previous; })()] = ((h_cur_live.tm) - ((members.m_period ?? 0)));
        }
        0;
        return 0;
    }
    function method_commit(runtime, tm, force = 0) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        if ((((((((typeof h_cur_live.write_start_time === 'number' ? ((h_cur_live.write_start_time) === Infinity ? 1 : 0) : ((runtime.dereference(h_cur_live.write_start_time)).is_never?.() ?? 0))) || (((Number(tm) === Number(h_cur_live.write_start_time)) ? 1 : 0))) ? 1 : 0)) || (((h_cur_live.write_position) ? 0 : 1))) ? 1 : 0)) {
            return;
        }
        if ((((((force) ? 0 : 1)) && (((Number(h_cur_live.write_position) < Number(((h_cur_live.write_buffer)?.length ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        0;
        ((runtime.dereference(members.m_floppy)).write_flux?.(h_cur_live.write_start_time, tm, h_cur_live.write_position, h_cur_live.write_buffer) ?? 0);
        h_cur_live.write_start_time = tm;
        h_cur_live.write_position = ((0) | 0);
    }
    function method_checkpoint(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        method_get_next_edge(runtime, ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0));
        struct_copy_live_info(members.checkpoint_live, h_cur_live);
    }
    function method_stop_writing(runtime, tm) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        method_commit(runtime, tm, 1);
        h_cur_live.write_start_time = Infinity;
    }
    function method_yb_r(runtime) {
        const members = runtime.members;
        const h_checkpoint_live = members.checkpoint_live ?? 0;
        if (h_checkpoint_live.accl) {
            return ((h_checkpoint_live.accl_yb) & 0xff);
        }
        else {
            return ((h_checkpoint_live.shift_reg) & 0xff);
        }
    }
    function method_test_w(runtime, state) {
        const members = runtime.members;
    }
    function method_accl_w(runtime, state) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        if (((Number((members.m_accl ?? 0)) !== Number(state)) ? 1 : 0)) {
            method_live_sync(runtime);
            members.m_accl = (((h_cur_live.accl = ((state) | 0))) | 0);
            method_checkpoint(runtime);
            0;
            method_live_run(runtime);
        }
    }
    function method_ted_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        if (((Number((members.m_ted ?? 0)) !== Number(state)) ? 1 : 0)) {
            method_live_sync(runtime);
            if (((((((((((members.m_ted ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) && (h_cur_live.accl)) ? 1 : 0)) && (((h_cur_live.byte) ? 0 : 1))) ? 1 : 0)) {
                h_cur_live.byte = ((1) | 0);
                (__l["m_write_byte"] ? __l["m_write_byte"](Number(h_cur_live.byte)) : typeof members.m_write_byte === 'function' ? members.m_write_byte(h_cur_live.byte) : runtime.invoke("m_write_byte", h_cur_live.byte));
            }
            members.m_ted = ((state) | 0);
            method_checkpoint(runtime);
            0;
            method_live_run(runtime);
        }
    }
    function method_mtr_w(runtime, state) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        if (((Number((members.m_mtr ?? 0)) !== Number(state)) ? 1 : 0)) {
            method_live_sync(runtime);
            members.m_mtr = ((state) | 0);
            0;
            ((runtime.dereference(members.m_floppy)).mon_w?.(((state) ? 0 : 1)) ?? 0);
            method_checkpoint(runtime);
            if ((members.m_mtr ?? 0)) {
                if (((Number(h_cur_live.state) === Number(0)) ? 1 : 0)) {
                    method_live_start(runtime);
                }
            }
            else {
                method_live_abort(runtime);
            }
            method_live_run(runtime);
        }
    }
    function method_live_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        h_cur_live.tm = ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        h_cur_live.state = ((1) | 0);
        h_cur_live.next_state = ((-1) | 0);
        h_cur_live.shift_reg = ((0) & 0xffff);
        h_cur_live.shift_reg_write = ((0) & 0xff);
        h_cur_live.cycle_counter = ((0) | 0);
        h_cur_live.cell_counter = ((0) | 0);
        h_cur_live.bit_counter = ((0) | 0);
        h_cur_live.ds = (((members.m_ds ?? 0)) | 0);
        h_cur_live.oe = (((members.m_oe ?? 0)) | 0);
        h_cur_live.soe = (((members.m_soe ?? 0)) | 0);
        h_cur_live.accl = (((members.m_accl ?? 0)) | 0);
        h_cur_live.zero_counter = ((0) | 0);
        h_cur_live.cycles_until_random_flux = ((runtime.add(((((__l["machine().rand"] ?? globalThis.mamekitMissingCall?.("machine().rand"))?.() ?? 0)) % (31)), 289)) | 0);
        struct_copy_live_info(members.checkpoint_live, h_cur_live);
        method_live_run(runtime);
    }
    function method_live_abort(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        if (((((((typeof h_cur_live.tm === 'number' ? ((h_cur_live.tm) === Infinity ? 1 : 0) : ((runtime.dereference(h_cur_live.tm)).is_never?.() ?? 0))) ? 0 : 1)) && (((Number(h_cur_live.tm) > Number(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            method_rollback(runtime);
            method_live_run(runtime, ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0));
        }
        method_stop_writing(runtime, h_cur_live.tm);
        h_cur_live.tm = Infinity;
        h_cur_live.state = ((0) | 0);
        h_cur_live.next_state = ((-1) | 0);
        h_cur_live.write_position = ((0) | 0);
        h_cur_live.write_start_time = Infinity;
        h_cur_live.sync = ((1) | 0);
        h_cur_live.byte = ((1) | 0);
    }
    function method_oe_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_cur_live = members.cur_live ?? 0;
        if (((Number((members.m_oe ?? 0)) !== Number(state)) ? 1 : 0)) {
            method_live_sync(runtime);
            members.m_oe = (((h_cur_live.oe = ((state) | 0))) | 0);
            if ((members.m_oe ?? 0)) {
                method_stop_writing(runtime, ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0));
            }
            else {
                method_start_writing(runtime, ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0));
            }
            method_checkpoint(runtime);
            0;
            method_live_run(runtime);
        }
    }
    function method_start_writing(runtime, tm) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        h_cur_live.write_start_time = tm;
        h_cur_live.write_position = ((0) | 0);
    }
    function method_soe_w(runtime, state) {
        const members = runtime.members;
        const h_cur_live = members.cur_live ?? 0;
        if (((Number((members.m_soe ?? 0)) !== Number(state)) ? 1 : 0)) {
            method_live_sync(runtime);
            members.m_soe = (((h_cur_live.soe = ((state) | 0))) | 0);
            method_checkpoint(runtime);
            0;
            method_live_run(runtime);
        }
    }
    function method_atni_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        members.m_atni = ((state) | 0);
        (__l["m_write_atn"] ? __l["m_write_atn"](Number((((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0))))) : typeof members.m_write_atn === 'function' ? members.m_write_atn((((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0)))) : runtime.invoke("m_write_atn", (((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0)))));
    }
    function method_atna_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        members.m_atna = ((state) | 0);
        (__l["m_write_atn"] ? __l["m_write_atn"](Number((((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0))))) : typeof members.m_write_atn === 'function' ? members.m_write_atn((((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0)))) : runtime.invoke("m_write_atn", (((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0)))));
    }
    function method_set_floppy(runtime, floppy) {
        const members = runtime.members;
        members.m_floppy = floppy;
    }
    function method_update_tick(runtime, param) {
        const members = runtime.members;
        method_live_sync(runtime);
        method_live_run(runtime);
    }
    function method_atn_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_atn)).bind === 'function' ? (runtime.dereference(members.m_write_atn)).bind() : typeof (runtime.dereference(members.m_write_atn)).bind === 'number' || typeof (runtime.dereference(members.m_write_atn)).bind === 'boolean' ? (runtime.dereference(members.m_write_atn)).bind : runtime.container(members.m_write_atn, "bind"));
    }
    function method_sync_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_sync)).bind === 'function' ? (runtime.dereference(members.m_write_sync)).bind() : typeof (runtime.dereference(members.m_write_sync)).bind === 'number' || typeof (runtime.dereference(members.m_write_sync)).bind === 'boolean' ? (runtime.dereference(members.m_write_sync)).bind : runtime.container(members.m_write_sync, "bind"));
    }
    function method_byte_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_byte)).bind === 'function' ? (runtime.dereference(members.m_write_byte)).bind() : typeof (runtime.dereference(members.m_write_byte)).bind === 'number' || typeof (runtime.dereference(members.m_write_byte)).bind === 'boolean' ? (runtime.dereference(members.m_write_byte)).bind : runtime.container(members.m_write_byte, "bind"));
    }
    function method_sync_r(runtime) {
        const members = runtime.members;
        const h_checkpoint_live = members.checkpoint_live ?? 0;
        return h_checkpoint_live.sync;
    }
    function method_byte_r(runtime) {
        const members = runtime.members;
        const h_checkpoint_live = members.checkpoint_live ?? 0;
        return h_checkpoint_live.byte;
    }
    function method_atn_r(runtime) {
        const members = runtime.members;
        return (((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0)));
    }
    function method_c64h156_device__atn_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_atn)).bind === 'function' ? (runtime.dereference(members.m_write_atn)).bind() : typeof (runtime.dereference(members.m_write_atn)).bind === 'number' || typeof (runtime.dereference(members.m_write_atn)).bind === 'boolean' ? (runtime.dereference(members.m_write_atn)).bind : runtime.container(members.m_write_atn, "bind"));
    }
    function method_c64h156_device__sync_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_sync)).bind === 'function' ? (runtime.dereference(members.m_write_sync)).bind() : typeof (runtime.dereference(members.m_write_sync)).bind === 'number' || typeof (runtime.dereference(members.m_write_sync)).bind === 'boolean' ? (runtime.dereference(members.m_write_sync)).bind : runtime.container(members.m_write_sync, "bind"));
    }
    function method_c64h156_device__byte_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_byte)).bind === 'function' ? (runtime.dereference(members.m_write_byte)).bind() : typeof (runtime.dereference(members.m_write_byte)).bind === 'number' || typeof (runtime.dereference(members.m_write_byte)).bind === 'boolean' ? (runtime.dereference(members.m_write_byte)).bind : runtime.container(members.m_write_byte, "bind"));
    }
    function method_c64h156_device__sync_r(runtime) {
        const members = runtime.members;
        const h_checkpoint_live = members.checkpoint_live ?? 0;
        return h_checkpoint_live.sync;
    }
    function method_c64h156_device__byte_r(runtime) {
        const members = runtime.members;
        const h_checkpoint_live = members.checkpoint_live ?? 0;
        return h_checkpoint_live.byte;
    }
    function method_c64h156_device__atn_r(runtime) {
        const members = runtime.members;
        return (((members.m_atni ?? 0)) ^ ((members.m_atna ?? 0)));
    }
    return {
        "live_delay": method_live_delay,
        "live_sync": method_live_sync,
        "rollback": method_rollback,
        "get_next_edge": method_get_next_edge,
        "live_run": method_live_run,
        "get_next_bit": method_get_next_bit,
        "write_next_bit": method_write_next_bit,
        "commit": method_commit,
        "checkpoint": method_checkpoint,
        "stop_writing": method_stop_writing,
        "yb_r": method_yb_r,
        "test_w": method_test_w,
        "accl_w": method_accl_w,
        "ted_w": method_ted_w,
        "mtr_w": method_mtr_w,
        "live_start": method_live_start,
        "live_abort": method_live_abort,
        "oe_w": method_oe_w,
        "start_writing": method_start_writing,
        "soe_w": method_soe_w,
        "atni_w": method_atni_w,
        "atna_w": method_atna_w,
        "set_floppy": method_set_floppy,
        "update_tick": method_update_tick,
        "atn_callback": method_atn_callback,
        "sync_callback": method_sync_callback,
        "byte_callback": method_byte_callback,
        "sync_r": method_sync_r,
        "byte_r": method_byte_r,
        "atn_r": method_atn_r,
        "c64h156_device::atn_callback": method_c64h156_device__atn_callback,
        "c64h156_device::sync_callback": method_c64h156_device__sync_callback,
        "c64h156_device::byte_callback": method_c64h156_device__byte_callback,
        "c64h156_device::sync_r": method_c64h156_device__sync_r,
        "c64h156_device::byte_r": method_c64h156_device__byte_r,
        "c64h156_device::atn_r": method_c64h156_device__atn_r
    };
})();
definition.compiledMethodLinks = ["m_write_atn", "m_write_byte", "m_write_sync", "machine", "machine().rand", "machine().time"];
export const device = definition;
export default device;
