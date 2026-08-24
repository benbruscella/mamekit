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
  sf2ce: 'fps',
  // Found by this suite. The board is fine: its contract replays on the app
  // canvas with the accepted 190 AY writes, and the offline probe renders
  // them at 0.073 RMS through the same browser output stage. The live
  // AudioWorklet emits exactly 0 for the whole run. Verified on a clean tree
  // at 3c6ab97, so it predates the composition-order work.
  carnival: 'silent through the live AudioWorklet, audible offline',
  // Found by this suite rather than by play-testing, and not yet in #54.
  // The browser board diverges from the Node contract during boot: maincpu
  // X/Y/U and the CC E-flag differ by frame 22, m_irq_line by frame 24, and
  // pia2.m_out_b by frame 25 — an interrupt-timing difference, not a ROM or
  // video one (region hashes match, and frames 1-21 are bit-identical). It
  // self-heals: every checkpoint from 180 on matches once the token's
  // frame-150 soft reset lands. Node passes the same tree at 92 fps.
  qix: 'browser board diverges from the Node contract during boot (frames 22-150)',
};

/** The open finding for a machine, when issue #54 has one. */
export function knownIssue(game: string): string | undefined {
  return process.env.MAMEKIT_E2E_ALL ? undefined : KNOWN_ISSUES[game];
}
