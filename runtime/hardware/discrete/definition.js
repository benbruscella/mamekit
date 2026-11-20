export const DISCRETE_ID = 'discrete';
/** MAME's discrete sound device (discrete.cpp), whose node table a driver supplies. */
export const DISCRETE_MAME_TYPES = ['DISCRETE'];
export const DISCRETE_PORTS = [
    { name: 'inputs', kind: 'registers', note: 'write and write_line to the table\'s DISCRETE_INPUT_* nodes, from the driver' },
    { name: 'audio', kind: 'audio-out', note: 'one sound_stream output per DISCRETE_OUTPUT node, mixed with the other streams' },
];
