// The site's front door: dist/index.html. One static page that says what
// MAME History is, how MAMEKIT builds it, and what you can play it with.
//
// Everything on it is read from the generated tree at emit time — machine
// counts, the year span, which flyers exist — plus the same key and pad
// tables the app binds from, so the legend it prints is the legend the
// game shows. Nothing here is a hand-picked list of games.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { generatedGameOutputs } from './output-layout.ts';
import { standardPadButton } from '../runtime/gamepad.ts';

export type HomeKind = 'arcade' | 'console' | 'computer';

export interface HomeMachine {
  game: string;
  /** display title: the MAME fullname without its maker/year tail or alias */
  title: string;
  year: string;
  manufacturer: string;
  kind: HomeKind;
  /** a web-sized flyer exists at artwork/covers/<game>.webp */
  cover: boolean;
  /** a cabinet photo exists at artwork/media/cabinets/<game>.webp */
  cabinet: boolean;
  /** a console photo exists at artwork/media/consoles/<game>.webp */
  photo: boolean;
}

export interface HomeData {
  machines: HomeMachine[];
  /** the MAME revision the tree was compiled from; shown short */
  mameRevision?: string;
  /** the generator's shared keyboard table, by MAME input type */
  keyFor: (type: string) => string[] | undefined;
  /** the generator's six-button fighter table (punch row, kick row), when it has one */
  fighterKeyFor?: (type: string) => string[] | undefined;
  /** the build's clock, for the vintage tile; defaults to now */
  now?: Date;
}

interface MetaShape {
  game?: string;
  title?: string;
  fullname?: string;
  year?: string | number;
  manufacturer?: string;
  kind?: string;
}

const escapeHtml = (value: unknown): string => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** The name a visitor knows a machine by: no alias list, no maker/year tail. */
export function homeTitle(meta: Pick<MetaShape, 'fullname' | 'title' | 'kind' | 'game'>): string {
  const name = (meta.fullname ?? meta.title ?? meta.game ?? '').replace(/\s*\(.*\)$/, '');
  return meta.kind === 'computer' ? name : name.split(' / ')[0]!.trim() || name;
}

/** Every generated machine, as the home page describes it. */
export function readHomeMachines(outRoot: string, included?: Set<string>): HomeMachine[] {
  const machines: HomeMachine[] = [];
  for (const output of generatedGameOutputs(outRoot)) {
    if (included && !included.has(output.game)) continue;
    let meta: MetaShape;
    try {
      meta = JSON.parse(readFileSync(join(output.dir, 'meta.json'), 'utf8')) as MetaShape;
    } catch {
      continue; // a half-generated directory must not break the front page
    }
    const kind: HomeKind = meta.kind === 'console' || meta.kind === 'computer' ? meta.kind : 'arcade';
    machines.push({
      game: output.game,
      title: homeTitle({ ...meta, game: output.game }),
      year: String(meta.year ?? ''),
      manufacturer: String(meta.manufacturer ?? ''),
      kind,
      cover: existsSync(join(outRoot, 'artwork', 'covers', `${output.game}.webp`)),
      cabinet: existsSync(join(outRoot, 'artwork', 'media', 'cabinets', `${output.game}.webp`)),
      photo: existsSync(join(outRoot, 'artwork', 'media', 'consoles', `${output.game}.webp`)),
    });
  }
  return machines.sort((a, b) => a.year.localeCompare(b.year) || a.game.localeCompare(b.game));
}

/**
 * Up to `count` flyers spread evenly across the years, so the strip reads as
 * a timeline rather than the alphabet.
 */
export function featuredCovers(machines: HomeMachine[], count = 12): HomeMachine[] {
  return spread(machines.filter(machine => machine.cover), count);
}

/** Up to `count` of a year-sorted list, evenly spaced from first to last. */
export function spread<T>(items: T[], count: number): T[] {
  if (items.length <= count) return items;
  const picked: T[] = [];
  for (let i = 0; i < count; i++) {
    picked.push(items[Math.floor(i * (items.length - 1) / (count - 1))]!);
  }
  return picked;
}

