import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { readZip } from '../src/runtime/zip.ts';

interface Match { list: string; name: string }
interface AuditedMedia {
  path: string;
  container?: string;
  inner?: string;
  extension: string;
  bytes: number;
  sha1: string;
  softwareRomMatches: Match[];
  firmwareMatches: unknown[];
  crt?: { completeSoftwareMatches: Match[] };
  error?: string;
  storedFile?: string;
}
interface Audit {
  input: string;
  mameSource: string;
  lists: Record<string, string>;
  summary: Record<string, unknown>;
  files: AuditedMedia[];
  storageRoot?: string;
}
interface Move {
  source: string;
  target: string;
  sha1: string;
  bytes: number;
  status: 'matched' | 'unmatched' | 'mame-unsupported' | 'format-issue' | 'firmware' | 'support-file';
}
const sha1 = (bytes: Uint8Array): string => createHash('sha1').update(bytes).digest('hex');

/** Keep verified sets that MAME marks unsupported out of the supported folders. */
export function fileUnsupportedSets(output: string): number {
  const importPath = join(output, 'media-import.json');
  if (!existsSync(importPath)) return 0;
  const imported = JSON.parse(readFileSync(importPath, 'utf8'));
  const replacements = new Map<string, string>();
  for (const entry of imported.entries ?? []) {
    if (entry.mameSupported !== 'no' || typeof entry.archive !== 'string' || entry.archive.startsWith('not-supported/')) continue;
    const source = inside(output, entry.archive);
    const targetName = join('not-supported', 'mame-unsupported', 'sets', entry.archive);
    const target = inside(output, targetName);
    if (existsSync(target)) throw new Error(`unsupported set destination already exists: ${target}`);
    mkdirSync(dirname(target), { recursive: true });
    renameSync(source, target);
    replacements.set(entry.archive, targetName);
  }
  const rewrite = (value: unknown): void => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) { value.forEach(rewrite); return; }
    const object = value as Record<string, unknown>;
    if (typeof object.archive === 'string' && replacements.has(object.archive)) object.archive = replacements.get(object.archive);
    Object.values(object).forEach(rewrite);
  };
  const documents = ['media-import.json', 'media-catalog.json',
    ...readdirSync(output, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => join(entry.name, '_manifest.json'))];
  for (const name of documents) {
    const path = join(output, name);
    if (!existsSync(path)) continue;
    const document = JSON.parse(readFileSync(path, 'utf8'));
    rewrite(document);
    writeFileSync(path, JSON.stringify(document, null, 2) + '\n');
  }
  return replacements.size;
}

function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => entry.isDirectory() ? filesBelow(join(directory, entry.name))
      : entry.isFile() ? [join(directory, entry.name)] : []);
}

function inside(root: string, path: string): string {
  const result = resolve(root, path);
  if (!result.startsWith(resolve(root) + sep)) throw new Error(`path escapes ROM directory: ${path}`);
  return result;
}

function mediaFolder(extensions: string[], matches: Match[]): string {
  if (matches.some(match => match.list === 'vic10')) return 'vic10';
  if (extensions.includes('.crt') || extensions.includes('.bin')) return 'c64_carts';
  if (extensions.includes('.g64')) return 'c64_flop_orig';
  if (extensions.includes('.d64')) return 'c64_flop_misc';
  if (extensions.includes('.tap') || extensions.includes('.tcrt')) return 'c64_cass';
  if (extensions.includes('.t64') || extensions.includes('.prg')) return 'c64_quik';
  return 'other';
}

