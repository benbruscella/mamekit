import assert from 'node:assert/strict';
import { monomorphizeFunctionTemplate } from './function-template.ts';

const source = `template <unsigned BPP, bool XFLIP>
void dma_draw(u32 pixel) { if (XFLIP) pixel >>= BPP; }`;
const [result] = monomorphizeFunctionTemplate(source, [{
  id: 'dma_draw<8,true>',
  arguments: { BPP: 8, XFLIP: true },
}]);
assert.deepEqual(result?.constants, { BPP: 8, XFLIP: 1 });
assert.match(result?.source ?? '', /if \(1\) pixel >>= 8/);
assert.doesNotMatch(result?.source ?? '', /template/);
assert.throws(() => monomorphizeFunctionTemplate(source, [{
  id: 'missing', arguments: { BPP: 4 },
}]), /missing template arguments XFLIP/);

console.log('function-template.spec: non-type monomorphization passed');
