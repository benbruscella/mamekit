import { artworkSources } from '../runtime/artwork-source.ts';

export interface DossierData {
  game: string;
  title: string;
  fullname: string;
  year: string;
  company: string;
  family: string;
  driverFile: string;
  license?: string;
  copyrightHolders?: string;
  cpus: { tag: string; type?: string; clock: number; ranges: unknown[] }[];
  sound: { kind: string; clock?: number; chips?: number };
  screen: { width: number; height: number; refresh: number; rotate?: number };
  roms: {
    region: string;
    size: number;
    loads: { file: string; offset: number; size: number; crc: string }[];
  }[];
  bindings: unknown[];
  dipDefaults: unknown[];
  gitHistory?: Record<string, unknown>;
  historyText: string;
  historyCredit: string;
  cart?: { list: string; entries: number; slots: string[] };
}

export interface DossierHtmlOptions {
  dataPath: string;
}

const escapeHtml = (value: unknown): string => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const hex = (value: number): string => `0x${value.toString(16)}`;

const prettyKey = (key: string): string => key.replace(/^Key|^Arrow|^Digit/, '');

const prettyIpt = (label: string): string =>
  label.replace(/^IPT_/, '').replace(/_/g, ' ').toLowerCase();

/**
 * Portable dossier rendering. The HTML dossier and its download are both
 * rendered from DossierData, which is persisted beside the generated graph.
 */
