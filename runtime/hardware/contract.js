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
/** Find the capability that claims a MAME device type. */
export function capabilityForType(capabilities, type) {
    return capabilities.find(capability => capability.mameTypes.includes(type));
}
