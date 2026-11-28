import assert from 'node:assert/strict';
import { evalExpr } from '../kg/parse.ts';
import { foldTemplateCallArguments, monomorphizeFunctionTemplate, resolveIfConstexpr } from './function-template.ts';

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

// konami_helper.h's unrolled bubble sort, as konami_sortlayers<3, 1, 2> sees it.
const sortBody = `
	if constexpr (B > (A + 1))
		konami_sortlayers<N, A, B - 1>(cmp, layer, pri);
	else if constexpr (A > 0)
		konami_sortlayers<N, A - 1, N - 1>(cmp, layer, pri);
	if (cmp(pri[A], pri[B]))
	{
		swap(pri[A], pri[B]);
	}`;
const at = (constants: Record<string, number>) => (text: string) => evalExpr(text, constants);
const isSort = (name: string) => name === 'konami_sortlayers';
const kept = (constants: Record<string, number>) =>
  foldTemplateCallArguments(resolveIfConstexpr(sortBody, at(constants)), isSort, at(constants));
// <3,1,2>: B > A + 1 is false, A > 0 is true -- the second branch, folded.
assert.match(kept({ N: 3, A: 1, B: 2 }), /^\s*\{ konami_sortlayers<3, 0, 2>\(cmp, layer, pri\); \}\s*if \(cmp/);
// <3,0,2>: the first branch.
assert.match(kept({ N: 3, A: 0, B: 2 }), /konami_sortlayers<3, 0, 1>\(/);
// <3,0,1>: neither, so no further instance is named at all.
assert.doesNotMatch(kept({ N: 3, A: 0, B: 1 }), /konami_sortlayers|constexpr/);
assert.match(kept({ N: 3, A: 0, B: 1 }), /if \(cmp\(pri\[A\], pri\[B\]\)\)/);
// A condition it cannot decide stays as written.
assert.equal(resolveIfConstexpr('if constexpr (X) a(); b();', at({})), 'if constexpr (X) a(); b();');
// A nested if with braces and no `;` after them is one statement.
assert.equal(
  resolveIfConstexpr('if constexpr (1) if (x) { a(); } else { b(); } c();', at({})).replace(/\s+/g, ' '),
  '{ if (x) { a(); } else { b(); } } c();');
// Only the named templates, and only when every argument is a number.
assert.equal(foldTemplateCallArguments('std::less<U>(); f<N>(1);', isSort, at({ N: 3 })), 'std::less<U>(); f<N>(1);');

console.log('function-template.spec: non-type monomorphization and if constexpr passed');
