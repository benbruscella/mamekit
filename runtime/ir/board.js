// Canonical board intermediate representation.
//
// This is the single contract between MAME source lowering and every consumer:
// the browser runtime, the shell, the acceptance harness, generated reports and
// the artifact closure. It is neutral by construction — it names no browser API
// and no compiler internal, and src/ir imports nothing outside src/ir.
//
// Values here are serialized verbatim into each target's generated board.json.
import { BOARD_IR_SCHEMA_VERSION } from "./version.js";
/**
 * The host's numbers for MAME's scheduler-level input lines. diexec.h numbers
 * INPUT_LINE_NMI, INPUT_LINE_RESET and INPUT_LINE_HALT from MAX_INPUT_LINES - 3;
 * the runtime keeps them negative, apart from every line a core numbers for
 * itself, and every compiled core, device and board resolves the three names
 * to these. Everything else in diexec.h is read from MAME's source.
 */
export const HOST_INPUT_LINES = {
    INPUT_LINE_NMI: -1,
    INPUT_LINE_RESET: -2,
    INPUT_LINE_HALT: -3,
};
/** The key a type's rendered-as-a-stream variant is registered under. */
export const STREAM_VARIANT_SUFFIX = ':STREAM';
/**
 * MAME framework service calls a generated device may reach directly, spelled
 * as the chain its source writes: `screen().vpos()`.
 *
 * These are not device-to-device links -- there is no target device to resolve
 * -- but services the board binds for every device it composes. The emitter
 * and the runtime both read this list, so a chain one side emits and the other
 * never binds cannot exist. Without it a video device's scanline renderer is
 * declined by codegen and runs interpreted: the TMS9928A's `update_line` calls
 * `screen().vpos()` on its first line, which took the ColecoVision to 17 fps.
 */
/**
 * `tilemap_manager::set_flip_all`, reached as `machine().tilemap()`: the video
 * package binds it for a board's screen update, and the emitter calls it by
 * this name. Donkey Kong's screen update starts with it and runs once per
 * partial update, 224 times a frame, so declining it kept that update
 * interpreted.
 */
export const TILEMAP_SET_FLIP_ALL = 'machine().tilemap().set_flip_all';
/**
 * Board framework calls reached through a two-call chain, each bound by the
 * board under its whole name. `machine().scheduler().perfect_quantum` is the
 * SNES's every APU port write (snes_w_io); declined, all of the 65C816's I/O
 * writes stayed interpreted.
 */
export const VIDEO_FRAMEWORK_CHAIN_CALLS = [
    TILEMAP_SET_FLIP_ALL,
    'machine().scheduler().perfect_quantum',
];
export const HOST_SERVICE_CALLS = [
    'machine().sample_rate',
    // The scheduler's clock, bound on every device; a chip that measures time
    // by differencing two readings -- the cassette transport advancing its
    // tape -- reaches it by this name, emitted and interpreted alike.
    'machine().time',
    // MAME's running_machine::rand, the LCG every device shares. The 64H156
    // draws its random flux reversals from it on every bit cell while the drive
    // motor runs, so a gate array left interpreted for want of it ran at a
    // crawl.
    'machine().rand',
    'screen().vpos',
    'screen().hpos',
    'screen().width',
    'screen().height',
    'screen().frame_number',
    'screen().time_until_pos',
    // Custom sprite devices compose against the same priority bitmap as the
    // driver's tilemaps. The host installs the bitmap after device construction,
    // before any screen update can invoke this service.
    'screen().priority',
    // MAME guards a register write with this so a debugger peek changes nothing.
    // It sits at the top of the TMS9928A's `read` and `register_write`, and left
    // the whole port path -- every VRAM byte a game writes -- interpreted.
    'machine().side_effects_disabled',
    // running_machine::phase(): RESET while the board resets, RUNNING after.
    'machine().phase',
    // The scheduler's clock. Hardware that measures an interval differences two
    // readings of it, and a chip that does so on every register access -- the
    // Game Boy PPU brings its whole state machine up to date that way -- left
    // its hottest method interpreted for the sake of one call.
    'machine().time',
    // The screen's visible rectangle, which a device asks for when it clears a
    // band of its own bitmap (`m_bitmap.fill(colour, screen().visible_area())`).
    'screen().visible_area',
    // A video processor brings the picture up to a line before it interrupts
    // and reprograms the screen from its own timing registers: the TMS34010's
    // scanline callback does both on every line it fires.
    'screen().update_partial',
    'screen().configure',
    // The MC6845 re-bases the screen at the top of each frame it counts, on
    // every line it steps through (handle_line_timer, Qix's CRTC).
    'screen().reset_origin',
    // A custom renderer selects the palette's shadow preset while walking its
    // sprite list, and draws its shadow pens through that preset's table.
    'palette().shadow_mode',
    'palette().set_shadow_mode',
    'palette().shadows_enabled',
    'palette().highlights_enabled',
    'palette().shadow_table',
    // device_t::owner()->memshare(tag()): a sprite device finds its sprite RAM
    // as the share named for its own tag (sprite.h's device_start).
    'owner().memshare',
];
