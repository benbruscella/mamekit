# Crush Roller (set 1)

**Alpha Denshi Co. / Kural Samno Electric, Ltd. · 1981** — transpiled from the MAME driver `src/mame/pacman/pacman.cpp` by mamekit.

![marquee](/artwork/media/marquees/crush.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/crush.webp) | ![cabinet](/artwork/media/cabinets/crush.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 19 |

- **Sound:** wsg @ 0.096 MHz
- **Screen:** 288×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `crushkrl.6e` | 0x0 | 0x1000 | `a8dd8f54` |
| `maincpu` | `crushkrl.6f` | 0x1000 | 0x1000 | `91387299` |
| `maincpu` | `crushkrl.6h` | 0x2000 | 0x1000 | `d4455f27` |
| `maincpu` | `crushkrl.6j` | 0x3000 | 0x1000 | `d59fc251` |
| `gfx1` | `maketrax.5e` | 0x0 | 0x1000 | `91bad2da` |
| `gfx1` | `maketrax.5f` | 0x1000 | 0x1000 | `aea79f55` |
| `proms` | `82s123.7f` | 0x0 | 0x20 | `2fc650bd` |
| `proms` | `2s140.4a` | 0x20 | 0x100 | `63efb927` |
| `namco` | `82s126.1m` | 0x0 | 0x100 | `a9cc86bf` |
| `namco` | `82s126.3m` | 0x100 | 0x100 | `77245b66` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Up | joystick up | `IN0` | 0x1 |
| Left | joystick left | `IN0` | 0x2 |
| Right | joystick right | `IN0` | 0x4 |
| Down | joystick down | `IN0` | 0x8 |
| 5 | coin1 | `IN0` | 0x20 |
| 6 | coin2 | `IN0` | 0x40 |
| 9 | service1 | `IN0` | 0x80 |
| 1 | start1 | `IN1` | 0x20 |
| 2 | start2 | `IN1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Cabinet | `IN0` | 0x10 | 0x0 |
| Coinage | `DSW1` | 0x3 | 0x1 |
| Lives | `DSW1` | 0xc | 0x0 |
| First Pattern | `DSW1` | 0x10 | 0x10 |
| Teleport Holes | `DSW1` | 0x20 | 0x20 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/pacman/pacman.cpp`
- **Written by:** Nicola Salmoria,Stephane Humbert
- **License:** BSD-3-Clause
- **Development:** 436 commits by 52 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, Michaël Banaan Ananas, Vas Crabb

## The story

Arcade Video game published 45 years ago:

Crush Roller (c) 1981 Kural Electric, Limited.

Crush Roller is a maze game in which the player controls a paintbrush and must paint the entire layout in order to advance to the next stage. Two fish — one yellow, the other light blue — emerge from separate aquariums to pursue the paintbrush around the board, and if either of the fish succeeds in making contact with the paintbrush, the player loses a life.

The player may use two "rollers" to attack the fish. The rollers are located on two overpasses, one vertical in its orientation, the other horizontal. To use a roller, the player positions the paintbrush on the forward end of the roller, waits for either or both of the fish to approach, then pushes the paintbrush along the roller, attacking the fish. The fish is removed from the maze for a few seconds, then returns to one of the aquariums and resumes its pursuit of the paintbrush. Killing fish in this manner scores bonus points.

A third character, appearing to be an animal or human figure depending on the level, may enter the maze and leave tracks that must be painted over in order for the board to be completed. The player can limit the damage by running over the figure, which not only stops further tracks from being left but also awards the player a score, which progressively increases as more boards are cleared.

### Technical
Main CPU : Zilog Z80 (@ 3.072 Mhz)
Sound Chips : Namco (@ 96 Khz)

Players : 2
Control : 4-way joystick

### Trivia
Released in October 1981 in Japan. 

This game is known in the U.S. as "Make Trax".

Another version of this game is known as "Korosuke Roller". 

2 bootlegs are known as "Paint Roller" and "Magic Brush". Another bootleg was made by Sidam as "Crush Roller (Sidam [Torino, Italy, EUR])". 

Giuseppe Fiorido of Italy holds the official record for this game with 2514100 points on June 27, 1984.

### Updates
Make Trax has a protection chip, Crush Roller doesn't. The code between the two is nearly identical, except that everywhere the protection code is located, code has been replaced with a couple of bytes to return the correct value and several NOP instructions (which do absolutely nothing).

### Scoring
Painting floor : 10 points per unpainted or footprint/tiretrack/dropping messed segment. 
Killing Fish : 50, 100, 200, 400, 800, 1600, 3200, 6400 and the maximum 9000. 
Each level starts with the lowest point scoring fish being increased by one. E.g. Level one starts at 50 points, level two with 100 points, and so on up to 9000 
Capturing the creature/object messing up your paintwork : 1000 points.

### Ports
* CONSOLES: 
[AS] Nintendo Famicon (1990) "Brush Roller"

### Series
1. Crush Roller (1981)
2. Crush Roller [Model NEOP00380] (1999, Neo Geo Pocket Color)

### Contribute
Edit this entry: https://www.arcade-history.com/game/547/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `pacman`. Play it at [../../../app/g/crush/](../../../app/g/crush/) or [explore the knowledge graph](viewer.html).*
