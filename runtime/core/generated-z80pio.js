const MODE_OUTPUT = 0;
const MODE_INPUT = 1;
const MODE_BIDIRECTIONAL = 2;
const MODE_BIT_CONTROL = 3;
const CONTROL_ANY = 0;
const CONTROL_IOR = 1;
const CONTROL_MASK = 2;
/**
 * Executable form of MAME's z80pio_device and its two nested pio_port objects.
 *
 * The ordinary generated-device IR intentionally flattens scalar nested-class
 * members.  Z80 PIO is different: each port has independent handshake and
 * interrupt state, and callbacks are owned by the parent device.  Keeping the
 * two source-defined port instances here preserves that object boundary while
 * exposing the same generated Device interface used by board composition.
 */
export class GeneratedZ80PioDevice {
    definition;
    clock;
    ports;
    listeners = new Map();
    callbackInitials = new Map();
    calls = new Map();
    methodParameters = new Map();
    constructor(definition, clock) {
        this.definition = definition;
        this.clock = clock;
        this.ports = [this.newPort(), this.newPort()];
        for (const callback of definition.callbacks) {
            this.listeners.set(callback.signal, Array.from({ length: callback.slots }, () => []));
            this.callbackInitials.set(callback.signal, callback.initial ?? 0);
        }
        for (const method of definition.methods) {
            const parameters = splitParameters(method.parameters);
            const overloads = this.methodParameters.get(method.name) ?? [];
            overloads.push(parameters);
            this.methodParameters.set(method.name, overloads);
        }
        this.reset();
    }
    reset() {
        for (let index = 0; index < this.ports.length; index++) {
            const port = this.ports[index];
            this.setMode(index, MODE_INPUT);
            port.interruptControl &= ~0x80;
            port.interruptEnabled = false;
            port.interruptPending = false;
            port.interruptUnderService = false;
            port.match = false;
            port.ior = 0;
            port.mask = 0xff;
            port.output = 0;
            this.setReady(index, false);
        }
    }
    tick(_seconds) { }
    call(name, ...args) {
        return Number(this.invoke(name, ...args)) || 0;
    }
    invoke(name, ...args) {
        const values = args.map(value => Number(value) || 0);
        switch (name) {
            case 'device_start': return 0;
            case 'device_reset':
                this.reset();
                return 0;
            case 'read': return this.read(values[0] ?? 0, false);
            case 'write':
                this.write(values[0] ?? 0, values[1] ?? 0, false);
                return 0;
            case 'read_alt': return this.read(values[0] ?? 0, true);
            case 'write_alt':
                this.write(values[0] ?? 0, values[1] ?? 0, true);
                return 0;
            case 'control_read': return this.controlRead();
            case 'control_write':
                this.controlWrite(values[0] ?? 0, values[1] ?? 0);
                return 0;
            case 'control_a_write':
                this.controlWrite(0, values[0] ?? 0);
                return 0;
            case 'control_b_write':
                this.controlWrite(1, values[0] ?? 0);
                return 0;
            case 'data_read': return this.dataRead(values[0] ?? 0);
            case 'data_write':
                this.dataWrite(values[0] ?? 0, values[1] ?? 0);
                return 0;
            case 'data_a_read': return this.dataRead(0);
            case 'data_b_read': return this.dataRead(1);
            case 'data_a_write':
                this.dataWrite(0, values[0] ?? 0);
                return 0;
            case 'data_b_write':
                this.dataWrite(1, values[0] ?? 0);
                return 0;
            case 'port_read': return this.portRead(values[0] ?? 0);
            case 'port_write':
                if (values.length >= 3) {
                    const index = (values[0] ?? 0) & 1;
                    const bit = values[1] ?? 0;
                    this.portWrite(index, (this.ports[index].input & ~(1 << bit)) |
                        ((values[2] ?? 0) << bit));
                }
                else
                    this.portWrite(values[0] ?? 0, values[1] ?? 0);
                return 0;
            case 'port_a_read': return this.portRead(0);
            case 'port_b_read': return this.portRead(1);
            case 'port_a_write':
                this.portWrite(0, values[0] ?? 0);
                return 0;
            case 'port_b_write':
                this.portWrite(1, values[0] ?? 0);
                return 0;
            case 'rdy': return Number(this.ports[(values[0] ?? 0) & 1].ready);
            case 'rdy_a': return Number(this.ports[0].ready);
            case 'rdy_b': return Number(this.ports[1].ready);
            case 'strobe':
                this.strobe(values[0] ?? 0, Boolean(values[1]));
                return 0;
            case 'strobe_a':
                this.strobe(0, Boolean(values[0]));
                return 0;
            case 'strobe_b':
                this.strobe(1, Boolean(values[0]));
                return 0;
            case 'z80daisy_irq_state': return this.irqState();
            case 'z80daisy_irq_ack': return this.irqAcknowledge();
            case 'z80daisy_irq_reti':
                this.irqReti();
                return 0;
            case 'check_interrupts':
                this.checkInterrupts();
                return 0;
        }
        const pin = /^(p[ab])([0-7])_w$/.exec(name);
        if (pin) {
            const index = pin[1] === 'pa' ? 0 : 1;
            const bit = Number(pin[2]);
            this.portWrite(index, (this.ports[index].input & ~(1 << bit)) |
                ((values[0] ? 1 : 0) << bit));
            return 0;
        }
        const call = this.calls.get(name);
        return call ? call(...args) : 0;
    }
    get(name) {
        const indexed = /^(m_\w+)(?:\.(\d+))?$/.exec(name);
        const port = this.ports[Number(indexed?.[2] ?? 0) & 1];
        if (!port)
            return 0;
        switch (indexed?.[1] ?? name) {
            case 'm_mode': return port.mode;
            case 'm_next_control_word': return port.nextControlWord;
            case 'm_input': return port.input;
            case 'm_output': return port.output;
            case 'm_ior': return port.ior;
            case 'm_rdy': return Number(port.ready);
            case 'm_stb': return Number(port.strobe);
            case 'm_ie': return Number(port.interruptEnabled);
            case 'm_ip': return Number(port.interruptPending);
            case 'm_ius': return Number(port.interruptUnderService);
            case 'm_icw': return port.interruptControl;
            case 'm_vector': return port.vector;
            case 'm_mask': return port.mask;
            case 'm_match': return Number(port.match);
            default: return 0;
        }
    }
    set(name, value) {
        const indexed = /^(m_\w+)(?:\.(\d+))?$/.exec(name);
        const port = this.ports[Number(indexed?.[2] ?? 0) & 1];
        if (!port)
            return;
        switch (indexed?.[1] ?? name) {
            case 'm_input':
                port.input = value & 0xff;
                break;
            case 'm_output':
                port.output = value & 0xff;
                break;
            case 'm_ior':
                port.ior = value & 0xff;
                break;
            case 'm_mask':
                port.mask = value & 0xff;
                break;
            case 'm_vector':
                port.vector = value & 0xff;
                break;
        }
    }
    hasMember(_name) { return false; }
    bindMember(_name, _value) { }
    constant(name) {
        return this.definition.constants[name] ??
            this.definition.constants[name.split('::').at(-1)];
    }
    constants() {
        return this.definition.constants;
    }
    methodNames() {
        return [...this.methodParameters.keys()];
    }
    arity(name) {
        return Math.max(0, ...(this.methodParameters.get(name) ?? []).map(value => value.length));
    }
    parameters(name) {
        return this.methodParameters.get(name)?.at(-1) ?? [];
    }
    signalNames() {
        return [...this.listeners.keys()];
    }
    on(signal, listener, slot = 0) {
        const listeners = this.listeners.get(signal)?.[slot];
        if (!listeners)
            throw new Error(`Z80PIO callback "${signal}" has no slot ${slot}`);
        listeners.push(listener);
        return this;
    }
    bindCall(name, listener) {
        this.calls.set(name, listener);
        return this;
    }
    cycleClock() { return this.clock; }
    dataAddressBits() { return this.definition.dataAddressBits; }
    bus() { return this.definition.bus; }
    role() { return this.definition.role; }
    links() { return this.definition.links ?? []; }
    invokeSlot(_name, ..._args) {
        throw new Error('Z80PIO has no slot card');
    }
    installSlotCard(_space) {
        throw new Error('Z80PIO has no slot card');
    }
    newPort() {
        return {
            mode: MODE_OUTPUT,
            nextControlWord: CONTROL_ANY,
            input: 0,
            output: 0,
            ior: 0,
            ready: false,
            strobe: false,
            interruptEnabled: false,
            interruptPending: false,
            interruptUnderService: false,
            interruptControl: 0,
            vector: 0,
            mask: 0,
            match: false,
        };
    }
    emit(signal, ...args) {
        let result = this.callbackInitials.get(signal) ?? 0;
        for (const listener of this.listeners.get(signal)?.[0] ?? []) {
            const value = listener(...args);
            if (value !== undefined)
                result = value;
        }
        return result;
    }
    read(offset, alternate) {
        const index = (offset >> Number(alternate)) & 1;
        const control = alternate ? offset & 1 : (offset >> 1) & 1;
        return control ? this.controlRead() : this.dataRead(index);
    }
    write(offset, data, alternate) {
        const index = (offset >> Number(alternate)) & 1;
        const control = alternate ? offset & 1 : (offset >> 1) & 1;
        if (control)
            this.controlWrite(index, data);
        else
            this.dataWrite(index, data);
    }
    controlRead() {
        return ((this.ports[0].interruptControl & 0xc0) |
            (this.ports[1].interruptControl >> 4)) & 0xff;
    }
    setReady(index, ready) {
        const port = this.ports[index & 1];
        if (port.ready === ready)
            return;
        port.ready = ready;
        this.emit(index ? 'out_brdy_callback' : 'out_ardy_callback', Number(ready));
    }
    setMode(index, mode) {
        const port = this.ports[index & 1];
        if (mode === MODE_OUTPUT) {
            this.emit(index ? 'out_pb_callback' : 'out_pa_callback', 0, port.output);
            this.setReady(index, true);
        }
        else if (mode === MODE_BIT_CONTROL) {
            if (index === 0 || this.ports[0].mode !== MODE_BIDIRECTIONAL) {
                this.setReady(index, false);
            }
            port.interruptEnabled = false;
            this.checkInterrupts();
            port.match = false;
            port.nextControlWord = CONTROL_IOR;
        }
        if (!(mode === MODE_BIDIRECTIONAL && index === 1))
            port.mode = mode;
    }
    controlWrite(index, data) {
        const port = this.ports[index & 1];
        data &= 0xff;
        if (port.nextControlWord === CONTROL_IOR) {
            port.ior = data;
            port.interruptEnabled = Boolean(port.interruptControl & 0x80);
            this.checkInterrupts();
            port.nextControlWord = CONTROL_ANY;
            return;
        }
        if (port.nextControlWord === CONTROL_MASK) {
            port.mask = data;
            port.interruptEnabled = Boolean(port.interruptControl & 0x80);
            this.checkInterrupts();
            port.nextControlWord = CONTROL_ANY;
            return;
        }
        if (!(data & 1)) {
            port.vector = data;
            return;
        }
        switch (data & 0x0f) {
            case 0x0f:
                this.setMode(index, data >> 6);
                break;
            case 0x07:
                port.interruptControl = data;
                if (data & 0x10) {
                    port.interruptEnabled = false;
                    port.interruptPending = false;
                    port.match = false;
                    port.nextControlWord = CONTROL_MASK;
                }
                else {
                    port.interruptEnabled = Boolean(data & 0x80);
                }
                this.checkInterrupts();
                break;
            case 0x03:
                port.interruptControl = (data & 0x80) | (port.interruptControl & 0x7f);
                port.interruptEnabled = Boolean(port.interruptControl & 0x80);
                this.checkInterrupts();
                break;
        }
    }
    dataRead(index) {
        const port = this.ports[index & 1];
        let data = 0;
        if (port.mode === MODE_OUTPUT)
            data = port.output;
        else if (port.mode === MODE_INPUT) {
            if (!port.strobe) {
                port.input = this.emit(index ? 'in_pb_callback' : 'in_pa_callback', 0) & 0xff;
            }
            data = port.input;
            this.setReady(index, false);
            this.setReady(index, true);
        }
        else if (port.mode === MODE_BIDIRECTIONAL) {
            data = port.input;
            this.setReady(1, false);
            this.setReady(1, true);
        }
        else {
            port.input = this.emit(index ? 'in_pb_callback' : 'in_pa_callback', 0) & 0xff;
            data = (port.input & port.ior) | (port.output & (port.ior ^ 0xff));
        }
        return data & 0xff;
    }
    dataWrite(index, data) {
        index &= 1;
        data &= 0xff;
        const port = this.ports[index];
        if (port.mode === MODE_OUTPUT || port.mode === MODE_BIDIRECTIONAL) {
            this.setReady(index, false);
            port.output = data;
            if (port.mode === MODE_OUTPUT || !port.strobe) {
                this.emit(index ? 'out_pb_callback' : 'out_pa_callback', 0, data);
            }
            this.setReady(index, true);
        }
        else if (port.mode === MODE_INPUT) {
            port.output = data;
        }
        else {
            port.output = data;
            this.emit(index ? 'out_pb_callback' : 'out_pa_callback', 0, port.ior | (port.output & (port.ior ^ 0xff)));
        }
    }
    portRead(index) {
        const port = this.ports[index & 1];
        if (port.mode === MODE_OUTPUT)
            return port.output;
        if (port.mode === MODE_BIDIRECTIONAL)
            return index ? 0xff : port.output;
        if (port.mode === MODE_BIT_CONTROL) {
            return (port.ior | (port.output & (port.ior ^ 0xff))) & 0xff;
        }
        return 0xff;
    }
    portWrite(index, data) {
        index &= 1;
        const port = this.ports[index];
        if (port.mode !== MODE_BIT_CONTROL)
            return;
        port.input = data & 0xff;
        const mask = (~port.mask) & 0xff;
        const compared = ((port.input & port.ior) | (port.output & ~port.ior)) & mask;
        const equation = port.interruptControl & 0x60;
        const match = equation === 0x00 ? compared !== mask
            : equation === 0x20 ? compared !== 0
                : equation === 0x40 ? compared === 0
                    : compared === mask;
        if (!port.match && match && !port.interruptUnderService) {
            port.interruptPending = true;
        }
        port.match = match;
        this.checkInterrupts();
    }
    strobe(index, state) {
        index &= 1;
        const port = this.ports[index];
        if (this.ports[0].mode === MODE_BIDIRECTIONAL) {
            if (port.ready) {
                if (port.strobe && !state) {
                    if (index === 0)
                        this.emit('out_pa_callback', 0, port.output);
                    else
                        this.ports[0].input = this.emit('in_pa_callback', 0) & 0xff;
                }
                else if (!port.strobe && state) {
                    this.triggerInterrupt(index);
                    this.setReady(index, false);
                }
            }
        }
        else if (port.mode === MODE_OUTPUT) {
            if (port.ready && !port.strobe && state) {
                this.triggerInterrupt(index);
                this.setReady(index, false);
            }
        }
        else if (port.mode === MODE_INPUT) {
            if (!state) {
                port.input = this.emit(index ? 'in_pb_callback' : 'in_pa_callback', 0) & 0xff;
            }
            else if (!port.strobe && state) {
                this.triggerInterrupt(index);
                this.setReady(index, false);
            }
        }
        port.strobe = state;
    }
    triggerInterrupt(index) {
        this.ports[index & 1].interruptPending = true;
        this.checkInterrupts();
    }
    checkInterrupts() {
        const underService = this.ports.some(port => port.interruptUnderService);
        const asserted = !underService && this.ports.some(port => port.interruptEnabled && port.interruptPending);
        this.emit('out_int_callback', Number(asserted));
    }
    irqState() {
        let state = 0;
        for (const port of this.ports) {
            if (port.interruptUnderService)
                return 2;
            if (port.interruptEnabled && port.interruptPending)
                state = 1;
        }
        return state;
    }
    irqAcknowledge() {
        for (const port of this.ports) {
            if (!port.interruptPending)
                continue;
            port.interruptPending = false;
            port.interruptUnderService = true;
            this.checkInterrupts();
            return port.vector;
        }
        return 0;
    }
    irqReti() {
        const port = this.ports.find(candidate => candidate.interruptUnderService);
        if (!port)
            return;
        port.interruptUnderService = false;
        this.checkInterrupts();
    }
}
function splitParameters(parameters) {
    return parameters.split(',').map(parameter => parameter.trim()).filter(Boolean);
}
