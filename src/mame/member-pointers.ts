// C++ member-function pointers, lowered to method names.
//
// MAME dispatches some hot paths through tables of member-function pointers:
// the TMS34010's opcode, field and pixel tables, the T-Unit blitter's
// dma_draw variants. The generated IR has no function values, so a pointer is
// the name of the method it points at, and a call through one is the
// CALL_METHOD intrinsic, which each executor dispatches by that name.

/**
 * `(this->*expr)(args)` and `((this)->*(expr))(args)` as
 * `CALL_METHOD(expr, args)`.
 */
export function lowerMemberPointerCalls(source: string): string {
  let out = source;
  for (;;) {
    const match = /\(\s*(?:this|\(\s*this\s*\))\s*->\s*\*/.exec(out);
    if (!match) return out;
    const start = match.index;
    let depth = 0;
    let close = start;
    for (; close < out.length; close++) {
      if (out[close] === '(') depth++;
      else if (out[close] === ')' && --depth === 0) break;
    }
    const target = out.slice(start + match[0].length, close).trim();
    let open = close + 1;
    while (/\s/.test(out[open] ?? '')) open++;
    if (out[open] !== '(') throw new Error(`member pointer ${target} is taken but not called`);
    depth = 0;
    let end = open;
    for (; end < out.length; end++) {
      if (out[end] === '(') depth++;
      else if (out[end] === ')' && --depth === 0) break;
    }
    const args = out.slice(open + 1, end).trim();
    out = `${out.slice(0, start)}CALL_METHOD(${target}${args ? `, ${args}` : ''})${out.slice(end + 1)}`;
  }
}

/**
 * `&cls::method` as the string naming it; with template arguments,
 * `&cls::dma_draw<8, false, ...>` names the instance the device compiler
 * generates for them (`dma_draw_8_0_...`), given how it evaluates each one.
 */
export function lowerMemberPointerValues(
  source: string,
  classes: readonly string[],
  evaluate: (argument: string) => number | null,
): string {
  const owners = classes.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  // Only the unary `&`: after an operand it is a bitwise AND, and
  // `mo[x] & atari_motion_objects_device::PRIORITY_MASK` is a class constant
  // masked, not a member pointer -- lowered, it read `mo[x] "PRIORITY_MASK"`
  // and Marble Madness's whole screen update failed to compile.
  return source.replace(
    new RegExp(`(?<![\\w\\])&]\\s*)&(?!&)\\s*(?:${owners})\\s*::\\s*(\\w+)\\s*(?:<([^<>]*)>)?`, 'g'),
    (all, name: string, templateArguments?: string) => {
      if (templateArguments === undefined) return JSON.stringify(name);
      const values = templateArguments.split(',').map(argument => evaluate(
        argument.trim().replace(/\btrue\b/g, '1').replace(/\bfalse\b/g, '0'),
      ));
      if (values.some(value => value === null || !Number.isInteger(value))) return all;
      return JSON.stringify(`${name}_${values.join('_')}`);
    },
  );
}

/**
 * Both lowerings over a driver method's body, for the classes a driver
 * source declares: `m_map_color = &cosmic_state::panic_map_color` stores the
 * method's name, and `(this->*m_map_color)(x, y)` calls whatever method that
 * name is (the board's CALL_METHOD).
 */
export function lowerDriverMemberPointers(body: string, classes: readonly string[]): string {
  if (!/->\s*\*|&\s*\w+\s*::/.test(body)) return body;
  return lowerMemberPointerValues(lowerMemberPointerCalls(body), classes, () => null);
}
