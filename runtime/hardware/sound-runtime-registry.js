// The runtime sound installer, by the sound kind the generator emits.
//
// Every sound chip is its MAME class compiled whole and rendered in the stream
// mix, so there is one kind: `stream`. A board with no sound device is `none`
// and installs nothing.
//
// Ships to the browser, so it imports only runtime.ts modules -- never an
// extract.ts, which belongs to the compiler.
import { installStreamAudioRuntime } from "./speaker/runtime.js";
/** Installers by sound kind. Any other kind is a sound family nothing plays. */
const INSTALLERS = {
    stream: installStreamAudioRuntime,
};
export function installSoundRuntime(context) {
    const installer = INSTALLERS[context.sound.kind];
    if (!installer)
        throw new Error(`${context.board.game}: no runtime plays sound kind "${context.sound.kind}"`);
    return installer(context) ?? undefined;
}
