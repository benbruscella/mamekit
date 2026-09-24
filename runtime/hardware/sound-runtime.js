// Contract for a sound family's runtime wiring.
//
// The board used to switch on sound kind to install each family's register
// handlers — the fifth place a family had to be registered. A capability
// package now installs its own, through a context that exposes only the
// generic machinery: bus handler slots, generated-call aliases, the audio sink
// and callback dispatch.
//
// This ships to the browser, so it wires generated IR and nothing else. No DSP,
// no register models, no MAME source.
/** Every name a generated handler may use to reach one device. */
export function deviceAliases(board, tag) {
    const member = board.devices?.find(device => device.tag === tag)?.member;
    return [tag, `m_${tag}`, ...(member ? [member] : [])];
}
/** The chips this sound binding covers, in board order. */
export function soundTags(sound) {
    return sound.deviceTags ?? [sound.deviceTag];
}