/** A DOM key code as a keycap reads it. */
export function keycap(code: string): string {
  const named: Record<string, string> = {
    ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓',
    Space: 'Space', Enter: 'Enter', ShiftRight: 'Shift', ShiftLeft: 'Shift',
  };
  return named[code] ?? code.replace(/^(Key|Digit)/, '');
}

const KIND_LABEL: Record<HomeKind, [string, string]> = {
  arcade: ['arcade machine', 'arcade machines'],
  console: ['console', 'consoles'],
  computer: ['computer', 'computers'],
};

function plural(n: number, [one, many]: [string, string]): string {
  return `${n} ${n === 1 ? one : many}`;
}

const STYLE = `<style>
:root{--night:#080a17;--panel:#121732;--line:#2b3467;--gold:#f2c200;--ink:#eef0ff;--muted:#929bd0;--dim:#5f689c}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;min-height:100vh;background:radial-gradient(circle at 70% 0,#20285a 0,var(--night) 42%);color:var(--ink);font:15px/1.55 ui-sans-serif,system-ui,sans-serif}
a{color:inherit}.wrap{max-width:1180px;margin:auto;padding:28px 24px 80px}
nav{display:flex;gap:22px;align-items:center;color:var(--muted);font-size:13px;font-weight:700;letter-spacing:.04em}
nav a{text-decoration:none}nav a:hover{color:var(--gold)}nav strong{color:var(--gold);margin-right:auto;font:800 17px/1 ui-monospace,monospace;letter-spacing:.12em;text-shadow:0 0 14px rgba(242,194,0,.45)}
.hero{padding:76px 0 40px;display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:40px;align-items:center}
.eyebrow{color:var(--gold);font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:800}
h1{font-size:clamp(40px,6.6vw,74px);line-height:.98;margin:12px 0 18px;letter-spacing:-.01em}
h1 em{font-style:normal;color:var(--gold)}
.dek{max-width:560px;color:var(--muted);font-size:18px;margin:0 0 26px}
.cta{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-block;padding:13px 22px;border-radius:999px;text-decoration:none;font-weight:800;font-size:13px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--line);transition:.16s transform,.16s border-color,.16s background}
.btn:hover{transform:translateY(-2px);border-color:var(--gold)}
.btn.gold{background:var(--gold);color:#1b1b1b;border-color:var(--gold);box-shadow:0 8px 30px rgba(242,194,0,.25)}
.stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.stat{background:rgba(18,23,50,.88);border:1px solid var(--line);border-radius:16px;padding:18px 20px}
.stat b{display:block;font:800 34px/1 ui-monospace,monospace;color:var(--gold)}
.stat span{color:var(--muted);font-size:13px}
.strip{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(150px,1fr);gap:14px;overflow-x:auto;padding:8px 0 18px;margin:20px -24px 0;padding-inline:24px;scroll-snap-type:x proximity}
.strip a{scroll-snap-align:start;text-decoration:none;color:var(--muted);font-size:12px}
.strip img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:10px;border:1px solid var(--line);background:var(--panel);transition:.16s transform,.16s border-color}
.strip a:hover img{transform:translateY(-4px);border-color:var(--gold)}
.strip small{display:block;margin-top:8px;color:var(--ink);font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rooms{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.room{display:flex;flex-direction:column;gap:12px;text-decoration:none;background:rgba(18,23,50,.88);border:1px solid var(--line);border-radius:18px;padding:22px;transition:.16s transform,.16s border-color}
.room:hover{transform:translateY(-3px);border-color:var(--gold)}
.room h3{margin:0;font-size:22px;color:var(--gold)}.room .count{font:800 13px ui-monospace,monospace;color:var(--muted);letter-spacing:.06em;text-transform:uppercase}
.room p{margin:0;color:var(--muted);font-size:14px}
.room .go{margin-top:auto;color:var(--ink);font-weight:800;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.shelf{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;align-items:end;min-height:0}
.shelf img{width:100%;height:auto;aspect-ratio:3/4;object-fit:contain;object-position:bottom;display:block;filter:drop-shadow(0 8px 14px rgba(0,0,0,.5))}
.shelf.photos{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.shelf.photos img{aspect-ratio:3/2}
.names{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:6px}
.names li{font-size:12px;color:var(--ink);background:#1b2148;border:1px solid #3b4680;border-radius:999px;padding:3px 9px}
section{margin-top:76px}
h2{font-size:clamp(26px,3.4vw,38px);margin:8px 0 10px;line-height:1.1}
.lede{max-width:720px;color:var(--muted);font-size:17px;margin:0 0 28px}
.pipe{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;counter-reset:step}
.step{background:rgba(18,23,50,.88);border:1px solid var(--line);border-radius:14px;padding:18px 16px 16px;position:relative}
.step::before{counter-increment:step;content:counter(step,decimal-leading-zero);font:800 12px ui-monospace,monospace;color:var(--dim);letter-spacing:.1em}
.step strong{display:block;color:var(--gold);margin:8px 0 6px;font-size:15px}
.step span{color:var(--muted);font-size:13px;line-height:1.45;display:block}
.tenets{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:14px;padding:0;list-style:none}
.tenets li{border-top:2px solid var(--line);padding-top:10px;font-size:13px;color:var(--muted)}
.tenets b{display:block;color:var(--ink);font-size:14px;margin-bottom:3px}
.pads{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.pad{background:rgba(18,23,50,.88);border:1px solid var(--line);border-radius:18px;padding:24px;display:flex;flex-direction:column;gap:14px}
.pad h3{margin:0;font-size:20px;color:var(--gold)}.pad h3 small{display:block;color:var(--muted);font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
.pad p{margin:0;color:var(--muted);font-size:14px}
.legend{margin:0;font-size:12px;color:var(--muted)}.legend .gold{color:var(--gold)}.legend .green{color:#3ccf6a}
.art{width:100%;height:auto;display:block}
.partner{display:flex;gap:12px;align-items:center;border:1px solid rgba(242,194,0,.55);background:linear-gradient(90deg,rgba(242,194,0,.12),rgba(242,194,0,.03));border-radius:12px;padding:10px 14px}
.partner .mark{font-size:22px;line-height:1}.partner b{display:block;color:var(--gold);font-size:14px}.partner em{display:block;font-style:normal;color:var(--muted);font-size:12px;margin-top:2px}
.note{font-size:12px;color:var(--dim);margin:0}
footer{margin-top:80px;border-top:1px solid var(--line);padding-top:24px;color:var(--muted);font-size:13px;display:flex;gap:18px;flex-wrap:wrap;align-items:center}
footer a{text-decoration:none}footer a:hover{color:var(--gold)}footer .rev{margin-left:auto;font:12px ui-monospace,monospace;color:var(--dim)}
@media(max-width:900px){.hero{grid-template-columns:1fr;padding-top:48px}.pipe,.tenets{grid-template-columns:repeat(2,minmax(0,1fr))}.rooms{grid-template-columns:1fr}}
@media(max-width:640px){.pads{grid-template-columns:1fr}.pipe,.tenets{grid-template-columns:1fr}nav{gap:14px;flex-wrap:wrap}nav strong{width:100%;margin-bottom:6px}.wrap{padding-inline:18px}.strip{margin-inline:-18px;padding-inline:18px}}
</style>`;

