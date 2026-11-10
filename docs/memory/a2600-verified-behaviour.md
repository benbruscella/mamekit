---
name: a2600-verified-behaviour
description: "Space Invaders \"can't shoot\" was authentic game behaviour, verified pull-for-pull against MAME — and the three measurements that settle an a2600 gameplay complaint"
metadata:
  node_type: memory
  type: project
---

Investigated 2026-08-31 after three reports of "I can't shoot" in a2600
Space Invaders. **There was no bug.** The game allows one missile in flight;
at trigger pulls 1.5 s apart most presses do nothing.

Real MAME, Reset at frames 120..140 then six 6-frame trigger pulls 90 frames
apart, sampled 14 frames after each pull: **pulls 1 and 4 fire, 2/3/5/6 do
not.** Ours, same schedule in the browser: `[9, 0, 0, 9, 0, 0]`. Identical.
Every TIA register write count over the same window matches MAME within 1%
(RESBL 1465 vs 1480, ENABL 45985 vs 46070, WSYNC 41657 vs 41734).

**The three measurements, in the order that actually settles it:**
1. **Find the object on screen first.** Diff MAME with the trigger scripted
   against MAME without it. The player's shot turned out to be a 1-pixel grey
   (`#3b3b3b`) streak at x=46 climbing the screen. Now you have a detector.
2. **Count that object, not registers.** `RESBL` looked like a shot counter and
   is not -- it is written 2.7x per frame for ordinary ball repositioning, so
   the counts matched while telling me nothing about shots.
3. **Compare pull-for-pull, not in aggregate.** A single MAME snapshot a fixed
   number of frames after each scripted pull is cheap and unambiguous.

**Dead ends worth not repeating:**
- `ENAM0` is never set by this game -- the shot is the *ball*, not missile 0.
  Concluding "the game never fires" from `ENAM0 === 0` was wrong.
- A long scripted comparison (fire at frame 600, compare at 640-680) drifts:
  ~1200 px differ and the whole invader block moves. Compare within ~15 frames
  of the input or not at all ([[mame-reference-capture]]).
- Browser trials run back-to-back are not independent: the game reaches a state
  where nothing fires, and every later trial reads 0. Reload between runs.
- Real vs synthetic key events are NOT the difference. A trusted `KeyX` from
  the real keyboard drives `read_joy` 255->223 and `INPT4` 0x8c->0x0c exactly
  as a synthetic one does; `input.ts` holds the bit until keyup.

**What to tell a player:** press `2` (Reset) to start, wait ~2.5 s for the
game's own attract ([[tia-audio]] has the same 148-frame figure for its first
sound), then fire one shot at a time. `Space` and `X` are both BUTTON1.
