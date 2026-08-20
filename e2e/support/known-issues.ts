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

export const KNOWN_ISSUES: Record<string, string> = {
  '1942': '20 fps',
  carnival: 'sound explosion',
  defender: "can't turn around",
  digdug: "doesn't reach the centre of the screen in time",
  gunsmoke: 'firing keys do not match direction',
  gyruss: 'swarm sound missing',
  popeye: 'graphic glitches',
  rampage: 'no sound',
  sf2ce: 'fps',
  venture: 'no sound anymore, was working',
  zaxxon: 'graphic glitches',
};

/** The open finding for a machine, when issue #54 has one. */
export function knownIssue(game: string): string | undefined {
  return process.env.MAMEKIT_E2E_ALL ? undefined : KNOWN_ISSUES[game];
}
