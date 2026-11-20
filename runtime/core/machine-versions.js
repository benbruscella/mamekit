// A console's or computer's regional versions in one room -- MAME's clones of
// one parent, the PAL C64 of the NTSC one. A host feature (ARCHITECTURE.md
// section 8): which versions exist comes from MAME's parent/clone relation,
// what each one lets onto its shelves from MAME's own software-list filter
// (every version's catalogue was generated through it), and which version
// plays a title from those two facts and the list's own notes. Nothing here
// names a machine or a region.
/** "Commodore 64 (PAL)" is the PAL version; a description without one is named by its set. */
export function versionLabel(fullname, game) {
    return /\(([^)]+)\)\s*$/.exec(fullname)?.[1]?.trim() || game;
}
/** A version's filter tokens, from every shelf it declares one on. */
export function versionFilters(shelves) {
    return [...new Set(shelves.flatMap(shelf => (shelf.filter ?? '').split(',').map(token => token.trim()).filter(Boolean)))];
}
/**
 * The version that plays a title. `listedBy` names the versions whose
 * catalogues hold it -- MAME's filter already decided that -- and undefined
 * means a title no catalogue identified, which any version may try. Of
 * several, the visitor's choice wins; on Auto, the version whose filter names
 * the list's video note, then an accepted version before a candidate, then
 * the one whose shelves hold the most titles, then the first.
 */
export function chooseVersion(versions, listedBy, preference, video) {
    const candidates = listedBy ? versions.filter(version => listedBy.includes(version.game)) : [...versions];
    const pool = candidates.length ? candidates : [...versions];
    if (pool.length === 1)
        return pool[0];
    const chosen = pool.find(version => version.game === preference);
    if (chosen)
        return chosen;
    const noted = video ? pool.find(version => version.filters.includes(video)) : undefined;
    if (noted)
        return noted;
    const ready = pool.filter(version => version.accepted);
    const ranked = ready.length ? ready : pool;
    return ranked.reduce((best, version) => (version.titles ?? 0) > (best.titles ?? 0) ? version : best);
}
/** The one version a title is limited to, when not every version lists it. */
export function onlyVersion(versions, listedBy) {
    if (!listedBy || versions.length < 2 || listedBy.length !== 1)
        return undefined;
    return versions.find(version => version.game === listedBy[0]);
}
