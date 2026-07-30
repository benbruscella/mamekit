import deviceData from './nes_control_port.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = {};
definition.slot.options["joypad"].compiledMethods = {};
export const device = definition;
export default device;
