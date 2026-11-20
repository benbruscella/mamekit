// The images in a machine's transports, recorded with a save (issue #161).
//
// A cassette's samples are the host's media, not machine state: a save holds
// where the tape is and whether it is playing, not the tape. So a save names
// the image each transport held -- by name and by the CRC of its bytes, since
// two sets can give different tapes one name (batman and batmano both hold a
// `batman_side_1.tap`) -- and a load puts exactly those back before the state,
// or refuses. Nothing here names a machine: a transport is any strip of the
// panel that mounts images of a set.
import { crc32 } from "./zip.js";
const crcs = new WeakMap();
/** The CRC a save records for an image, computed once per image in hand. */
export function imageCrc(bytes) {
    let crc = crcs.get(bytes);
    if (crc === undefined)
        crcs.set(bytes, crc = crc32(bytes).toString(16).padStart(8, '0'));
    return crc;
}
/**
 * A transport over a set it holds by name: `inHand` is the set (it changes
 * when another is opened), `mounted` the name in the transport now, and
 * `mount` puts one of the set in.
 */
export function transportImage(tag, inHand, mounted, mount) {
    return {
        tag,
        current: () => {
            const name = mounted();
            const bytes = name === undefined ? undefined : inHand().get(name);
            return name !== undefined && bytes ? { name, crc: imageCrc(bytes) } : undefined;
        },
        holds: image => {
            const bytes = inHand().get(image.name);
            return Boolean(bytes) && imageCrc(bytes) === image.crc;
        },
        select: image => { if (mounted() !== image.name)
            mount(image.name); },
    };
}
/** What every transport holds now, for a save. */
export function recordMedia(transports) {
    return Object.fromEntries(transports.flatMap(transport => {
        const image = transport.current();
        return image ? [[transport.tag, image]] : [];
    }));
}
/**
 * The images a save needs that are not in hand, without touching a single
 * transport: one whose transport is gone, one the set in hand lacks or holds
 * other bytes under, and any record too old to say what its bytes were.
 * Empty means every one can go back.
 */
export function missingMedia(transports, media) {
    if (media === undefined || media === null)
        return [];
    const missing = [];
    for (const [tag, recorded] of Object.entries(media)) {
        const image = recorded;
        if (!image || typeof image.name !== 'string' || typeof image.crc !== 'string') {
            missing.push(String(typeof recorded === 'string' ? recorded : tag));
            continue;
        }
        const transport = transports.find(candidate => candidate.tag === tag);
        if (!transport?.holds({ name: image.name, crc: image.crc }))
            missing.push(image.name);
    }
    return missing;
}
/** Put every recorded image back in its transport: only once missingMedia() is empty. */
export function putMedia(transports, media) {
    for (const [tag, image] of Object.entries(media ?? {})) {
        transports.find(candidate => candidate.tag === tag)?.select(image);
    }
}
