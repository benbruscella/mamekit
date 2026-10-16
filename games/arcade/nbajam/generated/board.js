// GENERATED executable machine composition from src/mame/williams/midtunit.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'nbajam');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_nbajam_prot_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let result = ((runtime.readIndex((members.m_nbajam_prot_queue ?? runtime.member("m_nbajam_prot_queue")), (members.m_nbajam_prot_index ?? runtime.member("m_nbajam_prot_index")))) & 0xffff);
                if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    if (((Number((members.m_nbajam_prot_index ?? runtime.member("m_nbajam_prot_index"))) < Number(4)) ? 1 : 0)) {
                        members.m_nbajam_prot_index = ((((members.m_nbajam_prot_index) + (1))) & 0xff);
                    }
                }
                return result;
            }
            function method_midtunit_vram_r(runtime, offset) {
                const members = runtime.members;
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    return ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) << (8))));
                }
                else {
                    return ((runtime.shiftRight(runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset), 8)) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (65280))));
                }
            }
            function method_midtunit_vram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((data) & (255))) | (((((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((runtime.shiftRight(data, 8)) & (255))) | (((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (65280)))));
                    }
                }
                else {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((((data) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (255))) | (((data) & (65280)))));
                    }
                }
            }
            function method_cmos_r(runtime, offset) {
                const members = runtime.members;
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                return runtime.readIndex(h_m_nvram, offset);
            }
            function method_cmos_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                if (1) {
                    runtime.combineData(runtime.addressOf(h_m_nvram, offset), data, mem_mask);
                    members.m_cmos_write_enable = ((0) & 0xff);
                }
                else {
                    0;
                    0;
                }
            }
            function method_dma_r(runtime, offset) {
                const members = runtime.members;
                if (((Number(offset) === Number(0)) ? 1 : 0)) {
                    offset = 1;
                }
                return runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), offset);
            }
            function method_sound_state_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((members.m_fake_sound_state ?? runtime.member("m_fake_sound_state"))) {
                    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                        members.m_fake_sound_state = ((((members.m_fake_sound_state) - (1))) & 0xff);
                    }
                    return 0;
                }
                return -1;
            }
            function method_sound_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    0;
                }
                return -1;
            }
            function method_sound_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((offset) ? 0 : 1)) {
                    0;
                    return;
                }
                if (((((((mem_mask) & 0x00ff) ? 1 : 0)) && ((((mem_mask) & 0xff00) ? 1 : 0))) ? 1 : 0)) {
                    (__l["m_adpcm_sound.reset_write"] ? __l["m_adpcm_sound.reset_write"]((((~data)) & (256))) : (members.m_adpcm_sound) != null ? ((runtime.dereference(members.m_adpcm_sound)).reset_write?.((((~data)) & (256))) ?? 0) : 0);
                    (__l["m_adpcm_sound.write"] ? __l["m_adpcm_sound.write"](((data) & (255))) : (members.m_adpcm_sound) != null ? ((runtime.dereference(members.m_adpcm_sound)).write?.(((data) & (255))) ?? 0) : 0);
                    members.m_fake_sound_state = ((128) & 0xff);
                }
            }
            return {
                "nbajam_prot_r": method_nbajam_prot_r,
                "midtunit_vram_r": method_midtunit_vram_r,
                "midtunit_vram_w": method_midtunit_vram_w,
                "cmos_r": method_cmos_r,
                "cmos_w": method_cmos_w,
                "dma_r": method_dma_r,
                "sound_state_r": method_sound_state_r,
                "sound_r": method_sound_r,
                "sound_w": method_sound_w
            };
        })();
        return {
            "midtunit_adpcm_state.nbajam_prot_r": methods["nbajam_prot_r"],
            "midtunit_adpcm_state.sound_state_r": methods["sound_state_r"],
            "midtunit_adpcm_state.sound_r": methods["sound_r"],
            "midtunit_adpcm_state.sound_w": methods["sound_w"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_midtunit_vram_r(runtime, offset) {
                const members = runtime.members;
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    return ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) << (8))));
                }
                else {
                    return ((runtime.shiftRight(runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset), 8)) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (65280))));
                }
            }
            function method_midtunit_vram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((data) & (255))) | (((((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((runtime.shiftRight(data, 8)) & (255))) | (((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (65280)))));
                    }
                }
                else {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((((data) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (255))) | (((data) & (65280)))));
                    }
                }
            }
            function method_cmos_r(runtime, offset) {
                const members = runtime.members;
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                return runtime.readIndex(h_m_nvram, offset);
            }
            function method_cmos_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                if (1) {
                    runtime.combineData(runtime.addressOf(h_m_nvram, offset), data, mem_mask);
                    members.m_cmos_write_enable = ((0) & 0xff);
                }
                else {
                    0;
                    0;
                }
            }
            function method_cmos_enable_w(runtime, data) {
                const members = runtime.members;
                members.m_cmos_write_enable = ((1) & 0xff);
            }
            function method_dma_r(runtime, offset) {
                const members = runtime.members;
                if (((Number(offset) === Number(0)) ? 1 : 0)) {
                    offset = 1;
                }
                return runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), offset);
            }
            function method_sound_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((offset) ? 0 : 1)) {
                    0;
                    return;
                }
                if (((((((mem_mask) & 0x00ff) ? 1 : 0)) && ((((mem_mask) & 0xff00) ? 1 : 0))) ? 1 : 0)) {
                    (__l["m_adpcm_sound.reset_write"] ? __l["m_adpcm_sound.reset_write"]((((~data)) & (256))) : (members.m_adpcm_sound) != null ? ((runtime.dereference(members.m_adpcm_sound)).reset_write?.((((~data)) & (256))) ?? 0) : 0);
                    (__l["m_adpcm_sound.write"] ? __l["m_adpcm_sound.write"](((data) & (255))) : (members.m_adpcm_sound) != null ? ((runtime.dereference(members.m_adpcm_sound)).write?.(((data) & (255))) ?? 0) : 0);
                    members.m_fake_sound_state = ((128) & 0xff);
                }
            }
            return {
                "midtunit_vram_r": method_midtunit_vram_r,
                "midtunit_vram_w": method_midtunit_vram_w,
                "cmos_r": method_cmos_r,
                "cmos_w": method_cmos_w,
                "cmos_enable_w": method_cmos_enable_w,
                "dma_r": method_dma_r,
                "sound_w": method_sound_w
            };
        })();
        return {
            "midtunit_base_state.cmos_r": methods["cmos_r"],
            "midtunit_base_state.cmos_w": methods["cmos_w"],
            "midtunit_base_state.cmos_enable_w": methods["cmos_enable_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_adpcm_sound.reset_write", "m_adpcm_sound.write", "machine", "machine().side_effects_disabled"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