/**
 * A fight-box panel with the roles the standard mapping gives each button,
 * plus the trackball and spinner a cabinet-style stick carries, which reach
 * the browser as a mouse.
 */
function fightBoxSvg(top: string[], bottom: string[], small: [string, string]): string {
  const font = 'ui-sans-serif,system-ui';
  const button = (cx: number, cy: number, r: number, label: string, sub = '', dim = false): string =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${dim ? '#141a3c' : '#1b2148'}" stroke="${dim ? '#2b3467' : '#f2c200'}" stroke-width="2"/>` +
    (label ? `<text x="${cx}" y="${cy + (sub ? 2 : 5)}" text-anchor="middle" font-size="13" font-weight="800" fill="#eef0ff" font-family="${font}">${escapeHtml(label)}</text>` : '') +
    (sub ? `<text x="${cx}" y="${cy + 15}" text-anchor="middle" font-size="9" fill="#929bd0" font-family="ui-monospace,monospace">${escapeHtml(sub)}</text>` : '');
  const caption = (x: number, y: number, text: string, sub = ''): string =>
    `<text x="${x}" y="${y}" text-anchor="middle" font-size="10" font-weight="800" letter-spacing=".08em" fill="#eef0ff" font-family="${font}">${escapeHtml(text)}</text>` +
    (sub ? `<text x="${x}" y="${y + 12}" text-anchor="middle" font-size="9" fill="#929bd0" font-family="ui-monospace,monospace">${escapeHtml(sub)}</text>` : '');
  const parts: string[] = [];
  parts.push('<rect x="1" y="1" width="578" height="238" rx="18" fill="#0d1129" stroke="#2b3467" stroke-width="2"/>');
  // the two small buttons on the top edge: the first is start, the second the coin slot
  parts.push(button(40, 30, 10, ''), button(76, 30, 10, ''));
  parts.push(caption(40, 56, small[0]), caption(76, 56, small[1]));
  // the trackball, left of the stick: a mouse to the browser
  parts.push('<circle cx="62" cy="150" r="38" fill="#141a3c" stroke="#3ccf6a" stroke-width="2"/>');
  parts.push('<circle cx="62" cy="150" r="30" fill="url(#ball)"/>');
  parts.push('<ellipse cx="50" cy="136" rx="10" ry="6" fill="rgba(255,255,255,.35)"/>');
  parts.push(caption(62, 212, 'TRACKBALL', 'mouse'));
  // directions: three in a row plus the thumb
  parts.push(button(152, 132, 21, '←', 'left'));
  parts.push(button(202, 116, 21, '↓', 'down'));
  parts.push(button(252, 132, 21, '→', 'right'));
  parts.push(button(226, 194, 23, '↑', 'up'));
  // the two action rows, arched like a real panel; a column past the mapped six stays dim
  const rowX = [318, 370, 422, 474];
  const arch = [0, 16, 22, 12];
  [top, bottom].forEach((row, r) => {
    rowX.forEach((x, i) => {
      const [label, sub] = row[i]?.split('|') ?? ['', ''];
      parts.push(button(x, (r ? 168 : 110) - arch[i]!, 23, label ?? '', sub ?? '', !label));
    });
  });
  // the spinner, top right: a knob with a pointer, also a mouse axis
  parts.push('<circle cx="540" cy="112" r="22" fill="#141a3c" stroke="#3ccf6a" stroke-width="2"/>');
  parts.push('<circle cx="540" cy="112" r="14" fill="#1b2148" stroke="#3ccf6a" stroke-width="1.5"/>');
  parts.push('<line x1="540" y1="112" x2="550" y2="101" stroke="#eef0ff" stroke-width="2.5" stroke-linecap="round"/>');
  parts.push(caption(540, 150, 'SPINNER', 'mouse'));
  const defs = '<defs><radialGradient id="ball" cx="40%" cy="35%" r="65%"><stop offset="0" stop-color="#4f5c9e"/><stop offset="1" stop-color="#0b0e22"/></radialGradient></defs>';
  return `<svg class="art" viewBox="0 0 580 240" role="img" aria-label="Fight box layout with trackball and spinner">${defs}${parts.join('')}</svg>`;
}

