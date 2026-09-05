import deviceData from './adc0804.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_conversion_done(runtime, param) {
        const members = runtime.members;
        members.m_result = ((runtime.invoke("m_vin_callback")) & 0xff);
        if (((((((members.m_rd_active ?? runtime.member("m_rd_active"))) ? 0 : 1)) && ((((members.m_wr_active ?? runtime.member("m_wr_active"))) ? 0 : 1))) ? 1 : 0)) {
            method_set_interrupt(runtime, 1);
        }
    }
    function method_set_interrupt(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_intr_active ?? runtime.member("m_intr_active"))) !== Number(state)) ? 1 : 0)) {
            members.m_intr_active = ((state) ? 1 : 0);
            runtime.invoke("m_intr_callback", ((state) ? (1) : (0)));
        }
    }
    return {
        "conversion_done": method_conversion_done,
        "set_interrupt": method_set_interrupt
    };
})();
export const device = definition;
export default device;
