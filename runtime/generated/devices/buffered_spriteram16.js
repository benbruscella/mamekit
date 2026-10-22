import deviceData from './buffered_spriteram16.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_vblank_copy_rising(runtime, state) {
        const members = runtime.members;
        if (state) {
            runtime.invoke("copy");
        }
    }
    function method_bytes(runtime) {
        const members = runtime.members;
        return runtime.container(members.m_spriteram, "bytes");
    }
    function method_vblank_copy_falling(runtime, state) {
        const members = runtime.members;
        if (((state) ? 0 : 1)) {
            runtime.invoke("copy");
        }
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
        "vblank_copy_rising": method_vblank_copy_rising,
        "bytes": method_bytes,
        "vblank_copy_falling": method_vblank_copy_falling,
        "buffered_spriteram_device::vblank_copy_rising": method_buffered_spriteram_device__vblank_copy_rising,
        "buffered_spriteram_device::vblank_copy_falling": method_buffered_spriteram_device__vblank_copy_falling
    };
})();
export const device = definition;
export default device;
