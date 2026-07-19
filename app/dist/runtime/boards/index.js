// Board registry: maps a driver family (from the knowledge graph) to its
// hand-transpiled board module. Adding a game family = adding one entry here.
import { GalagaBoard } from "./galaga.js";
import { DigdugBoard } from "./digdug.js";
import { PacmanBoard } from "./pacman.js";
import { GalaxianBoard } from "./galaxian.js";
import { GyrussBoard } from "./gyruss.js";
import { Mw8080bwBoard } from "./mw8080bw.js";
import { M52Board } from "./m52.js";
import { GngBoard } from "./gng.js";
import { JunofrstBoard } from "./junofrst.js";
import { RocnropeBoard } from "./rocnrope.js";
import { PooyanBoard } from "./pooyan.js";
import { TimepltBoard } from "./timeplt.js";
import { NesBoard } from "./nes.js";
const FAMILIES = {
    galaga: GalagaBoard,
    digdug: DigdugBoard,
    pacman: PacmanBoard,
    galaxian: GalaxianBoard,
    gyruss: GyrussBoard,
    mw8080bw: Mw8080bwBoard,
    m52: M52Board,
    gng: GngBoard,
    junofrst: JunofrstBoard,
    rocnrope: RocnropeBoard,
    pooyan: PooyanBoard,
    timeplt: TimepltBoard,
    nes: NesBoard,
};
export function registerBoard(family, ctor) {
    FAMILIES[family] = ctor;
}
export function createBoard(config, regions, inputs, sinks) {
    const ctor = FAMILIES[config.family];
    if (!ctor)
        throw new Error(`no board module for driver family "${config.family}" (have: ${Object.keys(FAMILIES).join(', ')})`);
    return new ctor(config, regions, inputs, sinks);
}
// NOTE: portHandlers lives in ../input.ts — board modules must import it from
// there, not from this registry, or they create an ES-module cycle (registry
// imports board imports registry) that hits the class TDZ at load time.
