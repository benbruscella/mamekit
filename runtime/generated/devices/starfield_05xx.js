import deviceData from './starfield_05xx.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_draw_starfield(runtime, bitmap, cliprect, flip) {
        const members = runtime.members;
        if (((members.m_enable) ? 0 : 1)) {
            return;
        }
        let pre_vis_cycle_count = ((members.m_pre_vis_cycle_count) & 0xffff);
        let post_vis_cycle_count = ((members.m_post_vis_cycle_count) & 0xffff);
        while (pre_vis_cycle_count) {
            members.m_lfsr = ((method_get_next_lfsr_state(runtime, members.m_lfsr)) & 0xffff);
            pre_vis_cycle_count = ((((pre_vis_cycle_count) - (1))) & 0xffff);
        }
        for (let y = members.m_offset_y; ((Number(y) < Number(((224) + (members.m_offset_y)))) ? 1 : 0); y = ((y) + (1))) {
            for (let x = members.m_offset_x; ((Number(x) < Number(((256) + (members.m_offset_x)))) ? 1 : 0); x = ((x) + (1))) {
                if (((Number(((members.m_lfsr) & (64020))) === Number(30720)) ? 1 : 0)) {
                    let star_set = ((((((members.m_lfsr) >>> (10)) & 1) << 1 | (((members.m_lfsr) >>> (8)) & 1) << 0)) & 0xff);
                    if ((((((Number(members.m_set_a) === Number(star_set)) ? 1 : 0)) || (((Number(members.m_set_b) === Number(star_set)) ? 1 : 0))) ? 1 : 0)) {
                        if (((Number(x) < Number(members.m_limit_x)) ? 1 : 0)) {
                            let dx = x;
                            if (flip) {
                                dx = ((dx) + (64));
                            }
                            if (cliprect.contains(dx, y)) {
                                let color = ((0) & 0xff);
                                color = ((((((members.m_lfsr) >>> (5))) & (7))) & 0xff);
                                color = ((((color) | (((((members.m_lfsr) << (3))) & (24))))) & 0xff);
                                color = ((((color) | (((((members.m_lfsr) << (2))) & (32))))) & 0xff);
                                color = (((((~color)) & (63))) & 0xff);
                                bitmap["pix="](y, dx, ((512) + (color)));
                            }
                        }
                    }
                }
                members.m_lfsr = ((method_get_next_lfsr_state(runtime, members.m_lfsr)) & 0xffff);
            }
        }
        while (post_vis_cycle_count) {
            members.m_lfsr = ((method_get_next_lfsr_state(runtime, members.m_lfsr)) & 0xffff);
            post_vis_cycle_count = ((((post_vis_cycle_count) - (1))) & 0xffff);
        }
    }
    function method_get_next_lfsr_state(runtime, lfsr) {
        const members = runtime.members;
        let bit = ((0) & 0xffff);
        bit = ((((((((((lfsr) >>> (0))) ^ (((lfsr) >>> (3))))) ^ (((lfsr) >>> (5))))) ^ (((lfsr) >>> (10))))) & 0xffff);
        lfsr = ((((((lfsr) >>> (1))) | (((bit) << (15))))) & 0xffff);
        return lfsr;
    }
    return {
        "draw_starfield": method_draw_starfield,
        "get_next_lfsr_state": method_get_next_lfsr_state
    };
})();
export const device = definition;
export default device;
