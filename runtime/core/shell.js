// Browser shell: ROM loading, canvas presentation (with screen rotation),
// keyboard and gamepad input, audio bring-up, and the fixed-timestep run loop.
// Pure DOM — no libraries.
import { createBoard } from "./generated-board.js";
import { loadArtwork } from "./artwork.js";
import { KeyboardInput } from "./input.js";
import { GamepadInput, padName } from "./gamepad.js";
import { PointerInput } from "./pointer.js";
import { AudioOutput } from "./audio.js";
import { readZip, crc32 } from "./zip.js";
import { executeGeneratedHandler } from "../ir/execute.js";
import { fetchRomBytes } from "./rom-source.js";
import { machineIdentity, openSaveStore, saveId } from "./savestore.js";
import { createNetplay } from "./netplay.js";
import { DECK_GOLD, deckButton, deckPanel, deckVent, paintTitleButton, setDeckButtonState, setTitleButtonText, titleButton, toolbarDivider, } from "./controls.js";
import { openRomStore } from "./romstore.js";
import { openMemoryStore } from "./memorystore.js";
import { createMachineMemory } from "./machine-memory.js";
/** A chip MAME says exists on the board and can actually be supplied. */
export function isDumpedRom(load) {
    return load.status !== 'nodump';
}
/**
 * Regions whose absence cannot produce a usable machine.  In addition to the
 * board CPUs, this includes firmware owned by MAME device ROM sets.  Split
 * MAME collections keep those chips in (for example) namco51.zip rather than
 * the game's zip; silently zero-filling them can pass the main-CPU boot ROM
 * check while leaving I/O or sound controllers dead.
 */
export function requiredRomRegions(specs, cpuRegions) {
    const required = new Set(cpuRegions);
    for (const spec of specs) {
        if (spec.romSet && spec.loads.some(isDumpedRom))
            required.add(spec.region);
    }
    return required;
}
/** Distinct external device sets needed alongside the game's own zip. */
export function dependencyRomSets(specs, game) {
    return [...new Set(specs.flatMap(spec => spec.romSet && spec.loads.some(isDumpedRom) ? [spec.romSet] : []))]
        .filter(set => set !== game);
}
/**
 * External ROM archives still needed after inspecting the primary archive.
 *
 * Merged collections commonly bundle a clone's parent files in the same zip.
 * Requiring `<parent>.zip` by name even when every required CRC is already
 * present turns a complete set into an environment failure (Pac-Man's
 * `pacman.zip` containing its `puckman` parent is the canonical example).
 */
export function unresolvedDependencyRomSets(specs, game, files) {
    return dependencyRomSets(specs, game).filter(romSet => {
        const owned = specs.filter(spec => spec.romSet === romSet);
        const required = new Set(owned.map(spec => spec.region));
        const check = checkRomSet(owned, files, required);
        return check.missingCritical.length > 0 || check.crcMismatch.length > 0;
    });
}
/**
 * Look for the romset on the web. Sources and their order live in
 * rom-source.ts, shared with the console room's cartridge fetch.
 */
async function fetchRomSet(game, category = 'arcade', firmwareKey) {
    // A computer's firmware is filed under the machine's own dump directory
    // (computers/c64/bios/c64.zip), beside the software it runs; a console's or
    // arcade board's set sits at the category root.
    // A clone's firmware is its parent's chips under a different set name --
    // the PAL C64 loads the NTSC machine's ROMs -- and the audit files the one
    // zip under the family, so that name is tried too; the chips are matched by
    // name and CRC either way.
    const family = firmwareKey?.split('/').pop();
    const keys = firmwareKey
        ? [...new Set([`${firmwareKey}/bios/${game}.zip`, `${firmwareKey}/bios/${family}.zip`, `${category}/${game}.zip`])]
        : [`${category}/${game}.zip`];
    for (const key of keys) {
        const bytes = await fetchRomBytes(key);
        if (bytes)
            return bytes;
    }
    throw new Error(`no web source had ${game}.zip`);
}
/**
 * Where this machine's own romset lives, mirroring the .data/roms layout:
 * "arcade/pacman.zip", "consoles/coleco.zip". A console's cartridges sit one
 * level deeper, under the machine's own directory.
 */