/** What a key does: its role on every cabinet, and its role on a six-button fighter. */
interface KeyRole { arcade?: string; fighter?: string }

/**
 * The keyboard, drawn, with every bound key lit and captioned. The rows are
 * a compact ANSI layout; which keys light up comes from the generator's
 * tables, never from this drawing.
 */
function keyboardSvg(roles: Map<string, KeyRole>): string {
  const font = 'ui-sans-serif,system-ui';
  const mono = 'ui-monospace,monospace';
  const size = 34, gap = 4, step = size + gap;
  type Key = { code: string; label: string; x: number; y: number; w?: number };
  const keys: Key[] = [];
  const row = (y: number, offset: number, codes: [string, string][]): void => {
    codes.forEach(([code, label], i) => keys.push({ code, label, x: offset + i * step, y }));
  };
  const letters = (text: string): [string, string][] => [...text].map(ch => [`Key${ch}`, ch]);
  row(0, 0, [...'1234567890'].map(ch => [`Digit${ch}`, ch] as [string, string]));
  row(step, 18, letters('QWERTYUIOP'));
  row(step * 2, 28, letters('ASDFGHJKL'));
  row(step * 3, 46, letters('ZXCVBNM'));
  keys.push({ code: 'Space', label: 'Space', x: 46 + step * 1.5, y: step * 4, w: step * 4 - gap });
  const ax = 10 * step + 30;
  keys.push({ code: 'ArrowUp', label: '↑', x: ax + step, y: step * 3 });
  keys.push({ code: 'ArrowLeft', label: '←', x: ax, y: step * 4 });
  keys.push({ code: 'ArrowDown', label: '↓', x: ax + step, y: step * 4 });
  keys.push({ code: 'ArrowRight', label: '→', x: ax + step * 2, y: step * 4 });
  const width = ax + step * 3;
  const height = step * 5;
  const parts = keys.map(key => {
    const role = roles.get(key.code);
    const w = key.w ?? size;
    const lit = role?.arcade ? '#f2c200' : role?.fighter ? '#3ccf6a' : '#3b4680';
    const fill = role ? '#1f2757' : '#141a3c';
    const captions: string[] = [];
    if (role?.arcade) captions.push(`<text x="${key.x + w / 2}" y="${key.y + 22}" text-anchor="middle" font-size="7" font-weight="800" fill="#f2c200" font-family="${mono}">${escapeHtml(role.arcade)}</text>`);
    if (role?.fighter) captions.push(`<text x="${key.x + w / 2}" y="${key.y + 30}" text-anchor="middle" font-size="7" font-weight="800" fill="#3ccf6a" font-family="${mono}">${escapeHtml(role.fighter)}</text>`);
    return `<rect x="${key.x}" y="${key.y}" width="${w}" height="${size}" rx="5" fill="${fill}" stroke="${lit}" stroke-width="${role ? 2 : 1}"/>` +
      `<text x="${key.x + 5}" y="${key.y + 12}" font-size="${key.label.length > 1 ? 8 : 10}" font-weight="700" fill="${role ? '#eef0ff' : '#5f689c'}" font-family="${font}">${escapeHtml(key.label)}</text>` +
      captions.join('');
  });
  return `<svg class="art" viewBox="-2 -2 ${width + 4} ${height + 4}" role="img" aria-label="Keyboard">${parts.join('')}</svg>`;
}

