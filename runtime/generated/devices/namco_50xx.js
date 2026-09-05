import deviceData from './namco_50xx.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_K_r(runtime) {
        const members = runtime.members;
        return (((members.m_cmd ?? runtime.member("m_cmd"))) >>> (4));
    }
    function method_R0_r(runtime) {
        const members = runtime.members;
        return (((members.m_cmd ?? runtime.member("m_cmd"))) & (15));
    }
    function method_R2_r(runtime) {
        const members = runtime.members;
        return (((members.m_rw ?? runtime.member("m_rw"))) & (1));
    }
    function method_O_w_sync(runtime, param) {
        const members = runtime.members;
        members.m_portO = ((param) & 0xff);
    }
    function method_rw_sync(runtime, param) {
        const members = runtime.members;
        members.m_rw = ((param) & 0xff);
    }
    function method_write_sync(runtime, param) {
        const members = runtime.members;
        members.m_cmd = ((param) & 0xff);
    }
    return {
        "K_r": method_K_r,
        "R0_r": method_R0_r,
        "R2_r": method_R2_r,
        "O_w_sync": method_O_w_sync,
        "rw_sync": method_rw_sync,
        "write_sync": method_write_sync
    };
})();
definition.children[0].definition.compiledMethods = (() => {
    function method_burn_cycles(runtime, cycles) {
        const members = runtime.members;
        members.m_icount = ((((members.m_icount) - (cycles))) | 0);
        if ((((members.m_pio ?? runtime.member("m_pio"))) & (128))) {
            members.m_TP = ((((members.m_TP) + (cycles))) & 0xff);
            while (((Number((members.m_TP ?? runtime.member("m_TP"))) >= Number(32)) ? 1 : 0)) {
                members.m_TP = ((((members.m_TP) - (32))) & 0xff);
                method_increment_timer(runtime);
            }
        }
        if (((((((members.m_in_irq ?? runtime.member("m_in_irq"))) ? 0 : 1)) && ((((members.m_pending_irq ?? runtime.member("m_pending_irq"))) & ((members.m_pio ?? runtime.member("m_pio")))))) ? 1 : 0)) {
            members.m_in_irq = ((1) ? 1 : 0);
            let intpc = (((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) & 0xffff);
            runtime.writeIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")), intpc);
            runtime.writeIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")), ((runtime.readIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")))) | ((((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))) << (15)))));
            runtime.writeIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")), ((runtime.readIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")))) | ((((runtime.calls["TEST_ZF"] ? runtime.calls["TEST_ZF"]() : runtime.macro("TEST_ZF"))) << (14)))));
            runtime.writeIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")), ((runtime.readIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")))) | ((((runtime.calls["TEST_ST"] ? runtime.calls["TEST_ST"]() : runtime.macro("TEST_ST"))) << (13)))));
            members.m_SI = (((((((members.m_SI ?? runtime.member("m_SI"))) + (1))) & (3))) & 0xff);
            if ((((((members.m_pending_irq ?? runtime.member("m_pending_irq"))) & ((members.m_pio ?? runtime.member("m_pio"))))) & (4))) {
                (runtime.calls["standard_irq_callback"] ? runtime.calls["standard_irq_callback"](0, intpc) : runtime.macro("standard_irq_callback", 0, intpc));
                members.m_PC = ((2) & 0xff);
            }
            else {
                if ((((((members.m_pending_irq ?? runtime.member("m_pending_irq"))) & ((members.m_pio ?? runtime.member("m_pio"))))) & (2))) {
                    (runtime.calls["standard_irq_callback"] ? runtime.calls["standard_irq_callback"](1, intpc) : runtime.macro("standard_irq_callback", 1, intpc));
                    members.m_PC = ((4) & 0xff);
                }
                else {
                    if ((((((members.m_pending_irq ?? runtime.member("m_pending_irq"))) & ((members.m_pio ?? runtime.member("m_pio"))))) & (1))) {
                        (runtime.calls["standard_irq_callback"] ? runtime.calls["standard_irq_callback"](2, intpc) : runtime.macro("standard_irq_callback", 2, intpc));
                        members.m_PC = ((6) & 0xff);
                    }
                }
            }
            members.m_PA = ((0) & 0xff);
            members.m_st = ((1) & 0xff);
            members.m_pending_irq = ((0) & 0xff);
            method_burn_cycles(runtime, 3);
        }
    }
    function method_increment_timer(runtime) {
        const members = runtime.members;
        members.m_TL = (((((((members.m_TL ?? runtime.member("m_TL"))) + (1))) & (15))) & 0xff);
        if (((Number((members.m_TL ?? runtime.member("m_TL"))) === Number(0)) ? 1 : 0)) {
            members.m_TH = (((((((members.m_TH ?? runtime.member("m_TH"))) + (1))) & (15))) & 0xff);
            if (((Number((members.m_TH ?? runtime.member("m_TH"))) === Number(0)) ? 1 : 0)) {
                members.m_vf = ((1) & 0xff);
                members.m_pending_irq = ((((members.m_pending_irq) | (2))) & 0xff);
            }
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        while (((Number((members.m_icount ?? runtime.member("m_icount"))) > Number(0)) ? 1 : 0)) {
            let opcode = ((0) & 0xff);
            let arg = ((0) & 0xff);
            let oc = ((0) & 0xff);
            (runtime.calls["debugger_instruction_hook"] ? runtime.calls["debugger_instruction_hook"]((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) : runtime.macro("debugger_instruction_hook", (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))));
            opcode = (((runtime.calls["READOP"] ? runtime.calls["READOP"]((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) : runtime.macro("READOP", (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))))) & 0xff);
            (runtime.calls["INCPC"] ? runtime.calls["INCPC"]() : runtime.macro("INCPC"));
            oc = ((1) & 0xff);
            switch (opcode) {
                case 0:
                    {
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 1:
                    {
                        method_write_pla(runtime, (((((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))) << (4))) | ((members.m_A ?? runtime.member("m_A")))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 2:
                    {
                        runtime.invoke("m_write_p", (members.m_A ?? runtime.member("m_A")));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 3:
                    {
                        arg = (((members.m_Y ?? runtime.member("m_Y"))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? runtime.member("m_write_r")), ((arg) & (3)))((members.m_A ?? runtime.member("m_A")));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 4:
                    {
                        members.m_Y = (((members.m_A ?? runtime.member("m_A"))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 5:
                    {
                        members.m_TH = (((members.m_A ?? runtime.member("m_A"))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 6:
                    {
                        members.m_TL = (((members.m_A ?? runtime.member("m_A"))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 7:
                    {
                        members.m_SB = (((members.m_A ?? runtime.member("m_A"))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 8:
                    {
                        members.m_Y = ((((members.m_Y) + (1))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ST_C", (members.m_Y ?? runtime.member("m_Y"))));
                        members.m_Y = ((runtime.andAssign(members.m_Y, 15)) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ZF", (members.m_Y ?? runtime.member("m_Y"))));
                        break;
                    }
                case 9:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        arg = ((((arg) + (1))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"](arg) : runtime.macro("UPDATE_ST_C", arg));
                        arg = ((runtime.andAssign(arg, 15)) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"](arg) : runtime.macro("UPDATE_ZF", arg));
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), arg) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), arg));
                        break;
                    }
                case 10:
                    {
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))));
                        members.m_Y = ((((members.m_Y) + (1))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ST_C", (members.m_Y ?? runtime.member("m_Y"))));
                        members.m_Y = ((runtime.andAssign(members.m_Y, 15)) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ZF", (members.m_Y ?? runtime.member("m_Y"))));
                        break;
                    }
                case 11:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))));
                        members.m_A = ((arg) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 12:
                    {
                        members.m_A = ((((members.m_A) << (1))) & 0xff);
                        members.m_A = ((((members.m_A) | ((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ST_C", (members.m_A ?? runtime.member("m_A"))));
                        members.m_cf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        members.m_A = ((runtime.andAssign(members.m_A, 15)) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        break;
                    }
                case 13:
                    {
                        members.m_A = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 14:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        arg = ((((arg) + ((members.m_A ?? runtime.member("m_A"))))) & 0xff);
                        arg = ((((arg) + ((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"](arg) : runtime.macro("UPDATE_ST_C", arg));
                        members.m_cf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        members.m_A = ((((arg) & (15))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        break;
                    }
                case 15:
                    {
                        members.m_A = ((runtime.andAssign(members.m_A, (runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")))))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = (((((members.m_zf ?? runtime.member("m_zf"))) ^ (1))) & 0xff);
                        break;
                    }
                case 16:
                    {
                        if (((((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))) || (((Number((members.m_A ?? runtime.member("m_A"))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_A = ((((members.m_A) + (6))) & 0xff);
                        }
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ST_C", (members.m_A ?? runtime.member("m_A"))));
                        members.m_cf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        members.m_A = ((runtime.andAssign(members.m_A, 15)) & 0xff);
                        break;
                    }
                case 17:
                    {
                        if (((((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))) || (((Number((members.m_A ?? runtime.member("m_A"))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_A = ((((members.m_A) + (10))) & 0xff);
                        }
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ST_C", (members.m_A ?? runtime.member("m_A"))));
                        members.m_cf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        members.m_A = ((runtime.andAssign(members.m_A, 15)) & 0xff);
                        break;
                    }
                case 18:
                    {
                        members.m_A = ((((runtime.invoke("m_read_k")) & (15))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 19:
                    {
                        arg = (((members.m_Y ?? runtime.member("m_Y"))) & 0xff);
                        members.m_A = ((((runtime.readIndex((members.m_read_r ?? runtime.member("m_read_r")), ((arg) & (3)))()) & (15))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 20:
                    {
                        members.m_A = (((members.m_Y ?? runtime.member("m_Y"))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 21:
                    {
                        members.m_A = (((members.m_TH ?? runtime.member("m_TH"))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 22:
                    {
                        members.m_A = (((members.m_TL ?? runtime.member("m_TL"))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 23:
                    {
                        members.m_A = (((members.m_SB ?? runtime.member("m_SB"))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 24:
                    {
                        members.m_Y = ((((members.m_Y) - (1))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ST_C", (members.m_Y ?? runtime.member("m_Y"))));
                        members.m_Y = ((runtime.andAssign(members.m_Y, 15)) & 0xff);
                        break;
                    }
                case 25:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        arg = ((((arg) - (1))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"](arg) : runtime.macro("UPDATE_ST_C", arg));
                        arg = ((runtime.andAssign(arg, 15)) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"](arg) : runtime.macro("UPDATE_ZF", arg));
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), arg) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), arg));
                        break;
                    }
                case 26:
                    {
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))));
                        members.m_Y = ((((members.m_Y) - (1))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ST_C", (members.m_Y ?? runtime.member("m_Y"))));
                        members.m_Y = ((runtime.andAssign(members.m_Y, 15)) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ZF", (members.m_Y ?? runtime.member("m_Y"))));
                        break;
                    }
                case 27:
                    {
                        arg = (((members.m_X ?? runtime.member("m_X"))) & 0xff);
                        members.m_X = (((members.m_A ?? runtime.member("m_A"))) & 0xff);
                        members.m_A = ((arg) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 28:
                    {
                        members.m_A = ((((members.m_A) | ((((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))) << (4))))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"]((((members.m_A ?? runtime.member("m_A"))) << (4))) : runtime.macro("UPDATE_ST_C", (((members.m_A ?? runtime.member("m_A"))) << (4))));
                        members.m_cf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        members.m_A = ((((members.m_A) >>> (1))) & 0xff);
                        members.m_A = ((runtime.andAssign(members.m_A, 15)) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        break;
                    }
                case 29:
                    {
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 30:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        arg = ((((arg) - ((members.m_A ?? runtime.member("m_A"))))) & 0xff);
                        arg = ((((arg) - ((runtime.calls["TEST_CF"] ? runtime.calls["TEST_CF"]() : runtime.macro("TEST_CF"))))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"](arg) : runtime.macro("UPDATE_ST_C", arg));
                        members.m_cf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        members.m_A = ((((arg) & (15))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        break;
                    }
                case 31:
                    {
                        members.m_A = ((((members.m_A) | ((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = (((((members.m_zf ?? runtime.member("m_zf"))) ^ (1))) & 0xff);
                        break;
                    }
                case 32:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? runtime.member("m_read_r")), (((members.m_Y ?? runtime.member("m_Y"))) >>> (2)))()) & (15))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? runtime.member("m_write_r")), (((members.m_Y ?? runtime.member("m_Y"))) >>> (2)))(((arg) | (((1) << ((((members.m_Y ?? runtime.member("m_Y"))) & (3)))))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 33:
                    {
                        members.m_cf = ((1) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 34:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? runtime.member("m_read_r")), (((members.m_Y ?? runtime.member("m_Y"))) >>> (2)))()) & (15))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? runtime.member("m_write_r")), (((members.m_Y ?? runtime.member("m_Y"))) >>> (2)))(((arg) & ((~((1) << ((((members.m_Y ?? runtime.member("m_Y"))) & (3))))))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 35:
                    {
                        members.m_cf = ((0) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 36:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? runtime.member("m_read_r")), (((members.m_Y ?? runtime.member("m_Y"))) >>> (2)))()) & (15))) & 0xff);
                        members.m_st = ((((((arg) & (((1) << ((((members.m_Y ?? runtime.member("m_Y"))) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 37:
                    {
                        members.m_st = (((((members.m_if ?? runtime.member("m_if"))) ^ (1))) & 0xff);
                        break;
                    }
                case 38:
                    {
                        members.m_st = (((((members.m_vf ?? runtime.member("m_vf"))) ^ (1))) & 0xff);
                        members.m_vf = ((0) & 0xff);
                        break;
                    }
                case 39:
                    {
                        members.m_st = (((((members.m_sf ?? runtime.member("m_sf"))) ^ (1))) & 0xff);
                        if ((members.m_sf ?? runtime.member("m_sf"))) {
                            if (((Number((members.m_SBcount ?? runtime.member("m_SBcount"))) >= Number(1000)) ? 1 : 0)) {
                                ((runtime.dereference(members.m_serial)).adjust?.((runtime.calls["attotime::from_hz"] ? runtime.calls["attotime::from_hz"](runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6))), 0, (runtime.calls["attotime::from_hz"] ? runtime.calls["attotime::from_hz"](runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6)))) ?? 0);
                            }
                            members.m_SBcount = ((0) & 0xffff);
                        }
                        members.m_sf = ((0) & 0xff);
                        break;
                    }
                case 40:
                    {
                        members.m_st = (((((members.m_cf ?? runtime.member("m_cf"))) ^ (1))) & 0xff);
                        break;
                    }
                case 41:
                    {
                        members.m_st = (((((members.m_zf ?? runtime.member("m_zf"))) ^ (1))) & 0xff);
                        break;
                    }
                case 42:
                    {
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_SB ?? runtime.member("m_SB"))) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), (members.m_SB ?? runtime.member("m_SB"))));
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_SB ?? runtime.member("m_SB"))) : runtime.macro("UPDATE_ZF", (members.m_SB ?? runtime.member("m_SB"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 43:
                    {
                        members.m_SB = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_SB ?? runtime.member("m_SB"))) : runtime.macro("UPDATE_ZF", (members.m_SB ?? runtime.member("m_SB"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 44:
                    {
                        members.m_SI = (((((((members.m_SI ?? runtime.member("m_SI"))) - (1))) & (3))) & 0xff);
                        members.m_PC = ((((runtime.readIndex((members.m_SP ?? runtime.member("m_SP")), (members.m_SI ?? runtime.member("m_SI")))) & (63))) & 0xff);
                        members.m_PA = ((((((runtime.readIndex((members.m_SP ?? runtime.member("m_SP")), (members.m_SI ?? runtime.member("m_SI")))) >>> (6))) & (31))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 45:
                    {
                        members.m_A = ((runtime.add((~(members.m_A ?? runtime.member("m_A"))), 1)) & 0xff);
                        members.m_A = ((runtime.andAssign(members.m_A, 15)) & 0xff);
                        (runtime.calls["UPDATE_ST_Z"] ? runtime.calls["UPDATE_ST_Z"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ST_Z", (members.m_A ?? runtime.member("m_A"))));
                        break;
                    }
                case 46:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        arg = ((((arg) - ((members.m_A ?? runtime.member("m_A"))))) & 0xff);
                        (runtime.calls["UPDATE_CF"] ? runtime.calls["UPDATE_CF"](arg) : runtime.macro("UPDATE_CF", arg));
                        arg = ((runtime.andAssign(arg, 15)) & 0xff);
                        (runtime.calls["UPDATE_ST_Z"] ? runtime.calls["UPDATE_ST_Z"](arg) : runtime.macro("UPDATE_ST_Z", arg));
                        members.m_zf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        break;
                    }
                case 47:
                    {
                        members.m_A = ((((members.m_A) ^ ((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))))) & 0xff);
                        (runtime.calls["UPDATE_ST_Z"] ? runtime.calls["UPDATE_ST_Z"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ST_Z", (members.m_A ?? runtime.member("m_A"))));
                        members.m_zf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        break;
                    }
                case 48:
                case 49:
                case 50:
                case 51:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), ((arg) | (((1) << (((opcode) & (3))))))) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), ((arg) | (((1) << (((opcode) & (3))))))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 52:
                case 53:
                case 54:
                case 55:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), ((arg) & ((~((1) << (((opcode) & (3)))))))) : runtime.macro("WRMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA")), ((arg) & ((~((1) << (((opcode) & (3)))))))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 56:
                case 57:
                case 58:
                case 59:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"]((runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))) : runtime.macro("RDMEM", (runtime.calls["GETEA"] ? runtime.calls["GETEA"]() : runtime.macro("GETEA"))))) & 0xff);
                        members.m_st = ((((((arg) & (((1) << (((opcode) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 60:
                    {
                        members.m_in_irq = ((0) ? 1 : 0);
                        members.m_SI = (((((((members.m_SI ?? runtime.member("m_SI"))) - (1))) & (3))) & 0xff);
                        members.m_PC = ((((runtime.readIndex((members.m_SP ?? runtime.member("m_SP")), (members.m_SI ?? runtime.member("m_SI")))) & (63))) & 0xff);
                        members.m_PA = ((((((runtime.readIndex((members.m_SP ?? runtime.member("m_SP")), (members.m_SI ?? runtime.member("m_SI")))) >>> (6))) & (31))) & 0xff);
                        members.m_st = ((((((runtime.readIndex((members.m_SP ?? runtime.member("m_SP")), (members.m_SI ?? runtime.member("m_SI")))) >>> (13))) & (1))) & 0xff);
                        members.m_zf = ((((((runtime.readIndex((members.m_SP ?? runtime.member("m_SP")), (members.m_SI ?? runtime.member("m_SI")))) >>> (14))) & (1))) & 0xff);
                        members.m_cf = ((((((runtime.readIndex((members.m_SP ?? runtime.member("m_SP")), (members.m_SI ?? runtime.member("m_SI")))) >>> (15))) & (1))) & 0xff);
                        break;
                    }
                case 61:
                    {
                        members.m_PA = (((((runtime.calls["READOP"] ? runtime.calls["READOP"]((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) : runtime.macro("READOP", (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))))) & (31))) & 0xff);
                        members.m_PC = (((((members.m_A ?? runtime.member("m_A"))) * (4))) & 0xff);
                        oc = ((((oc) + (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 62:
                    {
                        method_pio_enable(runtime, (((members.m_pio ?? runtime.member("m_pio"))) | ((runtime.calls["READOP"] ? runtime.calls["READOP"]((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) : runtime.macro("READOP", (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC")))))));
                        (runtime.calls["INCPC"] ? runtime.calls["INCPC"]() : runtime.macro("INCPC"));
                        oc = ((((oc) + (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 63:
                    {
                        method_pio_enable(runtime, (((members.m_pio ?? runtime.member("m_pio"))) & ((~(runtime.calls["READOP"] ? runtime.calls["READOP"]((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) : runtime.macro("READOP", (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))))))));
                        (runtime.calls["INCPC"] ? runtime.calls["INCPC"]() : runtime.macro("INCPC"));
                        oc = ((((oc) + (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 64:
                case 65:
                case 66:
                case 67:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? runtime.member("m_read_r")), 0)()) & (15))) & 0xff);
                        arg = ((((arg) | (((1) << (((opcode) & (3))))))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? runtime.member("m_write_r")), 0)(arg);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 68:
                case 69:
                case 70:
                case 71:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? runtime.member("m_read_r")), 0)()) & (15))) & 0xff);
                        arg = ((runtime.andAssign(arg, (~((1) << (((opcode) & (3))))))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? runtime.member("m_write_r")), 0)(arg);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 72:
                case 73:
                case 74:
                case 75:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? runtime.member("m_read_r")), 2)()) & (15))) & 0xff);
                        members.m_st = ((((((arg) & (((1) << (((opcode) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 76:
                case 77:
                case 78:
                case 79:
                    {
                        members.m_st = (((((((members.m_A ?? runtime.member("m_A"))) & (((1) << (((opcode) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 80:
                case 81:
                case 82:
                case 83:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"](((opcode) & (3))) : runtime.macro("RDMEM", ((opcode) & (3))))) & 0xff);
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"](((opcode) & (3)), (members.m_A ?? runtime.member("m_A"))) : runtime.macro("WRMEM", ((opcode) & (3)), (members.m_A ?? runtime.member("m_A"))));
                        members.m_A = ((arg) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 84:
                case 85:
                case 86:
                case 87:
                    {
                        arg = (((runtime.calls["RDMEM"] ? runtime.calls["RDMEM"](runtime.add(((opcode) & (3)), 4)) : runtime.macro("RDMEM", runtime.add(((opcode) & (3)), 4)))) & 0xff);
                        (runtime.calls["WRMEM"] ? runtime.calls["WRMEM"](runtime.add(((opcode) & (3)), 4), (members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("WRMEM", runtime.add(((opcode) & (3)), 4), (members.m_Y ?? runtime.member("m_Y"))));
                        members.m_Y = ((arg) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ZF", (members.m_Y ?? runtime.member("m_Y"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 88:
                case 89:
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                    {
                        members.m_X = ((((opcode) & (7))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_X ?? runtime.member("m_X"))) : runtime.macro("UPDATE_ZF", (members.m_X ?? runtime.member("m_X"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 96:
                case 97:
                case 98:
                case 99:
                case 100:
                case 101:
                case 102:
                case 103:
                    {
                        arg = (((runtime.calls["READOP"] ? runtime.calls["READOP"]((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) : runtime.macro("READOP", (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))))) & 0xff);
                        (runtime.calls["INCPC"] ? runtime.calls["INCPC"]() : runtime.macro("INCPC"));
                        oc = ((((oc) + (1))) & 0xff);
                        if ((runtime.calls["TEST_ST"] ? runtime.calls["TEST_ST"]() : runtime.macro("TEST_ST"))) {
                            runtime.writeIndex(runtime.writableMember("m_SP"), (members.m_SI ?? runtime.member("m_SI")), (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC")));
                            members.m_SI = (((((((members.m_SI ?? runtime.member("m_SI"))) + (1))) & (3))) & 0xff);
                            members.m_PC = ((((arg) & (63))) & 0xff);
                            members.m_PA = ((((((((opcode) & (7))) << (2))) | (((arg) >>> (6))))) & 0xff);
                        }
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                    {
                        arg = (((runtime.calls["READOP"] ? runtime.calls["READOP"]((runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))) : runtime.macro("READOP", (runtime.calls["GETPC"] ? runtime.calls["GETPC"]() : runtime.macro("GETPC"))))) & 0xff);
                        (runtime.calls["INCPC"] ? runtime.calls["INCPC"]() : runtime.macro("INCPC"));
                        oc = ((((oc) + (1))) & 0xff);
                        if ((runtime.calls["TEST_ST"] ? runtime.calls["TEST_ST"]() : runtime.macro("TEST_ST"))) {
                            members.m_PC = ((((arg) & (63))) & 0xff);
                            members.m_PA = ((((((((opcode) & (7))) << (2))) | (((arg) >>> (6))))) & 0xff);
                        }
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 117:
                case 118:
                case 119:
                case 120:
                case 121:
                case 122:
                case 123:
                case 124:
                case 125:
                case 126:
                case 127:
                    {
                        arg = ((((opcode) & (15))) & 0xff);
                        arg = ((((arg) + ((members.m_A ?? runtime.member("m_A"))))) & 0xff);
                        (runtime.calls["UPDATE_ST_C"] ? runtime.calls["UPDATE_ST_C"](arg) : runtime.macro("UPDATE_ST_C", arg));
                        members.m_cf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        members.m_A = ((((arg) & (15))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        break;
                    }
                case 128:
                case 129:
                case 130:
                case 131:
                case 132:
                case 133:
                case 134:
                case 135:
                case 136:
                case 137:
                case 138:
                case 139:
                case 140:
                case 141:
                case 142:
                case 143:
                    {
                        members.m_Y = ((((opcode) & (15))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_Y ?? runtime.member("m_Y"))) : runtime.macro("UPDATE_ZF", (members.m_Y ?? runtime.member("m_Y"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 144:
                case 145:
                case 146:
                case 147:
                case 148:
                case 149:
                case 150:
                case 151:
                case 152:
                case 153:
                case 154:
                case 155:
                case 156:
                case 157:
                case 158:
                case 159:
                    {
                        members.m_A = ((((opcode) & (15))) & 0xff);
                        (runtime.calls["UPDATE_ZF"] ? runtime.calls["UPDATE_ZF"]((members.m_A ?? runtime.member("m_A"))) : runtime.macro("UPDATE_ZF", (members.m_A ?? runtime.member("m_A"))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 160:
                case 161:
                case 162:
                case 163:
                case 164:
                case 165:
                case 166:
                case 167:
                case 168:
                case 169:
                case 170:
                case 171:
                case 172:
                case 173:
                case 174:
                case 175:
                    {
                        arg = ((((((opcode) & (15))) - ((members.m_Y ?? runtime.member("m_Y"))))) & 0xff);
                        (runtime.calls["UPDATE_CF"] ? runtime.calls["UPDATE_CF"](arg) : runtime.macro("UPDATE_CF", arg));
                        arg = ((runtime.andAssign(arg, 15)) & 0xff);
                        (runtime.calls["UPDATE_ST_Z"] ? runtime.calls["UPDATE_ST_Z"](arg) : runtime.macro("UPDATE_ST_Z", arg));
                        members.m_zf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        break;
                    }
                case 176:
                case 177:
                case 178:
                case 179:
                case 180:
                case 181:
                case 182:
                case 183:
                case 184:
                case 185:
                case 186:
                case 187:
                case 188:
                case 189:
                case 190:
                case 191:
                    {
                        arg = ((((((opcode) & (15))) - ((members.m_A ?? runtime.member("m_A"))))) & 0xff);
                        (runtime.calls["UPDATE_CF"] ? runtime.calls["UPDATE_CF"](arg) : runtime.macro("UPDATE_CF", arg));
                        arg = ((runtime.andAssign(arg, 15)) & 0xff);
                        (runtime.calls["UPDATE_ST_Z"] ? runtime.calls["UPDATE_ST_Z"](arg) : runtime.macro("UPDATE_ST_Z", arg));
                        members.m_zf = (((((members.m_st ?? runtime.member("m_st"))) ^ (1))) & 0xff);
                        break;
                    }
                default:
                    {
                        if ((runtime.calls["TEST_ST"] ? runtime.calls["TEST_ST"]() : runtime.macro("TEST_ST"))) {
                            members.m_PC = ((((opcode) & (63))) & 0xff);
                        }
                        members.m_st = ((1) & 0xff);
                        break;
                    }
            }
            method_burn_cycles(runtime, oc);
        }
    }
    function method_write_pla(runtime, index) {
        const members = runtime.members;
        let mask = ((255) & 0xff);
        if (((Number((members.m_pla_bits ?? runtime.member("m_pla_bits"))) === Number(8)) ? 1 : 0)) {
            let shift = ((((((index) & (16))) ? (4) : (0))) & 0xff);
            mask = ((((15) << (shift))) & 0xff);
            members.m_o_output = (((((((members.m_o_output ?? runtime.member("m_o_output"))) & ((~mask)))) | (((((index) << (shift))) & (mask))))) & 0xff);
        }
        else {
            if ((members.m_pla_data ?? runtime.member("m_pla_data"))) {
                members.m_o_output = ((runtime.readIndex((members.m_pla_data ?? runtime.member("m_pla_data")), index)) & 0xff);
            }
            else {
                members.m_o_output = ((index) & 0xff);
            }
        }
        runtime.invoke("m_write_o", 0, (members.m_o_output ?? runtime.member("m_o_output")), mask);
    }
    function method_pio_enable(runtime, newpio) {
        const members = runtime.members;
        if ((((((members.m_pio ?? runtime.member("m_pio"))) ^ (newpio))) & (48))) {
            if (((Number(((newpio) & (48))) === Number(0)) ? 1 : 0)) {
                ((runtime.dereference(members.m_serial)).adjust?.(Infinity) ?? 0);
            }
            else {
                if (((Number(((newpio) & (48))) === Number(32)) ? 1 : 0)) {
                    ((runtime.dereference(members.m_serial)).adjust?.((runtime.calls["attotime::from_hz"] ? runtime.calls["attotime::from_hz"](runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6))), 0, (runtime.calls["attotime::from_hz"] ? runtime.calls["attotime::from_hz"](runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")), 6)))) ?? 0);
                }
                else {
                    (runtime.calls["fatalerror"] ? runtime.calls["fatalerror"]("mb88xx: pio_enable set serial enable to unsupported value %02X\n", ((newpio) & (48))) : runtime.macro("fatalerror", "mb88xx: pio_enable set serial enable to unsupported value %02X\n", ((newpio) & (48))));
                }
            }
        }
        members.m_pio = ((newpio) & 0xff);
    }
    function method_serial_timer(runtime, param) {
        const members = runtime.members;
        members.m_SBcount = ((((members.m_SBcount) + (1))) & 0xffff);
        if (((Number((members.m_SBcount ?? runtime.member("m_SBcount"))) >= Number(1000)) ? 1 : 0)) {
            ((runtime.dereference(members.m_serial)).adjust?.(Infinity) ?? 0);
        }
        if ((((members.m_sf ?? runtime.member("m_sf"))) ? 0 : 1)) {
            members.m_SB = (((((((members.m_SB ?? runtime.member("m_SB"))) >>> (1))) | (((runtime.invoke("m_read_si")) ? (8) : (0))))) & 0xff);
            if (((Number((members.m_SBcount ?? runtime.member("m_SBcount"))) >= Number(4)) ? 1 : 0)) {
                members.m_sf = ((1) & 0xff);
                members.m_pending_irq = ((((members.m_pending_irq) | (1))) & 0xff);
            }
        }
    }
    return {
        "burn_cycles": method_burn_cycles,
        "increment_timer": method_increment_timer,
        "execute_run": method_execute_run,
        "write_pla": method_write_pla,
        "pio_enable": method_pio_enable,
        "serial_timer": method_serial_timer
    };
})();
export const device = definition;
export default device;
