import deviceData from './mathbox.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_go_w(runtime, offset, data) {
        const members = runtime.members;
        let mb_temp = ((0) | 0);
        let mb_q = ((0) << 16 >> 16);
        let msb = ((0) | 0);
        0;
        let __switch_step_048_step_0bf = ((offset) | 0);
        while (1) {
            switch (__switch_step_048_step_0bf) {
                case 0:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[0] = (((((members.m_reg ?? runtime.member("m_reg"))[0]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 1:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[0] = (((((members.m_reg ?? runtime.member("m_reg"))[0]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 2:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[1] = (((((members.m_reg ?? runtime.member("m_reg"))[1]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 3:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[1] = (((((members.m_reg ?? runtime.member("m_reg"))[1]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 4:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[2] = (((((members.m_reg ?? runtime.member("m_reg"))[2]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 5:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[2] = (((((members.m_reg ?? runtime.member("m_reg"))[2]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 6:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[3] = (((((members.m_reg ?? runtime.member("m_reg"))[3]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 7:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[3] = (((((members.m_reg ?? runtime.member("m_reg"))[3]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 8:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[4] = (((((members.m_reg ?? runtime.member("m_reg"))[4]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 9:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[4] = (((((members.m_reg ?? runtime.member("m_reg"))[4]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 10:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[5] = (((((members.m_reg ?? runtime.member("m_reg"))[5]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 12:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[6] = data)) << 16 >> 16);
                        break;
                    }
                case 21:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[7] = (((((members.m_reg ?? runtime.member("m_reg"))[7]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 22:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[7] = (((((members.m_reg ?? runtime.member("m_reg"))[7]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 26:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[8] = (((((members.m_reg ?? runtime.member("m_reg"))[8]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 27:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[8] = (((((members.m_reg ?? runtime.member("m_reg"))[8]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 13:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[10] = (((((members.m_reg ?? runtime.member("m_reg"))[10]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 14:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[10] = (((((members.m_reg ?? runtime.member("m_reg"))[10]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 15:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[11] = (((((members.m_reg ?? runtime.member("m_reg"))[11]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 16:
                    {
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[11] = (((((members.m_reg ?? runtime.member("m_reg"))[11]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 23:
                    {
                        members.m_result = (((members.m_reg ?? runtime.member("m_reg"))[7]) << 16 >> 16);
                        break;
                    }
                case 25:
                    {
                        members.m_result = (((members.m_reg ?? runtime.member("m_reg"))[8]) << 16 >> 16);
                        break;
                    }
                case 24:
                    {
                        members.m_result = (((members.m_reg ?? runtime.member("m_reg"))[9]) << 16 >> 16);
                        break;
                    }
                case 11:
                    {
                        (members.m_reg ?? runtime.member("m_reg"))[5] = (((((members.m_reg ?? runtime.member("m_reg"))[5]) & (255))) | (((data) << (8))));
                        (members.m_reg ?? runtime.member("m_reg"))[15] = ((65535) << 16 >> 16);
                        (members.m_reg ?? runtime.member("m_reg"))[4] = (((members.m_reg ?? runtime.member("m_reg"))[4]) - ((members.m_reg ?? runtime.member("m_reg"))[2]));
                        (members.m_reg ?? runtime.member("m_reg"))[5] = (((members.m_reg ?? runtime.member("m_reg"))[5]) - ((members.m_reg ?? runtime.member("m_reg"))[3]));
                    }
                case -1073741824:
                    {
                        mb_temp = (((((((members.m_reg ?? runtime.member("m_reg"))[0]) | 0)) * ((((members.m_reg ?? runtime.member("m_reg"))[4]) | 0)))) | 0);
                        (members.m_reg ?? runtime.member("m_reg"))[12] = runtime.shiftRight(mb_temp, 16);
                        (members.m_reg ?? runtime.member("m_reg"))[14] = ((mb_temp) & (65535));
                        mb_temp = (((((((-(members.m_reg ?? runtime.member("m_reg"))[1])) | 0)) * ((((members.m_reg ?? runtime.member("m_reg"))[5]) | 0)))) | 0);
                        (members.m_reg ?? runtime.member("m_reg"))[7] = runtime.shiftRight(mb_temp, 16);
                        mb_q = ((((mb_temp) & (65535))) << 16 >> 16);
                        (members.m_reg ?? runtime.member("m_reg"))[7] = (((members.m_reg ?? runtime.member("m_reg"))[7]) + ((members.m_reg ?? runtime.member("m_reg"))[12]));
                        (members.m_reg ?? runtime.member("m_reg"))[14] = ((runtime.shiftRight((members.m_reg ?? runtime.member("m_reg"))[14], 1)) & (32767));
                        (members.m_reg ?? runtime.member("m_reg"))[12] = ((runtime.shiftRight(mb_q, 1)) & (32767));
                        mb_q = (((((members.m_reg ?? runtime.member("m_reg"))[12]) + ((members.m_reg ?? runtime.member("m_reg"))[14]))) << 16 >> 16);
                        if (((Number(mb_q) < Number(0)) ? 1 : 0)) {
                            (members.m_reg ?? runtime.member("m_reg"))[7] = (((members.m_reg ?? runtime.member("m_reg"))[7]) + (1));
                        }
                        members.m_result = (((members.m_reg ?? runtime.member("m_reg"))[7]) << 16 >> 16);
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[15]) < Number(0)) ? 1 : 0)) {
                            break;
                        }
                        (members.m_reg ?? runtime.member("m_reg"))[7] = (((members.m_reg ?? runtime.member("m_reg"))[7]) + ((members.m_reg ?? runtime.member("m_reg"))[2]));
                    }
                case 18:
                    {
                        mb_temp = (((((((members.m_reg ?? runtime.member("m_reg"))[1]) | 0)) * ((((members.m_reg ?? runtime.member("m_reg"))[4]) | 0)))) | 0);
                        (members.m_reg ?? runtime.member("m_reg"))[12] = runtime.shiftRight(mb_temp, 16);
                        (members.m_reg ?? runtime.member("m_reg"))[9] = ((mb_temp) & (65535));
                        mb_temp = (((((((members.m_reg ?? runtime.member("m_reg"))[0]) | 0)) * ((((members.m_reg ?? runtime.member("m_reg"))[5]) | 0)))) | 0);
                        (members.m_reg ?? runtime.member("m_reg"))[8] = runtime.shiftRight(mb_temp, 16);
                        mb_q = ((((mb_temp) & (65535))) << 16 >> 16);
                        (members.m_reg ?? runtime.member("m_reg"))[8] = (((members.m_reg ?? runtime.member("m_reg"))[8]) + ((members.m_reg ?? runtime.member("m_reg"))[12]));
                        (members.m_reg ?? runtime.member("m_reg"))[9] = ((runtime.shiftRight((members.m_reg ?? runtime.member("m_reg"))[9], 1)) & (32767));
                        (members.m_reg ?? runtime.member("m_reg"))[12] = ((runtime.shiftRight(mb_q, 1)) & (32767));
                        (members.m_reg ?? runtime.member("m_reg"))[9] = (((members.m_reg ?? runtime.member("m_reg"))[9]) + ((members.m_reg ?? runtime.member("m_reg"))[12]));
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[9]) < Number(0)) ? 1 : 0)) {
                            (members.m_reg ?? runtime.member("m_reg"))[8] = (((members.m_reg ?? runtime.member("m_reg"))[8]) + (1));
                        }
                        (members.m_reg ?? runtime.member("m_reg"))[9] = (((members.m_reg ?? runtime.member("m_reg"))[9]) << (1));
                        members.m_result = (((members.m_reg ?? runtime.member("m_reg"))[8]) << 16 >> 16);
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[15]) < Number(0)) ? 1 : 0)) {
                            break;
                        }
                        (members.m_reg ?? runtime.member("m_reg"))[8] = (((members.m_reg ?? runtime.member("m_reg"))[8]) + ((members.m_reg ?? runtime.member("m_reg"))[3]));
                        (members.m_reg ?? runtime.member("m_reg"))[9] = runtime.andAssign((members.m_reg ?? runtime.member("m_reg"))[9], 65280);
                    }
                case 19:
                    {
                        0;
                        (members.m_reg ?? runtime.member("m_reg"))[12] = (members.m_reg ?? runtime.member("m_reg"))[9];
                        mb_q = (((members.m_reg ?? runtime.member("m_reg"))[8]) << 16 >> 16);
                        __switch_step_048_step_0bf = ((-1073741825) | 0);
                        continue;
                    }
                case 20:
                    {
                        (members.m_reg ?? runtime.member("m_reg"))[12] = (members.m_reg ?? runtime.member("m_reg"))[10];
                        mb_q = (((members.m_reg ?? runtime.member("m_reg"))[11]) << 16 >> 16);
                    }
                case -1073741825:
                    {
                        (members.m_reg ?? runtime.member("m_reg"))[14] = (((members.m_reg ?? runtime.member("m_reg"))[7]) ^ (mb_q));
                        (members.m_reg ?? runtime.member("m_reg"))[13] = mb_q;
                        if (((Number(mb_q) >= Number(0)) ? 1 : 0)) {
                            mb_q = (((members.m_reg ?? runtime.member("m_reg"))[12]) << 16 >> 16);
                        }
                        else {
                            (members.m_reg ?? runtime.member("m_reg"))[13] = (((-mb_q)) - (1));
                            mb_q = (((((-(members.m_reg ?? runtime.member("m_reg"))[12])) - (1))) << 16 >> 16);
                            if ((((((Number(mb_q) < Number(0)) ? 1 : 0)) && (((Number(((mb_q) + (1))) < Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                (members.m_reg ?? runtime.member("m_reg"))[13] = (((members.m_reg ?? runtime.member("m_reg"))[13]) + (1));
                            }
                            mb_q = ((((mb_q) + (1))) << 16 >> 16);
                        }
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[7]) >= Number(0)) ? 1 : 0)) {
                            (members.m_reg ?? runtime.member("m_reg"))[12] = (members.m_reg ?? runtime.member("m_reg"))[7];
                        }
                        else {
                            (members.m_reg ?? runtime.member("m_reg"))[12] = (-(members.m_reg ?? runtime.member("m_reg"))[7]);
                        }
                        (members.m_reg ?? runtime.member("m_reg"))[15] = (members.m_reg ?? runtime.member("m_reg"))[6];
                        do {
                            (members.m_reg ?? runtime.member("m_reg"))[13] = (((members.m_reg ?? runtime.member("m_reg"))[13]) - ((members.m_reg ?? runtime.member("m_reg"))[12]));
                            msb = ((((Number(((mb_q) & (32768))) !== Number(0)) ? 1 : 0)) | 0);
                            mb_q = ((((mb_q) << (1))) << 16 >> 16);
                            if (((Number((members.m_reg ?? runtime.member("m_reg"))[13]) >= Number(0)) ? 1 : 0)) {
                                mb_q = ((((mb_q) + (1))) << 16 >> 16);
                            }
                            else {
                                (members.m_reg ?? runtime.member("m_reg"))[13] = (((members.m_reg ?? runtime.member("m_reg"))[13]) + ((members.m_reg ?? runtime.member("m_reg"))[12]));
                            }
                            (members.m_reg ?? runtime.member("m_reg"))[13] = (((members.m_reg ?? runtime.member("m_reg"))[13]) << (1));
                            (members.m_reg ?? runtime.member("m_reg"))[13] = (((members.m_reg ?? runtime.member("m_reg"))[13]) + (msb));
                        } while (((Number(((members.m_reg ?? runtime.member("m_reg"))[15] = (((members.m_reg ?? runtime.member("m_reg"))[15]) - (1)))) >= Number(0)) ? 1 : 0));
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[14]) >= Number(0)) ? 1 : 0)) {
                            members.m_result = ((mb_q) << 16 >> 16);
                        }
                        else {
                            members.m_result = (((-mb_q)) << 16 >> 16);
                        }
                        break;
                    }
                case 17:
                    {
                        (members.m_reg ?? runtime.member("m_reg"))[5] = (((((members.m_reg ?? runtime.member("m_reg"))[5]) & (255))) | (((data) << (8))));
                        (members.m_reg ?? runtime.member("m_reg"))[15] = 0;
                        __switch_step_048_step_0bf = ((-1073741824) | 0);
                        continue;
                    }
                case 28:
                    {
                        (members.m_reg ?? runtime.member("m_reg"))[5] = (((((members.m_reg ?? runtime.member("m_reg"))[5]) & (255))) | (((data) << (8))));
                        do {
                            (members.m_reg ?? runtime.member("m_reg"))[14] = runtime.shiftRight((((members.m_reg ?? runtime.member("m_reg"))[4]) + ((members.m_reg ?? runtime.member("m_reg"))[7])), 1);
                            (members.m_reg ?? runtime.member("m_reg"))[15] = runtime.shiftRight((((members.m_reg ?? runtime.member("m_reg"))[5]) + ((members.m_reg ?? runtime.member("m_reg"))[8])), 1);
                            if (((((((((Number((members.m_reg ?? runtime.member("m_reg"))[11]) < Number((members.m_reg ?? runtime.member("m_reg"))[14])) ? 1 : 0)) && (((Number((members.m_reg ?? runtime.member("m_reg"))[15]) < Number((members.m_reg ?? runtime.member("m_reg"))[14])) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_reg ?? runtime.member("m_reg"))[14]) + ((members.m_reg ?? runtime.member("m_reg"))[15]))) >= Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                (members.m_reg ?? runtime.member("m_reg"))[7] = (members.m_reg ?? runtime.member("m_reg"))[14];
                                (members.m_reg ?? runtime.member("m_reg"))[8] = (members.m_reg ?? runtime.member("m_reg"))[15];
                            }
                            else {
                                (members.m_reg ?? runtime.member("m_reg"))[4] = (members.m_reg ?? runtime.member("m_reg"))[14];
                                (members.m_reg ?? runtime.member("m_reg"))[5] = (members.m_reg ?? runtime.member("m_reg"))[15];
                            }
                        } while (((Number(((members.m_reg ?? runtime.member("m_reg"))[6] = (((members.m_reg ?? runtime.member("m_reg"))[6]) - (1)))) >= Number(0)) ? 1 : 0));
                        members.m_result = (((members.m_reg ?? runtime.member("m_reg"))[8]) << 16 >> 16);
                        break;
                    }
                case 29:
                    {
                        (members.m_reg ?? runtime.member("m_reg"))[3] = (((((members.m_reg ?? runtime.member("m_reg"))[3]) & (255))) | (((data) << (8))));
                        (members.m_reg ?? runtime.member("m_reg"))[2] = (((members.m_reg ?? runtime.member("m_reg"))[2]) - ((members.m_reg ?? runtime.member("m_reg"))[0]));
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[2]) < Number(0)) ? 1 : 0)) {
                            (members.m_reg ?? runtime.member("m_reg"))[2] = (-(members.m_reg ?? runtime.member("m_reg"))[2]);
                        }
                        (members.m_reg ?? runtime.member("m_reg"))[3] = (((members.m_reg ?? runtime.member("m_reg"))[3]) - ((members.m_reg ?? runtime.member("m_reg"))[1]));
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[3]) < Number(0)) ? 1 : 0)) {
                            (members.m_reg ?? runtime.member("m_reg"))[3] = (-(members.m_reg ?? runtime.member("m_reg"))[3]);
                        }
                    }
                case 30:
                    {
                        if (((Number((members.m_reg ?? runtime.member("m_reg"))[3]) >= Number((members.m_reg ?? runtime.member("m_reg"))[2])) ? 1 : 0)) {
                            (members.m_reg ?? runtime.member("m_reg"))[12] = (members.m_reg ?? runtime.member("m_reg"))[2];
                            (members.m_reg ?? runtime.member("m_reg"))[13] = (members.m_reg ?? runtime.member("m_reg"))[3];
                        }
                        else {
                            (members.m_reg ?? runtime.member("m_reg"))[13] = (members.m_reg ?? runtime.member("m_reg"))[2];
                            (members.m_reg ?? runtime.member("m_reg"))[12] = (members.m_reg ?? runtime.member("m_reg"))[3];
                        }
                        (members.m_reg ?? runtime.member("m_reg"))[12] = runtime.shiftRight((members.m_reg ?? runtime.member("m_reg"))[12], 2);
                        (members.m_reg ?? runtime.member("m_reg"))[13] = (((members.m_reg ?? runtime.member("m_reg"))[13]) + ((members.m_reg ?? runtime.member("m_reg"))[12]));
                        (members.m_reg ?? runtime.member("m_reg"))[12] = runtime.shiftRight((members.m_reg ?? runtime.member("m_reg"))[12], 1);
                        members.m_result = ((((members.m_reg ?? runtime.member("m_reg"))[13] = (((members.m_reg ?? runtime.member("m_reg"))[12]) + ((members.m_reg ?? runtime.member("m_reg"))[13])))) << 16 >> 16);
                        break;
                    }
                case 31:
                    {
                        0;
                        break;
                    }
            }
            break;
        }
        0;
    }
    return {
        "go_w": method_go_w
    };
})();
export const device = definition;
export default device;
