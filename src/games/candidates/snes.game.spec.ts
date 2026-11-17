import { snes } from './snes.game.ts';
import { gameSourceGraph } from '../test-support.ts';

gameSourceGraph(snes.target);
console.log('snes.game.spec: source machine graph passed');
