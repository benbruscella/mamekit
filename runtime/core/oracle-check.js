/**
 * A machine's latest comparison with MAME (oracle.json, written by
 * src/gen/oracle-result.ts from tools/mame-oracle.ts's report), put into
 * words for its page. Only what the report says: frames, titles, a count.
 */
const INPUT = {
    none: 'no input',
    start: 'Start pressed',
    contract: 'its acceptance inputs',
};
function list(frames) {
    return frames.length > 4 ? `${frames.slice(0, 3).join(', ')} … ${frames.at(-1)}` : frames.join(', ');
}
/** The archive facet a check files the machine under (src/gen/archive.ts mameCheckFacet). */
export function oracleFacet(check) {
    return check.verdict === 'exact' ? `Pixel-exact against MAME ${check.mame}` : `Differs from MAME ${check.mame}`;
}
/** One line per finding, most telling first. */
export function oracleLines(check) {
    const lines = [];
    const machine = check.runs.filter(run => !run.title);
    const titles = check.runs.filter(run => run.title);
    for (const run of machine) {
        if (run.failed)
            lines.push(`Could not be compared (${run.failed === 'ours' ? 'this machine' : 'MAME'} failed to run)`);
        else if (run.divergesAt === undefined)
            lines.push(`Pixel-exact against MAME ${check.mame} at frames ${list(run.frames)} (${INPUT[run.input]})`);
        else
            lines.push(`Differs from MAME ${check.mame} at frame ${run.divergesAt}` +
                (run.exact.length ? `; exact at ${list(run.exact)}` : '') + ` (${INPUT[run.input]})`);
    }
    if (titles.length) {
        const exact = titles.filter(run => !run.failed && run.divergesAt === undefined && run.frames.length);
        const frames = [...new Set(titles.flatMap(run => run.frames))].sort((a, b) => a - b);
        lines.push(`${exact.length} of ${titles.length} titles pixel-exact against MAME ${check.mame} at frame${frames.length > 1 ? 's' : ''} ${list(frames)}`);
        for (const run of titles.filter(candidate => !exact.includes(candidate))) {
            lines.push(run.failed ? `${run.title}: did not run (${run.failed === 'ours' ? 'here' : 'in MAME'})` : `${run.title}: differs from frame ${run.divergesAt}`);
        }
    }
    if (check.survey) {
        lines.push(`Board survey: ${check.survey.exact} of ${check.survey.boards} boards pixel-exact at frame ${check.survey.frame}`);
    }
    lines.push(`Checked ${check.checkedAt.slice(0, 10)} on build ${check.mamekit.commit}${check.mamekit.dirty ? ' (with local changes)' : ''}`);
    return lines;
}
