import assert from 'node:assert/strict';

// A DOM small enough to paint a button in.
function fakeElement(tag: string) {
  const element = {
    tag,
    children: [] as unknown[],
    style: { cssText: '' },
    attrs: {} as Record<string, string>,
    dataset: {} as Record<string, string>,
    textContent: '',
    title: '',
    type: '',
    disabled: false,
    setAttribute(name: string, value: string) { element.attrs[name] = value; },
    appendChild(child: unknown) { element.children.push(child); },
  };
  return element;
}
(globalThis as { document?: unknown }).document = { createElement: fakeElement };

const { DECK_GOLD, deckButton, deckPanel, paintTitleButton, setDeckButtonState, titleButton, toolbarDivider } =
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
  assert.match(quiet, /background:transparent/, 'a quiet control does not carry a filled body');
  assert.match(danger, /background:transparent/);
}

// --- active means "the thing this controls is on" --------------------------
{
  const toggle = titleButton('2 player', 'Two player game', 'Play with somebody else') as Painted;
  paintTitleButton(toggle, true);
  assert.ok(toggle.style.cssText.includes(DECK_GOLD), 'an active control wears the room accent');
  paintTitleButton(toggle, false);
  assert.ok(!toggle.style.cssText.includes(DECK_GOLD));
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
