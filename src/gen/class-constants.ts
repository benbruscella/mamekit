// Numeric members a game's driver state class fixes in its own constructor.
//
// MAME parameterizes a shared machine_config by passing a constant down the
// state-class constructor chain: `a2600_state` hands `3.579575_MHz_XTAL` to its
// base, which stores it in `m_xtal`, and `a2600_base_ntsc` then clocks the 6507,
// the TIA, the RIOT and the screen from it. That machine config is shared with
// `a2600p` and `tvboy`, which pass different crystals, so the graph keeps those
// clocks as unevaluated source expressions and the value belongs to the game.
//
// Both consumers of the device set -- the target generator and the BoardIR
// lowering -- must resolve them the same way, so the resolution lives here
// rather than in either.

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';
import { evalExpr } from '../kg/parse.ts';

/** The constants a game's state class fixes, or an empty set. */
export function gameClassConstants(node: KGNode | undefined): Record<string, number> {
  return node?.props.classConstants
    ? JSON.parse(String(node.props.classConstants)) as Record<string, number>
    : {};
}

/** The same, looked up from the graph by game name. */
export function classConstantsForGame(
  graph: KnowledgeGraph,
  game: string,
): Record<string, number> {
  return gameClassConstants(graph.nodes.find(node => node.id === `game:${game}`));
}

/**
 * A device node with its state-class-parameterized values resolved.
 *
 * A device with nothing left to resolve is returned untouched, so this is safe
 * to apply to every device in a machine.
 */
export function resolveClassConstants(
  node: KGNode,
  constants: Record<string, number>,
): KGNode {
  if (!Object.keys(constants).length) return node;
  const props: Record<string, number | number[]> = {};
  const clockExpr = node.props.clockExpr;
  if (node.props.clock === null && typeof clockExpr === 'string') {
    const clock = evalExpr(clockExpr, constants);
    if (clock !== null) props.clock = clock;
  }
  const rawExpr = node.props.screenRawExpr;
  if (Array.isArray(rawExpr) && rawExpr.length >= 7) {
    const values = rawExpr.map(value => evalExpr(String(value), constants));
    if (values.every(value => value !== null)) {
      props.screenRaw = values.slice(0, 7) as number[];
    }
  }
  return Object.keys(props).length
    ? { ...node, props: { ...node.props, ...props } }
    : node;
}
