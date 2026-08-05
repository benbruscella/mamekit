import { deviceAliases, type SoundRuntimeContext } from '../sound-runtime.ts';

export function installBerzerkSoundRuntime(context: SoundRuntimeContext): { reset(): void } {
  let speechData = 0;
  let speechStart = 0;
  const bind = (tag: string, method: string, fn: (...args: number[]) => number): void => {
    for (const alias of deviceAliases(context.board, tag)) context.calls[`${alias}.${method}`] = fn;
  };
  bind('exidy', 'sh6840_w', (offset, data) => {
    context.soundWrite(offset & 7, data, context.fraction(), 'sh6840_w'); return 0;
  });
  bind('exidy', 'sh6840_r', () => 0);
  bind('exidy', 'sfxctrl_w', (offset, data) => {
    context.soundWrite(offset & 3, data, context.fraction(), 'sfxctrl_w'); return 0;
  });
  bind('speech', 'data_w', data => { speechData = data & 0x3f; return 0; });
  bind('speech', 'start_w', state => {
    if (speechStart && !state) {
      context.soundWrite(0, speechData, context.fraction(), 'speech_start');
    }
    speechStart = state & 1; return 0;
  });
  bind('speech', 'set_unscaled_clock', clock => {
    context.soundWrite(0, clock, context.fraction(), 'speech_clock'); return 0;
  });
  bind('speech', 'busy_r', () => 0);
  bind('s14001a_volume', 'set_gain', gain => {
    context.soundWrite(0, Math.round(gain * 255), context.fraction(), 'speech_gain'); return 0;
  });
  return { reset: () => { speechData = 0; speechStart = 0; } };
}
