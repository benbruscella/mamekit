/**
 * The -rtc every contract runs at, ours and MAME's reference alike, so a clock
 * chip reads the same date on both. The instant Neo Geo's hand-written RTC
 * once answered with, kept so its BIOS boots to the same screen.
 */
export const CONTRACT_BASE_TIME = '20260806072050';
/** Use resolved executable facts for composition, preserving host mounting options. */
export function boardConfigFromIr(machine, host) {
    const execution = machine.execution;
    return {
        ...host,
        game: machine.game,
        family: machine.family,
        cpus: execution.cpus,
        ranges: execution.cpus[0]?.ranges ?? [],
        io: execution.cpus[0]?.io,
        screen: execution.screen,
        bankDevices: execution.bankDevices,
        initialShares: execution.initialShares,
        customs: execution.customs,
        inputLatches: execution.inputLatches,
    };
}
