// MAME framework calls that MAMEKIT answers on purpose without executing them.
//
// The interpreter and emitted code once answered *any* unresolved call with a
// silent 0. That hid real gaps (#178): a call MAME makes for its effect looked
// the same as one that has none here. This is the declared list of the second
// kind, each group with the reason it has no effect in MAMEKIT's model. Every
// other unresolved call is a gap, reported by tools/unresolved-calls.ts.
//
// Add a name only with a reason that holds for every machine.

/**
 * Calls whose only purpose in MAME is a service MAMEKIT provides another way,
 * matched on the root of the call chain (`state_add().mask().formatstr` is
 * `state_add`).
 */
const NO_EFFECT_ROOTS = new Set([
  // Save-state registration. MAMEKIT's save states walk each generated
  // definition's declared members (src/runtime/machine-state.ts), so nothing
  // has to be registered.
  'save_item', 'save_pointer', 'NAME', 'STRUCT_MEMBER', 'save_prepost_delegate',
  // Debugger and state-view registration: register names, masks and formats
  // for MAME's debugger, and where its icount lives. The generated cores own
  // their registers and icount.
  'state_add', 'set_icountptr', 'debugger_instruction_hook',
  // Logging.
  'logerror', 'popmessage', 'osd_printf_info', 'osd_printf_verbose', 'osd_printf_warning',
]);

/**
 * Methods with no effect whatever object they are called on, matched on the
 * last element of the call chain.
 */
const NO_EFFECT_METHODS = new Set([
  // devcb and delegate resolution. MAMEKIT binds every callback when the
  // board is composed, so there is nothing left to resolve at start.
  'resolve', 'resolve_safe', 'resolve_all', 'resolve_all_safe',
  // Cabinet coin meters: an electromechanical counter, not machine state.
  'coin_counter_w',
]);

/**
 * Tilemap and palette configuration the video compiler reads from the same
 * source when it builds the screen plan (src/mame/video-compiler.ts), and
 * tilemap cache maintenance a plan that redraws each frame does not need.
 * Executing them again at run time would have nothing to change.
 */
const VIDEO_PLAN_METHODS = new Set([
  'mark_all_dirty', 'mark_tile_dirty', 'set_flip', 'set_scrollx', 'set_scrolly',
  'set_transparent_pen', 'configure_groups', 'set_transmask',
  'set_user_data', 'set_indirect_color', 'set_scrolldx', 'set_scrolldy',
]);

/**
 * Accessors that only hand back a framework object. Evaluating them is not a
 * guess: the method then called on the object (`coin_lockout_w`,
 * `system_mute`) is what has an effect, and it is counted on its own.
 */
const FRAMEWORK_ACCESSORS = new Set([
  'machine', 'bookkeeping', 'sound', 'scheduler', 'tilemap', 'screen', 'palette',
  'owner', 'device',
]);

/** Tilemap creation in video_start, which the video compiler reads to build each layer. */
const VIDEO_PLAN_CALLS = new Set(['machine().tilemap().create']);

/** The root call of a generated call name: `state_add().mask` -> `state_add`. */
function callRoot(name: string): string {
  return /^[\w:]+/.exec(name)?.[0] ?? name;
}

/** The method a call chain ends with: `m_fg_tilemap.set_transparent_pen` -> `set_transparent_pen`. */
function callMethod(name: string): string {
  return /(\w+)$/.exec(name)?.[1] ?? name;
}

/** True when MAMEKIT answers this call on purpose without executing it. */
export function isDeclaredFrameworkNoOp(name: string): boolean {
  return NO_EFFECT_ROOTS.has(callRoot(name)) ||
    NO_EFFECT_METHODS.has(callMethod(name)) ||
    isFrameworkAccessor(name) ||
    isDelegateConstructor(name) ||
    isVideoPlanCall(name);
}

/** `machine()`, `machine().bookkeeping()`: an accessor whose result is an object. */
function isFrameworkAccessor(name: string): boolean {
  return FRAMEWORK_ACCESSORS.has(callMethod(name));
}

/**
 * `FUNC(...)` and the `*_delegate(...)` constructors build a delegate that
 * means something only to the call it is passed to, which is counted itself.
 */
function isDelegateConstructor(name: string): boolean {
  return name === 'FUNC' || /^\w+_delegate$/.test(name);
}

/** True for tilemap and palette configuration the screen plan already holds. */
export function isVideoPlanCall(name: string): boolean {
  return VIDEO_PLAN_METHODS.has(callMethod(name)) || VIDEO_PLAN_CALLS.has(name);
}
