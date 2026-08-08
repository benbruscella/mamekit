// The hardware capability contract.
//
// Before this, supporting one MAME device meant editing several unrelated
// central dispatch points: a probe and two ternary chains in the hardware
// closure, a branch in the config generator, another in the machine IR sound
// binding, another in the runtime's register wiring, an entry in the shell's
// volume table, and a fourth branch in the acceptance harness. Nothing checked
// that all of them agreed, so a family registered in four places out of five
// failed silently in the fifth.
//
// A capability package owns all of that for one family. Adding hardware adds a
// directory; the orchestration files stay closed.

import type { PortDeclaration } from './ports.ts';

/** What a capability needs from the resolved MAME hardware closure. */
export interface CapabilityInput {
  /** Absolute path to the MAME checkout. */
  mameSource: string;
  /** MAME device types present in the closure, with their parsed definitions. */
  entries: readonly CapabilityEntry[];
}

export interface CapabilityEntry {
  type: string;
  /** Parsed MAME class for this device type, when the closure resolved one. */
  definition?: unknown;
  /** Methods lowered from the device's MAME class. */
  methods: readonly { name: string }[];
  /** Targets that use this device type. */
  uses?: readonly { game: string }[];
}

/** A file the capability emits into dist/runtime/generated. */
export interface CapabilityArtifact {
  /** Path relative to dist/runtime/generated, e.g. "audio/ym2203-worklet.ts". */
  path: string;
  contents: string;
}

export interface CapabilityExtraction {
  /**
   * MAME device types this extraction makes executable. The closure marks
   * exactly these as executable, so a capability cannot claim hardware it did
   * not actually lower.
   */
  executableTypes: string[];
  /**
   * How the manifest describes each executable type: which kind of core it is
   * and which emitted file carries it.
   */
  executable: Record<string, { kind: CapabilityKind; artifact: string }>;
  artifacts: CapabilityArtifact[];
  /**
   * Lazily generated artifact groups for unusually large source compilers.
   * The closure emitter consumes and releases one group at a time instead of
   * retaining every generated source string in the Node heap.
   */
  artifactGroups?: Array<() => CapabilityArtifact[]>;
  /** Emit large artifacts in an isolated worker so its compiler heap is reclaimed. */
  artifactEmitters?: Array<(root: string) => void>;
  /**
   * Methods this extraction lowered for a device type, replacing whatever the
   * closure scraped from the class. A device compiled through MAME's device
   * inheritance knows its real method set; the closure's first pass does not.
   */
  entryMethods?: Record<string, readonly LoweredMethod[]>;
  /**
   * Source files a lowered device actually came from, replacing the closure's
   * first guess. MAME device inheritance pulls in the header and the parent
   * class, which the initial scrape does not see.
   */
  entrySourceFiles?: Record<string, readonly string[]>;
}

export interface LoweredMethod {
  name: string;
  parameters: string;
  sourceFile: string;
  sourceLine: number;
  body: string;
  program: { diagnostics: string[] };
}

export type CapabilityKind = 'cpu' | 'device' | 'audio' | 'composition';

export interface HardwareCapability {
  /** Stable slug, also the package directory name. */
  id: string;
  /** MAME device types this capability claims. */
  mameTypes: readonly string[];
  /** Typed ports the component exposes, validated before code generation. */
  ports: readonly PortDeclaration[];
  /**
   * Lower this family from MAME source. Returns undefined when the closure
   * does not contain the family, or when it contains it in a shape this
   * capability does not support — in which case the type stays unresolved in
   * the manifest rather than being marked executable dishonestly.
   */
  extract(input: CapabilityInput): CapabilityExtraction | undefined;
  /**
   * Browser master gain for a generated audio core. MAME route gains set the
   * relative mix; this is the single post-mix level the shell applies, and it
   * belongs with the family rather than in a table in the shell.
   */
  masterGain?: number;
}

/** Find the capability that claims a MAME device type. */
export function capabilityForType(
  capabilities: readonly HardwareCapability[],
  type: string,
): HardwareCapability | undefined {
  return capabilities.find(capability => capability.mameTypes.includes(type));
}
