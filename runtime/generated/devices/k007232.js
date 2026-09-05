import deviceData from './k007232.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read_rom_default(runtime, offset) {
        const members = runtime.members;
        const h_m_rom = members.m_rom ?? runtime.member("m_rom");
        return runtime.readIndex(h_m_rom, (((((members.m_bank ?? runtime.member("m_bank"))) + (((offset) & (131071))))) & ((((members.m_rom).length) - (1)))));
    }
    function method_k007232_device__read_rom_default(runtime, offset) {
        const members = runtime.members;
        const h_m_rom = members.m_rom ?? runtime.member("m_rom");
        return runtime.readIndex(h_m_rom, (((((members.m_bank ?? runtime.member("m_bank"))) + (((offset) & (131071))))) & ((((members.m_rom).length) - (1)))));
    }
    return {
        "read_rom_default": method_read_rom_default,
        "k007232_device::read_rom_default": method_k007232_device__read_rom_default
    };
})();
export const device = definition;
export default device;
