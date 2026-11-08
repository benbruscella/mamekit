import assert from 'node:assert/strict';
import { executeGeneratedHandler, type GeneratedHandlerBindings } from '../ir/execute.ts';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from './ast.ts';
import { compileMameHandler } from './handler-ir.ts';
import { instantiateTemplateCall, type TemplateDefinition, type TemplateInstance } from './variadic-template.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

// resnet.h's legacy interface, as MAME 0.289 writes it.
const combineWeights: TemplateDefinition[] = [
  {
    name: 'combine_weights',
    namespace: 'emu::detail',
    template: 'std::size_t I, typename T, std::size_t N, typename U',
    parameters: 'T const (&tab)[N], U w',
    body: ' return tab[I] * w; ',
  },
  {
    name: 'combine_weights',
    namespace: 'emu::detail',
    template: 'std::size_t I, typename T, std::size_t N, typename U, typename... V',
    parameters: 'T const (&tab)[N], U w0, V... w',
    body: ' return (tab[I] * w0) + combine_weights<I + 1>(tab, w...); ',
  },
  {
    name: 'combine_weights',
    namespace: '',
    template: 'typename T = int, typename U, std::size_t N, typename... V',
    parameters: 'U const (&tab)[N], V... w',
    body: '\n\treturn T(emu::detail::combine_weights<0U>(tab, w...) + 0.5);\n',
  },
];

const call = (argumentCount: number) => instantiateTemplateCall(combineWeights, {
  name: 'combine_weights',
  qualifier: '',
  templateArguments: [],
  argumentCount,
  from: '',
});

/** Run an instance the way a board runs a handler that calls its helpers. */
function run(instances: readonly TemplateInstance[], name: string, args: unknown[]): number | undefined {
  const bindings: GeneratedHandlerBindings = { referenceCalls: {} };
  for (const instance of instances) {
    const parameters = instance.parameters.split(',').map(parameter =>
      /\(\s*&\s*(\w+)\s*\)/.exec(parameter)?.[1] ?? /(\w+)\s*$/.exec(parameter.trim())![1]!);
    bindings.referenceCalls![instance.name] = (...values) => executeGeneratedHandler(
      compileMameHandler(instance.body),
      bindings,
      Object.fromEntries(parameters.map((parameter, index) => [parameter, values[index]])),
    );
  }
  return bindings.referenceCalls![name]!(...args as never[]) as number | undefined;
}

check('a call names the fixed-arity instance of the overload C++ picks', () => {
  const resolved = call(4);
  assert.ok(resolved);
  assert.equal(resolved.name, 'combine_weights__int__3');
  assert.deepEqual(resolved.instances.map(instance => instance.name), [
    'combine_weights__int__3',
    'emu_detail__combine_weights__0__2',
    'emu_detail__combine_weights__1__1',
    'emu_detail__combine_weights__2__0',
  ]);
});

check('the pack is spelled out and the template arguments folded', () => {
  const [outer, first, second, last] = call(4)!.instances;
  assert.equal(outer!.parameters, 'U const (&tab)[N], auto w_0, auto w_1, auto w_2');
  assert.match(outer!.body, /return int\(emu_detail__combine_weights__0__2\(tab, w_0, w_1, w_2\) \+ 0\.5\);/);
  assert.match(first!.body, /\(tab\[0\] \* w0\) \+ emu_detail__combine_weights__1__1\(tab, w_0, w_1\)/);
  assert.match(second!.body, /\(tab\[1\] \* w0\) \+ emu_detail__combine_weights__2__0\(tab, w_0\)/);
  // Two arguments left: the overload without a pack is the more specialized.
  assert.equal(last!.parameters, 'T const (&tab)[N], U w');
  assert.match(last!.body, /return tab\[2\] \* w;/);
});

