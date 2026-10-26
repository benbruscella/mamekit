import deviceData from './buffered_spriteram16.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_live(runtime) {
        const members = runtime.members;
        const h_m_spriteram = members.m_spriteram ?? 0;
        return h_m_spriteram;
    }
    function method_buffer(runtime) {
        const members = runtime.members;
        return ({ generatedPointer: true, source: (members.m_buffered ?? 0), offset: 0 });
    }
    function method_bytes(runtime) {
        const members = runtime.members;
        return runtime.container(members.m_spriteram, "bytes");
    }
    function method_vblank_copy_rising(runtime, state) {
        const members = runtime.members;
        if (state) {
            runtime.invoke("copy");
        }
    }
    function method_vblank_copy_falling(runtime, state) {
        const members = runtime.members;
        if (((state) ? 0 : 1)) {
            runtime.invoke("copy");
        }
    }
    function method_buffered_spriteram_device__live(runtime) {
        const members = runtime.members;
        const h_m_spriteram = members.m_spriteram ?? 0;
        return h_m_spriteram;
    }
    function method_buffered_spriteram_device__buffer(runtime) {
        const members = runtime.members;
        return ({ generatedPointer: true, source: (members.m_buffered ?? 0), offset: 0 });
    }
    function method_buffered_spriteram_device__bytes(runtime) {
        const members = runtime.members;
        return runtime.container(members.m_spriteram, "bytes");
    }
    function method_buffered_spriteram_device__vblank_copy_rising(runtime, state) {
        const members = runtime.members;
        if (state) {
            runtime.invoke("copy");
        }
    }
    function method_buffered_spriteram_device__vblank_copy_falling(runtime, state) {
        const members = runtime.members;
        if (((state) ? 0 : 1)) {
            runtime.invoke("copy");
        }
    }
    return {
        "live": method_live,
        "buffer": method_buffer,
        "bytes": method_bytes,
        "vblank_copy_rising": method_vblank_copy_rising,
        "vblank_copy_falling": method_vblank_copy_falling,
        "buffered_spriteram_device::live": method_buffered_spriteram_device__live,
        "buffered_spriteram_device::buffer": method_buffered_spriteram_device__buffer,
        "buffered_spriteram_device::bytes": method_buffered_spriteram_device__bytes,
        "buffered_spriteram_device::vblank_copy_rising": method_buffered_spriteram_device__vblank_copy_rising,
        "buffered_spriteram_device::vblank_copy_falling": method_buffered_spriteram_device__vblank_copy_falling
    };
})();
export const device = definition;
export default device;
