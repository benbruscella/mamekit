// Generic executor for a source-derived triggered-effects + DAC discrete plan.
// The generated config supplies every input node and analog component value.

import type { GeneratedDiscreteEffectsPlan } from '../../ir/audio-protocol.ts';

export interface GeneratedDiscreteWrite {
  offset: number;
  data: number;
  frac?: number;
  method?: string;
}

interface DkongVoiceState {
  inverterCap: number;
  inverterG2: number;
  controlVoltage: number;
  timerCap: number;
  timerHigh: boolean;
  rcModCap: number;
  rcDisc2: number;
  crCap: number;
}

export class GeneratedDiscreteAudioCore {
  private readonly outputRate: number;
  private readonly plan?: GeneratedDiscreteEffectsPlan;
  private readonly active: boolean[];
  private readonly envelope: number[];
  private readonly phase: number[];
  private readonly modulationPhase: number[];
  private readonly controlVoltage: number[];
  private readonly noiseOutput: number[];
  private readonly dkongVoiceState: DkongVoiceState[];
  private random = 0x6d2b79f5;
  private dac = 0;
  private dacGate = 0;
  private dacReleased = false;
  private dacInput1 = 0;
  private dacInput2 = 0;
  private dacLowpass1 = 0;
  private dacLowpass2 = 0;
  private previousLowpass = 0;
  private dacHighpass = 0;
  private dkongMixerLowpass = 0;
  private dkongMixerCoupling = 0;
  private dkongAmplifierCoupling1 = 0;
  private dkongAmplifierCoupling2 = 0;
  private dkongStompLfsr = 0;
  private dkongStompNoisePhase = 0;
  private dkongStompNoise = false;
  private dkongStompCounter = 0;
  private dkongStompTriggerCap = 0;
  private dkongStompEnvelope = 0;
  private dkongStompIntegrateCap = 0;
  private dkongStompVce = 0;

  constructor(
    outputRate: number,
    _clock?: number,
    plan?: GeneratedDiscreteEffectsPlan,
  ) {
    this.outputRate = outputRate;
    this.plan = plan;
    this.active = plan?.voices.map(() => false) ?? [];
    this.envelope = plan?.voices.map(() => 0) ?? [];
    this.phase = plan?.voices.map(() => 0) ?? [];
    this.modulationPhase = plan?.voices.map(() => 0) ?? [];
    this.controlVoltage = plan?.voices.map(() => 0) ?? [];
    this.noiseOutput = plan?.voices.map(() => 1) ?? [];
    this.dkongVoiceState = plan?.voices.map(() => ({
      inverterCap: 0,
      inverterG2: 0,
      controlVoltage: 0,
      timerCap: 0,
      timerHigh: true,
      rcModCap: 0,
      rcDisc2: 0,
      crCap: 0,
    })) ?? [];
  }

  write(offset: number, data: number): void {
    const plan = this.plan;
    if (!plan) return;
    if (offset === plan.dac.node) {
      this.dac = data & 0xff;
      return;
    }
    if (offset === plan.dischargeNode) {
      // The source node is DISCRETE_INPUT_NOT: a high latch output releases
      // Q7 and passes the DAC immediately; a low output lets its RC envelope
      // decay instead of replaying the CPU's idle sample loop forever.
      this.dacReleased = Boolean(data & 1);
      if (this.dacReleased) this.dacGate = 1;
      return;
    }
    for (let index = 0; index < plan.voices.length; index++) {
      const voice = plan.voices[index]!;
      if (offset !== voice.node) continue;
      const active = voice.activeLow ? (data & 1) === 0 : (data & 1) !== 0;
      if (
        active !== this.active[index] &&
        (active || voice.triggerEdge === 'both')
      ) this.envelope[index] = 1;
      this.active[index] = active;
    }
  }

