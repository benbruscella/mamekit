import { deviceAliases, soundTags, type SoundRuntimeContext } from '../sound-runtime.ts';

export function installDacRuntime(context: SoundRuntimeContext): void {
  for (const [chip, tag] of soundTags(context.sound).entries()) {
    const write = (data: number): void => {
      context.soundWrite(chip, data, context.fraction());
    };
    for (const method of context.sound.writeMethods) {
      context.registry.write[`${tag}.${method}`] = (_address, _offset, data) => write(data);
    }
    for (const alias of deviceAliases(context.board, tag)) {
      for (const method of context.sound.writeMethods) context.calls[`${alias}.${method}`] = write;
    }
  }
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    const aliases = [
      auxiliary.deviceTag,
      `m_${auxiliary.deviceTag}`,
      ...(auxiliary.member ? [auxiliary.member] : []),
    ];
    for (const method of auxiliary.writeMethods) {
      const name = `${auxiliary.deviceTag}.${method}`;
      context.registry.write[name] = (_address, _offset, data) => {
        context.soundWrite(0, data, context.fraction(), name);
      };
      for (const alias of aliases) {
        context.calls[`${alias}.${method}`] = (...args: number[]) => {
          context.soundWrite(0, args.at(-1) ?? 0, context.fraction(), name);
          return 0;
        };
      }
    }
  }

  // Williams' first-generation sound board receives the main-board PIA's
  // command on PIA 2 port B and uses CB1 as its interrupt strobe.  MAME routes
  // this through deferred_snd_cmd_w<2>; retain that protocol at the generated
  // CPU boundary because the C++ template argument is not part of FUNC's
  // callable name in handler IR.  The sound CPU still reads the real PIA and
  // produces every DAC byte itself.
  const williamsCommand = context.board.callbacks.find(callback =>
    callback.signal === 'writepb_handler' &&
    callback.targetClass === 'williams_state' &&
    callback.targetMethod === 'snd_cmd_w');
  if (williamsCommand && context.board.devices?.some(device =>
    device.tag === 'pia_2' && device.type === 'PIA6821')) {
    const write = (data = 0): number => {
      const command = (data | 0xc0) & 0xff;
      context.callDevice('pia_2', 'portb_w', command);
      context.callDevice('pia_2', 'cb1_w', command === 0xff ? 0 : 1);
      return 0;
    };
    context.calls['williams_state.snd_cmd_w'] = write;
  }
  // Gottlieb's Rev 1 composite board accepts a command at its parent device,
  // then synchronously presents the inverted low six bits and the PA7 command
  // edge to its MOS6532. Preserve that source protocol so the generated 6502
  // reaches the DAC instead of dropping main-board sound_w calls at the host.
  for (const host of context.board.devices?.filter(device =>
    /^GOTTLIEB_SOUND_(?:SPEECH_)?REV1A?$/.test(device.type)) ?? []) {
    const riotTag = `${host.tag}:riot`;
    const write = (data = 0): number => {
      const pa0To5 = ~data & 0x3f;
      const pa7 = (data & 0x0f) !== 0x0f ? 1 : 0;
      context.callDevice(riotTag, 'pa_w', 0, pa0To5 | (pa7 << 7), 0xbf);
      // The RIOT RAM/I/O maps are hosted submaps in MAME. Until generic
      // hosted-device maps can be mounted on a generated CPU bus, also feed
      // the command-derived six-bit level to the board's real DAC channel.
      // This is deliberately attached to the source command protocol (rather
      // than a frame-driven synthetic tone), so silence, timing and command
      // changes still follow the game program exactly.
      context.soundWrite(0, pa0To5 << 2, context.fraction(), `${host.tag}.write`);
      return 0;
    };
    for (const alias of deviceAliases(context.board, host.tag)) {
      context.calls[`${alias}.write`] = write;
    }
  }

  // Midway's Sounds Good parent board exposes a four-bit command latch to
  // its PIA. The child 68000 then writes the real ten-bit AD7533 through PIA
  // port callbacks, so keep commands on that source path rather than turning
  // main-board writes directly into synthetic samples.
  for (const host of context.board.devices?.filter(device =>
    device.type === 'MIDWAY_SOUNDS_GOOD') ?? []) {
    const piaTag = `${host.tag}:pia`;
    const cpuTag = `${host.tag}:cpu`;
    const write = (data = 0): number => {
      context.callDevice(piaTag, 'portb_w', (data >>> 1) & 0x0f);
      context.callDevice(piaTag, 'ca1_w', ~data & 1);
      // midway_sounds_good_device::synced_write: "oftentimes games will write
      // one nibble at a time; the sync on this is very important, so we boost
      // the interleave briefly while this happens". Rampage presents its two
      // command nibbles 45us apart, well inside one scanline slice, so without
      // the boost the 68000 only ever sees the second half of every command.
      context.perfectQuantum(250e-6);
      return 0;
    };
    const read = (): number => Number(context.state.m_status ?? 0) & 3;
    const resetWrite = (state = 0): number => {
      context.setCpuInputLine(cpuTag, -2, state ? 1 : 0);
      return 0;
    };
    for (const alias of deviceAliases(context.board, host.tag)) {
      context.calls[`${alias}.write`] = write;
      context.calls[`${alias}.read`] = read;
      context.calls[`${alias}.reset_write`] = resetWrite;
    }
  }
}
