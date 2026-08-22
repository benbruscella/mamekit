# Gun.Smoke (World, 1985-11-15)

**Capcom · 1985** — transpiled from the MAME driver `src/mame/capcom/gunsmoke.cpp` by mamekit.

![marquee](/artwork/media/marquees/gunsmoke.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/gunsmoke.webp) | ![cabinet](/artwork/media/cabinets/gunsmoke.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.000 MHz | 18 |
| `audiocpu` | Z80 | 3.000 MHz | 5 |

- **Sound:** ym2203 × 2 @ 1.500 MHz
- **Screen:** 256×224 @ 59.64 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `gs03.09n` | 0x0 | 0x8000 | `40a06cef` |
| `maincpu` | `gs04.10n` | 0x8000 | 0x8000 | `8d4b423f` |
| `maincpu` | `gs05.12n` | 0x10000 | 0x8000 | `2b5667fb` |
| `audiocpu` | `gs02.14h` | 0x0 | 0x8000 | `cd7a2c38` |
| `chars` | `gs01.11f` | 0x0 | 0x4000 | `b61ece9b` |
| `tiles` | `gs13.06c` | 0x0 | 0x8000 | `f6769fc5` |
| `tiles` | `gs12.05c` | 0x8000 | 0x8000 | `d997b78c` |
| `tiles` | `gs11.04c` | 0x10000 | 0x8000 | `125ba58e` |
| `tiles` | `gs10.02c` | 0x18000 | 0x8000 | `f469c13c` |
| `tiles` | `gs09.06a` | 0x20000 | 0x8000 | `539f182d` |
| `tiles` | `gs08.05a` | 0x28000 | 0x8000 | `e87e526d` |
| `tiles` | `gs07.04a` | 0x30000 | 0x8000 | `4382c0d2` |
| `tiles` | `gs06.02a` | 0x38000 | 0x8000 | `4cafe7a6` |
| `sprites` | `gs22.06n` | 0x0 | 0x8000 | `dc9c508c` |
| `sprites` | `gs21.04n` | 0x8000 | 0x8000 | `68883749` |
| `sprites` | `gs20.03n` | 0x10000 | 0x8000 | `0be932ed` |
| `sprites` | `gs19.01n` | 0x18000 | 0x8000 | `63072f93` |
| `sprites` | `gs18.06l` | 0x20000 | 0x8000 | `f69a3c7c` |
| `sprites` | `gs17.04l` | 0x28000 | 0x8000 | `4e98562a` |
| `sprites` | `gs16.03l` | 0x30000 | 0x8000 | `0d99c3b3` |
| `sprites` | `gs15.01l` | 0x38000 | 0x8000 | `7f14270e` |
| `bgtiles` | `gs14.11c` | 0x0 | 0x8000 | `0af4f7eb` |
| `proms` | `g-01.03b` | 0x0 | 0x100 | `02f55589` |
| `proms` | `g-02.04b` | 0x100 | 0x100 | `e1e36dd9` |
| `proms` | `g-03.05b` | 0x200 | 0x100 | `989399c0` |
| `proms` | `g-04.09d` | 0x300 | 0x100 | `906612b5` |
| `proms` | `g-06.14a` | 0x400 | 0x100 | `4a9da18b` |
| `proms` | `g-07.15a` | 0x500 | 0x100 | `cb9394fc` |
| `proms` | `g-09.09f` | 0x600 | 0x100 | `3cee181e` |
| `proms` | `g-08.08f` | 0x700 | 0x100 | `ef91cdd2` |
| `proms` | `g-10.02j` | 0x800 | 0x100 | `0eaf5158` |
| `proms` | `g-05.01f` | 0x900 | 0x100 | `25c90c2a` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x10 |
| 5 | coin1 | `SYSTEM` | 0x40 |
| 6 | coin2 | `SYSTEM` | 0x80 |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Down | joystick down | `P1` | 0x4 |
| Up | joystick up | `P1` | 0x8 |
| Z | button1 | `P1` | 0x10 |
| X / Space | button2 | `P1` | 0x20 |
| C | button3 | `P1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Bonus Life | `DSW1` | 0x3 | 0x3 |
| Demo | `DSW1` | 0x4 | 0x4 |
| Cabinet | `DSW1` | 0x8 | 0x0 |
| Difficulty | `DSW1` | 0x30 | 0x30 |
| Freeze | `DSW1` | 0x40 | 0x40 |
| Service Mode | `DSW1` | 0x80 | 0x80 |
| Coin A | `DSW2` | 0x7 | 0x7 |
| Coin B | `DSW2` | 0x38 | 0x38 |
| Allow Continue | `DSW2` | 0x40 | 0x40 |
| Demo Sounds | `DSW2` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/capcom/gunsmoke.cpp`
- **Written by:** Paul Leaman
- **License:** BSD-3-Clause
- **Development:** 120 commits by 26 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, hap

## The story

Arcade Video game published 41 years ago:

Gun.Smoke (c) 1985 Capcom  Company, Limited.

Gun.Smoke is a vertically-scrolling shoot-em-up set in the Wild West, in which the player takes the role of a Billy; a young Sheriff charged with hunting down and killing a number of infamous 'Wanted' outlaws.

Each level is packed with gun-toting bandits and the Sheriff must shoot his way through the stage, before finally taking on the wanted outlaw 'boss' character at the end. Each outlaw wields a special weapon unique to them, such as a Winchester rifle, knives, darts or boomerangs.

Shooting the barrels that litter the levels reveals power-ups such as boots (for extra speed), rifles (for increased range) and bullets (for rapid fire). The game's 3 directional fire buttons (for firing left, right or ahead) can be combined (pressed Simultaneously) to create a total of 8 different firing directions.

### Technical
Main CPU : Zilog Z80 (@ 4 Mhz)
Sound CPU : Zilog Z80 (@ 3 Mhz)
Sound Chips : (2x) Yamaha YM2203 (@ 1.5 Mhz)

Players : 2
Control : 8-way joystick
Buttons : 3

### Trivia
Gun.Smoke was released in October 1985 in Japan. 

Gun.Smoke is based on the old famous T.V. series of the same name, the first TV broadcast was on September 10, 1955, and it ran until March 31, 1975. A total of 633 episodes were aired over the 20 seasons - only the last nine seasons being made in colour. 

Jaime Guzman holds the official record for this game with 1465250 points. 

Alfa Records released a limited-edition soundtrack album for this game (Capcom Game Music - 28XA-94) on August 25, 1986.

### Updates
WORLD version :
* You can enter 3 chars for your initials.

JAPAN version (but English text though) :
* You can enter 8 chars for your initials.

### Tips and tricks
* An Interesting Bug : When you're on Level 2, make sure you have a horse when you kill Roy Knife. Once he is dead, walk over his corpse and your horse will be killed. Roy raises from the dead as a sort of indestructible zombie. You can shoot him as much as you like, but he won't die. In this way you can play until you get tired of it. 

* Secrect Character : If the total of inserted credit (NOT current credit) is a multiple of 16 (16, 32, 48...), the secret character 'Aka-jirou' (Red-dragonfly) appears and you can get 10000 pts when you kill it. 
The number of dragonflies at one time is changed by current total inserted credit, for example : 64 credits = 4 dragonflies, 128 credits = 8 dragonfiles. 
But in case of 256 credits, 50 dragonflies appear instead of 16!

### Staff
From highscore table : Shi2Kura, ?Sakura?, Ota=Big5
Music by : Ayako Mori (Kura<3Aya)
Character designer: Noritaka Funamizu
Producer : Yoshiki Okamoto (Kihaji Okamoto)

### Ports
NOTE: For ports released in North America, please see the Romstar conversion kit entry.

* CONSOLES: 
Nintendo Famicom Disk System [JP] (jan.27, 1988) "Gun.Smoke [Model CAP-GUN]" 
[EU] Nintendo NES (feb.23, 1989) "Gun.Smoke [Model NES-GK-EEC]" 
[JP] Sega Saturn (nov.12, 1998) "Capcom Generation Dai 4 Shou Kokou no Eiyuu [Model T-1235G]" 
[JP] Sony PlayStation (nov.12, 1998) "Capcom Generation Dai 4 Shou Kokou no Eiyuu [Model SLPS-01701]" 
[EU] Sony PlayStation (sept.3, 1999) "Capcom Generations 4 - Blazing Guns [Capcom Generations Disc 4] [Model SLES-31881]" 
[EU] Microsoft XBOX (nov.18, 2005) "Capcom Classics Collection" 
[EU] Sony PS2 (nov.18, 2005) "Capcom Classics Collection [Model SLES-53661]" 
[JP] Sony PS2 (mar.2, 2006) "Capcom Classics Collection [Model SLPM-66317]" 
Sony PlayStation 3 [PSN] [JP] (feb.19, 2013) "Capcom Arcade Cabinet [Model NPJB-00210]" 
Sony PlayStation 3 [PSN] [EU] (feb.20, 2013) "Capcom Arcade Cabinet" 
Microsoft XBOX 360 [XBLA] [JP] (feb.20, 2013) "Capcom Arcade Cabinet" 
Microsoft XBOX 360 [XBLA] [EU] (feb.20, 2013) "Capcom Arcade Cabinet" 
Microsoft XBOX 360 [XBLA] [AU] (feb.21, 2013) "Capcom Arcade Cabinet" 

* HANDHELDS: 
[JP] Sony PSP (sept.7, 2006) "Capcom Classics Collection [Model ULJM-05104]" 
[EU] Sony PSP (nov.10, 2006) "Capcom Classics Collection Reloaded [Model ULES-00377]" 
[AU] Sony PSP (nov.16, 2006) "Capcom Classics Collection Reloaded" 

* COMPUTERS: 
[EU] Commodore C64 (1987) 
[EU] Amstrad CPC (1987) "Desperado - Gun.Smoke" 
[EU] Sinclair ZX Spectrum (1987)

### Series
1. Gun.Smoke (1985)
2. Desperado 2 (1989, Amstrad CPC)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1045/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `gunsmoke`. Play it at [../../../app/g/gunsmoke/](../../../app/g/gunsmoke/) or [explore the knowledge graph](viewer.html).*
