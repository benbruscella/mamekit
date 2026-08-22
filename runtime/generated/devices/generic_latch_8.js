import deviceData from './generic_latch_8.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_init_callback(runtime, param) {
        const members = runtime.members;
        runtime.invoke("m_data_pending_cb", ((members.m_latch_written) ? (1) : (0)));
    }
    function method_sync_callback(runtime, param) {
        const members = runtime.members;
        let value = ((param) & 0xff);
        if ((((method_is_latch_written(runtime)) && (((Number(members.m_latched_value) !== Number(value)) ? 1 : 0))) ? 1 : 0)) {
            (runtime.calls["TRACE_NOOP"]?.() ?? 0);
        }
        members.m_latched_value = ((value) & 0xff);
        method_set_latch_written(runtime, 1);
    }
    function method_is_latch_written(runtime) {
        const members = runtime.members;
        return members.m_latch_written;
    }
    function method_set_latch_written(runtime, latch_written) {
        const members = runtime.members;
        if (((Number(members.m_latch_written) !== Number(latch_written)) ? 1 : 0)) {
            members.m_latch_written = ((latch_written) ? 1 : 0);
            runtime.invoke("m_data_pending_cb", ((latch_written) ? (1) : (0)));
        }
    }
    return {
        "init_callback": method_init_callback,
        "sync_callback": method_sync_callback,
        "is_latch_written": method_is_latch_written,
        "set_latch_written": method_set_latch_written
    };
})();
export const device = definition;
export default device;
