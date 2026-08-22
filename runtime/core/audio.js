// Browser-only Web Audio glue for a worklet-hosted sound core (no libraries).
//
// The DSP runs inside an AudioWorkletProcessor (see wsg-worklet.ts) so
// main-thread jank never glitches audio. AudioOutput only owns the
// AudioContext / GainNode wiring and forwards register writes to the
// worklet over its MessagePort.
export class AudioOutput {
    ctx = null;
    node = null;
    filter = null;
    gain = null;
    volume = 1;
    /** writes + data pushes, kept in issue order, flushed once per frame */
    pending = [];
    /** Complete frames produced while the async AudioWorklet is starting. */
    pendingFrames = [];
    constructor() { }
    /**
     * Call from a user gesture (browsers block AudioContext otherwise).
     * Loads the compiled worklet module (e.g. "runtime/wsg-worklet.js"
     * relative to dist), wires node -> gain -> destination and sends the
     * init message.
     */
    async start(core, workletUrl, processorName = 'wsg') {
        if (this.ctx)
            return; // already started
        const ctx = new AudioContext();
        await ctx.audioWorklet.addModule(workletUrl);
        const node = new AudioWorkletNode(ctx, processorName, {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [1],
        });
        const gain = ctx.createGain();
        gain.gain.value = this.volume;
        const filter = core.speakerFilter
            ? ctx.createBiquadFilter()
            : null;
        if (filter && core.speakerFilter) {
            filter.type = core.speakerFilter.type;
            filter.frequency.value = core.speakerFilter.frequency;
            filter.Q.value = core.speakerFilter.q;
            node.connect(filter);
            filter.connect(gain);
        }
        else {
            node.connect(gain);
        }
        gain.connect(ctx.destination);
        node.port.postMessage({
            type: 'init',
            deviceType: core.deviceType,
            waveRom: core.waveRom ?? new Uint8Array(0x100),
            sampleRom: core.sampleRom,
            clock: core.clock ?? core.sampleRate,
            voices: core.voices,
            chips: core.chips,
            deviceTags: core.deviceTags,
            routes: core.routes,
            auxiliary: core.auxiliary,
            auxiliaryDevices: core.auxiliaryDevices,
            discreteMixer: core.discreteMixer,
            discreteDac: core.discreteDac,
            discreteEffects: core.discreteEffects,
            refresh: core.refresh,
            debug: core.debug,
        });
        // worklet scheduler telemetry (posted once per second when debug)
        if (core.debug) {
            node.port.onmessage = (ev) => {
                const m = ev.data;
                if (m.type === 'stats') {
                    const { type: _t, ...rest } = m;
                    console.log('[audio]', JSON.stringify(rest));
                }
            };
            console.log(`[audio] context rate=${ctx.sampleRate} state=${ctx.state} baseLatency=${ctx.baseLatency}`);
            ctx.addEventListener('statechange', () => console.log(`[audio] state -> ${ctx.state}`));
        }
        this.ctx = ctx;
        this.node = node;
        this.filter = filter;
        this.gain = gain;
        // Frames that ran while addModule() was awaiting are pre-audio history:
        // collapse them into ONE batch so the register state lands correctly
        // without queueing N rendered frames of permanent backlog latency
        // (worklets drain exactly one queued frame per video frame).
        const backlog = this.pendingFrames.splice(0).flat();
        if (backlog.length)
            this.postFrame(node, backlog);
        if (ctx.state !== 'running')
            await ctx.resume();
    }
    /**
     * Queue a register write for the worklet. Writes accumulate and go out as
     * ONE batch message per video frame via flush() — junofrst's i8039 DAC
     * alone is ~4k writes/s, and per-write postMessage overhead starves the
     * scheduler under main-thread jank. Complete frames produced before
     * start() finishes remain separate in `pendingFrames`.
     */
    write(offset, data, frac, method) {
        const write = { offset, data, frac };
        if (method !== undefined)
            write.method = method;
        this.pending.push({ kind: 'write', write });
    }
    /**
     * Queue a bulk sample-data push (NES DMC) in the SAME ordered stream as
     * register writes, so the buffer lands at the worklet before any later
     * write that starts playing it (the board pushes bytes, then writes $4015).
     */
    data(id, bytes) {
        this.pending.push({ kind: 'data', data: { id, bytes } });
    }
    /** Post all queued writes/data preserving order. Call once per frame. */
    flush() {
        const frame = this.pending.splice(0);
        if (this.node)
            this.postFrame(this.node, frame);
        else
            this.pendingFrames.push(frame);
    }
    /**
     * Drain one frame to the worklet, batching consecutive register writes into
     * one 'batch' message but breaking the batch at every data push so ordering
     * (write < data < write) is preserved across the port.
     */
    postFrame(node, items) {
        let batch = [];
        for (const item of items) {
            if (item.kind === 'write') {
                batch.push(item.write);
            }
            else {
                if (batch.length) {
                    node.port.postMessage({ type: 'batch', writes: batch });
                    batch = [];
                }
                node.port.postMessage({ type: 'data', id: item.data.id, bytes: item.data.bytes });
            }
        }
        // An empty batch still represents one emulated frame. Timestamp-aware
        // worklets need it to advance sound even when no registers changed.
        node.port.postMessage({ type: 'batch', writes: batch });
    }
    /**
     * QA tap on the post-gain mix. Browser tests need to prove a machine is
     * actually audible through the shipped AudioWorklet path — the Node
     * acceptance probe renders the DSP offline and never touches this graph.
     * Returns null before start(), and never changes what reaches the speakers.
     */
    monitor() {
        if (!this.ctx || !this.gain)
            return null;
        const analyser = this.ctx.createAnalyser();
        analyser.fftSize = 2048;
        this.gain.connect(analyser);
        return analyser;
    }
    /** Master volume 0..1 via the GainNode. */
    setVolume(v) {
        this.volume = Math.min(1, Math.max(0, v));
        if (this.gain)
            this.gain.gain.value = this.volume;
    }
    suspend() {
        void this.ctx?.suspend();
    }
    resume() {
        void this.ctx?.resume();
    }
}
