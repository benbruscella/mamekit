// Namco 51xx I/O + coin management custom chip — high-level emulation.
// Hand-transpiled from the classic MAME HLE (0.121 src/mame/machine/namcoio.c,
// namcoio_51XX_read/write), which MAME shipped for years before the MB8843
// MCU dump. Command set per the modern namco51.cpp doc header:
//   00 nop | 01+4 args: set coinage | 02 credit mode | 03/04 joystick remap
//   off/on | 05 switch mode
//
// Port wiring note: this class takes the four input callbacks exactly as the
// modern machine config wires them (in0 = IN0&0x0f joy P1, in1 = IN0>>4 joy P2
// cocktail, in2 = IN1&0x0f buttons/starts, in3 = IN1>>4 coins/service). The
// classic HLE was written against the OLD port order (coins on port 0), so we
// reorder internally.
const JOY_MAP = [0xf, 0xe, 0xd, 0x5, 0xc, 0x9, 0x7, 0x6, 0xb, 0x3, 0xa, 0x4, 0x1, 0x2, 0x0, 0x8];
export class Namco51 {
    mode = 0; // 0 = switch, 1 = credit, 2 = credit (game started)
    coincredMode = 0;
    remapJoy = 0;
    credits = 0;
    coins = [0, 0];
    coinsPerCred = [1, 1];
    credsPerCoin = [1, 1];
    inCount = 0;
    lastCoins = 0;
    lastButtons = 0;
    inputs;
    constructor(inputs) {
        this.inputs = inputs;
    }
    reset() {
        this.mode = 0;
        this.coincredMode = 0;
        this.remapJoy = 0;
        this.credits = 0;
        this.coins = [0, 0];
        this.inCount = 0;
        this.lastCoins = 0;
        this.lastButtons = 0;
    }
    // classic-HLE port order: 0/1 = coins-and-starts byte nibbles, 2 = P1 joy, 3 = P2 joy
    switchByte() {
        return (this.inputs.in[2]() & 0x0f) | ((this.inputs.in[3]() & 0x0f) << 4);
    }
    joyByte() {
        return (this.inputs.in[0]() & 0x0f) | ((this.inputs.in[1]() & 0x0f) << 4);
    }
    write(data) {
        data &= 0x07;
        if (this.coincredMode) {
            switch (this.coincredMode--) {
                case 4:
                    this.coinsPerCred[0] = data;
                    break;
                case 3:
                    this.credsPerCoin[0] = data;
                    break;
                case 2:
                    this.coinsPerCred[1] = data;
                    break;
                case 1:
                    this.credsPerCoin[1] = data;
                    break;
            }
            return;
        }
        switch (data) {
            case 1:
                this.coincredMode = 4;
                this.credits = 0;
                break;
            case 2:
                this.mode = 1;
                this.inCount = 0;
                break;
            case 3:
                this.remapJoy = 0;
                break;
            case 4:
                this.remapJoy = 1;
                break;
            case 5:
                this.mode = 0;
                this.inCount = 0;
                break;
            default: break; // 0, 6, 7: nop
        }
    }
    read() {
        if (this.mode === 0) { // switch mode
            switch (this.inCount++ % 3) {
                default:
                case 0: return this.switchByte();
                case 1: return this.joyByte();
                case 2: return 0;
            }
        }
        // credit mode
        switch (this.inCount++ % 3) {
            default:
            case 0: return this.creditByte();
            case 1: return this.playerByte(0);
            case 2: return this.playerByte(1);
        }
    }
    creditByte() {
        const inRaw = ~this.switchByte() & 0xff;
        const toggle = inRaw ^ this.lastCoins;
        this.lastCoins = inRaw;
        if (this.coinsPerCred[0] > 0) {
            if (this.credits >= 99) {
                this.inputs.out?.(1); // coin lockout
            }
            else {
                if (toggle & inRaw & 0x10) { // coin 1
                    this.coins[0]++;
                    if (this.coins[0] >= this.coinsPerCred[0]) {
                        this.credits += this.credsPerCoin[0];
                        this.coins[0] -= this.coinsPerCred[0];
                    }
                }
                if (toggle & inRaw & 0x20) { // coin 2
                    this.coins[1]++;
                    if (this.coins[1] >= this.coinsPerCred[1]) {
                        this.credits += this.credsPerCoin[1];
                        this.coins[1] -= this.coinsPerCred[1];
                    }
                }
                if (toggle & inRaw & 0x40) { // service coin
                    this.credits++;
                }
            }
        }
        else {
            this.credits = 100; // free play
        }
        if (this.mode === 1) {
            // start buttons only accepted in mode 1 (attract); mode 2 = playing
            if (toggle & inRaw & 0x04) { // 1P start
                if (this.credits >= 1) {
                    this.credits--;
                    this.mode = 2;
                }
            }
            else if (toggle & inRaw & 0x08) { // 2P start
                if (this.credits >= 2) {
                    this.credits -= 2;
                    this.mode = 2;
                }
            }
        }
        // test-mode switch (service DIP): modern IN1 bit 7
        const in1Full = (this.inputs.in[2]() & 0x0f) | ((this.inputs.in[3]() & 0x0f) << 4);
        if ((~in1Full & 0x80) !== 0)
            return 0xbb;
        return ((this.credits / 10) | 0) * 16 + (this.credits % 10);
    }
    playerByte(player) {
        let joy = (player === 0 ? this.inputs.in[0]() : this.inputs.in[1]()) & 0x0f;
        const inRaw = ~this.switchByte() & 0xff;
        const buttonBit = player === 0 ? 0x01 : 0x02;
        const toggle = inRaw ^ this.lastButtons;
        this.lastButtons = (this.lastButtons & ~buttonBit) | (inRaw & buttonBit);
        if (this.remapJoy)
            joy = JOY_MAP[joy];
        const pressed = (inRaw & buttonBit) !== 0 ? 1 : 0;
        const edge = (toggle & inRaw & buttonBit) !== 0 ? 1 : 0;
        joy |= (edge ^ 1) << 4; // active-low fire edge
        joy |= (pressed ^ 1) << 5; // active-low fire level
        return joy;
    }
    /** debug snapshot for the live viewer */
    snapshot() {
        return { mode: this.mode, credits: this.credits, remapJoy: this.remapJoy };
    }
}
