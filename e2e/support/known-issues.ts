// Machines with open play-test findings, from
// https://github.com/benbruscella/mamekit/issues/54
//
// These are not disabled: they still generate, still ship and still hold a
// Node contract. What they have is a known browser-side defect, so a red
// result here would be reporting something already tracked.
//
// They are skipped rather than dropped, so the run still names them and the
// list stays honest — an empty entry here should mean the issue is closed.
// MAMEKIT_E2E_ALL=1 runs them anyway, which is how you check whether a fix
// landed.

export const KNOWN_ISSUES: Record<string, string> = {};

/** The open finding for a machine, when issue #54 has one. */
export function knownIssue(game: string): string | undefined {
  return process.env.MAMEKIT_E2E_ALL ? undefined : KNOWN_ISSUES[game];
}