check('each arity is its own instance, and one is made once', () => {
  const made = new Map<string, TemplateInstance>();
  const three = instantiateTemplateCall(combineWeights, { name: 'combine_weights', qualifier: '', templateArguments: [], argumentCount: 4, from: '' }, made)!;
  const again = instantiateTemplateCall(combineWeights, { name: 'combine_weights', qualifier: '', templateArguments: [], argumentCount: 4, from: '' }, made)!;
  const two = instantiateTemplateCall(combineWeights, { name: 'combine_weights', qualifier: '', templateArguments: [], argumentCount: 3, from: '' }, made)!;
  assert.equal(again.name, three.name);
  assert.deepEqual(again.instances, []);
  assert.equal(two.name, 'combine_weights__int__2');
  // The detail instances an arity-2 call reaches start one weight later.
  assert.deepEqual(two.instances.map(instance => instance.name), [
    'combine_weights__int__2',
    'emu_detail__combine_weights__0__1',
    'emu_detail__combine_weights__1__0',
  ]);
});

check('an explicit argument is the first parameter of the overload lookup found', () => {
  const resolved = instantiateTemplateCall(combineWeights, {
    name: 'combine_weights', qualifier: '', templateArguments: ['u8'], argumentCount: 3, from: '',
  })!;
  assert.equal(resolved.name, 'combine_weights__u8__2', 'T, not emu::detail\'s I');
  assert.match(resolved.instances[0]!.body, /return u8\(/);
});

check('an unqualified call from file scope does not see emu::detail', () => {
  assert.equal(instantiateTemplateCall(combineWeights.slice(0, 2), {
    name: 'combine_weights', qualifier: '', templateArguments: [], argumentCount: 2, from: '',
  }), undefined);
});

check('the instances compute what MAME does: the weighted sum, rounded to int', () => {
  const resolved = call(4)!;
  const weights = [97.4, 46.6, 21.6];
  // 1*97.4 + 0*46.6 + 1*21.6 = 119.0 -> int(119.5) = 119
  assert.equal(run(resolved.instances, resolved.name, [weights, 1, 0, 1]), 119);
  // 97.4 + 46.6 + 21.6 = 165.6 -> int(166.1) = 166
  assert.equal(run(resolved.instances, resolved.name, [weights, 1, 1, 1]), 166);
  assert.equal(run(resolved.instances, resolved.name, [weights, 0, 0, 0]), 0);
});

check('parsing gives each call in a translation unit its instance, from MAME\'s own resnet.h', () => {
  const mameSrc = process.env.MAME_SRC ?? '../mame';
  const header = 'src/emu/video/resnet.h';
  const driver = `void pacman_state::pacman_palette(palette_device &palette)
{
\tint const r = combine_weights(rweights, bit0, bit1, bit2);
\tint const b = combine_weights(bweights, bit0, bit1);
}
`;
  const ast = new MameAstIndex(parseMameAst([
    { file: header, source: readFileSync(join(mameSrc, header), 'utf8') },
    { file: 'src/mame/pacman/pacman_v.cpp', source: driver },
  ]));
  const palette = ast.findFunction('pacman_state', 'pacman_palette')!;
  assert.match(palette.body, /r = combine_weights__int__3\(rweights, bit0, bit1, bit2\)/);
  assert.match(palette.body, /b = combine_weights__int__2\(bweights, bit0, bit1\)/);
  const three = ast.findUniqueFunction('combine_weights__int__3')!;
  assert.equal(three.className, '');
  assert.equal(three.span.file, header, 'an instance is sourced at its template');
  assert.match(three.body, /emu_detail__combine_weights__0__2\(tab, w_0, w_1, w_2\)/);
  assert.ok(ast.findUniqueFunction('emu_detail__combine_weights__2__0'));
  assert.equal(ast.findUniqueFunction('emu_detail__combine_weights__1__0')?.parameters, 'T const (&tab)[N], U w',
    'the arity-2 call reaches the pack-free overload one weight in');
});

console.log(`variadic-template.spec: ${passed} passed`);
