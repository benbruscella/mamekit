import deviceData from './k053260.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_main_read(runtime, offset) {
        const members = runtime.members;
        const h_m_portdata = members.m_portdata ?? 0;
        return ((h_m_portdata[runtime.add(2, ((offset) & (1)))]) & 0xff);
    }
    function method_main_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_portdata = members.m_portdata ?? 0;
        h_m_portdata[((offset) & (1))] = data;
    }
    function method_update_state_outputs(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch ((members.m_timer_state ?? 0)) {
            case 0:
                {
                    if ((((typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh1_cb)).isunset() : typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh1_cb)).isunset : runtime.container(members.m_sh1_cb, "isunset"))) ? 0 : 1)) {
                        (__l["m_sh1_cb"] ? __l["m_sh1_cb"](Number(1)) : typeof members.m_sh1_cb === 'function' ? members.m_sh1_cb(1) : runtime.invoke("m_sh1_cb", 1));
                    }
                    break;
                }
            case 1:
                {
                    if ((((typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh1_cb)).isunset() : typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh1_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh1_cb)).isunset : runtime.container(members.m_sh1_cb, "isunset"))) ? 0 : 1)) {
                        (__l["m_sh1_cb"] ? __l["m_sh1_cb"](Number(0)) : typeof members.m_sh1_cb === 'function' ? members.m_sh1_cb(0) : runtime.invoke("m_sh1_cb", 0));
                    }
                    method_tim2_count(runtime);
                    break;
                }
            case 2:
                {
                    if ((((typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh2_cb)).isunset() : typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh2_cb)).isunset : runtime.container(members.m_sh2_cb, "isunset"))) ? 0 : 1)) {
                        (__l["m_sh2_cb"] ? __l["m_sh2_cb"](Number(1)) : typeof members.m_sh2_cb === 'function' ? members.m_sh2_cb(1) : runtime.invoke("m_sh2_cb", 1));
                    }
                    break;
                }
            case 3:
                {
                    if ((((typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'function' ? (runtime.dereference(members.m_sh2_cb)).isunset() : typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_sh2_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_sh2_cb)).isunset : runtime.container(members.m_sh2_cb, "isunset"))) ? 0 : 1)) {
                        (__l["m_sh2_cb"] ? __l["m_sh2_cb"](Number(0)) : typeof members.m_sh2_cb === 'function' ? members.m_sh2_cb(0) : runtime.invoke("m_sh2_cb", 0));
                    }
                    break;
                }
        }
        members.m_timer_state = (((((((members.m_timer_state ?? 0)) + (1))) & (3))) >>> 0);
    }
    function method_tim2_count(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_tim2_count = ((((members.m_tim2_count) + (1))) >>> 0);
        if (((Number((members.m_tim2_count ?? 0)) >= Number(112)) ? 1 : 0)) {
            members.m_tim2_count = ((0) >>> 0);
            (__l["m_tim2_cb"] ? __l["m_tim2_cb"](Number(1)) : typeof members.m_tim2_cb === 'function' ? members.m_tim2_cb(1) : runtime.invoke("m_tim2_cb", 1));
        }
        else {
            if (((Number((members.m_tim2_count ?? 0)) === Number(1)) ? 1 : 0)) {
                (__l["m_tim2_cb"] ? __l["m_tim2_cb"](Number(0)) : typeof members.m_tim2_cb === 'function' ? members.m_tim2_cb(0) : runtime.invoke("m_tim2_cb", 0));
            }
        }
    }
    function method_sh1_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_sh1_cb)).bind === 'function' ? (runtime.dereference(members.m_sh1_cb)).bind() : typeof (runtime.dereference(members.m_sh1_cb)).bind === 'number' || typeof (runtime.dereference(members.m_sh1_cb)).bind === 'boolean' ? (runtime.dereference(members.m_sh1_cb)).bind : runtime.container(members.m_sh1_cb, "bind"));
    }
    function method_sh2_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_sh2_cb)).bind === 'function' ? (runtime.dereference(members.m_sh2_cb)).bind() : typeof (runtime.dereference(members.m_sh2_cb)).bind === 'number' || typeof (runtime.dereference(members.m_sh2_cb)).bind === 'boolean' ? (runtime.dereference(members.m_sh2_cb)).bind : runtime.container(members.m_sh2_cb, "bind"));
    }
    function method_tim2_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_tim2_cb)).bind === 'function' ? (runtime.dereference(members.m_tim2_cb)).bind() : typeof (runtime.dereference(members.m_tim2_cb)).bind === 'number' || typeof (runtime.dereference(members.m_tim2_cb)).bind === 'boolean' ? (runtime.dereference(members.m_tim2_cb)).bind : runtime.container(members.m_tim2_cb, "bind"));
    }
    function method_k053260_device__sh1_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_sh1_cb)).bind === 'function' ? (runtime.dereference(members.m_sh1_cb)).bind() : typeof (runtime.dereference(members.m_sh1_cb)).bind === 'number' || typeof (runtime.dereference(members.m_sh1_cb)).bind === 'boolean' ? (runtime.dereference(members.m_sh1_cb)).bind : runtime.container(members.m_sh1_cb, "bind"));
    }
    function method_k053260_device__sh2_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_sh2_cb)).bind === 'function' ? (runtime.dereference(members.m_sh2_cb)).bind() : typeof (runtime.dereference(members.m_sh2_cb)).bind === 'number' || typeof (runtime.dereference(members.m_sh2_cb)).bind === 'boolean' ? (runtime.dereference(members.m_sh2_cb)).bind : runtime.container(members.m_sh2_cb, "bind"));
    }
    function method_k053260_device__tim2_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_tim2_cb)).bind === 'function' ? (runtime.dereference(members.m_tim2_cb)).bind() : typeof (runtime.dereference(members.m_tim2_cb)).bind === 'number' || typeof (runtime.dereference(members.m_tim2_cb)).bind === 'boolean' ? (runtime.dereference(members.m_tim2_cb)).bind : runtime.container(members.m_tim2_cb, "bind"));
    }
    return {
        "main_read": method_main_read,
        "main_write": method_main_write,
        "update_state_outputs": method_update_state_outputs,
        "tim2_count": method_tim2_count,
        "sh1_cb": method_sh1_cb,
        "sh2_cb": method_sh2_cb,
        "tim2_cb": method_tim2_cb,
        "k053260_device::sh1_cb": method_k053260_device__sh1_cb,
        "k053260_device::sh2_cb": method_k053260_device__sh2_cb,
        "k053260_device::tim2_cb": method_k053260_device__tim2_cb
    };
})();
definition.compiledMethodLinks = ["m_sh1_cb", "m_sh2_cb", "m_tim2_cb"];
export const device = definition;
export default device;
