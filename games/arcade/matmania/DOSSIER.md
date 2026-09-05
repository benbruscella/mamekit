# Mat Mania

**Technos Japan (Taito America license) · 1985** — transpiled from the MAME driver `src/mame/technos/matmania.cpp` by mamekit.

![marquee](/artwork/media/marquees/matmania.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/matmania.webp) | ![cabinet](/artwork/media/cabinets/matmania.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M6502 | 1.500 MHz | 14 |
| `audiocpu` | M6502 | 1.000 MHz | 7 |

- **Sound:** ay8910 × 2 @ 1.500 MHz
- **Screen:** 256×240 @ 57.44 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `k0-03` | 0x4000 | 0x4000 | `314ab8a4` |
| `maincpu` | `k1-03` | 0x8000 | 0x4000 | `3b3c3f08` |
| `maincpu` | `k2-03` | 0xc000 | 0x4000 | `286c0917` |
| `audiocpu` | `k4-0` | 0x8000 | 0x4000 | `86dab489` |
| `audiocpu` | `k5-0` | 0xc000 | 0x4000 | `4c41cdba` |
| `chars` | `ku-02` | 0x0 | 0x2000 | `613c8698` |
| `chars` | `kv-02` | 0x2000 | 0x2000 | `274ce14b` |
| `chars` | `kw-02` | 0x4000 | 0x2000 | `7588a9c4` |
| `tiles` | `kt-02` | 0x0 | 0x4000 | `5d817c70` |
| `tiles` | `ks-02` | 0x4000 | 0x4000 | `2e9f3ba0` |
| `tiles` | `kr-02` | 0x8000 | 0x4000 | `b057d3e3` |
| `sprites` | `k6-00` | 0x0 | 0x4000 | `294d0878` |
| `sprites` | `k7-00` | 0x4000 | 0x4000 | `0908c2f5` |
| `sprites` | `k8-00` | 0x8000 | 0x4000 | `ae8341e1` |
| `sprites` | `k9-00` | 0xc000 | 0x4000 | `752ac2c6` |
| `sprites` | `ka-00` | 0x10000 | 0x4000 | `46a9cb16` |
| `sprites` | `kb-00` | 0x14000 | 0x4000 | `bf016772` |
| `sprites` | `kc-00` | 0x18000 | 0x4000 | `8d08bce7` |
| `sprites` | `kd-00` | 0x1c000 | 0x4000 | `af1d6a60` |
| `sprites` | `ke-00` | 0x20000 | 0x4000 | `614f19b0` |
| `sprites` | `kf-00` | 0x24000 | 0x4000 | `bdf58c18` |
| `sprites` | `kg-00` | 0x28000 | 0x4000 | `2189f5cf` |
| `sprites` | `kh-00` | 0x2c000 | 0x4000 | `6b11ed1f` |
| `sprites` | `ki-00` | 0x30000 | 0x4000 | `d7ac4ec5` |
| `sprites` | `kj-00` | 0x34000 | 0x4000 | `2caee05d` |
| `sprites` | `kk-00` | 0x38000 | 0x4000 | `eb54f010` |
| `sprites` | `kl-00` | 0x3c000 | 0x4000 | `fa4c7e0c` |
| `sprites` | `km-00` | 0x40000 | 0x4000 | `6d2369b6` |
| `sprites` | `kn-00` | 0x44000 | 0x4000 | `c55733e2` |
| `sprites` | `ko-00` | 0x48000 | 0x4000 | `ed3c3476` |
| `sprites` | `kp-00` | 0x4c000 | 0x4000 | `9c84a969` |
| `sprites` | `kq-00` | 0x50000 | 0x4000 | `fa2f0003` |
| `proms` | `matmania.1` | 0x0 | 0x20 | `1b58f01f` |
| `proms` | `matmania.5` | 0x20 | 0x20 | `2029f85f` |
| `proms` | `matmania.2` | 0x40 | 0x20 | `b6ac1fd5` |
| `proms` | `matmania.16` | 0x60 | 0x20 | `09325dc2` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `IN0` | 0x1 |
| Left | joystick left | `IN0` | 0x2 |
| Up | joystick up | `IN0` | 0x4 |
| Down | joystick down | `IN0` | 0x8 |
| Space / X | button1 | `IN0` | 0x10 |
| Z | button2 | `IN0` | 0x20 |
| 6 | coin2 | `IN0` | 0x40 |
| 5 | coin1 | `IN0` | 0x80 |
| 1 | start1 | `IN1` | 0x40 |
| 2 | start2 | `IN1` | 0x80 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW1` | 0x3 | 0x3 |
| Coin B | `DSW1` | 0xc | 0xc |
| Demo Sounds | `DSW1` | 0x10 | 0x10 |
| Cabinet | `DSW1` | 0x20 | 0x0 |
| Service Mode | `DSW1` | 0x40 | 0x40 |
| Difficulty | `DSW2` | 0x3 | 0x2 |
| Tournament Time | `DSW2` | 0xc | 0xc |
| Unused | `DSW2` | 0x10 | 0x10 |
| Unused | `DSW2` | 0x20 | 0x20 |
| Unused | `DSW2` | 0x40 | 0x40 |
| Unused | `DSW2` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/technos/matmania.cpp`
- **Written by:** Brad Oliver
- **License:** BSD-3-Clause
- **Development:** 137 commits by 24 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, hap

## The story

Arcade Video game published 41 years ago:

Mat Mania - The Prowrestling Network (c) 1985 Taito America Corp.

Export version. For more information about the game itself, please see the original Japanese version entry; "Exciting Hour - The Prowrestling Network".

### Technical
Game ID : TA-0015

### Trivia
Mat Mania was released in October 1985 by Taito America, under license from Technos Japan.

In this version, TWA stands for Taito Wrestling Association. The ingame original misspelling of Insane Warrior's name has been corrected. Also, Blues Bloody is now called 'Golden Hulk'. (in reference of Hulk Hogan who debuted wrestling as 'Sterling Golden'. Golden Hulk's most powerful move is the leg drop, which is Hogan's finisher).

A 2-Player version of this game is known as "Mania Challenge".

Rac Carpana holds the official record for this game with 5,000,150 points.

### Ports
* CONSOLES: 
Sony PlayStation 4 [PSN] [US] (mar.24, 2015) "Arcade Archives - Mat Mania Exciting Hour [Model CUSA-00973]" 
Sony PlayStation 4 [PSN] [EU] [AU] (aug.24, 2015) "Arcade Archives - Mat Mania Exciting Hour [Model CUSA-02486]"

### Series
1. Tag Team Wrestling (1983)
2. Mat Mania - The Prowrestling Network (1985)
3. Mania Challenge (1986)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1580/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `matmania`. Play it at [../../../app/g/matmania/](../../../app/g/matmania/) or [explore the knowledge graph](viewer.html).*