export function machineDossierMarkdown(d: DossierData): string {
  const md: string[] = [];
  md.push(`# ${d.fullname}`);
  md.push('');
  md.push(`**${d.company} · ${d.year}** — transpiled from the MAME driver \`${d.driverFile}\` by mamekit.`);
  md.push('');
  md.push(`![marquee](${artworkSources(`media/marquees/${d.game}.png`)[0]})`);
  md.push('');
  md.push('| Cover | Cabinet |');
  md.push('| --- | --- |');
  md.push(`| ![flyer](${artworkSources(`covers/${d.game}.png`)[0]}) | ![cabinet](${artworkSources(`media/cabinets/${d.game}.png`)[0]}) |`);
  md.push('');
  md.push('## The machine');
  md.push('');
  md.push('| CPU | Type | Clock | Mapped ranges |');
  md.push('| --- | --- | --- | --- |');
  for (const cpu of d.cpus) {
    md.push(`| \`${cpu.tag}\` | ${(cpu.type ?? 'z80').toUpperCase()} | ${(cpu.clock / 1e6).toFixed(3)} MHz | ${cpu.ranges.length} |`);
  }
  md.push('');
  md.push(`- **Sound:** ${d.sound.kind === 'none' ? 'discrete analog board' : d.sound.kind}` +
    (d.sound.chips ? ` × ${d.sound.chips}` : '') +
    (d.sound.clock ? ` @ ${(d.sound.clock / 1e6).toFixed(3)} MHz` : ''));
  md.push(`- **Screen:** ${d.screen.width}×${d.screen.height} @ ${d.screen.refresh.toFixed(2)} Hz` +
    (d.screen.rotate ? ` · rotated ${d.screen.rotate}°` : ''));
  md.push('');

  if (d.cart) {
    md.push('### Cartridges');
    md.push('');
    md.push(`The machine itself needs no ROMs — all software comes on cartridges. ` +
      `${d.cart.entries.toLocaleString('en-US')} cartridges are catalogued from the MAME \`${d.cart.list}\` ` +
      `software list; ${d.cart.slots.length} PCB types are currently supported ` +
      `(${d.cart.slots.map(slot => `\`${slot}\``).join(', ')}). Drop your own legally-dumped ` +
      'cart files onto the console page to play.');
    md.push('');
  } else {
    md.push('### ROM chips');
    md.push('');
    md.push('| Region | Chip | Offset | Size | CRC |');
    md.push('| --- | --- | --- | --- | --- |');
    for (const region of d.roms) {
      for (const load of region.loads) {
        md.push(`| \`${region.region}\` | \`${load.file}\` | ${hex(load.offset)} | ${hex(load.size)} | \`${load.crc}\` |`);
      }
    }
    md.push('');
  }

  const bindings = d.bindings as {
    port: string;
    mask: number;
    keys: string[];
    label: string;
  }[];
  if (bindings.length) {
    md.push('## Controls');
    md.push('');
    md.push('| Key | Function | Port | Bit |');
    md.push('| --- | --- | --- | --- |');
    for (const binding of bindings) {
      md.push(`| ${binding.keys.map(prettyKey).join(' / ')} | ${prettyIpt(binding.label)} | \`${binding.port}\` | ${hex(binding.mask)} |`);
    }
    md.push('');
  }

  const dips = (d.dipDefaults as {
    port: string;
    mask: number;
    value: number;
    name: string;
  }[]).filter(dip => dip.name);
  if (dips.length) {
    md.push('## DIP switches (factory defaults)');
    md.push('');
    md.push('| Setting | Port | Mask | Default |');
    md.push('| --- | --- | --- | --- |');
    for (const dip of dips) {
      md.push(`| ${dip.name} | \`${dip.port}\` | ${hex(dip.mask)} | ${hex(dip.value)} |`);
    }
    md.push('');
  }

  md.push('## The MAME driver — the people who reverse-engineered it');
  md.push('');
  md.push(`- **Driver source:** \`${d.driverFile}\``);
  if (d.copyrightHolders) md.push(`- **Written by:** ${d.copyrightHolders}`);
  if (d.license) md.push(`- **License:** ${d.license}`);
  if (d.gitHistory) {
    const history = d.gitHistory as {
      firstCommit: string;
      lastCommit: string;
      commits: number;
      contributors: number;
      topAuthors: string[];
    };
    md.push(`- **Development:** ${history.commits} commits by ${history.contributors} contributors, ${history.firstCommit.slice(0, 4)}–${history.lastCommit.slice(0, 4)}`);
    md.push(`- **Top contributors:** ${history.topAuthors.join(', ')}`);
  }
  md.push('');

  if (d.historyText) {
    md.push('## The story');
    md.push('');
    md.push(d.historyText.replace(/^- ([A-Z][A-Z0-9 .&'/-]{2,}) -\s*$/gm,
      (_, name: string) => `### ${name.charAt(0) + name.slice(1).toLowerCase()}`));
    md.push('');
    md.push(`*${d.historyCredit || 'Story from the local presentation package'}.*`);
    md.push('');
  }

  md.push('---');
  md.push('');
  md.push(`*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver \`${d.family}\`. Play it at [../../../app/g/${d.game}/](../../../app/g/${d.game}/) or [explore the knowledge graph](viewer.html).*`);
  md.push('');
  return md.join('\n');
}

function storyHtml(text: string): string {
  if (!text) return '';
  const parts = text.split(/^- ([A-Z][A-Z0-9 .&'/-]{2,}) -\s*$/m);
  const intro = parts[0]?.trim();
  const sections: string[] = intro ? [`<p class="story">${escapeHtml(intro)}</p>`] : [];
  for (let index = 1; index < parts.length; index += 2) {
    const name = parts[index]?.trim();
    const body = parts[index + 1]?.trim();
    if (name && body) {
      sections.push(`<details><summary>${escapeHtml(name)}</summary><p class="story">${escapeHtml(body)}</p></details>`);
    }
  }
  return sections.join('');
}

export function machineDossierHtml(d: DossierData, options: DossierHtmlOptions): string {
  const cpuRows = d.cpus.map(cpu => `<tr><td>${escapeHtml(cpu.tag)}</td><td>${escapeHtml(
    (cpu.type ?? 'z80').toUpperCase(),
  )}</td><td>${(cpu.clock / 1e6).toFixed(3)} MHz</td><td>${cpu.ranges.length}</td></tr>`).join('');
  const romRows = d.roms.flatMap(region => region.loads.map(load =>
    `<tr><td>${escapeHtml(region.region)}</td><td>${escapeHtml(load.file)}</td>` +
    `<td>${hex(load.offset)}</td><td>${hex(load.size)}</td><td>${escapeHtml(load.crc)}</td></tr>`)).join('');
  const bindings = d.bindings as {
    port: string;
    mask: number;
    keys: string[];
    label: string;
  }[];
  const bindingRows = bindings.map(binding =>
    `<tr><td>${escapeHtml(binding.keys.map(prettyKey).join(' / '))}</td>` +
    `<td>${escapeHtml(prettyIpt(binding.label))}</td><td>${escapeHtml(binding.port)}</td>` +
    `<td>${hex(binding.mask)}</td></tr>`).join('');
  const history = d.gitHistory as {
    firstCommit?: string;
    lastCommit?: string;
    commits?: number;
    contributors?: number;
    topAuthors?: string[];
  } | undefined;
  const downloadName = `${d.game}-dossier.md`;
  const downloadHref = `../../../../${options.dataPath}/${downloadName}`;
  const graphHref = `../../../../${options.dataPath}/viewer.html`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(d.fullname)} — full dossier</title>
<style>
:root{--night:#080a17;--panel:#11162f;--line:#29315f;--gold:#f2c200;--ink:#eef0ff;--muted:#929bd0}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 70% 0,#1b214b 0,var(--night) 42%);
color:var(--ink);font:15px/1.65 ui-sans-serif,system-ui,sans-serif}a{color:#b8c4ff}nav{position:sticky;top:0;z-index:4;
display:flex;align-items:center;gap:18px;flex-wrap:wrap;padding:13px max(22px,calc((100vw - 1120px)/2));
background:rgba(8,10,23,.92);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}
nav strong{color:var(--gold);margin-right:auto}.button{border:1px solid #5966aa;border-radius:999px;padding:7px 13px;text-decoration:none}
.button.primary{background:var(--gold);border-color:var(--gold);color:#17130a;font-weight:800}
main{max-width:1120px;margin:auto;padding:48px 24px 80px}.eyebrow{color:var(--gold);letter-spacing:.18em;text-transform:uppercase;font-size:11px;font-weight:800}
h1{font-size:clamp(38px,7vw,76px);line-height:.96;margin:10px 0 16px;max-width:900px}.dek{color:var(--muted);font-size:18px;margin-bottom:32px}
.hero{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:34px;align-items:end}.hero img{width:100%;max-height:330px;object-fit:contain}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin:28px 0}.card,section{background:rgba(17,22,47,.86);
border:1px solid var(--line);border-radius:16px;padding:24px}section{margin:20px 0}h2{color:var(--gold);margin:0 0 14px;font-size:22px}
.fact{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #222a54;padding:7px 0}.fact span{color:var(--muted)}
.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;font-size:13px}th,td{text-align:left;padding:9px 12px;border-bottom:1px solid #252d5b}
th{color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.1em}details{border-top:1px solid var(--line);padding:12px 0}
summary{cursor:pointer;color:var(--gold);font-weight:700}.story{white-space:pre-wrap;color:#cbd0ef}
@media(max-width:700px){.hero,.grid{grid-template-columns:1fr}.hero img{display:none}nav{position:static}main{padding-top:30px}}
</style>
</head>
<body>
<nav>
  <strong>MAME HISTORY · DOSSIER</strong>
  <a href="../">Back to ${escapeHtml(d.fullname)}</a>
  <a href="../../../browse/">Browse the archive</a>
  <a href="${graphHref}">Machine explorer</a>
  <a class="button primary" href="${downloadHref}" download="${escapeHtml(downloadName)}">Download ${escapeHtml(downloadName)}</a>
</nav>
<main>
  <div class="hero"><div><div class="eyebrow">${escapeHtml(d.company)} · ${escapeHtml(d.year)}</div>
    <h1>${escapeHtml(d.fullname)}</h1>
    <p class="dek">A generated preservation dossier drawn from the MAME driver, its knowledge graph, and source history.</p>
  </div><img src="${artworkSources(`media/marquees/${d.game}.png`)[0]}" alt=""></div>
  <div class="grid">
    <div class="card"><h2>Machine identity</h2>
      <div class="fact"><span>Set</span><strong>${escapeHtml(d.game)}</strong></div>
      <div class="fact"><span>Driver</span><strong>${escapeHtml(d.driverFile)}</strong></div>
      <div class="fact"><span>Board family</span><strong>${escapeHtml(d.family)}</strong></div>
      ${d.license ? `<div class="fact"><span>License</span><strong>${escapeHtml(d.license)}</strong></div>` : ''}
    </div>
    <div class="card"><h2>Signal and display</h2>
      <div class="fact"><span>Sound</span><strong>${escapeHtml(d.sound.kind === 'none' ? 'discrete analog board' : d.sound.kind)}</strong></div>
      <div class="fact"><span>Screen</span><strong>${d.screen.width}×${d.screen.height} @ ${d.screen.refresh.toFixed(2)} Hz</strong></div>
      <div class="fact"><span>Orientation</span><strong>${d.screen.rotate ? `${d.screen.rotate}°` : 'landscape'}</strong></div>
    </div>
  </div>
  <section><h2>Processors</h2><div class="table-wrap"><table><thead><tr><th>Tag</th><th>Family</th><th>Clock</th><th>Mapped ranges</th></tr></thead><tbody>${cpuRows}</tbody></table></div></section>
  ${d.cart ? `<section><h2>Cartridges</h2><p>${d.cart.entries.toLocaleString('en-US')} entries from the ${escapeHtml(d.cart.list)} software list; ${d.cart.slots.length} supported PCB types.</p></section>` :
    `<section><h2>ROM map</h2><div class="table-wrap"><table><thead><tr><th>Region</th><th>Chip</th><th>Offset</th><th>Size</th><th>CRC</th></tr></thead><tbody>${romRows}</tbody></table></div></section>`}
  ${bindingRows ? `<section><h2>Controls</h2><div class="table-wrap"><table><thead><tr><th>Key</th><th>Function</th><th>Port</th><th>Bit</th></tr></thead><tbody>${bindingRows}</tbody></table></div></section>` : ''}
  <section><h2>The people behind the driver</h2>
    <div class="fact"><span>Driver source</span><strong>${escapeHtml(d.driverFile)}</strong></div>
    ${d.copyrightHolders ? `<div class="fact"><span>Written by</span><strong>${escapeHtml(d.copyrightHolders)}</strong></div>` : ''}
    ${history?.commits ? `<div class="fact"><span>Development</span><strong>${history.commits} commits by ${history.contributors ?? 0} contributors, ${escapeHtml(history.firstCommit?.slice(0, 4))}–${escapeHtml(history.lastCommit?.slice(0, 4))}</strong></div>` : ''}
    ${history?.topAuthors?.length ? `<div class="fact"><span>Top contributors</span><strong>${escapeHtml(history.topAuthors.join(', '))}</strong></div>` : ''}
  </section>
  ${d.historyText ? `<section><h2>The story</h2>${storyHtml(d.historyText)}<p class="dek">${escapeHtml(d.historyCredit)}</p></section>` : ''}
</main>
</body>
</html>`;
}
