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

/** Lower a virtual driver_start decrypt_rom bitswap into a ROM-load transform. */
export function compileDriverRomTransforms(
  mameSrc: string,
  driverFile: string,
  className: string,
  regionSizes: Readonly<Record<string, number>>,
): AddressByteBitswapTransform[] {
  const directory = dirname(driverFile);
  const stem = driverFile.replace(/\.cpp$/, '');
  const files = [driverFile, `${stem}.h`, join(directory, `${stem.split('/').at(-1)}.h`)]
    .filter((file, index, all) => all.indexOf(file) === index)
    .filter(file => existsSync(join(mameSrc, file)));
  const ast = new MameAstIndex(parseMameAst(files.map(file => ({
    file,
    source: readFileSync(join(mameSrc, file), 'utf8'),
  }))));
  const decrypt = ast.findFunctionInHierarchy(className, 'decrypt_rom');
  if (!decrypt) return [];
  const region = /memregion\(\s*"([^"]+)"\s*\)->(?:base|bytes)\(\)/.exec(decrypt.body)?.[1];
  const operation = /buffer\s*\[\s*i\s*\]\s*=\s*bitswap\s*<\s*8\s*>\s*\(\s*rom\s*\[\s*bitswap\s*<\s*16\s*>\s*\(\s*i\s*,\s*([^)]+)\)\s*\^\s*(0x[\da-f]+|\d+)\s*\]\s*,\s*([^)]+)\)/i
    .exec(decrypt.body);
  if (!region || !operation || !regionSizes[region]) return [];
  const numbers = (source: string): number[] => source
    .split(',')
    .map(value => Number(value.trim()));
  const addressBits = numbers(operation[1]!);
  const dataBits = numbers(operation[3]!);
  if (
    addressBits.length !== 16 || new Set(addressBits).size !== 16 ||
    dataBits.length !== 8 || new Set(dataBits).size !== 8
  ) return [];
  return [{
    kind: 'address-byte-bitswap',
    region,
    start: 0,
    end: regionSizes[region],
    addressBits,
    addressXor: Number(operation[2]),
    dataBits,
  }];
}
