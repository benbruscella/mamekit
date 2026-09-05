# Donkey Kong Junior (US set F-2)

**Nintendo of America · 1982** — transpiled from the MAME driver `src/mame/nintendo/dkong.cpp` by mamekit.

![marquee](/artwork/media/marquees/dkongjr.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/dkongjr.webp) | ![cabinet](/artwork/media/cabinets/dkongjr.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 21 |
| `soundcpu` | MB8884 | 6.000 MHz | 1 |

- **Sound:** discrete @ 3.072 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `djr1-c_5b_f-2.5b` | 0x0 | 0x1000 | `dea28158` |
| `maincpu` | `djr1-c_5c_f-2.5c` | 0x2000 | 0x800 | `6fb5faf6` |
| `maincpu` | `djr1-c_5e_f-2.5e` | 0x4000 | 0x800 | `d042b6a8` |
| `soundcpu` | `djr1-c_3h.3h` | 0x0 | 0x1000 | `715da5f8` |
| `gfx1` | `djr1-v.3n` | 0x0 | 0x1000 | `8d51aca9` |
| `gfx1` | `djr1-v.3p` | 0x1000 | 0x1000 | `4ef64ba5` |
| `gfx2` | `djr1-v_7c.7c` | 0x0 | 0x800 | `dc7f4164` |
| `gfx2` | `djr1-v_7d.7d` | 0x800 | 0x800 | `0ce7dcf6` |
| `gfx2` | `djr1-v_7e.7e` | 0x1000 | 0x800 | `24d1ff17` |
| `gfx2` | `djr1-v_7f.7f` | 0x1800 | 0x800 | `0f8c083f` |
| `proms` | `djr1-c-2e.2e` | 0x0 | 0x100 | `463dc7ad` |
| `proms` | `djr1-c-2f.2f` | 0x100 | 0x100 | `47ba0042` |
| `proms` | `djr1-v-2n.2n` | 0x200 | 0x100 | `dbf185bf` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `IN0` | 0x1 |
| Left | joystick left | `IN0` | 0x2 |
| Up | joystick up | `IN0` | 0x4 |
| Down | joystick down | `IN0` | 0x8 |
| Space / X | button1 | `IN0` | 0x10 |
| F2 | service | `IN2` | 0x1 |
| 1 | start1 | `IN2` | 0x4 |
| 2 | start2 | `IN2` | 0x8 |
| 5 | coin1 | `IN2` | 0x80 |
| 9 | service1 | `SERVICE1` | 0x1 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Lives | `DSW0` | 0x3 | 0x0 |
| Coinage | `DSW0` | 0x70 | 0x0 |
| Cabinet | `DSW0` | 0x80 | 0x80 |
| Bonus Life | `DSW0` | 0xc | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/nintendo/dkong.cpp`
- **Written by:** Couriersud
- **License:** BSD-3-Clause
- **Development:** 311 commits by 42 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Couriersud, Vas Crabb, Michaël Banaan Ananas

## The story

Arcade Video game published 44 years ago:

Donkey Kong Junior (c) 1982 Nintendo of America.

Export release for North America. Game developed in Japan. For more information about the game itself, please see the "Donkey Kong Jr." (Japanese version) entry.

### Technical
Upright model
Model # DJR1-UP

### Trivia
Donkey Kong Junior was released in September 1982 in the USA.

The Japanese version, as well as some bootleg versions, have the suffix abbreviated in the printed title rather than fully spelled out ("Donkey Kong Jr."). 

Donkey Kong Junior spawned a cartoon series of the same name : Ruby-Spears Productions. Produced By Joe Ruby, Ken Spears. Originally aired September 17, 1983 as part of 'Saturday Supercade' on CBS.

### Updates
In these versions featuring the suffix fully spelled out in the title screen ('Junior.') : 
1. You are only allowed to enter a name up to three letters long in the High Score list (instead of twelve). 
2. In the Vines and Chains stages, Red Snapjaws regenerate at Mario's feet after being killed by fruit starting in L4 (instead of L5). 

The Japanese boards have all four screens displayed in their original, logical order 1-2-3-4. For the US board, it was changed to somewhat match the original Donkey Kong's 'How High Can You Try/Get?' theme with the screen order as follows : 
L1 : 1-4 (Springboard and Mario's Hideout stages both omitted)
L2 : 1-2-4 (Mario's Hideout stage omitted)
L3 : 1-3-4 (Springboard stage omitted)
From L4 onward, all four stages are displayed in order, as in the Japanese version.

### Ports
NOTE : Only ports released in North America are listed here. For ports released in other regions, please see the Japanese version's entry.

* CONSOLES: 
[US] Colecovision (1982) "Donkey Kong Junior [Model 2601]"
[US] Mattel Intellivision (1983) "Donkey Kong Jr [Model 2671]" 
[US] Atari 2600 (1983) "Donkey Kong Junior [Model 2653]"
Atari XEGS 
[US] Nintendo NES (june.1986) "Donkey Kong Jr. [Model NES-JR-USA]"
[US] Atari 7800 (1988) "Donkey Kong Jr. [Model CX7849]" 

* COMPUTERS: 
[US] Atari 800 (june.1, 1984) "Donkey Kong Junior [Model RX8040]" 
[US] Tandy Color Computer (1983) "Junior's Revenge" 
[US] Tandy Color Computer 3 (1986) "Return of Junior's Revenge" 

* OTHERS: 
[US] LCD tabletop game (1983) "Donkey Kong Junior [Model 2398]"
[US] LCD Game & Watch (1983) "Donkey Kong Jr. [Model CJ-93]"
[US] Tabletop Game (1983) "Donkey Kong Jr [Model CJ-71]"

### Series
1. Donkey Kong (1981)
2. Donkey Kong Junior (1982)
3. Donkey Kong 3 (1983)

### Contribute
Edit this entry: https://www.arcade-history.com/game/669/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `dkong`. Play it at [../../../app/g/dkongjr/](../../../app/g/dkongjr/) or [explore the knowledge graph](viewer.html).*
