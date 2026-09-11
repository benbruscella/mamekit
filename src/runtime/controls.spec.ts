import assert from 'node:assert/strict';

// A DOM small enough to paint a button in, with the two behaviours these
// helpers actually lean on: `textContent` reads through to the children, and
// a button can be asked for the element holding its word.
interface FakeElement {
  tag: string;
  children: FakeElement[];
  style: { cssText: string };
  attrs: Record<string, string>;
  dataset: Record<string, string>;
  textContent: string;
  innerHTML: string;
  title: string;
  type: string;
  disabled: boolean;
  setAttribute(name: string, value: string): void;
  append(...items: FakeElement[]): void;
  appendChild(item: FakeElement): void;
  querySelector(selector: string): FakeElement | null;
}

function fakeElement(tag: string): FakeElement {
  let own = '';
  const element = {
    tag,
    children: [] as FakeElement[],
    style: { cssText: '' },
    attrs: {} as Record<string, string>,
    dataset: {} as Record<string, string>,
    innerHTML: '',
    title: '',
    type: '',
    disabled: false,
    get textContent(): string {
      return own + element.children.map(child => child.textContent).join('');
    },
    set textContent(value: string) { own = value; element.children.length = 0; },
    setAttribute(name: string, value: string) { element.attrs[name] = value; },
    append(...items: FakeElement[]) { element.children.push(...items); },
    appendChild(item: FakeElement) { element.children.push(item); },
    querySelector(selector: string): FakeElement | null {
      const key = selector.replace(/^\[data-|\]$/g, '');
      for (const child of element.children) {
        if (child.dataset[key] !== undefined) return child;
        const found = child.querySelector(selector);
        if (found) return found;
      }
      return null;
    },
  } as FakeElement;
  return element;
}
(globalThis as { document?: unknown }).document = { createElement: fakeElement };

const { DECK_GOLD, deckButton, deckPanel, glyph, paintTitleButton, setDeckButtonState, setTitleButtonText, titleButton, toolbarDivider } =
  await import('./controls.ts');

type Painted = HTMLButtonElement & { style: { cssText: string }; dataset: Record<string, string> };

// --- a title button carries its own name, tooltip and tone ------------------
{
  const button = titleButton('Save', 'Save state', 'Capture the machine as it is now') as Painted;
  assert.equal(button.textContent, 'Save');
  assert.equal((button as unknown as { attrs: Record<string, string> }).attrs['aria-label'], 'Save state');
  assert.equal(button.title, 'Capture the machine as it is now');
  assert.equal(button.type, 'button');
  assert.match(button.style.cssText, /cursor:pointer/);
}

// --- tone survives a repaint -----------------------------------------------
// A caller that disables a button repaints it, and every caller used to have
// to remember to say which tone it was. The element carries it instead.
{
  const danger = titleButton('Clear memory', 'Clear memory', 'Boot cold', 'danger') as Painted;
  assert.equal(danger.dataset.tone, 'danger');
  const before = danger.style.cssText;
  danger.disabled = true;
  paintTitleButton(danger, false);
  assert.notEqual(danger.style.cssText, before, 'a disabled button looks disabled');
  assert.match(danger.style.cssText, /cursor:default/);
  danger.disabled = false;
  paintTitleButton(danger, false);
  assert.equal(danger.style.cssText, before, 'and going back to enabled restores its own tone');
}

// --- the three tones are actually different --------------------------------
{
  const look = (tone: 'normal' | 'quiet' | 'danger'): string =>
    (titleButton('x', 'x', 'x', tone) as Painted).style.cssText;
  const [normal, quiet, danger] = [look('normal'), look('quiet'), look('danger')];
  assert.notEqual(normal, quiet);
  assert.notEqual(quiet, danger);
  assert.notEqual(normal, danger);
  assert.match(normal, /color:#d5dbff/, 'the everyday control is the brightest of the three');
  assert.match(quiet, /color:#9aa3d6/, 'a quiet one steps back');
  assert.match(danger, /color:#d79aac/, 'and one that throws something away is not the same colour as Save');
  for (const look of [normal, quiet, danger]) {
    assert.match(look, /box-shadow:inset 0 1px 0 rgba\(255,255,255,\.07\)/,
      'every button is lit along its top edge, so the panel reads as one surface');
  }
}

// --- active means "the thing this controls is on" --------------------------
{
  const toggle = titleButton('2 player', 'Two player game', 'Play with somebody else') as Painted;
  paintTitleButton(toggle, true);
  assert.ok(toggle.style.cssText.includes(DECK_GOLD), 'an active control wears the room accent');
  paintTitleButton(toggle, false);
  assert.ok(!toggle.style.cssText.includes(DECK_GOLD));
}

// --- a glyph rides along without eating the word ---------------------------
{
  const button = titleButton('Saves', 'Show saves', 'Show or hide the shelf', 'normal', 'shelf') as Painted;
  const parts = button as unknown as { children: { textContent: string; attrs: Record<string, string>; innerHTML: string }[] };
  assert.equal(parts.children.length, 2, 'a marked button is a glyph and a word');
  assert.equal(parts.children[0]!.attrs['aria-hidden'], 'true', 'the glyph is decoration');
  assert.match(parts.children[0]!.innerHTML, /<svg[\s\S]*stroke="currentColor"/,
    'drawn, and coloured by whatever holds it — an emoji is a different picture on every platform');
  assert.equal(button.textContent, 'Saves', 'and the word still reads as the word');

  // The saves button rewrites its own label as saves come and go; it must
  // not take the glyph with it.
  setTitleButtonText(button, '3 saves');
  assert.equal(button.textContent, '3 saves');
  assert.equal(parts.children.length, 2, 'the glyph survived the relabel');
  assert.match((glyph('eject') as unknown as { innerHTML: string }).innerHTML, /viewBox="0 0 24 24"/);
}

// --- deck buttons and panels ------------------------------------------------
{
  const button = deckButton('Load') as Painted;
  assert.equal(button.textContent, 'Load');
  assert.equal(button.dataset.solid, '');
  assert.equal((deckButton('Load', { solid: true }) as Painted).dataset.solid, '1');
  setDeckButtonState(button, true);
  assert.ok(button.style.cssText.includes(DECK_GOLD));
  button.disabled = true;
  setDeckButtonState(button, false);
  assert.match(button.style.cssText, /opacity:\.6/, 'a disabled deck button reads as unavailable');

  const panel = deckPanel('SAVE STATES') as unknown as { children: { textContent: string }[] };
  assert.equal(panel.children.length, 1);
  assert.equal(panel.children[0]!.textContent, 'SAVE STATES', 'a panel announces what it holds');

  const divider = toolbarDivider() as unknown as { attrs: Record<string, string> };
  assert.equal(divider.attrs['aria-hidden'], 'true', 'a hairline is decoration, not content');
}

console.log('controls.spec: the shell\'s one control look — tones, active state, panels and dividers');
