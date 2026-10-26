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