/** A home computer's slab keyboard, drawn: the tree ships photos of consoles, not computers. */
function computerSvg(): string {
  const keys: string[] = [];
  const rows = [12, 12, 11, 10];
  rows.forEach((count, r) => {
    const y = 48 + r * 17;
    const x0 = 22 + r * 6;
    for (let i = 0; i < count; i++) keys.push(`<rect x="${x0 + i * 17}" y="${y}" width="14" height="13" rx="2" fill="#2a2f57" stroke="#3b4680"/>`);
  });
  keys.push('<rect x="58" y="116" width="120" height="13" rx="2" fill="#2a2f57" stroke="#3b4680"/>');
  return '<svg class="art" viewBox="0 0 240 150" role="img" aria-label="Home computer">' +
    '<rect x="6" y="30" width="228" height="112" rx="10" fill="#c9bfa5"/>' +
    '<rect x="6" y="30" width="228" height="12" rx="6" fill="#ddd3b8"/>' +
    '<rect x="14" y="44" width="212" height="94" rx="6" fill="#1b1e3a"/>' +
    keys.join('') + '</svg>';
}

const ROOM: Record<HomeKind, { title: string; href: string; blurb: string; go: string }> = {
  arcade: {
    title: 'Arcade', href: 'app/',
    blurb: 'The coin-op boards, with their flyers, bezels and marquees. Drop a ROM set and the cabinet lights up.',
    go: 'Walk the arcade',
  },
  console: {
    title: 'Consoles', href: 'app/?tab=consoles',
    blurb: 'Living-room hardware with a cartridge shelf per machine. Pick a cart and boot it, no dump wrangling.',
    go: 'Open the console room',
  },
  computer: {
    title: 'Computers', href: 'app/?tab=computers',
    blurb: 'Home computers with a software shelf per list: tapes, disks and carts, and a keyboard you type on directly.',
    go: 'Open the software room',
  },
};

