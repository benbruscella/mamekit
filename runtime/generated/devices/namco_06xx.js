import deviceData from './namco_06xx.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_write_sync(runtime, param) {
        const members = runtime.members;
        if ((((members.m_control) >>> (4)) & 1)) {
            (runtime.calls["TRACE_NOOP"]?.() ?? 0);
            return;
        }
        if ((((members.m_control) >>> (0)) & 1)) {
            runtime.readIndex(members.m_write, 0)(0, param);
        }
        if ((((members.m_control) >>> (1)) & 1)) {
            runtime.readIndex(members.m_write, 1)(0, param);
        }
        if ((((members.m_control) >>> (2)) & 1)) {
            runtime.readIndex(members.m_write, 2)(0, param);
        }
        if ((((members.m_control) >>> (3)) & 1)) {
            runtime.readIndex(members.m_write, 3)(0, param);
        }
    }
    return {
        "write_sync": method_write_sync
    };
})();
export const device = definition;
export default device;
