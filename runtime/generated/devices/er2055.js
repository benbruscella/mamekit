import deviceData from './er2055.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_set_clk(runtime, state) {
        const members = runtime.members;
        let oldstate = (((members.m_control_state ?? 0)) & 0xff);
        if (state) {
            members.m_control_state = ((((members.m_control_state) | (1))) & 0xff);
        }
        else {
            members.m_control_state = ((((members.m_control_state) & (-2))) & 0xff);
        }
        if (((((((((Number((((members.m_control_state ?? 0)) & (24))) === Number(24)) ? 1 : 0)) && (((Number((members.m_control_state ?? 0)) !== Number(oldstate)) ? 1 : 0))) ? 1 : 0)) && (((state) ? 0 : 1))) ? 1 : 0)) {
            if (((Number((((members.m_control_state ?? 0)) & (2))) === Number(2)) ? 1 : 0)) {
                members.m_data = (((members.m_rom_data ?? 0)[(members.m_address ?? 0)]) & 0xff);
                0;
            }
            method_update_state(runtime);
        }
    }
    function method_update_state(runtime) {
        const members = runtime.members;
        switch ((((members.m_control_state ?? 0)) & (6))) {
            case 0:
                {
                    (members.m_rom_data ?? 0)[(members.m_address ?? 0)] = runtime.andAssign((members.m_rom_data ?? 0)[(members.m_address ?? 0)], (members.m_data ?? 0));
                    0;
                    break;
                }
            case 4:
                {
                    (members.m_rom_data ?? 0)[(members.m_address ?? 0)] = 255;
                    0;
                    break;
                }
        }
    }
    return {
        "set_clk": method_set_clk,
        "update_state": method_update_state
    };
})();
export const device = definition;
export default device;
