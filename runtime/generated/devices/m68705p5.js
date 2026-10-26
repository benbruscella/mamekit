import deviceData from './m68705p5.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_burn_cycles(runtime, count) {
        const members = runtime.members;
        (members.m_timer.update?.(count) ?? 0);
    }
    function method_set_z8(runtime, a) {
        const members = runtime.members;
        if (((a) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
    }
    function method_set_n8(runtime, a) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((a) & (128)), 5)))) & 0xff);
    }
    function method_set_c8(runtime, a) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | ((((a) >>> (8)) & 1)))) & 0xff);
    }
    function method_rdop_1(runtime, addr) {
        const members = runtime.members;
        return ((1) ? (((runtime.dereference(members.m_cprogram16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_cprogram13)).read_byte?.(addr) ?? 0)));
    }
    function method_rdop_0(runtime, addr) {
        const members = runtime.members;
        return ((0) ? (((runtime.dereference(members.m_cprogram16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_cprogram13)).read_byte?.(addr) ?? 0)));
    }
    function method_test_il(runtime) {
        const members = runtime.members;
        const h_m_irq_state = members.m_irq_state ?? 0;
        return ((Number(0) !== Number(h_m_irq_state[0])) ? 1 : 0);
    }
    function method_brset_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (0)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_immbyte_0(runtime, b) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        b = method_rdop_arg_0(runtime, (() => { const previous = h_m_pc.w.l; h_m_pc.w.l = ((h_m_pc.w.l) + (1)); return previous; })());
        return b;
    }
    function method_rdop_arg_0(runtime, addr) {
        const members = runtime.members;
        return ((0) ? (((runtime.dereference(members.m_cprogram16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_cprogram13)).read_byte?.(addr) ?? 0)));
    }
    function method_rm_0(runtime, addr) {
        const members = runtime.members;
        return method_rdmem_0(runtime, addr);
    }
    function method_rdmem_0(runtime, addr) {
        const members = runtime.members;
        return ((0) ? (((runtime.dereference(members.m_program16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_program13)).read_byte?.(addr) ?? 0)));
    }
    function method_brset_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (1)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (2)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (3)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (4)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (5)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_0_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (6)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_0_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (7)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (0)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_immbyte_1(runtime, b) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        b = method_rdop_arg_1(runtime, (() => { const previous = h_m_pc.w.l; h_m_pc.w.l = ((h_m_pc.w.l) + (1)); return previous; })());
        return b;
    }
    function method_rdop_arg_1(runtime, addr) {
        const members = runtime.members;
        return ((1) ? (((runtime.dereference(members.m_cprogram16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_cprogram13)).read_byte?.(addr) ?? 0)));
    }
    function method_rm_1(runtime, addr) {
        const members = runtime.members;
        return method_rdmem_1(runtime, addr);
    }
    function method_rdmem_1(runtime, addr) {
        const members = runtime.members;
        return ((1) ? (((runtime.dereference(members.m_program16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_program13)).read_byte?.(addr) ?? 0)));
    }
    function method_brset_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (1)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (2)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (3)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (4)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (5)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_1_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (6)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brset_1_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        if ((((r) >>> (7)) & 1)) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (0)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (1)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (2)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (3)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (4)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (5)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (6)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_0_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_0(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (7)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (0)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (1)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (2)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (3)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (4)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (5)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (6)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_brclr_1_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            r = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        (t = ((method_immbyte_1(runtime, t)) & 0xff));
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        if ((((((r) >>> (7)) & 1)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
            h_m_pc.w.l = ((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)));
        }
    }
    function method_bset_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (0)))));
    }
    function method_wm_0(runtime, addr, value) {
        const members = runtime.members;
        method_wrmem_0(runtime, addr, value);
    }
    function method_wrmem_0(runtime, addr, value) {
        const members = runtime.members;
        if (1) {
            ((runtime.dereference(members.m_program13)).write_byte?.(addr, value) ?? 0);
        }
    }
    function method_bset_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (1)))));
    }
    function method_bset_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (2)))));
    }
    function method_bset_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (3)))));
    }
    function method_bset_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (4)))));
    }
    function method_bset_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (5)))));
    }
    function method_bset_0_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (6)))));
    }
    function method_bset_0_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (7)))));
    }
    function method_bset_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (0)))));
    }
    function method_wm_1(runtime, addr, value) {
        const members = runtime.members;
        method_wrmem_1(runtime, addr, value);
    }
    function method_wrmem_1(runtime, addr, value) {
        const members = runtime.members;
        if (1) {
            ((runtime.dereference(members.m_program16)).write_byte?.(addr, value) ?? 0);
        }
    }
    function method_bset_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (1)))));
    }
    function method_bset_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (2)))));
    }
    function method_bset_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (3)))));
    }
    function method_bset_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (4)))));
    }
    function method_bset_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (5)))));
    }
    function method_bset_1_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (6)))));
    }
    function method_bset_1_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) | (((((1) & 0xff)) << (7)))));
    }
    function method_bclr_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (0))))));
    }
    function method_bclr_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (1))))));
    }
    function method_bclr_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (2))))));
    }
    function method_bclr_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (3))))));
    }
    function method_bclr_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (4))))));
    }
    function method_bclr_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (5))))));
    }
    function method_bclr_0_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (6))))));
    }
    function method_bclr_0_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_0(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (7))))));
    }
    function method_bclr_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (0))))));
    }
    function method_bclr_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (1))))));
    }
    function method_bclr_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (2))))));
    }
    function method_bclr_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (3))))));
    }
    function method_bclr_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (4))))));
    }
    function method_bclr_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (5))))));
    }
    function method_bclr_1_6(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (6))))));
    }
    function method_bclr_1_7(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            do {
                h_m_ea.d = 0;
                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
            } while (0);
            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
        } while (0);
        method_wm_1(runtime, h_m_ea.d, ((t) & ((~((((1) & 0xff)) << (7))))));
    }
    function method_neg_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((-t)) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_immword_0(runtime, w) {
        const members = runtime.members;
        w.d = 0;
        (w.b.h = method_immbyte_0(runtime, w.b.h));
        (w.b.l = method_immbyte_0(runtime, w.b.l));
    }
    function method_clr_nzc(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) & (-8))) & 0xff);
    }
    function method_set_nzc8(runtime, a) {
        const members = runtime.members;
        method_set_nz8(runtime, a);
        method_set_c8(runtime, a);
    }
    function method_set_nz8(runtime, a) {
        const members = runtime.members;
        method_set_n8(runtime, a);
        method_set_z8(runtime, a);
    }
    function method_neg_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((-t)) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_neg_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((-t)) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_neg_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((-t)) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_immword_1(runtime, w) {
        const members = runtime.members;
        w.d = 0;
        (w.b.h = method_immbyte_1(runtime, w.b.h));
        (w.b.l = method_immbyte_1(runtime, w.b.l));
    }
    function method_neg_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((-t)) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_neg_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((-t)) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_com_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = (((~t)) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_clr_nz(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) & (-7))) & 0xff);
    }
    function method_com_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = (((~t)) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_com_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = (((~t)) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_com_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = (((~t)) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_com_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = (((~t)) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_com_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = (((~t)) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_lsr_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((runtime.shiftRight(t, 1)) & 0xff);
        method_set_z8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_lsr_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((runtime.shiftRight(t, 1)) & 0xff);
        method_set_z8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_lsr_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((runtime.shiftRight(t, 1)) & 0xff);
        method_set_z8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_lsr_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((runtime.shiftRight(t, 1)) & 0xff);
        method_set_z8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_lsr_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((runtime.shiftRight(t, 1)) & 0xff);
        method_set_z8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_lsr_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((runtime.shiftRight(t, 1)) & 0xff);
        method_set_z8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_ror_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) << (7))) & 0xff);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        method_set_nz8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_ror_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) << (7))) & 0xff);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        method_set_nz8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_ror_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) << (7))) & 0xff);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        method_set_nz8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_ror_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) << (7))) & 0xff);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        method_set_nz8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_ror_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) << (7))) & 0xff);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        method_set_nz8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_ror_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) << (7))) & 0xff);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        method_set_nz8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_asr_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((((((t) >>> (1))) | (((t) & (128))))) & 0xff);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_asr_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((((((t) >>> (1))) | (((t) & (128))))) & 0xff);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_asr_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((((((t) >>> (1))) | (((t) & (128))))) & 0xff);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_asr_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((((((t) >>> (1))) | (((t) & (128))))) & 0xff);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_asr_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((((((t) >>> (1))) | (((t) & (128))))) & 0xff);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_asr_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nzc(runtime);
        members.m_cc = ((((members.m_cc) | ((((t) >>> (0)) & 1)))) & 0xff);
        t = ((((((t) >>> (1))) | (((t) & (128))))) & 0xff);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_lsl_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((t) & 0xffff)) << (1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_lsl_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((t) & 0xffff)) << (1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_lsl_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((t) & 0xffff)) << (1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_lsl_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((t) & 0xffff)) << (1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_lsl_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((t) & 0xffff)) << (1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_lsl_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((t) & 0xffff)) << (1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_rol_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) | (((t) << (1))))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_rol_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) | (((t) << (1))))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_rol_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) | (((t) << (1))))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_0(runtime, h_m_ea.d, r);
    }
    function method_rol_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) | (((t) << (1))))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_rol_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) | (((t) << (1))))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_rol_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((((((((members.m_cc ?? 0)) >>> (0)) & 1)) | (((t) << (1))))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        method_wm_1(runtime, h_m_ea.d, r);
    }
    function method_dec_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) - (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_dec_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) - (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_dec_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) - (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_dec_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) - (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_dec_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) - (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_dec_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) - (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_inc_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) + (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_inc_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) + (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_inc_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) + (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_0(runtime, h_m_ea.d, t);
    }
    function method_inc_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) + (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_inc_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) + (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_inc_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        t = ((((t) + (1))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
        method_wm_1(runtime, h_m_ea.d, t);
    }
    function method_tst_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
    }
    function method_tst_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
    }
    function method_tst_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
    }
    function method_tst_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
    }
    function method_tst_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
    }
    function method_tst_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, t);
    }
    function method_clr_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        method_wm_0(runtime, h_m_ea.d, 0);
    }
    function method_clr_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        method_wm_0(runtime, h_m_ea.d, 0);
    }
    function method_clr_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        method_wm_0(runtime, h_m_ea.d, 0);
    }
    function method_clr_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        method_wm_1(runtime, h_m_ea.d, 0);
    }
    function method_clr_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        method_wm_1(runtime, h_m_ea.d, 0);
    }
    function method_clr_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        method_wm_1(runtime, h_m_ea.d, 0);
    }
    function method_suba_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_suba_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_cmpa_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cmpa_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_sbca_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_sbca_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.subtract((((members.m_a ?? 0)) - (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
        members.m_a = ((r) & 0xff);
    }
    function method_cpx_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_cpx_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_x ?? 0)) - (t))) & 0xffff);
        method_clr_nzc(runtime);
        method_set_nzc8(runtime, r);
    }
    function method_anda_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_anda_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_bita_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_bita_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) & (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, r);
    }
    function method_lda_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (0) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_0(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_0(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_0(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_0(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_0(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_0(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (0) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_1(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_1(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_1(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_1(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_1(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_lda_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        (members.m_a = ((method_immbyte_1(runtime, (members.m_a ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_a = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_a = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_sta_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_sta_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_a ?? 0));
    }
    function method_eora_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_eora_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) ^ (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_adca_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_clr_hnzc(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) & (-24))) & 0xff);
    }
    function method_set_hnzc8(runtime, a, b, r) {
        const members = runtime.members;
        method_set_h(runtime, a, b, r);
        method_set_nzc8(runtime, r);
    }
    function method_set_h(runtime, a, b, r) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | (((((((a) ^ (b))) ^ (r))) & (16))))) & 0xff);
    }
    function method_adca_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adca_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = ((runtime.add((((members.m_a ?? 0)) + (t)), ((((members.m_cc ?? 0)) >>> (0)) & 1))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_ora_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_ora_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        members.m_a = ((((members.m_a) | (t))) & 0xff);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_a ?? 0));
    }
    function method_adda_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_0(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_0(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (0) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (1) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (2) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (5) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (4) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_adda_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        do {
            switch (3) {
                case 0:
                    {
                        (t = ((method_immbyte_1(runtime, t)) & 0xffff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            t = ((method_rm_1(runtime, h_m_ea.d)) & 0xffff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        t = ((0) & 0xffff);
                        break;
                    }
            }
        } while (0);
        let r = (((((members.m_a ?? 0)) + (t))) & 0xffff);
        method_clr_hnzc(runtime);
        method_set_hnzc8(runtime, (members.m_a ?? 0), t, r);
        members.m_a = ((r) & 0xff);
    }
    function method_jmp_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jmp_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_0(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_pushword_0(runtime, p) {
        const members = runtime.members;
        method_pushbyte_0(runtime, p.b.l);
        method_pushbyte_0(runtime, p.b.h);
    }
    function method_pushbyte_0(runtime, b) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_params = members.m_params ?? 0;
        method_wm_0(runtime, h_m_s.w.l, b);
        if (((Number((h_m_s.w.l = ((h_m_s.w.l) - (1)))) < Number(h_m_params.m_sp_floor)) ? 1 : 0)) {
            h_m_s.w.l = h_m_params.m_sp_mask;
        }
    }
    function method_jsr_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_0(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_0(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_0(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_0(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_1(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_pushword_1(runtime, p) {
        const members = runtime.members;
        method_pushbyte_1(runtime, p.b.l);
        method_pushbyte_1(runtime, p.b.h);
    }
    function method_pushbyte_1(runtime, b) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_params = members.m_params ?? 0;
        method_wm_1(runtime, h_m_s.w.l, b);
        if (((Number((h_m_s.w.l = ((h_m_s.w.l) - (1)))) < Number(h_m_params.m_sp_floor)) ? 1 : 0)) {
            h_m_s.w.l = h_m_params.m_sp_mask;
        }
    }
    function method_jsr_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_1(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_1(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_1(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_jsr_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_pushword_1(runtime, h_m_pc);
        h_m_pc.w.l = h_m_ea.w.l;
    }
    function method_ldx_0_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (0) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_0(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_0(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_0(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_0(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_0(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_0(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_0(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_0(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_1_0(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (0) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_1(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (1) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_1(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (2) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_1(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (5) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_1(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (4) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_1(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_ldx_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        do {
            switch (3) {
                case 0:
                    {
                        (members.m_x = ((method_immbyte_1(runtime, (members.m_x ?? 0))) & 0xff));
                        break;
                    }
                case 1:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 3:
                    {
                        do {
                            do {
                                h_m_ea.w.l = (members.m_x ?? 0);
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            do {
                                h_m_ea.d = 0;
                                (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            do {
                                method_immword_1(runtime, h_m_ea);
                                h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                            } while (0);
                            members.m_x = ((method_rm_1(runtime, h_m_ea.d)) & 0xff);
                        } while (0);
                        break;
                    }
                default:
                    {
                        members.m_x = ((0) & 0xff);
                        break;
                    }
            }
        } while (0);
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
    }
    function method_stx_0_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_0_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_0_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_0_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_0_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_0(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_0(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_0(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_0(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_1_1(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (1) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_1_2(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (2) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_1_5(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (5) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_1_4(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (4) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_stx_1_3(runtime) {
        const members = runtime.members;
        const h_m_ea = members.m_ea ?? 0;
        method_clr_nz(runtime);
        method_set_nz8(runtime, (members.m_x ?? 0));
        do {
            switch (3) {
                case 0:
                    {
                        break;
                    }
                case 1:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                        } while (0);
                        break;
                    }
                case 2:
                    {
                        method_immword_1(runtime, h_m_ea);
                        break;
                    }
                case 3:
                    {
                        do {
                            h_m_ea.w.l = (members.m_x ?? 0);
                        } while (0);
                        break;
                    }
                case 4:
                    {
                        do {
                            h_m_ea.d = 0;
                            (h_m_ea.b.l = method_immbyte_1(runtime, h_m_ea.b.l));
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
                case 5:
                    {
                        do {
                            method_immword_1(runtime, h_m_ea);
                            h_m_ea.w.l = ((h_m_ea.w.l) + ((members.m_x ?? 0)));
                        } while (0);
                        break;
                    }
            }
        } while (0);
        method_wm_1(runtime, h_m_ea.d, (members.m_x ?? 0));
    }
    function method_execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.divide(((clocks) + (3)), 4);
    }
    function method_execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return ((cycles) * (4));
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return (members.m_min_cycles ?? 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return (members.m_max_cycles ?? 0);
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_s = members.m_s ?? 0;
        const h_m_params = members.m_params ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        h_m_s.w.l = ((((h_m_s.w.l) & (h_m_params.m_sp_mask))) | (h_m_params.m_sp_floor));
        do {
            if (((Number((members.m_pending_interrupts ?? 0)) !== Number(0)) ? 1 : 0)) {
                method_interrupt(runtime);
            }
            (__l["debugger_instruction_hook"] ? __l["debugger_instruction_hook"](h_m_pc.w.l) : runtime.macro("debugger_instruction_hook", h_m_pc.w.l));
            let ireg = ((((((Number(h_m_params.m_addr_width) > Number(14)) ? 1 : 0)) ? (method_rdop_1(runtime, (() => { const previous = h_m_pc.w.l; h_m_pc.w.l = ((h_m_pc.w.l) + (1)); return previous; })())) : (method_rdop_0(runtime, (() => { const previous = h_m_pc.w.l; h_m_pc.w.l = ((h_m_pc.w.l) + (1)); return previous; })())))) & 0xff);
            (__l["CALL_METHOD"] ? __l["CALL_METHOD"](runtime.readIndex(h_m_params.m_ops, ireg)) : runtime.macro("CALL_METHOD", runtime.readIndex(h_m_params.m_ops, ireg)));
            members.m_icount = ((((members.m_icount) - (runtime.readIndex(h_m_params.m_cycles, ireg)))) | 0);
            method_burn_cycles(runtime, runtime.readIndex(h_m_params.m_cycles, ireg));
        } while (((Number((members.m_icount ?? 0)) > Number(0)) ? 1 : 0));
    }
    function method_interrupt(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_params = members.m_params ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        if ((((members.m_pending_interrupts ?? 0)) & (3))) {
            if (((Number((((members.m_cc ?? 0)) & (8))) === Number(0)) ? 1 : 0)) {
                if (((Number(h_m_params.m_addr_width) > Number(13)) ? 1 : 0)) {
                    method_pushword_1(runtime, h_m_pc);
                    method_pushbyte_1(runtime, (members.m_x ?? 0));
                    method_pushbyte_1(runtime, (members.m_a ?? 0));
                    method_pushbyte_1(runtime, (members.m_cc ?? 0));
                }
                else {
                    method_pushword_0(runtime, h_m_pc);
                    method_pushbyte_0(runtime, (members.m_x ?? 0));
                    method_pushbyte_0(runtime, (members.m_a ?? 0));
                    method_pushbyte_0(runtime, (members.m_cc ?? 0));
                }
                members.m_cc = ((((members.m_cc) | (8))) & 0xff);
                if (((((members.m_pending_interrupts ?? 0)) >>> (0)) & 1)) {
                    0;
                    (__l["standard_irq_callback"] ? __l["standard_irq_callback"](0, h_m_pc.w.l) : runtime.macro("standard_irq_callback", 0, h_m_pc.w.l));
                    members.m_pending_interrupts = ((((members.m_pending_interrupts) & (-2))) & 0xffff);
                    if (((Number(h_m_params.m_addr_width) > Number(13)) ? 1 : 0)) {
                        method_rm16_1(runtime, 65530, h_m_pc);
                    }
                    else {
                        method_rm16_0(runtime, 65530, h_m_pc);
                    }
                }
                else {
                    if (((((members.m_pending_interrupts ?? 0)) >>> (1)) & 1)) {
                        0;
                        (__l["standard_irq_callback"] ? __l["standard_irq_callback"](1, h_m_pc.w.l) : runtime.macro("standard_irq_callback", 1, h_m_pc.w.l));
                        if (((Number(h_m_params.m_addr_width) > Number(13)) ? 1 : 0)) {
                            method_rm16_1(runtime, 65528, h_m_pc);
                        }
                        else {
                            method_rm16_0(runtime, 65528, h_m_pc);
                        }
                    }
                    else {
                        (__l["__throw"] ? __l["__throw"]((__l["emu_fatalerror"] ? __l["emu_fatalerror"]("Unknown pending interrupt") : runtime.macro("emu_fatalerror", "Unknown pending interrupt"))) : runtime.macro("__throw", (__l["emu_fatalerror"] ? __l["emu_fatalerror"]("Unknown pending interrupt") : runtime.macro("emu_fatalerror", "Unknown pending interrupt"))));
                    }
                }
                members.m_icount = ((((members.m_icount) - (11))) | 0);
                method_burn_cycles(runtime, 11);
            }
        }
    }
    function method_rm16_1(runtime, addr, p) {
        const members = runtime.members;
        method_clear_pair(runtime, p);
        p.b.h = method_rm_1(runtime, addr);
        p.b.l = method_rm_1(runtime, ((addr) + (1)));
    }
    function method_clear_pair(runtime, p) {
        const members = runtime.members;
        p.d = 0;
    }
    function method_rm16_0(runtime, addr, p) {
        const members = runtime.members;
        method_clear_pair(runtime, p);
        p.b.h = method_rm_0(runtime, addr);
        p.b.l = method_rm_0(runtime, ((addr) + (1)));
    }
    function method_m6805_base_device__set_z8(runtime, a) {
        const members = runtime.members;
        if (((a) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
    }
    function method_m6805_base_device__set_n8(runtime, a) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((a) & (128)), 5)))) & 0xff);
    }
    function method_m6805_base_device__set_c8(runtime, a) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | ((((a) >>> (8)) & 1)))) & 0xff);
    }
    function method_m6805_base_device__rdop_1(runtime, addr) {
        const members = runtime.members;
        return ((1) ? (((runtime.dereference(members.m_cprogram16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_cprogram13)).read_byte?.(addr) ?? 0)));
    }
    function method_m6805_base_device__rdop_0(runtime, addr) {
        const members = runtime.members;
        return ((0) ? (((runtime.dereference(members.m_cprogram16)).read_byte?.(addr) ?? 0)) : (((runtime.dereference(members.m_cprogram13)).read_byte?.(addr) ?? 0)));
    }
    function method_set_port_open_drain_0(runtime, value) {
        const members = runtime.members;
        const h_m_port_open_drain = members.m_port_open_drain ?? 0;
        h_m_port_open_drain[0] = value;
    }
    function method_port_r_0(runtime) {
        const members = runtime.members;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        if ((((typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).isunset === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).isunset() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).isunset === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).isunset === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).isunset : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 0), "isunset"))) ? 0 : 1)) {
            let newval = ((((((runtime.readIndex((members.m_port_cb_r ?? 0), 0)(0, (((~h_m_port_ddr[0])) & ((~h_m_port_mask[0]))))) & ((~h_m_port_mask[0])))) & 0xff)) & 0xff);
            if (((Number(newval) !== Number(h_m_port_input[0])) ? 1 : 0)) {
                0;
            }
            h_m_port_input[0] = newval;
        }
        return ((((h_m_port_mask[0]) | (((h_m_port_latch[0]) & (h_m_port_ddr[0]))))) | (((h_m_port_input[0]) & ((~h_m_port_ddr[0])))));
    }
    function method_port_r_1(runtime) {
        const members = runtime.members;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        if ((((typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).isunset === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).isunset() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).isunset === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).isunset === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).isunset : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 1), "isunset"))) ? 0 : 1)) {
            let newval = ((((((runtime.readIndex((members.m_port_cb_r ?? 0), 1)(0, (((~h_m_port_ddr[1])) & ((~h_m_port_mask[1]))))) & ((~h_m_port_mask[1])))) & 0xff)) & 0xff);
            if (((Number(newval) !== Number(h_m_port_input[1])) ? 1 : 0)) {
                0;
            }
            h_m_port_input[1] = newval;
        }
        return ((((h_m_port_mask[1]) | (((h_m_port_latch[1]) & (h_m_port_ddr[1]))))) | (((h_m_port_input[1]) & ((~h_m_port_ddr[1])))));
    }
    function method_port_r_2(runtime) {
        const members = runtime.members;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        if ((((typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).isunset === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).isunset() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).isunset === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).isunset === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).isunset : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 2), "isunset"))) ? 0 : 1)) {
            let newval = ((((((runtime.readIndex((members.m_port_cb_r ?? 0), 2)(0, (((~h_m_port_ddr[2])) & ((~h_m_port_mask[2]))))) & ((~h_m_port_mask[2])))) & 0xff)) & 0xff);
            if (((Number(newval) !== Number(h_m_port_input[2])) ? 1 : 0)) {
                0;
            }
            h_m_port_input[2] = newval;
        }
        return ((((h_m_port_mask[2]) | (((h_m_port_latch[2]) & (h_m_port_ddr[2]))))) | (((h_m_port_input[2]) & ((~h_m_port_ddr[2])))));
    }
    function method_port_r_3(runtime) {
        const members = runtime.members;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        if ((((typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).isunset === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).isunset() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).isunset === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).isunset === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).isunset : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 3), "isunset"))) ? 0 : 1)) {
            let newval = ((((((runtime.readIndex((members.m_port_cb_r ?? 0), 3)(0, (((~h_m_port_ddr[3])) & ((~h_m_port_mask[3]))))) & ((~h_m_port_mask[3])))) & 0xff)) & 0xff);
            if (((Number(newval) !== Number(h_m_port_input[3])) ? 1 : 0)) {
                0;
            }
            h_m_port_input[3] = newval;
        }
        return ((((h_m_port_mask[3]) | (((h_m_port_latch[3]) & (h_m_port_ddr[3]))))) | (((h_m_port_input[3]) & ((~h_m_port_ddr[3])))));
    }
    function method_port_latch_w_0(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        data = ((((data) & ((~h_m_port_mask[0])))) & 0xff);
        let diff = ((((h_m_port_latch[0]) ^ (data))) & 0xff);
        if (diff) {
            0;
        }
        h_m_port_latch[0] = data;
        if (((diff) & (h_m_port_ddr[0]))) {
            method_port_cb_w_0(runtime);
        }
    }
    function method_port_cb_w_0(runtime) {
        const members = runtime.members;
        const h_m_port_open_drain = members.m_port_open_drain ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        let data = ((((((h_m_port_open_drain[0]) ? (((h_m_port_latch[0]) | ((~h_m_port_ddr[0])))) : (h_m_port_latch[0]))) & 0xff)) & 0xff);
        let mask = ((((((h_m_port_open_drain[0]) ? ((((~h_m_port_latch[0])) & (h_m_port_ddr[0]))) : (h_m_port_ddr[0]))) & 0xff)) & 0xff);
        runtime.readIndex((members.m_port_cb_w ?? 0), 0)(0, data, mask);
    }
    function method_port_latch_w_1(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        data = ((((data) & ((~h_m_port_mask[1])))) & 0xff);
        let diff = ((((h_m_port_latch[1]) ^ (data))) & 0xff);
        if (diff) {
            0;
        }
        h_m_port_latch[1] = data;
        if (((diff) & (h_m_port_ddr[1]))) {
            method_port_cb_w_1(runtime);
        }
    }
    function method_port_cb_w_1(runtime) {
        const members = runtime.members;
        const h_m_port_open_drain = members.m_port_open_drain ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        let data = ((((((h_m_port_open_drain[1]) ? (((h_m_port_latch[1]) | ((~h_m_port_ddr[1])))) : (h_m_port_latch[1]))) & 0xff)) & 0xff);
        let mask = ((((((h_m_port_open_drain[1]) ? ((((~h_m_port_latch[1])) & (h_m_port_ddr[1]))) : (h_m_port_ddr[1]))) & 0xff)) & 0xff);
        runtime.readIndex((members.m_port_cb_w ?? 0), 1)(0, data, mask);
    }
    function method_port_latch_w_2(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        data = ((((data) & ((~h_m_port_mask[2])))) & 0xff);
        let diff = ((((h_m_port_latch[2]) ^ (data))) & 0xff);
        if (diff) {
            0;
        }
        h_m_port_latch[2] = data;
        if (((diff) & (h_m_port_ddr[2]))) {
            method_port_cb_w_2(runtime);
        }
    }
    function method_port_cb_w_2(runtime) {
        const members = runtime.members;
        const h_m_port_open_drain = members.m_port_open_drain ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        let data = ((((((h_m_port_open_drain[2]) ? (((h_m_port_latch[2]) | ((~h_m_port_ddr[2])))) : (h_m_port_latch[2]))) & 0xff)) & 0xff);
        let mask = ((((((h_m_port_open_drain[2]) ? ((((~h_m_port_latch[2])) & (h_m_port_ddr[2]))) : (h_m_port_ddr[2]))) & 0xff)) & 0xff);
        runtime.readIndex((members.m_port_cb_w ?? 0), 2)(0, data, mask);
    }
    function method_port_latch_w_3(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        data = ((((data) & ((~h_m_port_mask[3])))) & 0xff);
        let diff = ((((h_m_port_latch[3]) ^ (data))) & 0xff);
        if (diff) {
            0;
        }
        h_m_port_latch[3] = data;
        if (((diff) & (h_m_port_ddr[3]))) {
            method_port_cb_w_3(runtime);
        }
    }
    function method_port_cb_w_3(runtime) {
        const members = runtime.members;
        const h_m_port_open_drain = members.m_port_open_drain ?? 0;
        const h_m_port_latch = members.m_port_latch ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        let data = ((((((h_m_port_open_drain[3]) ? (((h_m_port_latch[3]) | ((~h_m_port_ddr[3])))) : (h_m_port_latch[3]))) & 0xff)) & 0xff);
        let mask = ((((((h_m_port_open_drain[3]) ? ((((~h_m_port_latch[3])) & (h_m_port_ddr[3]))) : (h_m_port_ddr[3]))) & 0xff)) & 0xff);
        runtime.readIndex((members.m_port_cb_w ?? 0), 3)(0, data, mask);
    }
    function method_port_ddr_w_0(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        data = ((((data) & ((~h_m_port_mask[0])))) & 0xff);
        if (((Number(data) !== Number(h_m_port_ddr[0])) ? 1 : 0)) {
            0;
            h_m_port_ddr[0] = data;
            method_port_cb_w_0(runtime);
        }
    }
    function method_port_ddr_w_1(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        data = ((((data) & ((~h_m_port_mask[1])))) & 0xff);
        if (((Number(data) !== Number(h_m_port_ddr[1])) ? 1 : 0)) {
            0;
            h_m_port_ddr[1] = data;
            method_port_cb_w_1(runtime);
        }
    }
    function method_port_ddr_w_2(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_ddr = members.m_port_ddr ?? 0;
        data = ((((data) & ((~h_m_port_mask[2])))) & 0xff);
        if (((Number(data) !== Number(h_m_port_ddr[2])) ? 1 : 0)) {
            0;
            h_m_port_ddr[2] = data;
            method_port_cb_w_2(runtime);
        }
    }
    function method_acr_r(runtime) {
        const members = runtime.members;
        return (((((((members.m_acr_mux ?? 0)) | (128))) | (120))) & 0xff);
    }
    function method_acr_w(runtime, data) {
        const members = runtime.members;
        members.m_acr_mux = ((((data) & (7))) & 0xff);
        0;
    }
    function method_arr_r(runtime) {
        const members = runtime.members;
        if (((Number((members.m_acr_mux ?? 0)) < Number(4)) ? 1 : 0)) {
            let val = ((runtime.readIndex((members.m_portan_cb_r ?? 0), (members.m_acr_mux ?? 0))()) & 0xff);
            0;
            return ((val) & 0xff);
        }
        else {
            0;
            return ((255) & 0xff);
        }
    }
    function method_arr_w(runtime, data) {
        const members = runtime.members;
    }
    function method_porta_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 0), "bind"));
    }
    function method_portb_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 1), "bind"));
    }
    function method_portc_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 2), "bind"));
    }
    function method_portd_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 3), "bind"));
    }
    function method_porta_w(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind : runtime.container(runtime.readIndex((members.m_port_cb_w ?? 0), 0), "bind"));
    }
    function method_portb_w(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind : runtime.container(runtime.readIndex((members.m_port_cb_w ?? 0), 1), "bind"));
    }
    function method_portc_w(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind : runtime.container(runtime.readIndex((members.m_port_cb_w ?? 0), 2), "bind"));
    }
    function method_timer_w(runtime, state) {
        const members = runtime.members;
        (members.m_timer.timer_w?.(state) ?? 0);
    }
    function method_map(runtime, map) {
        const members = runtime.members;
        runtime.invoke("internal_map", map);
    }
    function method_port_input_w_0(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[0] = ((data) & ((~h_m_port_mask[0])));
    }
    function method_port_input_w_1(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[1] = ((data) & ((~h_m_port_mask[1])));
    }
    function method_port_input_w_2(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[2] = ((data) & ((~h_m_port_mask[2])));
    }
    function method_port_input_w_3(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[3] = ((data) & ((~h_m_port_mask[3])));
    }
    function method_misc_r(runtime) {
        const members = runtime.members;
        return (((members.m_mr ?? 0)) & 0xff);
    }
    function method_misc_w(runtime, data) {
        const members = runtime.members;
        members.m_mr = ((data) & 0xff);
    }
    function method_m6805_hmos_device__porta_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 0))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 0), "bind"));
    }
    function method_m6805_hmos_device__portb_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 1))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 1), "bind"));
    }
    function method_m6805_hmos_device__portc_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 2))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 2), "bind"));
    }
    function method_m6805_hmos_device__portd_r(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_r ?? 0), 3))).bind : runtime.container(runtime.readIndex((members.m_port_cb_r ?? 0), 3), "bind"));
    }
    function method_m6805_hmos_device__porta_w(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 0))).bind : runtime.container(runtime.readIndex((members.m_port_cb_w ?? 0), 0), "bind"));
    }
    function method_m6805_hmos_device__portb_w(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 1))).bind : runtime.container(runtime.readIndex((members.m_port_cb_w ?? 0), 1), "bind"));
    }
    function method_m6805_hmos_device__portc_w(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_port_cb_w ?? 0), 2))).bind : runtime.container(runtime.readIndex((members.m_port_cb_w ?? 0), 2), "bind"));
    }
    function method_m6805_hmos_device__timer_w(runtime, state) {
        const members = runtime.members;
        (members.m_timer.timer_w?.(state) ?? 0);
    }
    function method_m6805_hmos_device__port_input_w_0(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[0] = ((data) & ((~h_m_port_mask[0])));
    }
    function method_m6805_hmos_device__port_input_w_1(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[1] = ((data) & ((~h_m_port_mask[1])));
    }
    function method_m6805_hmos_device__port_input_w_2(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[2] = ((data) & ((~h_m_port_mask[2])));
    }
    function method_m6805_hmos_device__port_input_w_3(runtime, data) {
        const members = runtime.members;
        const h_m_port_mask = members.m_port_mask ?? 0;
        const h_m_port_input = members.m_port_input ?? 0;
        h_m_port_input[3] = ((data) & ((~h_m_port_mask[3])));
    }
    function method_m6805_hmos_device__misc_r(runtime) {
        const members = runtime.members;
        return (((members.m_mr ?? 0)) & 0xff);
    }
    function method_m6805_hmos_device__misc_w(runtime, data) {
        const members = runtime.members;
        members.m_mr = ((data) & 0xff);
    }
    function method_eprom_r_128(runtime, offset) {
        const members = runtime.members;
        if ((((method_pcr_vpon(runtime)) && (((method_pcr_ple(runtime)) ? 0 : 1))) ? 1 : 0)) {
            0;
        }
        return (((((((method_pcr_vpon(runtime)) ? 0 : 1)) || (((method_pcr_ple(runtime)) ? 0 : 1))) ? 1 : 0)) ? (runtime.readIndex((members.m_user_rom ?? 0), ((128) + (offset)))) : (255));
    }
    function method_pcr_vpon(runtime) {
        const members = runtime.members;
        return ((((((members.m_pcr ?? 0)) >>> (2)) & 1)) ? 0 : 1);
    }
    function method_pcr_ple(runtime) {
        const members = runtime.members;
        return ((((((members.m_pcr ?? 0)) >>> (0)) & 1)) ? 0 : 1);
    }
    function method_eprom_r_2040(runtime, offset) {
        const members = runtime.members;
        if ((((method_pcr_vpon(runtime)) && (((method_pcr_ple(runtime)) ? 0 : 1))) ? 1 : 0)) {
            0;
        }
        return (((((((method_pcr_vpon(runtime)) ? 0 : 1)) || (((method_pcr_ple(runtime)) ? 0 : 1))) ? 1 : 0)) ? (runtime.readIndex((members.m_user_rom ?? 0), ((2040) + (offset)))) : (255));
    }
    function method_eprom_r_4088(runtime, offset) {
        const members = runtime.members;
        if ((((method_pcr_vpon(runtime)) && (((method_pcr_ple(runtime)) ? 0 : 1))) ? 1 : 0)) {
            0;
        }
        return (((((((method_pcr_vpon(runtime)) ? 0 : 1)) || (((method_pcr_ple(runtime)) ? 0 : 1))) ? 1 : 0)) ? (runtime.readIndex((members.m_user_rom ?? 0), ((4088) + (offset)))) : (255));
    }
    function method_eprom_w_128(runtime, offset, data) {
        const members = runtime.members;
        0;
        if ((((method_pcr_vpon(runtime)) && (method_pcr_ple(runtime))) ? 1 : 0)) {
            if (((method_pcr_pge(runtime)) ? 0 : 1)) {
                members.m_pl_data = ((data) & 0xff);
                members.m_pl_addr = ((((128) + (offset))) & 0xffff);
            }
            else {
                0;
            }
        }
    }
    function method_pcr_pge(runtime) {
        const members = runtime.members;
        return ((((((members.m_pcr ?? 0)) >>> (1)) & 1)) ? 0 : 1);
    }
    function method_eprom_w_2040(runtime, offset, data) {
        const members = runtime.members;
        0;
        if ((((method_pcr_vpon(runtime)) && (method_pcr_ple(runtime))) ? 1 : 0)) {
            if (((method_pcr_pge(runtime)) ? 0 : 1)) {
                members.m_pl_data = ((data) & 0xff);
                members.m_pl_addr = ((((2040) + (offset))) & 0xffff);
            }
            else {
                0;
            }
        }
    }
    function method_eprom_w_4088(runtime, offset, data) {
        const members = runtime.members;
        0;
        if ((((method_pcr_vpon(runtime)) && (method_pcr_ple(runtime))) ? 1 : 0)) {
            if (((method_pcr_pge(runtime)) ? 0 : 1)) {
                members.m_pl_data = ((data) & 0xff);
                members.m_pl_addr = ((((4088) + (offset))) & 0xffff);
            }
            else {
                0;
            }
        }
    }
    function method_pcr_r(runtime) {
        const members = runtime.members;
        return (((members.m_pcr ?? 0)) & 0xff);
    }
    function method_pcr_w(runtime, data) {
        const members = runtime.members;
        0;
        data = ((((data) | (((((data) & (1))) << (1))))) & 0xff);
        if ((((((method_pcr_pge(runtime)) ? 0 : 1)) && ((((((data) >>> (1)) & 1)) ? 0 : 1))) ? 1 : 0)) {
            0;
            if (method_pcr_vpon(runtime)) {
                runtime.writeIndex(runtime.writableMember("m_user_rom"), (members.m_pl_addr ?? 0), ((runtime.readIndex(runtime.writableMember("m_user_rom"), (members.m_pl_addr ?? 0))) | ((members.m_pl_data ?? 0))));
            }
        }
        members.m_pcr = (((((((members.m_pcr ?? 0)) & (252))) | (((data) & (3))))) & 0xff);
    }
    function method_get_user_rom(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_user_rom ?? 0), 0);
    }
    function method_m68705_device__get_user_rom(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_user_rom ?? 0), 0);
    }
    function method_m68705_device__pcr_vpon(runtime) {
        const members = runtime.members;
        return ((((((members.m_pcr ?? 0)) >>> (2)) & 1)) ? 0 : 1);
    }
    function method_m68705_device__pcr_pge(runtime) {
        const members = runtime.members;
        return ((((((members.m_pcr ?? 0)) >>> (1)) & 1)) ? 0 : 1);
    }
    function method_m68705_device__pcr_ple(runtime) {
        const members = runtime.members;
        return ((((((members.m_pcr ?? 0)) >>> (0)) & 1)) ? 0 : 1);
    }
    return {
        "burn_cycles": method_burn_cycles,
        "set_z8": method_set_z8,
        "set_n8": method_set_n8,
        "set_c8": method_set_c8,
        "rdop_1": method_rdop_1,
        "rdop_0": method_rdop_0,
        "test_il": method_test_il,
        "brset_0_0": method_brset_0_0,
        "rdop_arg_0": method_rdop_arg_0,
        "rm_0": method_rm_0,
        "rdmem_0": method_rdmem_0,
        "brset_0_1": method_brset_0_1,
        "brset_0_2": method_brset_0_2,
        "brset_0_3": method_brset_0_3,
        "brset_0_4": method_brset_0_4,
        "brset_0_5": method_brset_0_5,
        "brset_0_6": method_brset_0_6,
        "brset_0_7": method_brset_0_7,
        "brset_1_0": method_brset_1_0,
        "rdop_arg_1": method_rdop_arg_1,
        "rm_1": method_rm_1,
        "rdmem_1": method_rdmem_1,
        "brset_1_1": method_brset_1_1,
        "brset_1_2": method_brset_1_2,
        "brset_1_3": method_brset_1_3,
        "brset_1_4": method_brset_1_4,
        "brset_1_5": method_brset_1_5,
        "brset_1_6": method_brset_1_6,
        "brset_1_7": method_brset_1_7,
        "brclr_0_0": method_brclr_0_0,
        "brclr_0_1": method_brclr_0_1,
        "brclr_0_2": method_brclr_0_2,
        "brclr_0_3": method_brclr_0_3,
        "brclr_0_4": method_brclr_0_4,
        "brclr_0_5": method_brclr_0_5,
        "brclr_0_6": method_brclr_0_6,
        "brclr_0_7": method_brclr_0_7,
        "brclr_1_0": method_brclr_1_0,
        "brclr_1_1": method_brclr_1_1,
        "brclr_1_2": method_brclr_1_2,
        "brclr_1_3": method_brclr_1_3,
        "brclr_1_4": method_brclr_1_4,
        "brclr_1_5": method_brclr_1_5,
        "brclr_1_6": method_brclr_1_6,
        "brclr_1_7": method_brclr_1_7,
        "bset_0_0": method_bset_0_0,
        "wm_0": method_wm_0,
        "wrmem_0": method_wrmem_0,
        "bset_0_1": method_bset_0_1,
        "bset_0_2": method_bset_0_2,
        "bset_0_3": method_bset_0_3,
        "bset_0_4": method_bset_0_4,
        "bset_0_5": method_bset_0_5,
        "bset_0_6": method_bset_0_6,
        "bset_0_7": method_bset_0_7,
        "bset_1_0": method_bset_1_0,
        "wm_1": method_wm_1,
        "wrmem_1": method_wrmem_1,
        "bset_1_1": method_bset_1_1,
        "bset_1_2": method_bset_1_2,
        "bset_1_3": method_bset_1_3,
        "bset_1_4": method_bset_1_4,
        "bset_1_5": method_bset_1_5,
        "bset_1_6": method_bset_1_6,
        "bset_1_7": method_bset_1_7,
        "bclr_0_0": method_bclr_0_0,
        "bclr_0_1": method_bclr_0_1,
        "bclr_0_2": method_bclr_0_2,
        "bclr_0_3": method_bclr_0_3,
        "bclr_0_4": method_bclr_0_4,
        "bclr_0_5": method_bclr_0_5,
        "bclr_0_6": method_bclr_0_6,
        "bclr_0_7": method_bclr_0_7,
        "bclr_1_0": method_bclr_1_0,
        "bclr_1_1": method_bclr_1_1,
        "bclr_1_2": method_bclr_1_2,
        "bclr_1_3": method_bclr_1_3,
        "bclr_1_4": method_bclr_1_4,
        "bclr_1_5": method_bclr_1_5,
        "bclr_1_6": method_bclr_1_6,
        "bclr_1_7": method_bclr_1_7,
        "neg_0_1": method_neg_0_1,
        "immword_0": method_immword_0,
        "clr_nzc": method_clr_nzc,
        "set_nzc8": method_set_nzc8,
        "set_nz8": method_set_nz8,
        "neg_0_4": method_neg_0_4,
        "neg_0_3": method_neg_0_3,
        "neg_1_1": method_neg_1_1,
        "immword_1": method_immword_1,
        "neg_1_4": method_neg_1_4,
        "neg_1_3": method_neg_1_3,
        "com_0_1": method_com_0_1,
        "clr_nz": method_clr_nz,
        "com_0_4": method_com_0_4,
        "com_0_3": method_com_0_3,
        "com_1_1": method_com_1_1,
        "com_1_4": method_com_1_4,
        "com_1_3": method_com_1_3,
        "lsr_0_1": method_lsr_0_1,
        "lsr_0_4": method_lsr_0_4,
        "lsr_0_3": method_lsr_0_3,
        "lsr_1_1": method_lsr_1_1,
        "lsr_1_4": method_lsr_1_4,
        "lsr_1_3": method_lsr_1_3,
        "ror_0_1": method_ror_0_1,
        "ror_0_4": method_ror_0_4,
        "ror_0_3": method_ror_0_3,
        "ror_1_1": method_ror_1_1,
        "ror_1_4": method_ror_1_4,
        "ror_1_3": method_ror_1_3,
        "asr_0_1": method_asr_0_1,
        "asr_0_4": method_asr_0_4,
        "asr_0_3": method_asr_0_3,
        "asr_1_1": method_asr_1_1,
        "asr_1_4": method_asr_1_4,
        "asr_1_3": method_asr_1_3,
        "lsl_0_1": method_lsl_0_1,
        "lsl_0_4": method_lsl_0_4,
        "lsl_0_3": method_lsl_0_3,
        "lsl_1_1": method_lsl_1_1,
        "lsl_1_4": method_lsl_1_4,
        "lsl_1_3": method_lsl_1_3,
        "rol_0_1": method_rol_0_1,
        "rol_0_4": method_rol_0_4,
        "rol_0_3": method_rol_0_3,
        "rol_1_1": method_rol_1_1,
        "rol_1_4": method_rol_1_4,
        "rol_1_3": method_rol_1_3,
        "dec_0_1": method_dec_0_1,
        "dec_0_4": method_dec_0_4,
        "dec_0_3": method_dec_0_3,
        "dec_1_1": method_dec_1_1,
        "dec_1_4": method_dec_1_4,
        "dec_1_3": method_dec_1_3,
        "inc_0_1": method_inc_0_1,
        "inc_0_4": method_inc_0_4,
        "inc_0_3": method_inc_0_3,
        "inc_1_1": method_inc_1_1,
        "inc_1_4": method_inc_1_4,
        "inc_1_3": method_inc_1_3,
        "tst_0_1": method_tst_0_1,
        "tst_0_4": method_tst_0_4,
        "tst_0_3": method_tst_0_3,
        "tst_1_1": method_tst_1_1,
        "tst_1_4": method_tst_1_4,
        "tst_1_3": method_tst_1_3,
        "clr_0_1": method_clr_0_1,
        "clr_0_4": method_clr_0_4,
        "clr_0_3": method_clr_0_3,
        "clr_1_1": method_clr_1_1,
        "clr_1_4": method_clr_1_4,
        "clr_1_3": method_clr_1_3,
        "suba_0_0": method_suba_0_0,
        "suba_0_1": method_suba_0_1,
        "suba_0_2": method_suba_0_2,
        "suba_0_5": method_suba_0_5,
        "suba_0_4": method_suba_0_4,
        "suba_0_3": method_suba_0_3,
        "suba_1_0": method_suba_1_0,
        "suba_1_1": method_suba_1_1,
        "suba_1_2": method_suba_1_2,
        "suba_1_5": method_suba_1_5,
        "suba_1_4": method_suba_1_4,
        "suba_1_3": method_suba_1_3,
        "cmpa_0_0": method_cmpa_0_0,
        "cmpa_0_1": method_cmpa_0_1,
        "cmpa_0_2": method_cmpa_0_2,
        "cmpa_0_5": method_cmpa_0_5,
        "cmpa_0_4": method_cmpa_0_4,
        "cmpa_0_3": method_cmpa_0_3,
        "cmpa_1_0": method_cmpa_1_0,
        "cmpa_1_1": method_cmpa_1_1,
        "cmpa_1_2": method_cmpa_1_2,
        "cmpa_1_5": method_cmpa_1_5,
        "cmpa_1_4": method_cmpa_1_4,
        "cmpa_1_3": method_cmpa_1_3,
        "sbca_0_0": method_sbca_0_0,
        "sbca_0_1": method_sbca_0_1,
        "sbca_0_2": method_sbca_0_2,
        "sbca_0_5": method_sbca_0_5,
        "sbca_0_4": method_sbca_0_4,
        "sbca_0_3": method_sbca_0_3,
        "sbca_1_0": method_sbca_1_0,
        "sbca_1_1": method_sbca_1_1,
        "sbca_1_2": method_sbca_1_2,
        "sbca_1_5": method_sbca_1_5,
        "sbca_1_4": method_sbca_1_4,
        "sbca_1_3": method_sbca_1_3,
        "cpx_0_0": method_cpx_0_0,
        "cpx_0_1": method_cpx_0_1,
        "cpx_0_2": method_cpx_0_2,
        "cpx_0_5": method_cpx_0_5,
        "cpx_0_4": method_cpx_0_4,
        "cpx_0_3": method_cpx_0_3,
        "cpx_1_0": method_cpx_1_0,
        "cpx_1_1": method_cpx_1_1,
        "cpx_1_2": method_cpx_1_2,
        "cpx_1_5": method_cpx_1_5,
        "cpx_1_4": method_cpx_1_4,
        "cpx_1_3": method_cpx_1_3,
        "anda_0_0": method_anda_0_0,
        "anda_0_1": method_anda_0_1,
        "anda_0_2": method_anda_0_2,
        "anda_0_5": method_anda_0_5,
        "anda_0_4": method_anda_0_4,
        "anda_0_3": method_anda_0_3,
        "anda_1_0": method_anda_1_0,
        "anda_1_1": method_anda_1_1,
        "anda_1_2": method_anda_1_2,
        "anda_1_5": method_anda_1_5,
        "anda_1_4": method_anda_1_4,
        "anda_1_3": method_anda_1_3,
        "bita_0_0": method_bita_0_0,
        "bita_0_1": method_bita_0_1,
        "bita_0_2": method_bita_0_2,
        "bita_0_5": method_bita_0_5,
        "bita_0_4": method_bita_0_4,
        "bita_0_3": method_bita_0_3,
        "bita_1_0": method_bita_1_0,
        "bita_1_1": method_bita_1_1,
        "bita_1_2": method_bita_1_2,
        "bita_1_5": method_bita_1_5,
        "bita_1_4": method_bita_1_4,
        "bita_1_3": method_bita_1_3,
        "lda_0_0": method_lda_0_0,
        "lda_0_1": method_lda_0_1,
        "lda_0_2": method_lda_0_2,
        "lda_0_5": method_lda_0_5,
        "lda_0_4": method_lda_0_4,
        "lda_0_3": method_lda_0_3,
        "lda_1_0": method_lda_1_0,
        "lda_1_1": method_lda_1_1,
        "lda_1_2": method_lda_1_2,
        "lda_1_5": method_lda_1_5,
        "lda_1_4": method_lda_1_4,
        "lda_1_3": method_lda_1_3,
        "sta_0_1": method_sta_0_1,
        "sta_0_2": method_sta_0_2,
        "sta_0_5": method_sta_0_5,
        "sta_0_4": method_sta_0_4,
        "sta_0_3": method_sta_0_3,
        "sta_1_1": method_sta_1_1,
        "sta_1_2": method_sta_1_2,
        "sta_1_5": method_sta_1_5,
        "sta_1_4": method_sta_1_4,
        "sta_1_3": method_sta_1_3,
        "eora_0_0": method_eora_0_0,
        "eora_0_1": method_eora_0_1,
        "eora_0_2": method_eora_0_2,
        "eora_0_5": method_eora_0_5,
        "eora_0_4": method_eora_0_4,
        "eora_0_3": method_eora_0_3,
        "eora_1_0": method_eora_1_0,
        "eora_1_1": method_eora_1_1,
        "eora_1_2": method_eora_1_2,
        "eora_1_5": method_eora_1_5,
        "eora_1_4": method_eora_1_4,
        "eora_1_3": method_eora_1_3,
        "adca_0_0": method_adca_0_0,
        "clr_hnzc": method_clr_hnzc,
        "set_hnzc8": method_set_hnzc8,
        "set_h": method_set_h,
        "adca_0_1": method_adca_0_1,
        "adca_0_2": method_adca_0_2,
        "adca_0_5": method_adca_0_5,
        "adca_0_4": method_adca_0_4,
        "adca_0_3": method_adca_0_3,
        "adca_1_0": method_adca_1_0,
        "adca_1_1": method_adca_1_1,
        "adca_1_2": method_adca_1_2,
        "adca_1_5": method_adca_1_5,
        "adca_1_4": method_adca_1_4,
        "adca_1_3": method_adca_1_3,
        "ora_0_0": method_ora_0_0,
        "ora_0_1": method_ora_0_1,
        "ora_0_2": method_ora_0_2,
        "ora_0_5": method_ora_0_5,
        "ora_0_4": method_ora_0_4,
        "ora_0_3": method_ora_0_3,
        "ora_1_0": method_ora_1_0,
        "ora_1_1": method_ora_1_1,
        "ora_1_2": method_ora_1_2,
        "ora_1_5": method_ora_1_5,
        "ora_1_4": method_ora_1_4,
        "ora_1_3": method_ora_1_3,
        "adda_0_0": method_adda_0_0,
        "adda_0_1": method_adda_0_1,
        "adda_0_2": method_adda_0_2,
        "adda_0_5": method_adda_0_5,
        "adda_0_4": method_adda_0_4,
        "adda_0_3": method_adda_0_3,
        "adda_1_0": method_adda_1_0,
        "adda_1_1": method_adda_1_1,
        "adda_1_2": method_adda_1_2,
        "adda_1_5": method_adda_1_5,
        "adda_1_4": method_adda_1_4,
        "adda_1_3": method_adda_1_3,
        "jmp_0_1": method_jmp_0_1,
        "jmp_0_2": method_jmp_0_2,
        "jmp_0_5": method_jmp_0_5,
        "jmp_0_4": method_jmp_0_4,
        "jmp_0_3": method_jmp_0_3,
        "jmp_1_1": method_jmp_1_1,
        "jmp_1_2": method_jmp_1_2,
        "jmp_1_5": method_jmp_1_5,
        "jmp_1_4": method_jmp_1_4,
        "jmp_1_3": method_jmp_1_3,
        "jsr_0_1": method_jsr_0_1,
        "pushword_0": method_pushword_0,
        "pushbyte_0": method_pushbyte_0,
        "jsr_0_2": method_jsr_0_2,
        "jsr_0_5": method_jsr_0_5,
        "jsr_0_4": method_jsr_0_4,
        "jsr_0_3": method_jsr_0_3,
        "jsr_1_1": method_jsr_1_1,
        "pushword_1": method_pushword_1,
        "pushbyte_1": method_pushbyte_1,
        "jsr_1_2": method_jsr_1_2,
        "jsr_1_5": method_jsr_1_5,
        "jsr_1_4": method_jsr_1_4,
        "jsr_1_3": method_jsr_1_3,
        "ldx_0_0": method_ldx_0_0,
        "ldx_0_1": method_ldx_0_1,
        "ldx_0_2": method_ldx_0_2,
        "ldx_0_5": method_ldx_0_5,
        "ldx_0_4": method_ldx_0_4,
        "ldx_0_3": method_ldx_0_3,
        "ldx_1_0": method_ldx_1_0,
        "ldx_1_1": method_ldx_1_1,
        "ldx_1_2": method_ldx_1_2,
        "ldx_1_5": method_ldx_1_5,
        "ldx_1_4": method_ldx_1_4,
        "ldx_1_3": method_ldx_1_3,
        "stx_0_1": method_stx_0_1,
        "stx_0_2": method_stx_0_2,
        "stx_0_5": method_stx_0_5,
        "stx_0_4": method_stx_0_4,
        "stx_0_3": method_stx_0_3,
        "stx_1_1": method_stx_1_1,
        "stx_1_2": method_stx_1_2,
        "stx_1_5": method_stx_1_5,
        "stx_1_4": method_stx_1_4,
        "stx_1_3": method_stx_1_3,
        "execute_clocks_to_cycles": method_execute_clocks_to_cycles,
        "execute_cycles_to_clocks": method_execute_cycles_to_clocks,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_run": method_execute_run,
        "interrupt": method_interrupt,
        "rm16_1": method_rm16_1,
        "clear_pair": method_clear_pair,
        "rm16_0": method_rm16_0,
        "m6805_base_device::set_z8": method_m6805_base_device__set_z8,
        "m6805_base_device::set_n8": method_m6805_base_device__set_n8,
        "m6805_base_device::set_c8": method_m6805_base_device__set_c8,
        "m6805_base_device::rdop_1": method_m6805_base_device__rdop_1,
        "m6805_base_device::rdop_0": method_m6805_base_device__rdop_0,
        "set_port_open_drain_0": method_set_port_open_drain_0,
        "port_r_0": method_port_r_0,
        "port_r_1": method_port_r_1,
        "port_r_2": method_port_r_2,
        "port_r_3": method_port_r_3,
        "port_latch_w_0": method_port_latch_w_0,
        "port_cb_w_0": method_port_cb_w_0,
        "port_latch_w_1": method_port_latch_w_1,
        "port_cb_w_1": method_port_cb_w_1,
        "port_latch_w_2": method_port_latch_w_2,
        "port_cb_w_2": method_port_cb_w_2,
        "port_latch_w_3": method_port_latch_w_3,
        "port_cb_w_3": method_port_cb_w_3,
        "port_ddr_w_0": method_port_ddr_w_0,
        "port_ddr_w_1": method_port_ddr_w_1,
        "port_ddr_w_2": method_port_ddr_w_2,
        "acr_r": method_acr_r,
        "acr_w": method_acr_w,
        "arr_r": method_arr_r,
        "arr_w": method_arr_w,
        "porta_r": method_porta_r,
        "portb_r": method_portb_r,
        "portc_r": method_portc_r,
        "portd_r": method_portd_r,
        "porta_w": method_porta_w,
        "portb_w": method_portb_w,
        "portc_w": method_portc_w,
        "timer_w": method_timer_w,
        "map": method_map,
        "port_input_w_0": method_port_input_w_0,
        "port_input_w_1": method_port_input_w_1,
        "port_input_w_2": method_port_input_w_2,
        "port_input_w_3": method_port_input_w_3,
        "misc_r": method_misc_r,
        "misc_w": method_misc_w,
        "m6805_hmos_device::porta_r": method_m6805_hmos_device__porta_r,
        "m6805_hmos_device::portb_r": method_m6805_hmos_device__portb_r,
        "m6805_hmos_device::portc_r": method_m6805_hmos_device__portc_r,
        "m6805_hmos_device::portd_r": method_m6805_hmos_device__portd_r,
        "m6805_hmos_device::porta_w": method_m6805_hmos_device__porta_w,
        "m6805_hmos_device::portb_w": method_m6805_hmos_device__portb_w,
        "m6805_hmos_device::portc_w": method_m6805_hmos_device__portc_w,
        "m6805_hmos_device::timer_w": method_m6805_hmos_device__timer_w,
        "m6805_hmos_device::port_input_w_0": method_m6805_hmos_device__port_input_w_0,
        "m6805_hmos_device::port_input_w_1": method_m6805_hmos_device__port_input_w_1,
        "m6805_hmos_device::port_input_w_2": method_m6805_hmos_device__port_input_w_2,
        "m6805_hmos_device::port_input_w_3": method_m6805_hmos_device__port_input_w_3,
        "m6805_hmos_device::misc_r": method_m6805_hmos_device__misc_r,
        "m6805_hmos_device::misc_w": method_m6805_hmos_device__misc_w,
        "eprom_r_128": method_eprom_r_128,
        "pcr_vpon": method_pcr_vpon,
        "pcr_ple": method_pcr_ple,
        "eprom_r_2040": method_eprom_r_2040,
        "eprom_r_4088": method_eprom_r_4088,
        "eprom_w_128": method_eprom_w_128,
        "pcr_pge": method_pcr_pge,
        "eprom_w_2040": method_eprom_w_2040,
        "eprom_w_4088": method_eprom_w_4088,
        "pcr_r": method_pcr_r,
        "pcr_w": method_pcr_w,
        "get_user_rom": method_get_user_rom,
        "m68705_device::get_user_rom": method_m68705_device__get_user_rom,
        "m68705_device::pcr_vpon": method_m68705_device__pcr_vpon,
        "m68705_device::pcr_pge": method_m68705_device__pcr_pge,
        "m68705_device::pcr_ple": method_m68705_device__pcr_ple
    };
})();
definition.compiledMethodLinks = ["CALL_METHOD", "__throw", "debugger_instruction_hook", "emu_fatalerror", "standard_irq_callback"];
definition.allocations["m6805_timer"].compiledMethods = (() => {
    function method_set_divisor(runtime, divisor) {
        const members = runtime.members;
        members.m_divisor = ((((divisor) & (7))) >>> 0);
    }
    function method_set_source(runtime, source) {
        const members = runtime.members;
        members.m_source = source;
    }
    function method_timer_w(runtime, state) {
        const members = runtime.members;
        if (((((members.m_timer ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) {
            members.m_timer_edges = ((((members.m_timer_edges) + (1))) >>> 0);
        }
        members.m_timer = ((((state) ? 1 : 0)) ? 1 : 0);
    }
    function method_m_parent(runtime, parent) {
        const members = runtime.members;
    }
    function method_set_options(runtime, options) {
        const members = runtime.members;
        members.m_options = ((options) & 0xff);
    }
    function method_start(runtime, base = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_timer ?? 0)) : runtime.macro("NAME", (members.m_timer ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_timer_edges ?? 0)) : runtime.macro("NAME", (members.m_timer_edges ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_prescale ?? 0)) : runtime.macro("NAME", (members.m_prescale ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_tdr ?? 0)) : runtime.macro("NAME", (members.m_tdr ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_tcr ?? 0)) : runtime.macro("NAME", (members.m_tcr ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).state_add?.(((base) + (0)), "PS", (members.m_prescale ?? 0)) ?? 0);
        ((runtime.dereference(members.m_parent)).state_add?.(((base) + (1)), "TDR", (members.m_tdr ?? 0)) ?? 0);
        ((runtime.dereference(members.m_parent)).state_add?.(((base) + (2)), "TCR", (members.m_tcr ?? 0)) ?? 0);
    }
    function method_reset(runtime) {
        const members = runtime.members;
        members.m_timer_edges = ((0) >>> 0);
        members.m_prescale = ((127) & 0xff);
        members.m_tdr = ((255) & 0xff);
        members.m_tcr = ((127) & 0xff);
    }
    function method_tdr_r(runtime) {
        const members = runtime.members;
        return (((members.m_tdr ?? 0)) & 0xff);
    }
    function method_tdr_w(runtime, data) {
        const members = runtime.members;
        members.m_tdr = ((data) & 0xff);
    }
    function method_tcr_r(runtime) {
        const members = runtime.members;
        return (((((((members.m_options ?? 0)) & (2))) ? ((((members.m_tcr ?? 0)) | (8))) : ((((members.m_tcr ?? 0)) & (-9))))) & 0xff);
    }
    function method_m6805_timer__m_parent(runtime, parent) {
        const members = runtime.members;
    }
    function method_m6805_timer__set_options(runtime, options) {
        const members = runtime.members;
        members.m_options = ((options) & 0xff);
    }
    function method_m6805_timer__set_divisor(runtime, divisor) {
        const members = runtime.members;
        members.m_divisor = ((((divisor) & (7))) >>> 0);
    }
    function method_m6805_timer__set_source(runtime, source) {
        const members = runtime.members;
        members.m_source = source;
    }
    function method_m6805_timer__start(runtime, base = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_timer ?? 0)) : runtime.macro("NAME", (members.m_timer ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_timer_edges ?? 0)) : runtime.macro("NAME", (members.m_timer_edges ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_prescale ?? 0)) : runtime.macro("NAME", (members.m_prescale ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_tdr ?? 0)) : runtime.macro("NAME", (members.m_tdr ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_tcr ?? 0)) : runtime.macro("NAME", (members.m_tcr ?? 0)))) ?? 0);
        ((runtime.dereference(members.m_parent)).state_add?.(((base) + (0)), "PS", (members.m_prescale ?? 0)) ?? 0);
        ((runtime.dereference(members.m_parent)).state_add?.(((base) + (1)), "TDR", (members.m_tdr ?? 0)) ?? 0);
        ((runtime.dereference(members.m_parent)).state_add?.(((base) + (2)), "TCR", (members.m_tcr ?? 0)) ?? 0);
    }
    function method_m6805_timer__reset(runtime) {
        const members = runtime.members;
        members.m_timer_edges = ((0) >>> 0);
        members.m_prescale = ((127) & 0xff);
        members.m_tdr = ((255) & 0xff);
        members.m_tcr = ((127) & 0xff);
    }
    function method_m6805_timer__tdr_r(runtime) {
        const members = runtime.members;
        return (((members.m_tdr ?? 0)) & 0xff);
    }
    function method_m6805_timer__tdr_w(runtime, data) {
        const members = runtime.members;
        members.m_tdr = ((data) & 0xff);
    }
    function method_m6805_timer__tcr_r(runtime) {
        const members = runtime.members;
        return (((((((members.m_options ?? 0)) & (2))) ? ((((members.m_tcr ?? 0)) | (8))) : ((((members.m_tcr ?? 0)) & (-9))))) & 0xff);
    }
    function method___construct(runtime, parent) {
        const members = runtime.members;
        members.m_parent = parent;
        members.m_options = ((0) & 0xff);
        members.m_divisor = ((7) >>> 0);
        members.m_source = 0;
        members.m_timer = ((1) ? 1 : 0);
    }
    return {
        "set_divisor": method_set_divisor,
        "set_source": method_set_source,
        "timer_w": method_timer_w,
        "m_parent": method_m_parent,
        "set_options": method_set_options,
        "start": method_start,
        "reset": method_reset,
        "tdr_r": method_tdr_r,
        "tdr_w": method_tdr_w,
        "tcr_r": method_tcr_r,
        "m6805_timer::m_parent": method_m6805_timer__m_parent,
        "m6805_timer::set_options": method_m6805_timer__set_options,
        "m6805_timer::set_divisor": method_m6805_timer__set_divisor,
        "m6805_timer::set_source": method_m6805_timer__set_source,
        "m6805_timer::start": method_m6805_timer__start,
        "m6805_timer::reset": method_m6805_timer__reset,
        "m6805_timer::tdr_r": method_m6805_timer__tdr_r,
        "m6805_timer::tdr_w": method_m6805_timer__tdr_w,
        "m6805_timer::tcr_r": method_m6805_timer__tcr_r,
        "__construct": method___construct
    };
})();
definition.allocations["m6805_timer"].compiledMethodLinks = ["NAME"];
export const device = definition;
export default device;
