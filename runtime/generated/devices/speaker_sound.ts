// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './speaker_sound.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_composed_volume = members.m_composed_volume ?? 0;
    const h_m_ampl = members.m_ampl ?? 0;
    members.m_channel = (__l["stream_alloc"] ? __l["stream_alloc"](0, 1, ((__l["machine().sample_rate"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, 1, ((__l["machine().sample_rate"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
    members.m_level = ((0) | 0);
    (__l["std::fill"] ? __l["std::fill"]((__l["std::begin"] ? __l["std::begin"](h_m_composed_volume) : runtime.macro("std::begin", h_m_composed_volume)), (__l["std::end"] ? __l["std::end"](h_m_composed_volume) : runtime.macro("std::end", h_m_composed_volume)), 0) : runtime.macro("std::fill", (__l["std::begin"] ? __l["std::begin"](h_m_composed_volume) : runtime.macro("std::begin", h_m_composed_volume)), (__l["std::end"] ? __l["std::end"](h_m_composed_volume) : runtime.macro("std::end", h_m_composed_volume)), 0));
    members.m_composed_sample_index = ((0) | 0);
    members.m_interm_sample_index = ((0) | 0);
    members.m_prevx = (members.m_prevy = 0);
    members.m_last_update_time = ((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0);
    members.m_channel_sample_period = (__l["HZ_TO_ATTOSECONDS"] ? __l["HZ_TO_ATTOSECONDS"](((__l["machine().sample_rate"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("HZ_TO_ATTOSECONDS", ((__l["machine().sample_rate"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
    members.m_channel_sample_period_secfrac = (__l["ATTOSECONDS_TO_DOUBLE"] ? __l["ATTOSECONDS_TO_DOUBLE"]((members.m_channel_sample_period ?? 0)) : runtime.macro("ATTOSECONDS_TO_DOUBLE", (members.m_channel_sample_period ?? 0)));
    members.m_interm_sample_period = runtime.divide((members.m_channel_sample_period ?? 0), 4);
    members.m_interm_sample_period_secfrac = (__l["ATTOSECONDS_TO_DOUBLE"] ? __l["ATTOSECONDS_TO_DOUBLE"]((members.m_interm_sample_period ?? 0)) : runtime.macro("ATTOSECONDS_TO_DOUBLE", (members.m_interm_sample_period ?? 0)));
    members.m_channel_last_sample_time = (members.m_last_update_time ?? 0);
    members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
    members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
    let FILTER_STEP: any = runtime.divide(runtime.divide(3.141592653589793, 2), 4);
    let i: any = ((0) | 0);
    let x: any = 0;
    for (i = ((0) | 0), x = ((((0.5) - (((64) / (2))))) * (FILTER_STEP)); ((Number(i) < Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0), x = ((x) + (FILTER_STEP))) {
      if (((Number(x) === Number(0)) ? 1 : 0)) {
        h_m_ampl[i] = 1;
      } else {
        h_m_ampl[i] = ((Math.sin(Number(x))) / (x));
      }
    }
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_level ?? 0)) : runtime.macro("NAME", (members.m_level ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_level ?? 0)) : runtime.macro("NAME", (members.m_level ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_composed_volume) : runtime.macro("NAME", h_m_composed_volume))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_composed_volume) : runtime.macro("NAME", h_m_composed_volume))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_composed_sample_index ?? 0)) : runtime.macro("NAME", (members.m_composed_sample_index ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_composed_sample_index ?? 0)) : runtime.macro("NAME", (members.m_composed_sample_index ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_channel_last_sample_time ?? 0)) : runtime.macro("NAME", (members.m_channel_last_sample_time ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_channel_last_sample_time ?? 0)) : runtime.macro("NAME", (members.m_channel_last_sample_time ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_interm_sample_index ?? 0)) : runtime.macro("NAME", (members.m_interm_sample_index ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_interm_sample_index ?? 0)) : runtime.macro("NAME", (members.m_interm_sample_index ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_last_update_time ?? 0)) : runtime.macro("NAME", (members.m_last_update_time ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_last_update_time ?? 0)) : runtime.macro("NAME", (members.m_last_update_time ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_prevx ?? 0)) : runtime.macro("NAME", (members.m_prevx ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_prevx ?? 0)) : runtime.macro("NAME", (members.m_prevx ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_prevy ?? 0)) : runtime.macro("NAME", (members.m_prevy ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_prevy ?? 0)) : runtime.macro("NAME", (members.m_prevy ?? 0)))));
  }

  function method_device_reset(runtime: any): any {
    const members = runtime.members;

    members.m_level = ((0) | 0);
  }

  function method_device_post_load(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
    members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
  }

  function method_sound_stream_update(runtime: any, stream: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let volume: any = runtime.readIndex((members.m_levels ?? 0), (members.m_level ?? 0));
    let filtered_volume: any = 0;
    let sampled_time: any = 0;
    if (((Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))) > Number(0)) ? 1 : 0)) {
      sampled_time = (__l["attotime"] ? __l["attotime"](0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)));
      if (((Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))) > Number(1)) ? 1 : 0)) {
        sampled_time = ((sampled_time) * ((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))));
      }
    }
    for (let sampindex: any = ((0) | 0); ((Number(sampindex) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); ) {
      filtered_volume = method_update_interm_samples_get_filtered_volume(runtime, volume);
      ((runtime.dereference(stream)).put?.(0, (() => { const previous = sampindex; sampindex = ((((sampindex) + (1))) | 0); return previous; })(), filtered_volume) ?? 0);
      while (((Number(sampindex) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0)) {
        filtered_volume = method_update_interm_samples_get_filtered_volume(runtime, volume);
        ((runtime.dereference(stream)).put?.(0, (() => { const previous = sampindex; sampindex = ((((sampindex) + (1))) | 0); return previous; })(), filtered_volume) ?? 0);
      }
      members.m_channel_last_sample_time = ((members.m_channel_last_sample_time) + (sampled_time));
      members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
      members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
      members.m_last_update_time = (members.m_channel_last_sample_time ?? 0);
    }
  }

  function method_update_interm_samples_get_filtered_volume(runtime: any, volume: any): any {
    const members = runtime.members;

    const h_m_composed_volume = members.m_composed_volume ?? 0;
    let filtered_volume: any = 0;
    let tempx: any = 0;
    if (((Number((members.m_interm_sample_index ?? 0)) < Number(4)) ? 1 : 0)) {
      method_finalize_interm_sample(runtime, volume);
      while (((Number((((members.m_interm_sample_index ?? 0)) + (1))) < Number(4)) ? 1 : 0)) {
        method_init_next_interm_sample(runtime);
        h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = volume;
      }
    }
    filtered_volume = method_get_filtered_volume(runtime);
    method_init_next_interm_sample(runtime);
    members.m_interm_sample_index = ((0) | 0);
    tempx = filtered_volume;
    filtered_volume = runtime.add(((tempx) - ((members.m_prevx ?? 0))), ((0.995) * ((members.m_prevy ?? 0))));
    members.m_prevx = tempx;
    members.m_prevy = filtered_volume;
    return filtered_volume;
  }

  function method_finalize_interm_sample(runtime: any, volume: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_composed_volume = members.m_composed_volume ?? 0;
    let fraction: any = 0;
    fraction = method_make_fraction(runtime, (members.m_next_interm_sample_time ?? 0), (members.m_last_update_time ?? 0), (members.m_interm_sample_period_secfrac ?? 0));
    h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = ((h_m_composed_volume[(members.m_composed_sample_index ?? 0)]) + (((volume) * (fraction))));
    members.m_last_update_time = (members.m_next_interm_sample_time ?? 0);
    members.m_next_interm_sample_time = ((members.m_next_interm_sample_time) + ((__l["attotime"] ? __l["attotime"](0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
  }

  function method_make_fraction(runtime: any, a: any, b: any, timediv: any): any {
    const members = runtime.members;

    return (((typeof ((a) - (b)) === 'number' ? (((a) - (b))) : ((runtime.dereference(((a) - (b)))).as_double?.() ?? 0))) / (timediv));
  }

  function method_init_next_interm_sample(runtime: any): any {
    const members = runtime.members;

    const h_m_composed_volume = members.m_composed_volume ?? 0;
    members.m_composed_sample_index = ((((members.m_composed_sample_index) + (1))) | 0);
    if (((Number((members.m_composed_sample_index ?? 0)) >= Number(64)) ? 1 : 0)) {
      members.m_composed_sample_index = ((0) | 0);
    }
    h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = 0;
    members.m_interm_sample_index = ((((members.m_interm_sample_index) + (1))) | 0);
  }

  function method_get_filtered_volume(runtime: any): any {
    const members = runtime.members;

    const h_m_composed_volume = members.m_composed_volume ?? 0;
    const h_m_ampl = members.m_ampl ?? 0;
    let filtered_volume: any = 0;
    let ampsum: any = 0;
    let i: any = ((0) | 0);
    let c: any = ((0) | 0);
    for (i = (((((members.m_composed_sample_index ?? 0)) + (1))) | 0), c = ((0) | 0); ((Number(c) < Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0), c = ((((c) + (1))) | 0)) {
      if (((Number(i) >= Number(64)) ? 1 : 0)) {
        i = ((0) | 0);
      }
      filtered_volume = ((filtered_volume) + (((h_m_composed_volume[i]) * (h_m_ampl[c]))));
      ampsum = ((ampsum) + (Math.abs(Number(h_m_ampl[c]))));
    }
    filtered_volume = ((filtered_volume) / (ampsum));
    return filtered_volume;
  }

  function method_level_w(runtime: any, new_level: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let volume: any = 0;
    let time: any = 0;
    if (((Number(new_level) === Number((members.m_level ?? 0))) ? 1 : 0)) {
      return;
    }
    if (((Number(new_level) < Number(0)) ? 1 : 0)) {
      new_level = ((0) | 0);
    } else {
      if (((Number(new_level) >= Number((members.m_num_levels ?? 0))) ? 1 : 0)) {
        new_level = (((((members.m_num_levels ?? 0)) - (1))) | 0);
      }
    }
    volume = runtime.readIndex((members.m_levels ?? 0), (members.m_level ?? 0));
    time = ((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0);
    if (((Number(time) < Number((members.m_channel_next_sample_time ?? 0))) ? 1 : 0)) {
      method_update_interm_samples(runtime, time, volume);
      members.m_level = ((new_level) | 0);
      return;
    }
    (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
    members.m_channel_last_sample_time = (typeof (runtime.dereference(members.m_channel)).end_time === 'function' ? (runtime.dereference(members.m_channel)).end_time() : typeof (runtime.dereference(members.m_channel)).end_time === 'number' || typeof (runtime.dereference(members.m_channel)).end_time === 'boolean' ? (runtime.dereference(members.m_channel)).end_time : runtime.container(members.m_channel, "end_time"));
    if (((Number((members.m_channel_last_sample_time ?? 0)) > Number(time)) ? 1 : 0)) {
      members.m_channel_last_sample_time = ((members.m_channel_last_sample_time) - ((__l["attotime"] ? __l["attotime"](0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
    }
    members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
    members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__l["attotime"] ? __l["attotime"](0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
    members.m_last_update_time = (members.m_channel_last_sample_time ?? 0);
    method_update_interm_samples(runtime, time, volume);
    members.m_level = ((new_level) | 0);
  }

  function method_update_interm_samples(runtime: any, time: any, volume: any): any {
    const members = runtime.members;

    const h_m_composed_volume = members.m_composed_volume ?? 0;
    let fraction: any = 0;
    while (((Number(time) >= Number((members.m_next_interm_sample_time ?? 0))) ? 1 : 0)) {
      method_finalize_interm_sample(runtime, volume);
      method_init_next_interm_sample(runtime);
    }
    fraction = method_make_fraction(runtime, time, (members.m_last_update_time ?? 0), (members.m_interm_sample_period_secfrac ?? 0));
    h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = ((h_m_composed_volume[(members.m_composed_sample_index ?? 0)]) + (((volume) * (fraction))));
    members.m_last_update_time = time;
  }

  function method_set_levels(runtime: any, num_levels: any, levels: any): any {
    const members = runtime.members;

    members.m_num_levels = ((num_levels) | 0);
    members.m_levels = levels;
  }

  function method_speaker_sound_device__set_levels(runtime: any, num_levels: any, levels: any): any {
    const members = runtime.members;

    members.m_num_levels = ((num_levels) | 0);
    members.m_levels = levels;
  }
  return {
    "device_start": method_device_start,
    "device_reset": method_device_reset,
    "device_post_load": method_device_post_load,
    "sound_stream_update": method_sound_stream_update,
    "update_interm_samples_get_filtered_volume": method_update_interm_samples_get_filtered_volume,
    "finalize_interm_sample": method_finalize_interm_sample,
    "make_fraction": method_make_fraction,
    "init_next_interm_sample": method_init_next_interm_sample,
    "get_filtered_volume": method_get_filtered_volume,
    "level_w": method_level_w,
    "update_interm_samples": method_update_interm_samples,
    "set_levels": method_set_levels,
    "speaker_sound_device::set_levels": method_speaker_sound_device__set_levels
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["ATTOSECONDS_TO_DOUBLE","HZ_TO_ATTOSECONDS","NAME","attotime","machine","machine().sample_rate","machine().time","save_item","std::begin","std::end","std::fill","stream_alloc"];

export const device = definition;
export default device;
