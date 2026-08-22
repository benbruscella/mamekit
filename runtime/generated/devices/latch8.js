import deviceData from './latch8.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_timerproc(runtime, param) {
        const members = runtime.members;
        let new_val = ((((param) & (255))) & 0xff);
        let mask = ((((param) >>> (8))) & 0xff);
        method_update(runtime, new_val, mask);
    }
    function method_update(runtime, new_val, mask) {
        const members = runtime.members;
        let old_val = ((members.m_value) & 0xff);
        members.m_value = ((((((members.m_value) & ((~mask)))) | (((new_val) & (mask))))) & 0xff);
        if (members.m_has_write) {
            let changed = ((((old_val) ^ (members.m_value))) & 0xff);
            for (let i = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
                if ((((changed) >>> (i)) & 1)) {
                    runtime.readIndex(members.m_write_cb, i)((((members.m_value) >>> (i)) & 1));
                }
            }
        }
    }
    return {
        "timerproc": method_timerproc,
        "update": method_update
    };
})();
export const device = definition;
export default device;
