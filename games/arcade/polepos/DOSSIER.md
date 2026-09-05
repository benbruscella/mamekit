# Pole Position (World)

**Namco · 1982** — transpiled from the MAME driver `src/mame/namco/polepos.cpp` by mamekit.

![marquee](/artwork/media/marquees/polepos.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/polepos.webp) | ![cabinet](/artwork/media/cabinets/polepos.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 15 |
| `sub1` | Z8002 | 3.072 MHz | 8 |
| `sub2` | Z8002 | 3.072 MHz | 8 |

- **Sound:** wsg @ 0.048 MHz
- **Screen:** 256×224 @ 60.61 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `pp3_9.6h` | 0x0 | 0x2000 | `c0511173` |
| `maincpu` | `pp1_10b.5h` | 0x2000 | 0x1000 | `7174bcb7` |
| `sub1` | `pp3_1.8m` | 0x1 | 0x2000 | `65c1c2c2` |
| `sub1` | `pp3_2.8l` | 0x0 | 0x2000 | `fafb9049` |
| `sub2` | `pp3_5.4m` | 0x1 | 0x2000 | `46e5c99a` |
| `sub2` | `pp3_6.4l` | 0x0 | 0x2000 | `acc1ebc3` |
| `chars` | `pp3_28.1f` | 0x0 | 0x1000 | `2e77187e` |
| `tiles` | `pp1_29.1e` | 0x0 | 0x1000 | `706e888a` |
| `sprites` | `pp3_25.1n` | 0x0 | 0x2000 | `b52c086b` |
| `sprites` | `pp3_26.1m` | 0x2000 | 0x2000 | `d24a5707` |
| `bigsprites` | `pp1_17.5n` | 0x0 | 0x2000 | `2e134b46` |
| `bigsprites` | `pp1_19.4n` | 0x2000 | 0x2000 | `43ff83e1` |
| `bigsprites` | `pp1_21.3n` | 0x4000 | 0x2000 | `5f958eb4` |
| `bigsprites` | `pp1_18.5m` | 0x8000 | 0x2000 | `6f9997d2` |
| `bigsprites` | `pp1_20.4m` | 0xa000 | 0x2000 | `ec18075b` |
| `bigsprites` | `pp1_22.3m` | 0xc000 | 0x2000 | `1d2f30b1` |
| `road` | `pp1_30.3a` | 0x0 | 0x2000 | `ee6b3315` |
| `road` | `pp1_31.2a` | 0x2000 | 0x2000 | `6d1e7042` |
| `road` | `pp1_32.1a` | 0x4000 | 0x1000 | `4e97f101` |
| `scalelut` | `pp1_27.1l` | 0x0 | 0x1000 | `a61bff15` |
| `proms` | `pp1-7.8l` | 0x0 | 0x100 | `f07ff2ad` |
| `proms` | `pp1-8.9l` | 0x100 | 0x100 | `adbde7d7` |
| `proms` | `pp1-9.10l` | 0x200 | 0x100 | `ddac786a` |
| `proms` | `pp2-10.2h` | 0x300 | 0x100 | `1e8d0491` |
| `proms` | `pp1-11.4d` | 0x400 | 0x100 | `0e4fe8a0` |
| `proms` | `pp1-15.9a` | 0x500 | 0x100 | `2d502464` |
| `proms` | `pp1-16.10a` | 0x600 | 0x100 | `027aa62c` |
| `proms` | `pp1-17.11a` | 0x700 | 0x100 | `1f8d0df3` |
| `proms` | `pp1-12.3c` | 0x800 | 0x400 | `7afc7cfc` |
| `proms` | `pp3-6.6m` | 0xc00 | 0x400 | `63fb6057` |
| `proms` | `pp1-13.8e` | 0x1000 | 0x20 | `4330a51b` |
| `proms` | `pp1-14.9e` | 0x1020 | 0x20 | `4330a51b` |
| `namco` | `pp1-5.3b` | 0x0 | 0x100 | `8568decc` |
| `engine` | `pp1_15.6a` | 0x0 | 0x2000 | `b5ad4d5f` |
| `engine` | `pp1_16.5a` | 0x2000 | 0x2000 | `8fdd2f6f` |
| `52xx` | `pp2_11.2e` | 0x0 | 0x2000 | `5b4cf05e` |
| `52xx` | `pp2_12.2f` | 0x2000 | 0x2000 | `32b694c2` |
| `52xx` | `pp2_13.1e` | 0x4000 | 0x2000 | `8842138a` |
| `user1` | `pp1-4.9h` | 0x0 | 0x100 | `2401c817` |
| `51xx:mcu` | `51xx.bin` | 0x0 | 0x400 | `c2f57ef8` |
| `52xx:mcu` | `52xx.bin` | 0x0 | 0x400 | `3257d11e` |
| `53xx:mcu` | `53xx.bin` | 0x0 | 0x400 | `b326fecb` |
| `54xx:mcu` | `54xx.bin` | 0x0 | 0x400 | `ee7357e0` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| C | gear change | `IN0` | 0x2 |
| 5 | coin1 | `IN0` | 0x10 |
| 6 | coin2 | `IN0` | 0x20 |
| 9 | service1 | `IN0` | 0x40 |
| Down | pedal2 | `BRAKE` | 0xff |
| Up | pedal | `ACCEL` | 0xff |
| Left | dial left | `STEER` | 0xff |
| Right | dial right | `STEER` | 0xff |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN0` | 0x80 | 0x80 |
| Coin A | `DSWA` | 0xe0 | 0xe0 |
| Coin B | `DSWA` | 0x18 | 0x18 |
| Game Time | `DSWA` | 0x6 | 0x6 |
| Racing Laps | `DSWA` | 0x1 | 0x1 |
| Practice Rank | `DSWB` | 0xe0 | 0x60 |
| Extended Rank | `DSWB` | 0x1c | 0x14 |
| Speed Unit | `DSWB` | 0x2 | 0x0 |
| Demo Sounds | `DSWB` | 0x1 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/namco/polepos.cpp`
- **Written by:** Ernesto Corvi, Juergen Buchmueller, Alex Pasadyn, Aaron Giles, Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 262 commits by 33 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, AJR, Ivan Vangelista

## The story

Arcade Video game published 44 years ago:

Pole Position (c) 1982 Namco.

Pole Position is a 1-player game using a color raster-scan video display. Game action takes place at the Fuji Speedway in Japan. The scenery around the speedway consists of green meadows, hills, and snow-capped Mt. Fuji. 

The player drives a Formula-1 race car on the track. The first objective of the game is to finish the qualifying lap as quickly as possible. If the player beats the clock, he or she qualifies for the race. If not, he or she drives out the remainder of the time along the qualifying course. 

As a qualifier, the player is ranked according to his or her qualifying lap time, from the 1st (pole) position to the 8th. The second objective of the game is to race against the clock and other cars to finish the specified number of laps ('Nr. of Laps' dip switch setting; 3 laps is the default) of the race as fast as possible and to achieve the highest score possible. The player earns points for passing cars, driving on the track, and finishing the race with time remaining. He or she is rewarded with an extended-play lap for completing the first lap within a certain amount of time (depending on the 'Extended Rank' dip switch setting). 

The game starts with the player's car behind the starting line and a certain amount of time, in seconds ('Game Time' dip switch setting; the default is 90 seconds), will be on the clock. The player's car must finish the qualifying lap within a certain amount of time (which varies depending on the 'Practice Rank' dip switch setting) to be in the race. If the player does not qualify, his or her car continues on the track until the 'Game Time' elapses.

If the player has qualified, just before the race begins, the player's car (flashing on the screen) is placed at the starting line with seven other cars. The position of the car depends on the position earned during the qualifying lap. (The player's car is always placed at the 8th position in the attract mode.)

