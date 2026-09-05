import deviceData from './k053251.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        offset = runtime.andAssign(offset, 15);
        (members.m_ram ?? runtime.member("m_ram"))[offset] = ((data) & (63));
        if ((((((Number(offset) === Number(9)) ? 1 : 0)) || (((Number(offset) === Number(10)) ? 1 : 0))) ? 1 : 0)) {
            method_reset_indexes(runtime);
        }
    }
    function method_reset_indexes(runtime) {
        const members = runtime.members;
        (members.m_palette_index ?? runtime.member("m_palette_index"))[0] = ((32) * ((((((members.m_ram ?? runtime.member("m_ram"))[9]) >>> (0))) & (3))));
        (members.m_palette_index ?? runtime.member("m_palette_index"))[1] = ((32) * ((((((members.m_ram ?? runtime.member("m_ram"))[9]) >>> (2))) & (3))));
        (members.m_palette_index ?? runtime.member("m_palette_index"))[2] = ((32) * ((((((members.m_ram ?? runtime.member("m_ram"))[9]) >>> (4))) & (3))));
        (members.m_palette_index ?? runtime.member("m_palette_index"))[3] = ((16) * ((((((members.m_ram ?? runtime.member("m_ram"))[10]) >>> (0))) & (7))));
        (members.m_palette_index ?? runtime.member("m_palette_index"))[4] = ((16) * ((((((members.m_ram ?? runtime.member("m_ram"))[10]) >>> (3))) & (7))));
    }
    return {
        "write": method_write,
        "reset_indexes": method_reset_indexes
    };
})();
export const device = definition;
export default device;