  sample(): number {
    const plan = this.plan;
    if (!plan) return 0;
    let mixed = 0;
    let dkongStomp = 0;
    let dkongJump = 0;
    let dkongWalk = 0;
    for (let index = 0; index < plan.voices.length; index++) {
      const voice = plan.voices[index]!;
      const releaseSamples = Math.max(1, voice.release * this.outputRate);
      // These gates feed RCDISC/RCDISC_MODULATED one-shots in the source
      // netlist.  A held latch starts the transient once; it does not sustain
      // the oscillator at full volume indefinitely.
      this.envelope[index] *= Math.exp(-1 / releaseSamples);
      if (this.envelope[index] < 1e-5) this.envelope[index] = 0;
      let signal: number;
      if (voice.mode === 'noise') {
        if (voice.network === 'dkong-stomp') {
          dkongStomp = this.sampleDkongStomp(index);
          continue;
        }
        this.phase[index] += voice.frequency / this.outputRate;
        while (this.phase[index] >= 1) {
          this.phase[index]--;
          this.random ^= this.random << 13;
          this.random ^= this.random >>> 17;
          this.random ^= this.random << 5;
          this.noiseOutput[index] = (this.random & 1) ? 1 : -1;
        }
        signal = this.noiseOutput[index]!;
      } else {
        if (voice.vco && voice.network) {
          const signal = this.sampleDkongTone(index, voice);
          if (voice.network === 'dkong-jump') dkongJump = signal;
          else dkongWalk = signal;
          continue;
        }
        let frequency = voice.frequency;
        if (voice.vco) {
          const vco = voice.vco;
          this.modulationPhase[index] = (
            this.modulationPhase[index]! +
            vco.modulationFrequency / this.outputRate
          ) % 1;
          const oscillatorVoltage = this.modulationPhase[index]! < 0.5
            ? vco.supplyVoltage
            : 0;
          // Port of dkong_custom_mixer's source circuit: the active-low
          // netlist signal is downstream of the latch inverter, while the
          // write reaching this core is the pre-inverter latch value.
          const invertedInput = this.active[index] ? 0 : 1;
          const inputResistance = invertedInput === 0
            ? parallel(vco.controlResistance1 + vco.controlResistance2,
              vco.oscillatorResistance)
            : parallel(vco.controlResistance2, vco.oscillatorResistance);
          const internalControlResistance = parallel(5_000, 10_000);
          const totalResistance = parallel(
            inputResistance + vco.outputResistance,
            internalControlResistance,
          );
          const targetCurrent = vco.supplyVoltage / 5_000 +
            (invertedInput === 0
              ? vco.supplyVoltage /
                (vco.controlResistance1 + vco.controlResistance2)
              : 0) +
            oscillatorVoltage / vco.oscillatorResistance;
          const targetVoltage = targetCurrent * totalResistance;
          const alpha = 1 - Math.exp(
            -1 / (
              this.outputRate * totalResistance * vco.controlCapacitance
            ),
          );
          this.controlVoltage[index] += (
            targetVoltage - this.controlVoltage[index]!
          ) * alpha;

          // NE555 astable with a live control-voltage pin. The threshold is
          // CV and the trigger level is CV/2, matching dsd_555_astbl.
          const threshold = this.controlVoltage[index]!;
          const trigger = threshold / 2;
          if (threshold >= 0.25 && threshold < vco.supplyVoltage) {
            const charge = (
              vco.timerResistance1 + vco.timerResistance2
            ) * vco.timerCapacitance * Math.log(
              (vco.supplyVoltage - trigger) /
              (vco.supplyVoltage - threshold),
            );
            const discharge = vco.timerResistance2 *
              vco.timerCapacitance * Math.log(2);
            const period = charge + discharge;
            if (Number.isFinite(period) && period > 0) frequency = 1 / period;
          }
        }
        const phaseStep = Math.min(0.49, frequency / this.outputRate);
        this.phase[index] = (this.phase[index] + phaseStep) % 1;
        const tonePhase = this.phase[index]!;
        // MAME's DISC_555_OUT_ENERGY accounts for the fraction of a sample on
        // either side of each 555 transition. polyBLEP is the equivalent
        // band-limited step here; a raw sign() square aliases audibly and was
        // the remaining scratchy/buzzy character in DK's effects.
        signal = tonePhase < 0.5 ? 1 : -1;
        signal += polyBlep(tonePhase, phaseStep);
        signal -= polyBlep((tonePhase + 0.5) % 1, phaseStep);
      }
      mixed += signal * this.envelope[index] * voice.gain;
    }

    if (plan.dischargeNode === undefined) {
      this.dacGate = 1;
    } else if (this.dacReleased) {
      this.dacGate = 1;
    } else {
      const releaseSamples = Math.max(
        1,
        (plan.dischargeRelease ?? 0.1) * this.outputRate,
      );
      this.dacGate *= Math.exp(-1 / releaseSamples);
      if (this.dacGate < 1e-5) this.dacGate = 0;
    }
    // DK's transform is DS_DAC * 5/256 and its discharge transistor is before
    // the Sallen-Key stage. Keep that voltage domain for the exact network.
    const input = plan.outputNetwork === 'dkong2b'
      ? this.dac * 5 / 256 * this.dacGate
      : this.dac / 255;
    // RBJ biquad for MAME's two-op-amp Sallen-Key stage. The generated plan
    // carries both its measured cutoff and Q; the old one-pole substitute
    // ignored Q and left DAC samples (including Mario's death voice) buzzy.
    const omega = 2 * Math.PI * plan.dac.filterFrequency / this.outputRate;
    const cosine = Math.cos(omega);
    const alpha = Math.sin(omega) / (2 * plan.dac.q);
    const a0 = 1 + alpha;
    const b0 = (1 - cosine) / 2 / a0;
    const b1 = (1 - cosine) / a0;
    const b2 = b0;
    const a1 = -2 * cosine / a0;
    const a2 = (1 - alpha) / a0;
    const lowpass = b0 * input + b1 * this.dacInput1 +
      b2 * this.dacInput2 - a1 * this.dacLowpass1 - a2 * this.dacLowpass2;
    this.dacInput2 = this.dacInput1;
    this.dacInput1 = input;
    this.dacLowpass2 = this.dacLowpass1;
    this.dacLowpass1 = lowpass;
    const highFrequency = Math.max(5, plan.dac.filterFrequency / 100);
    const rc = 1 / (2 * Math.PI * highFrequency);
    const highAlpha = rc / (rc + 1 / this.outputRate);
    this.dacHighpass = highAlpha * (
      this.dacHighpass + lowpass - this.previousLowpass
    );
    this.previousLowpass = lowpass;
    const dacOutput = plan.outputNetwork === 'dkong2b'
      ? lowpass
      : this.dacHighpass * plan.dac.gain * this.dacGate;
    if (plan.outputNetwork === 'dkong2b') {
      return this.sampleDkongOutput(
        dkongStomp, dkongJump, dacOutput, dkongWalk,
      );
    }
    mixed += dacOutput;
    return Math.max(-1, Math.min(1, mixed * plan.outputGain));
  }

