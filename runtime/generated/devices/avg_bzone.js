import deviceData from './avg_bzone.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_vg_set_halt_callback(runtime, param) {
        const members = runtime.members;
        method_vg_set_halt(runtime, param);
    }
    function method_vg_set_halt(runtime, dummy) {
        const members = runtime.members;
        members.m_halt = ((dummy) & 0xff);
        members.m_sync_halt = ((dummy) & 0xff);
    }
    function method_run_state_machine(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_prom = members.m_prom ?? runtime.member("m_prom");
        let cycles = ((0) | 0);
        while (((Number(cycles) < Number(10000)) ? 1 : 0)) {
            members.m_state_latch = (((((((members.m_state_latch ?? runtime.member("m_state_latch"))) & (16))) | (((runtime.readIndex(h_m_prom, method_state_addr(runtime))) & (15))))) & 0xff);
            if (method_ST3(runtime)) {
                method_update_databus(runtime);
                switch ((((members.m_state_latch ?? runtime.member("m_state_latch"))) & (7))) {
                    case 0:
                        {
                            cycles = ((((cycles) + (method_handler_0(runtime)))) | 0);
                            break;
                        }
                    case 1:
                        {
                            cycles = ((((cycles) + (method_handler_1(runtime)))) | 0);
                            break;
                        }
                    case 2:
                        {
                            cycles = ((((cycles) + (method_handler_2(runtime)))) | 0);
                            break;
                        }
                    case 3:
                        {
                            cycles = ((((cycles) + (method_handler_3(runtime)))) | 0);
                            break;
                        }
                    case 4:
                        {
                            cycles = ((((cycles) + (method_handler_4(runtime)))) | 0);
                            break;
                        }
                    case 5:
                        {
                            cycles = ((((cycles) + (method_handler_5(runtime)))) | 0);
                            break;
                        }
                    case 6:
                        {
                            cycles = ((((cycles) + (method_handler_6(runtime)))) | 0);
                            break;
                        }
                    case 7:
                        {
                            cycles = ((((cycles) + (method_handler_7(runtime)))) | 0);
                            break;
                        }
                }
            }
            if (((((members.m_halt ?? runtime.member("m_halt"))) && ((((((members.m_state_latch ?? runtime.member("m_state_latch"))) & (16))) ? 0 : 1))) ? 1 : 0)) {
                ((runtime.dereference(members.m_vg_halt_timer)).adjust?.((((__l["attotime::from_hz"] ? __l["attotime::from_hz"](12096000) : runtime.macro("attotime::from_hz", 12096000))) * (cycles)), 1) ?? 0);
            }
            members.m_state_latch = (((((((members.m_halt ?? runtime.member("m_halt"))) << (4))) | ((((members.m_state_latch ?? runtime.member("m_state_latch"))) & (15))))) & 0xff);
            cycles = ((((cycles) + (8))) | 0);
        }
        ((runtime.dereference(members.m_vg_run_timer)).adjust?.((((__l["attotime::from_hz"] ? __l["attotime::from_hz"](12096000) : runtime.macro("attotime::from_hz", 12096000))) * (cycles))) ?? 0);
    }
    function method_state_addr(runtime) {
        const members = runtime.members;
        return ((((((((runtime.shiftRight((members.m_state_latch ?? runtime.member("m_state_latch")), 4)) ^ (1))) << (7))) | ((((members.m_op ?? runtime.member("m_op"))) << (4))))) | ((((members.m_state_latch ?? runtime.member("m_state_latch"))) & (15))));
    }
    function method_ST3(runtime) {
        const members = runtime.members;
        return ((((members.m_state_latch ?? runtime.member("m_state_latch"))) >>> (3)) & 1);
    }
    function method_update_databus(runtime) {
        const members = runtime.members;
        members.m_data = ((((runtime.dereference(members.m_memspace)).read_byte?.((((members.m_membase ?? runtime.member("m_membase"))) + ((((members.m_pc ?? runtime.member("m_pc"))) ^ (1))))) ?? 0)) & 0xffff);
    }
    function method_handler_0(runtime) {
        const members = runtime.members;
        members.m_dvy = (((((((members.m_dvy ?? runtime.member("m_dvy"))) & (7936))) | ((members.m_data ?? runtime.member("m_data"))))) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return 0;
    }
    function method_handler_1(runtime) {
        const members = runtime.members;
        if ((((members.m_hst ?? runtime.member("m_hst"))) ? 0 : 1)) {
            members.m_clipx_max = (((members.m_xpos ?? runtime.member("m_xpos"))) | 0);
            members.m_clipy_min = (((members.m_ypos ?? runtime.member("m_ypos"))) | 0);
        }
        if ((((members.m_lst ?? runtime.member("m_lst"))) ? 0 : 1)) {
            members.m_clipx_min = (((members.m_xpos ?? runtime.member("m_xpos"))) | 0);
            members.m_clipy_max = (((members.m_ypos ?? runtime.member("m_ypos"))) | 0);
        }
        if (((((((members.m_lst ?? runtime.member("m_lst"))) ? 0 : 1)) || ((((members.m_hst ?? runtime.member("m_hst"))) ? 0 : 1))) ? 1 : 0)) {
            method_vg_add_clip(runtime, (members.m_clipx_min ?? runtime.member("m_clipx_min")), (members.m_clipy_min ?? runtime.member("m_clipy_min")), (members.m_clipx_max ?? runtime.member("m_clipx_max")), (members.m_clipy_max ?? runtime.member("m_clipy_max")));
        }
        members.m_lst = (((members.m_hst = ((1) & 0xffff))) & 0xffff);
        return method_avg_device__handler_1(runtime);
    }
    function method_vg_add_clip(runtime, xmin, ymin, xmax, ymax) {
        const members = runtime.members;
        const h_m_vectbuf = members.m_vectbuf ?? runtime.member("m_vectbuf");
        if (((Number((members.m_nvect ?? runtime.member("m_nvect"))) < Number(10000)) ? 1 : 0)) {
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].status = ((1) | 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].x = ((xmin) | 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].y = ((ymin) | 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].arg1 = ((xmax) | 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].arg2 = ((ymax) | 0);
            members.m_nvect = ((((members.m_nvect) + (1))) | 0);
        }
    }
    function method_avg_device__handler_1(runtime) {
        const members = runtime.members;
        members.m_dvy12 = ((((runtime.shiftRight((members.m_data ?? runtime.member("m_data")), 4)) & (1))) & 0xff);
        members.m_op = ((runtime.shiftRight((members.m_data ?? runtime.member("m_data")), 5)) & 0xff);
        members.m_int_latch = ((0) & 0xff);
        members.m_dvy = (((((((members.m_dvy12 ?? runtime.member("m_dvy12"))) << (12))) | ((((((members.m_data ?? runtime.member("m_data"))) & (15))) << (8))))) & 0xffff);
        members.m_dvx = ((0) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return 0;
    }
    function method_handler_2(runtime) {
        const members = runtime.members;
        members.m_dvx = (((((((members.m_dvx ?? runtime.member("m_dvx"))) & (7936))) | ((members.m_data ?? runtime.member("m_data"))))) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return 0;
    }
    function method_handler_3(runtime) {
        const members = runtime.members;
        members.m_int_latch = ((runtime.shiftRight((members.m_data ?? runtime.member("m_data")), 4)) & 0xff);
        members.m_dvx = (((((((((((members.m_int_latch ?? runtime.member("m_int_latch"))) & (1))) << (12))) | ((((((members.m_data ?? runtime.member("m_data"))) & (15))) << (8))))) | ((((members.m_dvx ?? runtime.member("m_dvx"))) & (255))))) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return 0;
    }
    function method_handler_4(runtime) {
        const members = runtime.members;
        if (method_OP0(runtime)) {
            (members.m_stack ?? runtime.member("m_stack"))[(((members.m_sp ?? runtime.member("m_sp"))) & (3))] = (members.m_pc ?? runtime.member("m_pc"));
        }
        else {
            let i = ((0) | 0);
            while (((((((((Number((((((members.m_dvy ?? runtime.member("m_dvy"))) ^ ((((members.m_dvy ?? runtime.member("m_dvy"))) << (1))))) & (4096))) === Number(0)) ? 1 : 0)) && (((Number((((((members.m_dvx ?? runtime.member("m_dvx"))) ^ ((((members.m_dvx ?? runtime.member("m_dvx"))) << (1))))) & (4096))) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number((() => { const previous = i; i = ((((i) + (1))) | 0); return previous; })()) < Number(16)) ? 1 : 0))) ? 1 : 0)) {
                members.m_dvy = (((((((members.m_dvy ?? runtime.member("m_dvy"))) & (4096))) | ((((((members.m_dvy ?? runtime.member("m_dvy"))) << (1))) & (8191))))) & 0xffff);
                members.m_dvx = (((((((members.m_dvx ?? runtime.member("m_dvx"))) & (4096))) | ((((((members.m_dvx ?? runtime.member("m_dvx"))) << (1))) & (8191))))) & 0xffff);
                members.m_timer = ((runtime.shiftRight(members.m_timer, 1)) & 0xffff);
                members.m_timer = ((((members.m_timer) | (((16384) | (((method_OP1(runtime)) << (7))))))) & 0xffff);
            }
            if (method_OP1(runtime)) {
                members.m_timer = ((runtime.andAssign(members.m_timer, 255)) & 0xffff);
            }
        }
        return 0;
    }
    function method_OP0(runtime) {
        const members = runtime.members;
        return ((((members.m_op ?? runtime.member("m_op"))) >>> (0)) & 1);
    }
    function method_OP1(runtime) {
        const members = runtime.members;
        return ((((members.m_op ?? runtime.member("m_op"))) >>> (1)) & 1);
    }
    function method_handler_5(runtime) {
        const members = runtime.members;
        if (((method_OP2(runtime)) ? 0 : 1)) {
            for (let i = (((members.m_bin_scale ?? runtime.member("m_bin_scale"))) | 0); ((Number(i) > Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                members.m_timer = ((runtime.shiftRight(members.m_timer, 1)) & 0xffff);
                members.m_timer = ((((members.m_timer) | (((16384) | (((method_OP1(runtime)) << (7))))))) & 0xffff);
            }
            if (method_OP1(runtime)) {
                members.m_timer = ((runtime.andAssign(members.m_timer, 255)) & 0xffff);
            }
        }
        return method_avg_common_strobe1(runtime);
    }
    function method_OP2(runtime) {
        const members = runtime.members;
        return ((((members.m_op ?? runtime.member("m_op"))) >>> (2)) & 1);
    }
    function method_avg_common_strobe1(runtime) {
        const members = runtime.members;
        if (method_OP2(runtime)) {
            if (method_OP1(runtime)) {
                members.m_sp = (((((((members.m_sp ?? runtime.member("m_sp"))) - (1))) & (15))) & 0xff);
            }
            else {
                members.m_sp = (((((((members.m_sp ?? runtime.member("m_sp"))) + (1))) & (15))) & 0xff);
            }
        }
        return 0;
    }
    function method_handler_6(runtime) {
        const members = runtime.members;
        if ((((((method_OP2(runtime)) ? 0 : 1)) && ((((members.m_dvy12 ?? runtime.member("m_dvy12"))) ? 0 : 1))) ? 1 : 0)) {
            members.m_intensity = ((((runtime.shiftRight((members.m_dvy ?? runtime.member("m_dvy")), 4)) & (15))) & 0xff);
            if ((((((members.m_dvy ?? runtime.member("m_dvy"))) & (1024))) ? 0 : 1)) {
                members.m_lst = (((((members.m_dvy ?? runtime.member("m_dvy"))) & (512))) & 0xffff);
                members.m_hst = (((((members.m_lst ?? runtime.member("m_lst"))) ^ (512))) & 0xffff);
                members.m_izblank = (((((members.m_dvy ?? runtime.member("m_dvy"))) & (256))) & 0xffff);
            }
        }
        return method_avg_common_strobe2(runtime);
    }
    function method_avg_common_strobe2(runtime) {
        const members = runtime.members;
        if (method_OP2(runtime)) {
            if (method_OP0(runtime)) {
                members.m_pc = (((((members.m_dvy ?? runtime.member("m_dvy"))) << (1))) & 0xffff);
                if (((Number((members.m_dvy ?? runtime.member("m_dvy"))) === Number(0)) ? 1 : 0)) {
                    ((members.m_vector)?.clear_list?.() ?? 0);
                    method_vg_flush(runtime);
                }
            }
            else {
                members.m_pc = (((members.m_stack ?? runtime.member("m_stack"))[(((members.m_sp ?? runtime.member("m_sp"))) & (3))]) & 0xffff);
            }
        }
        else {
            if ((members.m_dvy12 ?? runtime.member("m_dvy12"))) {
                members.m_scale = (((((members.m_dvy ?? runtime.member("m_dvy"))) & (255))) & 0xff);
                members.m_bin_scale = ((((runtime.shiftRight((members.m_dvy ?? runtime.member("m_dvy")), 8)) & (7))) & 0xff);
            }
        }
        return 0;
    }
    function method_vg_flush(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_vectbuf = members.m_vectbuf ?? runtime.member("m_vectbuf");
        let cx0 = ((0) | 0);
        let cy0 = ((0) | 0);
        let cx1 = ((83886080) | 0);
        let cy1 = ((83886080) | 0);
        let i = ((0) | 0);
        while (((Number(h_m_vectbuf[i].status) === Number(1)) ? 1 : 0)) {
            i = ((((i) + (1))) | 0);
        }
        let xs = ((h_m_vectbuf[i].x) | 0);
        let ys = ((h_m_vectbuf[i].y) | 0);
        for (i = ((0) | 0); ((Number(i) < Number((members.m_nvect ?? runtime.member("m_nvect")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(h_m_vectbuf[i].status) === Number(0)) ? 1 : 0)) {
                let xe = ((h_m_vectbuf[i].x) | 0);
                let ye = ((h_m_vectbuf[i].y) | 0);
                let x0 = ((xs) | 0);
                let y0 = ((ys) | 0);
                let x1 = ((xe) | 0);
                let y1 = ((ye) | 0);
                xs = ((xe) | 0);
                ys = ((ye) | 0);
                if (((((((((Number(x0) < Number(cx0)) ? 1 : 0)) && (((Number(x1) < Number(cx0)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(x0) > Number(cx1)) ? 1 : 0)) && (((Number(x1) > Number(cx1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    continue;
                }
                if (((Number(x0) < Number(cx0)) ? 1 : 0)) {
                    y0 = ((((y0) + (runtime.divide(((((cx0) - (x0))) * (((y1) - (y0)))), ((x1) - (x0)))))) | 0);
                    x0 = ((cx0) | 0);
                }
                else {
                    if (((Number(x0) > Number(cx1)) ? 1 : 0)) {
                        y0 = ((((y0) + (runtime.divide(((((cx1) - (x0))) * (((y1) - (y0)))), ((x1) - (x0)))))) | 0);
                        x0 = ((cx1) | 0);
                    }
                }
                if (((Number(x1) < Number(cx0)) ? 1 : 0)) {
                    y1 = ((((y1) + (runtime.divide(((((cx0) - (x1))) * (((y1) - (y0)))), ((x1) - (x0)))))) | 0);
                    x1 = ((cx0) | 0);
                }
                else {
                    if (((Number(x1) > Number(cx1)) ? 1 : 0)) {
                        y1 = ((((y1) + (runtime.divide(((((cx1) - (x1))) * (((y1) - (y0)))), ((x1) - (x0)))))) | 0);
                        x1 = ((cx1) | 0);
                    }
                }
                if (((((((((Number(y0) < Number(cy0)) ? 1 : 0)) && (((Number(y1) < Number(cy0)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(y0) > Number(cy1)) ? 1 : 0)) && (((Number(y1) > Number(cy1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    continue;
                }
                if (((Number(y0) < Number(cy0)) ? 1 : 0)) {
                    x0 = ((((x0) + (runtime.divide(((((cy0) - (y0))) * (((x1) - (x0)))), ((y1) - (y0)))))) | 0);
                    y0 = ((cy0) | 0);
                }
                else {
                    if (((Number(y0) > Number(cy1)) ? 1 : 0)) {
                        x0 = ((((x0) + (runtime.divide(((((cy1) - (y0))) * (((x1) - (x0)))), ((y1) - (y0)))))) | 0);
                        y0 = ((cy1) | 0);
                    }
                }
                if (((Number(y1) < Number(cy0)) ? 1 : 0)) {
                    x1 = ((((x1) + (runtime.divide(((((cy0) - (y1))) * (((x1) - (x0)))), ((y1) - (y0)))))) | 0);
                    y1 = ((cy0) | 0);
                }
                else {
                    if (((Number(y1) > Number(cy1)) ? 1 : 0)) {
                        x1 = ((((x1) + (runtime.divide(((((cy1) - (y1))) * (((x1) - (x0)))), ((y1) - (y0)))))) | 0);
                        y1 = ((cy1) | 0);
                    }
                }
                ((members.m_vector)?.add_point?.(x0, y0, h_m_vectbuf[i].color, 0) ?? 0);
                ((members.m_vector)?.add_point?.(x1, y1, h_m_vectbuf[i].color, h_m_vectbuf[i].intensity) ?? 0);
            }
            if (((Number(h_m_vectbuf[i].status) === Number(1)) ? 1 : 0)) {
                cx0 = ((h_m_vectbuf[i].x) | 0);
                cy0 = ((h_m_vectbuf[i].y) | 0);
                cx1 = ((h_m_vectbuf[i].arg1) | 0);
                cy1 = ((h_m_vectbuf[i].arg2) | 0);
                if (((Number(cx0) > Number(cx1)) ? 1 : 0)) {
                    (__l["swap"] ? __l["swap"](cx0, cx1) : runtime.macro("swap", cx0, cx1));
                }
                if (((Number(cy0) > Number(cy1)) ? 1 : 0)) {
                    (__l["swap"] ? __l["swap"](cy0, cy1) : runtime.macro("swap", cy0, cy1));
                }
            }
        }
        members.m_nvect = ((0) | 0);
    }
    function method_handler_7(runtime) {
        const members = runtime.members;
        let cycles = ((method_avg_common_strobe3(runtime)) | 0);
        if ((((((method_OP0(runtime)) ? 0 : 1)) && (((method_OP2(runtime)) ? 0 : 1))) ? 1 : 0)) {
            method_vg_add_point_buf(runtime, (members.m_xpos ?? runtime.member("m_xpos")), (members.m_ypos ?? runtime.member("m_ypos")), method_vector_device__color111(runtime, 7), ((((((Number(runtime.shiftRight((members.m_int_latch ?? runtime.member("m_int_latch")), 1)) === Number(1)) ? 1 : 0)) ? ((members.m_intensity ?? runtime.member("m_intensity"))) : ((((members.m_int_latch ?? runtime.member("m_int_latch"))) & (14))))) << (4)));
        }
        return cycles;
    }
    function method_avg_common_strobe3(runtime) {
        const members = runtime.members;
        let cycles = ((0) | 0);
        members.m_halt = ((method_OP0(runtime)) & 0xff);
        if ((((((method_OP0(runtime)) ? 0 : 1)) && (((method_OP2(runtime)) ? 0 : 1))) ? 1 : 0)) {
            if (method_OP1(runtime)) {
                cycles = ((((256) - ((((members.m_timer ?? runtime.member("m_timer"))) & (255))))) | 0);
            }
            else {
                cycles = ((((32768) - ((members.m_timer ?? runtime.member("m_timer"))))) | 0);
            }
            members.m_timer = ((0) & 0xffff);
            members.m_xpos = ((((members.m_xpos) + (runtime.shiftRight(((((((((runtime.shiftRight((members.m_dvx ?? runtime.member("m_dvx")), 3)) ^ ((members.m_xdac_xor ?? runtime.member("m_xdac_xor"))))) - (512))) * (cycles))) * ((((members.m_scale ?? runtime.member("m_scale"))) ^ (255)))), 4)))) | 0);
            members.m_ypos = ((((members.m_ypos) - (runtime.shiftRight(((((((((runtime.shiftRight((members.m_dvy ?? runtime.member("m_dvy")), 3)) ^ ((members.m_ydac_xor ?? runtime.member("m_ydac_xor"))))) - (512))) * (cycles))) * ((((members.m_scale ?? runtime.member("m_scale"))) ^ (255)))), 4)))) | 0);
        }
        if (method_OP2(runtime)) {
            cycles = ((((32768) - ((members.m_timer ?? runtime.member("m_timer"))))) | 0);
            members.m_timer = ((0) & 0xffff);
            members.m_xpos = (((members.m_xcenter ?? runtime.member("m_xcenter"))) | 0);
            members.m_ypos = (((members.m_ycenter ?? runtime.member("m_ycenter"))) | 0);
            method_vg_add_point_buf(runtime, (members.m_xpos ?? runtime.member("m_xpos")), (members.m_ypos ?? runtime.member("m_ypos")), 0, 0);
        }
        return cycles;
    }
    function method_vg_add_point_buf(runtime, x, y, color, intensity) {
        const members = runtime.members;
        const h_m_vectbuf = members.m_vectbuf ?? runtime.member("m_vectbuf");
        if (((Number((members.m_nvect ?? runtime.member("m_nvect"))) < Number(10000)) ? 1 : 0)) {
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].status = ((0) | 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].x = ((x) | 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].y = ((y) | 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].color = ((color) >>> 0);
            h_m_vectbuf[(members.m_nvect ?? runtime.member("m_nvect"))].intensity = ((intensity) | 0);
            members.m_nvect = ((((members.m_nvect) + (1))) | 0);
        }
    }
    function method_vector_device__color111(runtime, c) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["rgb_t"] ? __l["rgb_t"]((__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(c, 2)) : runtime.macro("pal1bit", runtime.shiftRight(c, 2))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(c, 1)) : runtime.macro("pal1bit", runtime.shiftRight(c, 1))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(c, 0)) : runtime.macro("pal1bit", runtime.shiftRight(c, 0)))) : runtime.macro("rgb_t", (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(c, 2)) : runtime.macro("pal1bit", runtime.shiftRight(c, 2))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(c, 1)) : runtime.macro("pal1bit", runtime.shiftRight(c, 1))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(c, 0)) : runtime.macro("pal1bit", runtime.shiftRight(c, 0)))));
    }
    return {
        "vg_set_halt_callback": method_vg_set_halt_callback,
        "vg_set_halt": method_vg_set_halt,
        "run_state_machine": method_run_state_machine,
        "state_addr": method_state_addr,
        "ST3": method_ST3,
        "update_databus": method_update_databus,
        "handler_0": method_handler_0,
        "handler_1": method_handler_1,
        "vg_add_clip": method_vg_add_clip,
        "avg_device::handler_1": method_avg_device__handler_1,
        "handler_2": method_handler_2,
        "handler_3": method_handler_3,
        "handler_4": method_handler_4,
        "OP0": method_OP0,
        "OP1": method_OP1,
        "handler_5": method_handler_5,
        "OP2": method_OP2,
        "avg_common_strobe1": method_avg_common_strobe1,
        "handler_6": method_handler_6,
        "avg_common_strobe2": method_avg_common_strobe2,
        "vg_flush": method_vg_flush,
        "handler_7": method_handler_7,
        "avg_common_strobe3": method_avg_common_strobe3,
        "vg_add_point_buf": method_vg_add_point_buf,
        "vector_device::color111": method_vector_device__color111
    };
})();
definition.compiledMethodLinks = ["attotime::from_hz", "pal1bit", "rgb_t", "swap"];
export const device = definition;
export default device;
