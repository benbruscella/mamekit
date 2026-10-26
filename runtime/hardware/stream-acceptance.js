// Acceptance probe for a chip that renders its own stream beside the processor.
//
// The Atari 2600's TIA and the Game Boy's APU are read back within the frame,
// so they render on the main thread and post finished samples to the shared
// stream worklet (src/mame/stream-worklet.ts). The probe drives that worklet's
// own frame renderer, initialised the way audio.ts initialises the worklet, so
// it hears exactly what the browser plays.
var __rewriteRelativeImportExtension = (this && this.__rewriteRelativeImportExtension) || function (path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
        return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
            return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
        });
    }
    return path;
};
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
export async function createStreamWorkletProbe(context, artifact) {
    const module = await import(__rewriteRelativeImportExtension(pathToFileURL(join(context.outRoot, 'runtime/generated', artifact.replace(/\.ts$/, '.js'))).href));
    assert.ok(module.GeneratedStreamFrameRenderer, `${artifact} exports no stream frame renderer`);
    // audio.ts posts `clock: core.clock ?? core.sampleRate` as the stream's rate.
    const renderer = new module.GeneratedStreamFrameRenderer(context.sound.clock ?? context.outputRate, context.outputRate, context.refresh);
    return {
        render(writes) {
            for (const write of writes)
                renderer.push(write.data);
            return renderer.render();
        },
    };
}