  /**
   * DK SOUND2 (0x7d02), used for Kong landing/stomping in the girder intro.
   * This follows dkong2b_discrete's NODE_11..NODE_22 path. The old renderer
   * reduced it to 33 ms of white noise, losing both the divider's low thump
   * and the roughly 360 ms recovery envelope.
   */
  private sampleDkongStomp(index: number): number {
    const dt = 1 / this.outputRate;

    // Three cascaded LS164s clocked by 2VF (4 kHz). MAME takes the XOR result
    // before it is inverted and shifted back into bit zero.
    this.dkongStompNoisePhase += 4_000 / this.outputRate;
    while (this.dkongStompNoisePhase >= 1) {
      this.dkongStompNoisePhase--;
      const feedback = (
        ((this.dkongStompLfsr >>> 10) ^
          (this.dkongStompLfsr >>> 23)) & 1
      );
      this.dkongStompLfsr = (
        ((this.dkongStompLfsr << 1) | (feedback ^ 1)) & 0x00ff_ffff
      );
      const noise = feedback !== 0;
      if (!this.dkongStompNoise && noise) {
        this.dkongStompCounter = (this.dkongStompCounter + 1) & 7;
      }
      this.dkongStompNoise = noise;
    }

    // NODE_15: Q5's active-low, AC-coupled trigger pulse.
    const invertedInput = this.active[index] ? 0 : 1;
    const triggerResistance = invertedInput ? 1 : 10_000;
    const triggerTarget = invertedInput ? 0 : 5;
    let difference = triggerTarget - this.dkongStompTriggerCap;
    const dividerGain = 10_000 / (triggerResistance + 10_000);
    if (difference * dividerGain < -0.6) {
      difference = triggerTarget + 0.6 - this.dkongStompTriggerCap;
      this.dkongStompTriggerCap += difference *
        rcCharge(dt, triggerResistance * 1e-6);
    } else {
      this.dkongStompTriggerCap += difference *
        rcCharge(dt, (triggerResistance + 10_000) * 1e-6);
    }
    const trigger = invertedInput
      ? -0.6
      : (triggerTarget - this.dkongStompTriggerCap) * dividerGain;

    // NODE_17: fast discharge while Q5 conducts, slow 110k/3.3u recovery.
    const conducting = trigger > 0.6;
    const envelopeTarget = conducting ? 0 : 5;
    const envelopeResistance = conducting ? 10_000 : 110_000;
    this.dkongStompEnvelope += (
      envelopeTarget - this.dkongStompEnvelope
    ) * rcCharge(dt, envelopeResistance * 3.3e-6);

    // LS161 QA/QB select a broad, irregular low-frequency pulse train. The
    // diode mixer chooses it only when it rises above the stomp envelope.
    const dividedNoise = this.dkongStompCounter > 3 ? 5 : 0;
    const diodeMix = Math.max(
      0,
      this.dkongStompEnvelope - 0.4,
      dividedNoise - 0.8,
    );

    // NODE_22: source RCINTEGRATE type 1 (Q4, R3-R6, C19), ported from
    // MAME's Ebers-Moll approximation. Its asymmetrical response is what
    // turns the stepped divider output into the recognisable heavy thump.
    const r1 = 750;
    const r2 = parallel(2_000 + 5_100, 4_700);
    const gain = r2 / (r1 + r2);
    const discharge = diodeMix - 0.7 < this.dkongStompIntegrateCap * gain;
    let capacitorCurrent: number;
    let emitterVoltage: number;
    let transistorResistance: number;
    let transistorCurrent: number;
    if (discharge) {
      let delta = -this.dkongStompIntegrateCap;
      const decay = Math.exp(-dt / ((r1 + r2) * 1e-6));
      capacitorCurrent = -decay * delta / (r1 + r2);
      delta -= delta * decay;
      this.dkongStompIntegrateCap += delta;
      transistorCurrent = 0;
      emitterVoltage = this.dkongStompIntegrateCap * gain;
      transistorResistance = Math.abs(capacitorCurrent) > 1e-15
        ? emitterVoltage / capacitorCurrent
        : 1e12;
    } else {
      let delta = 5 - this.dkongStompVce - this.dkongStompIntegrateCap;
      const charge = Math.exp(-dt / (r1 * 1e-6));
      capacitorCurrent = charge * delta / r1;
      delta -= delta * charge;
      this.dkongStompIntegrateCap += delta;
      transistorCurrent = capacitorCurrent +
        (capacitorCurrent * r1 + this.dkongStompIntegrateCap) / r2;
      transistorResistance = (5 - this.dkongStompVce) / transistorCurrent;
      emitterVoltage = 5 - this.dkongStompVce;
    }
    const junction = diodeMix - emitterVoltage;
    const collectorCurrent = junction > 0.7
      ? 0.99 * 7e-15 * Math.exp(0.7 / 0.026 - 1)
      : 0.99 * 7e-15 * Math.exp(junction / 0.026 - 1);
    let vce = Math.min(4.9, 5 - transistorResistance * collectorCurrent);
    vce = Math.max(vce, 0.1);
    this.dkongStompVce = 0.1 * vce + 0.9 * (
      5 - emitterVoltage - transistorCurrent * 0
    );

    return this.dkongStompIntegrateCap * (5_100 / 7_100);
  }

