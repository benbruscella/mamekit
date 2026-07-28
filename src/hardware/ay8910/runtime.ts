// AY8910 register wiring.
//
// Ships to the browser: it binds generated IR to the audio sink and knows
// nothing about how the chip synthesises. The DSP is the generated worklet.

import {
  deviceAliases,
  soundTags,
  type SoundRuntimeContext,
} from '../sound-runtime.ts';

/** Registers 14 and 15 are the general-purpose I/O ports. */
const PORT_A = 14;
const PORT_B = 15;

export function installAy8910Runtime(context: SoundRuntimeContext): void {
  const { board, sound, registry, calls } = context;
  const tags = soundTags(sound);
  const addresses = new Map(tags.map(tag => [tag, 0]));
  const registers = new Map(tags.map(tag => [tag, new Uint8Array(16)]));

  tags.forEach((tag, chip) => {
    const addressWrite = (data: number): void => {
      addresses.set(tag, data & 0x0f);
    };
    const dataWrite = (data: number): void => {
      const register = addresses.get(tag) ?? 0;
      registers.get(tag)![register] = data;
      // One worklet hosts every chip: chip N owns registers N*16..N*16+15.
      context.soundWrite(chip * 16 + register, data, context.fraction());
      const signal = register === PORT_A
        ? 'port_a_write_callback'
        : register === PORT_B
          ? 'port_b_write_callback'
          : undefined;
      if (signal) context.dispatch(tag, signal, data);
    };
    const dataRead = (): number => {
      const register = addresses.get(tag) ?? 0;
      const signal = register === PORT_A
        ? 'port_a_read_callback'
        : register === PORT_B
          ? 'port_b_read_callback'
          : '';
      const callback = board.callbacks.find(candidate =>
        candidate.ownerTag === tag && candidate.signal === signal);
      if (callback?.targetTag && callback.targetMethod) {
        const value = context.callDevice(callback.targetTag, callback.targetMethod);
        if (value !== undefined) return value;
      }
      if (callback?.targetClass && callback.targetMethod) {
        return context.runCallbackHandler(callback.id) ?? 0xff;
      }
      return registers.get(tag)![register] ?? 0xff;
    };

    registry.write[`${tag}.address_w`] = (_address, _offset, data) => addressWrite(data);
    registry.write[`${tag}.data_w`] = (_address, _offset, data) => dataWrite(data);
    registry.read[`${tag}.data_r`] = dataRead;
    for (const alias of deviceAliases(board, tag)) {
      calls[`${alias}.address_w`] = addressWrite;
      calls[`${alias}.data_w`] = dataWrite;
      calls[`${alias}.data_r`] = dataRead;
    }
  });

  bindAudioFilters(context);

  // Secondary stream devices the worklet mixes: the board never instantiates
  // them, so their writes go straight to the sink, tagged by method name.
  for (const auxiliary of sound.auxiliaryDevices ?? []) {
    const aliases = [
      auxiliary.deviceTag,
      `m_${auxiliary.deviceTag}`,
      ...(auxiliary.member ? [auxiliary.member] : []),
    ];
    for (const method of auxiliary.writeMethods) {
      const name = `${auxiliary.deviceTag}.${method}`;
      registry.write[name] = (_address, offset, data) => {
        context.soundWrite(offset, data, context.fraction(), name);
      };
      for (const alias of aliases) {
        const key = `${alias}.${method}`;
        const original = calls[key];
        calls[key] = (...args: number[]) => {
          const result = original?.(...args);
          context.soundWrite(0, args.at(-1) ?? 0, context.fraction(), name);
          return result;
        };
      }
    }
  }
}

/** Register-space extension carrying MAME filter_rc_device settings. */
const FILTER_CONTROL_BASE = 0x100;
const FILTER_CONTROL_STRIDE = 5;

/**
 * MAME routes some AY outputs through filter_rc_device stages the driver
 * reconfigures at run time. The member the handlers write to is bound here so
 * those writes reach the worklet as control values.
 */
function bindAudioFilters(context: SoundRuntimeContext): void {
  const { sound, state } = context;
  const rows: unknown[][] = [];
  for (const route of sound.routes ?? []) {
    if (!route.filter) continue;
    const { bank, channel, index } = route.filter;
    const row = (rows[bank] ??= []);
    if (row[channel]) continue;
    let previous: number[] | undefined;
    row[channel] = {
      filter_rc_set_RC: (type: number, r1: number, r2: number, r3: number, c: number) => {
        const values = [type, r1, r2, r3, c];
        if (previous?.every((value, position) => value === values[position])) return;
        previous = values;
        const base = FILTER_CONTROL_BASE + index * FILTER_CONTROL_STRIDE;
        values.forEach((value, parameter) =>
          context.soundWrite(base + parameter, value, context.fraction()));
      },
    };
  }
  if (!rows.length) return;
  state.m_filter = sound.filterLayout === 'flat' ? rows.flatMap(row => row) : rows;
}
