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
export const HOST_SERVICE_CALLS = [
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
    // The scheduler's clock. Hardware that measures an interval differences two
    // readings of it, and a chip that does so on every register access -- the
    // Game Boy PPU brings its whole state machine up to date that way -- left
    // its hottest method interpreted for the sake of one call.
    'machine().time',
    // The screen's visible rectangle, which a device asks for when it clears a
    // band of its own bitmap (`m_bitmap.fill(colour, screen().visible_area())`).
    'screen().visible_area',
    // Indexed custom renderers select palette shadow modes while walking their
    // sprite list. The generic palette currently treats shadow pens as source
    // pens, but the call itself remains a valid framework service.
    'palette().shadow_mode',
    'palette().set_shadow_mode',
];
