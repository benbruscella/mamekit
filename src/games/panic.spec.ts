import { panic } from './panic.ts';
import { gameSourceGraph } from './test-support.ts';

gameSourceGraph(panic);
console.log('panic.spec: source machine graph passed');
