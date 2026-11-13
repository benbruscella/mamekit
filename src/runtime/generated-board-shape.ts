/**
 * Bytes per address unit on a CPU's own address spaces.
 *
 * MAME declares this as the `addrshift` of an `address_space_config`, and most
 * generated families leave it at zero -- one address, one byte. The
 * TMS320C1x declares -1 on program, data and io alike: it is a word machine,
 * so a source address of N covers bus bytes 2N and 2N+1, and every map range
 * MAME writes for it is in words. The generated core normalizes to byte
 * addresses at the access site, so the ranges have to be scaled to match.
 */
export function generatedCpuAddressUnitBytes(addressShift: number): number {
  // MAME's address_space_config addrshift: -1 is a word-addressed space (two
  // bytes per address, the TMS320C10); +3 a bit-addressed one (an eighth of a
  // byte per address, the TMS34010).
  return 2 ** -addressShift;
}
