import { deviceAliases, type SoundRuntimeContext, type SoundRuntimeHooks } from '../sound-runtime.ts';
import { S14001aCore } from './berzerk-sound-worklet.ts';

export function installBerzerkSoundRuntime(context: SoundRuntimeContext): SoundRuntimeHooks {
  const speechRom = context.regions?.speech ?? new Uint8Array(0x1000);
  // Held in one record so a save state reaches it (machine-state.ts).
  const state = { speechData: 0, speechStart: 0, speechClock: 19_531.25, speech: new S14001aCore(speechRom) };
  const ownerCpu = context.board.execution.cpus[0];
  const bind = (tag: string, method: string, fn: (...args: number[]) => number): void => {
    for (const alias of deviceAliases(context.board, tag)) context.calls[`${alias}.${method}`] = fn;
  };
  bind(context.sound.deviceTag, 'sh6840_w', (offset, data) => {
    context.soundWrite(offset & 7, data, context.fraction(), 'sh6840_w'); return 0;
  });
  bind(context.sound.deviceTag, 'sh6840_r', () => 0);
  bind(context.sound.deviceTag, 'sfxctrl_w', (offset, data) => {
    context.soundWrite(offset & 3, data, context.fraction(), 'sfxctrl_w'); return 0;
  });
  bind(context.sound.deviceTag, 'sh8253_w', (offset, data) => {
    context.soundWrite(offset & 3, data, context.fraction(), 'sh8253_w'); return 0;
  });
  for (const cpu of context.board.execution.cpus) {
    for (const range of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])]) {
      const method = range.write?.split('.').at(-1);
      if (!range.write || !['sh8253_w', 'sh6840_w', 'sfxctrl_w'].includes(method ?? '')) continue;
      context.registry.write[range.write] = (_address, offset, data) => {
        context.soundWrite(offset, data, context.fraction(), method);
      };
      if (range.read?.endsWith('.sh6840_r')) {
        context.registry.read[range.read] = () => 0;
      }
    }
  }
  bind('speech', 'data_w', data => { state.speechData = data & 0x3f; return 0; });
  bind('speech', 'start_w', line => {
    if (state.speechStart && !line) {
      state.speech.start(state.speechData);
      context.soundWrite(0, state.speechData, context.fraction(), 'speech_start');
    }
    state.speechStart = line & 1; return 0;
  });
  bind('speech', 'set_unscaled_clock', clock => {
    state.speechClock = clock;
    state.speech.setClock(clock);
    context.soundWrite(0, clock, context.fraction(), 'speech_clock'); return 0;
  });
  bind('speech', 'busy_r', () => state.speech.busy() ? 1 : 0);
  bind('s14001a_volume', 'set_gain', gain => {
    context.soundWrite(0, Math.round(gain * 255), context.fraction(), 'speech_gain'); return 0;
  });
  return {
    state,
    tickCpu: (cpuTag, cycles) => {
      if (!ownerCpu || cpuTag !== ownerCpu.tag || cycles <= 0) return;
      state.speech.advanceTime(cycles / Math.max(1, ownerCpu.cycleClock ?? ownerCpu.clock));
    },
    reset: () => {
      state.speechData = 0;
      state.speechStart = 0;
      state.speech = new S14001aCore(speechRom);
      state.speech.setClock(state.speechClock);
    },
  };
}
