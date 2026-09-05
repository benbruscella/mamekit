# Rygar (US set 1)

**Tecmo · 1986** — transpiled from the MAME driver `src/mame/tecmo/tecmo.cpp` by mamekit.

![marquee](/artwork/media/marquees/rygar.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/rygar.webp) | ![cabinet](/artwork/media/cabinets/rygar.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 6.000 MHz | 25 |
| `soundcpu` | Z80 | 4.000 MHz | 7 |

- **Sound:** ym2203 @ 4.000 MHz
- **Screen:** 256×224 @ 59.19 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `5.5p` | 0x0 | 0x8000 | `062cd55d` |
| `maincpu` | `cpu_5m.bin` | 0x8000 | 0x4000 | `7ac5191b` |
| `maincpu` | `cpu_5j.bin` | 0x10000 | 0x8000 | `ed76d606` |
| `soundcpu` | `cpu_4h.bin` | 0x0 | 0x2000 | `e4a2fa87` |
| `txtiles` | `cpu_8k.bin` | 0x0 | 0x8000 | `4d482fb6` |
| `sprites` | `vid_6k.bin` | 0x0 | 0x8000 | `aba6db9e` |
| `sprites` | `vid_6j.bin` | 0x8000 | 0x8000 | `ae1f2ed6` |
| `sprites` | `vid_6h.bin` | 0x10000 | 0x8000 | `46d9e7df` |
| `sprites` | `vid_6g.bin` | 0x18000 | 0x8000 | `45839c9a` |
| `fgtiles` | `vid_6p.bin` | 0x0 | 0x8000 | `9eae5f8e` |
| `fgtiles` | `vid_6o.bin` | 0x8000 | 0x8000 | `5a10a396` |
| `fgtiles` | `vid_6n.bin` | 0x10000 | 0x8000 | `7b12cf3f` |
| `fgtiles` | `vid_6l.bin` | 0x18000 | 0x8000 | `3cea7eaa` |
| `bgtiles` | `vid_6f.bin` | 0x0 | 0x8000 | `9840edd8` |
| `bgtiles` | `vid_6e.bin` | 0x8000 | 0x8000 | `ff65e074` |
| `bgtiles` | `vid_6c.bin` | 0x10000 | 0x8000 | `89868c85` |
| `bgtiles` | `vid_6b.bin` | 0x18000 | 0x8000 | `35389a7b` |
| `adpcm` | `cpu_1f.bin` | 0x0 | 0x4000 | `3cc98c5a` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | joystick left | `JOY1` | 0x1 |
| Right | joystick right | `JOY1` | 0x2 |
| Down | joystick down | `JOY1` | 0x4 |
| Up | joystick up | `JOY1` | 0x8 |
| Space / X | button1 | `BUTTONS1` | 0x1 |
| Z | button2 | `BUTTONS1` | 0x2 |
| 9 | service1 | `BUTTONS1` | 0x4 |
| 2 | start2 | `SYS_0` | 0x1 |
| 1 | start1 | `SYS_0` | 0x2 |
| 6 | coin2 | `SYS_0` | 0x4 |
| 5 | coin1 | `SYS_0` | 0x8 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Unused | `DSWA` | 0x80 | 0x0 |
| Coin A | `DSWA` | 0x3 | 0x0 |
| Coin B | `DSWA` | 0xc | 0x0 |
| Lives | `DSWA` | 0x30 | 0x0 |
| Cabinet | `DSWA` | 0x40 | 0x40 |
| Unused | `DSWB` | 0x4 | 0x0 |
| Unused | `DSWB` | 0x8 | 0x0 |
| Bonus Life | `DSWB` | 0x3 | 0x0 |
| Difficulty | `DSWB` | 0x30 | 0x0 |
| 2P Can Start Anytime | `DSWB` | 0x40 | 0x0 |
| Allow Continue | `DSWB` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/tecmo/tecmo.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 184 commits by 29 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Olivier Galibert

## The story

Arcade Video game published 40 years ago:

Rygar - Legendary Warrior (c) 1986 Tecmo.

Export release. Game developed in Japan. For more information about the game itself, please see the original Japanese release entry; "Argos no Senshi - Legendary Warrior".

### Trivia
Rygar was released in May 1986.

The differences between the US and Japanese (Argus no Senshi) are :
* The demo sequences are different.
* The Japanese version seems to have more hidden powers, stars and an extra free life.
* The US version is more biased towards stars and explosions.

### Updates
The differences between the US (set 1) and US (set 2) are :
* 'Set 2' has a bug in the code which lets p2 start a game when p1 is already playing. You need to set a dip-switch to enable this behavior (it is usually on by default). If you press '2' while p1 is playing a single player game, 'Set 2' will check that you have 1 or more credit before it registers that you're now in a 2 player game, but it won't deduct the credit. That's a bad bug and probably accounts for why a bug-fix version was released.
* In 'Set 2', if p2 starts while p1 is already playing, it says 'playre2' instead of 'player2' at the top right.
* The first screen of 'Set 2' says 'ALL RIGHT RESERVED' - missing an 'S' - that's fixed in 'Set 1'

### Ports
* CONSOLES:
[US] Microsoft XBOX (sept.14, 2005) "Tecmo Classic Arcade" 
[EU] Microsoft XBOX (oct.21, 2005) "Tecmo Classic Arcade" 
[US]Sony PlayStation 4 [PSN] (aug.19, 2014) "Arcade Archives - Rygar [Model CUSA-00993]" 

* HANDHELDS: 
[US] Atari Lynx (1990) "Rygar - Legendary Warrior [Model PA2043]" 

* COMPUTERS:
[EU] Commodore C64 (1987)
[EU] Amstrad CPC (1987) "Rygar let's fight!!!" 
[EU] Sinclair ZX Spectrum (dec.1, 1987)

### Series
1. Rygar - Legendary Warrior (1986, Arcade)
2. Rygar [Model NES-RY-USA] (1987, NES)
3. Rygar - The Legendary Adventure (2002, PS2)
3. Rygar - The Battle of Argus (2009, Wii)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2280/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `tecmo`. Play it at [../../../app/g/rygar/](../../../app/g/rygar/) or [explore the knowledge graph](viewer.html).*