The starting lights flash from red to green, and the race begins. Racing hazards are other racing cars, sharp turns, road signs, and water puddles. (All of these hazards except for water puddles are also present on the qualifying lap.) As the race progresses, more cars appear on the track. If the player's car hits another car or a road sign, it is destroyed in an explosion. The player's car reappears in a few seconds and the race continues. Driving through water puddles or off the track slows down the player's car. 

Racing into the first turn, the player must let up on the accelerator slightly to make the corner. Road signs flash along the side of the track. Depending on how well the player manipulates the controls, he or she can either roar through the hairpin turns like a champion or spin out in a flaming crash. He or she jockeys for position with the other racers, while keeping his or her eye on the clock at the top of the screen. When time runs out, the race is over. If the player has beaten the racing lap time and has seconds remaining, the remaining seconds are added to the extended lap time, which varies depending on the 'Extended Rank' dip switch setting. 

The top score achieved by a player appears at the top of the screen. The time allotted for the lap is displayed under the top score. Increasing lap time (in seconds and hundredths of a second) and the speed of the car appears last.

### Technical
[Upright model] 

Game ID : PP 

Main CPU : Zilog Z80 (also drives the sound), Zilog Z8002 (x2) 
Sound Chips : Namco 6-channel stereo WSG, DAC (engine sound), discrete circuitry (crash and skid sounds), custom DAC (speech) 

