import deviceData from './mos6526.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_update_pa(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let pa = (((((members.m_pra ?? runtime.member("m_pra"))) | ((((members.m_pa_in ?? runtime.member("m_pa_in"))) & ((~(members.m_ddra ?? runtime.member("m_ddra")))))))) & 0xff);
        if (((Number((members.m_pa ?? runtime.member("m_pa"))) !== Number(pa)) ? 1 : 0)) {
            members.m_pa = ((pa) & 0xff);
            (__l["m_write_pa"] ? __l["m_write_pa"](Number(0), Number(pa)) : typeof members.m_write_pa === 'function' ? members.m_write_pa(0, pa) : runtime.invoke("m_write_pa", 0, pa));
        }
    }
    function method_update_pb(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let pb = (((((members.m_prb ?? runtime.member("m_prb"))) | ((((members.m_pb_in ?? runtime.member("m_pb_in"))) & ((~(members.m_ddrb ?? runtime.member("m_ddrb")))))))) & 0xff);
        if (((((members.m_cra ?? runtime.member("m_cra"))) >>> (1)) & 1)) {
            let pb6 = ((((((((members.m_cra ?? runtime.member("m_cra"))) >>> (2)) & 1)) ? ((members.m_ta_pb6 ?? runtime.member("m_ta_pb6"))) : ((members.m_ta_out ?? runtime.member("m_ta_out"))))) | 0);
            pb = ((runtime.andAssign(pb, -65)) & 0xff);
            pb = ((((pb) | (((pb6) << (6))))) & 0xff);
        }
        if (((((members.m_crb ?? runtime.member("m_crb"))) >>> (1)) & 1)) {
            let pb7 = ((((((((members.m_crb ?? runtime.member("m_crb"))) >>> (2)) & 1)) ? ((members.m_tb_pb7 ?? runtime.member("m_tb_pb7"))) : ((members.m_tb_out ?? runtime.member("m_tb_out"))))) | 0);
            pb = ((runtime.andAssign(pb, -129)) & 0xff);
            pb = ((((pb) | (((pb7) << (7))))) & 0xff);
        }
        if (((Number((members.m_pb ?? runtime.member("m_pb"))) !== Number(pb)) ? 1 : 0)) {
            (__l["m_write_pb"] ? __l["m_write_pb"](Number(0), Number(pb)) : typeof members.m_write_pb === 'function' ? members.m_write_pb(0, pb) : runtime.invoke("m_write_pb", 0, pb));
            members.m_pb = ((pb) & 0xff);
        }
    }
    function method_set_cra(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((((((((members.m_cra ?? runtime.member("m_cra"))) >>> (0)) & 1)) ? 0 : 1)) && (((data) & (1)))) ? 1 : 0)) {
            members.m_ta_pb6 = ((1) | 0);
        }
        if ((((((((((members.m_cra ?? runtime.member("m_cra"))) >>> (6)) & 1)) ? 0 : 1)) && ((((data) >>> (6)) & 1))) ? 1 : 0)) {
            members.m_bits = ((0) | 0);
            (__l["m_write_sp"] ? __l["m_write_sp"](Number(1)) : typeof members.m_write_sp === 'function' ? members.m_write_sp(1) : runtime.invoke("m_write_sp", 1));
        }
        if ((((((((members.m_cra ?? runtime.member("m_cra"))) >>> (6)) & 1)) && ((((((data) >>> (6)) & 1)) ? 0 : 1))) ? 1 : 0)) {
            members.m_bits = ((0) | 0);
            (__l["m_write_sp"] ? __l["m_write_sp"](Number(0)) : typeof members.m_write_sp === 'function' ? members.m_write_sp(0) : runtime.invoke("m_write_sp", 0));
        }
        members.m_cra = ((data) & 0xff);
        method_update_pb(runtime);
    }
    function method_set_crb(runtime, data) {
        const members = runtime.members;
        if ((((((((((members.m_crb ?? runtime.member("m_crb"))) >>> (0)) & 1)) ? 0 : 1)) && (((data) & (1)))) ? 1 : 0)) {
            members.m_tb_pb7 = ((1) | 0);
        }
        members.m_crb = ((data) & 0xff);
        method_update_pb(runtime);
    }
    function method_bcd_increment(runtime, value) {
        const members = runtime.members;
        value = ((((value) + (1))) & 0xff);
        if (((Number(((value) & (15))) >= Number(10)) ? 1 : 0)) {
            value = ((((value) + (6))) & 0xff);
        }
        return value;
    }
    function method_clock_tod(runtime) {
        const members = runtime.members;
        let subsecond = (((((((members.m_tod ?? runtime.member("m_tod"))) >>> (0))) & 0xff)) & 0xff);
        let second = (((((((members.m_tod ?? runtime.member("m_tod"))) >>> (8))) & 0xff)) & 0xff);
        let minute = (((((((members.m_tod ?? runtime.member("m_tod"))) >>> (16))) & 0xff)) & 0xff);
        let hour = (((((((members.m_tod ?? runtime.member("m_tod"))) >>> (24))) & 0xff)) & 0xff);
        members.m_tod_count = ((((members.m_tod_count) + (1))) | 0);
        if (((Number((members.m_tod_count ?? runtime.member("m_tod_count"))) === Number(((((((members.m_cra ?? runtime.member("m_cra"))) >>> (7)) & 1)) ? (5) : (6)))) ? 1 : 0)) {
            members.m_tod_count = ((0) | 0);
            subsecond = ((method_bcd_increment(runtime, subsecond)) & 0xff);
            if (((Number(subsecond) >= Number(16)) ? 1 : 0)) {
                subsecond = ((0) & 0xff);
                second = ((method_bcd_increment(runtime, second)) & 0xff);
                if (((Number(second) >= Number(60)) ? 1 : 0)) {
                    second = ((0) & 0xff);
                    minute = ((method_bcd_increment(runtime, minute)) & 0xff);
                    if (((Number(minute) >= Number(96)) ? 1 : 0)) {
                        minute = ((0) & 0xff);
                        let pm = ((((hour) & (128))) | 0);
                        hour = ((runtime.andAssign(hour, 31)) & 0xff);
                        if (((Number(hour) === Number(11)) ? 1 : 0)) {
                            pm = ((((pm) ^ (128))) | 0);
                        }
                        if (((Number(hour) === Number(12)) ? 1 : 0)) {
                            hour = ((0) & 0xff);
                        }
                        hour = ((method_bcd_increment(runtime, hour)) & 0xff);
                        hour = ((((hour) | (pm))) & 0xff);
                    }
                }
            }
        }
        members.m_tod = ((((((((((((subsecond) >>> 0)) << (0))) | (((((second) >>> 0)) << (8))))) | (((((minute) >>> 0)) << (16))))) | (((((hour) >>> 0)) << (24))))) >>> 0);
    }
    function method_read_tod(runtime, offset) {
        const members = runtime.members;
        let shift = ((((8) * (offset))) | 0);
        if ((members.m_tod_latched ?? runtime.member("m_tod_latched"))) {
            return (((members.m_tod_latch ?? runtime.member("m_tod_latch"))) >>> (shift));
        }
        else {
            return (((members.m_tod ?? runtime.member("m_tod"))) >>> (shift));
        }
    }
    function method_write_tod(runtime, offset, data) {
        const members = runtime.members;
        let shift = ((((8) * (offset))) | 0);
        if (((((members.m_crb ?? runtime.member("m_crb"))) >>> (7)) & 1)) {
            members.m_alarm = (((((((members.m_alarm ?? runtime.member("m_alarm"))) & ((~((255) << (shift)))))) | (((data) << (shift))))) >>> 0);
        }
        else {
            members.m_tod = (((((((members.m_tod ?? runtime.member("m_tod"))) & ((~((255) << (shift)))))) | (((data) << (shift))))) >>> 0);
        }
    }
    function method_serial_input(runtime) {
        const members = runtime.members;
        members.m_shift = ((((members.m_shift) << (1))) & 0xff);
        members.m_bits = ((((members.m_bits) + (1))) | 0);
        members.m_shift = ((((members.m_shift) | ((members.m_sp ?? runtime.member("m_sp"))))) & 0xff);
        if (((Number((members.m_bits ?? runtime.member("m_bits"))) === Number(8)) ? 1 : 0)) {
            members.m_sdr = (((members.m_shift ?? runtime.member("m_shift"))) & 0xff);
            members.m_bits = ((0) | 0);
            members.m_icr = ((((members.m_icr) | (8))) & 0xff);
        }
    }
    function method_clock_ta(runtime) {
        const members = runtime.members;
        if ((members.m_count_a3 ?? runtime.member("m_count_a3"))) {
            members.m_ta = ((((members.m_ta) - (1))) & 0xffff);
        }
        members.m_ta_out = ((((((members.m_count_a2 ?? runtime.member("m_count_a2"))) && ((((members.m_ta ?? runtime.member("m_ta"))) ? 0 : 1))) ? 1 : 0)) | 0);
        if ((members.m_ta_out ?? runtime.member("m_ta_out"))) {
            members.m_ta_pb6 = (((((members.m_ta_pb6 ?? runtime.member("m_ta_pb6"))) ? 0 : 1)) | 0);
            if ((((((((members.m_cra ?? runtime.member("m_cra"))) >>> (3)) & 1)) || ((members.m_oneshot_a0 ?? runtime.member("m_oneshot_a0")))) ? 1 : 0)) {
                members.m_cra = ((runtime.andAssign(members.m_cra, (~1))) & 0xff);
                members.m_count_a0 = (((members.m_count_a1 = (((members.m_count_a2 = ((0) | 0))) | 0))) | 0);
            }
            members.m_load_a1 = ((1) | 0);
        }
        if ((members.m_load_a1 ?? runtime.member("m_load_a1"))) {
            members.m_count_a2 = ((0) | 0);
            members.m_ta = (((members.m_ta_latch ?? runtime.member("m_ta_latch"))) & 0xffff);
        }
    }
    function method_serial_output(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((((members.m_ta_out ?? runtime.member("m_ta_out"))) && (((((members.m_cra ?? runtime.member("m_cra"))) >>> (6)) & 1))) ? 1 : 0)) {
            if (((((((members.m_sdr_empty ?? runtime.member("m_sdr_empty"))) ? 0 : 1)) || ((members.m_bits ?? runtime.member("m_bits")))) ? 1 : 0)) {
                if ((members.m_cnt ?? runtime.member("m_cnt"))) {
                    if (((Number((members.m_bits ?? runtime.member("m_bits"))) === Number(0)) ? 1 : 0)) {
                        members.m_sdr_empty = ((1) ? 1 : 0);
                        members.m_shift = (((members.m_sdr ?? runtime.member("m_sdr"))) & 0xff);
                    }
                    members.m_sp = ((((((members.m_shift ?? runtime.member("m_shift"))) >>> (7)) & 1)) | 0);
                    (__l["m_write_sp"] ? __l["m_write_sp"](Number((members.m_sp ?? runtime.member("m_sp")))) : typeof members.m_write_sp === 'function' ? members.m_write_sp((members.m_sp ?? runtime.member("m_sp"))) : runtime.invoke("m_write_sp", (members.m_sp ?? runtime.member("m_sp"))));
                    members.m_shift = ((((members.m_shift) << (1))) & 0xff);
                    members.m_bits = ((((members.m_bits) + (1))) | 0);
                    if (((Number((members.m_bits ?? runtime.member("m_bits"))) === Number(8)) ? 1 : 0)) {
                        members.m_icr = ((((members.m_icr) | (8))) & 0xff);
                    }
                }
                else {
                    if (((Number((members.m_bits ?? runtime.member("m_bits"))) === Number(8)) ? 1 : 0)) {
                        members.m_bits = ((0) | 0);
                    }
                }
                members.m_cnt = (((((members.m_cnt ?? runtime.member("m_cnt"))) ? 0 : 1)) | 0);
                (__l["m_write_cnt"] ? __l["m_write_cnt"](Number((members.m_cnt ?? runtime.member("m_cnt")))) : typeof members.m_write_cnt === 'function' ? members.m_write_cnt((members.m_cnt ?? runtime.member("m_cnt"))) : runtime.invoke("m_write_cnt", (members.m_cnt ?? runtime.member("m_cnt"))));
            }
        }
    }
    function method_clock_tb(runtime) {
        const members = runtime.members;
        if ((members.m_count_b3 ?? runtime.member("m_count_b3"))) {
            members.m_tb = ((((members.m_tb) - (1))) & 0xffff);
        }
        members.m_tb_out = ((((((members.m_count_b2 ?? runtime.member("m_count_b2"))) && ((((members.m_tb ?? runtime.member("m_tb"))) ? 0 : 1))) ? 1 : 0)) | 0);
        if ((members.m_tb_out ?? runtime.member("m_tb_out"))) {
            members.m_tb_pb7 = (((((members.m_tb_pb7 ?? runtime.member("m_tb_pb7"))) ? 0 : 1)) | 0);
            if ((((((((members.m_crb ?? runtime.member("m_crb"))) >>> (3)) & 1)) || ((members.m_oneshot_b0 ?? runtime.member("m_oneshot_b0")))) ? 1 : 0)) {
                members.m_crb = ((runtime.andAssign(members.m_crb, (~1))) & 0xff);
                members.m_count_b0 = (((members.m_count_b1 = (((members.m_count_b2 = ((0) | 0))) | 0))) | 0);
            }
            members.m_load_b1 = ((1) | 0);
        }
        if ((members.m_load_b1 ?? runtime.member("m_load_b1"))) {
            members.m_count_b2 = ((0) | 0);
            members.m_tb = (((members.m_tb_latch ?? runtime.member("m_tb_latch"))) & 0xffff);
        }
    }
    function method_update_interrupt(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((((((members.m_irq ?? runtime.member("m_irq"))) ? 0 : 1)) && ((members.m_ir1 ?? runtime.member("m_ir1")))) ? 1 : 0)) {
            (__l["m_write_irq"] ? __l["m_write_irq"](Number(1)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(1) : runtime.invoke("m_write_irq", 1));
            members.m_irq = ((1) ? 1 : 0);
        }
        if ((members.m_ta_out ?? runtime.member("m_ta_out"))) {
            members.m_icr = ((((members.m_icr) | (1))) & 0xff);
        }
        if ((members.m_tb_out ?? runtime.member("m_tb_out"))) {
            members.m_icr = ((((members.m_icr) | (2))) & 0xff);
        }
    }
    function method_clock_pipeline(runtime) {
        const members = runtime.members;
        members.m_count_a3 = (((members.m_count_a2 ?? runtime.member("m_count_a2"))) | 0);
        if (((Number(((((members.m_cra ?? runtime.member("m_cra"))) >>> (5)) & 1)) === Number(0)) ? 1 : 0)) {
            members.m_count_a2 = ((1) | 0);
        }
        members.m_count_a2 = ((runtime.andAssign(members.m_count_a2, ((((members.m_cra ?? runtime.member("m_cra"))) >>> (0)) & 1))) | 0);
        members.m_count_a1 = (((members.m_count_a0 ?? runtime.member("m_count_a0"))) | 0);
        members.m_count_a0 = ((0) | 0);
        members.m_load_a2 = (((members.m_load_a1 ?? runtime.member("m_load_a1"))) | 0);
        members.m_load_a1 = (((members.m_load_a0 ?? runtime.member("m_load_a0"))) | 0);
        members.m_load_a0 = ((((((members.m_cra ?? runtime.member("m_cra"))) >>> (4)) & 1)) | 0);
        members.m_cra = ((runtime.andAssign(members.m_cra, -17)) & 0xff);
        members.m_oneshot_a0 = ((((((members.m_cra ?? runtime.member("m_cra"))) >>> (3)) & 1)) | 0);
        members.m_count_b3 = (((members.m_count_b2 ?? runtime.member("m_count_b2"))) | 0);
        switch ((((((members.m_crb ?? runtime.member("m_crb"))) & (96))) >>> (5))) {
            case 0:
                {
                    members.m_count_b2 = ((1) | 0);
                    break;
                }
            case 2:
                {
                    members.m_count_b2 = (((members.m_ta_out ?? runtime.member("m_ta_out"))) | 0);
                    break;
                }
            case 3:
                {
                    members.m_count_b2 = ((((((members.m_ta_out ?? runtime.member("m_ta_out"))) && ((members.m_cnt ?? runtime.member("m_cnt")))) ? 1 : 0)) | 0);
                    break;
                }
        }
        members.m_count_b2 = ((runtime.andAssign(members.m_count_b2, ((((members.m_crb ?? runtime.member("m_crb"))) >>> (0)) & 1))) | 0);
        members.m_count_b1 = (((members.m_count_b0 ?? runtime.member("m_count_b0"))) | 0);
        members.m_count_b0 = ((0) | 0);
        members.m_load_b2 = (((members.m_load_b1 ?? runtime.member("m_load_b1"))) | 0);
        members.m_load_b1 = (((members.m_load_b0 ?? runtime.member("m_load_b0"))) | 0);
        members.m_load_b0 = ((((((members.m_crb ?? runtime.member("m_crb"))) >>> (4)) & 1)) | 0);
        members.m_crb = ((runtime.andAssign(members.m_crb, -17)) & 0xff);
        members.m_oneshot_b0 = ((((((members.m_crb ?? runtime.member("m_crb"))) >>> (3)) & 1)) | 0);
        if ((members.m_ir0 ?? runtime.member("m_ir0"))) {
            members.m_ir1 = ((1) | 0);
        }
        members.m_ir0 = (((((((members.m_icr ?? runtime.member("m_icr"))) & ((members.m_imr ?? runtime.member("m_imr"))))) ? (1) : (0))) | 0);
    }
    function method_synchronize(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((members.m_pc ?? runtime.member("m_pc"))) ? 0 : 1)) {
            members.m_pc = ((1) | 0);
            (__l["m_write_pc"] ? __l["m_write_pc"](Number((members.m_pc ?? runtime.member("m_pc")))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? runtime.member("m_pc"))) : runtime.invoke("m_write_pc", (members.m_pc ?? runtime.member("m_pc"))));
        }
        method_clock_ta(runtime);
        method_serial_output(runtime);
        method_clock_tb(runtime);
        method_update_pb(runtime);
        method_update_interrupt(runtime);
        method_clock_pipeline(runtime);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_irq = ((0) ? 1 : 0);
        members.m_ir0 = ((0) | 0);
        members.m_ir1 = ((0) | 0);
        members.m_icr = ((0) & 0xff);
        members.m_imr = ((0) & 0xff);
        members.m_pc = ((1) | 0);
        members.m_flag = ((1) | 0);
        members.m_pra = ((0) & 0xff);
        members.m_prb = ((0) & 0xff);
        members.m_ddra = ((0) & 0xff);
        members.m_ddrb = ((0) & 0xff);
        members.m_pa = ((255) & 0xff);
        members.m_pb = ((255) & 0xff);
        members.m_pa_in = ((0) & 0xff);
        members.m_pb_in = ((0) & 0xff);
        members.m_sp = ((1) | 0);
        members.m_cnt = ((1) | 0);
        members.m_sdr = ((0) & 0xff);
        members.m_shift = ((0) & 0xff);
        members.m_sdr_empty = ((1) ? 1 : 0);
        members.m_bits = ((0) | 0);
        members.m_ta_out = ((0) | 0);
        members.m_tb_out = ((0) | 0);
        members.m_ta_pb6 = ((0) | 0);
        members.m_tb_pb7 = ((0) | 0);
        members.m_count_a0 = ((0) | 0);
        members.m_count_a1 = ((0) | 0);
        members.m_count_a2 = ((0) | 0);
        members.m_count_a3 = ((0) | 0);
        members.m_load_a0 = ((0) | 0);
        members.m_load_a1 = ((0) | 0);
        members.m_load_a2 = ((0) | 0);
        members.m_oneshot_a0 = ((0) | 0);
        members.m_count_b0 = ((0) | 0);
        members.m_count_b1 = ((0) | 0);
        members.m_count_b2 = ((0) | 0);
        members.m_count_b3 = ((0) | 0);
        members.m_load_b0 = ((0) | 0);
        members.m_load_b1 = ((0) | 0);
        members.m_load_b2 = ((0) | 0);
        members.m_oneshot_b0 = ((0) | 0);
        members.m_ta = ((65535) & 0xffff);
        members.m_tb = ((65535) & 0xffff);
        members.m_ta_latch = ((65535) & 0xffff);
        members.m_tb_latch = ((65535) & 0xffff);
        members.m_cra = ((0) & 0xff);
        members.m_crb = ((0) & 0xff);
        members.m_tod_count = ((0) | 0);
        members.m_tod = ((16777216) >>> 0);
        members.m_tod_latch = ((0) >>> 0);
        members.m_alarm = ((0) >>> 0);
        members.m_tod_stopped = ((1) ? 1 : 0);
        members.m_tod_latched = ((0) ? 1 : 0);
        (__l["m_write_irq"] ? __l["m_write_irq"](Number(0)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(0) : runtime.invoke("m_write_irq", 0));
        (__l["m_write_pc"] ? __l["m_write_pc"](Number((members.m_pc ?? runtime.member("m_pc")))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? runtime.member("m_pc"))) : runtime.invoke("m_write_pc", (members.m_pc ?? runtime.member("m_pc"))));
        (__l["m_write_sp"] ? __l["m_write_sp"](Number((members.m_sp ?? runtime.member("m_sp")))) : typeof members.m_write_sp === 'function' ? members.m_write_sp((members.m_sp ?? runtime.member("m_sp"))) : runtime.invoke("m_write_sp", (members.m_sp ?? runtime.member("m_sp"))));
        (__l["m_write_cnt"] ? __l["m_write_cnt"](Number((members.m_cnt ?? runtime.member("m_cnt")))) : typeof members.m_write_cnt === 'function' ? members.m_write_cnt((members.m_cnt ?? runtime.member("m_cnt"))) : runtime.invoke("m_write_cnt", (members.m_cnt ?? runtime.member("m_cnt"))));
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        do {
            method_synchronize(runtime);
            members.m_icount = ((((members.m_icount) - (1))) | 0);
        } while (((Number((members.m_icount ?? runtime.member("m_icount"))) > Number(0)) ? 1 : 0));
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let data = ((0) & 0xff);
        switch (((offset) & (15))) {
            case 0:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    if (((Number((members.m_ddra ?? runtime.member("m_ddra"))) !== Number(255)) ? 1 : 0)) {
                        data = (((((((__l["m_read_pa"] ? __l["m_read_pa"](Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((~(members.m_ddra ?? runtime.member("m_ddra")))))) | ((((members.m_pra ?? runtime.member("m_pra"))) & ((members.m_ddra ?? runtime.member("m_ddra"))))))) & 0xff);
                    }
                    else {
                        data = (((((__l["m_read_pa"] ? __l["m_read_pa"](Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((members.m_pra ?? runtime.member("m_pra"))))) & 0xff);
                    }
                    members.m_pa_in = ((data) & 0xff);
                    break;
                }
            case 1:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    if (((Number((members.m_ddrb ?? runtime.member("m_ddrb"))) !== Number(255)) ? 1 : 0)) {
                        data = (((((((__l["m_read_pb"] ? __l["m_read_pb"](Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((~(members.m_ddrb ?? runtime.member("m_ddrb")))))) | ((((members.m_prb ?? runtime.member("m_prb"))) & ((members.m_ddrb ?? runtime.member("m_ddrb"))))))) & 0xff);
                    }
                    else {
                        data = (((((__l["m_read_pb"] ? __l["m_read_pb"](Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((members.m_prb ?? runtime.member("m_prb"))))) & 0xff);
                    }
                    members.m_pb_in = ((data) & 0xff);
                    if (((((members.m_cra ?? runtime.member("m_cra"))) >>> (1)) & 1)) {
                        let pb6 = ((((((((members.m_cra ?? runtime.member("m_cra"))) >>> (2)) & 1)) ? ((members.m_ta_pb6 ?? runtime.member("m_ta_pb6"))) : ((members.m_ta_out ?? runtime.member("m_ta_out"))))) | 0);
                        data = ((runtime.andAssign(data, -65)) & 0xff);
                        data = ((((data) | (((pb6) << (6))))) & 0xff);
                    }
                    if (((((members.m_crb ?? runtime.member("m_crb"))) >>> (1)) & 1)) {
                        let pb7 = ((((((((members.m_crb ?? runtime.member("m_crb"))) >>> (2)) & 1)) ? ((members.m_tb_pb7 ?? runtime.member("m_tb_pb7"))) : ((members.m_tb_out ?? runtime.member("m_tb_out"))))) | 0);
                        data = ((runtime.andAssign(data, -129)) & 0xff);
                        data = ((((data) | (((pb7) << (7))))) & 0xff);
                    }
                    members.m_pc = ((0) | 0);
                    (__l["m_write_pc"] ? __l["m_write_pc"](Number((members.m_pc ?? runtime.member("m_pc")))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? runtime.member("m_pc"))) : runtime.invoke("m_write_pc", (members.m_pc ?? runtime.member("m_pc"))));
                    break;
                }
            case 2:
                {
                    data = (((members.m_ddra ?? runtime.member("m_ddra"))) & 0xff);
                    break;
                }
            case 3:
                {
                    data = (((members.m_ddrb ?? runtime.member("m_ddrb"))) & 0xff);
                    break;
                }
            case 4:
                {
                    data = (((((members.m_ta ?? runtime.member("m_ta"))) & (255))) & 0xff);
                    break;
                }
            case 5:
                {
                    data = (((((members.m_ta ?? runtime.member("m_ta"))) >>> (8))) & 0xff);
                    break;
                }
            case 6:
                {
                    data = (((((members.m_tb ?? runtime.member("m_tb"))) & (255))) & 0xff);
                    break;
                }
            case 7:
                {
                    data = (((((members.m_tb ?? runtime.member("m_tb"))) >>> (8))) & 0xff);
                    break;
                }
            case 8:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    data = ((method_read_tod(runtime, 0)) & 0xff);
                    members.m_tod_latched = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    data = ((method_read_tod(runtime, 1)) & 0xff);
                    break;
                }
            case 10:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    data = ((method_read_tod(runtime, 2)) & 0xff);
                    break;
                }
            case 11:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    if ((((members.m_tod_latched ?? runtime.member("m_tod_latched"))) ? 0 : 1)) {
                        members.m_tod_latched = ((1) ? 1 : 0);
                        members.m_tod_latch = (((members.m_tod ?? runtime.member("m_tod"))) >>> 0);
                    }
                    data = ((method_read_tod(runtime, 3)) & 0xff);
                    break;
                }
            case 12:
                {
                    data = (((members.m_sdr ?? runtime.member("m_sdr"))) & 0xff);
                    break;
                }
            case 13:
                {
                    data = (((((((members.m_ir1 ?? runtime.member("m_ir1"))) << (7))) | ((members.m_icr ?? runtime.member("m_icr"))))) & 0xff);
                    if (((((__l["machine().side_effects_disabled"]?.() ?? 0)) || ((((members.m_icr ?? runtime.member("m_icr"))) ? 0 : 1))) ? 1 : 0)) {
                        return data;
                    }
                    members.m_ir0 = ((0) | 0);
                    members.m_ir1 = ((0) | 0);
                    members.m_icr = ((0) & 0xff);
                    members.m_irq = ((0) ? 1 : 0);
                    (__l["m_write_irq"] ? __l["m_write_irq"](Number(0)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(0) : runtime.invoke("m_write_irq", 0));
                    break;
                }
            case 14:
                {
                    data = (((members.m_cra ?? runtime.member("m_cra"))) & 0xff);
                    break;
                }
            case 15:
                {
                    data = (((members.m_crb ?? runtime.member("m_crb"))) & 0xff);
                    break;
                }
        }
        return data;
    }
    function method_mos6526_device__read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let data = ((0) & 0xff);
        switch (((offset) & (15))) {
            case 0:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    if (((Number((members.m_ddra ?? runtime.member("m_ddra"))) !== Number(255)) ? 1 : 0)) {
                        data = (((((((__l["m_read_pa"] ? __l["m_read_pa"](Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((~(members.m_ddra ?? runtime.member("m_ddra")))))) | ((((members.m_pra ?? runtime.member("m_pra"))) & ((members.m_ddra ?? runtime.member("m_ddra"))))))) & 0xff);
                    }
                    else {
                        data = (((((__l["m_read_pa"] ? __l["m_read_pa"](Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((members.m_pra ?? runtime.member("m_pra"))))) & 0xff);
                    }
                    members.m_pa_in = ((data) & 0xff);
                    break;
                }
            case 1:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    if (((Number((members.m_ddrb ?? runtime.member("m_ddrb"))) !== Number(255)) ? 1 : 0)) {
                        data = (((((((__l["m_read_pb"] ? __l["m_read_pb"](Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((~(members.m_ddrb ?? runtime.member("m_ddrb")))))) | ((((members.m_prb ?? runtime.member("m_prb"))) & ((members.m_ddrb ?? runtime.member("m_ddrb"))))))) & 0xff);
                    }
                    else {
                        data = (((((__l["m_read_pb"] ? __l["m_read_pb"](Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((members.m_prb ?? runtime.member("m_prb"))))) & 0xff);
                    }
                    members.m_pb_in = ((data) & 0xff);
                    if (((((members.m_cra ?? runtime.member("m_cra"))) >>> (1)) & 1)) {
                        let pb6 = ((((((((members.m_cra ?? runtime.member("m_cra"))) >>> (2)) & 1)) ? ((members.m_ta_pb6 ?? runtime.member("m_ta_pb6"))) : ((members.m_ta_out ?? runtime.member("m_ta_out"))))) | 0);
                        data = ((runtime.andAssign(data, -65)) & 0xff);
                        data = ((((data) | (((pb6) << (6))))) & 0xff);
                    }
                    if (((((members.m_crb ?? runtime.member("m_crb"))) >>> (1)) & 1)) {
                        let pb7 = ((((((((members.m_crb ?? runtime.member("m_crb"))) >>> (2)) & 1)) ? ((members.m_tb_pb7 ?? runtime.member("m_tb_pb7"))) : ((members.m_tb_out ?? runtime.member("m_tb_out"))))) | 0);
                        data = ((runtime.andAssign(data, -129)) & 0xff);
                        data = ((((data) | (((pb7) << (7))))) & 0xff);
                    }
                    members.m_pc = ((0) | 0);
                    (__l["m_write_pc"] ? __l["m_write_pc"](Number((members.m_pc ?? runtime.member("m_pc")))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? runtime.member("m_pc"))) : runtime.invoke("m_write_pc", (members.m_pc ?? runtime.member("m_pc"))));
                    break;
                }
            case 2:
                {
                    data = (((members.m_ddra ?? runtime.member("m_ddra"))) & 0xff);
                    break;
                }
            case 3:
                {
                    data = (((members.m_ddrb ?? runtime.member("m_ddrb"))) & 0xff);
                    break;
                }
            case 4:
                {
                    data = (((((members.m_ta ?? runtime.member("m_ta"))) & (255))) & 0xff);
                    break;
                }
            case 5:
                {
                    data = (((((members.m_ta ?? runtime.member("m_ta"))) >>> (8))) & 0xff);
                    break;
                }
            case 6:
                {
                    data = (((((members.m_tb ?? runtime.member("m_tb"))) & (255))) & 0xff);
                    break;
                }
            case 7:
                {
                    data = (((((members.m_tb ?? runtime.member("m_tb"))) >>> (8))) & 0xff);
                    break;
                }
            case 8:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    data = ((method_read_tod(runtime, 0)) & 0xff);
                    members.m_tod_latched = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    data = ((method_read_tod(runtime, 1)) & 0xff);
                    break;
                }
            case 10:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    data = ((method_read_tod(runtime, 2)) & 0xff);
                    break;
                }
            case 11:
                {
                    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
                        return 255;
                    }
                    if ((((members.m_tod_latched ?? runtime.member("m_tod_latched"))) ? 0 : 1)) {
                        members.m_tod_latched = ((1) ? 1 : 0);
                        members.m_tod_latch = (((members.m_tod ?? runtime.member("m_tod"))) >>> 0);
                    }
                    data = ((method_read_tod(runtime, 3)) & 0xff);
                    break;
                }
            case 12:
                {
                    data = (((members.m_sdr ?? runtime.member("m_sdr"))) & 0xff);
                    break;
                }
            case 13:
                {
                    data = (((((((members.m_ir1 ?? runtime.member("m_ir1"))) << (7))) | ((members.m_icr ?? runtime.member("m_icr"))))) & 0xff);
                    if (((((__l["machine().side_effects_disabled"]?.() ?? 0)) || ((((members.m_icr ?? runtime.member("m_icr"))) ? 0 : 1))) ? 1 : 0)) {
                        return data;
                    }
                    members.m_ir0 = ((0) | 0);
                    members.m_ir1 = ((0) | 0);
                    members.m_icr = ((0) & 0xff);
                    members.m_irq = ((0) ? 1 : 0);
                    (__l["m_write_irq"] ? __l["m_write_irq"](Number(0)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(0) : runtime.invoke("m_write_irq", 0));
                    break;
                }
            case 14:
                {
                    data = (((members.m_cra ?? runtime.member("m_cra"))) & 0xff);
                    break;
                }
            case 15:
                {
                    data = (((members.m_crb ?? runtime.member("m_crb"))) & 0xff);
                    break;
                }
        }
        return data;
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch (((offset) & (15))) {
            case 0:
                {
                    members.m_pra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 1:
                {
                    members.m_prb = ((data) & 0xff);
                    method_update_pb(runtime);
                    members.m_pc = ((0) | 0);
                    (__l["m_write_pc"] ? __l["m_write_pc"](Number((members.m_pc ?? runtime.member("m_pc")))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? runtime.member("m_pc"))) : runtime.invoke("m_write_pc", (members.m_pc ?? runtime.member("m_pc"))));
                    break;
                }
            case 2:
                {
                    members.m_ddra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 3:
                {
                    members.m_ddrb = ((data) & 0xff);
                    method_update_pb(runtime);
                    break;
                }
            case 4:
                {
                    members.m_ta_latch = (((((((members.m_ta_latch ?? runtime.member("m_ta_latch"))) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_a2 ?? runtime.member("m_load_a2"))) {
                        members.m_ta = (((((((members.m_ta ?? runtime.member("m_ta"))) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    members.m_ta_latch = ((((((data) << (8))) | ((((members.m_ta_latch ?? runtime.member("m_ta_latch"))) & (255))))) & 0xffff);
                    if (((((((members.m_cra ?? runtime.member("m_cra"))) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_a0 = ((1) | 0);
                    }
                    if (((((members.m_cra ?? runtime.member("m_cra"))) >>> (3)) & 1)) {
                        members.m_ta = (((members.m_ta_latch ?? runtime.member("m_ta_latch"))) & 0xffff);
                        method_set_cra(runtime, (((members.m_cra ?? runtime.member("m_cra"))) | (1)));
                    }
                    if ((members.m_load_a2 ?? runtime.member("m_load_a2"))) {
                        members.m_ta = ((((((data) << (8))) | ((((members.m_ta ?? runtime.member("m_ta"))) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    members.m_tb_latch = (((((((members.m_tb_latch ?? runtime.member("m_tb_latch"))) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_b2 ?? runtime.member("m_load_b2"))) {
                        members.m_tb = (((((((members.m_tb ?? runtime.member("m_tb"))) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    members.m_tb_latch = ((((((data) << (8))) | ((((members.m_tb_latch ?? runtime.member("m_tb_latch"))) & (255))))) & 0xffff);
                    if (((((((members.m_crb ?? runtime.member("m_crb"))) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_b0 = ((1) | 0);
                    }
                    if (((((members.m_crb ?? runtime.member("m_crb"))) >>> (3)) & 1)) {
                        members.m_tb = (((members.m_tb_latch ?? runtime.member("m_tb_latch"))) & 0xffff);
                        method_set_crb(runtime, (((members.m_crb ?? runtime.member("m_crb"))) | (1)));
                    }
                    if ((members.m_load_b2 ?? runtime.member("m_load_b2"))) {
                        members.m_tb = ((((((data) << (8))) | ((((members.m_tb ?? runtime.member("m_tb"))) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    method_write_tod(runtime, 0, data);
                    members.m_tod_stopped = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    method_write_tod(runtime, 1, data);
                    break;
                }
            case 10:
                {
                    method_write_tod(runtime, 2, data);
                    break;
                }
            case 11:
                {
                    members.m_tod_stopped = ((1) ? 1 : 0);
                    if ((((((Number(((data) & (31))) === Number(18)) ? 1 : 0)) && (((((((members.m_crb ?? runtime.member("m_crb"))) >>> (7)) & 1)) ? 0 : 1))) ? 1 : 0)) {
                        data = ((((data) ^ (128))) & 0xff);
                    }
                    method_write_tod(runtime, 3, data);
                    break;
                }
            case 12:
                {
                    members.m_sdr = ((data) & 0xff);
                    members.m_sdr_empty = ((0) ? 1 : 0);
                    break;
                }
            case 13:
                {
                    if ((((data) >>> (7)) & 1)) {
                        members.m_imr = ((((members.m_imr) | (((data) & (31))))) & 0xff);
                    }
                    else {
                        members.m_imr = ((runtime.andAssign(members.m_imr, (~((data) & (31))))) & 0xff);
                    }
                    if (((((((members.m_irq ?? runtime.member("m_irq"))) ? 0 : 1)) && ((((members.m_icr ?? runtime.member("m_icr"))) & ((members.m_imr ?? runtime.member("m_imr")))))) ? 1 : 0)) {
                        members.m_ir0 = ((1) | 0);
                    }
                    break;
                }
            case 14:
                {
                    method_set_cra(runtime, data);
                    break;
                }
            case 15:
                {
                    method_set_crb(runtime, data);
                    break;
                }
        }
    }
    function method_mos6526_device__write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch (((offset) & (15))) {
            case 0:
                {
                    members.m_pra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 1:
                {
                    members.m_prb = ((data) & 0xff);
                    method_update_pb(runtime);
                    members.m_pc = ((0) | 0);
                    (__l["m_write_pc"] ? __l["m_write_pc"](Number((members.m_pc ?? runtime.member("m_pc")))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? runtime.member("m_pc"))) : runtime.invoke("m_write_pc", (members.m_pc ?? runtime.member("m_pc"))));
                    break;
                }
            case 2:
                {
                    members.m_ddra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 3:
                {
                    members.m_ddrb = ((data) & 0xff);
                    method_update_pb(runtime);
                    break;
                }
            case 4:
                {
                    members.m_ta_latch = (((((((members.m_ta_latch ?? runtime.member("m_ta_latch"))) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_a2 ?? runtime.member("m_load_a2"))) {
                        members.m_ta = (((((((members.m_ta ?? runtime.member("m_ta"))) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    members.m_ta_latch = ((((((data) << (8))) | ((((members.m_ta_latch ?? runtime.member("m_ta_latch"))) & (255))))) & 0xffff);
                    if (((((((members.m_cra ?? runtime.member("m_cra"))) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_a0 = ((1) | 0);
                    }
                    if (((((members.m_cra ?? runtime.member("m_cra"))) >>> (3)) & 1)) {
                        members.m_ta = (((members.m_ta_latch ?? runtime.member("m_ta_latch"))) & 0xffff);
                        method_set_cra(runtime, (((members.m_cra ?? runtime.member("m_cra"))) | (1)));
                    }
                    if ((members.m_load_a2 ?? runtime.member("m_load_a2"))) {
                        members.m_ta = ((((((data) << (8))) | ((((members.m_ta ?? runtime.member("m_ta"))) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    members.m_tb_latch = (((((((members.m_tb_latch ?? runtime.member("m_tb_latch"))) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_b2 ?? runtime.member("m_load_b2"))) {
                        members.m_tb = (((((((members.m_tb ?? runtime.member("m_tb"))) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    members.m_tb_latch = ((((((data) << (8))) | ((((members.m_tb_latch ?? runtime.member("m_tb_latch"))) & (255))))) & 0xffff);
                    if (((((((members.m_crb ?? runtime.member("m_crb"))) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_b0 = ((1) | 0);
                    }
                    if (((((members.m_crb ?? runtime.member("m_crb"))) >>> (3)) & 1)) {
                        members.m_tb = (((members.m_tb_latch ?? runtime.member("m_tb_latch"))) & 0xffff);
                        method_set_crb(runtime, (((members.m_crb ?? runtime.member("m_crb"))) | (1)));
                    }
                    if ((members.m_load_b2 ?? runtime.member("m_load_b2"))) {
                        members.m_tb = ((((((data) << (8))) | ((((members.m_tb ?? runtime.member("m_tb"))) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    method_write_tod(runtime, 0, data);
                    members.m_tod_stopped = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    method_write_tod(runtime, 1, data);
                    break;
                }
            case 10:
                {
                    method_write_tod(runtime, 2, data);
                    break;
                }
            case 11:
                {
                    members.m_tod_stopped = ((1) ? 1 : 0);
                    if ((((((Number(((data) & (31))) === Number(18)) ? 1 : 0)) && (((((((members.m_crb ?? runtime.member("m_crb"))) >>> (7)) & 1)) ? 0 : 1))) ? 1 : 0)) {
                        data = ((((data) ^ (128))) & 0xff);
                    }
                    method_write_tod(runtime, 3, data);
                    break;
                }
            case 12:
                {
                    members.m_sdr = ((data) & 0xff);
                    members.m_sdr_empty = ((0) ? 1 : 0);
                    break;
                }
            case 13:
                {
                    if ((((data) >>> (7)) & 1)) {
                        members.m_imr = ((((members.m_imr) | (((data) & (31))))) & 0xff);
                    }
                    else {
                        members.m_imr = ((runtime.andAssign(members.m_imr, (~((data) & (31))))) & 0xff);
                    }
                    if (((((((members.m_irq ?? runtime.member("m_irq"))) ? 0 : 1)) && ((((members.m_icr ?? runtime.member("m_icr"))) & ((members.m_imr ?? runtime.member("m_imr")))))) ? 1 : 0)) {
                        members.m_ir0 = ((1) | 0);
                    }
                    break;
                }
            case 14:
                {
                    method_set_cra(runtime, data);
                    break;
                }
            case 15:
                {
                    method_set_crb(runtime, data);
                    break;
                }
        }
    }
    function method_sp_w(runtime, state) {
        const members = runtime.members;
        members.m_sp = ((state) | 0);
    }
    function method_cnt_w(runtime, state) {
        const members = runtime.members;
        if (((((members.m_cra ?? runtime.member("m_cra"))) >>> (6)) & 1)) {
            return;
        }
        if (((((((members.m_cnt ?? runtime.member("m_cnt"))) ? 0 : 1)) && (state)) ? 1 : 0)) {
            method_serial_input(runtime);
            if (((Number(((((members.m_cra ?? runtime.member("m_cra"))) >>> (5)) & 1)) === Number(1)) ? 1 : 0)) {
                members.m_ta = ((((members.m_ta) - (1))) & 0xffff);
            }
            if (((Number((((((members.m_crb ?? runtime.member("m_crb"))) & (96))) >>> (5))) === Number(1)) ? 1 : 0)) {
                members.m_tb = ((((members.m_tb) - (1))) & 0xffff);
            }
        }
        members.m_cnt = ((state) | 0);
    }
    function method_flag_w(runtime, state) {
        const members = runtime.members;
        if (((((members.m_flag ?? runtime.member("m_flag"))) && (((state) ? 0 : 1))) ? 1 : 0)) {
            members.m_icr = ((((members.m_icr) | (16))) & 0xff);
        }
        members.m_flag = ((state) | 0);
    }
    function method_tod_w(runtime, state) {
        const members = runtime.members;
        if ((((state) && ((((members.m_tod_stopped ?? runtime.member("m_tod_stopped"))) ? 0 : 1))) ? 1 : 0)) {
            method_clock_tod(runtime);
            if (((Number((members.m_tod ?? runtime.member("m_tod"))) === Number((members.m_alarm ?? runtime.member("m_alarm")))) ? 1 : 0)) {
                members.m_icr = ((((members.m_icr) | (4))) & 0xff);
            }
        }
    }
    function method_advance_tod_clock(runtime, param) {
        const members = runtime.members;
        method_tod_w(runtime, 1);
        method_tod_w(runtime, 0);
    }
    function method_set_tod_clock(runtime, clock) {
        const members = runtime.members;
        members.m_tod_clock = ((clock) | 0);
    }
    function method_irq_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_irq)).bind === 'function' ? (runtime.dereference(members.m_write_irq)).bind() : typeof (runtime.dereference(members.m_write_irq)).bind === 'number' || typeof (runtime.dereference(members.m_write_irq)).bind === 'boolean' ? (runtime.dereference(members.m_write_irq)).bind : runtime.container(members.m_write_irq, "bind"));
    }
    function method_cnt_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_cnt)).bind === 'function' ? (runtime.dereference(members.m_write_cnt)).bind() : typeof (runtime.dereference(members.m_write_cnt)).bind === 'number' || typeof (runtime.dereference(members.m_write_cnt)).bind === 'boolean' ? (runtime.dereference(members.m_write_cnt)).bind : runtime.container(members.m_write_cnt, "bind"));
    }
    function method_sp_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_sp)).bind === 'function' ? (runtime.dereference(members.m_write_sp)).bind() : typeof (runtime.dereference(members.m_write_sp)).bind === 'number' || typeof (runtime.dereference(members.m_write_sp)).bind === 'boolean' ? (runtime.dereference(members.m_write_sp)).bind : runtime.container(members.m_write_sp, "bind"));
    }
    function method_pa_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_pa)).bind === 'function' ? (runtime.dereference(members.m_read_pa)).bind() : typeof (runtime.dereference(members.m_read_pa)).bind === 'number' || typeof (runtime.dereference(members.m_read_pa)).bind === 'boolean' ? (runtime.dereference(members.m_read_pa)).bind : runtime.container(members.m_read_pa, "bind"));
    }
    function method_pa_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_pa)).bind === 'function' ? (runtime.dereference(members.m_write_pa)).bind() : typeof (runtime.dereference(members.m_write_pa)).bind === 'number' || typeof (runtime.dereference(members.m_write_pa)).bind === 'boolean' ? (runtime.dereference(members.m_write_pa)).bind : runtime.container(members.m_write_pa, "bind"));
    }
    function method_pb_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_pb)).bind === 'function' ? (runtime.dereference(members.m_read_pb)).bind() : typeof (runtime.dereference(members.m_read_pb)).bind === 'number' || typeof (runtime.dereference(members.m_read_pb)).bind === 'boolean' ? (runtime.dereference(members.m_read_pb)).bind : runtime.container(members.m_read_pb, "bind"));
    }
    function method_pb_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_pb)).bind === 'function' ? (runtime.dereference(members.m_write_pb)).bind() : typeof (runtime.dereference(members.m_write_pb)).bind === 'number' || typeof (runtime.dereference(members.m_write_pb)).bind === 'boolean' ? (runtime.dereference(members.m_write_pb)).bind : runtime.container(members.m_write_pb, "bind"));
    }
    function method_pc_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_pc)).bind === 'function' ? (runtime.dereference(members.m_write_pc)).bind() : typeof (runtime.dereference(members.m_write_pc)).bind === 'number' || typeof (runtime.dereference(members.m_write_pc)).bind === 'boolean' ? (runtime.dereference(members.m_write_pc)).bind : runtime.container(members.m_write_pc, "bind"));
    }
    function method_pa_r(runtime) {
        const members = runtime.members;
        return (members.m_pa ?? runtime.member("m_pa"));
    }
    function method_pb_r(runtime) {
        const members = runtime.members;
        return (members.m_pb ?? runtime.member("m_pb"));
    }
    function method_sp_r(runtime) {
        const members = runtime.members;
        return (members.m_sp ?? runtime.member("m_sp"));
    }
    function method_cnt_r(runtime) {
        const members = runtime.members;
        return (members.m_cnt ?? runtime.member("m_cnt"));
    }
    function method_irq_r(runtime) {
        const members = runtime.members;
        return (members.m_irq ?? runtime.member("m_irq"));
    }
    function method_mos6526_device__set_tod_clock(runtime, clock) {
        const members = runtime.members;
        members.m_tod_clock = ((clock) | 0);
    }
    function method_mos6526_device__irq_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_irq)).bind === 'function' ? (runtime.dereference(members.m_write_irq)).bind() : typeof (runtime.dereference(members.m_write_irq)).bind === 'number' || typeof (runtime.dereference(members.m_write_irq)).bind === 'boolean' ? (runtime.dereference(members.m_write_irq)).bind : runtime.container(members.m_write_irq, "bind"));
    }
    function method_mos6526_device__cnt_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_cnt)).bind === 'function' ? (runtime.dereference(members.m_write_cnt)).bind() : typeof (runtime.dereference(members.m_write_cnt)).bind === 'number' || typeof (runtime.dereference(members.m_write_cnt)).bind === 'boolean' ? (runtime.dereference(members.m_write_cnt)).bind : runtime.container(members.m_write_cnt, "bind"));
    }
    function method_mos6526_device__sp_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_sp)).bind === 'function' ? (runtime.dereference(members.m_write_sp)).bind() : typeof (runtime.dereference(members.m_write_sp)).bind === 'number' || typeof (runtime.dereference(members.m_write_sp)).bind === 'boolean' ? (runtime.dereference(members.m_write_sp)).bind : runtime.container(members.m_write_sp, "bind"));
    }
    function method_mos6526_device__pa_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_pa)).bind === 'function' ? (runtime.dereference(members.m_read_pa)).bind() : typeof (runtime.dereference(members.m_read_pa)).bind === 'number' || typeof (runtime.dereference(members.m_read_pa)).bind === 'boolean' ? (runtime.dereference(members.m_read_pa)).bind : runtime.container(members.m_read_pa, "bind"));
    }
    function method_mos6526_device__pa_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_pa)).bind === 'function' ? (runtime.dereference(members.m_write_pa)).bind() : typeof (runtime.dereference(members.m_write_pa)).bind === 'number' || typeof (runtime.dereference(members.m_write_pa)).bind === 'boolean' ? (runtime.dereference(members.m_write_pa)).bind : runtime.container(members.m_write_pa, "bind"));
    }
    function method_mos6526_device__pb_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_pb)).bind === 'function' ? (runtime.dereference(members.m_read_pb)).bind() : typeof (runtime.dereference(members.m_read_pb)).bind === 'number' || typeof (runtime.dereference(members.m_read_pb)).bind === 'boolean' ? (runtime.dereference(members.m_read_pb)).bind : runtime.container(members.m_read_pb, "bind"));
    }
    function method_mos6526_device__pb_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_pb)).bind === 'function' ? (runtime.dereference(members.m_write_pb)).bind() : typeof (runtime.dereference(members.m_write_pb)).bind === 'number' || typeof (runtime.dereference(members.m_write_pb)).bind === 'boolean' ? (runtime.dereference(members.m_write_pb)).bind : runtime.container(members.m_write_pb, "bind"));
    }
    function method_mos6526_device__pc_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_pc)).bind === 'function' ? (runtime.dereference(members.m_write_pc)).bind() : typeof (runtime.dereference(members.m_write_pc)).bind === 'number' || typeof (runtime.dereference(members.m_write_pc)).bind === 'boolean' ? (runtime.dereference(members.m_write_pc)).bind : runtime.container(members.m_write_pc, "bind"));
    }
    function method_mos6526_device__pa_r(runtime) {
        const members = runtime.members;
        return (members.m_pa ?? runtime.member("m_pa"));
    }
    function method_mos6526_device__pb_r(runtime) {
        const members = runtime.members;
        return (members.m_pb ?? runtime.member("m_pb"));
    }
    function method_mos6526_device__sp_r(runtime) {
        const members = runtime.members;
        return (members.m_sp ?? runtime.member("m_sp"));
    }
    function method_mos6526_device__cnt_r(runtime) {
        const members = runtime.members;
        return (members.m_cnt ?? runtime.member("m_cnt"));
    }
    function method_mos6526_device__irq_r(runtime) {
        const members = runtime.members;
        return (members.m_irq ?? runtime.member("m_irq"));
    }
    return {
        "update_pa": method_update_pa,
        "update_pb": method_update_pb,
        "set_cra": method_set_cra,
        "set_crb": method_set_crb,
        "bcd_increment": method_bcd_increment,
        "clock_tod": method_clock_tod,
        "read_tod": method_read_tod,
        "write_tod": method_write_tod,
        "serial_input": method_serial_input,
        "clock_ta": method_clock_ta,
        "serial_output": method_serial_output,
        "clock_tb": method_clock_tb,
        "update_interrupt": method_update_interrupt,
        "clock_pipeline": method_clock_pipeline,
        "synchronize": method_synchronize,
        "device_reset": method_device_reset,
        "execute_run": method_execute_run,
        "read": method_read,
        "mos6526_device::read": method_mos6526_device__read,
        "write": method_write,
        "mos6526_device::write": method_mos6526_device__write,
        "sp_w": method_sp_w,
        "cnt_w": method_cnt_w,
        "flag_w": method_flag_w,
        "tod_w": method_tod_w,
        "advance_tod_clock": method_advance_tod_clock,
        "set_tod_clock": method_set_tod_clock,
        "irq_wr_callback": method_irq_wr_callback,
        "cnt_wr_callback": method_cnt_wr_callback,
        "sp_wr_callback": method_sp_wr_callback,
        "pa_rd_callback": method_pa_rd_callback,
        "pa_wr_callback": method_pa_wr_callback,
        "pb_rd_callback": method_pb_rd_callback,
        "pb_wr_callback": method_pb_wr_callback,
        "pc_wr_callback": method_pc_wr_callback,
        "pa_r": method_pa_r,
        "pb_r": method_pb_r,
        "sp_r": method_sp_r,
        "cnt_r": method_cnt_r,
        "irq_r": method_irq_r,
        "mos6526_device::set_tod_clock": method_mos6526_device__set_tod_clock,
        "mos6526_device::irq_wr_callback": method_mos6526_device__irq_wr_callback,
        "mos6526_device::cnt_wr_callback": method_mos6526_device__cnt_wr_callback,
        "mos6526_device::sp_wr_callback": method_mos6526_device__sp_wr_callback,
        "mos6526_device::pa_rd_callback": method_mos6526_device__pa_rd_callback,
        "mos6526_device::pa_wr_callback": method_mos6526_device__pa_wr_callback,
        "mos6526_device::pb_rd_callback": method_mos6526_device__pb_rd_callback,
        "mos6526_device::pb_wr_callback": method_mos6526_device__pb_wr_callback,
        "mos6526_device::pc_wr_callback": method_mos6526_device__pc_wr_callback,
        "mos6526_device::pa_r": method_mos6526_device__pa_r,
        "mos6526_device::pb_r": method_mos6526_device__pb_r,
        "mos6526_device::sp_r": method_mos6526_device__sp_r,
        "mos6526_device::cnt_r": method_mos6526_device__cnt_r,
        "mos6526_device::irq_r": method_mos6526_device__irq_r
    };
})();
definition.compiledMethodLinks = ["m_read_pa", "m_read_pb", "m_write_cnt", "m_write_irq", "m_write_pa", "m_write_pb", "m_write_pc", "m_write_sp", "machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
