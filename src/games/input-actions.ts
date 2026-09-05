import type { GameTestContract } from './types.ts';

/** Planned controls must never be accepted as if they reached the machine. */
export function assertExecutableActions(contract: Pick<GameTestContract, 'game' | 'actions'>): void {
  for (const action of contract.actions) {
    if ('analog' in action || 'signal' in action) {
      const control = 'analog' in action ? `analog control "${action.analog}"` : `machine signal "${action.signal}"`;
      throw new Error(`${contract.game}: ${control} has no generated acceptance binding; ` +
        'implement and verify its machine input path before accepting this scenario');
    }
  }
}
