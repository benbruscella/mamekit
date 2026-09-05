// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './tia.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_tia_sound_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let chan: any = ((0) & 0xff);
    switch (offset) {
      case 21:
      {
        runtime.writeIndex((members.AUDC ?? runtime.member("AUDC")), 0, ((data) & (15)));
        chan = ((0) & 0xff);
        break;
      }
      case 22:
      {
        runtime.writeIndex((members.AUDC ?? runtime.member("AUDC")), 1, ((data) & (15)));
        chan = ((1) & 0xff);
        break;
      }
      case 23:
      {
        runtime.writeIndex((members.AUDF ?? runtime.member("AUDF")), 0, ((data) & (31)));
        chan = ((0) & 0xff);
        break;
      }
      case 24:
      {
        runtime.writeIndex((members.AUDF ?? runtime.member("AUDF")), 1, ((data) & (31)));
        chan = ((1) & 0xff);
        break;
      }
      case 25:
      {
        runtime.writeIndex((members.AUDV ?? runtime.member("AUDV")), 0, ((((data) & (15))) << (10)));
        chan = ((0) & 0xff);
        break;
      }
      case 26:
      {
        runtime.writeIndex((members.AUDV ?? runtime.member("AUDV")), 1, ((((data) & (15))) << (10)));
        chan = ((1) & 0xff);
        break;
      }
      default:
      {
        return;
      }
    }
    let new_val: any = ((0) & 0xffff);
    if ((((((Number(runtime.readIndex((members.AUDC ?? runtime.member("AUDC")), chan)) === Number(0)) ? 1 : 0)) || (((Number(runtime.readIndex((members.AUDC ?? runtime.member("AUDC")), chan)) === Number(11)) ? 1 : 0))) ? 1 : 0)) {
      new_val = ((0) & 0xffff);
      runtime.writeIndex((members.Outvol ?? runtime.member("Outvol")), chan, runtime.readIndex((members.AUDV ?? runtime.member("AUDV")), chan));
    } else {
      new_val = ((runtime.add(runtime.readIndex((members.AUDF ?? runtime.member("AUDF")), chan), 1)) & 0xffff);
      if ((((((Number(((runtime.readIndex((members.AUDC ?? runtime.member("AUDC")), chan)) & (12))) === Number(12)) ? 1 : 0)) && (((Number(runtime.readIndex((members.AUDC ?? runtime.member("AUDC")), chan)) !== Number(15)) ? 1 : 0))) ? 1 : 0)) {
        new_val = ((((new_val) * (3))) & 0xffff);
      }
    }
    if (((Number(new_val) !== Number(runtime.readIndex((members.Div_n_max ?? runtime.member("Div_n_max")), chan))) ? 1 : 0)) {
      runtime.writeIndex((members.Div_n_max ?? runtime.member("Div_n_max")), chan, new_val);
      if ((((((Number(runtime.readIndex((members.Div_n_cnt ?? runtime.member("Div_n_cnt")), chan)) === Number(0)) ? 1 : 0)) || (((Number(new_val) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
        runtime.writeIndex((members.Div_n_cnt ?? runtime.member("Div_n_cnt")), chan, new_val);
      }
    }
  }

  function method_sound_stream_update(runtime: any, samples: any) {
    const members = runtime.members;
    const h_Bit5 = members.Bit5 ?? runtime.member("Bit5");
    const h_Div31 = members.Div31 ?? runtime.member("Div31");
    const h_Bit9 = members.Bit9 ?? runtime.member("Bit9");
    const h_Bit4 = members.Bit4 ?? runtime.member("Bit4");
    let audc0: any = ((0) & 0xff);
    let audc1: any = ((0) & 0xff);
    let div_n_cnt0: any = ((0) & 0xff);
    let div_n_cnt1: any = ((0) & 0xff);
    let p5_0: any = ((0) & 0xff);
    let p5_1: any = ((0) & 0xff);
    let audv0: any = ((0) << 16 >> 16);
    let audv1: any = ((0) << 16 >> 16);
    let outvol_0: any = ((0) << 16 >> 16);
    let outvol_1: any = ((0) << 16 >> 16);
    audc0 = ((runtime.readIndex((members.AUDC ?? runtime.member("AUDC")), 0)) & 0xff);
    audc1 = ((runtime.readIndex((members.AUDC ?? runtime.member("AUDC")), 1)) & 0xff);
    audv0 = ((runtime.readIndex((members.AUDV ?? runtime.member("AUDV")), 0)) << 16 >> 16);
    audv1 = ((runtime.readIndex((members.AUDV ?? runtime.member("AUDV")), 1)) << 16 >> 16);
    p5_0 = ((runtime.readIndex((members.P5 ?? runtime.member("P5")), 0)) & 0xff);
    p5_1 = ((runtime.readIndex((members.P5 ?? runtime.member("P5")), 1)) & 0xff);
    outvol_0 = ((runtime.readIndex((members.Outvol ?? runtime.member("Outvol")), 0)) << 16 >> 16);
    outvol_1 = ((runtime.readIndex((members.Outvol ?? runtime.member("Outvol")), 1)) << 16 >> 16);
    div_n_cnt0 = ((runtime.readIndex((members.Div_n_cnt ?? runtime.member("Div_n_cnt")), 0)) & 0xff);
    div_n_cnt1 = ((runtime.readIndex((members.Div_n_cnt ?? runtime.member("Div_n_cnt")), 1)) & 0xff);
    for (let sampindex: any = 0; ((Number(sampindex) < Number(samples)) ? 1 : 0); ) {
      if (((Number(div_n_cnt0) > Number(1)) ? 1 : 0)) {
        div_n_cnt0 = ((((div_n_cnt0) - (1))) & 0xff);
      } else {
        if (((Number(div_n_cnt0) === Number(1)) ? 1 : 0)) {
          let prev_bit5: any = runtime.readIndex(h_Bit5, p5_0);
          div_n_cnt0 = ((runtime.readIndex((members.Div_n_max ?? runtime.member("Div_n_max")), 0)) & 0xff);
          p5_0 = ((((p5_0) + (1))) & 0xff);
          if (((Number(p5_0) === Number(31)) ? 1 : 0)) {
            p5_0 = ((0) & 0xff);
          }
          if ((((((((((((Number(((audc0) & (2))) === Number(0)) ? 1 : 0)) || ((((((Number(((audc0) & (1))) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_Div31, p5_0))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc0) & (1))) === Number(1)) ? 1 : 0)) && (runtime.readIndex(h_Bit5, p5_0))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc0) & (15))) === Number(15)) ? 1 : 0)) && (((Number(runtime.readIndex(h_Bit5, p5_0)) !== Number(prev_bit5)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            if (((audc0) & (4))) {
              if (((Number(((audc0) & (15))) === Number(15)) ? 1 : 0)) {
                if (((Number(runtime.readIndex(h_Bit5, p5_0)) !== Number(prev_bit5)) ? 1 : 0)) {
                  runtime.writeIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 0, ((runtime.readIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 0)) - (1)));
                  if (((runtime.readIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 0)) ? 0 : 1)) {
                    runtime.writeIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 0, 3);
                    if (outvol_0) {
                      outvol_0 = ((0) << 16 >> 16);
                    } else {
                      outvol_0 = ((audv0) << 16 >> 16);
                    }
                  }
                }
              } else {
                if (outvol_0) {
                  outvol_0 = ((0) << 16 >> 16);
                } else {
                  outvol_0 = ((audv0) << 16 >> 16);
                }
              }
            } else {
              if (((audc0) & (8))) {
                if (((Number(audc0) === Number(8)) ? 1 : 0)) {
                  runtime.writeIndex((members.P9 ?? runtime.member("P9")), 0, ((runtime.readIndex((members.P9 ?? runtime.member("P9")), 0)) + (1)));
                  if (((Number(runtime.readIndex((members.P9 ?? runtime.member("P9")), 0)) === Number(511)) ? 1 : 0)) {
                    runtime.writeIndex((members.P9 ?? runtime.member("P9")), 0, 0);
                  }
                  if (runtime.readIndex(h_Bit9, runtime.readIndex((members.P9 ?? runtime.member("P9")), 0))) {
                    outvol_0 = ((audv0) << 16 >> 16);
                  } else {
                    outvol_0 = ((0) << 16 >> 16);
                  }
                } else {
                  if (((audc0) & (2))) {
                    if ((((outvol_0) || (((audc0) & (1)))) ? 1 : 0)) {
                      outvol_0 = ((0) << 16 >> 16);
                    } else {
                      outvol_0 = ((audv0) << 16 >> 16);
                    }
                  } else {
                    if (runtime.readIndex(h_Bit5, p5_0)) {
                      outvol_0 = ((audv0) << 16 >> 16);
                    } else {
                      outvol_0 = ((0) << 16 >> 16);
                    }
                  }
                }
              } else {
                runtime.writeIndex((members.P4 ?? runtime.member("P4")), 0, ((runtime.readIndex((members.P4 ?? runtime.member("P4")), 0)) + (1)));
                if (((Number(runtime.readIndex((members.P4 ?? runtime.member("P4")), 0)) === Number(15)) ? 1 : 0)) {
                  runtime.writeIndex((members.P4 ?? runtime.member("P4")), 0, 0);
                }
                if (runtime.readIndex(h_Bit4, runtime.readIndex((members.P4 ?? runtime.member("P4")), 0))) {
                  outvol_0 = ((audv0) << 16 >> 16);
                } else {
                  outvol_0 = ((0) << 16 >> 16);
                }
              }
            }
          }
        }
      }
      if (((Number(div_n_cnt1) > Number(1)) ? 1 : 0)) {
        div_n_cnt1 = ((((div_n_cnt1) - (1))) & 0xff);
      } else {
        if (((Number(div_n_cnt1) === Number(1)) ? 1 : 0)) {
          let prev_bit5: any = runtime.readIndex(h_Bit5, p5_1);
          div_n_cnt1 = ((runtime.readIndex((members.Div_n_max ?? runtime.member("Div_n_max")), 1)) & 0xff);
          p5_1 = ((((p5_1) + (1))) & 0xff);
          if (((Number(p5_1) === Number(31)) ? 1 : 0)) {
            p5_1 = ((0) & 0xff);
          }
          if ((((((((((((Number(((audc1) & (2))) === Number(0)) ? 1 : 0)) || ((((((Number(((audc1) & (1))) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_Div31, p5_1))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc1) & (1))) === Number(1)) ? 1 : 0)) && (runtime.readIndex(h_Bit5, p5_1))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc1) & (15))) === Number(15)) ? 1 : 0)) && (((Number(runtime.readIndex(h_Bit5, p5_1)) !== Number(prev_bit5)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            if (((audc1) & (4))) {
              if (((Number(((audc1) & (15))) === Number(15)) ? 1 : 0)) {
                if (((Number(runtime.readIndex(h_Bit5, p5_1)) !== Number(prev_bit5)) ? 1 : 0)) {
                  runtime.writeIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 1, ((runtime.readIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 1)) - (1)));
                  if (((runtime.readIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 1)) ? 0 : 1)) {
                    runtime.writeIndex((members.Div_3_cnt ?? runtime.member("Div_3_cnt")), 1, 3);
                    if (outvol_1) {
                      outvol_1 = ((0) << 16 >> 16);
                    } else {
                      outvol_1 = ((audv1) << 16 >> 16);
                    }
                  }
                }
              } else {
                if (outvol_1) {
                  outvol_1 = ((0) << 16 >> 16);
                } else {
                  outvol_1 = ((audv1) << 16 >> 16);
                }
              }
            } else {
              if (((audc1) & (8))) {
                if (((Number(audc1) === Number(8)) ? 1 : 0)) {
                  runtime.writeIndex((members.P9 ?? runtime.member("P9")), 1, ((runtime.readIndex((members.P9 ?? runtime.member("P9")), 1)) + (1)));
                  if (((Number(runtime.readIndex((members.P9 ?? runtime.member("P9")), 1)) === Number(511)) ? 1 : 0)) {
                    runtime.writeIndex((members.P9 ?? runtime.member("P9")), 1, 0);
                  }
                  if (runtime.readIndex(h_Bit9, runtime.readIndex((members.P9 ?? runtime.member("P9")), 1))) {
                    outvol_1 = ((audv1) << 16 >> 16);
                  } else {
                    outvol_1 = ((0) << 16 >> 16);
                  }
                } else {
                  if (((audc1) & (2))) {
                    if ((((outvol_1) || (((audc1) & (1)))) ? 1 : 0)) {
                      outvol_1 = ((0) << 16 >> 16);
                    } else {
                      outvol_1 = ((audv1) << 16 >> 16);
                    }
                  } else {
                    if (runtime.readIndex(h_Bit5, p5_1)) {
                      outvol_1 = ((audv1) << 16 >> 16);
                    } else {
                      outvol_1 = ((0) << 16 >> 16);
                    }
                  }
                }
              } else {
                runtime.writeIndex((members.P4 ?? runtime.member("P4")), 1, ((runtime.readIndex((members.P4 ?? runtime.member("P4")), 1)) + (1)));
                if (((Number(runtime.readIndex((members.P4 ?? runtime.member("P4")), 1)) === Number(15)) ? 1 : 0)) {
                  runtime.writeIndex((members.P4 ?? runtime.member("P4")), 1, 0);
                }
                if (runtime.readIndex(h_Bit4, runtime.readIndex((members.P4 ?? runtime.member("P4")), 1))) {
                  outvol_1 = ((audv1) << 16 >> 16);
                } else {
                  outvol_1 = ((0) << 16 >> 16);
                }
              }
            }
          }
        }
      }
      if ((((members.oversampling ?? runtime.member("oversampling"))) ? 0 : 1)) {
        members.Samp_n_cnt = ((((members.Samp_n_cnt) - (256))) & 0xffff);
        if (((Number((members.Samp_n_cnt ?? runtime.member("Samp_n_cnt"))) < Number(256)) ? 1 : 0)) {
          members.Samp_n_cnt = ((((members.Samp_n_cnt) + ((members.Samp_n_max ?? runtime.member("Samp_n_max"))))) & 0xffff);
          (runtime.calls["stream_put_int"] ? runtime.calls["stream_put_int"]((() => { const previous = sampindex; sampindex = ((sampindex) + (1)); return previous; })(), ((outvol_0) + (outvol_1)), 32768) : runtime.macro("stream_put_int", (() => { const previous = sampindex; sampindex = ((sampindex) + (1)); return previous; })(), ((outvol_0) + (outvol_1)), 32768));
        }
      } else {
        do {
          members.Samp_n_cnt = ((((members.Samp_n_cnt) - (256))) & 0xffff);
          (runtime.calls["stream_put_int"] ? runtime.calls["stream_put_int"]((() => { const previous = sampindex; sampindex = ((sampindex) + (1)); return previous; })(), ((outvol_0) + (outvol_1)), 32768) : runtime.macro("stream_put_int", (() => { const previous = sampindex; sampindex = ((sampindex) + (1)); return previous; })(), ((outvol_0) + (outvol_1)), 32768));
        } while ((((((Number((members.Samp_n_cnt ?? runtime.member("Samp_n_cnt"))) >= Number(256)) ? 1 : 0)) && (((Number(sampindex) < Number(samples)) ? 1 : 0))) ? 1 : 0));
        if (((Number((members.Samp_n_cnt ?? runtime.member("Samp_n_cnt"))) < Number(256)) ? 1 : 0)) {
          members.Samp_n_cnt = ((((members.Samp_n_cnt) + ((members.Samp_n_max ?? runtime.member("Samp_n_max"))))) & 0xffff);
        }
      }
    }
    runtime.writeIndex((members.P5 ?? runtime.member("P5")), 0, p5_0);
    runtime.writeIndex((members.P5 ?? runtime.member("P5")), 1, p5_1);
    runtime.writeIndex((members.Outvol ?? runtime.member("Outvol")), 0, outvol_0);
    runtime.writeIndex((members.Outvol ?? runtime.member("Outvol")), 1, outvol_1);
    runtime.writeIndex((members.Div_n_cnt ?? runtime.member("Div_n_cnt")), 0, div_n_cnt0);
    runtime.writeIndex((members.Div_n_cnt ?? runtime.member("Div_n_cnt")), 1, div_n_cnt1);
  }

  function method_poly_init(runtime: any, poly: any, size: any, f0: any, f1: any) {
    const members = runtime.members;
    let mask: any = ((((1) << (size))) - (1));
    let x: any = mask;
    for (let i: any = 0; ((Number(i) < Number(mask)) ? 1 : 0); i = ((i) + (1))) {
      let bit0: any = ((((((size) - (f0))) ? (((x) >>> (((size) - (f0))))) : (x))) & (1));
      let bit1: any = ((((((size) - (f1))) ? (((x) >>> (((size) - (f1))))) : (x))) & (1));
      runtime.writeIndex(poly, i, ((x) & (1)));
      x = ((((x) >>> (1))) | (((((bit0) ^ (bit1))) << (((size) - (1))))));
    }
  }
  return {
    "tia_sound_w": method_tia_sound_w,
    "sound_stream_update": method_sound_stream_update,
    "poly_init": method_poly_init
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