Players : 1 
Controls : Steering wheel, gear shifter (Hi and Low) 
Pedals : Accelerator only

### Trivia
Pole Position was released in September 1982 in Japan.

When Pole Position was introduced, players lined up in arcades around the world to grip the steering wheel and stomp on the gas pedal of a driving game so realistic that the players -- just like their cars -- were swerving around the corners. Pole Position was a 14-carat contribution to the golden age of video games. It started the trend for photo-realism in video game graphics. In addition to great graphics, it had great game play and was a huge success, dominating game charts for almost about two years. 

Pole Position was the first driving game to be based on a real circuit. The action takes place at Fuji Speedway in Japan. The snow-capped Mt. Fuji appears in the background.

* A place in video game history : "Pole Position stands out as the racing game that really appealed to the general public," said Chris Lindsey, director of the National Video Game and Coin-Op Museum in St. Louis. "It went into arcades across the nation, where it can still be found. Pole Position machines were placed everywhere -- even in gas stations!". The popularity of Pole Position was based on its realism. Players felt as if they were actually in the driver's seat. "Racing games before Pole Position tended to have a top-down perspective in which you floated over the course, which wasn't terribly realistic," Lindsey said. "Pole Position's eye-level point of view gave it a great deal of realism, and this point of view became a standard for racing games that followed. In addition, it provided a lot of peripheral cues. You saw lots of things zipping by on the side of the screen and this really added to the excitement of the game. Pole Position also had great sound. You could hear the gears winding out in the stretches. As you zipped by another car, you could hear that car's engine. All of these details added to the overall effect. Pole Position was, and still is, an awfully nice game."

 * The great 25-cent escape : Chris Lindsey believes that a big reason why Pole Position has remained such a timeless classic is that it has always appealed to women, in addition to men. "I think there are quite a few game developers who would like to figure out why some games appeal to females," Lindsey said. "Perhaps this is just pop psychology, but I've seen two types of games women will take to: racing games, and games in which the character, or your representation on screen, is doing something besides destroying bad guys. I don't know if that's the correct way to describe it, but that is what I've seen. I've had occasion to work in different types of entertainment facilities, large and small, very modern and, of course, the museum. Without fail I see women take to 'Pac-Man', and I see them take to racing games, almost regardless of what the racing game is." 

* Lindsey said the comparative lack of violence in Pole Position and other racing games might explain their popularity with women -- as well as with men. "I think violence in games is fairly thoughtless for men, and for some women, the violence in a video game may stick out," Lindsey said. "Violence in gaming is not an experience that most people seek even though they like video games. When those people find games that are engaging, and that offer outstanding game play, there is a desire on their part to dive into it. These racing games really offer that." 

* Namco notes : The engineers who created Pole Position knew they had created something special when a steering wheel was first connected to the prototype game in their lab. Later, when Pole Position was released, engineers visiting the arcades found that the waiting lines were so long that they curled back and forth within the arcade and then extended out the door.

Pole Position is widely cursed by collectors as having the worst hardware design of any arcade game released in the 1980s. Internal documents that have recently surfaced bear this fact out. The circuit board underwent a large number of modifications and design changes that, while finally allowing the game to function, made the boards fragile. Proof can be found by the piles of Pole Position video PCBs with burnt edge connectors sitting on collectors' workbenches. Working replacement Pole Position PCBs are very hard to find these days, and almost all of the known repair shops won't even look at them, much less attempt to fix them.