/** File a recursive, checksum-audited inbox without discarding unmatched dumps. */
export async function processRomAudit(options: {
  auditPath: string; inputDir?: string; outputDir?: string; dryRun?: boolean;
}): Promise<void> {
  const audit = JSON.parse(readFileSync(options.auditPath, 'utf8')) as Audit;
  const input = resolve(options.inputDir ?? audit.input);
  const output = resolve(options.outputDir ?? dirname(options.auditPath));
  if (output === input || output.startsWith(input + sep)) throw new Error('output must be outside the inbox');
  const sourceFiles = filesBelow(input);
  if (!sourceFiles.length) { console.log('ROM inbox is empty'); return; }
  const statuses = new Map<string, string>();
  for (const [list, expectedHash] of Object.entries(audit.lists)) {
    const bytes = readFileSync(join(audit.mameSource, 'hash', `${list}.xml`));
    if (sha1(bytes) !== expectedHash) throw new Error(`MAME list changed since audit: ${list}`);
    for (const tag of bytes.toString('utf8').matchAll(/<software\b[^>]*>/g)) {
      const name = /\bname="([^"]+)"/.exec(tag[0])?.[1];
      if (name) statuses.set(`${list}:${name}`, /\bsupported="([^"]+)"/.exec(tag[0])?.[1] ?? 'yes');
    }
  }
  const firmware = new Set<string>();
  for (const file of ['src/mame/commodore/c64.cpp', 'src/devices/bus/cbmiec/c1541.cpp']) {
    const source = readFileSync(join(audit.mameSource, file), 'utf8');
    for (const match of source.matchAll(/ROMX?_LOAD\s*\([^\n]*?SHA1\(([a-f\d]{40})\)/gi)) firmware.add(match[1]!.toLowerCase());
  }
  const grouped = new Map<string, AuditedMedia[]>();
  for (const row of audit.files) {
    const file = row.container ?? row.path;
    const group = grouped.get(file) ?? [];
    group.push(row); grouped.set(file, group);
  }
  const moves: Move[] = [];
  const issues: { source: string; error: string }[] = [];
  const logPath = join(output, 'file-moves.jsonl');
  if (!options.dryRun) mkdirSync(output, { recursive: true });
  for (const [index, source] of sourceFiles.entries()) {
    const sourceName = relative(input, source);
    const rows = grouped.get(sourceName) ?? [];
    const before = statSync(source);
    const raw = readFileSync(source);
    const sourceHash = sha1(raw);
    let members: Map<string, Uint8Array> | undefined;
    let formatError: string | undefined;
    try {
      if (extname(source).toLowerCase() === '.zip') members = await readZip(raw);
      else if (extname(source).toLowerCase() === '.7z') {
        const names = execFileSync('/usr/bin/tar', ['-tf', source], { encoding: 'utf8' }).trim().split('\n');
        members = new Map(names.filter(name => name && !name.endsWith('/')).map(name => [name.toLowerCase(),
          execFileSync('/usr/bin/tar', ['-xOf', source, '--', name], { maxBuffer: 32 * 1024 * 1024 })]));
      }
    } catch (error) { formatError = String(error); }
    if (!formatError) {
      const byHash = new Map([...(members?.values() ?? [])].map(bytes => [sha1(bytes), bytes]));
      for (const row of rows) {
        const bytes = row.container
          ? members?.get(row.inner!.toLowerCase()) ?? byHash.get(row.sha1)
          : raw;
        if (!bytes || bytes.length !== row.bytes || sha1(bytes) !== row.sha1) {
          throw new Error(`input changed or archive member differs from audit: ${row.path}`);
        }
      }
    }
    const after = statSync(source);
    if (before.size !== after.size || before.mtimeMs !== after.mtimeMs) throw new Error(`input is still changing: ${sourceName}`);
    const hasFirmware = rows.some(row => row.firmwareMatches.length > 0) ||
      [...(members?.values() ?? [raw])].some(bytes => firmware.has(sha1(bytes)));
    const matches = rows.flatMap(row => [...row.softwareRomMatches, ...(row.crt?.completeSoftwareMatches ?? [])]);
    const supported = matches.some(match => ['yes', 'partial'].includes(statuses.get(`${match.list}:${match.name}`) ?? ''));
    const extensions = members
      ? [...members.keys()].map(name => extname(name).toLowerCase())
      : [extname(source).toLowerCase()];
    const folder = mediaFolder(extensions, matches);
    const isMedia = rows.length > 0 ||
      extensions.some(extension => ['.crt', '.bin', '.d64', '.g64', '.tap', '.t64', '.prg', '.tcrt', '.zip', '.7z'].includes(extension));
    const status: Move['status'] = formatError || rows.some(row => row.error) ? 'format-issue'
      : hasFirmware ? 'firmware' : supported ? 'matched' : matches.length ? 'mame-unsupported'
      : isMedia ? 'unmatched' : 'support-file';
    const targetName = status === 'firmware' ? join('bios', sourceName)
      : status === 'matched' ? join(folder, 'originals', sourceName)
      : status === 'support-file' ? join('source-files', sourceName)
      : join('not-supported', status, folder, sourceName);
    let destination = inside(output, targetName);
    // Preserve repeated uploads as separate originals, including byte-identical ones.
    for (let n = 2; existsSync(destination); n++) destination = inside(output, `${targetName}.${n}`);
    const move: Move = { source: sourceName, target: relative(output, destination), sha1: sourceHash, bytes: raw.length, status };
    if (formatError) issues.push({ source: sourceName, error: formatError });
    if (!options.dryRun) {
      mkdirSync(dirname(destination), { recursive: true });
      // Write-ahead journal makes an interrupted run recoverable.
      appendFileSync(logPath, JSON.stringify({ ...move, phase: 'planned' }) + '\n');
      renameSync(source, destination);
      appendFileSync(logPath, JSON.stringify({ ...move, phase: 'moved' }) + '\n');
    }
    moves.push(move);
    for (const row of rows) row.storedFile = move.target;
    if ((index + 1) % 2000 === 0) console.log(`${options.dryRun ? 'checked' : 'filed'} ${index + 1}/${sourceFiles.length} inputs`);
  }
  const destinations = new Map(moves.map(move => [move.source, move.target]));
  const rewriteSources = (value: unknown): void => {
    if (Array.isArray(value)) { value.forEach(rewriteSources); return; }
    if (!value || typeof value !== 'object') return;
    const object = value as Record<string, unknown>;
    if (typeof object.list === 'string' && typeof object.name === 'string') {
      object.mameSupported = statuses.get(`${object.list}:${object.name}`) ?? 'unknown';
    }
    if (Array.isArray(object.sources)) object.sources = object.sources.map(source => {
      const [file, ...inner] = String(source).split('::');
      const stored = destinations.get(file!);
      return stored ? stored + (inner.length ? `::${inner.join('::')}` : '') : source;
    });
    Object.values(object).forEach(rewriteSources);
  };
  if (!options.dryRun) {
    audit.storageRoot = output;
    writeFileSync(options.auditPath, JSON.stringify(audit, null, 2) + '\n');
    for (const name of ['media-import.json', 'media-catalog.json']) {
      const path = join(output, name);
      if (!existsSync(path)) continue;
      const document = JSON.parse(readFileSync(path, 'utf8'));
      rewriteSources(document);
      writeFileSync(path, JSON.stringify(document, null, 2) + '\n');
    }
    for (const directory of readdirSync(output, { withFileTypes: true }).filter(entry => entry.isDirectory())) {
      const path = join(output, directory.name, '_manifest.json');
      if (!existsSync(path)) continue;
      const document = JSON.parse(readFileSync(path, 'utf8'));
      rewriteSources(document);
      writeFileSync(path, JSON.stringify(document, null, 2) + '\n');
    }
    fileUnsupportedSets(output);
    const prune = (directory: string): void => {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const child = join(directory, entry.name); prune(child);
        if (!readdirSync(child).length) rmdirSync(child);
      }
    };
    prune(input);
  }
  const counts: Record<string, number> = {};
  for (const move of moves) counts[move.status] = (counts[move.status] ?? 0) + 1;
  const summary = { input, output, dryRun: !!options.dryRun, files: moves.length, counts, issues,
    remainingInputs: options.dryRun ? sourceFiles.length : filesBelow(input).length };
  if (!options.dryRun) writeFileSync(join(output, 'processing-summary.json'), JSON.stringify(summary, null, 2) + '\n');
  console.log(JSON.stringify(summary, null, 2));
}