function roomCard(kind: HomeKind, machines: HomeMachine[]): string {
  const room = ROOM[kind];
  const years = machines.map(machine => machine.year).filter(year => /^\d{4}$/.test(year));
  const span = years.length ? `${years[0]}–${years[years.length - 1]}` : '';
  let art = '';
  if (kind === 'arcade') {
    const cabinets = spread(machines.filter(machine => machine.cabinet), 4);
    art = cabinets.length ? `<div class="shelf">${cabinets.map(machine =>
      `<img src="artwork/media/cabinets/${encodeURIComponent(machine.game)}.webp" alt="${escapeHtml(machine.title)} cabinet" loading="lazy" width="300" height="400">`).join('')}</div>` : '';
  } else if (kind === 'console') {
    const photos = spread(machines.filter(machine => machine.photo), 4);
    art = photos.length ? `<div class="shelf photos">${photos.map(machine =>
      `<img src="artwork/media/consoles/${encodeURIComponent(machine.game)}.webp" alt="${escapeHtml(machine.title)}" loading="lazy" width="400" height="300">`).join('')}</div>` : '';
  } else {
    art = computerSvg();
  }
  // Names, deduplicated: NTSC and PAL of one machine are one name here.
  const names = [...new Set(machines.map(machine => machine.title))];
  const shown = spread(names, 6);
  const list = `<ul class="names">${shown.map(name => `<li>${escapeHtml(name)}</li>`).join('')}` +
    `${names.length > shown.length ? `<li>+${names.length - shown.length} more</li>` : ''}</ul>`;
  return `<a class="room" href="${room.href}"><span class="count">${escapeHtml(plural(machines.length, KIND_LABEL[kind]))}${span ? ` · ${escapeHtml(span)}` : ''}</span>` +
    `<h3>${escapeHtml(room.title)}</h3>${art}<p>${escapeHtml(room.blurb)}</p>${list}<span class="go">${escapeHtml(room.go)} →</span></a>`;
}