Les Lagier holds the official record for this game with 67,310 points.

A Pole Position cockpit model appears in the 1983 movie 'Joysticks'.

A Pole Position upright model appears in the Judas Priest music video 'Freewheel Burning'. The gameplay shows the head of Rob Halford (lead singer) in the player's car.

### Scoring
Points are scored for every foot of track driven. 

At the end of the game, 50 points are scored for each car the driver passed. 
Finishing the game awards 200 points for each second left on the timer. 

Qualifying Lap Placement Bonus : 
(Qualifying times vary depending on the 'Practice Rank' dip switch setting)
Pole Position (1st place) : 4,000 points 
2nd place : 2,000 points 
3rd place : 1,400 points 
4th place : 1,000 points 
5th place : 800 points 
6th place : 600 points 
7th place : 400 points 
8th place : 200 points

### Tips and tricks
* Hints for Game Play : 
1) Avoid puddles and the sides of the track because these slow you down. 
2) Accelerate before the green light appears, and stay ahead of other racers. 
3) Drive to the inside of the track to make the corners. 
4) Successful completion of a turn depends on braking skill. 
5) Engine sound will cue the driver when to shift to high gear.
6) When sliding, steer into the skid. 

* Instead of pressing down on the gas pedal for acceleration, placing your foot underneath the gas pedal and lifting the pedal up with your instep caused the car to go even faster.

### Staff
Sound : Nobuyuki Ohnogi

### Ports
NOTE: For ports released in North America, please see the Atari version entry. 

* CONSOLES: 
[JP] Sony PlayStation (nov.22, 1995) "Namco Museum Vol.1 [Model SLPS-00107]" 
[AU] Sony PlayStation (1996) "Namco Museum Vol.1 [Model SCES-00243]" 
[EU] Sony PlayStation (aug.1996) "Namco Museum Vol.1 [Model SCES-00243]" 
[JP] Sony PS2 (jan.26, 2006) "Namco Museum Arcade Hits! [Model SLPS-25590]" 
[EU] Microsoft XBOX (mar.24, 2006) "Namco Museum - 50th Anniversary" 
[EU] Sony PS2 (mar.31, 2006) "Namco Museum - 50th Anniversary [Model SLES-53957]" 
[EU] Nintendo GameCube (may.5, 2006) "Namco Museum - 50th Anniversary [Model DOL-G5NP-EUR]" 
[EU] Microsoft XBOX 360 (may.15, 2009) "Namco Museum - Virtual Arcade" 
[AU] Microsoft XBOX 360 (june.4, 2009) "Namco Museum - Virtual Arcade" 
[JP] Microsoft XBOX 360 (nov.5, 2009) "Namco Museum - Virtual Arcade [Model 2RD-00001]" 

* HANDHELDS: 
[EU] Nintendo GBA (dec.7, 2001) "Namco Museum [Model AGB-ANMP-EUR]" 
[JP] Nintendo GBA (dec.7, 2001) "Namco Museum [Model AGB-ANMJ-JPN]" 

* COMPUTERS: 
[EU] Commodore C64 (1984) 
[EU] BBC Micro (1984) 
[EU] Sinclair ZX Spectrum (1984) 
[US] PC [MS DOS] (1988)
[AU] PC [MS Windows, CD-ROM] (mar.27, 2006) "Namco Museum - 50th Anniversary" 
[EU] PC [MS Windows, CD-ROM] (may.19, 2006) "Namco Museum - 50th Anniversary"

* OTHERS: 
[EU] Apple iPhone/iPod (2008) "Pole Position Remix" : Features updated graphics, music, and all of the tracks from "Pole Position II" plus a new track.

### Series
1. Pole Position (1982)
2. Pole Position II (1983)
3. Final Lap (1987)
4. Final Lap UR (1988)
5. Final Lap Twin (1989, NEC PC-Engine)
6. Final Lap 2 (1990)
7. Final Lap 3 (1992)
8. Final Lap R (1994)
9. Final Lap 2000 (2000, Bandai WonderSwan)
10. Final Lap Special (2001, Bandai WonderSwan Color)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2000/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `polepos`. Play it at [../../../app/g/polepos/](../../../app/g/polepos/) or [explore the knowledge graph](viewer.html).*
