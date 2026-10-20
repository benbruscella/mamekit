import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { artworkDir } from '../paths.ts';
import { cachedDriverCommitActivity, type DriverCommitActivity } from './driver-history.ts';
import { loadDriverCredits } from './driver-attribution.ts';
import { machineDossierMarkdown as renderDossierMarkdown, type DossierData } from './dossier.ts';
import type { lowerMachine } from './lower-machine.ts';
import type { GenerateOptions } from './generate.ts';

const projectRoot = resolve(import.meta.dirname, '../..');

/** Presentation artifacts are derived from the lowered machine and its provenance. */
export function writeExhibit(data: Awaited<ReturnType<typeof lowerMachine>>, opts: GenerateOptions): void {
  const { graph, game, title, family, kind, cpus, sound, screen, roms, bindings,
    dipDefaults, cart, cartEntries, software } = data;
  // per-game metadata for the boot menu manifest + "learn" modal.
  //
  // Attribution and activity are two different things and are kept apart:
  //
  //   credits         who MAMEDEV credited, from published release notes and
  //                   the driver header (src/gen/driver-attribution.ts)
  //   commitActivity  how much the file was committed to, and nothing more
  //
  // Both are best effort: no release-notes data or no git checkout simply
  // leaves the field out rather than guessing.
  let commitActivity: DriverCommitActivity | undefined;
  try {
    commitActivity = cachedDriverCommitActivity(opts.mameSrc, String(graph.meta.driverFile));
  } catch { /* no git checkout available */ }
  const credits = loadDriverCredits(projectRoot, {
    driverFile: String(graph.meta.driverFile ?? ''),
    machineNames: [opts.game, String(game.props.fullname ?? '')],
    copyrightHolders: graph.meta.copyrightHolders ? String(graph.meta.copyrightHolders) : undefined,
  });

  // Prefer a local curated story when preservation research has more detail
  // than the shared Gaming History entry. Both live with the gitignored
  // presentation package; attribution is carried into the generated app.
  let hasHistory = false;
  let historyText = '';
  let historyCredit = '';
  const historyDir = join(artworkDir(projectRoot), 'data/history');
  const curatedHistoryPath = join(historyDir, `${opts.game}.txt`);
  const historyXmlPath = join(historyDir, 'history.xml');
  if (existsSync(curatedHistoryPath)) {
    try {
      historyText = readFileSync(curatedHistoryPath, 'utf8')
        .replace(/\r\n/g, '\n')
        .trim();
      if (historyText) {
        historyCredit = 'Curated from the preservation sources cited in the story';
        writeFileSync(join(opts.outDir, 'history.txt'), `${historyText}\n`);
        hasHistory = true;
      }
    } catch { /* unreadable local story — fall back to Gaming History */ }
  }
  if (!hasHistory && existsSync(historyXmlPath)) {
    try {
      const xml = readFileSync(historyXmlPath, 'utf8');
      const at = xml.indexOf(`<system name="${opts.game}"`);
      if (at >= 0) {
        const entryStart = xml.lastIndexOf('<entry>', at);
        const textStart = xml.indexOf('<text>', entryStart);
        const textEnd = xml.indexOf('</text>', textStart);
        if (entryStart >= 0 && textStart >= 0 && textEnd > textStart) {
          historyText = xml.slice(textStart + 6, textEnd)
            .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
            .replace(/\r\n/g, '\n') // the .dat ships CRLF; regexes downstream assume \n
            .trim();
          writeFileSync(join(opts.outDir, 'history.txt'),
            historyText + '\n\n— Gaming History (arcade-history.com)\n');
          historyCredit = 'Story courtesy of Gaming History (arcade-history.com)';
          hasHistory = true;
        }
      }
    } catch { /* malformed dat — skip */ }
  }

  // MAME's parent machine (`COMP(1982, c64p, c64, ...)`): a regional version
  // is a clone of the machine it was made from, which is how the boot menu
  // shelves a computer's or console's versions as one box.
  const cloneof = opts.fullGraph?.edges.find(edge =>
    edge.from === `game:${opts.game}` && edge.rel === 'CLONE_OF')?.to.replace(/^game:/, '');
  writeFileSync(join(opts.outDir, 'meta.json'), JSON.stringify({
    game: opts.game,
    title,
    fullname: game.props.fullname,
    year: game.props.year,
    manufacturer: game.props.company,
    family,
    ...(cloneof ? { cloneof } : {}),
    ...(kind ? { kind } : {}),
    driverFile: graph.meta.driverFile,
    ...(graph.meta.license ? { license: graph.meta.license } : {}),
    ...(graph.meta.copyrightHolders ? { copyrightHolders: graph.meta.copyrightHolders } : {}),
    ...(credits ? { credits } : {}),
    ...(commitActivity ? { commitActivity } : {}),
    ...(hasHistory ? { hasHistory: true } : {}),
    ...(historyCredit ? { historyCredit } : {}),
  }, null, 2));

  // The canonical dossier data feeds both the portable Markdown download and
  // the styled in-site HTML route emitted by buildApp.
  const dossier: DossierData = {
    game: opts.game, title, fullname: String(game.props.fullname),
    year: String(game.props.year), company: String(game.props.company),
    family, driverFile: String(graph.meta.driverFile),
    license: graph.meta.license as string | undefined,
    copyrightHolders: graph.meta.copyrightHolders as string | undefined,
    cpus, sound, screen, roms, bindings, dipDefaults, credits, commitActivity, historyText,
    historyCredit,
    ...(cart ? {
      cart: { list: String(cart.list), entries: cartEntries, slots: cart.slots as string[] },
    } : {}),
    ...(software ? {
      software: software.shelves.map(shelf => ({
        list: shelf.list, kind: shelf.kind, entries: shelf.entries, mountable: shelf.mountable,
      })),
    } : {}),
  };
  const dossierMarkdown = renderDossierMarkdown(dossier);
  writeFileSync(join(opts.outDir, 'dossier.json'), JSON.stringify(dossier, null, 2));
  writeFileSync(join(opts.outDir, 'DOSSIER.md'), dossierMarkdown);
  writeFileSync(join(opts.outDir, `${opts.game}-dossier.md`), dossierMarkdown);
}
