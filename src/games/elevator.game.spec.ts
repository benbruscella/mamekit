import { elevator } from './elevator.game.ts';
import { gameSourceGraph } from './test-support.ts';

gameSourceGraph(elevator);
console.log('elevator.spec: source machine graph passed');