function romCategory(dataPath) {
    return dataPath.replace(/^games\//, '').split('/')[0] ?? 'arcade';
}
/**
 * Find the zip entry satisfying one manifest slot: the primary chip by
 * name / dash-underscore-swapped name / CRC, else any clone-revision
 * alternate (same slot in a sibling set) by CRC or name.
 */
export function findRomBytes(load, files, byCrc) {
    const expected = parseInt(load.crc, 16) >>> 0;
    const primary = files.get(load.file.toLowerCase())
        ?? files.get(load.file.toLowerCase().replace(/_/g, '-'))
        ?? byCrc.get(expected);
    if (primary && crc32(primary) === expected)
        return { bytes: primary, exact: true };
    for (const alt of load.alt ?? []) {
        const altCrc = parseInt(alt.crc, 16) >>> 0;
        const f = byCrc.get(altCrc) ?? files.get(alt.file.toLowerCase());
        if (f && crc32(f) === altCrc)
            return { bytes: f, exact: true };
    }
    // name matched but unknown bytes: usable, flagged as a CRC difference
    return { bytes: primary ?? null, exact: false };
}
/** Match a zip's contents against the romset manifest without assembling. */
export function checkRomSet(specs, files, critical) {
    const byCrc = new Map();
    for (const bytes of files.values())
        byCrc.set(crc32(bytes), bytes);
    const check = { perFile: [], missingCritical: [], missingOther: [], crcMismatch: [] };
    for (const spec of specs) {
        for (const load of spec.loads) {
            // An undumped chip cannot be in any ROM set. Reporting it as missing
            // told users to go looking for a file that does not exist.
            if (!isDumpedRom(load))
                continue;
            const isCrit = critical.has(spec.region);
            const { bytes, exact } = findRomBytes(load, files, byCrc);
            let status;
            if (!bytes) {
                status = 'missing';
                (isCrit ? check.missingCritical : check.missingOther).push(load.file);
            }
            else if (!exact) {
                status = 'crc';
                check.crcMismatch.push(load.file);
            }
            else {
                status = 'ok';
            }
            check.perFile.push({ region: spec.region, file: load.file, critical: isCrit, status });
        }
    }
    return check;
}
/** A small BETA pill for a machine exposed before its acceptance exists. */
export function betaBadge() {
    const badge = document.createElement('span');
    badge.setAttribute('data-beta', '');
    badge.textContent = 'BETA';
    badge.title = 'This machine is in beta: it boots and plays, but its emulation has not passed gameplay acceptance yet';
    badge.style.cssText = `display:inline-block;vertical-align:middle;margin-left:8px;padding:2px 7px;border-radius:5px;
    font:800 10px ui-monospace,monospace;letter-spacing:1.2px;color:#1b1b1b;background:#f2c200`;
    return badge;
}
/**
 * Run a lowered driver init over the assembled ROM regions.
 *
 * The environment is deliberately small: MAME's region finder, and the memory
 * bank finder as a recorder. Bank configuration is already lowered declaratively
 * from the same function, so the calls the init makes into it are accepted and
 * discarded rather than being a reason to refuse the program.
 */
function executeDriverInitProgram(transform, regions) {
    const where = transform.source
        ? `${transform.source.file}:${transform.source.line}`
        : transform.method;
    const referenceCalls = {
        memregion: (...args) => {
            const tag = String(argumentValue(args[0]) ?? '');
            const bytes = regions[tag];
            if (!bytes)
                throw new Error(`${where}: driver init has no ROM region "${tag}"`);
            return { base: () => bytes, bytes: () => bytes.length };
        },
        membank: () => ({
            configure_entries: () => 0,
            configure_entry: () => 0,
            set_entry: () => 0,
        }),
    };
    for (const helper of transform.helpers) {
        const names = helper.parameters
            .split(',')
            .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
            .filter((name) => Boolean(name));
        referenceCalls[helper.method] = (...args) => executeGeneratedHandler(helper.program, { constants: {}, members: {}, referenceCalls }, Object.fromEntries(names.map((name, index) => [name, argumentValue(args[index])])));
    }
    executeGeneratedHandler(transform.program, { constants: {}, members: {}, referenceCalls });
}
/** Unwrap the l-value a generated call receives for a reference parameter. */
function argumentValue(value) {
    return value && typeof value === 'object' &&
        typeof value.get === 'function'
        ? value.get()
        : value;
}
export function applyRomTransforms(regions, transforms) {
    for (const transform of transforms) {
        if (transform.kind === 'address-byte-bitswap') {
            const region = regions[transform.region];
            if (!region || transform.start < 0 || transform.end < transform.start ||
                transform.end > region.length || transform.addressBits.length !== 16 ||
                transform.dataBits.length !== 8 || new Set(transform.addressBits).size !== 16 ||
                new Set(transform.dataBits).size !== 8) {
                throw new Error(`ROM address/data bitswap for "${transform.region}" is invalid`);
            }
            const source = region.slice();
            const bitswap = (value, bits) => bits.reduce((result, sourceBit, outputIndex) => result | (((value >>> sourceBit) & 1) << (bits.length - outputIndex - 1)), 0);
            for (let index = transform.start; index < transform.end; index++) {
                const address = bitswap(index, transform.addressBits) ^ transform.addressXor;
                if (address < 0 || address >= source.length) {
                    throw new Error(`ROM address bitswap for "${transform.region}" reads ${address}`);
                }
                region[index] = bitswap(source[address], transform.dataBits);
            }
            continue;
        }
        if (transform.kind === 'conditional-byte-swap') {
            const region = regions[transform.region];
            if (!region)
                throw new Error(`ROM transform has no region "${transform.region}"`);
            for (let index = 0; index < region.length; index++) {
                if (((index & transform.indexMask) >>> 0) !== (transform.indexValue >>> 0))
                    continue;
                const other = index + transform.displacement;
                if (other < 0 || other >= region.length) {
                    throw new Error(`ROM transform for "${transform.region}" swaps ${index} with out-of-range ${other}`);
                }
                const value = region[index];
                region[index] = region[other];
                region[other] = value;
            }
            continue;
        }
        if (transform.kind === 'byte-bitswap') {
            const region = regions[transform.region];
            if (!region ||
                transform.start < 0 ||
                transform.end < transform.start ||
                transform.end > region.length ||
                transform.bits.length !== 8 ||
                transform.bits.some(bit => bit < 0 || bit > 7) ||
                new Set(transform.bits).size !== 8) {
                throw new Error(`ROM byte bitswap for "${transform.region}" has invalid bounds or bit order`);
            }
            for (let index = transform.start; index < transform.end; index++) {
                const value = region[index];
                region[index] = transform.bits.reduce((result, sourceBit, outputIndex) => result | (((value >> sourceBit) & 1) << (7 - outputIndex)), 0);
            }
            continue;
        }
        if (transform.kind === 'word-bitswap') {
            const region = regions[transform.region];
            const bytesPerWord = transform.wordBits / 8;
            if (!region || transform.wordBits !== 32 || region.length % bytesPerWord !== 0 ||
                transform.bits.length !== transform.wordBits ||
                transform.bits.some(bit => bit < 0 || bit >= transform.wordBits) ||
                new Set(transform.bits).size !== transform.wordBits) {
                throw new Error(`ROM word bitswap for "${transform.region}" is invalid`);
            }
            for (let offset = 0; offset < region.length; offset += bytesPerWord) {
                const source = (region[offset] |
                    (region[offset + 1] << 8) |
                    (region[offset + 2] << 16) |
                    (region[offset + 3] << 24)) >>> 0;
                const value = transform.bits.reduce((result, sourceBit, outputIndex) => (result | (((source >>> sourceBit) & 1) << (31 - outputIndex))) >>> 0, 0);
                region[offset] = value;
                region[offset + 1] = value >>> 8;
                region[offset + 2] = value >>> 16;
                region[offset + 3] = value >>> 24;
            }
            continue;
        }
        if (transform.kind === 'prom-word-address') {
            const region = regions[transform.region];
            const prom = regions[transform.promRegion];
            const rowCount = transform.bitPickTable.length;
            if (!region || !prom || transform.wordBytes <= 0 || region.length % transform.wordBytes !== 0 ||
                !rowCount || transform.bitPickTable.some(row => row.length <= transform.tableEntryMask ||
                row.some(bit => bit < 0 || bit >= rowCount))) {
                throw new Error(`PROM word-address transform for "${transform.region}" is invalid`);
            }
            const source = region.slice();
            const wordCount = region.length / transform.wordBytes;
            for (let address = 0; address < wordCount; address++) {
                const tableAddress = (address & transform.tableAddressMask) >>>
                    transform.tableAddressShift;
                const entry = (prom[tableAddress] ?? 0) & transform.tableEntryMask;
                let sourceAddress = address & transform.addressKeepMask;
                for (let bit = 0; bit < rowCount; bit++) {
                    sourceAddress |= ((address >>> transform.bitPickTable[bit][entry]) & 1) << bit;
                }
                if (sourceAddress < 0 || sourceAddress >= wordCount) {
                    throw new Error(`PROM word-address transform for "${transform.region}" reads ${sourceAddress}`);
                }
                const targetOffset = address * transform.wordBytes;
                const sourceOffset = sourceAddress * transform.wordBytes;
                region.set(source.subarray(sourceOffset, sourceOffset + transform.wordBytes), targetOffset);
            }
            continue;
        }
        if (transform.kind === 'init-program') {
            executeDriverInitProgram(transform, regions);
            continue;
        }
        const source = regions[transform.sourceRegion];
        if (!source) {
            throw new Error(`ROM transform has no source region "${transform.sourceRegion}"`);
        }
        if (transform.kind === 'sega-z80-decrypt') {
            if (!source || transform.start < 0 || transform.end < transform.start ||
                transform.end > source.length) {
                throw new Error(`Sega Z80 transform for "${transform.sourceRegion}" has invalid bounds`);
            }
            const target = source.slice();
            if (transform.algorithm === 'segacrpt') {
                if (transform.convtable?.length !== 128) {
                    throw new Error('Sega Z80 transform has no 32x4 conversion table');
                }
                for (let address = transform.start; address < transform.end; address++) {
                    const src = source[address];
                    const row = (address & 1) | (((address >>> 4) & 1) << 1) |
                        (((address >>> 8) & 1) << 2) | (((address >>> 12) & 1) << 3);
                    let column = ((src >>> 3) & 1) | (((src >>> 5) & 1) << 1);
                    let xor = 0;
                    if (src & 0x80) {
                        column = 3 - column;
                        xor = 0xa8;
                    }
                    const opcodeKey = transform.convtable[2 * row * 4 + column];
                    const dataKey = transform.convtable[(2 * row + 1) * 4 + column];
                    target[address] = opcodeKey === 0xff
                        ? 0xee : (src & ~0xa8) | (opcodeKey ^ xor);
                    source[address] = dataKey === 0xff
                        ? 0xee : (src & ~0xa8) | (dataKey ^ xor);
                }
            }
            else {
                if (transform.xorTable?.length !== 128 || transform.swapTable?.length !== 128) {
                    throw new Error('Sega Z80 transform has no 128-entry XOR/swap tables');
                }
                const swaps = [
                    [6, 4, 2, 0], [4, 6, 2, 0], [2, 4, 6, 0], [0, 4, 2, 6],
                    [6, 2, 4, 0], [6, 0, 2, 4], [6, 4, 0, 2], [2, 6, 4, 0],
                    [4, 2, 6, 0], [4, 6, 0, 2], [6, 0, 4, 2], [0, 6, 4, 2],
                    [4, 0, 6, 2], [0, 4, 6, 2], [6, 2, 0, 4], [2, 6, 0, 4],
                    [0, 6, 2, 4], [2, 0, 6, 4], [0, 2, 6, 4], [4, 2, 0, 6],
                    [2, 4, 0, 6], [4, 0, 2, 6], [2, 0, 4, 6], [0, 2, 4, 6],
                ];
                const decode = (value, tableIndex, xor) => {
                    const bits = swaps[tableIndex];
                    return (((((value >>> 7) & 1) << 7) |
                        (((value >>> bits[0]) & 1) << 6) |
                        (((value >>> 5) & 1) << 5) |
                        (((value >>> bits[1]) & 1) << 4) |
                        (((value >>> 3) & 1) << 3) |
                        (((value >>> bits[2]) & 1) << 2) |
                        (((value >>> 1) & 1) << 1) |
                        ((value >>> bits[3]) & 1)) ^ xor) & 0xff;
                };
                for (let address = transform.start; address < transform.end; address++) {
                    const src = source[address];
                    const row = (((address >>> 14) & 1) << 5) |
                        (((address >>> 12) & 1) << 4) | (((address >>> 9) & 1) << 3) |
                        (((address >>> 6) & 1) << 2) | (((address >>> 3) & 1) << 1) |
                        (address & 1);
                    target[address] = decode(src, transform.swapTable[2 * row], transform.xorTable[2 * row]);
                    source[address] = decode(src, transform.swapTable[2 * row + 1], transform.xorTable[2 * row + 1]);
                }
            }
            regions[transform.targetRegion] = target;
            continue;
        }
        if (transform.start < 0 ||
            transform.end < transform.start ||
            transform.end > source.length ||
            transform.table.length !== 256) {
            throw new Error(`ROM byte substitution for "${transform.targetRegion}" has invalid bounds or table`);
        }
        const target = source.slice();
        for (let index = transform.start; index < transform.end; index++) {
            target[index] = transform.table[source[index]];
        }
        regions[transform.targetRegion] = target;
    }
}
/**
 * `preloaded` bypasses the drop-zone/manifest path: the console room hands
 * over already-verified cart regions (regions.prg/chr) after identification.
 */
export async function runShell(cfg, preloaded, mounted = []) {
    const ui = buildDom(cfg);
    // Cabinet bezels are arcade presentation. Console carts boot into the clean
    // television viewport from their room and must not probe for an arcade
    // artwork zip that cannot exist.
    if (cfg.kind !== 'console') {
        void loadArtwork(cfg.game).then(art => {
            if (art?.window)
                ui.setBezel(art.bmp, art.window, art.tints);
        });
    }
    // Esc: back to the boot menu (registered first + capture so a single press
    // always works, at any stage of loading). A dialog gets first refusal: a
    // player closing the two-player lobby is not asking to leave the game, and
    // before this the same key did both at once.
    addEventListener('keydown', ev => {
        if (ev.code !== 'Escape')
            return;
        ev.preventDefault();
        if (ui.modalOpen()) {
            ui.dismissModal();
            return;
        }
        if (ui.popoverOpen()) {
            ui.closePopover();
            return;
        }
        location.href = cfg.menuUrl ?? './';
    }, { capture: true });
    // --- ROM acquisition -------------------------------------------------------
    // ROMs never touch the mamekit server and are never auto-fetched. Arcade
    // path: the set this browser already keeps (romstore, by explicit user
    // approval 2026-09-09, issue #132) boots straight in; otherwise a drag-drop
    // in this page load — plus the opt-in "Try web search" button, which
    // fetches from the public mirror bucket only on an explicit click (user
    // directive 2026-07-19, arcade only) — and the accepted zips are kept for
    // next time. Console path: the room hands in cart regions it already
    // identified (persisted only in the visitor's own browser via cartstore, by
    // explicit user approval 2026-07-07).
    let regions;
    const romStore = await openRomStore();
    const memoryStore = await openMemoryStore();
    // What the machine kept between sessions (NVRAM, high scores); read now so
    // it is in hand before the board's first frame.
    const storedMemory = memoryStore.get(cfg.game).catch((error) => {
        console.warn(`${cfg.game}: stored memory unreadable: ${error.message}`);
        return null;
    });
    let keptRom = false;
    // A cartridge is the whole machine only when the machine needs no ROM files
    // of its own. The NES declares a maincpu region with nothing in it -- the
    // cartridge fills it -- while the ColecoVision declares a real BIOS, so its
    // cartridge mounts ON TOP of the romset rather than instead of it. Keying on
    // the region list instead of the loads inside it would send the NES looking
    // for an nes.zip that does not exist.
    const needsRomFiles = cfg.roms.some(spec => spec.loads.length > 0);
    if (preloaded && !needsRomFiles) {
        regions = preloaded;
    }
    else {
        // Device firmware is just as boot-critical as CPU code even though MAME
        // stores it in a separate split-set zip.
        const critical = requiredRomRegions(cfg.roms, cfg.board.cpus.map(c => c.region));
        const dependencies = dependencyRomSets(cfg.roms, cfg.game);
        const kept = await storedRomFiles(romStore, cfg.game, cfg.roms, critical);
        if (kept) {
            ui.status(`Booting ${cfg.title} from the ${cfg.game}.zip kept in this browser…`);
            regions = assembleRegions(cfg.roms, kept, ui.status, critical);
            keptRom = true;
        }
        else {
            // A page opened from an invite still needs its own dump, and the drop
            // screen used to say nothing about why they were here (issue #140).
            const zone = ui.dropZone(cfg.game, inviteCode() !== undefined);
            const companionText = dependencies.length
                ? ` plus ${dependencies.map(set => `${set}.zip`).join(', ')}`
                : '';
            ui.status(`ROMs are not distributed with mamekit — drop your own ${cfg.game}.zip${companionText} (kept only in this browser).`);
            const { files, zips } = await waitForZip(ui, zone, cfg.roms, critical, cfg.game, romCategory(cfg.dataPath), cfg.software?.dumpsKey);
            regions = assembleRegions(cfg.roms, files, ui.status, critical);
            keptRom = await keepRomSet(romStore, cfg.game, zips, ui.toast);
        }
        // The cartridge the console room already resolved wins over anything of
        // the same name in the machine set.
        if (preloaded)
            Object.assign(regions, preloaded);
    }
    // driver-init ROM byte patches from the graph (rocnrope's one-instruction fix)
    for (const p of cfg.romPatches ?? []) {
        const region = regions[p.region];
        if (region && p.offset < region.length)
            region[p.offset] = p.value;
    }
    applyRomTransforms(regions, cfg.romTransforms ?? []);
    // --- machine ----------------------------------------------------------------
    const input = new KeyboardInput(cfg.bindings, cfg.dipDefaults, cfg.ports);
    input.debug = new URLSearchParams(location.search).has('debug');
    input.attach(window);
    if (input.debug)
        console.log('[input] debug on — bindings:', cfg.bindings, 'ports:', cfg.ports);
    // A pad drives the same generated fields, polled once per emulated frame
    // below. The Gamepad API reports nothing until the page has had a gesture,
    // and the click that chose this machine is one.
    const pads = new GamepadInput(input, cfg.bindings, () => navigator.getGamepads?.() ?? []);
    pads.debug = input.debug;
    pads.attach(window);
    // A spinner or trackball is a mouse to the browser: pointer travel over
    // the screen turns the machine's dials, scaled by MAME's own sensitivity.
    const pointer = new PointerInput(input, cfg.bindings);
    pointer.debug = input.debug;
    pointer.attach(ui.canvas);
    // The legend is first drawn before either source exists; redraw it now
    // that both do, and again whenever a pad or the pointer capture changes.
    ui.controls(controlsHelp(cfg, pads, pointer));
    pointer.onChange(() => ui.controls(controlsHelp(cfg, pads, pointer)));
    // A pad arriving or leaving is announced three ways: the badge beside the
    // title while it is here, a toast over the screen the moment it changes,
    // and the legend naming its buttons.
    let knownPads = new Map();
    pads.onChange(connected => {
        ui.controls(controlsHelp(cfg, pads, pointer));
        const label = (pad) => `${padName(pad.id)}${connected.length > 1 || pad.player > 1 ? ` (player ${pad.player})` : ''}`;
        ui.pads(connected.map(pad => `${label(pad)} connected`));
        const now = new Map(connected.map(pad => [pad.index, label(pad)]));
        for (const [index, name] of now)
            if (!knownPads.has(index))
                ui.toast(`🎮 ${name} connected as player ${connected.find(pad => pad.index === index).player}`);
        for (const [index, name] of knownPads)
            if (!now.has(index))
                ui.toast(`🎮 ${name} disconnected`);
        knownPads = now;
    });
    const audio = new AudioOutput();
    // Counted, not just forwarded: browser QA compares these against the token's
    // accepted audio golden. Real-time playback cannot reproduce the offline PCM
    // hash, so without the stream counts a whole silent channel is invisible to
    // the browser gate — Gyruss shipped with its entire i8039 percussion channel
    // emitting nothing and every other check still passed.
    const soundWrites = { total: 0, nonzero: 0 };
    const board = createBoard({ ...cfg.board, game: cfg.game }, regions, input, {
        soundWrite: (offset, data, frac, method) => {
            soundWrites.total++;
            if (offset >= 0 && data !== 0)
                soundWrites.nonzero++;
            audio.write(offset, data, frac, method);
        },
        soundData: (id, bytes) => audio.data(id, bytes),
    });
    // The machine exactly as it booted, before anything was restored into it.
    // Two browsers that construct the same machine from the same ROM construct
    // the same state, so this is the one place a room can agree to start from
    // (see netplay.ts); it is taken before memory is restored for that reason.
    const coldMachine = board.save();
    // An invite in the address bar: this page is joining somebody's game, so it
    // must not put this browser's own high scores into the machine first.
    const joinCode = inviteCode();
    // --- memory between sessions (issue #132) ----------------------------------
    // NVRAM and the hiscore.dat table go back into the machine before its first
    // frame, as MAME loads them at start, and are written to this browser
    // whenever they change and when the page is left.
    const memory = createMachineMemory({
        board,
        game: cfg.game,
        refresh: cfg.board.screen.refresh,
        table: cfg.hiscore,
        write: record => {
            memoryStore.put(record).catch((error) => {
                console.warn(`${cfg.game}: could not keep the machine's memory: ${error.message}`);
            });
        },
    });
    if (joinCode)
        memory.disable();
    const restored = joinCode
        ? { nvram: [], hiscorePending: false }
        : memory.restore(await storedMemory);
    if (restored.nvram.length)
        ui.toast('Battery-backed memory restored from this browser');
    let hiscoreRestoreAnnounced = !restored.hiscorePending;
    const flushMemory = () => { try {
        memory.flush();
    }
    catch (error) {
        console.warn(`${cfg.game}: memory flush failed: ${error.message}`);
    } };
    addEventListener('pagehide', flushMemory);
    document.addEventListener('visibilitychange', () => { if (document.hidden)
        flushMemory(); });
    // Match MAME's soft-reset key. This is needed by boards such as Qix whose
    // first-boot operator flow stores a language in NVRAM and asks for a reset.
    addEventListener('keydown', event => {
        if (cfg.kind === 'computer' || event.code !== 'F3' || event.repeat)
            return;
        event.preventDefault();
        input.releaseAll();
        board.reset();
        memory.reset();
    });
    ui.setNative(board.fbWidth, board.fbHeight); // the board owns true geometry
    // The software room's chosen tape rides in on `mounted`; the first transport
    // that accepts its extension takes it, the rest start empty.
    let pending = mounted;
    for (const media of board.media?.() ?? []) {
        const mine = pending.filter(image => media.extensions.includes(image.name.split('.').pop().toLowerCase()));
        if (mine.length)
            pending = pending.filter(image => !mine.includes(image));
        ui.addControls(cassetteControls(media, () => input.releaseAll(), mine));
    }
    const fb = new Uint32Array(board.fbWidth * board.fbHeight);
    const image = new ImageData(new Uint8ClampedArray(fb.buffer), board.fbWidth, board.fbHeight);
    // One emulated frame, exactly as the run loop advances it. Browser QA drives
    // this directly so a test can run a precise frame count instead of racing the
    // wall clock; nothing about the machine lives here.
    // Declared before the frame helpers that read it: `step()` is exposed on
    // window.mamekit and can run a frame before the run loop is set up.
    let fastForward = false;
    // The board says how far through a frame it is, so a dial's frame of
    // travel is handed out gradually, as MAME does, instead of in one lump.
    input.frameFraction = () => board.frameFraction?.() ?? 1;
    // --- pausing ---------------------------------------------------------------
    // The machine stops while the two-player lobby is over it. Setting a game
    // up takes a minute of copying a link into a conversation and waiting for
    // an answer, and the cabinet does not care: you came back to the lobby
    // having lost two lives to it (issue #140).
    //
    // Not while a room is live, though. Two machines in a room run in lockstep,
    // so a browser that stops running frames stops publishing them, and the
    // other player's machine stands still waiting for input that is not coming.
    // In a room the lobby is only there to show who you are playing and to
    // leave, so there is nothing to protect the game from.
    let paused = false;
    const setPaused = (wanted) => {
        if (wanted === paused)
            return;
        paused = wanted;
        // Silence with it: a suspended context is the difference between a pause
        // and a machine that is still humming at you with a frozen picture.
        if (paused)
            audio.suspend();
        else
            audio.resume();
        ui.lamp(paused ? 'paused' : 'running');
    };
    // --- two players, one machine each (issue #128) ----------------------------
    const netplay = createNetplay({
        input,
        bindings: cfg.bindings,
        identity: { game: cfg.game, identity: machineIdentity(cfg.game, cfg.board, regions) },
        refresh: cfg.board.screen.refresh,
        coldBoot: () => board.load(coldMachine),
        freezeMemory: () => memory.disable(),
        machine: cfg.title,
        toast: ui.toast,
        // Over the screen, not under it: the lobby used to join the page column,
        // so opening it shrank the machine you were playing (issue #140).
        showPanel: panel => {
            ui.showModal(panel, () => netplay.dismiss());
            setPaused(!netplay.live);
        },
        hidePanel: () => { ui.hideModal(); setPaused(false); },
        inviteUrl: code => `${location.href.split('#')[0]}#join=${code}`,
        joinCode,
    });
    ui.addTitleControls(netplay.control);
    // An invite pasted into a tab that is already playing changes the fragment
    // and nothing else — the page does not reload — so the join has to be
    // picked up here or the link would appear to do nothing at all.
    addEventListener('hashchange', () => {
        const code = inviteCode();
        if (!code)
            return;
        forgetInvite();
        netplay.join(code);
    });
    if (joinCode)
        forgetInvite();
    // ?qa=1 parks the wall-clock timestep and hands frame advancement to
    // window.mamekit.step(). The presentation path is unchanged — the same
    // input, board, audio and blit calls run — so the app's own canvas can be
    // compared against the deterministic goldens in src/games.
    const qaDrive = new URLSearchParams(location.search).has('qa');
    /** One emulated frame, without presenting it. False when it could not run. */
    const runFrame = () => {
        // Every source posts what it did, then one boundary settles the ports and
        // the frame runs against them: a pad's poll, the pointer's travel and the
        // keyboard's edges all land in the frame they happened in. In a two-player
        // room the frame also waits here until the other browser has said what
        // its player did, which is what keeps the two machines identical.
        pads.poll();
        pointer.advance();
        if (!netplay.begin())
            return false;
        input.advance(netplay.take());
        board.frame(fb);
        memory.tick();
        if (!hiscoreRestoreAnnounced && memory.hiscoreArmed()) {
            hiscoreRestoreAnnounced = true;
            ui.toast('High scores restored from this browser');
        }
        // Fast-forward outruns the worklet, and a queued frame is permanent
        // latency rather than a dropped one, so its audio is discarded instead.
        if (fastForward)
            audio.discard();
        else
            audio.flush(); // one batch message per emulated frame
        netplay.end(() => machineFingerprint(board));
        frames++;
        return true;
    };
    /** Run up to `count` frames, and say how many actually ran. */
    const stepFrames = (count) => {
        let ran = 0;
        for (let index = 0; index < count; index++) {
            if (!runFrame())
                break;
            ran++;
        }
        if (ran > 0)
            ui.blit(image);
        return ran;
    };
    // debug/testing handle (also the hook for the future live KG-viewer overlay)
    window.mamekit = {
        board, input, pads, pointer, config: cfg, audio, regions, memory, netplay,
        framebuffer: fb,
        step: stepFrames,
        qaDrive,
        soundWrites,
    };
    // Start immediately — the menu click that navigated here counts as the
    // user gesture in same-origin sessions. Audio starts in parallel; if the
    // browser still holds the AudioContext suspended, the first real input
    // resumes it without ever blocking gameplay.
    if (cfg.sound.kind !== 'none') {
        const clock = cfg.sound.clock ?? 96000;
        void audio.start({
            sampleRate: clock,
            deviceType: cfg.sound.deviceType,
            clock,
            waveRom: cfg.sound.waveRegion ? regions[cfg.sound.waveRegion] : undefined,
            sampleRom: cfg.sound.sampleRegion ? regions[cfg.sound.sampleRegion] : undefined,
            chips: cfg.sound.chips,
            deviceTags: cfg.sound.deviceTags,
            deviceTypes: cfg.sound.deviceTypes,
            clocks: cfg.sound.clocks,
            dacs: cfg.sound.dacs,
            routes: cfg.sound.routes,
            auxiliary: cfg.sound.auxiliary,
            auxiliaryDevices: cfg.sound.auxiliaryDevices?.map(device => ({
                ...device,
                ...(device.sampleRegion ? { sampleRom: regions[device.sampleRegion] } : {}),
            })),
            filterChain: cfg.sound.filterChain,
            discreteMixer: cfg.sound.discreteMixer,
            discreteDac: cfg.sound.discreteDac,
            discreteEffects: cfg.sound.discreteEffects,
            speakerFilter: cfg.sound.speakerFilter,
            refresh: cfg.board.screen.refresh,
            debug: input.debug,
        }, `${cfg.runtimeUrl}${cfg.sound.worklet ?? cfg.sound.kind}-worklet.js`, cfg.sound.kind).then(() => {
            // The post-mix level belongs to the sound family, so it is generated
            // from its capability package rather than kept in a table here that
            // every new family would have to be added to.
            audio.setVolume(cfg.sound.masterGain ?? 1);
        }).catch(err => console.warn('audio unavailable:', err));
        const resumeAudio = () => audio.resume();
        addEventListener('pointerdown', resumeAudio, { once: true });
        addEventListener('keydown', resumeAudio, { once: true });
    }
    ui.overlayHide();
    // A dial machine takes the mouse from here on; say so, and how to keep the
    // cursor from wandering off while a spinner turns.
    if (pointer.active)
        ui.toast('🖱 Spinner or trackball ready — click the screen to capture it, Esc releases');
    // --- fast-forward -------------------------------------------------------------
    //
    // Every machine here makes you wait for something before you can play: a
    // ColecoVision spends twelve seconds on its BIOS screen before it hands over
    // to the cartridge, and an arcade board runs its own self-test and attract
    // loop. F runs the machine as fast as it will go until F is pressed again,
    // for whatever is running -- this is the shell every target boots through.
    //
    // The unthrottled path is the same frame step the timestep uses, given a
    // wall-clock budget instead of a frame count, so input, emulation and the
    // blit all still happen -- it is the pacing that changes, nothing else.
    // Sound is muted while it runs, because a machine at several times speed is
    // a screech rather than a fast tune.
    const masterVolume = cfg.sound.masterGain ?? 1;
    const setFastForward = (on) => {
        fastForward = on;
        audio.setVolume(on ? 0 : masterVolume);
    };
    if (cfg.kind === 'computer') {
        const deck = deckPanel(cfg.preview ? 'COMPUTER · BETA' : 'COMPUTER');
        deck.setAttribute('data-computer-deck', '');
        const reset = deckButton('⏻ Reset', { solid: false });
        reset.title = 'Reset the computer (like the RESTORE/reset line)';
        reset.onclick = () => { input.releaseAll(); board.reset(); memory.reset(); reset.blur(); };
        const fast = deckButton('▶▶ Fast-forward', { solid: false });
        fast.title = 'Run unthrottled, muted, until pressed again';
        fast.setAttribute('aria-pressed', 'false');
        const paintFast = () => {
            fast.setAttribute('aria-pressed', String(fastForward));
            setDeckButtonState(fast, fastForward);
            fast.textContent = fastForward ? '▶▶ Fast-forward · ON' : '▶▶ Fast-forward';
        };
        fast.onclick = () => { input.releaseAll(); setFastForward(!fastForward); paintFast(); fast.blur(); };
        deck.append(reset, fast);
        ui.addControls(deck);
    }
    // --- save states (issue #129) ---------------------------------------------
    // The whole machine, captured between frames and kept in the visitor's own
    // browser. Shift+F7 saves and F7 loads the latest, as in MAME; a computer
    // keeps its function keys, so it has the deck buttons only.
    const saves = saveStateDeck({
        cfg,
        identity: machineIdentity(cfg.game, cfg.board, regions),
        save: () => board.save(),
        load: state => { input.releaseAll(); board.load(state); audio.discard(); },
        screen: ui.canvas,
        toast: ui.toast,
        // The shelf hangs off its own button rather than joining the page
        // column, so opening it no longer shrinks the machine being played.
        refit: ui.placePopover,
        showShelf: (shelf, anchor, onClose) => ui.showPopover(anchor, shelf, onClose),
        hideShelf: () => ui.closePopover(),
    });
    ui.addTitleControls(saves.deck);
    window.mamekit.saves = saves;
    const memoryDeck = machineMemoryDeck({
        keptRom,
        keepsMemory: memory.nvram.length > 0 || memory.hiscoreRows > 0,
        persistent: romStore.persistent && memoryStore.persistent,
        forgetRom: async () => { await romStore.remove(cfg.game); },
        clearMemory: async () => {
            memory.disable();
            await memoryStore.remove(cfg.game);
            location.reload();
        },
        toast: ui.toast,
    });
    if (memoryDeck)
        ui.addTitleControls(memoryDeck);
    addEventListener('keydown', event => {
        if (cfg.kind === 'computer' || event.code !== 'F7' || event.repeat || event.metaKey || event.ctrlKey || event.altKey)
            return;
        event.preventDefault();
        if (event.shiftKey)
            void saves.save();
        else
            void saves.loadLatest();
    });
    addEventListener('keydown', event => {
        if (cfg.kind === 'computer' || event.code !== 'KeyF' || event.repeat || event.metaKey || event.ctrlKey || event.altKey)
            return;
        event.preventDefault();
        setFastForward(!fastForward);
    });
    // --- run loop: fixed timestep at the board's refresh rate --------------------
    const refresh = cfg.board.screen.refresh;
    const frameMs = 1000 / refresh;
    let acc = 0;
    let last = performance.now();
    let frames = 0;
    let fpsWindowStart = last;
    const tick = (now) => {
        if (input.debug && now - last > 50) {
            console.log(`[stall] ${Math.round(now - last)}ms between frames at ${Math.round(now)}`);
        }
        acc += now - last;
        last = now;
        if (acc > 5 * frameMs)
            acc = 5 * frameMs; // don't spiral after a tab pause
        // A pause owes the machine nothing: time that passed while it was stopped
        // is not a backlog of frames to catch up on when it starts again.
        if (paused)
            acc = 0;
        let due = 0;
        while (acc >= frameMs) {
            acc -= frameMs;
            due++;
        }
        if (paused) {
            // Nothing runs, but the panel keeps reporting: the readout below says
            // so rather than leaving a still picture to be read as a crash.
        }
        else if (fastForward && !qaDrive) {
            // As many frames as fit the budget, presented once. The budget is
            // shorter than a display frame so the page stays responsive enough to
            // press F again, and the cap stops a fast machine running away.
            const until = performance.now() + 10;
            let batch = 0;
            do {
                if (!runFrame())
                    break; // in a room, only as far as the other player
                batch++;
            } while (performance.now() < until && batch < 60);
            ui.blit(image);
            acc = 0; // the timestep's backlog means nothing at this speed
        }
        else if (!qaDrive) {
            // Time for a frame the room would not let run is not time spent: hand
            // it back so the frame happens the moment the other player's input
            // lands. Keeping it would have the machine quietly lose those frames;
            // spending it on extra frames instead — the input delay always leaves
            // a few in hand — would run the game faster than the board's refresh.
            acc += (due - stepFrames(due)) * frameMs;
        }
        if (now - fpsWindowStart >= 1000) {
            const snap = board.snapshot();
            // Left instrument: how the machine is running. Right: what it is
            // running. The machine's name is on the nameplate between them — it
            // used to be rewritten into this line once a second as well, so the
            // page spent two of its lines saying the same thing twice.
            const rate = paused ? ['⏸ paused'] : [`${frames} fps`];
            if (fastForward && !paused)
                rate.unshift(cfg.kind === 'computer' ? '▶▶ FAST-FORWARD' : '▶▶ FAST-FORWARD (F)');
            const room = netplay.status();
            if (room)
                rate.push(room);
            const detail = [`pc=${hex4(snap.cpus[0].pc)}`];
            if (snap.cpus.length > 1)
                detail.push(`sub=${snap.cpus[1].held ? 'held' : hex4(snap.cpus[1].pc)}`);
            if (snap.credits !== undefined)
                detail.push(`credits=${snap.credits}`);
            if (input.debug)
                detail.push(input.dump());
            ui.readout(rate.join(' · '), detail.join(' · '));
            frames = 0;
            fpsWindowStart = now;
        }
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // NOTE: box-art snapshots are saved only on Esc — toDataURL+localStorage
    // are synchronous and a periodic save visibly hitches the run loop.
}
function hex4(v) { return v.toString(16).padStart(4, '0'); }
/** The offer in this page's address, when it was opened from an invite. */
function inviteCode() {
    return /[#&]join=([A-Za-z0-9_-]+)/.exec(location.hash)?.[1];
}
/**
 * Take the invite back out of the address bar once it has been answered: an
 * offer is good once, and a reload should not try to accept a dead one.
 * `replaceState` is deliberate — assigning to the hash would fire another
 * `hashchange` and answer the same invite twice.
 */
function forgetInvite() {
    history.replaceState(null, '', `${location.pathname}${location.search}`);
}
/**
 * A short description of where the machine has got to, for two browsers to
 * compare. The same fields the acceptance contracts fingerprint a checkpoint
 * with, so a room notices a divergence the same way the goldens would.
 */
function machineFingerprint(board) {
    const snapshot = board.snapshot();
    return JSON.stringify([
        snapshot.frame,
        snapshot.cpus.map(cpu => [cpu.tag, cpu.pc, cpu.sp, cpu.halted, cpu.cycles]),
        snapshot.credits ?? null,
        snapshot.generatedDevices ?? null,
    ]);
}
// ---------------------------------------------------------------------------
function copyRomLoad(destination, source, sourceOffset, size, destinationOffset, load) {
    const group = load.groupSize ?? 1;
    const skip = load.skip ?? 0;
    if (group === 1 && skip === 0 && !load.reverse && load.nibbleShift === undefined) {
        destination.set(source.subarray(sourceOffset, sourceOffset + size), destinationOffset);
        return;
    }
    let input = sourceOffset;
    let output = destinationOffset;
    const end = sourceOffset + size;
    while (input < end) {
        const count = Math.min(group, end - input);
        for (let index = 0; index < count; index++) {
            const sourceIndex = load.reverse ? input + count - 1 - index : input + index;
            if (output + index < destination.length) {
                const sourceByte = source[sourceIndex];
                if (load.nibbleShift === undefined) {
                    destination[output + index] = sourceByte;
                }
                else {
                    const mask = 0x0f << load.nibbleShift;
                    destination[output + index] =
                        (destination[output + index] & ~mask) |
                            ((sourceByte & 0x0f) << load.nibbleShift);
                }
            }
        }
        input += count;
        output += group + skip;
    }
}
export function assembleRegions(specs, files, status, critical = new Set()) {
    // index by CRC too: romset file names drift across MAME versions
    // (gg1-1b.3p vs gg1_1b.3p), but the bytes are the identity
    const byCrc = new Map();
    for (const bytes of files.values())
        byCrc.set(crc32(bytes), bytes);
    const regions = {};
    const missingCritical = [];
    const missingOther = [];
    for (const spec of specs) {
        const bytes = new Uint8Array(spec.size);
        if (spec.fill)
            bytes.fill(spec.fill & 0xff);
        for (const load of spec.loads) {
            // MAME erases an undumped chip's bytes and runs; so do we, without
            // claiming the user's ROM set is short a file.
            if (!isDumpedRom(load))
                continue;
            // primary chip by name/swapped-name/CRC, else a clone-revision
            // alternate from the same slot (see findRomBytes)
            const { bytes: f, exact } = findRomBytes(load, files, byCrc);
            if (!f) {
                (critical.has(spec.region) ? missingCritical : missingOther).push(load.file);
                continue;
            }
            if (!exact) {
                console.warn(`CRC mismatch for ${load.file} (got ${crc32(f).toString(16)}, want ${load.crc}) — continuing`);
            }
            copyRomLoad(bytes, f, 0, load.size, load.offset, load);
            for (const segment of load.continueSegments ?? []) {
                copyRomLoad(bytes, f, segment.fileOffset, segment.size, segment.offset, load);
            }
            for (const ro of load.reloadOffsets ?? [])
                copyRomLoad(bytes, f, 0, load.size, ro, load);
        }
        for (const fill of spec.fills ?? []) {
            const start = Math.max(0, fill.offset);
            const end = Math.min(bytes.length, fill.offset + fill.size);
            bytes.fill(fill.value & 0xff, start, end);
        }
        if (spec.invert) {
            for (let index = 0; index < bytes.length; index++)
                bytes[index] ^= 0xff;
        }
        regions[spec.region] = bytes;
    }
    if (missingOther.length) {
        console.warn(`missing non-critical ROM files (zero-filled): ${missingOther.join(', ')}`);
    }
    if (missingCritical.length) {
        status(`Missing ROM files: ${missingCritical.join(', ')}`);
        throw new Error(`missing rom files: ${missingCritical.join(', ')}`);
    }
    return regions;
}
// ---------------------------------------------------------------------------
/** Human-readable key label from a DOM KeyboardEvent.code. */
function keyLabel(code) {
    const map = {
        ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓',
        Space: 'Space', Enter: 'Enter', ShiftLeft: 'Shift', ShiftRight: 'Shift',
    };
    return map[code] ?? code.replace(/^Key|^Digit|^Numpad/, '');
}
/** Friendly function name from a binding's IPT type / graph label. */
function fnLabel(label) {
    const map = {
        IPT_START: 'start', IPT_SELECT: 'select',
        IPT_START1: 'start 1P', IPT_START2: 'start 2P',
        IPT_COIN1: 'coin', IPT_COIN2: 'coin 2',
        IPT_BUTTON1: 'fire', IPT_BUTTON2: 'fire 2', IPT_BUTTON3: 'fire 3',
        IPT_DIAL_LEFT: 'steer left', IPT_DIAL_RIGHT: 'steer right',
        IPT_PEDAL: 'accelerate', IPT_PEDAL2: 'brake',
        IPT_SERVICE1: 'service', IPT_SERVICE: 'service',
    };
    if (map[label])
        return map[label];
    if (/JOYSTICK|_LEFT|_RIGHT|_UP|_DOWN/.test(label))
        return 'move';
    // console pads carry the real button name ("A", "B") in the label — keep
    // short names verbatim, lowercase longer IPT-derived words. A PORT_NAME may
    // also name the player it belongs to ("P1 Jab Punch"); only player one is
    // ever bound, so that prefix is noise repeated once per button.
    const name = label
        .replace(/^IPT_/, '')
        .replace(/^(?:P|Player )1 /, '')
        .replace(/_/g, ' ');
    return name.length <= 2 ? name : name.toLowerCase();
}
/**
 * Build the on-screen controls hint from the generated bindings. With a pad
 * connected, each control also names the pad button that drives it, and the
 * pad itself is announced first.
 */
function controlsHelp(cfg, pads, pointer) {
    const parts = [];
    const dirKeys = new Set();
    const dirPads = new Set();
    const seen = new Set();
    const padNames = (b) => (pads?.controlNames(b) ?? []).map(name => `🎮 ${name}`);
    for (const b of cfg.bindings) {
        // Player two's controls are the same panel again; the pad note says
        // which pad is player two, and the buttons read the same.
        if ((b.player ?? 1) !== 1)
            continue;
        const fn = fnLabel(b.label);
        if (fn === 'move') {
            for (const k of b.keys)
                dirKeys.add(k);
            for (const name of padNames(b))
                dirPads.add(name);
            continue;
        }
        // One visible key per alias: a control bound to both the number row and the
        // keypad is one key to the player, and "2 or Numpad2" reads as two.
        const keys = [...new Set([...b.keys.map(keyLabel), ...padNames(b)])].join(' or ');
        if (!keys)
            continue;
        const line = `${keys}: ${fn}`;
        if (seen.has(line))
            continue;
        seen.add(line);
        parts.push(line);
    }
    const connected = pads?.connected() ?? [];
    const head = connected.map(pad => `🎮 ${padName(pad.id)}${connected.length > 1 ? ` (player ${pad.player})` : ''} connected`);
    // A dial or trackball also takes the mouse -- which is what a spinner is.
    if (pointer?.active) {
        const roles = [...new Set(pointer.bindings().map(b => fnLabel(b.label).replace(/ (left|right|up|down)$/i, '')))];
        parts.push(`Mouse or spinner: ${roles.join(', ')}${pointer.isCaptured ? ' (Esc releases)' : ' (click screen to capture)'}`);
    }
    if (cfg.kind === 'computer') {
        const specialKeys = parts.filter(part => /run stop|restore|cbm|ctrl|shift lock/i.test(part));
        return [...head, 'Keyboard: type directly', ...specialKeys, 'Esc: menu'].join(' · ');
    }
    if (dirKeys.size || dirPads.size) {
        const order = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        const arrows = !dirKeys.size ? []
            : [order.every(k => dirKeys.has(k)) ? 'Arrows' : order.filter(k => dirKeys.has(k)).map(keyLabel).join('')];
        head.push(`${[...arrows, ...dirPads].join(' or ')}: move`);
    }
    return [...head, ...parts, 'F: fast-forward', 'Esc: menu'].join(' · ');
}
function buildDom(cfg) {
    document.title = cfg.title;
    const root = document.createElement('div');
    root.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px;min-height:100vh;box-sizing:border-box;background:#111;color:#ddd;font:13px ui-sans-serif,system-ui';
    document.body.style.margin = '0';
    document.body.appendChild(root);
    // The screen goes first and everything else is a control panel under it
    // (issue #140). The name of the machine used to sit above the screen AND be
    // rewritten into the status line below it once a second, which spent two
    // lines of the page saying the same thing twice.
    const deck = document.createElement('div');
    deck.dataset.deck = '';
    // The panel of an arcade cabinet: a dark metal face under the glass, lit
    // along its top edge, with an engraved legend across the bottom.
    deck.style.cssText = `display:flex;flex-direction:column;align-items:stretch;gap:0;
    width:min(960px,96vw);max-width:96vw;border-radius:0 0 14px 14px;box-sizing:border-box;overflow:hidden;
    background:
      repeating-linear-gradient(100deg,rgba(255,255,255,.016) 0 1px,transparent 1px 4px),
      linear-gradient(180deg,#1b2145 0%,#141935 45%,#0d1128 100%);
    border:1px solid #2b3466;border-top:none;
    box-shadow:inset 0 -1px 0 rgba(0,0,0,.5),0 14px 34px rgba(0,0,0,.55)`;
    // The strip of light along the top edge, as if it were catching the screen.
    const lip = document.createElement('div');
    lip.setAttribute('aria-hidden', 'true');
    lip.style.cssText = `height:2px;flex:0 0 auto;
    background:linear-gradient(90deg,transparent,${DECK_GOLD}55 18%,${DECK_GOLD}aa 50%,${DECK_GOLD}55 82%,transparent)`;
    deck.appendChild(lip);
    /**
     * One strip across the panel, ruled off from the one above it.
     *
     * Three columns with the outer two the same width, so whatever sits in the
     * middle is centred on the panel rather than on what is left over after
     * the things beside it. Below `narrow` the columns give up and everything
     * stacks, which is the only way six buttons and a readout fit on a phone.
     */
    const strip = (padding, first = false) => {
        const row = document.createElement('div');
        row.dataset.strip = '';
        row.style.cssText = `display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:8px 14px;
      padding:${padding};box-sizing:border-box;
      ${first ? '' : 'border-top:1px solid rgba(255,255,255,.055)'}`;
        deck.appendChild(row);
        return row;
    };
    /** Fill a column that has nothing in it, so the middle stays in the middle. */
    const spacer = () => {
        const cell = document.createElement('span');
        cell.setAttribute('aria-hidden', 'true');
        return cell;
    };
    // Nameplate and readout: what machine this is, and what it is doing.
    const plate = strip('10px 16px', true);
    const h1 = document.createElement('h1');
    h1.textContent = cfg.title;
    h1.style.cssText = `font:700 13px ui-sans-serif,system-ui,sans-serif;margin:0;letter-spacing:.5px;
    display:flex;align-items:center;justify-content:center;gap:9px;flex-wrap:wrap;text-align:center;
    color:#eef1ff;text-shadow:0 1px 0 rgba(0,0,0,.7),0 0 18px rgba(159,176,255,.18)`;
    if (cfg.preview)
        h1.appendChild(betaBadge());
    // Five columns: a vent at each end of the plate, an instrument inboard of
    // each, and the machine's name in the middle. The two instrument columns
    // are the same width, so the name is centred on the panel whatever either
    // of them happens to be reading.
    plate.style.gridTemplateColumns = 'auto minmax(0,1fr) auto minmax(0,1fr) auto';
    // The machine's controls, grouped by what they do, with the destructive
    // pair held back at the end in a tone that does not look like Save. They
    // used to be appended straight into the <h1>: six pills of equal weight
    // wrapping into the name of the game.
    const toolbar = document.createElement('div');
    toolbar.dataset.toolbar = '';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', `${cfg.title} controls`);
    toolbar.style.cssText = 'display:flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:center;flex:1 1 auto';
    // Controller badge: a pad in hand should be unmistakable, not a word in
    // the legend. Filled by ui.pads() as pads come and go.
    const padBadge = document.createElement('span');
    padBadge.dataset.pads = '';
    padBadge.style.cssText = 'display:none;align-items:center;gap:6px;background:#1f6f3a;color:#dfffe6;border:1px solid #3ccf6a;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:700;letter-spacing:.02em';
    const well = strip('11px 16px');
    well.style.background = 'linear-gradient(180deg,rgba(0,0,0,.34),rgba(0,0,0,.14))';
    well.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,.5),inset 0 -1px 0 rgba(255,255,255,.04)';
    well.style.display = 'none';
    /**
     * The button well is not there until there is something in it.
     *
     * Before a ROM is in, there are no controls and nothing to read: an empty
     * well was a dead strip across the panel.
     */
    let groups = 0;
    const showWell = () => {
        well.style.display = groups > 0 ? 'grid' : 'none';
    };
    // A dialog over the screen: the two-player lobby, and anything else that
    // deserves the player's whole attention. It is fixed to the viewport rather
    // than added to the column, so opening it never resizes the machine.
    const modal = document.createElement('div');
    modal.dataset.modal = '';
    modal.style.cssText = `position:fixed;inset:0;z-index:30;display:none;align-items:center;justify-content:center;
    padding:20px;box-sizing:border-box;background:rgba(4,6,16,.74);backdrop-filter:blur(3px)`;
    // A dialog is where somebody types a code; the machine must not also see
    // those keys as gameplay.
    for (const type of ['keydown', 'keyup']) {
        modal.addEventListener(type, event => event.stopPropagation());
    }
    let dismissModal;
    modal.addEventListener('click', event => { if (event.target === modal)
        dismissModal?.(); });
    document.body.appendChild(modal);
    // A popover above the control panel, for the things a button opens rather
    // than does: the key legend and the shelf of saves. The two-player lobby
    // is a modal because it is a flow you are in; these are a drawer you pull
    // out and push back, so they hang off their own button and take nothing
    // from the page — the saves shelf used to be appended under the screen,
    // which shrank the machine every time it opened.
    const pop = document.createElement('div');
    pop.dataset.popover = '';
    pop.setAttribute('role', 'dialog');
    pop.style.cssText = `position:fixed;z-index:25;display:none;box-sizing:border-box;
    padding:14px 16px;border-radius:12px;max-width:min(720px,92vw);max-height:62vh;overflow:auto;
    background:linear-gradient(180deg,#1b2145,#0e1229);border:1px solid #39437f;
    box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 18px 44px rgba(0,0,0,.6);
    font:13px ui-sans-serif,system-ui,sans-serif;color:#cbd1ff`;
    // Typing into a popover is not playing the machine.
    for (const type of ['keydown', 'keyup']) {
        pop.addEventListener(type, event => event.stopPropagation());
    }
    // The tail that points back at the button it came from.
    const tail = document.createElement('span');
    tail.setAttribute('aria-hidden', 'true');
    tail.style.cssText = `position:fixed;z-index:26;display:none;width:12px;height:12px;
    background:#101534;border-right:1px solid #39437f;border-bottom:1px solid #39437f;transform:rotate(45deg)`;
    document.body.append(pop, tail);
    let popAnchor;
    let popClose;
    const placePopover = () => {
        if (!popAnchor)
            return;
        const rect = popAnchor.getBoundingClientRect();
        const width = pop.offsetWidth;
        const centred = rect.left + rect.width / 2 - width / 2;
        pop.style.left = `${Math.max(12, Math.min(innerWidth - width - 12, centred))}px`;
        pop.style.bottom = `${innerHeight - rect.top + 12}px`;
        tail.style.left = `${rect.left + rect.width / 2 - 6}px`;
        tail.style.bottom = `${innerHeight - rect.top + 7}px`;
    };
    const closePopover = () => {
        if (!popAnchor)
            return;
        const was = popAnchor;
        popAnchor = undefined;
        pop.style.display = tail.style.display = 'none';
        pop.replaceChildren();
        paintTitleButton(was, false);
        const closer = popClose;
        popClose = undefined;
        closer?.();
    };
    const showPopover = (button, content, onClose) => {
        closePopover();
        popAnchor = button;
        popClose = onClose;
        pop.replaceChildren(content);
        pop.setAttribute('aria-label', button.getAttribute('aria-label') ?? 'Panel');
        pop.style.display = 'block';
        tail.style.display = 'block';
        paintTitleButton(button, true);
        placePopover();
    };
    /** Is this button the one the open popover belongs to? */
    const popoverFor = (button) => popAnchor === button;
    // A click anywhere else puts it away, but not the click that opened it.
    addEventListener('pointerdown', event => {
        if (!popAnchor)
            return;
        const target = event.target;
        if (pop.contains(target) || popAnchor.contains(target))
            return;
        closePopover();
    }, { capture: true });
    addEventListener('resize', placePopover);
    // cabinet column: screen inside cropped bezel art — no banner or marquee,
    // and it goes in first so the machine is the top of the page
    const cab = document.createElement('div');
    cab.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0';
    root.appendChild(cab);
    root.appendChild(deck);
    // native frame is rendered landscape; the cabinet monitor is rotated (ROT90).
    // `let` because the BOARD owns the true native size (setNative below):
    // bitmap hardware like junofrst has no GFXDECODE, so the config's raw
    // screen params carry the ×3 pixel-clock width (768) — trusting them
    // squeezed the real 256-wide frame into a corner ("postage stamp").
    const rotated = cfg.board.screen.rotate === 90 || cfg.board.screen.rotate === 270;
    let w = cfg.board.screen.width, h = cfg.board.screen.height;
    let dispW = rotated ? h : w, dispH = rotated ? w : h;
    const holder = document.createElement('div');
    holder.style.cssText = 'position:relative';
    const canvas = document.createElement('canvas');
    canvas.width = dispW;
    canvas.height = dispH;
    // No cursor over the screen: a spinner's cursor is noise, and an arcade
    // monitor never had one.
    canvas.style.cssText = 'image-rendering:pixelated;background:#000;cursor:none';
    canvas.dataset.screen = '1'; // stable handle for browser QA screenshots
    // optional cabinet bezel: the game canvas sits inside its transparent
    // CRT window, the artwork drawn on top (pointer-events off)
    let bezel = null;
    let artworkTints = [];
    const bezelCanvas = document.createElement('canvas');
    bezelCanvas.style.cssText = 'position:absolute;inset:0;pointer-events:none';
    const fit = () => {
        // The screen takes what the page leaves it: everything else in the column
        // -- title, status, key hint, and a computer's control decks -- is
        // measured, so adding a deck shrinks the screen instead of pushing the
        // deck off the bottom of the page.
        const gap = 10;
        const reserved = [...root.children]
            .filter(child => child !== cab)
            .reduce((sum, child) => sum + child.offsetHeight + gap, 0);
        const availH = Math.max(120, innerHeight - reserved - 32);
        if (bezel) {
            const { w, h, win } = bezel;
            const s = Math.min((innerWidth - 40) / w, availH / h);
            holder.style.width = bezelCanvas.style.width = `${w * s}px`;
            holder.style.height = bezelCanvas.style.height = `${h * s}px`;
            const winW = win.w * s, winH = win.h * s;
            canvas.style.position = 'absolute';
            canvas.style.left = `${win.x * s}px`;
            canvas.style.top = `${win.y * s}px`;
            // MAME layout screen bounds describe the physical CRT aspect, including
            // its non-square pixel correction. Fill those exact bounds instead of
            // preserving the raw raster aspect and letterboxing inside the artwork.
            canvas.style.width = `${winW}px`;
            canvas.style.height = `${winH}px`;
        }
        else {
            const displayScale = Math.max(1, Math.floor(availH / dispH));
            canvas.style.width = `${dispW * displayScale}px`;
            canvas.style.height = `${dispH * displayScale}px`;
        }
        // The control panel is as wide as the glass above it, so the two read as
        // one cabinet rather than a screen with a widget underneath. Narrow
        // screens get a floor, or the buttons would be stacked six deep.
        const glass = parseFloat(bezel ? holder.style.width : canvas.style.width) || 0;
        deck.style.width = `${Math.min(innerWidth - 32, Math.max(360, glass))}px`;
    };
    fit();
    addEventListener('resize', fit);
    holder.appendChild(canvas);
    cab.appendChild(holder);
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;background:rgba(0,0,0,.75);color:#fff;cursor:pointer;padding:20px';
    overlay.dataset.overlay = '1'; // stable handle for browser QA
    overlay.textContent = 'Loading…';
    holder.appendChild(overlay);
    // Toast over the screen for a moment: "controller connected" and the like.
    const toast = document.createElement('div');
    toast.dataset.toast = '';
    toast.style.cssText = 'position:absolute;top:12px;left:50%;transform:translateX(-50%);background:#f2c200;color:#1b1b1b;font-weight:800;font-size:13px;padding:10px 16px;border-radius:999px;box-shadow:0 6px 24px rgba(0,0,0,.5);pointer-events:none;z-index:5;opacity:0;transition:opacity .25s;white-space:nowrap;max-width:90%;overflow:hidden;text-overflow:ellipsis';
    holder.appendChild(toast);
    let toastTimer = 0;
    // What the machine is doing right now, and what the keys do. Both belong
    // to the panel: they are readouts of the thing above them.
    // The readout, in the panel's nameplate: a lamp that is lit while the
    // machine is running, and the numbers it is running at.
    const lamp = document.createElement('span');
    lamp.setAttribute('aria-hidden', 'true');
    lamp.style.cssText = 'width:7px;height:7px;border-radius:999px;flex:0 0 auto;background:#3a3f6a;transition:background .3s,box-shadow .3s';
    const LAMPS = { off: '#3a3f6a', running: '#3ccf6a', paused: DECK_GOLD };
    const setLamp = (state) => {
        const colour = LAMPS[state];
        lamp.style.background = colour;
        lamp.style.boxShadow = state === 'off' ? 'none' : `0 0 9px ${colour}, 0 0 2px rgba(255,255,255,.85) inset`;
    };
    /**
     * The panel's instruments, one at each end of the nameplate.
     *
     * A single gauge on the right left the plate lopsided, so the reading is
     * split the way a cabinet's would be: how it is running on the left, what
     * it is running on the right.
     */
    const gauge = (align) => {
        const dial = document.createElement('div');
        dial.dataset.readout = align;
        dial.style.cssText = `color:${DECK_GOLD};font:600 11px ui-monospace,SFMono-Regular,monospace;letter-spacing:.6px;
      text-align:${align};line-height:1.5;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
      text-shadow:0 0 12px ${DECK_GOLD}40`;
        return dial;
    };
    const rateEl = gauge('left');
    const statusEl = gauge('right');
    // The readout sits beside the buttons rather than on the nameplate: the
    // name has the middle of the plate to itself, and the gauge is where the
    // hand is. The pad badge balances it on the other side.
    // Beside the name rather than beside the buttons: a six-button well and a
    // gauge do not both fit across the width of a Galaga screen, and the one
    // that lost was the gauge, printed straight over Clear memory.
    const left = document.createElement('div');
    left.style.cssText = 'display:flex;align-items:center;gap:8px;min-width:0;justify-self:start';
    left.append(lamp, rateEl, padBadge);
    const right = document.createElement('div');
    right.style.cssText = 'display:flex;align-items:center;gap:8px;justify-content:flex-end;min-width:0;justify-self:end';
    right.append(statusEl);
    plate.append(deckVent('left'), left, h1, right, deckVent('right'));
    well.append(spacer(), toolbar, spacer());
    // The legend, engraved along the bottom edge of the panel.
    const help = document.createElement('div');
    help.dataset.help = ''; // stable handle for browser QA
    help.style.cssText = `color:#cbd1ff;font:12px ui-monospace,SFMono-Regular,monospace;text-align:center;
    line-height:1.9;max-width:520px`;
    help.textContent = controlsHelp(cfg);
    // The legend keeps a home in the page while the popover is shut. It is not
    // only decoration: `ui.controls()` rewrites it when a pad arrives, so it is
    // where what-the-controls-are-now is written down, and a screen reader —
    // and the browser QA that checks the pad is announced — reads it there.
    const legendHost = document.createElement('div');
    legendHost.style.display = 'none';
    legendHost.appendChild(help);
    deck.appendChild(legendHost);
    // The legend does not get a row of its own: a control panel wants two, and
    // a third band of small print under the buttons was the third. It takes
    // the buttons' place instead, and hands it back.
    const keysCell = document.createElement('span');
    keysCell.setAttribute('role', 'group');
    keysCell.setAttribute('aria-label', 'Key legend');
    keysCell.dataset.keysCell = '';
    keysCell.style.cssText = 'display:none;align-items:center;gap:7px';
    const keysButton = titleButton('Keys', 'Show the key legend', 'Show what every key does', 'quiet', 'keys');
    keysButton.setAttribute('aria-expanded', 'false');
    keysCell.append(toolbarDivider(), keysButton);
    keysButton.onclick = () => {
        if (popoverFor(keysButton)) {
            closePopover();
            return;
        }
        showPopover(keysButton, help, () => legendHost.appendChild(help));
    };
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const offCtx = off.getContext('2d');
    return {
        overlay,
        /** the machine's screen, for pointer capture */
        canvas,
        addControls: (controls) => { root.appendChild(controls); fit(); },
        removeControls: (controls) => { controls.remove(); fit(); },
        /** a control group in the toolbar under the title: one line for all of them */
        addTitleControls: (controls) => {
            // A hairline between groups, so "2 player", the save buttons and the
            // browser-storage pair read as three things rather than six.
            if (groups++)
                toolbar.appendChild(toolbarDivider());
            toolbar.appendChild(controls);
            // Keeping it last is a move, not an insert: appending an element that
            // is already in the toolbar takes it out of where it was.
            keysCell.style.display = 'inline-flex';
            toolbar.appendChild(keysCell);
            showWell();
            fit();
        },
        /** put a dialog over the screen; `onDismiss` runs on Esc or a backdrop click */
        showModal: (panel, onDismiss) => {
            dismissModal = onDismiss;
            modal.replaceChildren(panel);
            modal.style.display = 'flex';
        },
        hideModal: () => {
            dismissModal = undefined;
            modal.style.display = 'none';
            modal.replaceChildren();
        },
        /** true while a dialog is up: Esc belongs to it, not to leaving the game */
        modalOpen: () => modal.style.display !== 'none',
        /** open a popover above one of the panel's buttons */
        showPopover: (button, content, onClose) => showPopover(button, content, onClose),
        closePopover: () => closePopover(),
        popoverOpen: () => popAnchor !== undefined,
        /** the popover's content changed size: put it back where it belongs */
        placePopover: () => placePopover(),
        /** close whatever dialog is up, telling it so */
        dismissModal: () => dismissModal?.(),
        /** a control changed height (a deck opened or closed): give the screen what is left */
        refit: () => fit(),
        /** replace the controls hint, e.g. when a gamepad arrives or leaves */
        controls: (text) => { help.textContent = text; fit(); },
        /** show the connected pads beside the title; an empty list hides the badge */
        pads: (names) => {
            padBadge.style.display = names.length ? 'inline-flex' : 'none';
            padBadge.textContent = names.length ? `🎮 ${names.join(' · ')}` : '';
            fit();
        },
        /** flash a message over the screen for a few seconds */
        toast: (text) => {
            toast.textContent = text;
            toast.style.opacity = '1';
            clearTimeout(toastTimer);
            toastTimer = window.setTimeout(() => { toast.style.opacity = '0'; }, 4000);
        },
        /**
         * Prose about getting the machine going, said once and on the screen
         * the player is looking at.
         *
         * It used to be written into the panel's readout as well, which put a
         * sentence about which zips to drop through a gauge meant for `61 fps ·
         * pc=098f` and blew the nameplate open to three lines.
         */
        status: (text) => {
            const zone = overlay.querySelector('[data-dropzone] [data-zone-note]');
            if (zone) {
                zone.textContent = text;
                zone.style.display = text ? 'block' : 'none';
                return;
            }
            if (overlay.style.display !== 'none')
                overlay.textContent = text;
        },
        /** The panel's instruments: how the machine is running, and what it is running. */
        readout: (rate, detail) => {
            rateEl.textContent = rate;
            statusEl.textContent = detail;
            showWell();
            fit();
        },
        overlayHide: () => {
            overlay.style.display = 'none';
            // The panel's lamp comes on with the machine, the way the one on a
            // cabinet does when the cabinet is switched on.
            setLamp('running');
        },
        /** The panel's lamp: green while the machine runs, amber while it is held. */
        lamp: (state) => setLamp(state),
        /** adopt the board's real framebuffer size when it differs from config */
        setNative: (nw, nh) => {
            if (nw === w && nh === h)
                return;
            w = nw;
            h = nh;
            dispW = rotated ? h : w;
            dispH = rotated ? w : h;
            canvas.width = dispW;
            canvas.height = dispH;
            off.width = w;
            off.height = h;
            ctx.imageSmoothingEnabled = false;
            fit();
        },
        // ROM missing: turn the dark CRT into an inviting drop target
        dropZone: (game, invited = false) => {
            overlay.textContent = '';
            const zone = document.createElement('div');
            zone.dataset.dropzone = '1';
            zone.style.cssText = `border:3px dashed rgba(242,194,0,.65);border-radius:16px;
        padding:34px 40px;max-width:min(440px,84%);background:rgba(8,10,26,.9);
        display:flex;flex-direction:column;align-items:center;gap:8px;
        box-shadow:0 0 0 rgba(242,194,0,0);
        transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease,background .15s ease`;
            // Why they are here, when they arrived on somebody else's invite. The
            // invite waits in the address bar until the machine has a ROM to run.
            const invite = document.createElement('div');
            invite.dataset.invited = '1';
            invite.style.cssText = `display:${invited ? 'block' : 'none'};align-self:stretch;margin-bottom:4px;
        padding:8px 10px;border-radius:8px;background:rgba(60,207,106,.1);border:1px solid rgba(60,207,106,.35);
        color:#8fe3aa;font-size:12px;font-weight:700;text-align:center;line-height:1.5`;
            invite.textContent = '⇄ Somebody invited you to a two-player game. Bring your own copy of the set and you will join them.';
            const icon = document.createElement('div');
            icon.style.cssText = 'font-size:46px;line-height:1;filter:drop-shadow(0 4px 12px rgba(242,194,0,.35));animation:m2j-bob 2.2s ease-in-out infinite';
            icon.textContent = '🕹️';
            const big = document.createElement('div');
            big.style.cssText = 'font-size:21px;font-weight:800;color:#f2c200';
            big.textContent = `Drop ${game}.zip here`;
            const small = document.createElement('div');
            small.style.cssText = 'color:#9fb0ff';
            small.textContent = 'or click anywhere on the screen to choose one or more zip files';
            // Which sets this machine needs, and what happens to them. It belongs
            // here, on the screen being asked to accept them, rather than in the
            // control panel's gauge underneath.
            const zoneNote = document.createElement('div');
            zoneNote.dataset.zoneNote = '';
            zoneNote.style.cssText = `display:none;color:#cbd1ff;font-size:12px;line-height:1.55;margin-top:4px;
        padding:8px 10px;border-radius:8px;background:rgba(159,176,255,.07);border:1px solid #2a3162`;
            const note = document.createElement('div');
            note.style.cssText = 'color:#667;font-size:12px;margin-top:6px;max-width:320px';
            note.textContent = 'ROMs are copyrighted and not distributed with mamekit — bring your own dump.';
            // opt-in web rescue: the button swaps for a progress bar while
            // waitForZip hunts the mirror bucket (fetch happens there, not here)
            const searchWrap = document.createElement('div');
            searchWrap.style.cssText = 'margin-top:8px;display:flex;flex-direction:column;align-items:center;gap:7px;min-height:36px';
            const searchBtn = document.createElement('button');
            searchBtn.type = 'button';
            searchBtn.textContent = '🔍 Try web search';
            searchBtn.style.cssText = `font:600 13px ui-sans-serif,system-ui;color:#9fb0ff;cursor:pointer;
        background:rgba(159,176,255,.08);border:1px solid rgba(159,176,255,.35);
        border-radius:999px;padding:7px 18px;transition:background .15s ease,border-color .15s ease`;
            searchBtn.addEventListener('mouseenter', () => { searchBtn.style.background = 'rgba(159,176,255,.18)'; searchBtn.style.borderColor = '#9fb0ff'; });
            searchBtn.addEventListener('mouseleave', () => { searchBtn.style.background = 'rgba(159,176,255,.08)'; searchBtn.style.borderColor = 'rgba(159,176,255,.35)'; });
            const searchTrack = document.createElement('div');
            searchTrack.style.cssText = 'display:none;width:min(260px,80%);height:8px;border-radius:999px;background:rgba(159,176,255,.15);overflow:hidden';
            const searchFill = document.createElement('div');
            searchFill.style.cssText = 'width:0%;height:100%;background:linear-gradient(90deg,#9fb0ff,#f2c200);transition:width .16s ease';
            searchTrack.appendChild(searchFill);
            const searchLabel = document.createElement('div');
            searchLabel.style.cssText = 'display:none;color:#9fb0ff;font-size:12px';
            searchWrap.append(searchBtn, searchTrack, searchLabel);
            searchWrap.addEventListener('click', ev => ev.stopPropagation()); // don't open the file picker
            const style = document.createElement('style');
            style.textContent = `@keyframes m2j-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes m2j-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`;
            // Exactly which chips the supplied zips must contain (straight from the
            // knowledge graph). Device firmware is required too: split MAME sets
            // keep it in a separate zip from the game.
            const critical = requiredRomRegions(cfg.roms, cfg.board.cpus.map(c => c.region));
            const manifest = document.createElement('details');
            manifest.style.cssText = 'align-self:stretch;margin-top:8px;text-align:left';
            const sum = document.createElement('summary');
            const nFiles = cfg.roms.reduce((n, r) => n + r.loads.length, 0);
            sum.textContent = `What's inside ${game}.zip? (${nFiles} files)`;
            sum.style.cssText = 'cursor:pointer;color:#9fb0ff;font-size:12px;text-align:center;user-select:none';
            const list = document.createElement('div');
            list.style.cssText = `font:11px/1.7 ui-monospace,monospace;color:#8b93c4;max-height:150px;
        overflow:auto;margin-top:6px;padding:8px 12px;background:rgba(0,0,0,.4);border-radius:8px`;
            const rows = new Map();
            for (const r of cfg.roms) {
                for (const l of r.loads) {
                    const row = document.createElement('div');
                    row.style.cssText = 'display:flex;justify-content:space-between;gap:12px';
                    const name = document.createElement('span');
                    name.textContent = `${critical.has(r.region) ? '★ ' : '  '}${l.file}`;
                    if (critical.has(r.region))
                        name.style.color = '#f2c200';
                    const meta = document.createElement('span');
                    meta.textContent = `${(l.size / 1024).toFixed(l.size % 1024 ? 1 : 0)} KB · crc ${l.crc}`;
                    row.append(name, meta);
                    list.appendChild(row);
                    rows.set(`${r.region}/${l.file}`, { name, meta });
                }
            }
            const legend = document.createElement('div');
            legend.style.cssText = 'color:#667;font-size:10px;margin-top:4px';
            legend.textContent = '★ required CPU/device firmware · others fall back to zero-fill with a warning';
            list.appendChild(legend);
            manifest.append(sum, list);
            manifest.addEventListener('click', ev => ev.stopPropagation()); // don't open the file picker
            zone.append(style, invite, icon, big, small, zoneNote, note, searchWrap, manifest);
            overlay.appendChild(zone);
            const idle = () => {
                zone.style.transform = '';
                zone.style.borderColor = 'rgba(242,194,0,.65)';
                zone.style.boxShadow = '0 0 0 rgba(242,194,0,0)';
                zone.style.background = 'rgba(8,10,26,.9)';
            };
            return {
                el: zone,
                armed: () => {
                    zone.style.transform = 'scale(1.045)';
                    zone.style.borderColor = '#fff';
                    zone.style.boxShadow = '0 0 44px rgba(242,194,0,.55)';
                    zone.style.background = 'rgba(20,24,56,.95)';
                    big.textContent = 'Release to insert the ROM!';
                    icon.textContent = '⚡';
                },
                idle: () => { idle(); big.textContent = `Drop ${game}.zip here`; icon.textContent = '🕹️'; },
                busy: (name) => { idle(); icon.textContent = '⏳'; big.textContent = `Reading ${name}…`; small.textContent = ''; },
                error: (msg) => {
                    idle();
                    icon.textContent = '🚫';
                    big.textContent = 'That zip didn’t work';
                    small.textContent = msg;
                    zone.style.borderColor = '#e0504d';
                    zone.style.animation = 'm2j-shake .4s';
                    setTimeout(() => { zone.style.animation = ''; }, 450);
                },
                verdict: (check) => {
                    idle();
                    // paint the manifest chip-by-chip: ✓ verified / ≈ crc differs / ✗ absent
                    for (const p of check.perFile) {
                        const r = rows.get(`${p.region}/${p.file}`);
                        if (!r)
                            continue;
                        const mark = p.status === 'ok' ? '✓' : p.status === 'crc' ? '≈' : '✗';
                        r.name.textContent = `${mark} ${p.file}`;
                        r.name.style.color = p.status === 'ok' ? '#5ecf7a' : p.status === 'crc' ? '#e8b64c' : p.critical ? '#e0504d' : '#a06a68';
                    }
                    if (check.missingCritical.length) {
                        manifest.open = true;
                        icon.textContent = '🚫';
                        big.textContent = 'More ROM files are required';
                        const missingRegions = new Set(check.perFile
                            .filter(part => part.critical && part.status === 'missing')
                            .map(part => part.region));
                        const missingSets = [...new Set(cfg.roms
                                .filter(spec => missingRegions.has(spec.region) && spec.romSet)
                                .map(spec => `${spec.romSet}.zip`))];
                        small.textContent = missingSets.length
                            ? `Also select or drop ${missingSets.join(', ')}. Files already supplied are kept for this page.`
                            : `${check.missingCritical.length} required CPU chip${check.missingCritical.length > 1 ? 's are' : ' is'} missing — try the "${game}" set.`;
                        zone.style.borderColor = '#e0504d';
                        zone.style.animation = 'm2j-shake .4s';
                        setTimeout(() => { zone.style.animation = ''; }, 450);
                    }
                    else if (check.missingOther.length || check.crcMismatch.length) {
                        manifest.open = true;
                        icon.textContent = '⚠️';
                        big.textContent = 'ROMs accepted — starting…';
                        small.textContent = check.missingOther.length
                            ? `${check.missingOther.length} non-critical chip${check.missingOther.length > 1 ? 's' : ''} missing (zero-filled)`
                            : `${check.crcMismatch.length} chip${check.crcMismatch.length > 1 ? 's' : ''} differ from the reference dump`;
                        zone.style.borderColor = '#e8b64c';
                        zone.style.boxShadow = '0 0 34px rgba(232,182,76,.4)';
                    }
                    else {
                        icon.textContent = '✅';
                        big.textContent = 'ROM set verified — starting!';
                        small.textContent = `All ${check.perFile.length} chips match the reference dump.`;
                        zone.style.borderColor = '#5ecf7a';
                        zone.style.boxShadow = '0 0 34px rgba(94,207,122,.45)';
                    }
                },
                search: {
                    button: searchBtn,
                    start: () => {
                        searchBtn.style.display = 'none';
                        searchTrack.style.display = 'block';
                        searchLabel.style.display = 'block';
                        searchFill.style.width = '0%';
                        searchLabel.textContent = `Searching the web for ${game}.zip…`;
                    },
                    progress: (frac, label) => {
                        searchFill.style.width = `${Math.min(100, Math.round(frac * 100))}%`;
                        if (label)
                            searchLabel.textContent = label;
                    },
                    reset: () => {
                        searchTrack.style.display = 'none';
                        searchLabel.style.display = 'none';
                        searchBtn.style.display = '';
                    },
                    hide: () => { searchWrap.style.display = 'none'; },
                },
            };
        },
        setBezel: (bmp, win, tints) => {
            bezelCanvas.width = bmp.width;
            bezelCanvas.height = bmp.height;
            bezelCanvas.getContext('2d').drawImage(bmp, 0, 0);
            holder.insertBefore(bezelCanvas, overlay); // above the game, below the overlay
            bezel = { w: bmp.width, h: bmp.height, win };
            artworkTints = tints;
            fit();
        },
        blit: (image) => {
            offCtx.putImageData(image, 0, 0);
            ctx.save();
            if (cfg.board.screen.rotate === 90) {
                // rotate the native landscape frame clockwise onto the portrait canvas
                ctx.translate(dispW, 0);
                ctx.rotate(Math.PI / 2);
            }
            else if (cfg.board.screen.rotate === 270) {
                // counter-clockwise (Space Invaders cabinets)
                ctx.translate(0, dispH);
                ctx.rotate(-Math.PI / 2);
            }
            else if (cfg.board.screen.rotate === 180) {
                ctx.translate(dispW, dispH);
                ctx.rotate(Math.PI);
            }
            ctx.drawImage(off, 0, 0);
            ctx.restore();
            if (artworkTints.length) {
                ctx.save();
                ctx.globalCompositeOperation = 'multiply';
                for (const tint of artworkTints) {
                    ctx.fillStyle = `rgba(${tint.red * 255},${tint.green * 255},` +
                        `${tint.blue * 255},${tint.alpha})`;
                    ctx.fillRect(tint.x * dispW, tint.y * dispH, tint.w * dispW, tint.h * dispH);
                }
                ctx.restore();
            }
        },
    };
}
function waitForZip(ui, zone, specs, critical, game, category, firmwareKey) {
    return new Promise(resolve => {
        const pick = document.createElement('input');
        pick.type = 'file';
        pick.accept = '.zip';
        pick.multiple = true;
        let accepted = false;
        const files = new Map();
        /** every zip that took part, as it arrived, for the ROM library */
        const zips = [];
        const ingest = async (name, raw) => {
            if (accepted)
                return true;
            zone.busy(name);
            let incoming;
            try {
                incoming = await readZip(raw);
            }
            catch {
                zone.error(`${name} isn’t a readable zip — try the original romset.`);
                return false;
            }
            mergeRomFiles(files, incoming);
            zips.push({ name, bytes: raw.slice().buffer });
            // grade the set against the manifest BEFORE booting: ticks in the
            // list. Previously supplied split-set zips remain accumulated.
            const check = checkRomSet(specs, files, critical);
            zone.verdict(check);
            if (check.missingCritical.length)
                return false; // stay in the loop for a retry
            accepted = true;
            setTimeout(() => resolve({ files, zips }), 1100); // let the verdict land before the screen lights up
            return true;
        };
        const handle = async (file) => ingest(file.name, new Uint8Array(await file.arrayBuffer()));
        const handleMany = async (selected) => {
            for (const file of selected) {
                if (await handle(file))
                    break;
            }
        };
        pick.addEventListener('change', () => {
            if (pick.files?.length)
                void handleMany(Array.from(pick.files));
            pick.value = '';
        });
        // "Try web search": probe the mirror bucket while the bar plays out a
        // little theatre — it crawls toward 92% on its own and only lands at
        // 100% when the fetch really returned bytes.
        let searching = false;
        zone.search.button.addEventListener('click', () => {
            if (searching || accepted)
                return;
            searching = true;
            zone.search.start();
            const started = performance.now();
            let frac = 0;
            const ticker = setInterval(() => {
                frac = Math.min(0.92, frac + (0.92 - frac) * 0.045);
                zone.search.progress(frac, frac < 0.35 ? `Searching the web for ${game}.zip…`
                    : frac < 0.65 ? 'Checking archive mirrors…'
                        : 'Downloading a candidate set…');
            }, 100);
            // even an instant response gets the full ~2.4s story arc
            const finish = (fn) => setTimeout(() => {
                clearInterval(ticker);
                searching = false;
                fn();
            }, Math.max(0, 2400 - (performance.now() - started)));
            const sets = [game, ...dependencyRomSets(specs, game)];
            Promise.allSettled(sets.map(async (set) => ({ set, raw: await fetchRomSet(set, category, firmwareKey) }))).then(results => finish(() => {
                const found = results.flatMap(result => result.status === 'fulfilled' ? [result.value] : []);
                if (!found.length) {
                    zone.search.reset();
                    zone.error(`Couldn’t find ${game}.zip on the web — drop your own dump.`);
                    return;
                }
                zone.search.progress(1, `Found ${found.length} of ${sets.length} required ROM set${sets.length > 1 ? 's' : ''}!`);
                setTimeout(() => {
                    void (async () => {
                        let ok = false;
                        for (const item of found)
                            ok = await ingest(`${item.set}.zip`, item.raw);
                        if (ok)
                            zone.search.hide();
                        else
                            zone.search.reset();
                    })();
                }, 500);
            }), () => finish(() => {
                zone.search.reset();
                zone.error(`Couldn’t find ${game}.zip on the web — drop your own dump.`);
            }));
        });
        ui.overlay.addEventListener('click', () => pick.click());
        // dragenter/leave fire on every child crossed — depth-count to know when
        // the file has truly left the window
        let depth = 0;
        addEventListener('dragover', ev => ev.preventDefault());
        addEventListener('dragenter', ev => { ev.preventDefault(); if (++depth === 1)
            zone.armed(); });
        addEventListener('dragleave', () => { if (--depth <= 0) {
            depth = 0;
            zone.idle();
        } });
        addEventListener('drop', ev => {
            ev.preventDefault();
            depth = 0;
            const dropped = ev.dataTransfer?.files;
            if (dropped?.length)
                void handleMany(Array.from(dropped));
            else
                zone.idle();
        });
    });
}
/**
 * Add one zip's chips to the set being assembled. Same-named chips with
 * different contents are both kept: findRomBytes can still select the right
 * one by CRC from the synthetic map key.
 */
export function mergeRomFiles(files, incoming) {
    for (const [name, bytes] of incoming) {
        let key = name;
        if (files.has(key) && crc32(files.get(key)) !== crc32(bytes)) {
            key = `${name}#${crc32(bytes).toString(16).padStart(8, '0')}`;
        }
        files.set(key, bytes);
    }
}
/**
 * The chips of the set this browser keeps for a machine, graded against the
 * manifest exactly as a fresh drop is. A set that no longer satisfies the
 * manifest (a regenerated ROM list, a zip that will not read) is forgotten
 * so the drop screen returns rather than a broken boot.
 */
export async function storedRomFiles(store, game, specs, critical) {
    let record;
    try {
        record = await store.get(game);
    }
    catch {
        return null;
    }
    if (!record)
        return null;
    const files = new Map();
    try {
        for (const zip of record.zips)
            mergeRomFiles(files, await readZip(new Uint8Array(zip.bytes)));
    }
    catch {
        await store.remove(game).catch(() => undefined);
        return null;
    }
    if (checkRomSet(specs, files, critical).missingCritical.length) {
        await store.remove(game).catch(() => undefined);
        return null;
    }
    return files;
}
/** Keep an accepted set for next time; says so, or says why it could not. */
async function keepRomSet(store, game, zips, toast) {
    try {
        await store.put({ game, zips, addedAt: Date.now() });
    }
    catch (error) {
        toast(`This browser could not keep ${game}.zip: ${error.message}`);
        return false;
    }
    if (!store.persistent) {
        toast(`${game}.zip is kept for this visit only: browser storage is unavailable`);
        return false;
    }
    toast(`${game}.zip is kept in this browser — next time boots straight in`);
    return true;
}
/**
 * The two controls over what this browser keeps for the machine. Absent when
 * there is nothing to forget: a console cartridge is ejected from its room,
 * and a board with neither NVRAM nor a hiscore.dat entry keeps nothing.
 */
function machineMemoryDeck(options) {
    if (!options.keptRom && !options.keepsMemory)
        return undefined;
    const deck = document.createElement('span');
    deck.setAttribute('data-memory-deck', '');
    deck.setAttribute('role', 'group');
    deck.setAttribute('aria-label', 'Kept in this browser');
    deck.style.cssText = 'display:inline-flex;align-items:center;gap:6px';
    for (const type of ['keydown', 'keyup'])
        deck.addEventListener(type, event => event.stopPropagation());
    if (options.keptRom) {
        const forget = titleButton('Forget ROM', 'Forget ROM', 'Remove the ROM set from this browser; the drop screen returns next time', 'danger', 'eject');
        forget.onclick = () => {
            forget.disabled = true;
            paintTitleButton(forget, false);
            options.forgetRom().then(() => { options.toast('ROM forgotten: drop it again next time'); forget.remove(); if (!deck.childElementCount)
                deck.remove(); }, (error) => { options.toast(`Could not forget the ROM: ${error.message}`); forget.disabled = false; paintTitleButton(forget, false); });
        };
        deck.appendChild(forget);
    }
    if (options.keepsMemory) {
        const clear = titleButton('Clear memory', 'Clear memory', options.persistent
            ? 'Forget the high scores and battery-backed settings kept in this browser and boot cold'
            : 'Memory lasts only this visit: browser storage is unavailable', 'danger', 'broom');
        clear.onclick = () => {
            if (!confirm('Clear the high scores and settings this browser keeps for the machine, and boot it cold?'))
                return;
            clear.disabled = true;
            paintTitleButton(clear, false);
            options.clearMemory().catch((error) => {
                options.toast(`Could not clear the memory: ${error.message}`);
                clear.disabled = false;
                paintTitleButton(clear, false);
            });
        };
        deck.appendChild(clear);
    }
    return deck;
}
// --- control decks -------------------------------------------------------------
// The shell's own controls share one look, kept in `controls.ts` so the
// two-player lobby wears it too: a dark panel with the room's gold accent,
// buttons that read as pressed when the thing they control is on, and
// readouts taken from the device rather than from what was last clicked.
/** The save-state deck: two buttons, a shelf of what this browser holds, and the store behind them. */
function saveStateDeck(options) {
    const { cfg, identity, toast } = options;
    // Three small buttons beside the title, so the screen keeps every pixel it
    // had; the shelf of thumbnails drops under the screen only while it is open.
    const deck = document.createElement('span');
    deck.setAttribute('data-saves-deck', '');
    deck.setAttribute('role', 'group');
    deck.setAttribute('aria-label', 'Save states');
    deck.style.cssText = 'display:inline-flex;align-items:center;gap:6px';
    for (const type of ['keydown', 'keyup'])
        deck.addEventListener(type, event => event.stopPropagation());
    const mini = titleButton;
    const paintMini = paintTitleButton;
    const shortcut = (key) => cfg.kind === 'computer' ? '' : ` (${key})`;
    const saveButton = mini('Save', 'Save state', `Capture the whole machine as it is now${shortcut('Shift+F7')}`, 'normal', 'save');
    const loadButton = mini('Load', 'Load latest save', `Put the machine back to the newest save${shortcut('F7')}`, 'normal', 'load');
    const toggle = mini('Saves', 'Show saves', 'Show or hide the shelf of saves', 'normal', 'shelf');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mamekit-saves-shelf');
    const body = deckPanel('SAVE STATES');
    // It lives inside a popover now, which brings its own panel: a second one
    // nested in it would be a box in a box.
    body.style.background = 'none';
    body.style.border = 'none';
    body.style.boxShadow = 'none';
    body.style.padding = '0';
    body.style.margin = '0';
    body.id = 'mamekit-saves-shelf';
    body.setAttribute('aria-label', 'Saves in this browser');
    for (const type of ['keydown', 'keyup'])
        body.addEventListener(type, event => event.stopPropagation());
    const note = document.createElement('span');
    note.style.cssText = 'color:#7f8ac9;font-size:11px;flex-basis:100%;text-align:center';
    const shelf = document.createElement('div');
    shelf.dataset.savesShelf = '';
    shelf.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;flex-basis:100%';
    body.append(note, shelf);
    deck.append(saveButton, loadButton, toggle);
    let open = false;
    const paintToggle = () => {
        toggle.setAttribute('aria-expanded', String(open));
        setTitleButtonText(toggle, records.length ? `${records.length} save${records.length === 1 ? '' : 's'}` : 'Saves');
        paintMini(toggle, open);
    };
    toggle.onclick = () => {
        open = !open;
        // The popover paints the button itself and can be dismissed by a click
        // anywhere else, so the deck is told when that happens rather than
        // keeping its own idea of whether the shelf is up.
        if (open)
            options.showShelf(body, toggle, () => { open = false; paintToggle(); });
        else
            options.hideShelf();
        paintToggle();
        toggle.blur();
    };
    const store = openSaveStore();
    const when = (createdAt) => {
        const date = new Date(createdAt);
        return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    };
    const thumbnail = () => {
        try {
            const source = options.screen;
            if (!source.width || !source.height)
                return undefined;
            const scale = 120 / Math.max(source.width, source.height);
            const small = document.createElement('canvas');
            small.width = Math.max(1, Math.round(source.width * scale));
            small.height = Math.max(1, Math.round(source.height * scale));
            const context = small.getContext('2d');
            if (!context)
                return undefined;
            context.imageSmoothingEnabled = true;
            context.drawImage(source, 0, 0, small.width, small.height);
            return small.toDataURL('image/jpeg', 0.7);
        }
        catch {
            return undefined;
        }
    };
    let records = [];
    const render = async () => {
        const opened = await store;
        records = await opened.list(cfg.game);
        const foreign = records.filter(record => record.identity !== identity).length;
        note.textContent = !opened.persistent
            ? 'Saves last only this session: browser storage is unavailable.'
            : records.length === 0
                ? 'Saves stay in this browser and never leave it.'
                : `${records.length} save${records.length === 1 ? '' : 's'} in this browser` +
                    (foreign ? ` · ${foreign} from another ROM set or build` : '');
        loadButton.disabled = !records.some(record => record.identity === identity);
        paintMini(loadButton, false);
        paintToggle();
        shelf.replaceChildren(...records.map(record => {
            const card = document.createElement('div');
            card.dataset.save = record.id;
            const usable = record.identity === identity;
            card.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px;border-radius:8px;
        background:#0c0f26;border:1px solid ${usable ? '#303a78' : '#4a2a2a'};font-size:11px;color:#cbd1ff;${usable ? '' : 'opacity:.6'}`;
            const picture = document.createElement(record.thumbnail ? 'img' : 'div');
            picture.style.cssText = 'width:96px;height:72px;object-fit:contain;background:#000;border-radius:4px';
            if (record.thumbnail)
                picture.src = record.thumbnail;
            const caption = document.createElement('span');
            caption.textContent = `frame ${record.frame} · ${when(record.createdAt)}`;
            const row = document.createElement('div');
            row.style.cssText = 'display:flex;gap:6px';
            const load = deckButton('Load');
            load.title = usable ? 'Put the machine back to this save' : 'Made with a different ROM set or build';
            load.disabled = !usable;
            setDeckButtonState(load, false);
            load.onclick = () => { void loadRecord(record); load.blur(); };
            const remove = deckButton('✕');
            remove.title = 'Delete this save';
            remove.setAttribute('aria-label', 'Delete this save');
            remove.onclick = () => { void opened.remove(record.id).then(render); };
            row.append(load, remove);
            card.append(picture, caption, row);
            return card;
        }));
        if (open)
            options.refit();
    };
    const saveNow = async () => {
        let state;
        try {
            state = options.save();
        }
        catch (error) {
            toast(`Could not save: ${error.message.split('\n')[0]}`);
            return undefined;
        }
        const createdAt = Date.now();
        const record = {
            id: saveId(cfg.game, createdAt),
            game: cfg.game,
            identity,
            title: cfg.title,
            frame: state.frame,
            createdAt,
            thumbnail: thumbnail(),
            state,
        };
        try {
            await (await store).put(record);
        }
        catch (error) {
            toast(`Could not store the save: ${error.message}`);
            return undefined;
        }
        toast(`Saved · frame ${state.frame}`);
        await render();
        return record;
    };
    const loadRecord = async (record) => {
        if (record.identity !== identity) {
            toast('That save was made with a different ROM set or build');
            return false;
        }
        try {
            options.load(record.state);
        }
        catch (error) {
            toast(`Could not load: ${error.message.split('\n')[0]}`);
            return false;
        }
        toast(`Loaded · frame ${record.frame}`);
        return true;
    };
    saveButton.onclick = () => { void saveNow(); saveButton.blur(); };
    loadButton.onclick = () => { void loadLatest(); loadButton.blur(); };
    const loadLatest = async () => {
        if (!records.length)
            await render();
        const latest = records.find(record => record.identity === identity);
        if (!latest) {
            toast('No save for this machine yet (Shift+F7 makes one)');
            return false;
        }
        return loadRecord(latest);
    };
    void render();
    return {
        deck,
        save: saveNow,
        load: async (id) => {
            const record = await (await store).get(id);
            return record ? loadRecord(record) : false;
        },
        loadLatest,
        list: async () => (await store).list(cfg.game),
        remove: async (id) => { await (await store).remove(id); await render(); },
    };
}
/** mm:ss for a tape counter */
function tapeClock(seconds) {
    const whole = Math.max(0, Math.floor(seconds));
    return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
}
/** Local image selection and transport controls; the generated device owns playback. */
function cassetteControls(media, releaseKeys, initial = []) {
    const deck = deckPanel('DATASSETTE');
    deck.setAttribute('aria-label', `Cassette ${media.tag}`);
    for (const type of ['keydown', 'keyup'])
        deck.addEventListener(type, event => event.stopPropagation());
    deck.addEventListener('focusin', releaseKeys);
    // A hidden native input behind a deck button: the browser's own control
    // cannot be styled and its "No file chosen" says nothing about the deck.
    const picker = document.createElement('input');
    picker.type = 'file';
    picker.accept = ['.zip', ...media.extensions.map(extension => `.${extension}`)].join(',');
    picker.setAttribute('aria-label', 'Open tape image or ZIP');
    picker.tabIndex = -1;
    picker.style.cssText = 'position:fixed;left:-9999px;width:1px;height:1px;opacity:0';
    const open = deckButton('◍ Open tape…');
    open.title = `Open a ${media.extensions.map(extension => `.${extension}`).join(' / ')} image or a software-list ZIP`;
    open.onclick = () => picker.click();
    const mounted = document.createElement('span');
    mounted.setAttribute('data-tape-name', '');
    mounted.style.cssText = `padding:5px 10px;border-radius:6px;background:#080b1d;border:1px solid #303a78;
    color:#9fb0ff;font:600 12px ui-monospace,monospace;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`;
    mounted.textContent = 'no tape';
    const side = document.createElement('select');
    side.setAttribute('aria-label', 'Tape image');
    side.style.cssText = 'padding:5px 8px;border-radius:6px;border:1px solid #303a78;background:#111633;color:#d8dcff;font:inherit;cursor:pointer';
    side.hidden = true;
    const play = deckButton('▶ Play');
    const stop = deckButton('■ Stop');
    const rewind = deckButton('⏮ Rewind');
    play.setAttribute('data-tape-play', '');
    stop.setAttribute('data-tape-stop', '');
    const buttons = [play, stop, rewind];
    for (const button of buttons)
        button.disabled = true;
    const status = document.createElement('span');
    status.setAttribute('role', 'status');
    status.style.cssText = 'flex-basis:100%;text-align:center;color:#8f99d2;font-size:12px;min-height:1.3em';
    status.textContent = 'Open a tape, enter the computer’s load command, then press Play.';
    // Readout: transport state and counter, read back from the device 4x a
    // second. "Playing" alone is not tape moving -- the computer's motor line
    // decides that -- so both are shown, and the bar is the position.
    const readout = document.createElement('span');
    readout.setAttribute('data-tape-readout', '');
    readout.style.cssText = 'display:inline-flex;align-items:center;gap:8px;color:#cbd1ff;font:600 12px ui-monospace,monospace';
    const lamp = document.createElement('span');
    lamp.style.cssText = 'width:9px;height:9px;border-radius:50%;background:#3a3f6a;box-shadow:none;transition:background .15s ease';
    const stateText = document.createElement('span');
    stateText.textContent = 'STOPPED';
    const counter = document.createElement('span');
    counter.style.color = '#8f99d2';
    counter.textContent = '00:00 / 00:00';
    const bar = document.createElement('span');
    bar.style.cssText = 'position:relative;width:120px;height:6px;border-radius:3px;background:#080b1d;border:1px solid #303a78;overflow:hidden';
    const fill = document.createElement('span');
    fill.style.cssText = `position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#9fb0ff,${DECK_GOLD})`;
    bar.appendChild(fill);
    readout.append(lamp, stateText, counter, bar);
    let hasTape = false;
    const paint = () => {
        const playing = hasTape && media.playing();
        const motor = hasTape && media.motorOn();
        const position = hasTape ? media.position() : 0;
        const length = hasTape ? media.length() : 0;
        setDeckButtonState(play, playing);
        setDeckButtonState(stop, hasTape && !playing);
        setDeckButtonState(rewind, false);
        // The computer, not the deck, pulls the tape: with Play pressed and the
        // motor line off the tape sits still, before a LOAD has been typed and
        // again once the load has finished -- say which, or the deck looks stuck.
        stateText.textContent = !hasTape ? 'NO TAPE'
            : playing && motor ? 'PLAYING'
                : playing && position < 0.5 ? 'PLAY · WAITING FOR LOAD'
                    : playing ? 'PLAY · PAUSED BY COMPUTER'
                        : 'STOPPED';
        stateText.style.color = playing && motor ? DECK_GOLD : playing ? '#e8b64c' : '#cbd1ff';
        lamp.style.background = playing && motor ? DECK_GOLD : playing ? '#e8b64c' : '#3a3f6a';
        lamp.style.boxShadow = playing && motor ? `0 0 8px ${DECK_GOLD}` : 'none';
        counter.textContent = `${tapeClock(position)} / ${tapeClock(length)}`;
        fill.style.width = length > 0 ? `${Math.min(100, (position / length) * 100).toFixed(1)}%` : '0';
    };
    play.onclick = () => {
        try {
            media.play();
            status.textContent = media.motorOn()
                ? 'Play pressed — the computer is running the tape.'
                : 'Play pressed — the tape moves once the computer starts the motor: type LOAD and press Enter.';
        }
        catch (error) {
            status.textContent = String(error);
        }
        paint();
        play.blur();
    };
    stop.onclick = () => {
        try {
            media.stop();
            status.textContent = 'Tape stopped.';
        }
        catch (error) {
            status.textContent = String(error);
        }
        paint();
        stop.blur();
    };
    rewind.onclick = () => {
        try {
            media.rewind();
            status.textContent = 'Tape rewound.';
        }
        catch (error) {
            status.textContent = String(error);
        }
        paint();
        rewind.blur();
    };
    let images = new Map();
    const mount = () => {
        const name = side.value;
        const bytes = images.get(name);
        if (!bytes)
            return;
        try {
            media.stop();
            media.mount(name.split('.').pop().toLowerCase(), bytes);
            hasTape = true;
            for (const button of buttons)
                button.disabled = false;
            mounted.textContent = name;
            mounted.title = name;
            mounted.style.color = '#f4f5ff';
            status.textContent = `${name} mounted. Enter the computer’s load command, then press Play.`;
        }
        catch (error) {
            hasTape = false;
            for (const button of buttons)
                button.disabled = true;
            mounted.textContent = 'no tape';
            status.textContent = String(error);
        }
        paint();
    };
    side.onchange = mount;
    picker.onchange = async () => {
        const file = picker.files?.[0];
        if (!file)
            return;
        picker.disabled = true;
        try {
            const bytes = new Uint8Array(await file.arrayBuffer());
            const files = /\.zip$/i.test(file.name) ? await readZip(bytes) : new Map([[file.name, bytes]]);
            images = new Map([...files].filter(([name]) => media.extensions.includes(name.split('.').pop().toLowerCase())));
            if (!images.size)
                throw new Error(`No supported tape image found (${media.extensions.join(', ')}).`);
            side.replaceChildren(...[...images.keys()].map(name => new Option(name, name)));
            side.hidden = images.size < 2;
            mount();
        }
        catch (error) {
            status.textContent = String(error);
        }
        finally {
            picker.disabled = false;
            picker.value = '';
            picker.blur();
        }
    };
    deck.append(picker, open, mounted, side, play, stop, rewind, readout, status);
    if (initial.length) {
        images = new Map(initial.map(image => [image.name, image.bytes]));
        side.replaceChildren(...[...images.keys()].map(name => new Option(name, name)));
        side.hidden = images.size < 2;
        mount();
    }
    paint();
    setInterval(paint, 250);
    return deck;
}
