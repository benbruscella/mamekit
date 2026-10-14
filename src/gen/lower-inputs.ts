
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import type { BoardConfig } from '../ir/host-config.ts';

import type { GeneratedHandler } from '../ir/board.ts';

import { compileMameHandler } from '../mame/handler-ir.ts';
import { normalizeMameExecutionSource } from '../mame/cpu-compiler.ts';

import type { GenerateOptions } from './generate.ts';

import { inputKeys, inputLabel, inputPlayer, joystickWays, keypadKeys, portCodeKeys, computerKeyboardKeys, fieldConditionHolds, portLabel } from './input-bindings.ts';

import { Graph } from '../kg/query.ts';

export function lowerInputs(g: Graph, inputs: KGNode, graph: KnowledgeGraph, opts: GenerateOptions, devices: KGNode[]) {
  // --- inputs -----------------------------------------------------------------------
  // Port polarity comes from the graph per field: galaga/pacman inputs are
  // active-low, galaxian's are active-HIGH (coin bit 0 at rest) — the resting
  // ("init") byte must be computed per port or galaxian sees a stuck coin switch.
  //
  // PORT_INCLUDE resolution: walk every INCLUDES_PORTS branch root-first and
  // merge — a PORT_START in a derived set replaces the whole port; a
  // PORT_MODIFY replaces base fields whose masks overlap (mpatrol inherits
  // m52's coin/start/service ports and modifies the joystick bits).
  interface EffPort { tag: string; fields: KGNode[] }
  const inputsChain: KGNode[] = [];
  const inputSetsSeen = new Set<string>();
  const appendInputSet = (node: KGNode | undefined): void => {
    if (!node || inputSetsSeen.has(node.id)) return;
    inputSetsSeen.add(node.id);
    for (const include of g.out(node.id, 'INCLUDES_PORTS')) {
      appendInputSet(include.node);
    }
    inputsChain.push(node);
  };
  appendInputSet(inputs);
  const effPorts = new Map<string, EffPort>();
  for (const setNode of inputsChain) {
    for (const { node: port } of g.out(setNode.id, 'HAS_PORT')) {
      const tag = String(port.props.tag);
      const fields = g.out(port.id, 'HAS_FIELD').map(f => f.node);
      if (port.props.modify && effPorts.has(tag)) {
        const eff = effPorts.get(tag)!;
        for (const f of fields) {
          const mask = Number(f.props.mask);
          eff.fields = eff.fields.filter(b => (Number(b.props.mask) & mask) === 0);
          eff.fields.push(f);
        }
      } else {
        effPorts.set(tag, { tag, fields });
      }
    }
  }
  const ports = [...effPorts.values()];
  const portSpecs: { tag: string; init: number }[] = [];
  const bindings: unknown[] = [];
  const dipDefaults: unknown[] = [];
  /** The one keypad given keyboard keys; see the keypad binding below. */
  let boundKeypad: string | undefined;
  // Keys already spoken for on this machine. A PORT_CODE fallback must not take
  // a key a curated binding already uses.
  const boundKeys = new Set<string>();
  /**
   * Configuration-switch defaults, which PORT_CONDITION reads by port tag.
   *
   * Collected before anything is bound: MAME declares the selector wherever it
   * likes, and coleco.cpp puts CTRLSEL last -- after every field whose
   * availability depends on it.
   */
  const selectorDefaults = new Map<string, number>();
  for (const port of ports) {
    for (const field of port.fields) {
      if (field.props.kind !== 'dip') continue;
      const mask = Number(field.props.mask);
      const value = Number(field.props.defaultValue ?? mask);
      selectorDefaults.set(port.tag, (selectorDefaults.get(port.tag) ?? 0) | (value & mask));
    }
  }
  const customs: NonNullable<BoardConfig['customs']> = [];
  const inputLatches: NonNullable<BoardConfig['inputLatches']> = [];
  const inputChangedHandlers: GeneratedHandler[] = [];
  const changedHandlers = new Map<string, {
    handler: GeneratedHandler;
    stateMember?: string;
  } | undefined>();
  const changedHandler = (className: string, method: string): {
    handler: GeneratedHandler;
    stateMember?: string;
  } | undefined => {
    const key = `${className}.${method}`;
    if (changedHandlers.has(key)) return changedHandlers.get(key);
    for (const sourceNode of graph.nodes.filter(node => node.label === 'SourceFile')) {
      const path = join(opts.mameSrc, String(sourceNode.props.path));
      if (!existsSync(path)) continue;
      const source = readFileSync(path, 'utf8');
      const marker = `INPUT_CHANGED_MEMBER(${className}::${method})`;
      const start = source.indexOf(marker);
      if (start < 0) continue;
      const open = source.indexOf('{', start + marker.length);
      if (open < 0) continue;
      let depth = 0;
      let close = -1;
      for (let index = open; index < source.length; index++) {
        if (source[index] === '{') depth++;
        else if (source[index] === '}' && --depth === 0) {
          close = index;
          break;
        }
      }
      if (close < 0) continue;
      // PORT_CHANGED_MEMBER supplies newval and param.  Preserve the common
      // hardware shape where a rising switch edge sets one indexed latch;
      // its separate output-latch callback remains source-compiled and owns
      // clearing that state.
      const body = source.slice(open + 1, close);
      const match = /\bnewval\b[\s\S]{0,300}?\b(m_\w+)\s*\[\s*param\s*\]\s*=\s*(?:1|true)\s*;/.exec(body);
      const definition = {
        handler: {
          id: `input-changed:${key}`,
          ownerClass: className,
          method,
          parameters: 'ioport_field &field, u32 param, ioport_value oldval, ioport_value newval',
          body,
          program: compileMameHandler(normalizeMameExecutionSource(body)),
          source: {
            file: String(sourceNode.props.path),
            line: source.slice(0, start).split('\n').length,
            column: 1,
          },
        },
        ...(match ? { stateMember: match[1] } : {}),
      };
      changedHandlers.set(key, definition);
      return definition;
    }
    changedHandlers.set(key, undefined);
    return undefined;
  };
  for (const port of ports) {
    const tag = port.tag;
    let init = 0;
    for (const f of port.fields) {
      const kind = f.props.kind;
      const mask = Number(f.props.mask);
      const activeLow = f.props.activeLow !== false; // default LOW (classic hardware)
      if (kind === 'dip') {
        const value = Number(f.props.defaultValue ?? mask); // unused dips default to off (active low)
        init = (init & ~mask) | (value & mask);
        const named = f.props.name ? String(f.props.name) : undefined;
        dipDefaults.push({ port: tag, mask, value, name: named ?? '' });
        // A configuration switch MAME gives a key to is one a player is meant
        // to operate, not a cabinet setting: the Atari 2600's TV Type, and its
        // two difficulty switches, are physical switches on the console front.
        // Without this they were reachable only by editing the config, which
        // is how a machine ends up stuck in black and white with nothing on
        // screen to say so.
        const mods = (f.props.modifiers as string[] | undefined) ?? [];
        if (named && mods.includes('PORT_TOGGLE')) {
          const coded = portCodeKeys(mods)?.filter(key => !boundKeys.has(key));
          if (coded?.length) {
            for (const key of coded) boundKeys.add(key);
            bindings.push({
              port: tag,
              mask,
              keys: coded,
              label: named,
              type: String(f.props.type ?? 'IPT_CONFIG'),
              activeLow,
              // The switch's other position, as MAME's own PORT_CONFSETTINGs
              // define it -- the default flipped within its mask. TV Type is
              // Color by default and B&W when thrown; the difficulty switches
              // default the other way round.
              activeValue: (value ^ mask) & mask,
              toggle: true,
            });
          }
        }
      } else if (kind === 'service') {
        const value = Number(f.props.defaultValue ?? (activeLow ? mask : 0));
        init = (init & ~mask) | (value & mask);
        dipDefaults.push({ port: tag, mask, value, name: 'Service Mode' });
      } else if (kind === 'bit') {
        // MAME's own power-on value for the field. For a digital input this is
        // the polarity restated -- released reads the mask when active low --
        // but an analog field rests somewhere inside its travel, and starting
        // it at zero pins the control to one end (see parse.ts).
        init = (init & ~mask) | (Number(f.props.defaultValue ?? (activeLow ? mask : 0)) & mask);
        const type = String(f.props.type ?? '');
        const mods = (f.props.modifiers as string[] | undefined) ?? [];
        const changed = mods
          .map(modifier => /PORT_CHANGED_MEMBER\s*\([^,]+,\s*FUNC\s*\(\s*(\w+)::(\w+)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (changed) {
          const definition = changedHandler(changed[1]!, changed[2]!);
          if (definition && mask > 0 && (mask & (mask - 1)) === 0) {
            if (!inputChangedHandlers.some(handler =>
              handler.ownerClass === definition.handler.ownerClass &&
              handler.method === definition.handler.method)) {
              inputChangedHandlers.push(definition.handler);
            }
            inputLatches.push({
              port: tag,
              mask,
              activeLow,
              ...(definition.stateMember ? {
                stateMember: definition.stateMember,
                index: Math.log2(mask),
              } : {}),
              handler: `${changed[1]}.${changed[2]}`,
            });
          }
        }
        // IPT_CUSTOM bits are synthesized from other ports by a named driver
        // member (invaders reads CONTP1 into IN0/IN1/IN2 bits 4-6) — emit
        // the wiring fact for the board's member table
        const custom = mods
          .map(modifier => /PORT_(?:CUSTOM_MEMBER|READ_LINE_MEMBER)\s*\(\s*FUNC\s*\(\s*(\w+)::(\w+)(?:\s*<\s*(\d+)\s*>)?/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (type === 'IPT_CUSTOM' && custom) {
          const method = custom[3] === undefined
            ? custom[2]!
            : `${custom[2]}_${Number(custom[3])}`;
          customs.push({
            port: tag,
            mask,
            member: method,
            handler: `${custom[1]}.${method}`,
            activeLow,
          });
          continue;
        }
        const deviceLine = mods
          .map(modifier => /PORT_READ_LINE_DEVICE_MEMBER\s*\(\s*"([^"]+)"\s*,\s*FUNC\s*\(\s*screen_device::vblank/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (type === 'IPT_CUSTOM' && deviceLine) {
          customs.push({
            port: tag,
            mask,
            member: 'vblank',
            source: 'screen-vblank',
            activeLow,
          });
          continue;
        }
        // Any other device output line read straight into a port bit. Gauntlet
        // publishes both sound-latch pending flags this way, and the main
        // board refuses to send a command while its own is still full — so a
        // bit that silently reads as nothing is not a cosmetic gap.
        const anyDeviceLine = mods
          .map(modifier =>
            /PORT_READ_LINE_DEVICE_MEMBER\s*\(\s*"([^"]+)"\s*,\s*FUNC\s*\(\s*\w+::(\w+)\s*\)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        const rtcLine = mods
          .map(modifier => /PORT_READ_LINE_DEVICE_MEMBER\s*\(\s*"([^"]+)"\s*,\s*FUNC\s*\(\s*upd1990a_device::(tp_r|data_out_r)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (type === 'IPT_CUSTOM' && rtcLine) {
          customs.push({
            port: tag,
            mask,
            member: rtcLine[2]!,
            source: rtcLine[2] === 'tp_r' ? 'rtc-tp' : 'rtc-data',
            activeLow,
          });
          continue;
        }
        if (type === 'IPT_CUSTOM' && anyDeviceLine) {
          customs.push({
            port: tag,
            mask,
            member: anyDeviceLine[2]!,
            source: 'device-line',
            deviceTag: anyDeviceLine[1]!,
            activeLow,
          });
          continue;
        }
        // One keyboard is one player, so only player one's fields get keys.
        // Player two's are emitted keyless with their player: a second
        // gamepad drives them and nothing else can. A cocktail cabinet's
        // second set of controls is MAME's player two.
        const player = inputPlayer(mods);
        if (player > 2) continue;
        // An alternate controller's fields belong to a selector setting this
        // machine is not configured for. They stay in the port map -- the
        // source declares them -- but they are not bound or advertised.
        if (!fieldConditionHolds(mods, selectorDefaults)) continue;
        const sourceNumber = (value: string): number => Number(value.trim());
        const minMax = mods
          .map(modifier => /PORT_MINMAX\s*\(\s*([^,]+),\s*([^\)]+)\)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        const keyDelta = mods
          .map(modifier => /PORT_KEYDELTA\s*\(\s*([^\)]+)\)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        // PORT_SENSITIVITY scales a relative device's travel (ioport.cpp
        // apply_sensitivity): one mouse pixel is sensitivity/100 port units.
        const sensitivityMod = mods
          .map(modifier => /PORT_SENSITIVITY\s*\(\s*([^\)]+)\)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        const sensitivity = sensitivityMod ? sourceNumber(sensitivityMod[1]!) : 100;
        const named = portLabel(mods);
        if (type === 'IPT_DIAL') {
          if (player !== 1) continue;
          const delta = keyDelta ? sourceNumber(keyDelta[1]!) : 1;
          bindings.push({
            port: tag, mask, keys: ['ArrowLeft'], label: named ? `${named} Left` : `${type}_LEFT`,
            type: `${type}_LEFT`, activeLow: false, relativeDelta: -delta, sensitivity,
          });
          bindings.push({
            port: tag, mask, keys: ['ArrowRight'], label: named ? `${named} Right` : `${type}_RIGHT`,
            type: `${type}_RIGHT`, activeLow: false, relativeDelta: delta, sensitivity,
          });
          continue;
        }
        // An absolute analog stick, not a relative one: MAME's AD_STICK holds
        // a position inside PORT_MINMAX and springs back to the field's own
        // default when nothing drives it. A digital key therefore drives full
        // deflection and release recentres, which is exactly what `activeValue`
        // already does. Sinistar's 49-way stick is one of these, and without
        // it the ship has no controls at all.
        if (
          type === 'IPT_AD_STICK_X' || type === 'IPT_AD_STICK_Y' ||
          type === 'IPT_PADDLE' || type === 'IPT_PADDLE_V'
        ) {
          if (player !== 1) continue;
          const low = minMax ? sourceNumber(minMax[1]!) : 0;
          const high = minMax ? sourceNumber(minMax[2]!) : mask;
          const reversed = mods.includes('PORT_REVERSE');
          const vertical = type === 'IPT_AD_STICK_Y' || type === 'IPT_PADDLE_V';
          const negativeKey = vertical ? 'ArrowUp' : 'ArrowLeft';
          const positiveKey = vertical ? 'ArrowDown' : 'ArrowRight';
          const negativeName = vertical ? 'Up' : 'Left';
          const positiveName = vertical ? 'Down' : 'Right';
          for (const [key, name, value] of [
            [negativeKey, negativeName, reversed ? high : low],
            [positiveKey, positiveName, reversed ? low : high],
          ] as [string, string, number][]) {
            bindings.push({
              port: tag,
              mask,
              keys: [key],
              label: named ? `${named} ${name}` : `${type}_${name.toUpperCase()}`,
              type: `${type}_${name.toUpperCase()}`,
              activeLow: false,
              activeValue: value,
              // MAME travels an analog field by PORT_KEYDELTA per frame rather
              // than jumping; a wheel that snapped to full lock is undrivable.
              keyDelta: keyDelta ? sourceNumber(keyDelta[1]!) : 1,
            });
          }
          continue;
        }
        if (type === 'IPT_TRACKBALL_X' || type === 'IPT_TRACKBALL_Y') {
          if (player !== 1) continue;
          const delta = keyDelta ? sourceNumber(keyDelta[1]!) : 1;
          const reversed = mods.includes('PORT_REVERSE');
          const negative = reversed ? delta : -delta;
          const positive = -negative;
          const vertical = type === 'IPT_TRACKBALL_Y';
          const negativeKey = vertical ? 'ArrowUp' : 'ArrowLeft';
          const positiveKey = vertical ? 'ArrowDown' : 'ArrowRight';
          const negativeName = vertical ? 'Up' : 'Left';
          const positiveName = vertical ? 'Down' : 'Right';
          bindings.push({
            port: tag,
            mask,
            keys: [negativeKey],
            label: named ? `${named} ${negativeName}` : `${type}_${negativeName.toUpperCase()}`,
            type: `${type}_${negativeName.toUpperCase()}`,
            activeLow: false,
            relativeDelta: negative,
            sensitivity,
          });
          bindings.push({
            port: tag,
            mask,
            keys: [positiveKey],
            label: named ? `${named} ${positiveName}` : `${type}_${positiveName.toUpperCase()}`,
            type: `${type}_${positiveName.toUpperCase()}`,
            activeLow: false,
            relativeDelta: positive,
            sensitivity,
          });
          continue;
        }
        // A keypad key is identified by its label, not by its IPT type: every
        // one of the twelve is IPT_KEYPAD.
        //
        // Only the first keypad is bound. A ColecoVision has two, each with
        // the same twelve keys, and one keyboard cannot press "1" on one pad
        // without pressing it on the other -- so the second stays reachable as
        // a raw port rather than shadowing the first.
        let keys = player !== 1
          ? (inputKeys(opts.game, type) ? [] : undefined)
          : type === 'IPT_KEYPAD'
          ? keypadKeys(named)
          : type === 'IPT_KEYBOARD' ? computerKeyboardKeys(mods)
          : inputKeys(opts.game, type);
        if (player === 1 && type === 'IPT_KEYPAD') {
          if (boundKeypad && boundKeypad !== tag) keys = undefined;
          else boundKeypad = tag;
        }
        // Nothing in the shared map covers this control, but MAME may have
        // named its key on the field. A console's Select and Reset switches
        // arrive that way, and without this they were unreachable: the Atari
        // 2600 shipped with a legend offering only move and fire.
        //
        // Only a field MAME also NAMES: a name is MAME saying a player operates
        // this control. Donkey Kong Jr's `TST` port carries PORT_CODEs with no
        // names and sits behind a preprocessor guard the input parser does not
        // honour, so binding on the code alone put a compiled-out debug switch
        // on the keyboard.
        if (player === 1 && !keys && named) {
          const coded = portCodeKeys(mods)?.filter(key => !boundKeys.has(key));
          if (coded?.length) keys = coded;
        }
        for (const key of keys ?? []) boundKeys.add(key);
        if (keys) bindings.push({
          port: tag,
          mask,
          keys,
          label: named ?? (type === 'IPT_KEYBOARD' ? keys[0]?.replace(/^(Key|Digit)/, '') : undefined)
            ?? inputLabel(opts.game, type) ?? type,
          type,
          ...(player !== 1 ? { player } : {}),
          activeLow,
          // A pedal is an absolute analog control like the stick and the
          // wheel above, and MAME travels it by PORT_KEYDELTA per frame
          // rather than jumping: Spy Hunter's throttle is
          // PORT_MINMAX(0x30,0xff) PORT_KEYDELTA(10), roughly 21 frames from
          // idle to the floor. Snapping it made the car undrivable.
          ...(/^IPT_PEDAL\d*$/.test(type)
            ? {
                activeValue: minMax ? sourceNumber(minMax[2]!) : mask,
                keyDelta: keyDelta ? sourceNumber(keyDelta[1]!) : 1,
              }
            : {}),
          ...(mods.includes('PORT_TOGGLE') ? { toggle: true } : {}),
          ...(joystickWays(mods) !== undefined ? { ways: joystickWays(mods) } : {}),
        });
      }
    }
    portSpecs.push({ tag, init });
  }

  // Control ports may live on a default slot device rather than the driver
  // (NES joypads and Neo Geo's MVS edge connector are concrete examples).
  // Port tags are namespaced `${devTag}:${portTag}`. Only the first physical
  // controller is keyboard-bound; the second is emitted keyless as player two
  // for a second gamepad, and any further one remains a raw port.
  {
    let controllers = 0;
    for (const dev of devices) {
      const slotInputs = g.out(dev.id, 'USES_INPUTS')[0]?.node;
      if (!slotInputs) continue;
      for (const { node: port } of g.out(slotInputs.id, 'HAS_PORT')) {
        const tag = `${dev.props.tag}:${port.props.tag}`;
        let init = 0;
        for (const f of g.out(port.id, 'HAS_FIELD').map(x => x.node)) {
          if (f.props.kind !== 'bit') continue;
          const mask = Number(f.props.mask);
          const activeLow = f.props.activeLow !== false;
          init = (init & ~mask) |
            (Number(f.props.defaultValue ?? (activeLow ? mask : 0)) & mask);
          const type = String(f.props.type ?? '');
          const mods = (f.props.modifiers as string[] | undefined) ?? [];
          // The slot says which player a controller is: the NES's second
          // joypad carries no PORT_PLAYER, it is simply the second device,
          // while one Neo Geo edge connector names both players itself.
          const player = inputPlayer(mods) + controllers;
          if (player > 2) continue;
          const keys = player === 1
            ? inputKeys(opts.game, type)
            : inputKeys(opts.game, type) ? [] : undefined;
          if (!keys) continue;
          const named = portLabel(mods);
          bindings.push({
            port: tag,
            mask,
            keys,
            label: named ?? inputLabel(opts.game, type) ?? type,
            type,
            ...(player !== 1 ? { player } : {}),
            activeLow,
            ...(mods.includes('PORT_TOGGLE') ? { toggle: true } : {}),
            ...(joystickWays(mods) !== undefined ? { ways: joystickWays(mods) } : {}),
          });
        }
        portSpecs.push({ tag, init });
      }
      controllers++;
    }
  }

  return { customs, inputLatches, bindings, dipDefaults, portSpecs, inputChangedHandlers };
}
