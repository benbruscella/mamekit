import deviceData from './k053260.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_main_read(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_portdata ?? runtime.member("m_portdata")), runtime.add(2, ((offset) & (1))));
    }
    function method_main_write(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_portdata"), ((offset) & (1)), data);
    }
    function method_update_state_outputs(runtime, param) {
        const members = runtime.members;
        switch ((members.m_timer_state ?? runtime.member("m_timer_state"))) {
            case 0:
                {
                    if ((((typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh1_cb)).isunset() : typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh1_cb)).isunset : runtime.container(members.m_sh1_cb, "isunset"))) ? 0 : 1)) {
                        runtime.invoke("m_sh1_cb", 1);
                    }
                    break;
                }
            case 1:
                {
                    if ((((typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh1_cb)).isunset() : typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh1_cb)).isunset : runtime.container(members.m_sh1_cb, "isunset"))) ? 0 : 1)) {
                        runtime.invoke("m_sh1_cb", 0);
                    }
                    method_tim2_count(runtime);
                    break;
                }
            case 2:
                {
                    if ((((typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh2_cb)).isunset() : typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh2_cb)).isunset : runtime.container(members.m_sh2_cb, "isunset"))) ? 0 : 1)) {
                        runtime.invoke("m_sh2_cb", 1);
                    }
                    break;
                }
            case 3:
                {
                    if ((((typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh2_cb)).isunset() : typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh2_cb)).isunset : runtime.container(members.m_sh2_cb, "isunset"))) ? 0 : 1)) {
                        runtime.invoke("m_sh2_cb", 0);
                    }
                    break;
                }
        }
        members.m_timer_state = (((((((members.m_timer_state ?? runtime.member("m_timer_state"))) + (1))) & (3))) >>> 0);
    }
    function method_tim2_count(runtime) {
        const members = runtime.members;
        members.m_tim2_count = ((((members.m_tim2_count) + (1))) >>> 0);
        if (((Number((members.m_tim2_count ?? runtime.member("m_tim2_count"))) >= Number(112)) ? 1 : 0)) {
            members.m_tim2_count = ((0) >>> 0);
            runtime.invoke("m_tim2_cb", 1);
        }
        else {
            if (((Number((members.m_tim2_count ?? runtime.member("m_tim2_count"))) === Number(1)) ? 1 : 0)) {
                runtime.invoke("m_tim2_cb", 0);
            }
        }
    }
    return {
        "main_read": method_main_read,
        "main_write": method_main_write,
        "update_state_outputs": method_update_state_outputs,
        "tim2_count": method_tim2_count
    };
})();
export const device = definition;
export default device;