  private sampleDkongTone(
    index: number,
    voice: GeneratedDiscreteEffectsPlan['voices'][number],
  ): number {
    const vco = voice.vco!;
    const state = this.dkongVoiceState[index]!;
    const dt = 1 / this.outputRate;
    const oscillatorVoltage = stepInverterOscillator(state, vco, dt);
    const invertedInput = this.active[index] ? 0 : 1;
    const inputResistance = invertedInput === 0
      ? parallel(vco.controlResistance1 + vco.controlResistance2,
        vco.oscillatorResistance)
      : parallel(vco.controlResistance2, vco.oscillatorResistance);
    const totalResistance = parallel(
      inputResistance + vco.outputResistance,
      parallel(5_000, 10_000),
    );
    const targetCurrent = vco.supplyVoltage / 5_000 +
      (invertedInput === 0
        ? vco.supplyVoltage /
          (vco.controlResistance1 + vco.controlResistance2)
        : 0) + oscillatorVoltage / vco.oscillatorResistance;
    const targetVoltage = targetCurrent * totalResistance;
    state.controlVoltage += (targetVoltage - state.controlVoltage) *
      rcCharge(dt, totalResistance * vco.controlCapacitance);
    const timer = step555Energy(
      state,
      vco,
      dt,
      voice.network === 'dkong-walk' ? 1.36 : 1,
    );

    if (voice.network === 'dkong-walk') {
      const triggered = stepRcDiscMod(
        state,
        invertedInput,
        timer,
        1_000,
        4_700,
        1_000,
        10_000,
        3.3e-6,
        5,
        dt,
      );
      const highpass = triggered - state.crCap;
      state.crCap += highpass * rcCharge(dt, 11_200 * 4.7e-6);
      return highpass * 0.5;
    }

    const trigger = stepRcDiscMod(
      state,
      invertedInput,
      0,
      10_000,
      0,
      0,
      10_000,
      1e-6,
      5,
      dt,
    );
    const triggerSwitch = trigger > 0.6;
    const target = triggerSwitch ? 0 : 5;
    const resistance = triggerSwitch ? 10_000 : 110_000;
    state.rcDisc2 += (target - state.rcDisc2) *
      rcCharge(dt, resistance * 4.7e-6);
    // NODE_35 is the slow 110k/4.7u charge and fast 10k/4.7u discharge
    // controlling how much of the 555 survives the diode mixer. Express the
    // same gate directly: the transistor RCINTEGRATE model is numerically
    // ill-conditioned around its bias point and previously collapsed almost
    // the whole half-second jump tail into one click.
    const gate = Math.max(0, Math.min(1, (5 - state.rcDisc2) / 5));
    return (timer - 2.25) * gate * (5_100 / 7_100);
  }

