/**
 * A slot's cards share one interface class (the NES's
 * `device_nes_cart_interface`), and compiled separately each card repeats all
 * of its methods: 92 KB of every 108 KB NES card. The slot carries the
 * interface's methods once, and a card refers to each one it has compiled
 * identically by its index there.
 *
 * The method list keeps the card's own compiled order, a reference standing
 * where the method stood, so putting the interface back reproduces the card
 * exactly. A method that differs from the slot's copy -- one card's own
 * `read_m` -- is simply kept in the card.
 */
export interface CardInterface<Method> {
  className: string;
  methods: readonly Method[];
}

/** A card method, or the index of the slot's identical copy of it. */
export type CardMethod<Method> = Method | { shared: number };

/** The card's methods with each one the interface holds identically replaced by its index. */
export function shareCardInterface<Method>(
  methods: readonly Method[],
  cardInterface: CardInterface<Method>,
): { methods: CardMethod<Method>[]; shared: number } {
  const index = new Map(cardInterface.methods.map((method, at) => [JSON.stringify(method), at]));
  let shared = 0;
  return {
    methods: methods.map(method => {
      const at = index.get(JSON.stringify(method));
      if (at === undefined) return method;
      shared++;
      return { shared: at };
    }),
    shared,
  };
}

/** The card's methods as compiled, from its own and the interface's. */
export function inheritCardInterface<Method>(
  methods: readonly CardMethod<Method>[],
  cardInterface: CardInterface<Method>,
): Method[] {
  return methods.map(method => {
    if (method && typeof method === 'object' && 'shared' in method && Object.keys(method).length === 1) {
      const shared = cardInterface.methods[(method as { shared: number }).shared];
      if (!shared) throw new Error(`card refers to ${cardInterface.className} method ${(method as { shared: number }).shared}, which the slot does not carry`);
      return shared;
    }
    return method as Method;
  });
}
