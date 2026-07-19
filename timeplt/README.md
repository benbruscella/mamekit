# Time Pilot

**Konami · 1982** — transpiled from the MAME driver `src/mame/konami/timeplt.cpp` by mamekit.

![marquee](/artwork/media/marquees/timeplt.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/timeplt.png) | ![cabinet](/artwork/media/cabinets/timeplt.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 13 |
| `tpsound` | Z80 | 1.790 MHz | 7 |

- **Sound:** ay8910 × 2 @ 1.790 MHz
- **Screen:** 256×224 @ 60.00 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `tm1` | 0x0 | 0x2000 | `1551f1b9` |
| `maincpu` | `tm2` | 0x2000 | 0x2000 | `58636cb5` |
| `maincpu` | `tm3` | 0x4000 | 0x2000 | `ff4e0d83` |
| `timeplt_audio:tpsound` | `tm7` | 0x0 | 0x1000 | `d66da813` |
| `tiles` | `tm6` | 0x0 | 0x2000 | `c2507f40` |
| `sprites` | `tm4` | 0x0 | 0x2000 | `7e437c3e` |
| `sprites` | `tm5` | 0x2000 | 0x2000 | `e8ca87b9` |
| `proms` | `timeplt.b4` | 0x0 | 0x20 | `34c91839` |
| `proms` | `timeplt.b5` | 0x20 | 0x20 | `463b2b07` |
| `proms` | `timeplt.e9` | 0x40 | 0x100 | `4bbb2150` |
| `proms` | `timeplt.e12` | 0x140 | 0x100 | `f7b7663e` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 6 | coin2 | `IN0` | 0x2 |
| 9 | service1 | `IN0` | 0x4 |
| 1 | start1 | `IN0` | 0x8 |
| 2 | start2 | `IN0` | 0x10 |
| Left | joystick left | `IN1` | 0x1 |
| Right | joystick right | `IN1` | 0x2 |
| Up | joystick up | `IN1` | 0x4 |
| Down | joystick down | `IN1` | 0x8 |
| Space / X | button1 | `IN1` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW0` | 0xf | 0xf |
| Coin B | `DSW0` | 0xf0 | 0xf0 |
| Lives | `DSW1` | 0x3 | 0x3 |
| Cabinet | `DSW1` | 0x4 | 0x0 |
| Bonus Life | `DSW1` | 0x8 | 0x8 |
| Difficulty | `DSW1` | 0x70 | 0x40 |
| Demo Sounds | `DSW1` | 0x80 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/timeplt.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 142 commits by 21 contributors, 2007–2025
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Michaël Banaan Ananas

## The story

Arcade Video game published 44 years ago:

Time Pilot (c) 1982 Konami Industry Company, Limited.

Time Pilot is a multi-directionally scrolling shoot-em-up in which the player controls a futuristic jet fighter and takes on the role of pilot trying to rescue fellow pilots who are trapped in different time eras. The game consists of five different stages of play, each of which is set in a different time period.

As well as waves of attacking aircraft, each stage also features a large 'mother-ship' boss that must be destroyed to progress to the next stage. The game's five eras, common enemies and the mother-ships are as follows:

* 1910 The age of Biplane: Common enemies are biplanes, the mother-ship is a blimp
    
* 1940 The age of Monoplane: Common enemies are WWII monoplanes, the mother-ship is a B-25 Bomber.
    
* 1970 The age of Helicopter: Common enemies are helicopters, the mother-ship is a large, blue CH-46 Sea Knight
    
* 1982 The age of Jet plane: Common enemies are fighter jets, the mother-ship is a B-52 Bomber
    
* 2001 The age of U.F.O.: Common enemies are UFOs, the mother-ship is a large alien space craft

In the 1910 stage, the biplanes can fire bombs as well as slow-moving yellow bullets. The bombs are initially fired vertically but are affected by gravity, meaning that they will move faster as they fall to the bottom of the screen. 

In the 1940 stage, red-and-yellow supply planes sometimes fly horizontally across the screen. These require multiple hits to take down (much like the mother-ship) and reward the player 1,500 points upon their destruction. They cannot fire at the player and pose no real threat as long as the player does not crash into them.

In the 1970 stage, the helicopters fire homing missiles as well as yellow bullets. The missiles travel slightly faster than the player but cannot make sharp turns. The player can destroy missiles by shooting them or can avoid them by turning sharply.

In the 1982 stage, the jets can fire homing missiles as well as yellow bullets and are aggressive.

In the 2001 stage, the UFOs fire fast-moving circular bullets that blend in with the background. The asteroids on screen will not hurt the player but will serve to camouflage the enemies and their missiles.

All stages except the 2001 stage have parachutes that can be collected (these are the aforementioned trapped pilots). The mother-ships are destroyed with seven direct hits and once all five eras have been completed, the stages start over again with an increased level of difficulty.

### Technical
Game ID : GX393

Main CPU : Zilog Z80 (@ 3.072 Mhz)
Sound CPU : Zilog Z80 (@ 1.789772 Mhz)
Sound Chips : (2x) General Instrument AY8910 (@ 1.789772 Mhz), (6x) RC (@ 1.789772 Mhz)

Players : 2
Control : 8-way joystick
Buttons : 1 (FIRE)

### Trivia
Time Pilot was released in November 1982 in Japan.

Yoshiki Okamoto was told to design a driving game. When he learned of the game's concept, he balked at making it and started on Time Pilot. As development continued, Okamoto showed his boss design docs for the driving game, all the while working on Time Pilot. Although his boss told him to do the driving game instead, he tried to take the credit for Time Pilot. Okamoto decided not to disgrace his boss and let the episode go!!

The background moves in the opposite direction to the player's plane, rather than the other way around; the player's plane always remains in the center.

The 1910 and 2001 stages are never played in the attract mode.

### Updates
Centuri and Atari versions :
* The jet plane stage is 1983 instead of 1982.
* The 2001 stage IS played in the attract mode.

### Scoring
Biplane/Fighter/Helicopter/Jet/UFO : 100 points.
Bomb/Missile : 100 points.
Mother Ship : 3,000 points.
Bomber (1940 stage only) : 1,500 points.
Formation Bonus : 2,000 points.
Parachute : 1,000, 2,000, 3,000, 4,000, 5,000 points.

### Tips and tricks
* GAME INSTRUCTIONS :
l. Control your plane with joystick. Avoid being hit by bullets, bombs and missiles. Do not crash into enemy planes.
2. Advance to next stage by destroying 56 enemies and 7 hits on Mother Ship.
3. Dock with parachutes for bonus points.
4. Bonus plane after 10,000 points, 60,000 points and each additional 50,000 points.
5. Game over when all of your planes are destroyed.

* The enemy planes/ships find it hardest to shoot you when you are moving in a diagonal direction, so move this way the majority of the time. Just remember to watch your back!

* Since your ship is very maneuverable you can turn through 180 degrees very quickly to pick off an enemy directly behind you. Simply move the joystick or use the keys to face in the opposite direction and you will flip round.

* Homing missiles - keep firing to destroy them. Alternatively, move your fighter so that the missiles move off screen, and they do not return.

* The Mother Ships always move horizontally across the screen. Wait until they pass you, and then move directly behind them. You can then shoot them at will to destroy them. Again, it takes seven hits to destroy a Mother Ship.

* Concentrate on collecting the parachutists where possible, as these represent your biggest potential points haul. On Stage 2 (A.D. 1940), you can leave a few planes remaining and collect parachutists for as long as possible, as this stage has no homing missiles and also more parachutists than Stage 1.

* If you are killed by colliding with an enemy ship, you are registered with the points as if you had shot it. This means extra lives are still awarded and also if you collide with the Mother Ship, you will advance to the next stage, providing you have at least one life remaining.

* A Way To Get A Great Score : Finish the 1910 stage as soon as possible. On the 1940 stage, don't shoot anything!! Eventually, parachutes will start to appear. Collect the parachutes while avoiding the planes. Each parachute (after #4) will give you 5,000 points. It's possible to roll the machine over (999,999+ points) while remaining on Stage 2 using this strategy. By the way, while using this cheat you can also shoot the 1,500-point bombers without causing the time bar to be shortened.

### Staff
Programmed by : Toshio Arima
Designed by : Yoshiki Okamoto
Character by : Hideki Ooyama
Sound by : Mashahiro Inoue

### Ports
* CONSOLES: 
[JP] Sony PlayStation (may.13, 1999) "Konami 80's Arcade Gallery [Model SLPM-86228]" 
[JP] Sony PS2 (jul.21, 2005) "Time Pilot [Oretachi Geasen Zoku] [Model SLPM-62644]" 
Microsoft XBOX 360 [XBLA] [JP] (aug.30, 2006) 

* HANDHELDS: 
[JP] Nintendo GBA (may.2, 2002) "Konami Arcade Game Collection [Model AGB-AKCJ-JPN]" 
[JP] Nintendo DS (mar.15, 2007) "Konami Arcade Collection [Model NTR-A5KJ-JPN]" 

* COMPUTERS: 
[JP] MSX (1983) 

* OTHERS:
i-mode Mobile Phones [JP] (2004)

### Series
1. Time Pilot (1982)
2. Time Pilot '84 - Further Into Unknown World (1984)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2906/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `timeplt`. Play it at [../app/g/timeplt/](../app/g/timeplt/) or [explore the knowledge graph](viewer.html).*