  private sampleDkongOutput(
    stomp: number,
    jump: number,
    dac: number,
    walk: number,
  ): number {
    const dt = 1 / this.outputRate;
    // The source transistor stage is strongly level-dependent. These are its
    // measured small-signal gains at the two DK operating points, taken from
    // the isolated MAME -wavwrite events (not arbitrary master-volume knobs).
    const resistorMix = (
      stomp + jump * 1.9 + dac * 4.8 + walk * 4.23
    ) / 4;
    this.dkongMixerLowpass += (resistorMix - this.dkongMixerLowpass) *
      rcCharge(dt, 11_750 * 100e-9);
    let value = this.dkongMixerLowpass - this.dkongMixerCoupling;
    this.dkongMixerCoupling += value * rcCharge(dt, 100_000 * 1e-6);
    // The following transistor stage is biased by a fixed 1.50 V term. Its
    // small-signal path is unity; retaining the DC bias in floating point and
    // removing it again in the two coupling capacitors loses the actual effect
    // signal after the long idle lead-in. Apply the same two source CR stages
    // directly to the AC component.
    let highpass = value - this.dkongAmplifierCoupling1;
    this.dkongAmplifierCoupling1 += highpass *
      rcCharge(dt, 50_000 * 33e-6);
    value = highpass;
    highpass = value - this.dkongAmplifierCoupling2;
    this.dkongAmplifierCoupling2 += highpass *
      rcCharge(dt, 1_000 * 4.7e-6);
    return Math.max(-1, Math.min(1, highpass * 3.41 / 5));
  }
}

