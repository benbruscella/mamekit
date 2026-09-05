/** Address-map width exposed by generated CPU families when IR has no override. */
export function generatedCpuDataWidth(type: string): 8 | 16 {
  return ['m68000', 'm68010', 'z8002', 'v30'].includes(type.toLowerCase()) ? 16 : 8;
}

/** Default byte order for generated CPU families when IR has no override. */
export function generatedCpuEndianness(type: string): 'big' | 'little' {
  return type.toLowerCase() === 'v30' ? 'little' : 'big';
}
