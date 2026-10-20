import { spec128 } from './spec128.game.ts';
import { gameSourceGraph } from '../test-support.ts';

gameSourceGraph(spec128.target);
console.log('spec128.game.spec: source machine graph passed');
