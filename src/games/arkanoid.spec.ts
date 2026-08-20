import { arkanoid } from './arkanoid.ts';
import { gameSourceGraph } from './test-support.ts';

gameSourceGraph(arkanoid);
console.log('arkanoid.spec: source machine graph passed');
