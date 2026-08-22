import deviceData from './z80ctc.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = {};
export const device = definition;
export default device;
