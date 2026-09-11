// Versions carried by every generated artifact so a stale reader fails loudly
// instead of misreading a structure it predates.
/**
 * BoardIR structural version, written into each target's board.json and
 * checked by decodeBoardIr(). Bump whenever the shape changes.
 *
 * 2 — GeneratedMachine in machine.json, consumed through a type assertion.
 * 3 — BoardIR in board.json, decoded and cross-reference validated.
 */
export const BOARD_IR_SCHEMA_VERSION = 4;
/** Knowledge-graph artifact version (graph.json, hardware-graph.json). */
export const GRAPH_SCHEMA_VERSION = 1;
/** MAMEKIT compiler version stamped into generated artifacts and manifests. */
export const COMPILER_VERSION = '0.1.0';
