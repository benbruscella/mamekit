# Traverse USA / Zippy Race

**Irem · 1983** — transpiled from the MAME driver `src/mame/irem/travrusa.cpp` by mamekit.

![marquee](/artwork/media/marquees/travrusa.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/travrusa.webp) | ![cabinet](/artwork/media/cabinets/travrusa.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 11 |
| `irem_audio:iremsound` | M6803 | 3.580 MHz | 3 |

- **Sound:** ay8910 × 2 @ 0.895 MHz
- **Screen:** 240×256 @ 56.74 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `zr1-0.m3` | 0x0 | 0x2000 | `be066c0a` |
| `maincpu` | `zr1-5.l3` | 0x2000 | 0x2000 | `145d6b34` |
| `maincpu` | `zr1-6a.k3` | 0x4000 | 0x2000 | `e1b51383` |
| `maincpu` | `zr1-7.j3` | 0x6000 | 0x2000 | `85cd1a51` |
| `irem_audio:iremsound` | `mr10.1a` | 0x7000 | 0x1000 | `a02ad8a0` |
| `tiles` | `zippyrac.001` | 0x0 | 0x2000 | `aa8994dd` |
| `tiles` | `mr8.3c` | 0x2000 | 0x2000 | `3a046dd1` |
| `tiles` | `mr9.3a` | 0x4000 | 0x2000 | `1cc3d3f4` |
| `sprites` | `zr1-8.n3` | 0x0 | 0x2000 | `3e2c7a6b` |
| `sprites` | `zr1-9.l3` | 0x2000 | 0x2000 | `13be6a14` |
| `sprites` | `zr1-10.k3` | 0x4000 | 0x2000 | `6fcc9fdb` |
| `proms` | `mmi6349.ij` | 0x0 | 0x200 | `c9724350` |
| `proms` | `tbp18s.2` | 0x200 | 0x20 | `a1130007` |
| `proms` | `tbp24s10.3` | 0x220 | 0x100 | `76062638` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 5 | coin1 | `SYSTEM` | 0x8 |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Space / X | button1 | `P1` | 0x20 |
| Z | button2 | `P1` | 0x80 |
| 6 | coin2 | `P2` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Fuel Reduced on Collision | `DSW1` | 0x3 | 0x3 |
| Fuel Consumption | `DSW1` | 0x4 | 0x4 |
| Allow Continue | `DSW1` | 0x8 | 0x0 |
| Coinage | `DSW1` | 0xf0 | 0xf0 |
| Flip Screen | `DSW2` | 0x1 | 0x1 |
| Cabinet | `DSW2` | 0x2 | 0x0 |
| Coin Mode | `DSW2` | 0x4 | 0x4 |
| Speed Type | `DSW2` | 0x8 | 0x8 |
| Stop Mode (Cheat) | `DSW2` | 0x10 | 0x10 |
| Title | `DSW2` | 0x20 | 0x20 |
| Invulnerability (Cheat) | `DSW2` | 0x40 | 0x40 |
| Service Mode | `DSW2` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/irem/travrusa.cpp`
- **Written by:** Lee Taylor
- **License:** BSD-3-Clause
- **Development:** 127 commits by 25 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Olivier Galibert

## The story

Arcade Video game published 43 years ago:

Traverse USA (c) 1983 Irem corporation.

An excellent motorcycle racing game. 

Enjoy the wind of American landscape, accelerating hard your motorbike across highways and desert roads, evading the rivals cars and obstacles on challenging narrow roads and curves, and take a good amount of fuel, to finish the race before running out of fuel!

The levels (and cities) are:
Los Angeles,
Las Vegas,
Houston,
St. Louis,
Chicago,
New York.

The 3 engine classes in this game are: 500 cc, 750 cc and 1200 cc. The higher the engine class is, the higher the speed is, but the motorcycle is harder to control.

The Las Vegas -> Houston and St. Louis -> Chicago stages are ridden across deserts, where the remaining stages - on asphalt roads.

### Technical
Irem M-52 hardware

Main CPU: Zilog Z80 (@ 4 Mhz)
Sound CPU: Motorola M6803 (@ 894.886 Khz)
Sound Chips: (2x) General Instrument AY8910 (@ 894.886 Khz), (2x) MSM5205 (@ 384 Khz)

Players: up to 2 (alternate)
Control: 2-way joystick
Buttons: 2
[A] = accelerate, [B] = brake

### Trivia
Traverse USA was released in June 1983. Exported to the USA as "MotoRace USA" with license for Williams electronics inc. Another export release is "MotoTour" licensed to Tecfri S.A.

Later re-released as "Zippy Race". The title can be changed in dip switches, from Traverse USA to Zippy Race.

The speed unit is also changeable in the switches, from a mile per hour to a kilometer per hour.

The engine classes are written in a cubic centimeter, independent on the release.

### Tips and tricks
* Hold both buttons to temporarily block speed. Release to go back to normal speed.

* The bike will ride (a bit) slower on desert roads even on the asphalt parts leading to cities.

* You can't control your bike or speed when jumping on desert roads. You can regulate the speed when performing a wheelie (on asphalt), though.

* You'll be unable to finish 1st after 500 cc class: the enemies are also faster.

* You'll get a full tank after a class completion (reach New York), so you may finish with half fuel.

* Watch out for trucks on deserts: the drivers throw barrels down the off-road. Overtake the trucks.

### Contribute
Edit this entry: https://www.arcade-history.com/game/2961/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `travrusa`. Play it at [../../../app/g/travrusa/](../../../app/g/travrusa/) or [explore the knowledge graph](viewer.html).*
