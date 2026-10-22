// Mouse -> the generated light-gun fields.
//
// A light gun is aimed, not steered: MAME's IPT_LIGHTGUN_X/Y hold where the
// gun points across the visible screen, PORT_MINMAX end to end. The pointer's
// position over the screen is that point, and its primary button is the
// trigger -- the button field on the same controller as the axes (the NES
// Zapper's `GUN_T`). Nothing here knows a gun: which fields are axes and which
// is the trigger comes from the generated bindings' `lightgun` facts and the
// card they belong to.

import type { FieldBinding, KeyboardInput } from './input.ts';

export class LightgunInput {
  private readonly x: FieldBinding[];
  private readonly y: FieldBinding[];
  private readonly triggers: FieldBinding[];
  private readonly input: KeyboardInput;

  constructor(input: KeyboardInput, bindings: readonly FieldBinding[]) {
    this.input = input;
    this.x = bindings.filter(binding => binding.lightgun?.axis === 'x');
    this.y = bindings.filter(binding => binding.lightgun?.axis === 'y');
    const guns = new Set([...this.x, ...this.y].map(binding => binding.card ?? binding.port.split(':')[0]));
    this.triggers = bindings.filter(binding =>
      /^IPT_BUTTON\d+$/.test(binding.type ?? '') &&
      guns.has(binding.card ?? binding.port.split(':')[0]) &&
      !binding.lightgun);
  }

  /** Whether this machine has a light gun the pointer can aim. */
  get active(): boolean { return this.x.length > 0 && this.y.length > 0; }

  /** The bindings the mouse reaches, for the legend. */
  bindings(): FieldBinding[] { return [...this.x, ...this.y, ...this.triggers]; }

  /** Aim at a point given as fractions of the screen, 0 to 1 across each axis. */
  aimAt(fx: number, fy: number): void {
    for (const binding of this.x) this.input.aim(binding, fx);
    for (const binding of this.y) this.input.aim(binding, fy);
  }

  /** The trigger, pressed or let go. */
  fire(down: boolean): void {
    for (const binding of this.triggers) this.input.press(binding, down, 'lightgun');
  }

  /** Aim with the pointer over the screen and fire with its primary button. */
  attach(screen: HTMLElement): void {
    if (!this.active) return;
    screen.style.cursor = 'crosshair';
    const aim = (event: PointerEvent): void => {
      const box = screen.getBoundingClientRect();
      if (!box.width || !box.height) return;
      this.aimAt((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height);
    };
    screen.addEventListener('pointermove', aim);
    screen.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      aim(event);
      this.fire(true);
    });
    screen.addEventListener('pointerup', event => { if (event.button === 0) this.fire(false); });
    screen.addEventListener('pointerleave', () => this.fire(false));
  }
}
