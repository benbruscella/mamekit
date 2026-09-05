// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './tia_ntsc_video.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_extend_palette(runtime: any) {
    const members = runtime.members;
    for (let i: any = 0; ((Number(i) < Number(128)) ? 1 : 0); i = ((i) + (1))) {
      let new_rgb: any = (runtime.palette[i] ?? 0xff000000);
      let new_r: any = (((typeof new_rgb === 'number' ? ((new_rgb) >>> 0) & 0xff : ((runtime.dereference(new_rgb)).r?.() ?? 0))) & 0xff);
      let new_g: any = (((typeof new_rgb === 'number' ? ((new_rgb) >>> 8) & 0xff : ((runtime.dereference(new_rgb)).g?.() ?? 0))) & 0xff);
      let new_b: any = (((typeof new_rgb === 'number' ? ((new_rgb) >>> 16) & 0xff : ((runtime.dereference(new_rgb)).b?.() ?? 0))) & 0xff);
      for (let j: any = 0; ((Number(j) < Number(128)) ? 1 : 0); j = ((j) + (1))) {
        let old_rgb: any = (runtime.palette[j] ?? 0xff000000);
        let old_r: any = (((typeof old_rgb === 'number' ? ((old_rgb) >>> 0) & 0xff : ((runtime.dereference(old_rgb)).r?.() ?? 0))) & 0xff);
        let old_g: any = (((typeof old_rgb === 'number' ? ((old_rgb) >>> 8) & 0xff : ((runtime.dereference(old_rgb)).g?.() ?? 0))) & 0xff);
        let old_b: any = (((typeof old_rgb === 'number' ? ((old_rgb) >>> 16) & 0xff : ((runtime.dereference(old_rgb)).b?.() ?? 0))) & 0xff);
        (runtime.palette[((((((i) + (1))) << (7))) | (j))] = ((0xff000000 | ((runtime.divide(((new_b) + (old_b)), 2)) & 0xff) << 16 | ((runtime.divide(((new_g) + (old_g)), 2)) & 0xff) << 8 | ((runtime.divide(((new_r) + (old_r)), 2)) & 0xff)) >>> 0));
      }
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_buffer = members.buffer ?? runtime.member("buffer");
    members.screen_height = (((typeof (runtime.dereference(screen)).height === 'function' ? (runtime.dereference(screen)).height() : typeof (runtime.dereference(screen)).height === 'number' || typeof (runtime.dereference(screen)).height === 'boolean' ? (runtime.dereference(screen)).height : runtime.container(screen, "height"))) & 0xffff);
    (runtime.calls["copybitmap"] ? runtime.calls["copybitmap"](bitmap, h_buffer, 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, h_buffer, 0, 0, 0, 0, cliprect));
    return 0;
  }

  function method_draw_sprite_helper(runtime: any, p: any, col: any, gfx: any, GRP: any, COLUP: any, REFP: any) {
    const members = runtime.members;
    let i: any = 0;
    let j: any = 0;
    let k: any = 0;
    if (((REFP) & (8))) {
      GRP = ((((((GRP) >>> (0)) & 1) << 7 | (((GRP) >>> (1)) & 1) << 6 | (((GRP) >>> (2)) & 1) << 5 | (((GRP) >>> (3)) & 1) << 4 | (((GRP) >>> (4)) & 1) << 3 | (((GRP) >>> (5)) & 1) << 2 | (((GRP) >>> (6)) & 1) << 1 | (((GRP) >>> (7)) & 1) << 0)) & 0xff);
    }
    for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
      let start_pos: any = runtime.readIndex(gfx.start_drawing, i);
      for (j = runtime.readIndex(gfx.start_pixel, i); ((Number(j) < Number(8)) ? 1 : 0); j = ((j) + (1))) {
        for (k = 0; ((Number(k) < Number(runtime.readIndex(gfx.size, i))) ? 1 : 0); k = ((k) + (1))) {
          if (((GRP) & (((128) >>> (j))))) {
            if ((((((Number(start_pos) < Number(160)) ? 1 : 0)) || (((runtime.readIndex(gfx.skipclip, i)) ? 0 : 1))) ? 1 : 0)) {
              runtime.writeIndex(p, ((start_pos) % (160)), ((COLUP) >>> (1)));
              runtime.writeIndex(col, ((start_pos) % (160)), ((COLUP) >>> (1)));
            }
          }
          start_pos = ((start_pos) + (1));
        }
      }
    }
  }

  function method_draw_missile_helper(runtime: any, p: any, col: any, horz: any, skipdelay: any, latch: any, start: any, RESMP: any, ENAM: any, NUSIZ: any, COLUM: any) {
    const members = runtime.members;
    let num: any = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((NUSIZ) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0);
    let skp: any = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((NUSIZ) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0);
    let width: any = ((1) << (((((NUSIZ) >>> (4))) & (3))));
    let i: any = 0;
    let j: any = 0;
    for (i = 0; ((Number(i) < Number(num)) ? 1 : 0); i = ((i) + (1))) {
      if (((Number(i) === Number(0)) ? 1 : 0)) {
        horz = ((horz) - (skipdelay));
      }
      if (((Number(i) === Number(1)) ? 1 : 0)) {
        horz = ((horz) + (skipdelay));
      }
      if ((((((Number(i) > Number(0)) ? 1 : 0)) || (start)) ? 1 : 0)) {
        for (j = 0; ((Number(j) < Number(width)) ? 1 : 0); j = ((j) + (1))) {
          if ((((((ENAM) & (2))) && (((((RESMP) & (2))) ? 0 : 1))) ? 1 : 0)) {
            if (latch) {
              switch (((horz) % (4))) {
                case 1:
                {
                  if (((Number(horz) >= Number(0)) ? 1 : 0)) {
                    if (((Number(horz) < Number(156)) ? 1 : 0)) {
                      runtime.writeIndex(p, ((((horz) + (1))) % (160)), ((COLUM) >>> (1)));
                      runtime.writeIndex(col, ((((horz) + (1))) % (160)), ((COLUM) >>> (1)));
                    }
                    runtime.writeIndex(p, ((horz) % (160)), ((COLUM) >>> (1)));
                    runtime.writeIndex(col, ((horz) % (160)), ((COLUM) >>> (1)));
                  }
                  break;
                }
                case 2:
                case 3:
                {
                  if (((Number(horz) >= Number(0)) ? 1 : 0)) {
                    runtime.writeIndex(p, ((horz) % (160)), ((COLUM) >>> (1)));
                    runtime.writeIndex(col, ((horz) % (160)), ((COLUM) >>> (1)));
                  }
                  break;
                }
              }
            } else {
              if (((Number(horz) >= Number(0)) ? 1 : 0)) {
                runtime.writeIndex(p, ((horz) % (160)), ((COLUM) >>> (1)));
                runtime.writeIndex(col, ((horz) % (160)), ((COLUM) >>> (1)));
              }
            }
          }
          horz = ((horz) + (1));
        }
      } else {
        horz = ((horz) + (width));
      }
      horz = ((horz) + (((((8) * (((skp) + (1))))) - (width))));
    }
  }

  function method_draw_playfield_helper(runtime: any, p: any, col: any, horz: any, COLU: any, REFPF: any) {
    const members = runtime.members;
    let PF: any = (((((((((((((members.PF0 ?? runtime.member("PF0"))) >>> (0)) & 1) << 7 | ((((members.PF0 ?? runtime.member("PF0"))) >>> (1)) & 1) << 6 | ((((members.PF0 ?? runtime.member("PF0"))) >>> (2)) & 1) << 5 | ((((members.PF0 ?? runtime.member("PF0"))) >>> (3)) & 1) << 4 | ((((members.PF0 ?? runtime.member("PF0"))) >>> (4)) & 1) << 3 | ((((members.PF0 ?? runtime.member("PF0"))) >>> (5)) & 1) << 2 | ((((members.PF0 ?? runtime.member("PF0"))) >>> (6)) & 1) << 1 | ((((members.PF0 ?? runtime.member("PF0"))) >>> (7)) & 1) << 0)) << (16))) | ((((((((members.PF1 ?? runtime.member("PF1"))) >>> (7)) & 1) << 7 | ((((members.PF1 ?? runtime.member("PF1"))) >>> (6)) & 1) << 6 | ((((members.PF1 ?? runtime.member("PF1"))) >>> (5)) & 1) << 5 | ((((members.PF1 ?? runtime.member("PF1"))) >>> (4)) & 1) << 4 | ((((members.PF1 ?? runtime.member("PF1"))) >>> (3)) & 1) << 3 | ((((members.PF1 ?? runtime.member("PF1"))) >>> (2)) & 1) << 2 | ((((members.PF1 ?? runtime.member("PF1"))) >>> (1)) & 1) << 1 | ((((members.PF1 ?? runtime.member("PF1"))) >>> (0)) & 1) << 0)) << (8))))) | ((((((((members.PF2 ?? runtime.member("PF2"))) >>> (0)) & 1) << 7 | ((((members.PF2 ?? runtime.member("PF2"))) >>> (1)) & 1) << 6 | ((((members.PF2 ?? runtime.member("PF2"))) >>> (2)) & 1) << 5 | ((((members.PF2 ?? runtime.member("PF2"))) >>> (3)) & 1) << 4 | ((((members.PF2 ?? runtime.member("PF2"))) >>> (4)) & 1) << 3 | ((((members.PF2 ?? runtime.member("PF2"))) >>> (5)) & 1) << 2 | ((((members.PF2 ?? runtime.member("PF2"))) >>> (6)) & 1) << 1 | ((((members.PF2 ?? runtime.member("PF2"))) >>> (7)) & 1) << 0)) << (0))))) >>> 0);
    let i: any = 0;
    let j: any = 0;
    if (REFPF) {
      let swap: any = ((0) >>> 0);
      for (i = 0; ((Number(i) < Number(20)) ? 1 : 0); i = ((i) + (1))) {
        swap = ((((swap) << (1))) >>> 0);
        if (((PF) & (1))) {
          swap = ((((swap) | (1))) >>> 0);
        }
        PF = ((((PF) >>> (1))) >>> 0);
      }
      PF = ((swap) >>> 0);
    }
    for (i = 0; ((Number(i) < Number(20)) ? 1 : 0); i = ((i) + (1))) {
      for (j = 0; ((Number(j) < Number(4)) ? 1 : 0); j = ((j) + (1))) {
        if (((PF) & (((524288) >>> (i))))) {
          runtime.writeIndex(p, horz, ((COLU) >>> (1)));
          runtime.writeIndex(col, horz, ((COLU) >>> (1)));
        }
        horz = ((horz) + (1));
      }
    }
  }

  function method_update_bitmap(runtime: any, next_x: any, next_y: any) {
    const members = runtime.members;
    const h_helper = members.helper ?? runtime.member("helper");
    const h_buffer = members.buffer ?? runtime.member("buffer");
    let linePF: any = new Uint8Array(Math.max(0, Number(160)));
    let lineP0: any = new Uint8Array(Math.max(0, Number(160)));
    let lineP1: any = new Uint8Array(Math.max(0, Number(160)));
    let lineM0: any = new Uint8Array(Math.max(0, Number(160)));
    let lineM1: any = new Uint8Array(Math.max(0, Number(160)));
    let lineBL: any = new Uint8Array(Math.max(0, Number(160)));
    let temp: any = new Uint8Array(Math.max(0, Number(160)));
    if ((((((Number((members.prev_y ?? runtime.member("prev_y"))) >= Number(next_y)) ? 1 : 0)) && (((Number((members.prev_x ?? runtime.member("prev_x"))) >= Number(next_x)) ? 1 : 0))) ? 1 : 0)) {
      return;
    }
    (() => { const target = linePF; const bytes = Number(((linePF)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
    (() => { const target = lineP0; const bytes = Number(((lineP0)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
    (() => { const target = lineP1; const bytes = Number(((lineP1)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
    (() => { const target = lineM0; const bytes = Number(((lineM0)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
    (() => { const target = lineM1; const bytes = Number(((lineM1)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
    (() => { const target = lineBL; const bytes = Number(((lineBL)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
    if ((((members.VBLANK ?? runtime.member("VBLANK"))) & (2))) {
      (() => { const target = temp; const bytes = Number(160); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    } else {
      (() => { const target = temp; const bytes = Number(160); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill((((members.COLUBK ?? runtime.member("COLUBK"))) >>> (1)), target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill((((members.COLUBK ?? runtime.member("COLUBK"))) >>> (1)), 0, bytes); return target; })();
      if ((((members.CTRLPF ?? runtime.member("CTRLPF"))) & (4))) {
        method_drawS1(runtime, temp, lineP1);
        method_drawM1(runtime, temp, lineM1);
        method_drawS0(runtime, temp, lineP0);
        method_drawM0(runtime, temp, lineM0);
        method_drawPF(runtime, temp, linePF);
        method_drawBL(runtime, temp, lineBL);
      } else {
        method_drawPF(runtime, temp, linePF);
        method_drawBL(runtime, temp, lineBL);
        method_drawS1(runtime, temp, lineP1);
        method_drawM1(runtime, temp, lineM1);
        method_drawS0(runtime, temp, lineP0);
        method_drawM0(runtime, temp, lineM0);
      }
    }
    for (let y: any = (members.prev_y ?? runtime.member("prev_y")); ((Number(y) <= Number(next_y)) ? 1 : 0); y = ((y) + (1))) {
      let x1: any = (members.prev_x ?? runtime.member("prev_x"));
      let x2: any = next_x;
      let colx1: any = 0;
      if (((Number(y) !== Number((members.prev_y ?? runtime.member("prev_y")))) ? 1 : 0)) {
        let redraw_line: any = 0;
        members.HMOVE_started_previous = ((-200) | 0);
        if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
          if ((((((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) >= Number(97)) ? 1 : 0)) && (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) < Number(157)) ? 1 : 0))) ? 1 : 0)) {
            members.horzP0 = ((((members.horzP0) - ((members.motclkP0 ?? runtime.member("motclkP0"))))) | 0);
            members.horzP1 = ((((members.horzP1) - ((members.motclkP1 ?? runtime.member("motclkP1"))))) | 0);
            members.horzM0 = ((((members.horzM0) - ((members.motclkM0 ?? runtime.member("motclkM0"))))) | 0);
            members.horzM1 = ((((members.horzM1) - ((members.motclkM1 ?? runtime.member("motclkM1"))))) | 0);
            members.horzBL = ((((members.horzBL) - ((members.motclkBL ?? runtime.member("motclkBL"))))) | 0);
            if (((Number((members.horzP0 ?? runtime.member("horzP0"))) < Number(0)) ? 1 : 0)) {
              members.horzP0 = ((((members.horzP0) + (160))) | 0);
            }
            if (((Number((members.horzP1 ?? runtime.member("horzP1"))) < Number(0)) ? 1 : 0)) {
              members.horzP1 = ((((members.horzP1) + (160))) | 0);
            }
            if (((Number((members.horzM0 ?? runtime.member("horzM0"))) < Number(0)) ? 1 : 0)) {
              members.horzM0 = ((((members.horzM0) + (160))) | 0);
            }
            if (((Number((members.horzM1 ?? runtime.member("horzM1"))) < Number(0)) ? 1 : 0)) {
              members.horzM1 = ((((members.horzM1) + (160))) | 0);
            }
            if (((Number((members.horzBL ?? runtime.member("horzBL"))) < Number(0)) ? 1 : 0)) {
              members.horzBL = ((((members.horzBL) + (160))) | 0);
            }
            members.HMOVE_started_previous = (((members.HMOVE_started ?? runtime.member("HMOVE_started"))) | 0);
          }
          members.HMOVE_started = ((-200) | 0);
          redraw_line = 1;
        }
        if (((Number((members.REFLECT ?? runtime.member("REFLECT"))) !== Number((((members.CTRLPF ?? runtime.member("CTRLPF"))) & (1)))) ? 1 : 0)) {
          members.REFLECT = (((((members.CTRLPF ?? runtime.member("CTRLPF"))) & (1))) & 0xff);
          redraw_line = 1;
        }
        if (((((((((((((members.startP0 ?? runtime.member("startP0"))) ? 0 : 1)) || ((((members.startP1 ?? runtime.member("startP1"))) ? 0 : 1))) ? 1 : 0)) || ((((members.startM0 ?? runtime.member("startM0"))) ? 0 : 1))) ? 1 : 0)) || ((((members.startM1 ?? runtime.member("startM1"))) ? 0 : 1))) ? 1 : 0)) {
          members.startP0 = ((1) | 0);
          members.startP1 = ((1) | 0);
          members.startM0 = ((1) | 0);
          members.startM1 = ((1) | 0);
          redraw_line = 1;
        }
        if ((members.skipclipP0 ?? runtime.member("skipclipP0"))) {
          members.skipclipP0 = ((((members.skipclipP0) - (1))) | 0);
          redraw_line = 1;
        }
        if ((members.skipclipP1 ?? runtime.member("skipclipP1"))) {
          members.skipclipP1 = ((((members.skipclipP1) - (1))) | 0);
          redraw_line = 1;
        }
        if ((members.HMP0_latch ?? runtime.member("HMP0_latch"))) {
          members.horzP0 = ((((members.horzP0) - (17))) | 0);
          if (((Number((members.horzP0 ?? runtime.member("horzP0"))) < Number(0)) ? 1 : 0)) {
            members.horzP0 = ((((members.horzP0) + (160))) | 0);
          }
          redraw_line = 1;
        }
        if ((members.HMP1_latch ?? runtime.member("HMP1_latch"))) {
          members.horzP1 = ((((members.horzP1) - (17))) | 0);
          if (((Number((members.horzP1 ?? runtime.member("horzP1"))) < Number(0)) ? 1 : 0)) {
            members.horzP1 = ((((members.horzP1) + (160))) | 0);
          }
          redraw_line = 1;
        }
        if ((members.HMM0_latch ?? runtime.member("HMM0_latch"))) {
          members.horzM0 = ((((members.horzM0) - (17))) | 0);
          if (((Number((members.horzM0 ?? runtime.member("horzM0"))) < Number(0)) ? 1 : 0)) {
            members.horzM0 = ((((members.horzM0) + (160))) | 0);
          }
          redraw_line = 1;
        }
        if ((members.HMM1_latch ?? runtime.member("HMM1_latch"))) {
          members.horzM1 = ((((members.horzM1) - (17))) | 0);
          if (((Number((members.horzM1 ?? runtime.member("horzM1"))) < Number(0)) ? 1 : 0)) {
            members.horzM1 = ((((members.horzM1) + (160))) | 0);
          }
          redraw_line = 1;
        }
        if ((members.HMBL_latch ?? runtime.member("HMBL_latch"))) {
          members.horzBL = ((((members.horzBL) - (17))) | 0);
          if (((Number((members.horzBL ?? runtime.member("horzBL"))) < Number(0)) ? 1 : 0)) {
            members.horzBL = ((((members.horzBL) + (160))) | 0);
          }
          redraw_line = 1;
        }
        if ((members.NUSIZx_changed ?? runtime.member("NUSIZx_changed"))) {
          members.NUSIZx_changed = ((0) & 0xff);
          redraw_line = 1;
        }
        if (((((members.skipM0delay ?? runtime.member("skipM0delay"))) || ((members.skipM1delay ?? runtime.member("skipM1delay")))) ? 1 : 0)) {
          members.skipM0delay = ((0) | 0);
          members.skipM1delay = ((0) | 0);
          redraw_line = 1;
        }
        if (redraw_line) {
          if ((((members.VBLANK ?? runtime.member("VBLANK"))) & (2))) {
            method_setup_pXgfx(runtime);
            (() => { const target = temp; const bytes = Number(160); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
          } else {
            (() => { const target = linePF; const bytes = Number(((linePF)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = lineP0; const bytes = Number(((lineP0)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = lineP1; const bytes = Number(((lineP1)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = lineM0; const bytes = Number(((lineM0)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = lineM1; const bytes = Number(((lineM1)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = lineBL; const bytes = Number(((lineBL)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = temp; const bytes = Number(160); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill((((members.COLUBK ?? runtime.member("COLUBK"))) >>> (1)), target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill((((members.COLUBK ?? runtime.member("COLUBK"))) >>> (1)), 0, bytes); return target; })();
            method_setup_pXgfx(runtime);
            if ((((members.CTRLPF ?? runtime.member("CTRLPF"))) & (4))) {
              method_drawS1(runtime, temp, lineP1);
              method_drawM1(runtime, temp, lineM1);
              method_drawS0(runtime, temp, lineP0);
              method_drawM0(runtime, temp, lineM0);
              method_drawPF(runtime, temp, linePF);
              method_drawBL(runtime, temp, lineBL);
            } else {
              method_drawPF(runtime, temp, linePF);
              method_drawBL(runtime, temp, lineBL);
              method_drawS1(runtime, temp, lineP1);
              method_drawM1(runtime, temp, lineM1);
              method_drawS0(runtime, temp, lineP0);
              method_drawM0(runtime, temp, lineM0);
            }
          }
        }
      }
      if ((((((Number(y) !== Number((members.prev_y ?? runtime.member("prev_y")))) ? 1 : 0)) || (((Number(x1) < Number(0)) ? 1 : 0))) ? 1 : 0)) {
        x1 = 0;
      }
      if ((((((Number(y) !== Number(next_y)) ? 1 : 0)) || (((Number(x2) > Number(160)) ? 1 : 0))) ? 1 : 0)) {
        x2 = 160;
      }
      colx1 = (((((((Number(x1) === Number(8)) ? 1 : 0)) && (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0))) ? 1 : 0)) ? (0) : (x1));
      if (method_collision_check(runtime, lineM0, lineP1, colx1, x2)) {
        members.CXM0P = ((((members.CXM0P) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineM0, lineP0, colx1, x2)) {
        members.CXM0P = ((((members.CXM0P) | (64))) & 0xff);
      }
      if (method_collision_check(runtime, lineM1, lineP0, colx1, x2)) {
        members.CXM1P = ((((members.CXM1P) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineM1, lineP1, colx1, x2)) {
        members.CXM1P = ((((members.CXM1P) | (64))) & 0xff);
      }
      if (method_collision_check(runtime, lineP0, linePF, colx1, x2)) {
        members.CXP0FB = ((((members.CXP0FB) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineP0, lineBL, colx1, x2)) {
        members.CXP0FB = ((((members.CXP0FB) | (64))) & 0xff);
      }
      if (method_collision_check(runtime, lineP1, linePF, colx1, x2)) {
        members.CXP1FB = ((((members.CXP1FB) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineP1, lineBL, colx1, x2)) {
        members.CXP1FB = ((((members.CXP1FB) | (64))) & 0xff);
      }
      if (method_collision_check(runtime, lineM0, linePF, colx1, x2)) {
        members.CXM0FB = ((((members.CXM0FB) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineM0, lineBL, colx1, x2)) {
        members.CXM0FB = ((((members.CXM0FB) | (64))) & 0xff);
      }
      if (method_collision_check(runtime, lineM1, linePF, colx1, x2)) {
        members.CXM1FB = ((((members.CXM1FB) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineM1, lineBL, colx1, x2)) {
        members.CXM1FB = ((((members.CXM1FB) | (64))) & 0xff);
      }
      if (method_collision_check(runtime, lineBL, linePF, colx1, x2)) {
        members.CXBLPF = ((((members.CXBLPF) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineP0, lineP1, colx1, x2)) {
        members.CXPPMM = ((((members.CXPPMM) | (128))) & 0xff);
      }
      if (method_collision_check(runtime, lineM0, lineM1, colx1, x2)) {
        members.CXPPMM = ((((members.CXPPMM) | (64))) & 0xff);
      }
      let p: any = runtime.readIndex(h_helper, (members.current_bitmap ?? runtime.member("current_bitmap")))["pix&"](((y) % ((members.screen_height ?? runtime.member("screen_height")))), 34);
      for (let x: any = x1; ((Number(x) < Number(x2)) ? 1 : 0); x = ((x) + (1))) {
        runtime.writeIndex(p, x, runtime.readIndex(temp, x));
      }
      if ((((((Number(x2) === Number(160)) ? 1 : 0)) && (((Number(((y) % ((members.screen_height ?? runtime.member("screen_height"))))) === Number((((members.screen_height ?? runtime.member("screen_height"))) - (1)))) ? 1 : 0))) ? 1 : 0)) {
        for (let t_y: any = 0; ((Number(t_y) < Number((typeof (runtime.dereference(h_buffer)).height === 'function' ? (runtime.dereference(h_buffer)).height() : typeof (runtime.dereference(h_buffer)).height === 'number' || typeof (runtime.dereference(h_buffer)).height === 'boolean' ? (runtime.dereference(h_buffer)).height : runtime.container(h_buffer, "height")))) ? 1 : 0); t_y = ((t_y) + (1))) {
          let l0: any = runtime.readIndex(h_helper, (members.current_bitmap ?? runtime.member("current_bitmap")))["pix&"](t_y);
          let l1: any = runtime.readIndex(h_helper, ((1) - ((members.current_bitmap ?? runtime.member("current_bitmap")))))["pix&"](t_y);
          let l2: any = h_buffer["pix&"](t_y);
          let t_x: any = 0;
          for (t_x = 0; ((Number(t_x) < Number((typeof (runtime.dereference(h_buffer)).width === 'function' ? (runtime.dereference(h_buffer)).width() : typeof (runtime.dereference(h_buffer)).width === 'number' || typeof (runtime.dereference(h_buffer)).width === 'boolean' ? (runtime.dereference(h_buffer)).width : runtime.container(h_buffer, "width")))) ? 1 : 0); t_x = ((t_x) + (1))) {
            if (((Number(runtime.readIndex(l0, t_x)) !== Number(runtime.readIndex(l1, t_x))) ? 1 : 0)) {
              runtime.writeIndex(l2, t_x, (runtime.calls["pen"] ? runtime.calls["pen"](((((runtime.add(runtime.readIndex(l0, t_x), 1)) << (7))) | (runtime.readIndex(l1, t_x)))) : runtime.macro("pen", ((((runtime.add(runtime.readIndex(l0, t_x), 1)) << (7))) | (runtime.readIndex(l1, t_x))))));
            } else {
              runtime.writeIndex(l2, t_x, (runtime.calls["pen"] ? runtime.calls["pen"](runtime.readIndex(l0, t_x)) : runtime.macro("pen", runtime.readIndex(l0, t_x))));
            }
          }
        }
        members.current_bitmap = ((((members.current_bitmap) ^ (1))) | 0);
      }
    }
    members.prev_x = ((next_x) | 0);
    members.prev_y = ((next_y) | 0);
  }

  function method_drawS1(runtime: any, p: any, col: any) {
    const members = runtime.members;
    const h_p1gfx = members.p1gfx ?? runtime.member("p1gfx");
    method_draw_sprite_helper(runtime, p, col, h_p1gfx, (((((members.VDELP1 ?? runtime.member("VDELP1"))) & (1))) ? ((members.prevGRP1 ?? runtime.member("prevGRP1"))) : ((members.GRP1 ?? runtime.member("GRP1")))), (members.COLUP1 ?? runtime.member("COLUP1")), (members.REFP1 ?? runtime.member("REFP1")));
  }

  function method_drawM1(runtime: any, p: any, col: any) {
    const members = runtime.members;
    method_draw_missile_helper(runtime, p, col, (members.horzM1 ?? runtime.member("horzM1")), (members.skipM1delay ?? runtime.member("skipM1delay")), (members.HMM1_latch ?? runtime.member("HMM1_latch")), (members.startM1 ?? runtime.member("startM1")), (members.RESMP1 ?? runtime.member("RESMP1")), (members.ENAM1 ?? runtime.member("ENAM1")), (members.NUSIZ1 ?? runtime.member("NUSIZ1")), (members.COLUP1 ?? runtime.member("COLUP1")));
  }

  function method_drawS0(runtime: any, p: any, col: any) {
    const members = runtime.members;
    const h_p0gfx = members.p0gfx ?? runtime.member("p0gfx");
    method_draw_sprite_helper(runtime, p, col, h_p0gfx, (((((members.VDELP0 ?? runtime.member("VDELP0"))) & (1))) ? ((members.prevGRP0 ?? runtime.member("prevGRP0"))) : ((members.GRP0 ?? runtime.member("GRP0")))), (members.COLUP0 ?? runtime.member("COLUP0")), (members.REFP0 ?? runtime.member("REFP0")));
  }

  function method_drawM0(runtime: any, p: any, col: any) {
    const members = runtime.members;
    method_draw_missile_helper(runtime, p, col, (members.horzM0 ?? runtime.member("horzM0")), (members.skipM0delay ?? runtime.member("skipM0delay")), (members.HMM0_latch ?? runtime.member("HMM0_latch")), (members.startM0 ?? runtime.member("startM0")), (members.RESMP0 ?? runtime.member("RESMP0")), (members.ENAM0 ?? runtime.member("ENAM0")), (members.NUSIZ0 ?? runtime.member("NUSIZ0")), (members.COLUP0 ?? runtime.member("COLUP0")));
  }

  function method_drawPF(runtime: any, p: any, col: any) {
    const members = runtime.members;
    method_draw_playfield_helper(runtime, p, col, 0, ((((Number((((members.CTRLPF ?? runtime.member("CTRLPF"))) & (6))) === Number(2)) ? 1 : 0)) ? ((members.COLUP0 ?? runtime.member("COLUP0"))) : ((members.COLUPF ?? runtime.member("COLUPF")))), 0);
    method_draw_playfield_helper(runtime, p, col, 80, ((((Number((((members.CTRLPF ?? runtime.member("CTRLPF"))) & (6))) === Number(2)) ? 1 : 0)) ? ((members.COLUP1 ?? runtime.member("COLUP1"))) : ((members.COLUPF ?? runtime.member("COLUPF")))), (members.REFLECT ?? runtime.member("REFLECT")));
  }

  function method_drawBL(runtime: any, p: any, col: any) {
    const members = runtime.members;
    method_draw_ball_helper(runtime, p, col, (members.horzBL ?? runtime.member("horzBL")), (((((members.VDELBL ?? runtime.member("VDELBL"))) & (1))) ? ((members.prevENABL ?? runtime.member("prevENABL"))) : ((members.ENABL ?? runtime.member("ENABL")))));
  }

  function method_draw_ball_helper(runtime: any, p: any, col: any, horz: any, ENAB: any) {
    const members = runtime.members;
    let width: any = ((1) << ((((((members.CTRLPF ?? runtime.member("CTRLPF"))) >>> (4))) & (3))));
    let i: any = 0;
    for (i = 0; ((Number(i) < Number(width)) ? 1 : 0); i = ((i) + (1))) {
      if (((ENAB) & (2))) {
        runtime.writeIndex(p, ((horz) % (160)), (((members.COLUPF ?? runtime.member("COLUPF"))) >>> (1)));
        runtime.writeIndex(col, ((horz) % (160)), (((members.COLUPF ?? runtime.member("COLUPF"))) >>> (1)));
      }
      horz = ((horz) + (1));
    }
  }

  function method_setup_pXgfx(runtime: any) {
    const members = runtime.members;
    const h_p0gfx = members.p0gfx ?? runtime.member("p0gfx");
    const h_p1gfx = members.p1gfx ?? runtime.member("p1gfx");
    let i: any = 0;
    for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
      if ((((((Number(i) < Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0)) && (((Number(i) >= Number((((members.startP0 ?? runtime.member("startP0"))) ? (0) : (1)))) ? 1 : 0))) ? 1 : 0)) {
        h_p0gfx.size[i] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
        if (i) {
          h_p0gfx.start_drawing[i] = ((runtime.add((((members.horzP0 ?? runtime.member("horzP0"))) + (((((Number(h_p0gfx.size[i]) > Number(1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * (((([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p0gfx.size[i])))))) % (160));
          h_p0gfx.skipclip[i] = 0;
        } else {
          h_p0gfx.start_drawing[i] = (((members.horzP0 ?? runtime.member("horzP0"))) + (((((Number(h_p0gfx.size[i]) > Number(1)) ? 1 : 0)) ? (1) : (0))));
          h_p0gfx.skipclip[i] = (members.skipclipP0 ?? runtime.member("skipclipP0"));
        }
        h_p0gfx.start_pixel[i] = 0;
      } else {
        h_p0gfx.start_pixel[i] = 8;
      }
      if ((((((Number(i) < Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0)) && (((Number(i) >= Number((((members.startP1 ?? runtime.member("startP1"))) ? (0) : (1)))) ? 1 : 0))) ? 1 : 0)) {
        h_p1gfx.size[i] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
        if (i) {
          h_p1gfx.start_drawing[i] = ((runtime.add((((members.horzP1 ?? runtime.member("horzP1"))) + (((((Number(h_p1gfx.size[i]) > Number(1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * (((([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p1gfx.size[i])))))) % (160));
          h_p1gfx.skipclip[i] = 0;
        } else {
          h_p1gfx.start_drawing[i] = (((members.horzP1 ?? runtime.member("horzP1"))) + (((((Number(h_p1gfx.size[i]) > Number(1)) ? 1 : 0)) ? (1) : (0))));
          h_p1gfx.skipclip[i] = (members.skipclipP1 ?? runtime.member("skipclipP1"));
        }
        h_p1gfx.start_pixel[i] = 0;
      } else {
        h_p1gfx.start_pixel[i] = 8;
      }
    }
  }

  function method_collision_check(runtime: any, p1: any, p2: any, x1: any, x2: any) {
    const members = runtime.members;
    let i: any = 0;
    for (i = x1; ((Number(i) < Number(x2)) ? 1 : 0); i = ((i) + (1))) {
      if ((((((Number(runtime.readIndex(p1, i)) !== Number(255)) ? 1 : 0)) && (((Number(runtime.readIndex(p2, i)) !== Number(255)) ? 1 : 0))) ? 1 : 0)) {
        return 1;
      }
    }
    return 0;
  }

  function method_NUSIZ0_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_p0gfx = members.p0gfx ?? runtime.member("p0gfx");
    let curr_x: any = method_current_x(runtime);
    if (((Number(((data) & (7))) !== Number((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7)))) ? 1 : 0)) {
      let i: any = 0;
      for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
        if (((Number(h_p0gfx.start_pixel[i]) < Number(8)) ? 1 : 0)) {
          let min_x: any = h_p0gfx.start_drawing[i];
          let size: any = ((((8) - (h_p0gfx.start_pixel[i]))) * (h_p0gfx.size[i]));
          if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
            if ((((((Number(curr_x) >= Number(((min_x) % (160)))) ? 1 : 0)) || (((Number(h_p0gfx.start_pixel[i]) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
              if ((((((Number(h_p0gfx.size[i]) === Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                let delay: any = runtime.add(1, ((((h_p0gfx.start_pixel[i]) + (((curr_x) - (h_p0gfx.start_drawing[i]))))) & (1)));
                method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (((((curr_x) + (delay))) - (h_p0gfx.start_drawing[i]))));
                if (((Number(h_p0gfx.start_pixel[i]) > Number(8)) ? 1 : 0)) {
                  h_p0gfx.start_pixel[i] = 8;
                }
                h_p0gfx.start_drawing[i] = ((curr_x) + (delay));
              } else {
                if ((((((Number(h_p0gfx.size[1]) > Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                  let delay: any = ((((curr_x) - (h_p0gfx.start_drawing[i]))) & (((h_p0gfx.size[i]) - (1))));
                  if (delay) {
                    delay = ((h_p0gfx.size[i]) - (delay));
                  }
                  method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                  h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p0gfx.start_drawing[i])), h_p0gfx.size[i])));
                  h_p0gfx.start_drawing[i] = ((curr_x) + (delay));
                } else {
                  h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p0gfx.start_drawing[i])), h_p0gfx.size[i])));
                  h_p0gfx.start_drawing[i] = curr_x;
                }
              }
              h_p0gfx.size[i] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
            } else {
              if ((((((Number(h_p0gfx.size[i]) === Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                if (((Number(((h_p0gfx.start_drawing[i]) - (curr_x))) === Number(2)) ? 1 : 0)) {
                  h_p0gfx.start_drawing[i] = ((h_p0gfx.start_drawing[i]) - (1));
                } else {
                  h_p0gfx.start_drawing[i] = ((h_p0gfx.start_drawing[i]) + (1));
                }
              } else {
                if ((((((Number(h_p0gfx.size[i]) > Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                  h_p0gfx.start_drawing[i] = ((h_p0gfx.start_drawing[i]) - (1));
                }
              }
              h_p0gfx.size[i] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
            }
          } else {
            h_p0gfx.start_pixel[i] = 8;
          }
        }
      }
      for (i = (((members.startP0 ?? runtime.member("startP0"))) ? (0) : (1)); ((Number(i) < Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((i) + (1))) {
        let j: any = 0;
        for (j = 0; ((Number(j) < Number(4)) ? 1 : 0); j = ((j) + (1))) {
          if (((Number(h_p0gfx.start_pixel[j]) === Number(8)) ? 1 : 0)) {
            break;
          }
        }
        h_p0gfx.size[j] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
        h_p0gfx.start_drawing[j] = ((runtime.add((((members.horzP0 ?? runtime.member("horzP0"))) + (((((Number(h_p0gfx.size[j]) > Number(1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * (((([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p0gfx.size[j])))))) % (160));
        if (((Number(curr_x) < Number(((h_p0gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
          h_p0gfx.start_pixel[j] = 0;
        }
      }
      members.NUSIZx_changed = ((1) & 0xff);
    }
    members.NUSIZ0 = ((data) & 0xff);
  }

  function method_current_x(runtime: any) {
    const members = runtime.members;
    return ((((3) * ((((((typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'function' ? (runtime.dereference(members.m_maincpu)).total_cycles() : typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'number' || typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'boolean' ? (runtime.dereference(members.m_maincpu)).total_cycles : runtime.container(members.m_maincpu, "total_cycles"))) - ((members.frame_cycles ?? runtime.member("frame_cycles"))))) % (76))))) - (68));
  }

  function method_current_y(runtime: any) {
    const members = runtime.members;
    return runtime.divide((((typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'function' ? (runtime.dereference(members.m_maincpu)).total_cycles() : typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'number' || typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'boolean' ? (runtime.dereference(members.m_maincpu)).total_cycles : runtime.container(members.m_maincpu, "total_cycles"))) - ((members.frame_cycles ?? runtime.member("frame_cycles")))), 76);
  }

  function method_NUSIZ1_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_p1gfx = members.p1gfx ?? runtime.member("p1gfx");
    const h_p0gfx = members.p0gfx ?? runtime.member("p0gfx");
    let curr_x: any = method_current_x(runtime);
    if (((Number(((data) & (7))) !== Number((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7)))) ? 1 : 0)) {
      let i: any = 0;
      for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
        if (((Number(h_p1gfx.start_pixel[i]) < Number(8)) ? 1 : 0)) {
          let min_x: any = h_p1gfx.start_drawing[i];
          let size: any = ((((8) - (h_p1gfx.start_pixel[i]))) * (h_p1gfx.size[i]));
          if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
            if ((((((Number(curr_x) >= Number(((min_x) % (160)))) ? 1 : 0)) || (((Number(h_p1gfx.start_pixel[i]) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
              if ((((((Number(h_p1gfx.size[i]) === Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                let delay: any = runtime.add(1, ((((h_p0gfx.start_pixel[i]) + (((curr_x) - (h_p0gfx.start_drawing[i]))))) & (1)));
                method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (((((curr_x) + (delay))) - (h_p1gfx.start_drawing[i]))));
                if (((Number(h_p1gfx.start_pixel[i]) > Number(8)) ? 1 : 0)) {
                  h_p1gfx.start_pixel[i] = 8;
                }
                h_p1gfx.start_drawing[i] = ((curr_x) + (delay));
              } else {
                if ((((((Number(h_p1gfx.size[1]) > Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                  let delay: any = ((((curr_x) - (h_p1gfx.start_drawing[i]))) & (((h_p1gfx.size[i]) - (1))));
                  if (delay) {
                    delay = ((h_p1gfx.size[i]) - (delay));
                  }
                  method_update_bitmap(runtime, ((curr_x) + (delay)), method_current_y(runtime));
                  h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p1gfx.start_drawing[i])), h_p1gfx.size[i])));
                  h_p1gfx.start_drawing[i] = ((curr_x) + (delay));
                } else {
                  h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p1gfx.start_drawing[i])), h_p1gfx.size[i])));
                  h_p1gfx.start_drawing[i] = curr_x;
                }
              }
              h_p1gfx.size[i] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
            } else {
              if ((((((Number(h_p1gfx.size[i]) === Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0))) ? 1 : 0)) {
                if (((Number(((h_p1gfx.start_drawing[i]) - (curr_x))) === Number(2)) ? 1 : 0)) {
                  h_p1gfx.start_drawing[i] = ((h_p1gfx.start_drawing[i]) - (1));
                } else {
                  h_p1gfx.start_drawing[i] = ((h_p1gfx.start_drawing[i]) + (1));
                }
              } else {
                if ((((((Number(h_p1gfx.size[i]) > Number(1)) ? 1 : 0)) && (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                  h_p1gfx.start_drawing[i] = ((h_p1gfx.start_drawing[i]) - (1));
                }
              }
              h_p1gfx.size[i] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
            }
          } else {
            h_p1gfx.start_pixel[i] = 8;
          }
        }
      }
      for (i = (((members.startP1 ?? runtime.member("startP1"))) ? (0) : (1)); ((Number(i) < Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((i) + (1))) {
        let j: any = 0;
        for (j = 0; ((Number(j) < Number(4)) ? 1 : 0); j = ((j) + (1))) {
          if (((Number(h_p1gfx.start_pixel[j]) === Number(8)) ? 1 : 0)) {
            break;
          }
        }
        h_p1gfx.size[j] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
        h_p1gfx.start_drawing[j] = ((runtime.add((((members.horzP1 ?? runtime.member("horzP1"))) + (((((Number(h_p1gfx.size[j]) > Number(1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * (((([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add(((((data) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p1gfx.size[j])))))) % (160));
        if (((Number(curr_x) < Number(((h_p1gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
          h_p1gfx.start_pixel[j] = 0;
        }
      }
      members.NUSIZx_changed = ((1) & 0xff);
    }
    members.NUSIZ1 = ((data) & 0xff);
  }

  function method_RESP0_w(runtime: any) {
    const members = runtime.members;
    const h_p0gfx = members.p0gfx ?? runtime.member("p0gfx");
    let curr_x: any = method_current_x(runtime);
    let new_horzP0: any = 0;
    if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
      new_horzP0 = ((((Number(curr_x) < Number(7)) ? 1 : 0)) ? (3) : (((curr_x) + (5))));
      if (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7)))) ? 1 : 0)) {
        let decrements_passed: any = runtime.divide(((curr_x) - ((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (4)))), 4);
        new_horzP0 = ((new_horzP0) + (8));
        if (((Number((((members.motclkP0 ?? runtime.member("motclkP0"))) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
          new_horzP0 = ((new_horzP0) - ((((members.motclkP0 ?? runtime.member("motclkP0"))) - (decrements_passed))));
          if (((Number(new_horzP0) < Number(0)) ? 1 : 0)) {
            new_horzP0 = ((new_horzP0) + (160));
          }
        }
      }
    } else {
      new_horzP0 = ((((Number(curr_x) < Number((-2))) ? 1 : 0)) ? (3) : (((curr_x) + (5))));
      if (((Number((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) !== Number(-200)) ? 1 : 0)) {
        let motclk: any = (((((((members.HMP0 ?? runtime.member("HMP0"))) ^ (128))) >>> (4))) & 0xff);
        if (((Number(curr_x) <= Number(runtime.add(runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
          let motclk_passed: any = ((runtime.divide(((curr_x) - (runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 6))), 4)) & 0xff);
          new_horzP0 = ((new_horzP0) - (((motclk) - (motclk_passed))));
        }
      }
    }
    if (((Number(new_horzP0) !== Number((members.horzP0 ?? runtime.member("horzP0")))) ? 1 : 0)) {
      let i: any = 0;
      members.horzP0 = ((new_horzP0) | 0);
      members.startP0 = ((0) | 0);
      members.skipclipP0 = ((2) | 0);
      for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
        if (((Number(h_p0gfx.start_pixel[i]) < Number(8)) ? 1 : 0)) {
          let min_x: any = h_p0gfx.start_drawing[i];
          let size: any = ((((8) - (h_p0gfx.start_pixel[i]))) * (h_p0gfx.size[i]));
          if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
            if (((Number(curr_x) >= Number(min_x)) ? 1 : 0)) {
              h_p0gfx.start_pixel[i] = ((h_p0gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p0gfx.start_drawing[i])), h_p0gfx.size[i])));
              h_p0gfx.start_drawing[i] = curr_x;
            } else {
              h_p0gfx.start_drawing[i] = (members.horzP0 ?? runtime.member("horzP0"));
            }
          } else {
            h_p0gfx.start_pixel[i] = 8;
          }
        }
      }
      for (i = 1; ((Number(i) < Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((i) + (1))) {
        let j: any = 0;
        for (j = 0; ((Number(j) < Number(4)) ? 1 : 0); j = ((j) + (1))) {
          if (((Number(h_p0gfx.start_pixel[j]) === Number(8)) ? 1 : 0)) {
            break;
          }
        }
        h_p0gfx.size[j] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
        h_p0gfx.start_drawing[j] = ((runtime.add((((members.horzP0 ?? runtime.member("horzP0"))) + (((((Number(h_p0gfx.size[j]) > Number(1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * (((([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p0gfx.size[j])))))) % (160));
        if (((Number(curr_x) < Number(((h_p0gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
          h_p0gfx.start_pixel[j] = 0;
        }
      }
    }
  }

  function method_RESP1_w(runtime: any) {
    const members = runtime.members;
    const h_p1gfx = members.p1gfx ?? runtime.member("p1gfx");
    let curr_x: any = method_current_x(runtime);
    let new_horzP1: any = 0;
    if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
      new_horzP1 = ((((Number(curr_x) < Number(7)) ? 1 : 0)) ? (3) : (((curr_x) + (5))));
      if (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7)))) ? 1 : 0)) {
        let decrements_passed: any = runtime.divide(((curr_x) - ((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (4)))), 4);
        new_horzP1 = ((new_horzP1) + (8));
        if (((Number((((members.motclkP1 ?? runtime.member("motclkP1"))) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
          new_horzP1 = ((new_horzP1) - ((((members.motclkP1 ?? runtime.member("motclkP1"))) - (decrements_passed))));
          if (((Number(new_horzP1) < Number(0)) ? 1 : 0)) {
            new_horzP1 = ((new_horzP1) + (160));
          }
        }
      }
    } else {
      new_horzP1 = ((((Number(curr_x) < Number((-2))) ? 1 : 0)) ? (3) : (((curr_x) + (5))));
      if (((Number((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) !== Number(-200)) ? 1 : 0)) {
        let motclk: any = (((((((members.HMP1 ?? runtime.member("HMP1"))) ^ (128))) >>> (4))) & 0xff);
        if (((Number(curr_x) <= Number(runtime.add(runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
          let motclk_passed: any = ((runtime.divide(((curr_x) - (runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 6))), 4)) & 0xff);
          new_horzP1 = ((new_horzP1) - (((motclk) - (motclk_passed))));
        }
      }
    }
    if (((Number(new_horzP1) !== Number((members.horzP1 ?? runtime.member("horzP1")))) ? 1 : 0)) {
      let i: any = 0;
      members.horzP1 = ((new_horzP1) | 0);
      members.startP1 = ((0) | 0);
      members.skipclipP1 = ((2) | 0);
      for (i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
        if (((Number(h_p1gfx.start_pixel[i]) < Number(8)) ? 1 : 0)) {
          let min_x: any = h_p1gfx.start_drawing[i];
          let size: any = ((((8) - (h_p1gfx.start_pixel[i]))) * (h_p1gfx.size[i]));
          if ((((((Number(curr_x) >= Number(((((min_x) - (5))) % (160)))) ? 1 : 0)) && (((Number(curr_x) < Number(((((min_x) + (size))) % (160)))) ? 1 : 0))) ? 1 : 0)) {
            if (((Number(curr_x) >= Number(min_x)) ? 1 : 0)) {
              h_p1gfx.start_pixel[i] = ((h_p1gfx.start_pixel[i]) + (runtime.divide(((curr_x) - (h_p1gfx.start_drawing[i])), h_p1gfx.size[i])));
              h_p1gfx.start_drawing[i] = curr_x;
            } else {
              h_p1gfx.start_drawing[i] = (members.horzP1 ?? runtime.member("horzP1"));
            }
          } else {
            h_p1gfx.start_pixel[i] = 8;
          }
        }
      }
      for (i = 1; ((Number(i) < Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 0)) % 24) + 24) % 24] ?? 0))) ? 1 : 0); i = ((i) + (1))) {
        let j: any = 0;
        for (j = 0; ((Number(j) < Number(4)) ? 1 : 0); j = ((j) + (1))) {
          if (((Number(h_p1gfx.start_pixel[j]) === Number(8)) ? 1 : 0)) {
            break;
          }
        }
        h_p1gfx.size[j] = ([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0);
        h_p1gfx.start_drawing[j] = ((runtime.add((((members.horzP1 ?? runtime.member("horzP1"))) + (((((Number(h_p1gfx.size[j]) > Number(1)) ? 1 : 0)) ? (1) : (0)))), ((((i) * (8))) * (((([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 2)) % 24) + 24) % 24] ?? 0)) + (h_p1gfx.size[j])))))) % (160));
        if (((Number(curr_x) < Number(((h_p1gfx.start_drawing[j]) % (160)))) ? 1 : 0)) {
          h_p1gfx.start_pixel[j] = 0;
        }
      }
    }
  }

  function method_INPT_r(runtime: any, offset: any) {
    const members = runtime.members;
    let elapsed: any = (((typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'function' ? (runtime.dereference(members.m_maincpu)).total_cycles() : typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'number' || typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'boolean' ? (runtime.dereference(members.m_maincpu)).total_cycles : runtime.container(members.m_maincpu, "total_cycles"))) - ((members.paddle_start ?? runtime.member("paddle_start"))));
    let input: any = ((runtime.invoke("m_read_input_port_cb", ((offset) & (3)), 65535)) & 0xffff);
    if (((Number(input) === Number(0)) ? 1 : 0)) {
      return 128;
    }
    if (((Number(input) === Number(255)) ? 1 : 0)) {
      return 0;
    }
    let paddle_cycles: any = ((((input) * (76))) & 0xffff);
    return ((((Number(elapsed) > Number(paddle_cycles)) ? 1 : 0)) ? (128) : (0));
  }

  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    let data: any = ((((offset) & (63))) & 0xff);
    if ((((typeof (runtime.dereference(members.m_databus_contents_cb)).isunset === 'function' ? (runtime.dereference(members.m_databus_contents_cb)).isunset() : typeof (runtime.dereference(members.m_databus_contents_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_databus_contents_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_databus_contents_cb)).isunset : runtime.container(members.m_databus_contents_cb, "isunset"))) ? 0 : 1)) {
      data = ((((runtime.invoke("m_databus_contents_cb", offset)) & (63))) & 0xff);
    }
    if (((((offset) & (8))) ? 0 : 1)) {
      method_update_bitmap(runtime, method_current_x(runtime), method_current_y(runtime));
    }
    switch (((offset) & (15))) {
      case 0:
      {
        return ((data) | ((members.CXM0P ?? runtime.member("CXM0P"))));
      }
      case 1:
      {
        return ((data) | ((members.CXM1P ?? runtime.member("CXM1P"))));
      }
      case 2:
      {
        return ((data) | ((members.CXP0FB ?? runtime.member("CXP0FB"))));
      }
      case 3:
      {
        return ((data) | ((members.CXP1FB ?? runtime.member("CXP1FB"))));
      }
      case 4:
      {
        return ((data) | ((members.CXM0FB ?? runtime.member("CXM0FB"))));
      }
      case 5:
      {
        return ((data) | ((members.CXM1FB ?? runtime.member("CXM1FB"))));
      }
      case 6:
      {
        return ((data) | ((members.CXBLPF ?? runtime.member("CXBLPF"))));
      }
      case 7:
      {
        return ((data) | ((members.CXPPMM ?? runtime.member("CXPPMM"))));
      }
      case 8:
      {
        return ((data) | (method_INPT_r(runtime, 0)));
      }
      case 9:
      {
        return ((data) | (method_INPT_r(runtime, 1)));
      }
      case 10:
      {
        return ((data) | (method_INPT_r(runtime, 2)));
      }
      case 11:
      {
        return ((data) | (method_INPT_r(runtime, 3)));
      }
      case 12:
      {
        let button: any = (((((typeof (runtime.dereference(members.m_read_input_port_cb)).isunset === 'function' ? (runtime.dereference(members.m_read_input_port_cb)).isunset() : typeof (runtime.dereference(members.m_read_input_port_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_read_input_port_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_read_input_port_cb)).isunset : runtime.container(members.m_read_input_port_cb, "isunset"))) ? 0 : 1)) ? (((runtime.invoke("m_read_input_port_cb", 4, 65535)) & (128))) : (128));
        members.INPT4 = (((((((members.VBLANK ?? runtime.member("VBLANK"))) & (64))) ? ((((members.INPT4 ?? runtime.member("INPT4"))) & (button))) : (button))) & 0xff);
        return ((data) | ((members.INPT4 ?? runtime.member("INPT4"))));
      }
      case 13:
      {
        let button: any = (((((typeof (runtime.dereference(members.m_read_input_port_cb)).isunset === 'function' ? (runtime.dereference(members.m_read_input_port_cb)).isunset() : typeof (runtime.dereference(members.m_read_input_port_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_read_input_port_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_read_input_port_cb)).isunset : runtime.container(members.m_read_input_port_cb, "isunset"))) ? 0 : 1)) ? (((runtime.invoke("m_read_input_port_cb", 5, 65535)) & (128))) : (128));
        members.INPT5 = (((((((members.VBLANK ?? runtime.member("VBLANK"))) & (64))) ? ((((members.INPT5 ?? runtime.member("INPT5"))) & (button))) : (button))) & 0xff);
        return ((data) | ((members.INPT5 ?? runtime.member("INPT5"))));
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    let curr_y: any = method_current_y(runtime);
    offset = runtime.andAssign(offset, 63);
    if ((((((Number(offset) >= Number(13)) ? 1 : 0)) && (((Number(offset) <= Number(15)) ? 1 : 0))) ? 1 : 0)) {
      curr_x = ((((curr_x) + (1))) & ((~3)));
    }
    if (((Number(([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 0, 0, 0, 0, 0, (-1), (-1), (-1), (-1), (-1), (-1), 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0][(((offset) % 45) + 45) % 45] ?? 0)) >= Number(0)) ? 1 : 0)) {
      method_update_bitmap(runtime, ((curr_x) + (([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 0, 0, 0, 0, 0, (-1), (-1), (-1), (-1), (-1), (-1), 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0][(((offset) % 45) + 45) % 45] ?? 0))), curr_y);
    }
    switch (offset) {
      case 0:
      {
        method_VSYNC_w(runtime, data);
        break;
      }
      case 1:
      {
        method_VBLANK_w(runtime, data);
        break;
      }
      case 2:
      {
        method_WSYNC_w(runtime);
        break;
      }
      case 3:
      {
        method_RSYNC_w(runtime);
        break;
      }
      case 4:
      {
        method_NUSIZ0_w(runtime, data);
        break;
      }
      case 5:
      {
        method_NUSIZ1_w(runtime, data);
        break;
      }
      case 6:
      {
        members.COLUP0 = ((data) & 0xff);
        break;
      }
      case 7:
      {
        members.COLUP1 = ((data) & 0xff);
        break;
      }
      case 8:
      {
        members.COLUPF = ((data) & 0xff);
        break;
      }
      case 9:
      {
        members.COLUBK = ((data) & 0xff);
        break;
      }
      case 10:
      {
        method_CTRLPF_w(runtime, data);
        break;
      }
      case 11:
      {
        members.REFP0 = ((data) & 0xff);
        break;
      }
      case 12:
      {
        members.REFP1 = ((data) & 0xff);
        break;
      }
      case 13:
      {
        members.PF0 = ((data) & 0xff);
        break;
      }
      case 14:
      {
        members.PF1 = ((data) & 0xff);
        break;
      }
      case 15:
      {
        members.PF2 = ((data) & 0xff);
        break;
      }
      case 16:
      {
        method_RESP0_w(runtime);
        break;
      }
      case 17:
      {
        method_RESP1_w(runtime);
        break;
      }
      case 18:
      {
        method_RESM0_w(runtime);
        break;
      }
      case 19:
      {
        method_RESM1_w(runtime);
        break;
      }
      case 20:
      {
        method_RESBL_w(runtime);
        break;
      }
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      {
        ((runtime.dereference(members.m_tia)).tia_sound_w?.(offset, data) ?? 0);
        break;
      }
      case 27:
      {
        method_GRP0_w(runtime, data);
        break;
      }
      case 28:
      {
        method_GRP1_w(runtime, data);
        break;
      }
      case 29:
      {
        members.ENAM0 = ((data) & 0xff);
        break;
      }
      case 30:
      {
        members.ENAM1 = ((data) & 0xff);
        break;
      }
      case 31:
      {
        members.ENABL = ((data) & 0xff);
        break;
      }
      case 32:
      {
        method_HMP0_w(runtime, data);
        break;
      }
      case 33:
      {
        method_HMP1_w(runtime, data);
        break;
      }
      case 34:
      {
        method_HMM0_w(runtime, data);
        break;
      }
      case 35:
      {
        method_HMM1_w(runtime, data);
        break;
      }
      case 36:
      {
        method_HMBL_w(runtime, data);
        break;
      }
      case 37:
      {
        members.VDELP0 = ((data) & 0xff);
        break;
      }
      case 38:
      {
        members.VDELP1 = ((data) & 0xff);
        break;
      }
      case 39:
      {
        members.VDELBL = ((data) & 0xff);
        break;
      }
      case 40:
      {
        method_RESMP0_w(runtime, data);
        break;
      }
      case 41:
      {
        method_RESMP1_w(runtime, data);
        break;
      }
      case 42:
      {
        method_HMOVE_w(runtime, data);
        break;
      }
      case 43:
      {
        method_HMCLR_w(runtime, data);
        break;
      }
      case 44:
      {
        method_CXCLR_w(runtime);
        break;
      }
    }
  }

  function method_VSYNC_w(runtime: any, data: any) {
    const members = runtime.members;
    if (((data) & (2))) {
      if ((((((members.VSYNC ?? runtime.member("VSYNC"))) & (2))) ? 0 : 1)) {
        let curr_y: any = method_current_y(runtime);
        if (((Number(curr_y) > Number(5)) ? 1 : 0)) {
          method_update_bitmap(runtime, (runtime.calls["screen().width"]?.() ?? 0), (runtime.calls["screen().height"]?.() ?? 0));
        }
        runtime.invoke("m_vsync_cb", 0, curr_y, 65535);
        members.prev_y = ((0) | 0);
        members.prev_x = ((0) | 0);
        members.frame_cycles = ((members.frame_cycles) + (((76) * (method_current_y(runtime)))));
      }
    }
    members.VSYNC = ((data) & 0xff);
  }

  function method_VBLANK_w(runtime: any, data: any) {
    const members = runtime.members;
    if (((data) & (128))) {
      members.paddle_start = (typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'function' ? (runtime.dereference(members.m_maincpu)).total_cycles() : typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'number' || typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'boolean' ? (runtime.dereference(members.m_maincpu)).total_cycles : runtime.container(members.m_maincpu, "total_cycles"));
    }
    if ((((((members.VBLANK ?? runtime.member("VBLANK"))) & (64))) ? 0 : 1)) {
      members.INPT4 = ((128) & 0xff);
      members.INPT5 = ((128) & 0xff);
    }
    members.VBLANK = ((data) & 0xff);
  }

  function method_WSYNC_w(runtime: any) {
    const members = runtime.members;
    let cycles: any = (((typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'function' ? (runtime.dereference(members.m_maincpu)).total_cycles() : typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'number' || typeof (runtime.dereference(members.m_maincpu)).total_cycles === 'boolean' ? (runtime.dereference(members.m_maincpu)).total_cycles : runtime.container(members.m_maincpu, "total_cycles"))) - ((members.frame_cycles ?? runtime.member("frame_cycles"))));
    if (((cycles) % (76))) {
      ((runtime.dereference(members.m_maincpu)).adjust_icount?.(((((cycles) % (76))) - (76))) ?? 0);
    }
  }

  function method_RSYNC_w(runtime: any) {
    const members = runtime.members;

  }

  function method_CTRLPF_w(runtime: any, data: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    members.CTRLPF = ((data) & 0xff);
    if (((Number(curr_x) < Number(80)) ? 1 : 0)) {
      members.REFLECT = (((((members.CTRLPF ?? runtime.member("CTRLPF"))) & (1))) & 0xff);
    }
  }

  function method_RESM0_w(runtime: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    let new_horzM0: any = 0;
    if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
      new_horzM0 = ((((Number(curr_x) < Number(7)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))));
      if (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7)))) ? 1 : 0)) {
        let decrements_passed: any = runtime.divide(((curr_x) - ((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (4)))), 4);
        new_horzM0 = ((new_horzM0) + (8));
        if (((Number((((members.motclkM0 ?? runtime.member("motclkM0"))) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
          new_horzM0 = ((new_horzM0) - ((((members.motclkM0 ?? runtime.member("motclkM0"))) - (decrements_passed))));
          if (((Number(new_horzM0) < Number(0)) ? 1 : 0)) {
            new_horzM0 = ((new_horzM0) + (160));
          }
        }
      }
    } else {
      new_horzM0 = ((((Number(curr_x) < Number((-1))) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))));
      members.skipM0delay = ((((((((((((Number(curr_x) < Number((-1))) ? 1 : 0)) && (((Number((((members.horzM0 ?? runtime.member("horzM0"))) % (160))) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.horzM0 ?? runtime.member("horzM0"))) % (160))) < Number(1)) ? 1 : 0))) ? 1 : 0)) ? (4) : (0))) | 0);
      if (((Number((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) !== Number(-200)) ? 1 : 0)) {
        let motclk: any = (((((((members.HMM0 ?? runtime.member("HMM0"))) ^ (128))) >>> (4))) & 0xff);
        if (((Number(curr_x) <= Number(runtime.add(runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
          let motclk_passed: any = ((runtime.divide(((curr_x) - (runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 6))), 4)) & 0xff);
          new_horzM0 = ((new_horzM0) - (((motclk) - (motclk_passed))));
        }
      }
    }
    if (((Number(new_horzM0) !== Number((members.horzM0 ?? runtime.member("horzM0")))) ? 1 : 0)) {
      members.startM0 = (((((members.skipM0delay ?? runtime.member("skipM0delay"))) ? (1) : (0))) | 0);
      members.horzM0 = ((new_horzM0) | 0);
    }
  }

  function method_RESM1_w(runtime: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    let new_horzM1: any = 0;
    if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
      new_horzM1 = ((((Number(curr_x) < Number(7)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))));
      if (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7)))) ? 1 : 0)) {
        let decrements_passed: any = runtime.divide(((curr_x) - ((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (4)))), 4);
        new_horzM1 = ((new_horzM1) + (8));
        if (((Number((((members.motclkM1 ?? runtime.member("motclkM1"))) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
          new_horzM1 = ((new_horzM1) - ((((members.motclkM1 ?? runtime.member("motclkM1"))) - (decrements_passed))));
          if (((Number(new_horzM1) < Number(0)) ? 1 : 0)) {
            new_horzM1 = ((new_horzM1) + (160));
          }
        }
      }
    } else {
      new_horzM1 = ((((Number(curr_x) < Number((-1))) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))));
      members.skipM1delay = ((((((((((((Number(curr_x) < Number((-1))) ? 1 : 0)) && (((Number((((members.horzM1 ?? runtime.member("horzM1"))) % (160))) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.horzM1 ?? runtime.member("horzM1"))) % (160))) < Number(1)) ? 1 : 0))) ? 1 : 0)) ? (4) : (0))) | 0);
      if (((Number((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) !== Number(-200)) ? 1 : 0)) {
        let motclk: any = (((((((members.HMM1 ?? runtime.member("HMM1"))) ^ (128))) >>> (4))) & 0xff);
        if (((Number(curr_x) <= Number(runtime.add(runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
          let motclk_passed: any = ((runtime.divide(((curr_x) - (runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 6))), 4)) & 0xff);
          new_horzM1 = ((new_horzM1) - (((motclk) - (motclk_passed))));
        }
      }
    }
    if (((Number(new_horzM1) !== Number((members.horzM1 ?? runtime.member("horzM1")))) ? 1 : 0)) {
      members.startM1 = (((((members.skipM1delay ?? runtime.member("skipM1delay"))) ? (1) : (0))) | 0);
      members.horzM1 = ((new_horzM1) | 0);
    }
  }

  function method_RESBL_w(runtime: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
      members.horzBL = ((((((Number(curr_x) < Number(7)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
      if (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((16) * (4))), 7)))) ? 1 : 0)) {
        let decrements_passed: any = runtime.divide(((curr_x) - ((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (4)))), 4);
        members.horzBL = ((((members.horzBL) + (8))) | 0);
        if (((Number((((members.motclkBL ?? runtime.member("motclkBL"))) - (decrements_passed))) > Number(0)) ? 1 : 0)) {
          members.horzBL = ((((members.horzBL) - ((((members.motclkBL ?? runtime.member("motclkBL"))) - (decrements_passed))))) | 0);
          if (((Number((members.horzBL ?? runtime.member("horzBL"))) < Number(0)) ? 1 : 0)) {
            members.horzBL = ((((members.horzBL) + (160))) | 0);
          }
        }
      }
    } else {
      members.horzBL = ((((((Number(curr_x) < Number(0)) ? 1 : 0)) ? (2) : (((((curr_x) + (4))) % (160))))) | 0);
      if (((Number((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) !== Number(-200)) ? 1 : 0)) {
        let motclk: any = (((((((members.HMBL ?? runtime.member("HMBL"))) ^ (128))) >>> (4))) & 0xff);
        if (((Number(curr_x) <= Number(runtime.add(runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 5), ((motclk) * (4))))) ? 1 : 0)) {
          let motclk_passed: any = ((runtime.divide(((curr_x) - (runtime.add((((members.HMOVE_started_previous ?? runtime.member("HMOVE_started_previous"))) - (228)), 6))), 4)) & 0xff);
          members.horzBL = ((((members.horzBL) - (((motclk) - (motclk_passed))))) | 0);
        }
      }
    }
  }

  function method_GRP0_w(runtime: any, data: any) {
    const members = runtime.members;
    members.prevGRP1 = (((members.GRP1 ?? runtime.member("GRP1"))) & 0xff);
    members.GRP0 = ((data) & 0xff);
  }

  function method_GRP1_w(runtime: any, data: any) {
    const members = runtime.members;
    members.prevGRP0 = (((members.GRP0 ?? runtime.member("GRP0"))) & 0xff);
    members.GRP1 = ((data) & 0xff);
    members.prevENABL = (((members.ENABL ?? runtime.member("ENABL"))) & 0xff);
  }

  function method_HMP0_w(runtime: any, data: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    data = ((runtime.andAssign(data, 240)) & 0xff);
    if (((Number(data) === Number((members.HMP0 ?? runtime.member("HMP0")))) ? 1 : 0)) {
      return;
    }
    if ((((((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkP0 ?? runtime.member("motclkP0"))) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkP0 ?? runtime.member("motclkP0"))) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
      let new_motclkP0: any = ((((data) ^ (128))) >>> (4));
      if ((((((Number(new_motclkP0) > Number((members.motclkP0 ?? runtime.member("motclkP0")))) ? 1 : 0)) || (((Number(curr_x) <= Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkP0) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkP0) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
        members.horzP0 = ((((members.horzP0) - (((new_motclkP0) - ((members.motclkP0 ?? runtime.member("motclkP0"))))))) | 0);
        members.motclkP0 = ((new_motclkP0) | 0);
      } else {
        members.horzP0 = ((((members.horzP0) - (((15) - ((members.motclkP0 ?? runtime.member("motclkP0"))))))) | 0);
        members.motclkP0 = ((15) | 0);
        if ((((((Number(data) !== Number(112)) ? 1 : 0)) && (((Number(data) !== Number(128)) ? 1 : 0))) ? 1 : 0)) {
          members.HMP0_latch = ((1) & 0xff);
        }
      }
      if (((Number((members.horzP0 ?? runtime.member("horzP0"))) < Number(0)) ? 1 : 0)) {
        members.horzP0 = ((((members.horzP0) + (160))) | 0);
      }
      members.horzP0 = ((((members.horzP0) % (160))) | 0);
      method_setup_pXgfx(runtime);
    }
    members.HMP0 = ((data) & 0xff);
  }

  function method_HMP1_w(runtime: any, data: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    data = ((runtime.andAssign(data, 240)) & 0xff);
    if (((Number(data) === Number((members.HMP1 ?? runtime.member("HMP1")))) ? 1 : 0)) {
      return;
    }
    if ((((((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkP1 ?? runtime.member("motclkP1"))) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkP1 ?? runtime.member("motclkP1"))) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
      let new_motclkP1: any = ((((data) ^ (128))) >>> (4));
      if ((((((Number(new_motclkP1) > Number((members.motclkP1 ?? runtime.member("motclkP1")))) ? 1 : 0)) || (((Number(curr_x) <= Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkP1) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkP1) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
        members.horzP1 = ((((members.horzP1) - (((new_motclkP1) - ((members.motclkP1 ?? runtime.member("motclkP1"))))))) | 0);
        members.motclkP1 = ((new_motclkP1) | 0);
      } else {
        members.horzP1 = ((((members.horzP1) - (((15) - ((members.motclkP1 ?? runtime.member("motclkP1"))))))) | 0);
        members.motclkP1 = ((15) | 0);
        if ((((((Number(data) !== Number(112)) ? 1 : 0)) && (((Number(data) !== Number(128)) ? 1 : 0))) ? 1 : 0)) {
          members.HMP1_latch = ((1) & 0xff);
        }
      }
      if (((Number((members.horzP1 ?? runtime.member("horzP1"))) < Number(0)) ? 1 : 0)) {
        members.horzP1 = ((((members.horzP1) + (160))) | 0);
      }
      members.horzP1 = ((((members.horzP1) % (160))) | 0);
      method_setup_pXgfx(runtime);
    }
    members.HMP1 = ((data) & 0xff);
  }

  function method_HMM0_w(runtime: any, data: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    data = ((runtime.andAssign(data, 240)) & 0xff);
    if (((Number(data) === Number((members.HMM0 ?? runtime.member("HMM0")))) ? 1 : 0)) {
      return;
    }
    if ((((((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkM0 ?? runtime.member("motclkM0"))) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkM0 ?? runtime.member("motclkM0"))) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
      let new_motclkM0: any = ((((data) ^ (128))) >>> (4));
      if ((((((Number(new_motclkM0) > Number((members.motclkM0 ?? runtime.member("motclkM0")))) ? 1 : 0)) || (((Number(curr_x) <= Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkM0) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkM0) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
        members.horzM0 = ((((members.horzM0) - (((new_motclkM0) - ((members.motclkM0 ?? runtime.member("motclkM0"))))))) | 0);
        members.motclkM0 = ((new_motclkM0) | 0);
      } else {
        members.horzM0 = ((((members.horzM0) - (((15) - ((members.motclkM0 ?? runtime.member("motclkM0"))))))) | 0);
        members.motclkM0 = ((15) | 0);
        if ((((((Number(data) !== Number(112)) ? 1 : 0)) && (((Number(data) !== Number(128)) ? 1 : 0))) ? 1 : 0)) {
          members.HMM0_latch = ((1) & 0xff);
        }
      }
      if (((Number((members.horzM0 ?? runtime.member("horzM0"))) < Number(0)) ? 1 : 0)) {
        members.horzM0 = ((((members.horzM0) + (160))) | 0);
      }
      members.horzM0 = ((((members.horzM0) % (160))) | 0);
    }
    members.HMM0 = ((data) & 0xff);
  }

  function method_HMM1_w(runtime: any, data: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    data = ((runtime.andAssign(data, 240)) & 0xff);
    if (((Number(data) === Number((members.HMM1 ?? runtime.member("HMM1")))) ? 1 : 0)) {
      return;
    }
    if ((((((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkM1 ?? runtime.member("motclkM1"))) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkM1 ?? runtime.member("motclkM1"))) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
      let new_motclkM1: any = ((((data) ^ (128))) >>> (4));
      if ((((((Number(new_motclkM1) > Number((members.motclkM1 ?? runtime.member("motclkM1")))) ? 1 : 0)) || (((Number(curr_x) <= Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkM1) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkM1) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
        members.horzM1 = ((((members.horzM1) - (((new_motclkM1) - ((members.motclkM1 ?? runtime.member("motclkM1"))))))) | 0);
        members.motclkM1 = ((new_motclkM1) | 0);
      } else {
        members.horzM1 = ((((members.horzM1) - (((15) - ((members.motclkM1 ?? runtime.member("motclkM1"))))))) | 0);
        members.motclkM1 = ((15) | 0);
        if ((((((Number(data) !== Number(112)) ? 1 : 0)) && (((Number(data) !== Number(128)) ? 1 : 0))) ? 1 : 0)) {
          members.HMM1_latch = ((1) & 0xff);
        }
      }
      if (((Number((members.horzM1 ?? runtime.member("horzM1"))) < Number(0)) ? 1 : 0)) {
        members.horzM1 = ((((members.horzM1) + (160))) | 0);
      }
      members.horzM1 = ((((members.horzM1) % (160))) | 0);
    }
    members.HMM1 = ((data) & 0xff);
  }

  function method_HMBL_w(runtime: any, data: any) {
    const members = runtime.members;
    let curr_x: any = method_current_x(runtime);
    data = ((runtime.andAssign(data, 240)) & 0xff);
    if (((Number(data) === Number((members.HMBL ?? runtime.member("HMBL")))) ? 1 : 0)) {
      return;
    }
    if ((((((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) && (((Number(curr_x) < Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkBL ?? runtime.member("motclkBL"))) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), (((members.motclkBL ?? runtime.member("motclkBL"))) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
      let new_motclkBL: any = ((((data) ^ (128))) >>> (4));
      if ((((((Number(new_motclkBL) > Number((members.motclkBL ?? runtime.member("motclkBL")))) ? 1 : 0)) || (((Number(curr_x) <= Number((runtime.calls["std::min"] ? runtime.calls["std::min"](runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkBL) * (4))), 7) : runtime.macro("std::min", runtime.add((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (6)), ((new_motclkBL) * (4))), 7)))) ? 1 : 0))) ? 1 : 0)) {
        members.horzBL = ((((members.horzBL) - (((new_motclkBL) - ((members.motclkBL ?? runtime.member("motclkBL"))))))) | 0);
        members.motclkBL = ((new_motclkBL) | 0);
      } else {
        members.horzBL = ((((members.horzBL) - (((15) - ((members.motclkBL ?? runtime.member("motclkBL"))))))) | 0);
        members.motclkBL = ((15) | 0);
        if ((((((Number(data) !== Number(112)) ? 1 : 0)) && (((Number(data) !== Number(128)) ? 1 : 0))) ? 1 : 0)) {
          members.HMBL_latch = ((1) & 0xff);
        }
      }
      if (((Number((members.horzBL ?? runtime.member("horzBL"))) < Number(0)) ? 1 : 0)) {
        members.horzBL = ((((members.horzBL) + (160))) | 0);
      }
      members.horzBL = ((((members.horzBL) % (160))) | 0);
    }
    members.HMBL = ((data) & 0xff);
  }

  function method_RESMP0_w(runtime: any, data: any) {
    const members = runtime.members;
    if ((((members.RESMP0 ?? runtime.member("RESMP0"))) & (2))) {
      if (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0)) {
        members.horzM0 = (((((((members.horzP0 ?? runtime.member("horzP0"))) + (((3) * (([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) - (1))) | 0);
      } else {
        members.horzM0 = (((((members.horzP0 ?? runtime.member("horzP0"))) + (((4) * (([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ0 ?? runtime.member("NUSIZ0"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) | 0);
      }
      if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
        members.horzM0 = ((((members.horzM0) - (((8) - ((members.motclkP0 ?? runtime.member("motclkP0"))))))) | 0);
        members.horzM0 = ((((members.horzM0) + (((8) - ((members.motclkM0 ?? runtime.member("motclkM0"))))))) | 0);
        if (((Number((members.horzM0 ?? runtime.member("horzM0"))) < Number(0)) ? 1 : 0)) {
          members.horzM0 = ((((members.horzM0) + (160))) | 0);
        }
      }
      members.horzM0 = ((((members.horzM0) % (160))) | 0);
    }
    members.RESMP0 = ((data) & 0xff);
  }

  function method_RESMP1_w(runtime: any, data: any) {
    const members = runtime.members;
    if ((((members.RESMP1 ?? runtime.member("RESMP1"))) & (2))) {
      if (((Number(([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)) > Number(1)) ? 1 : 0)) {
        members.horzM1 = (((((((members.horzP1 ?? runtime.member("horzP1"))) + (((3) * (([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) - (1))) | 0);
      } else {
        members.horzM1 = (((((members.horzP1 ?? runtime.member("horzP1"))) + (((4) * (([1, 1, 0, 2, 1, 1, 2, 1, 3, 3, 1, 1, 2, 1, 7, 1, 2, 0, 3, 1, 3, 1, 4, 0][(((runtime.add((((((members.NUSIZ1 ?? runtime.member("NUSIZ1"))) & (7))) * (3)), 1)) % 24) + 24) % 24] ?? 0)))))) | 0);
      }
      if (((Number((members.HMOVE_started ?? runtime.member("HMOVE_started"))) !== Number(-200)) ? 1 : 0)) {
        members.horzM1 = ((((members.horzM1) - (((8) - ((members.motclkP1 ?? runtime.member("motclkP1"))))))) | 0);
        members.horzM1 = ((((members.horzM1) + (((8) - ((members.motclkM1 ?? runtime.member("motclkM1"))))))) | 0);
        if (((Number((members.horzM1 ?? runtime.member("horzM1"))) < Number(0)) ? 1 : 0)) {
          members.horzM1 = ((((members.horzM1) + (160))) | 0);
        }
      }
      members.horzM1 = ((((members.horzM1) % (160))) | 0);
    }
    members.RESMP1 = ((data) & 0xff);
  }

  function method_HMOVE_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_helper = members.helper ?? runtime.member("helper");
    let curr_x: any = method_current_x(runtime);
    let curr_y: any = method_current_y(runtime);
    members.HMOVE_started = ((curr_x) | 0);
    if (((Number(((curr_x) + (68))) < Number(((17) * (4)))) ? 1 : 0)) {
      let cycle_fix: any = ((17) - (runtime.divide(runtime.add(((curr_x) + (68)), 7), 4)));
      if ((members.HMP0_latch ?? runtime.member("HMP0_latch"))) {
        members.horzP0 = (((((((members.horzP0 ?? runtime.member("horzP0"))) + (cycle_fix))) % (160))) | 0);
      }
      if ((members.HMP1_latch ?? runtime.member("HMP1_latch"))) {
        members.horzP1 = (((((((members.horzP1 ?? runtime.member("horzP1"))) + (cycle_fix))) % (160))) | 0);
      }
      if ((members.HMM0_latch ?? runtime.member("HMM0_latch"))) {
        members.horzM0 = (((((((members.horzM0 ?? runtime.member("horzM0"))) + (cycle_fix))) % (160))) | 0);
      }
      if ((members.HMM1_latch ?? runtime.member("HMM1_latch"))) {
        members.horzM1 = (((((((members.horzM1 ?? runtime.member("horzM1"))) + (cycle_fix))) % (160))) | 0);
      }
      if ((members.HMBL_latch ?? runtime.member("HMBL_latch"))) {
        members.horzBL = (((((((members.horzBL ?? runtime.member("horzBL"))) + (cycle_fix))) % (160))) | 0);
      }
    }
    members.HMP0_latch = ((0) & 0xff);
    members.HMP1_latch = ((0) & 0xff);
    members.HMM0_latch = ((0) & 0xff);
    members.HMM1_latch = ((0) & 0xff);
    members.HMBL_latch = ((0) & 0xff);
    if ((((((Number(curr_x) >= Number((-5))) ? 1 : 0)) && (((Number(curr_x) < Number(97)) ? 1 : 0))) ? 1 : 0)) {
      members.motclkP0 = ((0) | 0);
      members.motclkP1 = ((0) | 0);
      members.motclkM0 = ((0) | 0);
      members.motclkM1 = ((0) | 0);
      members.motclkBL = ((0) | 0);
      members.HMOVE_started = ((-200) | 0);
      return;
    }
    members.motclkP0 = (((((((members.HMP0 ?? runtime.member("HMP0"))) ^ (128))) >>> (4))) | 0);
    members.motclkP1 = (((((((members.HMP1 ?? runtime.member("HMP1"))) ^ (128))) >>> (4))) | 0);
    members.motclkM0 = (((((((members.HMM0 ?? runtime.member("HMM0"))) ^ (128))) >>> (4))) | 0);
    members.motclkM1 = (((((((members.HMM1 ?? runtime.member("HMM1"))) ^ (128))) >>> (4))) | 0);
    members.motclkBL = (((((((members.HMBL ?? runtime.member("HMBL"))) ^ (128))) >>> (4))) | 0);
    if ((((((Number(curr_x) >= Number(97)) ? 1 : 0)) && (((Number(curr_x) < Number(151)) ? 1 : 0))) ? 1 : 0)) {
      let skip_motclks: any = runtime.divide(((((160) - ((members.HMOVE_started ?? runtime.member("HMOVE_started"))))) - (6)), 4);
      members.motclkP0 = ((((members.motclkP0) - (skip_motclks))) | 0);
      members.motclkP1 = ((((members.motclkP1) - (skip_motclks))) | 0);
      members.motclkM0 = ((((members.motclkM0) - (skip_motclks))) | 0);
      members.motclkM1 = ((((members.motclkM1) - (skip_motclks))) | 0);
      members.motclkBL = ((((members.motclkBL) - (skip_motclks))) | 0);
      if (((Number((members.motclkP0 ?? runtime.member("motclkP0"))) < Number(0)) ? 1 : 0)) {
        members.motclkP0 = ((0) | 0);
      }
      if (((Number((members.motclkP1 ?? runtime.member("motclkP1"))) < Number(0)) ? 1 : 0)) {
        members.motclkP1 = ((0) | 0);
      }
      if (((Number((members.motclkM0 ?? runtime.member("motclkM0"))) < Number(0)) ? 1 : 0)) {
        members.motclkM0 = ((0) | 0);
      }
      if (((Number((members.motclkM1 ?? runtime.member("motclkM1"))) < Number(0)) ? 1 : 0)) {
        members.motclkM1 = ((0) | 0);
      }
      if (((Number((members.motclkBL ?? runtime.member("motclkBL"))) < Number(0)) ? 1 : 0)) {
        members.motclkBL = ((0) | 0);
      }
    }
    if ((((((Number(curr_x) >= Number((-56))) ? 1 : 0)) && (((Number(curr_x) < Number((-5))) ? 1 : 0))) ? 1 : 0)) {
      let max_motclks: any = runtime.divide(((7) - ((((members.HMOVE_started ?? runtime.member("HMOVE_started"))) + (5)))), 4);
      if (((Number((members.motclkP0 ?? runtime.member("motclkP0"))) > Number(max_motclks)) ? 1 : 0)) {
        members.motclkP0 = ((max_motclks) | 0);
      }
      if (((Number((members.motclkP1 ?? runtime.member("motclkP1"))) > Number(max_motclks)) ? 1 : 0)) {
        members.motclkP1 = ((max_motclks) | 0);
      }
      if (((Number((members.motclkM0 ?? runtime.member("motclkM0"))) > Number(max_motclks)) ? 1 : 0)) {
        members.motclkM0 = ((max_motclks) | 0);
      }
      if (((Number((members.motclkM1 ?? runtime.member("motclkM1"))) > Number(max_motclks)) ? 1 : 0)) {
        members.motclkM1 = ((max_motclks) | 0);
      }
      if (((Number((members.motclkBL ?? runtime.member("motclkBL"))) > Number(max_motclks)) ? 1 : 0)) {
        members.motclkBL = ((max_motclks) | 0);
      }
    }
    if ((((((Number(curr_x) < Number((-5))) ? 1 : 0)) || (((Number(curr_x) >= Number(157)) ? 1 : 0))) ? 1 : 0)) {
      members.horzP0 = ((((members.horzP0) + (((8) - ((members.motclkP0 ?? runtime.member("motclkP0"))))))) | 0);
      members.horzP1 = ((((members.horzP1) + (((8) - ((members.motclkP1 ?? runtime.member("motclkP1"))))))) | 0);
      members.horzM0 = ((((members.horzM0) + (((8) - ((members.motclkM0 ?? runtime.member("motclkM0"))))))) | 0);
      members.horzM1 = ((((members.horzM1) + (((8) - ((members.motclkM1 ?? runtime.member("motclkM1"))))))) | 0);
      members.horzBL = ((((members.horzBL) + (((8) - ((members.motclkBL ?? runtime.member("motclkBL"))))))) | 0);
      if (((Number((members.horzP0 ?? runtime.member("horzP0"))) < Number(0)) ? 1 : 0)) {
        members.horzP0 = ((((members.horzP0) + (160))) | 0);
      }
      if (((Number((members.horzP1 ?? runtime.member("horzP1"))) < Number(0)) ? 1 : 0)) {
        members.horzP1 = ((((members.horzP1) + (160))) | 0);
      }
      if (((Number((members.horzM0 ?? runtime.member("horzM0"))) < Number(0)) ? 1 : 0)) {
        members.horzM0 = ((((members.horzM0) + (160))) | 0);
      }
      if (((Number((members.horzM1 ?? runtime.member("horzM1"))) < Number(0)) ? 1 : 0)) {
        members.horzM1 = ((((members.horzM1) + (160))) | 0);
      }
      if (((Number((members.horzBL ?? runtime.member("horzBL"))) < Number(0)) ? 1 : 0)) {
        members.horzBL = ((((members.horzBL) + (160))) | 0);
      }
      members.horzP0 = ((((members.horzP0) % (160))) | 0);
      members.horzP1 = ((((members.horzP1) % (160))) | 0);
      members.horzM0 = ((((members.horzM0) % (160))) | 0);
      members.horzM1 = ((((members.horzM1) % (160))) | 0);
      members.horzBL = ((((members.horzBL) % (160))) | 0);
      if (((Number(curr_x) >= Number(157)) ? 1 : 0)) {
        curr_y = ((curr_y) + (1));
        method_update_bitmap(runtime, (-8), curr_y);
      } else {
        method_setup_pXgfx(runtime);
      }
      if (((Number(curr_y) < Number((members.screen_height ?? runtime.member("screen_height")))) ? 1 : 0)) {
        (() => { const target = runtime.readIndex(h_helper, (members.current_bitmap ?? runtime.member("current_bitmap")))["pix&"](curr_y, 34); const bytes = Number(16); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
      }
      members.prev_x = ((8) | 0);
    }
  }

  function method_HMCLR_w(runtime: any, data: any) {
    const members = runtime.members;
    method_HMP0_w(runtime, 0);
    method_HMP1_w(runtime, 0);
    method_HMM0_w(runtime, 0);
    method_HMM1_w(runtime, 0);
    method_HMBL_w(runtime, 0);
  }

  function method_CXCLR_w(runtime: any) {
    const members = runtime.members;
    members.CXM0P = ((0) & 0xff);
    members.CXM1P = ((0) & 0xff);
    members.CXP0FB = ((0) & 0xff);
    members.CXP1FB = ((0) & 0xff);
    members.CXM0FB = ((0) & 0xff);
    members.CXM1FB = ((0) & 0xff);
    members.CXBLPF = ((0) & 0xff);
    members.CXPPMM = ((0) & 0xff);
  }

  function method_init_palette(runtime: any) {
    const members = runtime.members;
    for (let i: any = 0; ((Number(i) < Number(16)) ? 1 : 0); i = ((i) + (1))) {
      let I: any = ([0, 0, 0.192, (-0.127), 0.241, (-0.048), 0.24, 0.04, 0.191, 0.121, 0.103, 0.175, (-0.008), 0.196, (-0.116), 0.174, (-0.199), 0.118, (-0.243), 0.037, (-0.237), (-0.052), (-0.18), (-0.129), (-0.087), (-0.181), 0.021, (-0.196), 0.13, (-0.169), 0.21, (-0.107)][(((runtime.add(((i) * (2)), 0)) % 32) + 32) % 32] ?? 0);
      let Q: any = ([0, 0, 0.192, (-0.127), 0.241, (-0.048), 0.24, 0.04, 0.191, 0.121, 0.103, 0.175, (-0.008), 0.196, (-0.116), 0.174, (-0.199), 0.118, (-0.243), 0.037, (-0.237), (-0.052), (-0.18), (-0.129), (-0.087), (-0.181), 0.021, (-0.196), 0.13, (-0.169), 0.21, (-0.107)][(((runtime.add(((i) * (2)), 1)) % 32) + 32) % 32] ?? 0);
      for (let j: any = 0; ((Number(j) < Number(8)) ? 1 : 0); j = ((j) + (1))) {
        let Y: any = ((j) / (7));
        let R: any = runtime.add(((Y) + (((0.956) * (I)))), ((0.621) * (Q)));
        let G: any = ((((Y) - (((0.272) * (I))))) - (((0.647) * (Q))));
        let B: any = runtime.add(((Y) - (((1.106) * (I)))), ((1.703) * (Q)));
        if (((Number(R) < Number(0)) ? 1 : 0)) {
          R = 0;
        }
        if (((Number(G) < Number(0)) ? 1 : 0)) {
          G = 0;
        }
        if (((Number(B) < Number(0)) ? 1 : 0)) {
          B = 0;
        }
        R = (runtime.calls["pow"] ? runtime.calls["pow"](R, 0.9) : runtime.macro("pow", R, 0.9));
        G = (runtime.calls["pow"] ? runtime.calls["pow"](G, 0.9) : runtime.macro("pow", G, 0.9));
        B = (runtime.calls["pow"] ? runtime.calls["pow"](B, 0.9) : runtime.macro("pow", B, 0.9));
        if (((Number(R) > Number(1)) ? 1 : 0)) {
          R = 1;
        }
        if (((Number(G) > Number(1)) ? 1 : 0)) {
          G = 1;
        }
        if (((Number(B) > Number(1)) ? 1 : 0)) {
          B = 1;
        }
        (runtime.palette[((((8) * (i))) + (j))] = ((0xff000000 | ((((runtime.add(((255) * (B)), 0.5)) & 0xff)) & 0xff) << 16 | ((((runtime.add(((255) * (G)), 0.5)) & 0xff)) & 0xff) << 8 | ((((runtime.add(((255) * (R)), 0.5)) & 0xff)) & 0xff)) >>> 0));
      }
    }
    method_extend_palette(runtime);
  }
  return {
    "extend_palette": method_extend_palette,
    "screen_update": method_screen_update,
    "draw_sprite_helper": method_draw_sprite_helper,
    "draw_missile_helper": method_draw_missile_helper,
    "draw_playfield_helper": method_draw_playfield_helper,
    "update_bitmap": method_update_bitmap,
    "drawS1": method_drawS1,
    "drawM1": method_drawM1,
    "drawS0": method_drawS0,
    "drawM0": method_drawM0,
    "drawPF": method_drawPF,
    "drawBL": method_drawBL,
    "draw_ball_helper": method_draw_ball_helper,
    "setup_pXgfx": method_setup_pXgfx,
    "collision_check": method_collision_check,
    "NUSIZ0_w": method_NUSIZ0_w,
    "current_x": method_current_x,
    "current_y": method_current_y,
    "NUSIZ1_w": method_NUSIZ1_w,
    "RESP0_w": method_RESP0_w,
    "RESP1_w": method_RESP1_w,
    "INPT_r": method_INPT_r,
    "read": method_read,
    "write": method_write,
    "VSYNC_w": method_VSYNC_w,
    "VBLANK_w": method_VBLANK_w,
    "WSYNC_w": method_WSYNC_w,
    "RSYNC_w": method_RSYNC_w,
    "CTRLPF_w": method_CTRLPF_w,
    "RESM0_w": method_RESM0_w,
    "RESM1_w": method_RESM1_w,
    "RESBL_w": method_RESBL_w,
    "GRP0_w": method_GRP0_w,
    "GRP1_w": method_GRP1_w,
    "HMP0_w": method_HMP0_w,
    "HMP1_w": method_HMP1_w,
    "HMM0_w": method_HMM0_w,
    "HMM1_w": method_HMM1_w,
    "HMBL_w": method_HMBL_w,
    "RESMP0_w": method_RESMP0_w,
    "RESMP1_w": method_RESMP1_w,
    "HMOVE_w": method_HMOVE_w,
    "HMCLR_w": method_HMCLR_w,
    "CXCLR_w": method_CXCLR_w,
    "init_palette": method_init_palette
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
