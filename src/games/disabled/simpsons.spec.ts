import { simpsons } from './simpsons.ts';
import { gameSourceGraph } from '../test-support.ts';

gameSourceGraph(simpsons);
console.log('simpsons.spec: source machine graph passed');
