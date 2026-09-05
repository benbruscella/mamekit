# Shinobi (set 6, System 16A) (unprotected)

**Sega · 1987** — transpiled from the MAME driver `src/mame/sega/segas16a.cpp` by mamekit.

![marquee](/artwork/media/marquees/shinobi.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/shinobi.webp) | ![cabinet](/artwork/media/cabinets/shinobi.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M68000 | 10.000 MHz | 8 |
| `soundcpu` | Z80 | 4.000 MHz | 3 |

- **Sound:** ym2151 × 1 @ 4.000 MHz
- **Screen:** 320×224 @ 60.00 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `epr-12010.43` | 0x0 | 0x10000 | `7df7f4a2` |
| `maincpu` | `epr-12008.26` | 0x1 | 0x10000 | `f5ae64cd` |
| `maincpu` | `epr-12011.42` | 0x20000 | 0x10000 | `9d46e707` |
| `maincpu` | `epr-12009.25` | 0x20001 | 0x10000 | `7961d07e` |
| `gfx1` | `epr-11264.95` | 0x0 | 0x10000 | `46627e7d` |
| `gfx1` | `epr-11265.94` | 0x10000 | 0x10000 | `87d0f321` |
| `gfx1` | `epr-11266.93` | 0x20000 | 0x10000 | `efb4af87` |
| `sprites` | `epr-11290.10` | 0x1 | 0x8000 | `611f413a` |
| `sprites` | `epr-11294.11` | 0x0 | 0x8000 | `5eb00fc1` |
| `sprites` | `epr-11291.17` | 0x10001 | 0x8000 | `3c0797c0` |
| `sprites` | `epr-11295.18` | 0x10000 | 0x8000 | `25307ef8` |
| `sprites` | `epr-11292.23` | 0x20001 | 0x8000 | `c29ac34e` |
| `sprites` | `epr-11296.24` | 0x20000 | 0x8000 | `04a437f8` |
| `sprites` | `epr-11293.29` | 0x30001 | 0x8000 | `41f41063` |
| `sprites` | `epr-11297.30` | 0x30000 | 0x8000 | `b6e1fd72` |
| `soundcpu` | `epr-11267.12` | 0x0 | 0x8000 | `dd50b745` |
| `upd7751` | `7751.bin` | 0x0 | 0x400 | `6a9534fc` |
| `upd7751data` | `epr-11268.1` | 0x0 | 0x8000 | `6d7966da` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `SERVICE` | 0x1 |
| 6 | coin2 | `SERVICE` | 0x2 |
| 9 | service1 | `SERVICE` | 0x8 |
| 1 | start1 | `SERVICE` | 0x10 |
| 2 | start2 | `SERVICE` | 0x20 |
| C | button3 | `P1` | 0x1 |
| Space / X | button1 | `P1` | 0x2 |
| Z | button2 | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x10 |
| Up | joystick up | `P1` | 0x20 |
| Right | joystick right | `P1` | 0x40 |
| Left | joystick left | `P1` | 0x80 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `SERVICE` | 0x4 | 0x4 |
| Coin A | `DSW1` | 0xf | 0xf |
| Coin B | `DSW1` | 0xf0 | 0xf0 |
| Cabinet | `DSW2` | 0x1 | 0x0 |
| Demo Sounds | `DSW2` | 0x2 | 0x0 |
| Lives | `DSW2` | 0xc | 0xc |
| Difficulty | `DSW2` | 0x30 | 0x30 |
| Enemy's Bullet Speed | `DSW2` | 0x40 | 0x40 |
| Language | `DSW2` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/sega/segas16a.cpp`
- **Written by:** Aaron Giles
- **License:** BSD-3-Clause
- **Development:** 297 commits by 37 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Vas Crabb, Miodrag Milanovic, AJR, Ivan Vangelista

## The story

Arcade Video game published 39 years ago:

Shinobi (c) 1987 Sega Enterprises, Limited.

Shinobi is a scrolling platform beat-em-up in which the player takes on the role of Joe Musashi, a Shinobi Ninja, who must fight his way through 5 tough missions - each made up of between 3 to 5 stages - in his quest to rescue the kidnapped Ninja children of the Iga clan; now hostages of an evil Ninja syndicate called "Zeed". To complete a mission, the player must rescue all of the kidnapped children on each level, with the number of hostages remaining displayed on a meter in the bottom left corner of the screen.

The Shinobi Ninja begins each level armed with either 'shuriken' throwing stars or a gun for long-range attacks; and a Samurai sword for close-range combat. In addition, the Ninja also has one 'Magic Attack' per level; a smart bomb which kills or damages all on-screen enemies. A points bonus is awarded whenever a level is completed without the Magic Attack being used. An end-of-level guardian awaits the player at the end of each mission, and each takes several hits before it is killed. Once a boss is defeated, the player is taken to a bonus stage in which a large number of Ninjas will try to 'jump' from the back of the screen to the front to attack the player. A bonus life is awarded if the player manages to kill all of the Ninjas without being attacked.

Shinobi was a huge success for Sega, and deservedly so. Its perfectly realized blend of platform and fighting action and is as fine an exponent of the 'easy to get into, difficult to master' gameplay ethic as video games have seen.

### Technical
Runs on the Sega "System 16B" hardware.
Game ID : 317-0049

Players : 2
Control : 8-Way Joystick
Buttons : 3 
=> Attack, Jump, Magic

### Trivia
Shinobi was released in November 1987 in Japan.

Re-Editions:
"Shinobi [Model 317-0050]" (16A)
"Shinobi [Model 317-0054]"

Shinobi was one of the many names given to the ninja in feudal Japan. Its literal translation is 'stealer-in'; a reference to what Ninjas specialized in above all else. By employing any number of tricks such as stealth walking and staying upwind of any guard animals, the Shinobi went undetected about his mission. On a more devious level, the Shinobi was also a master of disguise, and would often 'steal in' to village communities disguised as a local, or into enemy palaces disguised as a wandering priest.

Marilyn Monroe's face appears on several posters in the Mission 1 second stage.

A Shinobi cabinet can be seen in the Nickelodeon show All That (from 1997 to 2000). however it used a fictional marquee which was made for the show.

### Scoring
Scoring in this game is very easy. Each enemy is worth 100 points with the exception of the Purple Guard and the Sword Throwing Guard which are worth 500 points. The bosses are 5,000 points apiece. NOTE : The Purple Guards and Sword Throwing Guards are the ones that guard the hostages.

In addition to getting points from killing enemies, you can also score points for time left on the clock after you complete a level. You get 30 points per second of remaining time.

You can also receive special bonuses at the end of each level for certain actions :
1) If you don't use your ninja magic, you get a 5,000 point bonus.
2) If you only use your Ninja-to sword (no Shurikens or gunfire), you get a 20,000 point bonus.

### Tips and tricks
* Unless you are continuing, each game begins at 'Mission 1' and will have everything you need to complete each mission. Each level must be completed within 3 minutes, and all hostages must be rescued before you can exit the level. If you are killed, all hostages rescued prior to your death will still be recorded as rescued. In addition to melee attacks, you will also be able to use a specific Ninja Magic attack once per level. These magical attacks kill everything that is on the screen but you will be awarded a point bonus if you manage to complete a level WITHOUT using your Ninja Magic. The three Ninja Magic attacks are :
1) Multiple-Attack Magic : Allows you to gain lightning-fast speed to attack up to 12 times at once.
2) Tornado Magic : Brings about a magical tornado to blow your enemies away.
3) Lightning Magic : Causes the air to crackle with electricity and destroys your enemies.

* Some general gameplay guidelines :
1) Joe is strictly a one-hit, one-kill character, so you must avoid all enemy attacks or risk losing a life.
2) As you become more practiced at moving around, you won't have to rely on your distance weapons (throwing stars etc.) and can use your ninja sword for close-up kills; the advantage of this is that you can gain the 20,000 point bonus. This also applies to the use of Ninja Magic.
3) Many of the enemies in the later missions will swarm Joe and attack in numbers, it's vitally important to learn to attack-and-jump as quickly as possible otherwise you will be quickly overrun.
4) Your main goal is, of course, to rescue all the hostages to exit the level; and although three minute time limit initially seems quite generous, should you delay too long with the enemies, the time will quickly run out.
5) It's important to become good at the Challenge Levels, since this is the only way to gain extra lives. The Challenge levels will require you to take out around thirty ninjas who are trying to get to your position. There is no real hard and fast strategy other then take them down before they reach the second platform. Challenge Levels occur at the end of every mission.
6) Ninja Magic is a great thing. You must remember, though, that you can only use it once per level. This means you should only use it when you are totally surrounded by enemies and have no other means of escape.
7) All bosses take eight hits to defeat. Of course, you will have to hit them in the right place for that hit to register.

* Stop Gunners : In levels with Bazooka-toting enemies (Rounds 3-2), push one of them against a wall about ten times (always pushing on his direction, never stopping), you'll see then that all Bazooka men and Gun men are no longer able to use their weapons against you.

* Extra lives from hostages : In game are special hostage, you can get 1UP instead points from them. These hostages are : 2nd hostage on stage 2-2, 1st hostage on 2-3, 2nd hostage on 3-1, 5th hostage on 3-2. What you must do to get 1UP instead points? When you get hostage you must have 3 identical digits at end of your score (don't count last digit which is always 0). Example : 70,000, 100,000, 109,990, 68,880, 141110. 1UP icon will appear instead points icon over hostage.

### Staff
Designed by : Noriyoshi Ohba
Staff : Sugachan 26, Wagamama Kenchi, Topi, Gyofunori, Hanachan, Super Haggar, Fanta Jijii, Yamiagari, Shinjuku Otoko

### Ports
* CONSOLES:
[EU] Sega Master System (1988) "Shinobi [Model MK-7009-50]" 
[US] Sega Master System (1988) "Shinobi [Model 7009]" 
[JP] Sega Master System (june.19, 1988) "Shinobi [Model G-1353]" 
[JP] NEC PC-Engine (dec.8, 1989) "Shinobi [Model AS01001]" 
[US] Nintendo NES (1989)
[BR] Sega Master System (1995) "Sapo Xule - O Mestre do Kung Fu [Model 023.500]" 
[US] Microsoft XBOX 360 (feb.10, 2009) "Sonic's Ultimate Genesis Collection [Model 68034]" : as an unlockable extra
[KO] Sony PlayStation 3 (feb.10, 2009) "Sonic's Ultimate Genesis Collection" by SCEI : as an unlockable extra
[US] Sony PlayStation 3 (feb.10, 2009) "Sonic's Ultimate Genesis Collection [Model BLUS-30259]" : as an unlockable extra
[EU] Microsoft XBOX 360 (feb.20, 2009) "SEGA Mega Drive Ultimate Collection [Model 384-40210]" : as an unlockable extra
[EU] [AU] Sony PlayStation 3 (feb.20, 2009) "SEGA Mega Drive Ultimate Collection [Model BLES-00475]" : as an unlockable extra
[AU] Microsoft XBOX 360 (feb.26, 2009) "Sega Mega Drive Ultimate Collection" : as an unlockable extra
[US] [JP] Microsoft XBOX 360 [XBLA] (june.19, 2009) 
[JP] Nintendo Wii [Virtual Console Arcade] (jul.14, 2009) 
[JP] Nintendo Wii [Virtual Console Arcade] (oct.23, 2009) 
[JP] Nintendo Wii [Virtual Console Arcade] (dec.7, 2009) 

* COMPUTERS:
[EU] Sinclair ZX Spectrum (1989) "Shinobi [Model 010443]"
[US] [EU] Commodore C64 (1989)
[EU] Atari ST (1989)
[EU] Commodore Amiga (1989)
[EU] Amstrad CPC (1989) "Shinobi [Model 090186]"
[EU] Amstrad CPC (1989): 128 Ko Disk version.
[EU] MSX (1989)
[US] PC [MS-DOS, 5.25"] (1989)
[EU] Amstrad CPC (1991) "Shinobi [Model 810658]	"
[EU] Sinclair ZX Spectrum (1991) "Shinobi [Model 210816]"

* OTHERS:
[US] Tiger Handheld LCD Game (1988)

### Series
1. Shinobi [Model 317-0049] (1987, Arcade)
2. Shadow Dancer - Kage no Mai (1989, Arcade)
3. The Revenge of Shinobi (1989, Mega Drive)
4. The Cyber Shinobi - Shinobi Part 2 (1990, Master System)
5. The GG Shinobi [Model G-3302] (1991, Game Gear)
6. The GG Shinobi II [Model G-3315] (1992, Game Gear)
7. Shinobi III - Return of the Ninja Master (1993, Mega Drive)
8. Shinobi X (1995, Saturn)
9. The Revenge of Shinobi (2002, Game Boy Advance)
10. Shinobi (2002, PS2)
11. Nightshade (2004, PS2)
12. Shinobi 3D (2011, 3DS)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2416/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `segas16a`. Play it at [../../../app/g/shinobi/](../../../app/g/shinobi/) or [explore the knowledge graph](viewer.html).*
