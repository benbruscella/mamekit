import { marble } from './marble.game.ts';
import { gameSourceGraph } from '../test-support.ts';

gameSourceGraph(marble.target);
console.log('marble.game.spec: source machine graph passed');
