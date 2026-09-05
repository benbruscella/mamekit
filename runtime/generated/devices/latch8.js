import deviceData from './latch8.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read(runtime, offset) {
        const members = runtime.members;
        0;
        let res = (((members.m_value ?? runtime.member("m_value"))) & 0xff);
        if ((members.m_has_read ?? runtime.member("m_has_read"))) {
            for (let i = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
                if (((((runtime.dereference(runtime.readIndex((members.m_read_cb ?? runtime.member("m_read_cb")), i))).isunset?.() ?? runtime.container(runtime.readIndex((members.m_read_cb ?? runtime.member("m_read_cb")), i), "isunset"))) ? 0 : 1)) {
                    res = ((((((res) & ((~((1) << (i)))))) | (((runtime.readIndex((members.m_read_cb ?? runtime.member("m_read_cb")), i)()) << (i))))) & 0xff);
                }
            }
        }
        return ((((res) & ((~(members.m_maskout ?? runtime.member("m_maskout")))))) ^ ((members.m_xorvalue ?? runtime.member("m_xorvalue"))));
    }
    function method_update(runtime, new_val, mask) {
        const members = runtime.members;
        let old_val = (((members.m_value ?? runtime.member("m_value"))) & 0xff);
        members.m_value = (((((((members.m_value ?? runtime.member("m_value"))) & ((~mask)))) | (((new_val) & (mask))))) & 0xff);
        if ((members.m_has_write ?? runtime.member("m_has_write"))) {
            let changed = ((((old_val) ^ ((members.m_value ?? runtime.member("m_value"))))) & 0xff);
            for (let i = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
                if ((((changed) >>> (i)) & 1)) {
                    runtime.readIndex((members.m_write_cb ?? runtime.member("m_write_cb")), i)(((((members.m_value ?? runtime.member("m_value"))) >>> (i)) & 1));
                }
            }
        }
    }
    function method_reset_w(runtime, offset, data) {
        const members = runtime.members;
        0;
        members.m_value = ((0) & 0xff);
    }
    function method_bit0_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (0)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_bit1_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (1)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_bit2_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (2)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_bit3_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (3)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_bit4_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (4)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_bit5_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (5)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_bit6_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (6)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_bit7_w(runtime, offset, data) {
        const members = runtime.members;
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (7)) & 1)) << (offset))) & 0xff);
        method_update(runtime, masked_data, mask);
    }
    function method_timerproc(runtime, param) {
        const members = runtime.members;
        let new_val = ((((param) & (255))) & 0xff);
        let mask = ((((param) >>> (8))) & 0xff);
        method_update(runtime, new_val, mask);
    }
    return {
        "read": method_read,
        "update": method_update,
        "reset_w": method_reset_w,
        "bit0_w": method_bit0_w,
        "bit1_w": method_bit1_w,
        "bit2_w": method_bit2_w,
        "bit3_w": method_bit3_w,
        "bit4_w": method_bit4_w,
        "bit5_w": method_bit5_w,
        "bit6_w": method_bit6_w,
        "bit7_w": method_bit7_w,
        "timerproc": method_timerproc
    };
})();
export const device = definition;
export default device;
