import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { MameAstIndex, parseMameAst } from './ast.ts';

export interface AddressByteBitswapTransform {
  kind: 'address-byte-bitswap';
  region: string;
  start: number;
  end: number;
  addressBits: number[];
  addressXor: number;
  dataBits: number[];
}

export interface WordBitswapTransform {
  kind: 'word-bitswap';
  region: string;
  wordBits: number;
  bits: number[];
}

export interface PromWordAddressTransform {
  kind: 'prom-word-address';
  region: string;
  promRegion: string;
  wordBytes: number;
  addressKeepMask: number;
  tableAddressMask: number;
  tableAddressShift: number;
  tableEntryMask: number;
  bitPickTable: number[][];
}

type DriverRomTransform =
  | AddressByteBitswapTransform
  | WordBitswapTransform
  | PromWordAddressTransform;

/** Lower a virtual driver_start decrypt_rom bitswap into a ROM-load transform. */
export function compileDriverRomTransforms(
  mameSrc: string,
  driverFile: string,
  className: string,
  regionSizes: Readonly<Record<string, number>>,
  initName = '',
): DriverRomTransform[] {
  const directory = dirname(driverFile);
  const stem = driverFile.replace(/\.cpp$/, '');
  const files = [driverFile, `${stem}.h`, join(directory, `${stem.split('/').at(-1)}.h`)]
    .filter((file, index, all) => all.indexOf(file) === index)
    .filter(file => existsSync(join(mameSrc, file)));
  const ast = new MameAstIndex(parseMameAst(files.map(file => ({
    file,
    source: readFileSync(join(mameSrc, file), 'utf8'),
  }))));
  const transforms: DriverRomTransform[] = [];
  const init = initName && initName !== 'empty_init'
    ? ast.findFunctionInHierarchy(className, initName)
    : undefined;
  if (init) {
    for (const call of init.body.matchAll(
      /\b(\w+)\s*\(\s*memregion\(\s*"([^"]+)"\s*\)\s*\)/g,
    )) {
      const helper = ast.findFunction('', call[1]!);
      const bitswap = helper && /bitswap\s*<\s*(\d+)\s*>\s*\(\s*\w+\s*,([^)]+)\)/
        .exec(helper.body);
      const wordBits = Number(bitswap?.[1]);
      const bits = bitswap?.[2].split(',').map(value => Number(value.trim())) ?? [];
      if (
        !regionSizes[call[2]!] || wordBits !== 32 || bits.length !== wordBits ||
        bits.some(bit => bit < 0 || bit >= wordBits) || new Set(bits).size !== wordBits
      ) continue;
      transforms.push({
        kind: 'word-bitswap',
        region: call[2]!,
        wordBits,
        bits,
      });
    }
    const prom = /\b(\w+)\s*=\s*memregion\(\s*"([^"]+)"\s*\)->base\(\)/
      .exec(init.body);
    const words = /\b(\w+)\s*=\s*reinterpret_cast\s*<\s*uint32_t\s*\*\s*>\s*\(\s*memregion\(\s*"([^"]+)"\s*\)->base\(\)\s*\)/
      .exec(init.body);
    const table = /bit_pick_table\s*\[\s*(\d+)\s*]\s*\[\s*(\d+)\s*]\s*=\s*\{([\s\S]*?)\n\s*\};/
      .exec(init.body);
    const entry = prom && new RegExp(
      `${prom[1]}\\s*\\[\\s*\\(\\s*A\\s*&\\s*(0x[\\da-f]+|\\d+)\\s*\\)\\s*>>\\s*(\\d+)\\s*]\\s*&\\s*(0x[\\da-f]+|\\d+)`,
      'i',
    ).exec(init.body);
    const keep = /\bB\s*=\s*A\s*&\s*(0x[\da-f]+|\d+)/i.exec(init.body);
    if (prom && words && table && entry && keep && regionSizes[words[2]!] && regionSizes[prom[2]!]) {
      const rows = [...table[3]!.replace(/\/\/[^\n]*/g, '').matchAll(/\{([^{}]+)\}/g)]
        .map(row => row[1]!.split(',').map(value => Number(value.trim())));
      const rowCount = Number(table[1]);
      const columnCount = Number(table[2]);
      if (
        rows.length === rowCount && rows.every(row => row.length === columnCount) &&
        rows.flat().every(bit => Number.isInteger(bit) && bit >= 0 && bit < rowCount)
      ) {
        transforms.push({
          kind: 'prom-word-address',
          region: words[2]!,
          promRegion: prom[2]!,
          wordBytes: 4,
          addressKeepMask: Number(keep[1]),
          tableAddressMask: Number(entry[1]),
          tableAddressShift: Number(entry[2]),
          tableEntryMask: Number(entry[3]),
          bitPickTable: rows,
        });
      }
    }
  }

  const decrypt = ast.findFunctionInHierarchy(className, 'decrypt_rom');
  if (!decrypt) return transforms;
  const region = /memregion\(\s*"([^"]+)"\s*\)->(?:base|bytes)\(\)/.exec(decrypt.body)?.[1];
  const operation = /buffer\s*\[\s*i\s*\]\s*=\s*bitswap\s*<\s*8\s*>\s*\(\s*rom\s*\[\s*bitswap\s*<\s*16\s*>\s*\(\s*i\s*,\s*([^)]+)\)\s*\^\s*(0x[\da-f]+|\d+)\s*\]\s*,\s*([^)]+)\)/i
    .exec(decrypt.body);
  if (!region || !operation || !regionSizes[region]) return transforms;
  const numbers = (source: string): number[] => source
    .split(',')
    .map(value => Number(value.trim()));
  const addressBits = numbers(operation[1]!);
  const dataBits = numbers(operation[3]!);
  if (
    addressBits.length !== 16 || new Set(addressBits).size !== 16 ||
    dataBits.length !== 8 || new Set(dataBits).size !== 8
  ) return transforms;
  transforms.push({
    kind: 'address-byte-bitswap',
    region,
    start: 0,
    end: regionSizes[region],
    addressBits,
    addressXor: Number(operation[2]),
    dataBits,
  });
  return transforms;
}
