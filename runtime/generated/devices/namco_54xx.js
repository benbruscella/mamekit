import deviceData from './namco_54xx.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_K_r(runtime) {
        const members = runtime.members;
        return ((members.m_latched_cmd) >>> (4));
    }
    function method_R0_r(runtime) {
        const members = runtime.members;
        return ((members.m_latched_cmd) & (15));
    }
    function method_O_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        if (((Number(mem_mask) === Number(15)) ? 1 : 0)) {
            members.m_discrete.write((runtime.calls["NAMCO_54XX_0_DATA"]?.(members.m_basenode) ?? 0), ((data) & (15)));
        }
        else {
            members.m_discrete.write((runtime.calls["NAMCO_54XX_1_DATA"]?.(members.m_basenode) ?? 0), ((data) >>> (4)));
        }
    }
    function method_R1_w(runtime, data) {
        const members = runtime.members;
        members.m_discrete.write((runtime.calls["NAMCO_54XX_2_DATA"]?.(members.m_basenode) ?? 0), ((data) & (15)));
    }
    function method_write_sync(runtime, param) {
        const members = runtime.members;
        members.m_latched_cmd = ((param) & 0xff);
    }
    return {
        "K_r": method_K_r,
        "R0_r": method_R0_r,
        "O_w": method_O_w,
        "R1_w": method_R1_w,
        "write_sync": method_write_sync
    };
})();
export const device = definition;
export default device;
