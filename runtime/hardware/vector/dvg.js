// Atari Digital Vector Generator display-list executor.
//
// The instruction words and rate-multiplier stepping mirror MAME's
// dvg_device handlers. Rendering is kept separate: this capability returns
// the beam endpoints and intensities consumed by the generated video host.
export function executeDvgDisplayList(readByte, plan, maximumInstructions = 10_000) {
    const coordinateMask = (1 << (plan.coordinateBits + 2)) - 1;
    const invalidBit = 1 << plan.coordinateBits;
    const signBit = invalidBit;
    const points = [];
    const stack = [];
    let pc = 0;
    let scale = 0;
    let x = 0;
    let y = 0;
    const word = (address) => {
        const byteAddress = plan.memoryBase + (address << 1);
        return (readByte(byteAddress) | (readByte(byteAddress + 1) << 8)) & 0xffff;
    };
    const append = (intensity) => {
        if (!((x | y) & invalidBit))
            points.push({ x, y, intensity });
    };
    const draw = (rawX, rawY, opcode) => {
        const vectorScale = opcode === 0x0f
            ? (scale + (((rawY & 0x800) >>> 11) |
                (((rawX & 0x800) ^ 0x800) >>> 10) |
                ((rawX & 0x800) >>> 9))) & 0x0f
            : (scale + opcode) & 0x0f;
        if (opcode === 0x0f) {
            rawX &= 0x0f00;
            rawY &= 0x0f00;
        }
        let remaining = 0x0fff - ((((2 << vectorScale) & 0x07ff) ^ 0x0fff));
        const directionX = rawX & signBit ? -1 : 1;
        const directionY = rawY & signBit ? -1 : 1;
        const multiplierX = (rawX << 2) & 0x0fff;
        const multiplierY = (rawY << 2) & 0x0fff;
        let counter = 0;
        while (remaining-- > 0) {
            let stepX = false;
            let stepY = false;
            for (let bit = 0; bit < 12; bit++) {
                if ((counter & ((1 << (bit + 1)) - 1)) !== ((1 << bit) - 1))
                    continue;
                if (multiplierX & (1 << (11 - bit)))
                    stepX = true;
                if (multiplierY & (1 << (11 - bit)))
                    stepY = true;
            }
            counter = (counter + 1) & 0x0fff;
            if (stepX)
                x = (x + directionX) & coordinateMask;
            if (stepY)
                y = (y + directionY) & coordinateMask;
        }
    };
    for (let instructions = 0; instructions < maximumInstructions; instructions++) {
        const first = word(pc);
        const opcode = first >>> 12;
        if (opcode <= 0x09) {
            const second = word(pc + 1);
            draw(second & 0x0fff, first & 0x0fff, opcode);
            append(second >>> 12);
            pc += 2;
            continue;
        }
        if (opcode === 0x0a) { // LABS: absolute beam position and global scale
            const second = word(pc + 1);
            y = first & 0x0fff;
            x = second & 0x0fff;
            scale = second >>> 12;
            append(0);
            pc += 2;
            continue;
        }
        if (opcode === 0x0b)
            break; // HALT
        if (opcode === 0x0c) { // JSRL
            if (stack.length >= 4)
                break;
            stack.push(pc + 1);
            pc = first & 0x0fff;
            continue;
        }
        if (opcode === 0x0d) { // RTSL
            const target = stack.pop();
            if (target === undefined)
                break;
            pc = target;
            continue;
        }
        if (opcode === 0x0e) { // JMPL
            pc = first & 0x0fff;
            continue;
        }
        // SVEC packs intensity/X in the low byte and Y/opcode in the high byte.
        const rawX = (first & 0x000f) << 8;
        const rawY = ((first >>> 8) & 0x000f) << 8;
        draw(rawX, rawY, opcode);
        append((first >>> 4) & 0x0f);
        pc++;
    }
    return points;
}
