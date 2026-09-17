import deviceData from './mos6581.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_syncEm(runtime) {
        const members = runtime.members;
        const h_optr = members.optr ?? runtime.member("optr");
        let sync = new Uint8Array(Math.max(0, Number(3)));
        for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            runtime.writeIndex(sync, v, ((Number(runtime.dereference(h_optr[v].modulator).cycleLenCount) <= Number(0)) ? 1 : 0));
            h_optr[v].cycleLenCount = ((((h_optr[v].cycleLenCount) - (1))) | 0);
        }
        for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            if ((((h_optr[v].sync) && (runtime.readIndex(sync, v))) ? 1 : 0)) {
                h_optr[v].cycleLenCount = ((0) | 0);
                h_optr[v].outProc = method_sidOperator_wave_calc_normal.bind(undefined, runtime);
                h_optr[v].waveStep = (((h_optr[v].waveStepPnt = ((0) >>> 0))) & 0xffff);
            }
        }
    }
    function method_fill_buffer(runtime, stream) {
        const members = runtime.members;
        const h_optr = members.optr ?? runtime.member("optr");
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            ((runtime.dereference(stream)).put?.(0, sampindex, method_mix_mono(runtime, runtime.add(runtime.add(runtime.add(runtime.dereference(h_optr[0].outProc)(runtime.addressOf(h_optr, 0)), runtime.dereference(h_optr[1].outProc)(runtime.addressOf(h_optr, 1))), ((runtime.dereference(h_optr[2].outProc)(runtime.addressOf(h_optr, 2))) & ((members.optr3_outputmask ?? runtime.member("optr3_outputmask"))))), (((members.masterVolume ?? runtime.member("masterVolume"))) << (2))))) ?? 0);
            method_syncEm(runtime);
        }
    }
    function method_mix_mono(runtime, usum) {
        const members = runtime.members;
        return ((((((usum) - (512))) << 16 >> 16)) * (((1) / (1024))));
    }
    function method_reset(runtime) {
        const members = runtime.members;
        const h_optr = members.optr ?? runtime.member("optr");
        const h_filter = members.filter ?? runtime.member("filter");
        for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            method_sidOperator_clear(runtime, runtime.addressOf(h_optr, v));
            method_enveEmuResetOperator(runtime, runtime.addressOf(h_optr, v));
        }
        members.optr3_outputmask = ((-1) | 0);
        h_filter.Type = (((h_filter.CurType = ((0) & 0xff))) & 0xff);
        h_filter.Value = ((0) & 0xffff);
        h_filter.Dy = (h_filter.ResDy = 0);
        for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            method_sidOperator_set(runtime, runtime.addressOf(h_optr, v));
            method_sidOperator_set2(runtime, runtime.addressOf(h_optr, v));
        }
        return 1;
    }
    function method_sidOperator_clear(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = runtime.dereference(voice);
        __pointee_voice.SIDfreq = ((0) >>> 0);
        __pointee_voice.SIDctrl = ((0) & 0xff);
        __pointee_voice.SIDAD = ((0) & 0xff);
        __pointee_voice.SIDSR = ((0) & 0xff);
        __pointee_voice.sync = ((0) | 0);
        __pointee_voice.pulseIndex = (((__pointee_voice.newPulseIndex = (((__pointee_voice.SIDpulseWidth = ((0) & 0xffff))) & 0xffff))) & 0xffff);
        __pointee_voice.curSIDfreq = (((__pointee_voice.curNoiseFreq = ((0) & 0xffff))) & 0xffff);
        __pointee_voice.output = (((__pointee_voice.noiseOutput = ((0) & 0xff))) & 0xff);
        __pointee_voice.filtIO = ((0) << 24 >> 24);
        __pointee_voice.filtEnabled = ((0) | 0);
        __pointee_voice.filtLow = (__pointee_voice.filtRef = 0);
        __pointee_voice.cycleLenCount = ((0) | 0);
        __pointee_voice.cycleLen = (((__pointee_voice.cycleLenPnt = ((0) & 0xffff))) & 0xffff);
        __pointee_voice.cycleAddLenPnt = ((0) >>> 0);
        __pointee_voice.outProc = method_waveCalcMute.bind(undefined, runtime);
        __pointee_voice.waveStepAdd = (((__pointee_voice.waveStepAddPnt = ((0) >>> 0))) & 0xffff);
        __pointee_voice.waveStep = (((__pointee_voice.waveStepPnt = ((0) >>> 0))) & 0xffff);
        runtime.readIndex(__pointee_voice.wavePre, 0).len = ((0) & 0xffff);
        runtime.readIndex(__pointee_voice.wavePre, 0).stp = (((runtime.readIndex(__pointee_voice.wavePre, 0).pnt = ((0) >>> 0))) << 16 >> 16);
        runtime.readIndex(__pointee_voice.wavePre, 1).len = ((0) & 0xffff);
        runtime.readIndex(__pointee_voice.wavePre, 1).stp = (((runtime.readIndex(__pointee_voice.wavePre, 1).pnt = ((0) >>> 0))) << 16 >> 16);
        __pointee_voice.waveStepOld = ((0) & 0xffff);
        __pointee_voice.noiseReg = ((8388600) >>> 0);
        __pointee_voice.noiseStepAdd = (((__pointee_voice.noiseStep = ((0) >>> 0))) >>> 0);
        __pointee_voice.noiseIsLocked = ((0) | 0);
    }
    function method_enveEmuResetOperator(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.ADSRctrl = ((14) & 0xff);
        __pointee_pVoice.enveStep = (((__pointee_pVoice.enveStepPnt = ((0) >>> 0))) & 0xffff);
        __pointee_pVoice.enveStepAdd = (((__pointee_pVoice.enveStepAddPnt = ((0) >>> 0))) & 0xffff);
        __pointee_pVoice.enveSusVol = ((0) & 0xff);
        __pointee_pVoice.enveVol = ((0) & 0xff);
        __pointee_pVoice.enveShortAttackCount = ((0) & 0xffff);
    }
    function method_sidOperator_set(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = runtime.dereference(voice);
        const h_masterVolumeLevels = members.masterVolumeLevels ?? runtime.member("masterVolumeLevels");
        __pointee_voice.SIDfreq = ((((__pointee_voice.reg[0]) | (((__pointee_voice.reg[1]) << (8))))) >>> 0);
        __pointee_voice.SIDpulseWidth = ((((((__pointee_voice.reg[2]) | (((__pointee_voice.reg[3]) << (8))))) & (4095))) & 0xffff);
        __pointee_voice.newPulseIndex = ((((4096) - (__pointee_voice.SIDpulseWidth))) & 0xffff);
        if ((((((Number(((__pointee_voice.waveStep) + (__pointee_voice.pulseIndex))) >= Number(4096)) ? 1 : 0)) && (((Number(((__pointee_voice.waveStep) + (__pointee_voice.newPulseIndex))) >= Number(4096)) ? 1 : 0))) ? 1 : 0)) {
            __pointee_voice.pulseIndex = ((__pointee_voice.newPulseIndex) & 0xffff);
        }
        else {
            if ((((((Number(((__pointee_voice.waveStep) + (__pointee_voice.pulseIndex))) < Number(4096)) ? 1 : 0)) && (((Number(((__pointee_voice.waveStep) + (__pointee_voice.newPulseIndex))) < Number(4096)) ? 1 : 0))) ? 1 : 0)) {
                __pointee_voice.pulseIndex = ((__pointee_voice.newPulseIndex) & 0xffff);
            }
        }
        let oldWave = ((__pointee_voice.SIDctrl) & 0xff);
        let newWave = ((((__pointee_voice.reg[4]) | (((__pointee_voice.reg[5]) << (8))))) & 0xff);
        let enveTemp = ((__pointee_voice.ADSRctrl) & 0xff);
        __pointee_voice.SIDctrl = ((newWave) & 0xff);
        if (((((newWave) & (1))) ? 0 : 1)) {
            if (((oldWave) & (1))) {
                enveTemp = ((2) & 0xff);
            }
        }
        else {
            if (((((oldWave) & (1))) ? 0 : 1)) {
                enveTemp = ((0) & 0xff);
            }
        }
        if (((((oldWave) ^ (newWave))) & (240))) {
            __pointee_voice.cycleLenCount = ((0) | 0);
        }
        let ADtemp = ((__pointee_voice.reg[5]) & 0xff);
        let SRtemp = ((__pointee_voice.reg[6]) & 0xff);
        if (((Number(__pointee_voice.SIDAD) !== Number(ADtemp)) ? 1 : 0)) {
            enveTemp = ((((enveTemp) | (32))) & 0xff);
        }
        else {
            if (((Number(__pointee_voice.SIDSR) !== Number(SRtemp)) ? 1 : 0)) {
                enveTemp = ((((enveTemp) | (32))) & 0xff);
            }
        }
        __pointee_voice.SIDAD = ((ADtemp) & 0xff);
        __pointee_voice.SIDSR = ((SRtemp) & 0xff);
        let tmpSusVol = ((h_masterVolumeLevels[((SRtemp) >>> (4))]) & 0xff);
        if (((Number(__pointee_voice.ADSRctrl) !== Number(8)) ? 1 : 0)) {
            __pointee_voice.enveSusVol = ((tmpSusVol) & 0xff);
        }
        else {
            if (((Number(__pointee_voice.enveSusVol) > Number(__pointee_voice.enveVol)) ? 1 : 0)) {
                __pointee_voice.enveSusVol = ((0) & 0xff);
            }
            else {
                __pointee_voice.enveSusVol = ((tmpSusVol) & 0xff);
            }
        }
        __pointee_voice.ADSRproc = (members.enveModeTable ?? runtime.member("enveModeTable"))[((enveTemp) >>> (1))];
        __pointee_voice.ADSRctrl = ((((enveTemp) & (((((255) - (32))) - (1))))) & 0xff);
        __pointee_voice.filtEnabled = (((((runtime.dereference(__pointee_voice.sid).filter.Enabled) && (((runtime.dereference(__pointee_voice.sid).reg[23]) & (__pointee_voice.filtVoiceMask)))) ? 1 : 0)) | 0);
    }
    function method_sidOperator_set2(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = runtime.dereference(voice);
        __pointee_voice.outProc = method_sidOperator_wave_calc_normal.bind(undefined, runtime);
        __pointee_voice.sync = ((0) | 0);
        if ((((((Number(__pointee_voice.SIDfreq) < Number(16)) ? 1 : 0)) || (((__pointee_voice.SIDctrl) & (8)))) ? 1 : 0)) {
            __pointee_voice.outProc = method_waveCalcMute.bind(undefined, runtime);
            if (((Number(__pointee_voice.SIDfreq) === Number(0)) ? 1 : 0)) {
                __pointee_voice.cycleLen = (((__pointee_voice.cycleLenPnt = ((0) & 0xffff))) & 0xffff);
                __pointee_voice.cycleAddLenPnt = ((0) >>> 0);
                __pointee_voice.waveStep = ((0) & 0xffff);
                __pointee_voice.waveStepPnt = ((0) >>> 0);
                __pointee_voice.curSIDfreq = (((__pointee_voice.curNoiseFreq = ((0) & 0xffff))) & 0xffff);
                __pointee_voice.noiseStepAdd = ((0) >>> 0);
                __pointee_voice.cycleLenCount = ((0) | 0);
            }
            if (((__pointee_voice.SIDctrl) & (8))) {
                if (__pointee_voice.noiseIsLocked) {
                    __pointee_voice.noiseIsLocked = ((0) | 0);
                    __pointee_voice.noiseReg = ((8388600) >>> 0);
                }
            }
        }
        else {
            if (((Number(__pointee_voice.curSIDfreq) !== Number(__pointee_voice.SIDfreq)) ? 1 : 0)) {
                __pointee_voice.curSIDfreq = ((__pointee_voice.SIDfreq) & 0xffff);
                __pointee_voice.cycleLen = ((runtime.divide(runtime.dereference(__pointee_voice.sid).PCMsid, __pointee_voice.SIDfreq)) & 0xffff);
                __pointee_voice.cycleLenPnt = ((runtime.divide(((((runtime.dereference(__pointee_voice.sid).PCMsid) % (__pointee_voice.SIDfreq))) * (65536)), __pointee_voice.SIDfreq)) & 0xffff);
                if (((Number(__pointee_voice.cycleLenCount) > Number(0)) ? 1 : 0)) {
                    method_sidOperator_wave_calc_cycle_len(runtime, voice);
                    __pointee_voice.outProc = method_waveCalcRangeCheck.bind(undefined, runtime);
                }
            }
            if ((((((__pointee_voice.SIDctrl) & (128))) && (((Number(__pointee_voice.curNoiseFreq) !== Number(__pointee_voice.SIDfreq)) ? 1 : 0))) ? 1 : 0)) {
                __pointee_voice.curNoiseFreq = ((__pointee_voice.SIDfreq) & 0xffff);
                __pointee_voice.noiseStepAdd = ((((((runtime.dereference(__pointee_voice.sid).PCMsidNoise) * (__pointee_voice.SIDfreq))) >>> (8))) >>> 0);
                if (((Number(__pointee_voice.noiseStepAdd) >= Number(2097152)) ? 1 : 0)) {
                    (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[8] = method_sidMode80hp.bind(undefined, runtime);
                }
                else {
                    (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[8] = method_sidMode80.bind(undefined, runtime);
                }
            }
            if (((__pointee_voice.SIDctrl) & (2))) {
                if ((((((runtime.dereference(__pointee_voice.modulator).SIDfreq) ? 0 : 1)) || (((runtime.dereference(__pointee_voice.modulator).SIDctrl) & (8)))) ? 1 : 0)) {
                }
                else {
                    if ((((((runtime.dereference(__pointee_voice.carrier).SIDctrl) & (2))) && (((Number(runtime.dereference(__pointee_voice.modulator).SIDfreq) >= Number(((__pointee_voice.SIDfreq) << (1)))) ? 1 : 0))) ? 1 : 0)) {
                    }
                    else {
                        __pointee_voice.sync = ((1) | 0);
                    }
                }
            }
            if ((((((Number(((__pointee_voice.SIDctrl) & (20))) === Number(20)) ? 1 : 0)) && (runtime.dereference(__pointee_voice.modulator).SIDfreq)) ? 1 : 0)) {
                __pointee_voice.waveProc = (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[((__pointee_voice.SIDctrl) >>> (4))];
            }
            else {
                __pointee_voice.waveProc = (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[((__pointee_voice.SIDctrl) >>> (4))];
            }
        }
    }
    function method_sidOperator_wave_calc_cycle_len(runtime, voice) {
        const members = runtime.members;
        const __pointee_voice = runtime.dereference(voice);
        __pointee_voice.cycleAddLenPnt = ((((__pointee_voice.cycleAddLenPnt) + (__pointee_voice.cycleLenPnt))) >>> 0);
        __pointee_voice.cycleLenCount = ((__pointee_voice.cycleLen) | 0);
        if (((Number(__pointee_voice.cycleAddLenPnt) > Number(65535)) ? 1 : 0)) {
            __pointee_voice.cycleLenCount = ((((__pointee_voice.cycleLenCount) + (1))) | 0);
        }
        __pointee_voice.cycleAddLenPnt = ((runtime.andAssign(__pointee_voice.cycleAddLenPnt, 65535)) >>> 0);
        let diff = ((((__pointee_voice.cycleLenCount) - (__pointee_voice.cycleLen))) & 0xffff);
        if (((Number(runtime.readIndex(__pointee_voice.wavePre, diff).len) !== Number(__pointee_voice.cycleLenCount)) ? 1 : 0)) {
            runtime.readIndex(__pointee_voice.wavePre, diff).len = ((__pointee_voice.cycleLenCount) & 0xffff);
            runtime.readIndex(__pointee_voice.wavePre, diff).stp = (((__pointee_voice.waveStepAdd = ((runtime.divide(4096, __pointee_voice.cycleLenCount)) & 0xffff))) << 16 >> 16);
            runtime.readIndex(__pointee_voice.wavePre, diff).pnt = (((__pointee_voice.waveStepAddPnt = ((runtime.divide(((((4096) % (__pointee_voice.cycleLenCount))) * (65536)), __pointee_voice.cycleLenCount)) >>> 0))) >>> 0);
        }
        else {
            __pointee_voice.waveStepAdd = ((runtime.readIndex(__pointee_voice.wavePre, diff).stp) & 0xffff);
            __pointee_voice.waveStepAddPnt = ((runtime.readIndex(__pointee_voice.wavePre, diff).pnt) >>> 0);
        }
    }
    function method_postload(runtime) {
        const members = runtime.members;
        const h_optr = members.optr ?? runtime.member("optr");
        for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            method_sidOperator_set(runtime, runtime.addressOf(h_optr, v));
            method_sidOperator_set2(runtime, runtime.addressOf(h_optr, v));
        }
    }
    function method_init(runtime) {
        const members = runtime.members;
        const h_optr = members.optr ?? runtime.member("optr");
        const h_filter = members.filter ?? runtime.member("filter");
        for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
            h_optr[v].sid = (members.this ?? runtime.member("this"));
            let mod_voi = ((((((((v) + (3))) - (1))) % (3))) & 0xff);
            h_optr[v].modulator = runtime.addressOf(h_optr, mod_voi);
            h_optr[mod_voi].carrier = runtime.addressOf(h_optr, v);
            h_optr[v].filtVoiceMask = ((((1) << (v))) << 24 >> 24);
        }
        members.PCMsid = (((((((members.PCMfreq ?? runtime.member("PCMfreq"))) * (((16777216) / ((members.clock ?? runtime.member("clock"))))))) >>> 0)) >>> 0);
        members.PCMsidNoise = (((((((((members.clock ?? runtime.member("clock"))) * (256))) / ((members.PCMfreq ?? runtime.member("PCMfreq"))))) >>> 0)) >>> 0);
        h_filter.Enabled = ((1) | 0);
        method_sidInitMixerEngine(runtime, (typeof (runtime.dereference((members.device ?? runtime.member("device")))).machine === 'function' ? (runtime.dereference((members.device ?? runtime.member("device")))).machine() : typeof (runtime.dereference((members.device ?? runtime.member("device")))).machine === 'number' || typeof (runtime.dereference((members.device ?? runtime.member("device")))).machine === 'boolean' ? (runtime.dereference((members.device ?? runtime.member("device")))).machine : runtime.container((members.device ?? runtime.member("device")), "machine")));
        method_filterTableInit(runtime, (typeof (runtime.dereference((members.device ?? runtime.member("device")))).machine === 'function' ? (runtime.dereference((members.device ?? runtime.member("device")))).machine() : typeof (runtime.dereference((members.device ?? runtime.member("device")))).machine === 'number' || typeof (runtime.dereference((members.device ?? runtime.member("device")))).machine === 'boolean' ? (runtime.dereference((members.device ?? runtime.member("device")))).machine : runtime.container((members.device ?? runtime.member("device")), "machine")));
        method_sidInitWaveformTables(runtime, (members.type ?? runtime.member("type")));
        method_enveEmuInit(runtime, (members.PCMfreq ?? runtime.member("PCMfreq")), 1);
        method_reset(runtime);
    }
    function method_sidInitMixerEngine(runtime, machine) {
        const members = runtime.members;
        let filterAmpl = 0.7;
        let uk = ((0) & 0xffff);
        for (let si = ((0) | 0); ((Number(si) < Number(256)) ? 1 : 0); si = ((((si) + (1))) | 0)) {
            for (let sj = ((-128) | 0); ((Number(sj) < Number(128)) ? 1 : 0); sj = ((((sj) + (1))) | 0), uk = ((((uk) + (1))) & 0xffff)) {
                (members.ampMod1x8 ?? runtime.member("ampMod1x8"))[uk] = ((((runtime.divide(((si) * (sj)), 255)) * (filterAmpl))) << 24 >> 24);
            }
        }
    }
    function method_filterTableInit(runtime, machine) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let sample_rate = (((typeof (runtime.dereference(machine)).sample_rate === 'function' ? (runtime.dereference(machine)).sample_rate() : typeof (runtime.dereference(machine)).sample_rate === 'number' || typeof (runtime.dereference(machine)).sample_rate === 'boolean' ? (runtime.dereference(machine)).sample_rate : runtime.container(machine, "sample_rate"))) | 0);
        let uk = ((0) & 0xffff);
        let filterRefFreq = 44100;
        let yMax = 1;
        let yMin = 0.01;
        let yAdd = 0;
        let yTmp = 0;
        let rk = 0;
        let rk2 = 0;
        let resDyMax = 0;
        let resDyMin = 0;
        let resDy = 0;
        uk = ((0) & 0xffff);
        for (rk = 0; ((Number(rk) < Number(2048)) ? 1 : 0); rk = ((rk) + (1))) {
            (members.filterTable ?? runtime.member("filterTable"))[uk] = ((((runtime.add((((__l["expf"] ? __l["expf"](((((rk) / (2048))) * ((__l["logf"] ? __l["logf"](400) : runtime.macro("logf", 400))))) : runtime.macro("expf", ((((rk) / (2048))) * ((__l["logf"] ? __l["logf"](400) : runtime.macro("logf", 400))))))) / (60)), 0.05)) * (filterRefFreq))) / (sample_rate));
            if (((Number((members.filterTable ?? runtime.member("filterTable"))[uk]) < Number(yMin)) ? 1 : 0)) {
                (members.filterTable ?? runtime.member("filterTable"))[uk] = yMin;
            }
            if (((Number((members.filterTable ?? runtime.member("filterTable"))[uk]) > Number(yMax)) ? 1 : 0)) {
                (members.filterTable ?? runtime.member("filterTable"))[uk] = yMax;
            }
            uk = ((((uk) + (1))) & 0xffff);
        }
        yMax = 0.22;
        yMin = 0.05;
        yAdd = ((((yMax) - (yMin))) / (2048));
        yTmp = yMin;
        uk = ((0) & 0xffff);
        for (rk2 = 0; ((Number(rk2) < Number(2048)) ? 1 : 0); rk2 = ((rk2) + (1))) {
            (members.bandPassParam ?? runtime.member("bandPassParam"))[uk] = ((((yTmp) * (filterRefFreq))) / (sample_rate));
            yTmp = ((yTmp) + (yAdd));
            uk = ((((uk) + (1))) & 0xffff);
        }
        resDyMax = 1;
        resDyMin = 2;
        resDy = resDyMin;
        for (uk = ((0) & 0xffff); ((Number(uk) < Number(16)) ? 1 : 0); uk = ((((uk) + (1))) & 0xffff)) {
            (members.filterResTable ?? runtime.member("filterResTable"))[uk] = resDy;
            resDy = ((resDy) - (((((resDyMin) - (resDyMax))) / (15))));
        }
        (members.filterResTable ?? runtime.member("filterResTable"))[0] = resDyMin;
        (members.filterResTable ?? runtime.member("filterResTable"))[15] = resDyMax;
    }
    function method_sidInitWaveformTables(runtime, type) {
        const members = runtime.members;
        const h_waveform30_8580 = members.waveform30_8580 ?? runtime.member("waveform30_8580");
        const h_waveform50_8580 = members.waveform50_8580 ?? runtime.member("waveform50_8580");
        const h_waveform60_8580 = members.waveform60_8580 ?? runtime.member("waveform60_8580");
        const h_waveform70_8580 = members.waveform70_8580 ?? runtime.member("waveform70_8580");
        const h_waveform30_6581 = members.waveform30_6581 ?? runtime.member("waveform30_6581");
        const h_waveform50_6581 = members.waveform50_6581 ?? runtime.member("waveform50_6581");
        const h_waveform60_6581 = members.waveform60_6581 ?? runtime.member("waveform60_6581");
        const h_waveform70_6581 = members.waveform70_6581 ?? runtime.member("waveform70_6581");
        let i = ((0) | 0);
        let j = ((0) | 0);
        let k = ((0) & 0xffff);
        k = ((0) & 0xffff);
        for (i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            for (j = ((0) | 0); ((Number(j) < Number(8)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                (members.triangleTable ?? runtime.member("triangleTable"))[(() => { const previous = k; k = ((((k) + (1))) & 0xffff); return previous; })()] = i;
            }
        }
        for (i = ((255) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            for (j = ((0) | 0); ((Number(j) < Number(8)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                (members.triangleTable ?? runtime.member("triangleTable"))[(() => { const previous = k; k = ((((k) + (1))) & 0xffff); return previous; })()] = i;
            }
        }
        k = ((0) & 0xffff);
        for (i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            for (j = ((0) | 0); ((Number(j) < Number(16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                (members.sawtoothTable ?? runtime.member("sawtoothTable"))[(() => { const previous = k; k = ((((k) + (1))) & 0xffff); return previous; })()] = i;
            }
        }
        k = ((0) & 0xffff);
        for (i = ((0) | 0); ((Number(i) < Number(4096)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (members.squareTable ?? runtime.member("squareTable"))[(() => { const previous = k; k = ((((k) + (1))) & 0xffff); return previous; })()] = 255;
        }
        for (i = ((0) | 0); ((Number(i) < Number(4096)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (members.squareTable ?? runtime.member("squareTable"))[(() => { const previous = k; k = ((((k) + (1))) & 0xffff); return previous; })()] = 0;
        }
        if (((Number(type) === Number(1)) ? 1 : 0)) {
            members.waveform30 = h_waveform30_8580;
            members.waveform50 = h_waveform50_8580;
            members.waveform60 = h_waveform60_8580;
            members.waveform70 = h_waveform70_8580;
        }
        else {
            members.waveform30 = h_waveform30_6581;
            members.waveform50 = h_waveform50_6581;
            members.waveform60 = h_waveform60_6581;
            members.waveform70 = h_waveform70_6581;
        }
        if (((Number(type) === Number(1)) ? 1 : 0)) {
            (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[3] = method_sidMode30.bind(undefined, runtime);
            (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[6] = method_sidMode60.bind(undefined, runtime);
            (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[7] = method_sidMode70.bind(undefined, runtime);
            (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[7] = method_sidMode74.bind(undefined, runtime);
        }
        else {
            (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[3] = method_sidMode30.bind(undefined, runtime);
            (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[6] = method_sidMode60.bind(undefined, runtime);
            (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[7] = method_sidMode00.bind(undefined, runtime);
            (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[7] = method_sidMode00.bind(undefined, runtime);
        }
        let ni = ((0) >>> 0);
        for (ni = ((0) >>> 0); ((Number(ni) < Number(256)) ? 1 : 0); ni = ((((ni) + (1))) >>> 0)) {
            (members.noiseTableLSB ?? runtime.member("noiseTableLSB"))[ni] = ((((((((((ni) >>> (5))) & (4))) | (((((ni) >>> (3))) & (2))))) | (((((ni) >>> (2))) & (1))))) & 0xff);
        }
        for (ni = ((0) >>> 0); ((Number(ni) < Number(256)) ? 1 : 0); ni = ((((ni) + (1))) >>> 0)) {
            (members.noiseTableMID ?? runtime.member("noiseTableMID"))[ni] = ((((((((ni) >>> (1))) & (16))) | (((((ni) << (0))) & (8))))) & 0xff);
        }
        for (ni = ((0) >>> 0); ((Number(ni) < Number(256)) ? 1 : 0); ni = ((((ni) + (1))) >>> 0)) {
            (members.noiseTableMSB ?? runtime.member("noiseTableMSB"))[ni] = ((((((((((ni) << (1))) & (128))) | (((((ni) << (2))) & (64))))) | (((((ni) << (5))) & (32))))) & 0xff);
        }
    }
    function method_enveEmuInit(runtime, updateFreq, measuredValues) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_releaseTab = members.releaseTab ?? runtime.member("releaseTab");
        const h_masterVolumeLevels = members.masterVolumeLevels ?? runtime.member("masterVolumeLevels");
        const h_attackTimes = members.attackTimes ?? runtime.member("attackTimes");
        const h_decayReleaseTimes = members.decayReleaseTimes ?? runtime.member("decayReleaseTimes");
        let i = ((0) >>> 0);
        let j = ((0) >>> 0);
        let k = ((0) >>> 0);
        members.releaseTabLen = ((1571) >>> 0);
        for (i = ((0) >>> 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            j = ((0) >>> 0);
            while ((((((Number(j) < Number((members.releaseTabLen ?? runtime.member("releaseTabLen")))) ? 1 : 0)) && (((Number(h_releaseTab[j]) > Number(i)) ? 1 : 0))) ? 1 : 0)) {
                j = ((((j) + (1))) >>> 0);
            }
            if (((Number(j) < Number((members.releaseTabLen ?? runtime.member("releaseTabLen")))) ? 1 : 0)) {
                (members.releasePos ?? runtime.member("releasePos"))[i] = j;
            }
            else {
                (members.releasePos ?? runtime.member("releasePos"))[i] = (((members.releaseTabLen ?? runtime.member("releaseTabLen"))) - (1));
            }
        }
        k = ((0) >>> 0);
        for (i = ((0) >>> 0); ((Number(i) < Number(16)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            for (j = ((0) >>> 0); ((Number(j) < Number(256)) ? 1 : 0); j = ((((j) + (1))) >>> 0)) {
                let tmpVol = ((j) & 0xffff);
                if (measuredValues) {
                    tmpVol = ((((runtime.add(((293) * (((1) - ((__l["exp"] ? __l["exp"](((j) / ((-130)))) : runtime.macro("exp", ((j) / ((-130))))))))), 4)) & 0xffff)) & 0xffff);
                    if (((Number(j) === Number(0)) ? 1 : 0)) {
                        tmpVol = ((0) & 0xffff);
                    }
                    if (((Number(tmpVol) > Number(255)) ? 1 : 0)) {
                        tmpVol = ((255) & 0xffff);
                    }
                }
                (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[(() => { const previous = k; k = ((((k) + (1))) >>> 0); return previous; })()] = ((runtime.divide(((tmpVol) * (h_masterVolumeLevels[i])), 255)) << (8));
            }
        }
        for (i = ((0) >>> 0); ((Number(i) < Number(16)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            let scaledenvelen = ((((runtime.divide(((h_attackTimes[i]) * (updateFreq)), 1000)) >>> 0)) >>> 0);
            if (((Number(scaledenvelen) === Number(0)) ? 1 : 0)) {
                scaledenvelen = ((1) >>> 0);
            }
            (members.attackRates ?? runtime.member("attackRates"))[i] = runtime.divide(255, scaledenvelen);
            (members.attackRatesP ?? runtime.member("attackRatesP"))[i] = runtime.divide(((((255) % (scaledenvelen))) * (65536)), scaledenvelen);
            scaledenvelen = ((((runtime.divide(((h_decayReleaseTimes[i]) * (updateFreq)), 1000)) >>> 0)) >>> 0);
            if (((Number(scaledenvelen) === Number(0)) ? 1 : 0)) {
                scaledenvelen = ((1) >>> 0);
            }
            (members.decayReleaseRates ?? runtime.member("decayReleaseRates"))[i] = runtime.divide((members.releaseTabLen ?? runtime.member("releaseTabLen")), scaledenvelen);
            (members.decayReleaseRatesP ?? runtime.member("decayReleaseRatesP"))[i] = runtime.divide((((((members.releaseTabLen ?? runtime.member("releaseTabLen"))) % (scaledenvelen))) * (65536)), scaledenvelen);
        }
    }
    function method_port_w(runtime, offset, data) {
        const members = runtime.members;
        const h_optr = members.optr ?? runtime.member("optr");
        const h_filter = members.filter ?? runtime.member("filter");
        offset = ((runtime.andAssign(offset, 31)) | 0);
        switch (offset) {
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
                {
                    break;
                }
            case 21:
            case 22:
            case 23:
            case 24:
                {
                    (typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'function' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update() : typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'number' || typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'boolean' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update : runtime.container((members.mixer_channel ?? runtime.member("mixer_channel")), "update"));
                    (members.reg ?? runtime.member("reg"))[offset] = data;
                    members.masterVolume = (((((members.reg ?? runtime.member("reg"))[24]) & (15))) & 0xff);
                    members.masterVolumeAmplIndex = (((((members.masterVolume ?? runtime.member("masterVolume"))) << (8))) & 0xffff);
                    if (((((((members.reg ?? runtime.member("reg"))[24]) & (128))) && ((((((members.reg ?? runtime.member("reg"))[23]) & (h_optr[2].filtVoiceMask))) ? 0 : 1))) ? 1 : 0)) {
                        members.optr3_outputmask = ((0) | 0);
                    }
                    else {
                        members.optr3_outputmask = ((-1) | 0);
                    }
                    h_filter.Type = (((((members.reg ?? runtime.member("reg"))[24]) & (112))) & 0xff);
                    if (((Number(h_filter.Type) !== Number(h_filter.CurType)) ? 1 : 0)) {
                        h_filter.CurType = ((h_filter.Type) & 0xff);
                        for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
                            h_optr[v].filtLow = (h_optr[v].filtRef = 0);
                        }
                    }
                    if (h_filter.Enabled) {
                        h_filter.Value = ((((2047) & ((((((members.reg ?? runtime.member("reg"))[21]) & (7))) | ((((((members.reg ?? runtime.member("reg"))[22]) & 0xffff)) << (3))))))) & 0xffff);
                        if (((Number(h_filter.Type) === Number(32)) ? 1 : 0)) {
                            h_filter.Dy = (((members.bandPassParam ?? runtime.member("bandPassParam"))) ? ((members.bandPassParam ?? runtime.member("bandPassParam"))[h_filter.Value]) : (0));
                        }
                        else {
                            h_filter.Dy = (((members.filterTable ?? runtime.member("filterTable"))) ? ((members.filterTable ?? runtime.member("filterTable"))[h_filter.Value]) : (0));
                        }
                        h_filter.ResDy = (((members.filterResTable ?? runtime.member("filterResTable"))[(((members.reg ?? runtime.member("reg"))[23]) >>> (4))]) - (h_filter.Dy));
                        if (((Number(h_filter.ResDy) < Number(1)) ? 1 : 0)) {
                            h_filter.ResDy = 1;
                        }
                    }
                    for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
                        method_sidOperator_set(runtime, runtime.addressOf(h_optr, v));
                        method_sidOperator_set2(runtime, runtime.addressOf(h_optr, v));
                    }
                    break;
                }
            default:
                {
                    (typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'function' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update() : typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'number' || typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'boolean' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update : runtime.container((members.mixer_channel ?? runtime.member("mixer_channel")), "update"));
                    (members.reg ?? runtime.member("reg"))[offset] = data;
                    if (((Number(offset) < Number(7)) ? 1 : 0)) {
                        h_optr[0].reg[offset] = data;
                    }
                    else {
                        if (((Number(offset) < Number(14)) ? 1 : 0)) {
                            h_optr[1].reg[((offset) - (7))] = data;
                        }
                        else {
                            if (((Number(offset) < Number(21)) ? 1 : 0)) {
                                h_optr[2].reg[((offset) - (14))] = data;
                            }
                        }
                    }
                    for (let v = ((0) | 0); ((Number(v) < Number(3)) ? 1 : 0); v = ((((v) + (1))) | 0)) {
                        method_sidOperator_set(runtime, runtime.addressOf(h_optr, v));
                        method_sidOperator_set2(runtime, runtime.addressOf(h_optr, v));
                    }
                    break;
                }
        }
    }
    function method_port_r(runtime, machine, offset) {
        const members = runtime.members;
        const h_optr = members.optr ?? runtime.member("optr");
        let data = ((0) | 0);
        offset = ((runtime.andAssign(offset, 31)) | 0);
        switch (offset) {
            case 29:
            case 30:
            case 31:
                {
                    data = ((255) | 0);
                    break;
                }
            case 27:
                {
                    (typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'function' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update() : typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'number' || typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'boolean' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update : runtime.container((members.mixer_channel ?? runtime.member("mixer_channel")), "update"));
                    data = ((h_optr[2].output) | 0);
                    break;
                }
            case 28:
                {
                    (typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'function' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update() : typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'number' || typeof (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update === 'boolean' ? (runtime.dereference((members.mixer_channel ?? runtime.member("mixer_channel")))).update : runtime.container((members.mixer_channel ?? runtime.member("mixer_channel")), "update"));
                    data = ((h_optr[2].enveVol) | 0);
                    break;
                }
            default:
                {
                    data = (((members.reg ?? runtime.member("reg"))[offset]) | 0);
                }
        }
        return data;
    }
    function method_sidOperator_wave_calc_normal(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (((Number(__pointee_pVoice.cycleLenCount) <= Number(0)) ? 1 : 0)) {
            method_sidOperator_wave_calc_cycle_len(runtime, pVoice);
            if (((__pointee_pVoice.SIDctrl) & (64))) {
                __pointee_pVoice.pulseIndex = ((__pointee_pVoice.newPulseIndex) & 0xffff);
                if (((Number(__pointee_pVoice.pulseIndex) > Number(2048)) ? 1 : 0)) {
                    __pointee_pVoice.waveStep = ((0) & 0xffff);
                }
            }
        }
        runtime.dereference(__pointee_pVoice.waveProc)(pVoice);
        __pointee_pVoice.filtIO = (((members.ampMod1x8 ?? runtime.member("ampMod1x8"))[((runtime.dereference(__pointee_pVoice.ADSRproc)(pVoice)) | (__pointee_pVoice.output))]) << 24 >> 24);
        method_waveCalcFilter(runtime, pVoice);
        return __pointee_pVoice.filtIO;
    }
    function method_waveCalcFilter(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (__pointee_pVoice.filtEnabled) {
            if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) !== Number(0)) ? 1 : 0)) {
                if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) === Number(32)) ? 1 : 0)) {
                    let tmp = 0;
                    __pointee_pVoice.filtLow = ((__pointee_pVoice.filtLow) + (((__pointee_pVoice.filtRef) * (runtime.dereference(__pointee_pVoice.sid).filter.Dy))));
                    tmp = ((((__pointee_pVoice.filtIO) - (__pointee_pVoice.filtLow))) | 0);
                    tmp = ((((tmp) - (((__pointee_pVoice.filtRef) * (runtime.dereference(__pointee_pVoice.sid).filter.ResDy))))) | 0);
                    __pointee_pVoice.filtRef = ((__pointee_pVoice.filtRef) + (((tmp) * (runtime.dereference(__pointee_pVoice.sid).filter.Dy))));
                    __pointee_pVoice.filtIO = ((((((__pointee_pVoice.filtRef) - (runtime.divide(__pointee_pVoice.filtLow, 4)))) << 24 >> 24)) << 24 >> 24);
                }
                else {
                    if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) === Number(64)) ? 1 : 0)) {
                        let tmp = 0;
                        let tmp2 = 0;
                        __pointee_pVoice.filtLow = ((__pointee_pVoice.filtLow) + (((((__pointee_pVoice.filtRef) * (runtime.dereference(__pointee_pVoice.sid).filter.Dy))) * (0.1))));
                        tmp = ((((__pointee_pVoice.filtIO) - (__pointee_pVoice.filtLow))) | 0);
                        tmp = ((((tmp) - (((__pointee_pVoice.filtRef) * (runtime.dereference(__pointee_pVoice.sid).filter.ResDy))))) | 0);
                        __pointee_pVoice.filtRef = ((__pointee_pVoice.filtRef) + (((tmp) * (runtime.dereference(__pointee_pVoice.sid).filter.Dy))));
                        tmp2 = ((__pointee_pVoice.filtRef) - (runtime.divide(__pointee_pVoice.filtIO, 8)));
                        if (((Number(tmp2) < Number(-128)) ? 1 : 0)) {
                            tmp2 = -128;
                        }
                        if (((Number(tmp2) > Number(127)) ? 1 : 0)) {
                            tmp2 = 127;
                        }
                        __pointee_pVoice.filtIO = ((((tmp2) << 24 >> 24)) << 24 >> 24);
                    }
                    else {
                        let sample = 0;
                        let sample2 = 0;
                        let tmp = ((0) | 0);
                        __pointee_pVoice.filtLow = ((__pointee_pVoice.filtLow) + (((__pointee_pVoice.filtRef) * (runtime.dereference(__pointee_pVoice.sid).filter.Dy))));
                        sample = __pointee_pVoice.filtIO;
                        sample2 = ((sample) - (__pointee_pVoice.filtLow));
                        tmp = ((((sample2) | 0)) | 0);
                        sample2 = ((sample2) - (((__pointee_pVoice.filtRef) * (runtime.dereference(__pointee_pVoice.sid).filter.ResDy))));
                        __pointee_pVoice.filtRef = ((__pointee_pVoice.filtRef) + (((sample2) * (runtime.dereference(__pointee_pVoice.sid).filter.Dy))));
                        if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) === Number(16)) ? 1 : 0)) {
                            __pointee_pVoice.filtIO = ((((__pointee_pVoice.filtLow) << 24 >> 24)) << 24 >> 24);
                        }
                        else {
                            if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) === Number(48)) ? 1 : 0)) {
                                __pointee_pVoice.filtIO = ((((__pointee_pVoice.filtLow) << 24 >> 24)) << 24 >> 24);
                            }
                            else {
                                if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) === Number(80)) ? 1 : 0)) {
                                    __pointee_pVoice.filtIO = ((((((sample) - (((tmp) >>> (1))))) << 24 >> 24)) << 24 >> 24);
                                }
                                else {
                                    if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) === Number(96)) ? 1 : 0)) {
                                        __pointee_pVoice.filtIO = ((((tmp) << 24 >> 24)) << 24 >> 24);
                                    }
                                    else {
                                        if (((Number(runtime.dereference(__pointee_pVoice.sid).filter.Type) === Number(112)) ? 1 : 0)) {
                                            __pointee_pVoice.filtIO = ((((((sample) - (((tmp) >>> (1))))) << 24 >> 24)) << 24 >> 24);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                __pointee_pVoice.filtIO = ((0) << 24 >> 24);
            }
        }
    }
    function method_waveAdvance(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.waveStepPnt = ((((__pointee_pVoice.waveStepPnt) + (__pointee_pVoice.waveStepAddPnt))) >>> 0);
        __pointee_pVoice.waveStep = ((((__pointee_pVoice.waveStep) + (__pointee_pVoice.waveStepAdd))) & 0xffff);
        if (((Number(__pointee_pVoice.waveStepPnt) > Number(65535)) ? 1 : 0)) {
            __pointee_pVoice.waveStep = ((((__pointee_pVoice.waveStep) + (1))) & 0xffff);
        }
        __pointee_pVoice.waveStepPnt = ((runtime.andAssign(__pointee_pVoice.waveStepPnt, 65535)) >>> 0);
        __pointee_pVoice.waveStep = ((runtime.andAssign(__pointee_pVoice.waveStep, 4095)) & 0xffff);
    }
    function method_noiseAdvance(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) + (__pointee_pVoice.noiseStepAdd))) >>> 0);
        if (((Number(__pointee_pVoice.noiseStep) >= Number(1048576)) ? 1 : 0)) {
            __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) - (1048576))) >>> 0);
            __pointee_pVoice.noiseReg = ((((((__pointee_pVoice.noiseReg) << (1))) | (((((((__pointee_pVoice.noiseReg) >>> (22))) ^ (((__pointee_pVoice.noiseReg) >>> (17))))) & (1))))) >>> 0);
            __pointee_pVoice.noiseOutput = (((((((members.noiseTableLSB ?? runtime.member("noiseTableLSB"))[((__pointee_pVoice.noiseReg) & (255))]) | ((members.noiseTableMID ?? runtime.member("noiseTableMID"))[((((__pointee_pVoice.noiseReg) >>> (8))) & (255))]))) | ((members.noiseTableMSB ?? runtime.member("noiseTableMSB"))[((((__pointee_pVoice.noiseReg) >>> (16))) & (255))]))) & 0xff);
        }
    }
    function method_noiseAdvanceHp(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        let tmp = ((__pointee_pVoice.noiseStepAdd) >>> 0);
        while (((Number(tmp) >= Number(1048576)) ? 1 : 0)) {
            tmp = ((((tmp) - (1048576))) >>> 0);
            __pointee_pVoice.noiseReg = ((((((__pointee_pVoice.noiseReg) << (1))) | (((((((__pointee_pVoice.noiseReg) >>> (22))) ^ (((__pointee_pVoice.noiseReg) >>> (17))))) & (1))))) >>> 0);
        }
        __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) + (tmp))) >>> 0);
        if (((Number(__pointee_pVoice.noiseStep) >= Number(1048576)) ? 1 : 0)) {
            __pointee_pVoice.noiseStep = ((((__pointee_pVoice.noiseStep) - (1048576))) >>> 0);
            __pointee_pVoice.noiseReg = ((((((__pointee_pVoice.noiseReg) << (1))) | (((((((__pointee_pVoice.noiseReg) >>> (22))) ^ (((__pointee_pVoice.noiseReg) >>> (17))))) & (1))))) >>> 0);
        }
        __pointee_pVoice.noiseOutput = (((((((members.noiseTableLSB ?? runtime.member("noiseTableLSB"))[((__pointee_pVoice.noiseReg) & (255))]) | ((members.noiseTableMID ?? runtime.member("noiseTableMID"))[((((__pointee_pVoice.noiseReg) >>> (8))) & (255))]))) | ((members.noiseTableMSB ?? runtime.member("noiseTableMSB"))[((((__pointee_pVoice.noiseReg) >>> (16))) & (255))]))) & 0xff);
    }
    function method_sidMode00(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = ((((__pointee_pVoice.filtIO) - (128))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode10(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = (((members.triangleTable ?? runtime.member("triangleTable"))[__pointee_pVoice.waveStep]) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode20(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = (((members.sawtoothTable ?? runtime.member("sawtoothTable"))[__pointee_pVoice.waveStep]) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode30(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform30 ?? runtime.member("waveform30")), __pointee_pVoice.waveStep)) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode40(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = (((members.squareTable ?? runtime.member("squareTable"))[((__pointee_pVoice.waveStep) + (__pointee_pVoice.pulseIndex))]) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode50(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform50 ?? runtime.member("waveform50")), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode60(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform60 ?? runtime.member("waveform60")), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode70(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = ((runtime.readIndex((members.waveform70 ?? runtime.member("waveform70")), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode80(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = ((__pointee_pVoice.noiseOutput) & 0xff);
        method_waveAdvance(runtime, pVoice);
        method_noiseAdvance(runtime, pVoice);
    }
    function method_sidMode80hp(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.output = ((__pointee_pVoice.noiseOutput) & 0xff);
        method_waveAdvance(runtime, pVoice);
        method_noiseAdvanceHp(runtime, pVoice);
    }
    function method_sidModeLock(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.noiseIsLocked = ((1) | 0);
        __pointee_pVoice.output = ((((__pointee_pVoice.filtIO) - (128))) & 0xff);
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode14(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (((Number(runtime.dereference(__pointee_pVoice.modulator).waveStep) < Number(2048)) ? 1 : 0)) {
            __pointee_pVoice.output = (((members.triangleTable ?? runtime.member("triangleTable"))[__pointee_pVoice.waveStep]) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ ((members.triangleTable ?? runtime.member("triangleTable"))[__pointee_pVoice.waveStep]))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode34(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (((Number(runtime.dereference(__pointee_pVoice.modulator).waveStep) < Number(2048)) ? 1 : 0)) {
            __pointee_pVoice.output = ((runtime.readIndex((members.waveform30 ?? runtime.member("waveform30")), __pointee_pVoice.waveStep)) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ (runtime.readIndex((members.waveform30 ?? runtime.member("waveform30")), __pointee_pVoice.waveStep)))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode54(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (((Number(runtime.dereference(__pointee_pVoice.modulator).waveStep) < Number(2048)) ? 1 : 0)) {
            __pointee_pVoice.output = ((runtime.readIndex((members.waveform50 ?? runtime.member("waveform50")), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ (runtime.readIndex((members.waveform50 ?? runtime.member("waveform50")), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function method_sidMode74(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (((Number(runtime.dereference(__pointee_pVoice.modulator).waveStep) < Number(2048)) ? 1 : 0)) {
            __pointee_pVoice.output = ((runtime.readIndex((members.waveform70 ?? runtime.member("waveform70")), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))) & 0xff);
        }
        else {
            __pointee_pVoice.output = ((((255) ^ (runtime.readIndex((members.waveform70 ?? runtime.member("waveform70")), ((__pointee_pVoice.waveStep) + (__pointee_pVoice.SIDpulseWidth)))))) & 0xff);
        }
        method_waveAdvance(runtime, pVoice);
    }
    function method_waveCalcMute(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        runtime.dereference(__pointee_pVoice.ADSRproc)(pVoice);
        return __pointee_pVoice.filtIO;
    }
    function method_waveCalcRangeCheck(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.waveStepOld = ((__pointee_pVoice.waveStep) & 0xffff);
        runtime.dereference(__pointee_pVoice.waveProc)(pVoice);
        if (((Number(__pointee_pVoice.waveStep) < Number(__pointee_pVoice.waveStepOld)) ? 1 : 0)) {
            __pointee_pVoice.cycleLenCount = ((0) | 0);
            __pointee_pVoice.outProc = method_sidOperator_wave_calc_normal.bind(undefined, runtime);
            __pointee_pVoice.waveStep = ((4095) & 0xffff);
        }
        __pointee_pVoice.filtIO = (((members.ampMod1x8 ?? runtime.member("ampMod1x8"))[((runtime.dereference(__pointee_pVoice.ADSRproc)(pVoice)) | (__pointee_pVoice.output))]) << 24 >> 24);
        method_waveCalcFilter(runtime, pVoice);
        return __pointee_pVoice.filtIO;
    }
    function method_enveEmuEnveAdvance(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.enveStepPnt = ((((__pointee_pVoice.enveStepPnt) + (__pointee_pVoice.enveStepAddPnt))) >>> 0);
        __pointee_pVoice.enveStep = ((((__pointee_pVoice.enveStep) + (((__pointee_pVoice.enveStepAdd) + (((Number(__pointee_pVoice.enveStepPnt) > Number(65535)) ? 1 : 0)))))) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((runtime.andAssign(__pointee_pVoice.enveStepPnt, 65535)) >>> 0);
    }
    function method_enveEmuMute(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        return 0;
    }
    function method_enveEmuRelease(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        const h_releaseTab = members.releaseTab ?? runtime.member("releaseTab");
        if (((Number(__pointee_pVoice.enveStep) >= Number((members.releaseTabLen ?? runtime.member("releaseTabLen")))) ? 1 : 0)) {
            __pointee_pVoice.enveVol = ((h_releaseTab[(((members.releaseTabLen ?? runtime.member("releaseTabLen"))) - (1))]) & 0xff);
            return (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[((runtime.dereference(__pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
        }
        else {
            __pointee_pVoice.enveVol = ((h_releaseTab[__pointee_pVoice.enveStep]) & 0xff);
            method_enveEmuEnveAdvance(runtime, pVoice);
            return (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[((runtime.dereference(__pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
        }
    }
    function method_enveEmuAlterRelease(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        let release = ((((__pointee_pVoice.SIDSR) & (15))) & 0xff);
        __pointee_pVoice.enveStepAdd = (((members.decayReleaseRates ?? runtime.member("decayReleaseRates"))[release]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = (((members.decayReleaseRatesP ?? runtime.member("decayReleaseRatesP"))[release]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuRelease.bind(undefined, runtime);
        return method_enveEmuRelease(runtime, pVoice);
    }
    function method_enveEmuStartRelease(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.ADSRctrl = ((10) & 0xff);
        __pointee_pVoice.enveStep = (((members.releasePos ?? runtime.member("releasePos"))[__pointee_pVoice.enveVol]) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((0) >>> 0);
        return method_enveEmuAlterRelease(runtime, pVoice);
    }
    function method_enveEmuSustain(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        return (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[((runtime.dereference(__pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
    }
    function method_enveEmuSustainDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        const h_releaseTab = members.releaseTab ?? runtime.member("releaseTab");
        if (((Number(__pointee_pVoice.enveStep) >= Number((members.releaseTabLen ?? runtime.member("releaseTabLen")))) ? 1 : 0)) {
            __pointee_pVoice.enveVol = ((h_releaseTab[(((members.releaseTabLen ?? runtime.member("releaseTabLen"))) - (1))]) & 0xff);
            return method_enveEmuAlterSustain(runtime, pVoice);
        }
        else {
            __pointee_pVoice.enveVol = ((h_releaseTab[__pointee_pVoice.enveStep]) & 0xff);
            if (((Number(__pointee_pVoice.enveVol) <= Number(__pointee_pVoice.enveSusVol)) ? 1 : 0)) {
                __pointee_pVoice.enveVol = ((__pointee_pVoice.enveSusVol) & 0xff);
                return method_enveEmuAlterSustain(runtime, pVoice);
            }
            else {
                method_enveEmuEnveAdvance(runtime, pVoice);
                return (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[((runtime.dereference(__pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
            }
        }
    }
    function method_enveEmuAlterSustain(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (((Number(__pointee_pVoice.enveVol) > Number(__pointee_pVoice.enveSusVol)) ? 1 : 0)) {
            __pointee_pVoice.ADSRctrl = ((12) & 0xff);
            __pointee_pVoice.ADSRproc = method_enveEmuSustainDecay.bind(undefined, runtime);
            return method_enveEmuAlterSustainDecay(runtime, pVoice);
        }
        else {
            __pointee_pVoice.ADSRctrl = ((8) & 0xff);
            __pointee_pVoice.ADSRproc = method_enveEmuSustain.bind(undefined, runtime);
            return method_enveEmuSustain(runtime, pVoice);
        }
    }
    function method_enveEmuAlterSustainDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        let decay = ((((__pointee_pVoice.SIDAD) & (15))) & 0xff);
        __pointee_pVoice.enveStepAdd = (((members.decayReleaseRates ?? runtime.member("decayReleaseRates"))[decay]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = (((members.decayReleaseRatesP ?? runtime.member("decayReleaseRatesP"))[decay]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuSustainDecay.bind(undefined, runtime);
        return method_enveEmuSustainDecay(runtime, pVoice);
    }
    function method_enveEmuDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        const h_releaseTab = members.releaseTab ?? runtime.member("releaseTab");
        if (((Number(__pointee_pVoice.enveStep) >= Number((members.releaseTabLen ?? runtime.member("releaseTabLen")))) ? 1 : 0)) {
            __pointee_pVoice.enveVol = ((__pointee_pVoice.enveSusVol) & 0xff);
            return method_enveEmuAlterSustain(runtime, pVoice);
        }
        else {
            __pointee_pVoice.enveVol = ((h_releaseTab[__pointee_pVoice.enveStep]) & 0xff);
            if (((Number(__pointee_pVoice.enveVol) <= Number(__pointee_pVoice.enveSusVol)) ? 1 : 0)) {
                __pointee_pVoice.enveVol = ((__pointee_pVoice.enveSusVol) & 0xff);
                return method_enveEmuAlterSustain(runtime, pVoice);
            }
            else {
                method_enveEmuEnveAdvance(runtime, pVoice);
                return (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[((runtime.dereference(__pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
            }
        }
    }
    function method_enveEmuAlterDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        let decay = ((((__pointee_pVoice.SIDAD) & (15))) & 0xff);
        __pointee_pVoice.enveStepAdd = (((members.decayReleaseRates ?? runtime.member("decayReleaseRates"))[decay]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = (((members.decayReleaseRatesP ?? runtime.member("decayReleaseRatesP"))[decay]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuDecay.bind(undefined, runtime);
        return method_enveEmuDecay(runtime, pVoice);
    }
    function method_enveEmuStartDecay(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.ADSRctrl = ((6) & 0xff);
        __pointee_pVoice.enveStep = (((__pointee_pVoice.enveStepPnt = ((0) >>> 0))) & 0xffff);
        return method_enveEmuAlterDecay(runtime, pVoice);
    }
    function method_enveEmuAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if (((Number(__pointee_pVoice.enveStep) >= Number(255)) ? 1 : 0)) {
            return method_enveEmuStartDecay(runtime, pVoice);
        }
        else {
            __pointee_pVoice.enveVol = ((__pointee_pVoice.enveStep) & 0xff);
            method_enveEmuEnveAdvance(runtime, pVoice);
            return (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[((runtime.dereference(__pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
        }
    }
    function method_enveEmuAlterAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        let attack = ((((__pointee_pVoice.SIDAD) >>> (4))) & 0xff);
        __pointee_pVoice.enveStepAdd = (((members.attackRates ?? runtime.member("attackRates"))[attack]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = (((members.attackRatesP ?? runtime.member("attackRatesP"))[attack]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuAttack.bind(undefined, runtime);
        return method_enveEmuAttack(runtime, pVoice);
    }
    function method_enveEmuStartAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.ADSRctrl = ((4) & 0xff);
        __pointee_pVoice.enveStep = ((__pointee_pVoice.enveVol) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((0) >>> 0);
        return method_enveEmuAlterAttack(runtime, pVoice);
    }
    function method_enveEmuShortAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        if ((((((Number(__pointee_pVoice.enveStep) >= Number(255)) ? 1 : 0)) || (((Number(__pointee_pVoice.enveShortAttackCount) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
            return method_enveEmuStartDecay(runtime, pVoice);
        }
        __pointee_pVoice.enveVol = ((__pointee_pVoice.enveStep) & 0xff);
        __pointee_pVoice.enveShortAttackCount = ((((__pointee_pVoice.enveShortAttackCount) - (1))) & 0xffff);
        method_enveEmuEnveAdvance(runtime, pVoice);
        return (members.masterAmplModTable ?? runtime.member("masterAmplModTable"))[((runtime.dereference(__pointee_pVoice.sid).masterVolumeAmplIndex) + (__pointee_pVoice.enveVol))];
    }
    function method_enveEmuAlterShortAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        let attack = ((((__pointee_pVoice.SIDAD) >>> (4))) & 0xff);
        __pointee_pVoice.enveStepAdd = (((members.attackRates ?? runtime.member("attackRates"))[attack]) & 0xffff);
        __pointee_pVoice.enveStepAddPnt = (((members.attackRatesP ?? runtime.member("attackRatesP"))[attack]) >>> 0);
        __pointee_pVoice.ADSRproc = method_enveEmuShortAttack.bind(undefined, runtime);
        return method_enveEmuShortAttack(runtime, pVoice);
    }
    function method_enveEmuStartShortAttack(runtime, pVoice) {
        const members = runtime.members;
        const __pointee_pVoice = runtime.dereference(pVoice);
        __pointee_pVoice.ADSRctrl = ((16) & 0xff);
        __pointee_pVoice.enveStep = ((__pointee_pVoice.enveVol) & 0xffff);
        __pointee_pVoice.enveStepPnt = ((0) >>> 0);
        __pointee_pVoice.enveShortAttackCount = ((65535) & 0xffff);
        return method_enveEmuAlterShortAttack(runtime, pVoice);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[0] = method_sidMode00.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[1] = method_sidMode10.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[2] = method_sidMode20.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[3] = method_sidMode30.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[4] = method_sidMode40.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[5] = method_sidMode50.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[6] = method_sidMode60.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[7] = method_sidMode70.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[8] = method_sidMode80.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[9] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[10] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[11] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[12] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[13] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[14] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeNormalTable ?? runtime.member("sidModeNormalTable"))[15] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[0] = method_sidMode00.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[1] = method_sidMode14.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[2] = method_sidMode00.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[3] = method_sidMode34.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[4] = method_sidMode00.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[5] = method_sidMode54.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[6] = method_sidMode00.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[7] = method_sidMode74.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[8] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[9] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[10] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[11] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[12] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[13] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[14] = method_sidModeLock.bind(undefined, runtime);
        (members.sidModeRingTable ?? runtime.member("sidModeRingTable"))[15] = method_sidModeLock.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[0] = method_enveEmuStartAttack.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[1] = method_enveEmuStartRelease.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[2] = method_enveEmuAttack.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[3] = method_enveEmuDecay.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[4] = method_enveEmuSustain.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[5] = method_enveEmuRelease.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[6] = method_enveEmuSustainDecay.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[7] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[8] = method_enveEmuStartShortAttack.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[9] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[10] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[11] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[12] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[13] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[14] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[15] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[16] = method_enveEmuStartAttack.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[17] = method_enveEmuStartRelease.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[18] = method_enveEmuAlterAttack.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[19] = method_enveEmuAlterDecay.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[20] = method_enveEmuAlterSustain.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[21] = method_enveEmuAlterRelease.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[22] = method_enveEmuAlterSustainDecay.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[23] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[24] = method_enveEmuStartShortAttack.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[25] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[26] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[27] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[28] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[29] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[30] = method_enveEmuMute.bind(undefined, runtime);
        (members.enveModeTable ?? runtime.member("enveModeTable"))[31] = method_enveEmuMute.bind(undefined, runtime);
        members.m_stream = (__l["stream_alloc"] ? __l["stream_alloc"](0, 1, (__l["machine().sample_rate"]?.() ?? 0)) : runtime.macro("stream_alloc", 0, 1, (__l["machine().sample_rate"]?.() ?? 0)));
        members.device = (members.this ?? runtime.member("this"));
        members.mixer_channel = (members.m_stream ?? runtime.member("m_stream"));
        members.PCMfreq = (((__l["machine().sample_rate"]?.() ?? 0)) & 0xffff);
        members.clock = (((__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) >>> 0);
        members.type = ((0) | 0);
        method_init(runtime);
        method_sidInitWaveformTables(runtime, 0);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        method_reset(runtime);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        method_fill_buffer(runtime, stream);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let data = ((0) & 0xff);
        switch (((offset) & (31))) {
            case 25:
                {
                    data = (((__l["m_read_potx"] ? __l["m_read_potx"](Number(0)) : typeof members.m_read_potx === 'function' ? members.m_read_potx(0) : runtime.invoke("m_read_potx", 0))) & 0xff);
                    break;
                }
            case 26:
                {
                    data = (((__l["m_read_poty"] ? __l["m_read_poty"](Number(0)) : typeof members.m_read_poty === 'function' ? members.m_read_poty(0) : runtime.invoke("m_read_poty", 0))) & 0xff);
                    break;
                }
            default:
                {
                    data = ((method_port_r(runtime, (__l["machine"] ? __l["machine"]() : runtime.macro("machine")), offset)) & 0xff);
                    break;
                }
        }
        return data;
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        method_port_w(runtime, offset, data);
    }
    return {
        "syncEm": method_syncEm,
        "fill_buffer": method_fill_buffer,
        "mix_mono": method_mix_mono,
        "reset": method_reset,
        "sidOperator_clear": method_sidOperator_clear,
        "enveEmuResetOperator": method_enveEmuResetOperator,
        "sidOperator_set": method_sidOperator_set,
        "sidOperator_set2": method_sidOperator_set2,
        "sidOperator_wave_calc_cycle_len": method_sidOperator_wave_calc_cycle_len,
        "postload": method_postload,
        "init": method_init,
        "sidInitMixerEngine": method_sidInitMixerEngine,
        "filterTableInit": method_filterTableInit,
        "sidInitWaveformTables": method_sidInitWaveformTables,
        "enveEmuInit": method_enveEmuInit,
        "port_w": method_port_w,
        "port_r": method_port_r,
        "sidOperator_wave_calc_normal": method_sidOperator_wave_calc_normal,
        "waveCalcFilter": method_waveCalcFilter,
        "waveAdvance": method_waveAdvance,
        "noiseAdvance": method_noiseAdvance,
        "noiseAdvanceHp": method_noiseAdvanceHp,
        "sidMode00": method_sidMode00,
        "sidMode10": method_sidMode10,
        "sidMode20": method_sidMode20,
        "sidMode30": method_sidMode30,
        "sidMode40": method_sidMode40,
        "sidMode50": method_sidMode50,
        "sidMode60": method_sidMode60,
        "sidMode70": method_sidMode70,
        "sidMode80": method_sidMode80,
        "sidMode80hp": method_sidMode80hp,
        "sidModeLock": method_sidModeLock,
        "sidMode14": method_sidMode14,
        "sidMode34": method_sidMode34,
        "sidMode54": method_sidMode54,
        "sidMode74": method_sidMode74,
        "waveCalcMute": method_waveCalcMute,
        "waveCalcRangeCheck": method_waveCalcRangeCheck,
        "enveEmuEnveAdvance": method_enveEmuEnveAdvance,
        "enveEmuMute": method_enveEmuMute,
        "enveEmuRelease": method_enveEmuRelease,
        "enveEmuAlterRelease": method_enveEmuAlterRelease,
        "enveEmuStartRelease": method_enveEmuStartRelease,
        "enveEmuSustain": method_enveEmuSustain,
        "enveEmuSustainDecay": method_enveEmuSustainDecay,
        "enveEmuAlterSustain": method_enveEmuAlterSustain,
        "enveEmuAlterSustainDecay": method_enveEmuAlterSustainDecay,
        "enveEmuDecay": method_enveEmuDecay,
        "enveEmuAlterDecay": method_enveEmuAlterDecay,
        "enveEmuStartDecay": method_enveEmuStartDecay,
        "enveEmuAttack": method_enveEmuAttack,
        "enveEmuAlterAttack": method_enveEmuAlterAttack,
        "enveEmuStartAttack": method_enveEmuStartAttack,
        "enveEmuShortAttack": method_enveEmuShortAttack,
        "enveEmuAlterShortAttack": method_enveEmuAlterShortAttack,
        "enveEmuStartShortAttack": method_enveEmuStartShortAttack,
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "sound_stream_update": method_sound_stream_update,
        "read": method_read,
        "write": method_write
    };
})();
definition.compiledMethodLinks = ["clock", "exp", "expf", "logf", "m_read_potx", "m_read_poty", "machine", "machine().sample_rate", "stream_alloc"];
export const device = definition;
export default device;