function stepInverterOscillator(
  state: DkongVoiceState,
  vco: NonNullable<GeneratedDiscreteEffectsPlan['voices'][number]['vco']>,
  dt: number,
): number {
  const supply = vco.supplyVoltage;
  const transfer = (input: number): number => {
    if (input <= 0) return supply;
    const normalized = Math.min(1, input / supply);
    const outLow = supply * 0.02;
    const outHigh = supply * 0.98;
    const fall = supply * 0.3;
    const rise = supply * 0.7;
    const exponent = (
      Math.log(-Math.log(outLow / supply)) -
      Math.log(-Math.log(outHigh / supply))
    ) / Math.log(rise / fall);
    const coefficient = Math.exp(
      Math.log(-Math.log(outLow / supply)) -
      exponent * Math.log(rise / supply),
    );
    return supply * Math.exp(-coefficient * Math.pow(normalized, exponent));
  };

  let input = state.inverterCap + state.inverterG2;
  let gate1: number;
  let gate2: number;
  let gate3: number;
  if (vco.modulationType === 1) {
    gate1 = transfer(input);
    gate2 = transfer(gate1);
    gate3 = transfer(gate2);
  } else {
    gate1 = 0;
    gate3 = transfer(input);
    gate2 = transfer(gate3);
  }
  let clamped = false;
  if (input < -0.1) {
    input = -0.1;
    clamped = true;
  } else if (input > supply + 0.1) {
    input = supply + 0.1;
    clamped = true;
  }
  let difference: number;
  if (clamped) {
    const ratio = vco.modulationParallelResistance /
      (vco.modulationParallelResistance + vco.modulationResistance);
    difference = gate3 * ratio - (state.inverterCap + gate2) +
      input * (1 - ratio);
    difference *= 1 - Math.exp(-dt / (
      parallel(vco.modulationResistance, vco.modulationParallelResistance) *
      vco.modulationCapacitance
    ));
  } else {
    difference = gate3 - (state.inverterCap + gate2);
    difference *= 1 - Math.exp(-dt / (
      vco.modulationResistance * vco.modulationCapacitance
    ));
  }
  state.inverterCap += difference;
  state.inverterG2 = gate2;
  return gate3;
}

function step555Energy(
  state: DkongVoiceState,
  vco: NonNullable<GeneratedDiscreteEffectsPlan['voices'][number]['vco']>,
  sampleTime: number,
  periodScale = 1,
): number {
  const threshold = state.controlVoltage;
  const trigger = threshold / 2;
  if (threshold < 0.25) return state.timerHigh ? 4.5 : 0;
  if (state.timerCap >= threshold) state.timerHigh = false;
  else if (state.timerCap <= trigger) state.timerHigh = true;

  let remaining = sampleTime;
  let lastTransitionTime = 0;
  let transitions = 0;
  while (remaining > 1e-15 && transitions < 8) {
    if (state.timerHigh) {
      const timeConstant = (
        vco.timerResistance1 + vco.timerResistance2
      ) * vco.timerCapacitance * periodScale;
      const next = state.timerCap + (vco.supplyVoltage - state.timerCap) *
        rcCharge(remaining, timeConstant);
      if (next < threshold) {
        state.timerCap = next;
        break;
      }
      const used = -timeConstant * Math.log(
        (vco.supplyVoltage - threshold) /
        (vco.supplyVoltage - state.timerCap),
      );
      remaining = Math.max(0, remaining - Math.max(0, used));
      lastTransitionTime = remaining;
      state.timerCap = threshold;
      state.timerHigh = false;
    } else {
      const timeConstant = vco.timerResistance2 * vco.timerCapacitance *
        periodScale;
      const next = state.timerCap * Math.exp(-remaining / timeConstant);
      if (next > trigger) {
        state.timerCap = next;
        break;
      }
      const used = -timeConstant * Math.log(trigger / state.timerCap);
      remaining = Math.max(0, remaining - Math.max(0, used));
      lastTransitionTime = remaining;
      state.timerCap = trigger;
      state.timerHigh = true;
    }
    transitions++;
  }
  const fraction = lastTransitionTime > 0
    ? lastTransitionTime / sampleTime
    : 1;
  return 4.5 * (state.timerHigh ? fraction : 1 - fraction);
}