export function homePageHtml(data: HomeData): string {
  const { machines } = data;
  const counts: Record<HomeKind, number> = { arcade: 0, console: 0, computer: 0 };
  for (const machine of machines) counts[machine.kind]++;
  const years = machines.map(machine => machine.year).filter(year => /^\d{4}$/.test(year)).sort();
  const span = years.length ? `${years[0]}–${years[years.length - 1]}` : '';
  // How long ago the oldest machine shipped, as of this build: the one
  // number on the page that grows on its own.
  const vintage = years.length ? (data.now ?? new Date()).getFullYear() - Number(years[0]) : 0;
  const kinds = (Object.keys(counts) as HomeKind[]).filter(kind => counts[kind] > 0);
  const summary = kinds.map(kind => plural(counts[kind], KIND_LABEL[kind])).join(' · ');

  const strip = featuredCovers(machines).map(machine =>
    `<a href="app/g/${encodeURIComponent(machine.game)}/" title="${escapeHtml(machine.title)}">` +
    `<img src="artwork/covers/${encodeURIComponent(machine.game)}.webp" alt="${escapeHtml(machine.title)} flyer" loading="lazy" width="300" height="400">` +
    `<small>${escapeHtml(machine.title)}</small>${escapeHtml([machine.manufacturer, machine.year].filter(Boolean).join(' · '))}</a>`).join('');

  // Every cabinet's keys, from the shared table, and the six-button fighter
  // rows from theirs, laid onto one drawn keyboard.
  const roles = new Map<string, KeyRole>();
  const role = (code: string, patch: KeyRole): void => { roles.set(code, { ...roles.get(code), ...patch }); };
  const arcadeRoles: [string, string][] = [
    ['IPT_JOYSTICK_LEFT', 'MOVE'], ['IPT_JOYSTICK_RIGHT', 'MOVE'], ['IPT_JOYSTICK_UP', 'MOVE'], ['IPT_JOYSTICK_DOWN', 'MOVE'],
    ['IPT_BUTTON1', 'FIRE'], ['IPT_BUTTON2', 'FIRE 2'], ['IPT_BUTTON3', 'FIRE 3'],
    ['IPT_START1', 'START'], ['IPT_COIN1', 'COIN'],
  ];
  for (const [type, caption] of arcadeRoles) for (const code of data.keyFor(type) ?? []) role(code, { arcade: caption });
  const fighterRoles: [string, string][] = [
    ['IPT_BUTTON1', 'LP'], ['IPT_BUTTON2', 'MP'], ['IPT_BUTTON3', 'HP'],
    ['IPT_BUTTON4', 'LK'], ['IPT_BUTTON5', 'MK'], ['IPT_BUTTON6', 'HK'],
  ];
  const fighter = Boolean(data.fighterKeyFor);
  if (data.fighterKeyFor) {
    // one key per button: the first of each; Space's alias stays as the shared fire
    for (const [type, caption] of fighterRoles) {
      const code = data.fighterKeyFor(type)?.[0];
      if (code) role(code, { fighter: caption });
    }
  }
  const keyboard = keyboardSvg(roles);

  const pad = (type: string): string => standardPadButton(type) ?? '';
  // The fighting-game shorthand: light, medium and heavy punch on the top
  // row, the kicks below, each over the pad button that drives it.
  const art = fightBoxSvg(
    [`LP|${pad('IPT_BUTTON1')}`, `MP|${pad('IPT_BUTTON2')}`, `HP|${pad('IPT_BUTTON3')}`],
    [`LK|${pad('IPT_BUTTON4')}`, `MK|${pad('IPT_BUTTON5')}`, `HK|${pad('IPT_BUTTON6')}`],
    ['START', 'COIN'],
  );

  const revision = data.mameRevision ? data.mameRevision.slice(0, 10) : '';
  const nav = '<strong>MAME HISTORY</strong><a href="app/">Play</a><a href="#rooms">Rooms</a><a href="app/browse/">Archive</a>' +
    '<a href="#controllers">Controllers</a><a href="#mamekit">How it works</a>' +
    '<a href="https://github.com/benbruscella/mamekit" rel="noopener" target="_blank">GitHub</a>';

  const body = `
<div class="hero">
  <div>
    <div class="eyebrow">${escapeHtml(summary)}${span ? ` · ${escapeHtml(span)}` : ''}</div>
    <h1>Retro gaming, <em>transpiled.</em></h1>
    <p class="dek">MAME History runs the classics in your browser, compiled straight from MAME's own source. No plugins, no native build, nothing to install. Bring a ROM, insert a coin.</p>
    <div class="cta"><a class="btn gold" href="app/">Insert coin</a><a class="btn" href="app/browse/">Browse the archive</a></div>
  </div>
  <div class="stats">
    ${kinds.map(kind => `<div class="stat"><b>${counts[kind]}</b><span>${escapeHtml(KIND_LABEL[kind][counts[kind] === 1 ? 0 : 1])}</span></div>`).join('')}
    <div class="stat"><b>${escapeHtml(span || '—')}</b><span>years covered</span></div>
    <div class="stat"><b>0</b><span>ROMs bundled. Yours stay on your machine.</span></div>
    ${vintage ? `<div class="stat"><b>${vintage}</b><span>years of nostalgia. Free with every coin.</span></div>` : ''}
  </div>
</div>
${strip ? `<div class="strip">${strip}</div>` : ''}

<section id="rooms">
  <div class="eyebrow">${kinds.length === 1 ? 'One room' : `${['', '', 'Two', 'Three'][kinds.length] ?? kinds.length} rooms`}</div>
  <h2>${escapeHtml(kinds.map(kind => ROOM[kind].title).join(', ').replace(/, ([^,]*)$/, ' and $1'))}.</h2>
  <p class="lede">The same compiler, three kinds of machine. Each room is a shelf you walk up to: arcade boards take a ROM set, consoles and computers take the software their real hardware took.</p>
  <div class="rooms">${kinds.map(kind => roomCard(kind, machines.filter(machine => machine.kind === kind))).join('')}</div>
</section>

<section id="controllers">
  <div class="eyebrow">Controllers</div>
  <h2>Keyboard, or the real thing.</h2>
  <p class="lede">Every machine takes the keyboard out of the box. Plug in a USB pad or fight stick and it takes that too, with the controls legend on the game naming whichever you are holding.</p>
  <div class="pads">
    <div class="pad">
      <h3><small>Always on</small>Keyboard</h3>
      <p>The same keys on every cabinet; the game's own legend shows any title that differs.</p>
      ${keyboard}
      <p class="legend"><span class="gold">■</span> every cabinet${fighter ? ' &nbsp; <span class="green">■</span> six-button fighters: punches on the home row, kicks below' : ''}</p>
      <p class="note">Control is never bound: macOS takes Ctrl+Arrow for itself.</p>
    </div>
    <div class="pad">
      <h3><small>Plug and play</small>Gamepad, fight stick, spinner &amp; trackball</h3>
      <div class="partner"><span class="mark">🕹</span><span><b>Works with the FightBox R10-Pro</b><em>Unofficial. We build and test on one; FightBox is not affiliated with MAME History.</em></span></div>
      <p>Any pad the browser recognises as a Standard Gamepad works: the top row is the punches (light, medium, heavy), the bottom row the kicks, the first small button starts and the second inserts a coin. A second pad is player two. The spinner and trackball reach the browser as a mouse, and every dial and trackball machine takes them at MAME's own sensitivity, smoothed across the frame the way MAME does it.</p>
      ${art}
      <p class="note">Press any button after the game opens: browsers keep a pad hidden until it is touched. Games with fewer buttons fold the bottom row onto the top. On a spinner or trackball game, click the screen to capture the pointer so the cursor stays put; Esc lets go.</p>
    </div>
  </div>
</section>

<section id="mamekit">
  <div class="eyebrow">How it works</div>
  <h2>Built by MAMEKIT, a compiler for MAME source.</h2>
  <p class="lede">MAMEKIT treats MAME's source as an archival technical record. It reads a driver, keeps every fact tied to the line it came from, and generates a self-contained web app. No hand-written chip ports, no Emscripten build of MAME.</p>
  <div class="pipe">
    <div class="step"><strong>MAME source</strong><span>C++ drivers plus the macro and opcode DSLs, read as they are.</span></div>
    <div class="step"><strong>Source-preserving AST</strong><span>MAME-specific parsing that never loses where a fact came from.</span></div>
    <div class="step"><strong>Knowledge graph</strong><span>Machines, chips, ports, screens and sound, each with provenance.</span></div>
    <div class="step"><strong>Typed IR</strong><span>Machine, handler, CPU, device, video and audio lowered to typed intermediate forms.</span></div>
    <div class="step"><strong>Generated web app</strong><span>JSON for data, JavaScript for behaviour, hosted by a generic browser runtime.</span></div>
  </div>
  <ul class="tenets">
    <li><b>MAME-specific</b>Not a general C++ transpiler.</li>
    <li><b>Source-derived</b>Not a shelf of handwritten TypeScript chips.</li>
    <li><b>Inspectable</b>Every machine ships its dossier and its graph.</li>
    <li><b>Selective</b>Verified machines, not a universal claim.</li>
    <li><b>ROM-free</b>You supply legally obtained dumps.</li>
  </ul>
</section>

<footer>
  <span>MAME History is open source.</span>
  <a href="https://github.com/benbruscella/mamekit" rel="noopener" target="_blank">github.com/benbruscella/mamekit</a>
  <a href="app/browse/">Archive</a>
  ${revision ? `<span class="rev">compiled from MAME ${escapeHtml(revision)}</span>` : ''}
</footer>`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>MAME History — retro gaming, transpiled</title>` +
    `<meta name="description" content="${escapeHtml(`Classic arcade machines, consoles and computers running in the browser, compiled from MAME source by MAMEKIT. ${summary}.`)}">` +
    `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='13' font-size='13'>👾</text></svg>">` +
    `${STYLE}</head><body><div class="wrap"><nav>${nav}</nav>${body}</div></body></html>\n`;
}

/** Write dist/index.html from the generated tree. */
export function emitHomePage(
  outRoot: string,
  options: { keyFor: HomeData['keyFor']; fighterKeyFor?: HomeData['fighterKeyFor']; mameRevision?: string; included?: Set<string> },
): { machines: number; covers: number } {
  const machines = readHomeMachines(outRoot, options.included);
  writeFileSync(join(outRoot, 'index.html'), homePageHtml({
    machines,
    mameRevision: options.mameRevision,
    keyFor: options.keyFor,
    fighterKeyFor: options.fighterKeyFor,
  }));
  return { machines: machines.length, covers: machines.filter(machine => machine.cover).length };
}
