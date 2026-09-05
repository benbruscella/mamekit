# Frisky Tom (set 1)

**Nichibutsu · 1981** — transpiled from the MAME driver `src/mame/nichibutsu/seicross.cpp` by mamekit.

![marquee](/artwork/media/marquees/friskyt.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/friskyt.webp) | ![cabinet](/artwork/media/cabinets/friskyt.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 11 |
| `mcu` | NSC8105 | 3.072 MHz | 4 |

- **Sound:** ay8910 × 1 @ 1.536 MHz
- **Screen:** 256×224 @ 60.61 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `ftom.01` | 0x0 | 0x1000 | `bce5d486` |
| `maincpu` | `ftom.02` | 0x1000 | 0x1000 | `63157d6e` |
| `maincpu` | `ftom.03` | 0x2000 | 0x1000 | `c8d9ef2c` |
| `maincpu` | `ftom.04` | 0x3000 | 0x1000 | `23a01aac` |
| `maincpu` | `ftom.05` | 0x4000 | 0x1000 | `bfaf702a` |
| `maincpu` | `ftom.06` | 0x5000 | 0x1000 | `bce70b9c` |
| `maincpu` | `ftom.07` | 0x6000 | 0x1000 | `b2ef303a` |
| `maincpu` | `ft8_8.rom` | 0x7000 | 0x800 | `10461a24` |
| `gfx` | `ftom.11` | 0x0 | 0x1000 | `1ec6ff65` |
| `gfx` | `ftom.12` | 0x1000 | 0x1000 | `3b8f40b5` |
| `gfx` | `ftom.09` | 0x2000 | 0x1000 | `60642f25` |
| `gfx` | `ftom.10` | 0x3000 | 0x1000 | `07b9dcfc` |
| `proms` | `ft.9c` | 0x0 | 0x20 | `0032167e` |
| `proms` | `ft.9b` | 0x20 | 0x20 | `6b364e69` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Up | joystick up | `IN0` | 0x1 |
| Down | joystick down | `IN0` | 0x2 |
| Left | joystick left | `IN0` | 0x4 |
| Right | joystick right | `IN0` | 0x8 |
| 5 | coin1 | `IN0` | 0x10 |
| 6 | coin2 | `IN0` | 0x20 |
| 1 | start1 | `IN0` | 0x40 |
| 2 | start2 | `IN0` | 0x80 |
| 9 | service1 | `IN1` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN1` | 0x20 | 0x0 |
| Counter Check | `IN1` | 0x80 | 0x0 |
| Test Mode | `TEST` | 0x1 | 0x0 |
| Connection Error | `TEST` | 0x2 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/nichibutsu/seicross.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 174 commits by 25 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Ivan Vangelista, Vas Crabb, hap

## The story

Arcade Video game published 45 years ago:

Frisky Tom (c) 1981 Nichibutsu [Nihon Bussan Company, Limited.].

You play the plumber Frisky Tom who is trying to get water from the top tank to a shower tank below. Mice interfere with your plans by stealing pipes blowing-up pipes and by biting Tom. If Tom fills enough water the shower tank, he advances to the next level. Depending upon how much water is in the tank, a woman in a bath tub will appear as an interlude between levels.

### Technical
Upright model # FTA1001

CRT: 20 inch.
Width: 600 mm.
Depth: 690 mm.
Height: 1625 mm.
Power source: 100V~240V/110W

Main CPU : Zilog Z80 (@ 3.072 Mhz), NSC8105 (@ 1.5 Mhz)
Sound Chips : General Instrument AY8910 (@ 1.536 Mhz), DAC

Players : 2
Control : 4-way joystick

### Trivia
Frisky Tom was released in October 1981. Nichibutsu never released the old version in the U.S. for unknown reasons, although one could guess one of them. Perhaps it was the naked woman in the bath tub in which as you advanced in the game, bubbles would be washed away revealing her breasts?? Probably didn't go over too well with the U.S. arcade owners in the early 80's.

When the game was released, the service manual that came with the  original cabinet described the old version (set 2) of game play. That didn't help arcade owners much because it didn't match the system  they received. The game wasn't very popular so there were few complaints.

The flyer reads 'Nichibutsu original custom C.P.U. was used for the first time in video games'.

Cast of Characters :
FRISKY TOM
BOMB - When the bomb explodes, you lose a life.
MOLAR Mouse (Orange) - 50 points awarded if bumped by Tom.
PYRO Mouse (Pink) - Lights the bomb fuse.
MEAN Mouse (Blue) - If Tom runs into this mouse he will fall...so stay away!.
MEGATON Mouse (Violet) - Mouse who plants the bomb.
KLEPTO Mouse (Green) - Mouse who takes or carries away pieces of pipe.

### Updates
Two Different Frisky Tom Games ?

The new version (set 1) differs from the old version (set 2) and has a tremendous impact on game play and strategy. In addition to the differences listed in the Cast of Characters, the following are also noted :
* Frisky Toms are tracked as 'lives' in the new version while in the old version they are water tanks.
* In the new version, the bottom tank starts with 4000 points and will gradually slip to 0 if no water gets to it. A life is lost at this point (Frisky Tom). In the old version, water must be filled to maximum to not lose a life (a tank). A song will be played when the bottom tank is filled completely.
* The bomb fuse can be put out by either dropping on it from the left or all the way to the end of the screen on the right (reappear on the left side) in the new version. In the old version you can only put out the fuse on the left side. You fall just short if you move off to the right side of the screen.
* MOLAR Mouse is worth 200 points in the new version.
* MOLAR mouse can be knocked down in any position on the pipes in the new version. MOLAR mouse can only be knocked off in the old version when he is transiting up and down on a pipe.
* In the new version MEAN Mouse is red.
* In the new version MEAN Mouse will kill Tom if he touches or falls on it. MEAN mouse doesn't fall in the old version.
* KLEPTO Mouse is not in the new version
* The new version has classes of difficulty 'A', 'B' & 'C'. In the old version there are no difficulty classes.
* In the new version the lady will appear between levels every time the bottom tank has more than 1900 points. Also she wears a bikini. In the old version the lady will appear every 3 levels or so and she is naked!
* Game config is backed up by 4.5v battery in old version.
* Old version uses larger board.

### Staff
Frisky Tom was developed by game developer company Jorudan.

### Ports
* CONSOLES:
Atari 5200 (1982): prototype was programmed but was never released.
Nintendo Super Famicom (1995) "Nichibutsu Arcade Classics [Model SHVC-AACJ-JPN]"
Nintendo Game Boy (1995) "Frisky Tom [Model DMG-AFTJ-JPN]"
Sony PlayStation (1995) "Nichibutsu Arcade Classics [Model SLPS-00184]"
Sony PlayStation (2002) "Arcade Hits - Frisky Tom [Major Wave Serie] [Model SLPM-87118]"

* COMPUTERS:
X68000 (1995)

* OTHERS:
LCD Handheld Game (1982) by Bandai.
LCD Handheld Game (1982) "Pipe Line" by Bandai : French release.
VFD Handheld Game (1982) by Bandai.

### Contribute
Edit this entry: https://www.arcade-history.com/game/877/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `seicross`. Play it at [../../../app/g/friskyt/](../../../app/g/friskyt/) or [explore the knowledge graph](viewer.html).*
