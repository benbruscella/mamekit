import { arkanoid } from './arkanoid.game.ts';
import { gameSourceGraph } from './test-support.ts';

gameSourceGraph(arkanoid);
console.log('arkanoid.spec: source machine graph passed');
