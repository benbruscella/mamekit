import deviceData from './pic8259.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let data = ((0) & 0xff);
        switch (offset) {
            case 0:
                {
                    if ((((members.m_ocw3 ?? 0)) & (4))) {
                        if (((Number((members.m_current_level ?? 0)) !== Number(-1)) ? 1 : 0)) {
                            data = ((((128) | ((members.m_current_level ?? 0)))) & 0xff);
                            if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                                if (((((((members.m_level_trig_mode ?? 0)) ? 0 : 1)) && (((((((members.m_master ?? 0)) ? 0 : 1)) || (((((((members.m_slave ?? 0)) >>> ((members.m_current_level ?? 0))) & 1)) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_irr = ((((members.m_irr) & ((~((1) << ((members.m_current_level ?? 0))))))) & 0xff);
                                }
                                if ((((members.m_auto_eoi ?? 0)) ? 0 : 1)) {
                                    members.m_isr = ((((members.m_isr) | (((1) << ((members.m_current_level ?? 0)))))) & 0xff);
                                }
                                ((runtime.dereference(members.m_irq_timer)).adjust?.(0) ?? 0);
                            }
                        }
                        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                            members.m_ocw3 = ((((members.m_ocw3) & (251))) & 0xff);
                        }
                    }
                    else {
                        switch ((((members.m_ocw3 ?? 0)) & (1))) {
                            case 0:
                                {
                                    data = (((members.m_irr ?? 0)) & 0xff);
                                    break;
                                }
                            case 1:
                                {
                                    data = (((((members.m_isr ?? 0)) & ((~(members.m_imr ?? 0))))) & 0xff);
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 1:
                {
                    data = (((members.m_imr ?? 0)) & 0xff);
                    break;
                }
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch (offset) {
            case 0:
                {
                    if (((data) & (16))) {
                        0;
                        members.m_imr = ((0) & 0xff);
                        members.m_isr = ((0) & 0xff);
                        members.m_slave = ((0) & 0xff);
                        members.m_level_trig_mode = ((((((data) & (8))) ? (1) : (0))) & 0xff);
                        members.m_vector_size = ((((((data) & (4))) ? (1) : (0))) & 0xff);
                        members.m_cascade = ((((((data) & (2))) ? (0) : (1))) & 0xff);
                        members.m_icw4_needed = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                        members.m_vector_addr_low = ((((data) & (224))) >>> 0);
                        members.m_state = 1;
                        members.m_current_level = ((-1) << 24 >> 24);
                        members.m_inta_sequence = ((0) & 0xff);
                        members.m_irr = (((((members.m_level_trig_mode ?? 0)) ? ((members.m_irq_lines ?? 0)) : (0))) & 0xff);
                        (__l["m_out_int_func"] ? __l["m_out_int_func"](Number(0)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(0) : runtime.invoke("m_out_int_func", 0));
                    }
                    else {
                        if (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0)) {
                            if (((Number(((data) & (152))) === Number(8)) ? 1 : 0)) {
                                0;
                                if ((((data) >>> (1)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (254))) | (((data) & (1))))) & 0xff);
                                }
                                if ((((data) >>> (2)) & 1)) {
                                    members.m_ocw3 = ((((members.m_ocw3) | (4))) & 0xff);
                                }
                                if ((((data) >>> (6)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (223))) | (((data) & (32))))) & 0xff);
                                }
                            }
                            else {
                                if (((Number(((data) & (24))) === Number(0)) ? 1 : 0)) {
                                    let n = ((((data) & (7))) | 0);
                                    let mask = ((((1) << (n))) & 0xff);
                                    0;
                                    switch (((data) & (224))) {
                                        case 0:
                                            {
                                                members.m_prio = ((0) & 0xff);
                                                break;
                                            }
                                        case 32:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (runtime.shiftRight(mask, 7)))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 64:
                                            {
                                                break;
                                            }
                                        case 96:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                }
                                                break;
                                            }
                                        case 128:
                                            {
                                                members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 160:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (runtime.shiftRight(mask, 7)))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 192:
                                            {
                                                members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 224:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                    members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                }
                                                break;
                                            }
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    switch ((members.m_state ?? 0)) {
                        case 0:
                            {
                                break;
                            }
                        case 1:
                            {
                                0;
                                members.m_base = ((((data) & (248))) & 0xff);
                                members.m_vector_addr_high = ((data) & 0xff);
                                if ((members.m_cascade ?? 0)) {
                                    members.m_state = 2;
                                }
                                else {
                                    members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                }
                                break;
                            }
                        case 2:
                            {
                                0;
                                members.m_slave = ((data) & 0xff);
                                members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                break;
                            }
                        case 3:
                            {
                                0;
                                members.m_nested = ((((((data) & (16))) ? (1) : (0))) & 0xff);
                                members.m_mode = ((((runtime.shiftRight(data, 2)) & (3))) & 0xff);
                                members.m_auto_eoi = ((((((data) & (2))) ? (1) : (0))) & 0xff);
                                members.m_is_x86 = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                                members.m_state = 4;
                                break;
                            }
                        case 4:
                            {
                                0;
                                members.m_imr = ((data) & 0xff);
                                break;
                            }
                    }
                    break;
                }
        }
        ((runtime.dereference(members.m_irq_timer)).adjust?.(0) ?? 0);
    }
    function method_pic8259_device__write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch (offset) {
            case 0:
                {
                    if (((data) & (16))) {
                        0;
                        members.m_imr = ((0) & 0xff);
                        members.m_isr = ((0) & 0xff);
                        members.m_slave = ((0) & 0xff);
                        members.m_level_trig_mode = ((((((data) & (8))) ? (1) : (0))) & 0xff);
                        members.m_vector_size = ((((((data) & (4))) ? (1) : (0))) & 0xff);
                        members.m_cascade = ((((((data) & (2))) ? (0) : (1))) & 0xff);
                        members.m_icw4_needed = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                        members.m_vector_addr_low = ((((data) & (224))) >>> 0);
                        members.m_state = 1;
                        members.m_current_level = ((-1) << 24 >> 24);
                        members.m_inta_sequence = ((0) & 0xff);
                        members.m_irr = (((((members.m_level_trig_mode ?? 0)) ? ((members.m_irq_lines ?? 0)) : (0))) & 0xff);
                        (__l["m_out_int_func"] ? __l["m_out_int_func"](Number(0)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(0) : runtime.invoke("m_out_int_func", 0));
                    }
                    else {
                        if (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0)) {
                            if (((Number(((data) & (152))) === Number(8)) ? 1 : 0)) {
                                0;
                                if ((((data) >>> (1)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (254))) | (((data) & (1))))) & 0xff);
                                }
                                if ((((data) >>> (2)) & 1)) {
                                    members.m_ocw3 = ((((members.m_ocw3) | (4))) & 0xff);
                                }
                                if ((((data) >>> (6)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (223))) | (((data) & (32))))) & 0xff);
                                }
                            }
                            else {
                                if (((Number(((data) & (24))) === Number(0)) ? 1 : 0)) {
                                    let n = ((((data) & (7))) | 0);
                                    let mask = ((((1) << (n))) & 0xff);
                                    0;
                                    switch (((data) & (224))) {
                                        case 0:
                                            {
                                                members.m_prio = ((0) & 0xff);
                                                break;
                                            }
                                        case 32:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (runtime.shiftRight(mask, 7)))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 64:
                                            {
                                                break;
                                            }
                                        case 96:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                }
                                                break;
                                            }
                                        case 128:
                                            {
                                                members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 160:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (runtime.shiftRight(mask, 7)))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 192:
                                            {
                                                members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 224:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                    members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                }
                                                break;
                                            }
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    switch ((members.m_state ?? 0)) {
                        case 0:
                            {
                                break;
                            }
                        case 1:
                            {
                                0;
                                members.m_base = ((((data) & (248))) & 0xff);
                                members.m_vector_addr_high = ((data) & 0xff);
                                if ((members.m_cascade ?? 0)) {
                                    members.m_state = 2;
                                }
                                else {
                                    members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                }
                                break;
                            }
                        case 2:
                            {
                                0;
                                members.m_slave = ((data) & 0xff);
                                members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                break;
                            }
                        case 3:
                            {
                                0;
                                members.m_nested = ((((((data) & (16))) ? (1) : (0))) & 0xff);
                                members.m_mode = ((((runtime.shiftRight(data, 2)) & (3))) & 0xff);
                                members.m_auto_eoi = ((((((data) & (2))) ? (1) : (0))) & 0xff);
                                members.m_is_x86 = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                                members.m_state = 4;
                                break;
                            }
                        case 4:
                            {
                                0;
                                members.m_imr = ((data) & 0xff);
                                break;
                            }
                    }
                    break;
                }
        }
        ((runtime.dereference(members.m_irq_timer)).adjust?.(0) ?? 0);
    }
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        for (let n = ((0) | 0), irq = (((members.m_prio ?? 0)) | 0); ((Number(n) < Number(8)) ? 1 : 0); n = ((((n) + (1))) | 0), irq = ((((((irq) + (1))) & (7))) | 0)) {
            let mask = ((((1) << (irq))) & 0xff);
            if (((((((members.m_isr ?? 0)) & (mask))) && (((((((((((((members.m_master ?? 0)) && ((members.m_cascade ?? 0))) ? 1 : 0)) && ((members.m_nested ?? 0))) ? 1 : 0)) && ((((members.m_slave ?? 0)) & (mask)))) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) {
                0;
                break;
            }
            if (((((((((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0)) && ((((members.m_irr ?? 0)) & (mask)))) ? 1 : 0)) && ((((((members.m_imr ?? 0)) & (mask))) ? 0 : 1))) ? 1 : 0)) {
                0;
                members.m_current_level = ((irq) << 24 >> 24);
                (__l["m_out_int_func"] ? __l["m_out_int_func"](Number(1)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(1) : runtime.invoke("m_out_int_func", 1));
                return;
            }
            if ((((((((((((((((members.m_isr ?? 0)) & (mask))) && ((members.m_master ?? 0))) ? 1 : 0)) && ((members.m_cascade ?? 0))) ? 1 : 0)) && ((members.m_nested ?? 0))) ? 1 : 0)) && ((((members.m_slave ?? 0)) & (mask)))) ? 1 : 0)) {
                break;
            }
        }
        members.m_current_level = ((-1) << 24 >> 24);
        (__l["m_out_int_func"] ? __l["m_out_int_func"](Number(0)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(0) : runtime.invoke("m_out_int_func", 0));
    }
    function method_ir0_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 0, state);
    }
    function method_set_irq_line(runtime, irq, state) {
        const members = runtime.members;
        let mask = ((((1) << (irq))) & 0xff);
        if ((((state) && ((((((members.m_irq_lines ?? 0)) & (mask))) ? 0 : 1))) ? 1 : 0)) {
            0;
            members.m_irr = ((((members.m_irr) | (mask))) & 0xff);
            members.m_irq_lines = ((((members.m_irq_lines) | (mask))) & 0xff);
        }
        else {
            if ((((((state) ? 0 : 1)) && ((((members.m_irq_lines ?? 0)) & (mask)))) ? 1 : 0)) {
                0;
                members.m_irq_lines = ((((members.m_irq_lines) & ((~mask)))) & 0xff);
                members.m_irr = ((((members.m_irr) & ((~mask)))) & 0xff);
            }
        }
        if (((Number((members.m_inta_sequence ?? 0)) === Number(0)) ? 1 : 0)) {
            ((runtime.dereference(members.m_irq_timer)).adjust?.(0) ?? 0);
        }
    }
    function method_ir1_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 1, state);
    }
    function method_ir2_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 2, state);
    }
    function method_ir3_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 3, state);
    }
    function method_ir4_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 4, state);
    }
    function method_ir5_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 5, state);
    }
    function method_ir6_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 6, state);
    }
    function method_ir7_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 7, state);
    }
    function method_pic8259_device__ir0_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 0, state);
    }
    function method_pic8259_device__ir1_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 1, state);
    }
    function method_pic8259_device__ir2_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 2, state);
    }
    function method_pic8259_device__ir3_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 3, state);
    }
    function method_pic8259_device__ir4_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 4, state);
    }
    function method_pic8259_device__ir5_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 5, state);
    }
    function method_pic8259_device__ir6_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 6, state);
    }
    function method_pic8259_device__ir7_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 7, state);
    }
    return {
        "read": method_read,
        "write": method_write,
        "pic8259_device::write": method_pic8259_device__write,
        "irq_timer_tick": method_irq_timer_tick,
        "ir0_w": method_ir0_w,
        "set_irq_line": method_set_irq_line,
        "ir1_w": method_ir1_w,
        "ir2_w": method_ir2_w,
        "ir3_w": method_ir3_w,
        "ir4_w": method_ir4_w,
        "ir5_w": method_ir5_w,
        "ir6_w": method_ir6_w,
        "ir7_w": method_ir7_w,
        "pic8259_device::ir0_w": method_pic8259_device__ir0_w,
        "pic8259_device::ir1_w": method_pic8259_device__ir1_w,
        "pic8259_device::ir2_w": method_pic8259_device__ir2_w,
        "pic8259_device::ir3_w": method_pic8259_device__ir3_w,
        "pic8259_device::ir4_w": method_pic8259_device__ir4_w,
        "pic8259_device::ir5_w": method_pic8259_device__ir5_w,
        "pic8259_device::ir6_w": method_pic8259_device__ir6_w,
        "pic8259_device::ir7_w": method_pic8259_device__ir7_w
    };
})();
definition.compiledMethodLinks = ["m_out_int_func", "machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
