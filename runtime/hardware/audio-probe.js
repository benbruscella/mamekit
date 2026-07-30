// Contract for acceptance audio probes.
//
// The harness used to switch on sound kind and construct each family's mixer
// and frame renderer inline, which meant a new sound family had to be added
// there as well as everywhere else. A capability package now supplies its own
// renderer; the harness keeps what is generic — collecting frames, hashing
// them, and comparing against the golden.
export {};
