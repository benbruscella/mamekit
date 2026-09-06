// Compare generated SID execution with the same unmodified MAME C++ sources.
// The C++ shim supplies only device/stream services and test register writes.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { compileSid } from '../src/mame/sid-compiler.ts';
import { generatedDeviceMethodsSource } from '../src/mame/device-codegen.ts';
import { createDevice, registerGeneratedDevice } from '../src/runtime/generated-device.ts';

const fixtureUrl = new URL('../src/mame/fixtures/sid-native.json', import.meta.url);
const fixture = JSON.parse(readFileSync(fixtureUrl, 'utf8'));
const source = resolve(process.env.MAME_SRC ?? '../mame');
const device = compileSid(source, { type: 'MOS6581', className: 'mos6581_device',
  sourceFile: 'src/devices/sound/mos6581.cpp', sourceLine: 1, sourceColumn: 1, macro: 'DEFINE_DEVICE_TYPE' });
const methods = generatedDeviceMethodsSource(device);
registerGeneratedDevice({ ...device, compiledMethods: Function(`return ${methods.source}`)() });
const temporary = mkdtempSync(join(tmpdir(), 'mamekit-sid-native-'));
try {
  mkdirSync(join(temporary, 'sound'));
  writeFileSync(join(temporary, 'emu.h'), `#pragma once
#include <cstdint>
#include <cmath>
#include <memory>
#include <vector>
#include <algorithm>
using u8=uint8_t;
struct running_machine { int sample_rate() {return ${fixture.sampleRate};} };
struct device_t { running_machine m; running_machine &machine() {return m;} };
struct sound_stream { using sample_t=float; std::vector<float> output;
  sound_stream(int n):output(n) {} int samples(){return output.size();}
  void put(int,int index,float value){output[index]=value;} void update(){} };
`);
  writeFileSync(join(temporary, 'sound/mos6581.h'), `struct mos6581_device { enum {
    TYPE_6581=${device.constants.TYPE_6581}, TYPE_8580=${device.constants.TYPE_8580} }; };\n`);
  writeFileSync(join(temporary, 'main.cpp'), `#include "emu.h"
#include "sid.h"
#include <cstdio>
int main(int argc,char **argv) {
  FILE *out=fopen(argv[1],"wb"); if(!out)return 1;
  int cases[][2]={${fixture.cases.map((entry: { mode: number; filter: number }) => `{${entry.mode},${entry.filter}}`).join(',')}};
  for(auto &entry:cases) {
    int mode=entry[0],filter=entry[1]; device_t device;
    sound_stream stream(${fixture.frames}); SID6581_t sid;
    sid.device=&device;sid.mixer_channel=&stream;sid.type=mos6581_device::TYPE_6581;
    sid.clock=${fixture.clock};sid.PCMfreq=${fixture.sampleRate};sid.init();sid.reset();
    sid.port_w(24,15|filter);sid.port_w(23,filter?0x57:0);sid.port_w(21,7);sid.port_w(22,0x20);
    for(int v=0;v<3;v++) {
      int base=v*7;sid.port_w(base,0x31+v*3);sid.port_w(base+1,0x20+v*7);
      sid.port_w(base+2,0);sid.port_w(base+3,8);sid.port_w(base+5,9);
      sid.port_w(base+6,0xf0);sid.port_w(base+4,mode);
    }
    sid.fill_buffer(stream);fwrite(stream.output.data(),sizeof(float),${fixture.frames},out);
  }
  fclose(out);
}
`.replace('#include "sid.h"', '#include "sid.h"\n#include "sound/mos6581.h"'));
  const executable = join(temporary, 'reference');
  execFileSync(process.env.CXX ?? 'clang++', ['-std=c++17', '-O2', `-I${temporary}`,
    `-I${join(source, 'src/devices/sound')}`, join(temporary, 'main.cpp'),
    ...['sid.cpp', 'sidvoice.cpp', 'sidenvel.cpp'].map(name => join(source, 'src/devices/sound', name)),
    '-o', executable], { stdio: 'inherit' });
  const nativePath = join(temporary, 'native.f32');
  execFileSync(executable, [nativePath]);
  const native = readFileSync(nativePath);
  let maximumError = 0, squaredError = 0, exactSamples = 0, count = 0;
  for (const [caseIndex, entry] of fixture.cases.entries()) {
    const sid = createDevice('MOS6581', { clock: fixture.clock });
    sid.reset();
    for (const [offset, value] of [[24, 15 | entry.filter], [23, entry.filter ? 0x57 : 0], [21, 7], [22, 0x20]]) sid.invoke('write', offset, value);
    for (let voice = 0; voice < 3; voice++) {
      for (const [offset, value] of [[0, 0x31 + voice * 3], [1, 0x20 + voice * 7], [2, 0], [3, 8], [5, 9], [6, 0xf0], [4, entry.mode]]) sid.invoke('write', voice * 7 + offset, value);
    }
    const pcm = new Float32Array(fixture.frames);
    sid.invoke('sound_stream_update', { samples: () => pcm.length,
      put: (_channel: number, index: number, value: number) => { pcm[index] = value; } });
    entry.samples = [];
    for (let index = 0; index < pcm.length; index++) {
      const expected = native.readFloatLE((caseIndex * fixture.frames + index) * 4);
      const error = Math.abs(pcm[index]! - expected);
      if (!Number.isFinite(error) || error > 3 / 1024) throw new Error(`SID differs from native MAME: mode ${entry.mode}, filter ${entry.filter}, sample ${index}, error ${error}`);
      maximumError = Math.max(maximumError, error); squaredError += error * error;
      if (error === 0) exactSamples++; count++;
      if (index % fixture.stride === 0) entry.samples.push(expected);
    }
  }
  if (process.argv.includes('--record')) {
    for (const name of Object.keys(fixture.sourceSha256)) fixture.sourceSha256[name] =
      createHash('sha256').update(readFileSync(join(source, 'src/devices/sound', name))).digest('hex');
    writeFileSync(fixtureUrl, JSON.stringify(fixture, null, 2) + '\n');
  }
  console.log(JSON.stringify({ cases: fixture.cases.length, samples: count, exactSamples, maximumError,
    rmsError: Math.sqrt(squaredError / count) }, null, 2));
} finally { rmSync(temporary, { recursive: true, force: true }); }
