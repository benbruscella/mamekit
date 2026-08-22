// Keyboard -> input port state. Each port has a generated resting ("init")
// byte computed from field polarities in the knowledge graph: classic
// active-low ports rest at 0xff-ish (bit set = released), but e.g. galaxian's
// inputs are active-HIGH (bit set = pressed) — polarity is per binding.
/**
 * Build read handlers for the generated "port.<TAG>" keys (from .portr()
 * entries in the address map): each returns the live port byte.
 */
export function portHandlers(ranges, inputs) {
    const out = {};
    for (const r of ranges) {
        if (r.read?.startsWith('port.')) {
            const tag = r.read.slice('port.'.length);
            out[r.read] = () => inputs.read(tag);
        }
    }
    return out;
}
const OPPOSITE_SUFFIX = { _LEFT: '_RIGHT', _RIGHT: '_LEFT', _UP: '_DOWN', _DOWN: '_UP' };
export class KeyboardInput {
    state = {};
    init = {};
    byKey = new Map();
    /** physically-held state per field ("port:mask"), for SOCD restore */
    held = new Map();
    toggled = new Map();
    fields = [];
    /** opposite joystick direction per field id (LEFT<->RIGHT, UP<->DOWN) */
    opposite = new Map();
    /** when true, every key event + resulting port bytes go to the console */
    debug = false;
    constructor(bindings, _dipDefaults, ports) {
        // dip defaults are already folded into each port's init byte by the generator
        for (const p of ports) {
            this.init[p.tag] = p.init;
            this.state[p.tag] = p.init;
        }
        const fields = [];
        for (const b of bindings) {
            const f = {
                port: b.port,
                mask: b.mask,
                activeLow: b.activeLow !== false,
                label: b.label,
                toggle: b.toggle === true,
                activeValue: b.activeValue,
                relativeDelta: b.relativeDelta,
            };
            fields.push(f);
            for (const key of b.keys) {
                let list = this.byKey.get(key);
                if (!list) {
                    list = [];
                    this.byKey.set(key, list);
                }
                list.push(f);
            }
        }
        this.fields = fields;
        // SOCD pairs: opposite joystick directions on the same port. Arcade sticks
        // can never assert both, so game code ignores one — with a keyboard,
        // overlapping opposite arrows is routine and the newest press must win.
        for (const f of fields) {
            for (const [suffix, oppSuffix] of Object.entries(OPPOSITE_SUFFIX)) {
                if (!f.label.endsWith(suffix))
                    continue;
                const prefix = f.label.slice(0, -suffix.length);
                const opp = fields.find(o => o.port === f.port && o.label === prefix + oppSuffix);
                if (opp)
                    this.opposite.set(this.fid(f), opp);
            }
        }
    }
    fid(f) { return `${f.port}:${f.mask}:${f.label}`; }
    /**
     * Advance relative cabinet controls once per emulated frame. MAME's
     * PORT_KEYDELTA describes a frame-rate input ramp; browser key-repeat is an
     * OS preference and may be delayed, disabled, or absent in automation.
     */
    advance() {
        for (const field of this.fields) {
            if (field.relativeDelta === undefined || !this.held.get(this.fid(field)))
                continue;
            const current = this.state[field.port] & field.mask;
            this.state[field.port] = (this.state[field.port] & ~field.mask) |
                ((current + field.relativeDelta) & field.mask);
        }
    }
    /** drive a field active (pressed) or back to its resting bits */
    apply(f, active) {
        if (active) {
            this.state[f.port] = f.activeValue !== undefined
                ? (this.state[f.port] & ~f.mask) | (f.activeValue & f.mask)
                : f.activeLow ? this.state[f.port] & ~f.mask : this.state[f.port] | f.mask;
        }
        else {
            this.state[f.port] = (this.state[f.port] & ~f.mask) | (this.init[f.port] & f.mask);
        }
    }
    attach(target) {
        target.addEventListener('keydown', ev => this.onKey(ev, true));
        target.addEventListener('keyup', ev => this.onKey(ev, false));
        // keyup events are lost when focus leaves (OS shortcuts — notably
        // Ctrl+Arrow on macOS — tab switches, screenshots): release everything
        // or keys stay latched ("sticky" input)
        target.addEventListener('blur', () => this.releaseAll());
        target.addEventListener('visibilitychange', () => { if (document.hidden)
            this.releaseAll(); });
    }
    onKey(ev, down) {
        const hits = this.byKey.get(ev.code);
        if (!hits) {
            if (this.debug && down && !ev.repeat)
                console.log(`[input] ${ev.code} unbound`);
            return;
        }
        ev.preventDefault();
        for (const h of hits) {
            if (h.relativeDelta !== undefined) {
                if (ev.repeat)
                    continue;
                this.held.set(this.fid(h), down);
                if (down) {
                    // Make a tap observable immediately; advance() supplies subsequent
                    // MAME-style per-frame deltas for as long as the key remains held.
                    const current = this.state[h.port] & h.mask;
                    this.state[h.port] = (this.state[h.port] & ~h.mask) |
                        ((current + h.relativeDelta) & h.mask);
                }
                continue;
            }
            if (ev.repeat)
                continue; // digital auto-repeat carries no new information
            if (h.toggle) {
                if (!down)
                    continue;
                const active = !(this.toggled.get(this.fid(h)) ?? false);
                this.toggled.set(this.fid(h), active);
                this.apply(h, active);
                continue;
            }
            this.held.set(this.fid(h), down);
            const opp = this.opposite.get(this.fid(h));
            this.apply(h, down);
            if (opp && this.held.get(this.fid(opp))) {
                // SOCD: newest direction wins while both are physically held;
                // releasing it hands control back to the still-held opposite
                this.apply(opp, !down);
            }
            if (this.debug) {
                console.log(`[input] ${ev.code} ${down ? 'DOWN' : 'UP'} -> ${h.port} mask=0x${h.mask.toString(16)} ` +
                    `${h.activeLow ? 'activeLow' : 'activeHigh'} | ${this.dump()}`);
            }
        }
    }
    /** all port bytes as hex, for logging/overlay */
    dump() {
        return Object.entries(this.state).map(([t, v]) => `${t}=${v.toString(16).padStart(2, '0')}`).join(' ');
    }
    /** release every input back to its resting byte (dips keep their value) */
    releaseAll() {
        for (const tag of Object.keys(this.state))
            this.state[tag] = this.init[tag];
        this.held.clear();
        for (const field of this.fields) {
            if (field.toggle && this.toggled.get(this.fid(field)))
                this.apply(field, true);
        }
    }
    read(tag) {
        return this.state[tag] ?? 0xff;
    }
    setDip(port, mask, value) {
        this.init[port] = (this.init[port] & ~mask) | (value & mask);
        this.state[port] = (this.state[port] & ~mask) | (value & mask);
    }
}