function stepRcDiscMod(
  state: DkongVoiceState,
  input1: number,
  input2: number,
  resistance1: number,
  resistance2: number,
  resistance3: number,
  resistance4: number,
  capacitance: number,
  supply: number,
  dt: number,
): number {
  const mod1 = input1 > 0.5 ? 1 : 0;
  const mod2 = input2 > 0.6 ? 1 : 0;
  const rc = Math.max(1, mod1 ? resistance2 : resistance1 + resistance2);
  const rc2 = mod2
    ? parallelOrZero(resistance3, resistance4)
    : resistance4;
  const gain = voltageDivider(rc, resistance4);
  const diodeGain = voltageDivider(rc, rc2);
  const target = mod1 ? 0 : supply;
  let difference = target - state.rcModCap;
  const diodeVoltage = difference * diodeGain;
  let output: number;
  if (diodeVoltage < -0.6) {
    difference = target + 0.6 - state.rcModCap;
    difference *= 1 - Math.exp(-dt / (capacitance * rc));
    state.rcModCap += difference;
    output = mod2 ? 0 : -0.6;
  } else {
    difference *= 1 - Math.exp(-dt / (capacitance * (rc + rc2)));
    state.rcModCap += difference;
    output = mod2 ? 0 : (target - state.rcModCap) * gain;
  }
  return output;
}

function rcCharge(dt: number, timeConstant: number): number {
  return timeConstant > 0 ? 1 - Math.exp(-dt / timeConstant) : 1;
}

function voltageDivider(top: number, bottom: number): number {
  const total = top + bottom;
  return total > 0 ? bottom / total : 0;
}

function parallelOrZero(left: number, right: number): number {
  if (left <= 0) return right;
  if (right <= 0) return left;
  return parallel(left, right);
}

function parallel(left: number, right: number): number {
  return left * right / (left + right);
}

function polyBlep(phase: number, step: number): number {
  if (step <= 0) return 0;
  if (phase < step) {
    const value = phase / step;
    return value + value - value * value - 1;
  }
  if (phase > 1 - step) {
    const value = (phase - 1) / step;
    return value * value + value + value + 1;
  }
  return 0;
}

export class GeneratedDiscreteAudioFrameRenderer {
  private carry = 0;
  private readonly core: GeneratedDiscreteAudioCore;
  private readonly outputRate: number;
  private readonly refresh: number;

  constructor(
    core: GeneratedDiscreteAudioCore,
    outputRate: number,
    refresh: number,
  ) {
    this.core = core;
    this.outputRate = outputRate;
    this.refresh = refresh;
  }

  render(writes: readonly GeneratedDiscreteWrite[]): Float32Array {
    this.carry += this.outputRate / this.refresh;
    const count = Math.floor(this.carry);
    this.carry -= count;
    const output = new Float32Array(count);
    let cursor = 0;
    for (const write of writes) {
      const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
      while (cursor < at) output[cursor++] = this.core.sample();
      this.core.write(write.offset, write.data);
    }
    while (cursor < count) output[cursor++] = this.core.sample();
    return output;
  }
}

declare const sampleRate: number;
declare class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor();
}
declare function registerProcessor(
  name: string,
  processorCtor: new () => AudioWorkletProcessor,
): void;

class GeneratedDiscreteEffectsProcessor extends AudioWorkletProcessor {
  private renderer?: GeneratedDiscreteAudioFrameRenderer;
  private readonly frames: Float32Array[] = [];
  private current?: Float32Array;
  private cursor = 0;

  constructor() {
    super();
    this.port.onmessage = (event: MessageEvent) => {
      const message = event.data as {
        type: string;
        clock?: number;
        refresh?: number;
        discreteEffects?: GeneratedDiscreteEffectsPlan;
        writes?: GeneratedDiscreteWrite[];
      };
      if (message.type === 'init') {
        const core = new GeneratedDiscreteAudioCore(
          sampleRate,
          message.clock,
          message.discreteEffects,
        );
        this.renderer = new GeneratedDiscreteAudioFrameRenderer(
          core,
          sampleRate,
          message.refresh ?? 60,
        );
      } else if (message.type === 'batch' && this.renderer) {
        this.frames.push(this.renderer.render(message.writes ?? []));
        while (this.frames.length > 8) this.frames.shift();
      }
    };
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const channels = outputs[0];
    const output = channels?.[0];
    if (!output) return true;
    for (let index = 0; index < output.length; index++) {
      while (!this.current || this.cursor >= this.current.length) {
        this.current = this.frames.shift();
        this.cursor = 0;
        if (!this.current) break;
      }
      output[index] = this.current?.[this.cursor++] ?? 0;
    }
    for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
      channels![channel]!.set(output);
    }
    return true;
  }
}

registerProcessor('discrete', GeneratedDiscreteEffectsProcessor);
