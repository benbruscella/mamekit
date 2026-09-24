# NBA Jam (rev 3.01 4/07/93)

**Midway · 1993** — transpiled from the MAME driver `src/mame/williams/midtunit.cpp` by mamekit.

![marquee](/artwork/media/marquees/nbajam.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/nbajam.webp) | ![cabinet](/artwork/media/cabinets/nbajam.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | TMS34010 | 50.000 MHz | 21 |
| `adpcm:cpu` | MC6809E | 2.000 MHz | 11 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 400×254 @ 54.71 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `adpcm:cpu` | `l2_nba_jam_u3_sound_rom.u3` | 0x10000 | 0x20000 | `3a3ea480` |
| `adpcm:oki` | `l1_nba_jam_u12_sound_rom.u12` | 0x0 | 0x80000 | `b94847f1` |
| `adpcm:oki` | `l1_nba_jam_u13_sound_rom.u13` | 0x80000 | 0x80000 | `b6fe24bd` |
| `maincpu` | `l3_nba_jam_game_rom_uj12.uj12` | 0x0 | 0x80000 | `b93e271c` |
| `maincpu` | `l3_nba_jam_game_rom_ug12.ug12` | 0x1 | 0x80000 | `407d3390` |
| `video` | `l1_nba_jam_game_rom_ug14.ug14` | 0x0 | 0x80000 | `04bb9f64` |
| `video` | `l1_nba_jam_game_rom_uj14.uj14` | 0x1 | 0x80000 | `b34b7af3` |
| `video` | `l1_nba_jam_game_rom_ug19.ug19` | 0x2 | 0x80000 | `a8f22fbb` |
| `video` | `l1_nba_jam_game_rom_uj19.uj19` | 0x3 | 0x80000 | `8130a8a2` |
| `video` | `l1_nba_jam_game_rom_ug16.ug16` | 0x200000 | 0x80000 | `8591c572` |
| `video` | `l1_nba_jam_game_rom_uj16.uj16` | 0x200001 | 0x80000 | `d2e554f1` |
| `video` | `l1_nba_jam_game_rom_ug20.ug20` | 0x200002 | 0x80000 | `44fd6221` |
| `video` | `l1_nba_jam_game_rom_uj20.uj20` | 0x200003 | 0x80000 | `f9cebbb6` |
| `video` | `l1_nba_jam_game_rom_ug17.ug17` | 0x400000 | 0x80000 | `6f921886` |
| `video` | `l1_nba_jam_game_rom_uj17.uj17` | 0x400001 | 0x80000 | `b2e14981` |
| `video` | `l1_nba_jam_game_rom_ug22.ug22` | 0x400002 | 0x80000 | `ab05ed89` |
| `video` | `l1_nba_jam_game_rom_uj22.uj22` | 0x400003 | 0x80000 | `59a95878` |
| `video` | `l1_nba_jam_game_rom_ug18.ug18` | 0x600000 | 0x80000 | `5162d3d6` |
| `video` | `l1_nba_jam_game_rom_uj18.uj18` | 0x600001 | 0x80000 | `fdee0037` |
| `video` | `l1_nba_jam_game_rom_ug23.ug23` | 0x600002 | 0x80000 | `7b934c7a` |
| `video` | `l1_nba_jam_game_rom_uj23.uj23` | 0x600003 | 0x80000 | `427d2eee` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Up | joystick up | `IN0` | 0x1 |
| Down | joystick down | `IN0` | 0x2 |
| Left | joystick left | `IN0` | 0x4 |
| Right | joystick right | `IN0` | 0x8 |
| Z | p1 shoot / block | `IN0` | 0x10 |
| C | p1 pass / steal | `IN0` | 0x20 |
| Space / X | p1 turbo | `IN0` | 0x40 |
| 5 | coin1 | `IN1` | 0x1 |
| 6 | coin2 | `IN1` | 0x2 |
| 1 | start1 | `IN1` | 0x4 |
| 2 | start2 | `IN1` | 0x20 |
| 9 | service1 | `IN1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN1` | 0x10 | 0x10 |
| Test Switch | `DSW` | 0x1 | 0x1 |
| Powerup Test | `DSW` | 0x2 | 0x0 |
| Unused | `DSW` | 0x4 | 0x4 |
| Unused | `DSW` | 0x8 | 0x8 |
| Unused | `DSW` | 0x10 | 0x10 |
| Video Clips | `DSW` | 0x20 | 0x20 |
| Dollar Bill Validator | `DSW` | 0x40 | 0x40 |
| Players | `DSW` | 0x80 | 0x80 |
| Coin Counters | `DSW` | 0x300 | 0x300 |
| Country | `DSW` | 0xc00 | 0xc00 |
| Coinage | `DSW` | 0x7000 | 0x7000 |
| Coinage Source | `DSW` | 0x8000 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/williams/midtunit.cpp`
- **Written by:** Alex Pasadyn, Zsolt Vasvari, Ernesto Corvi, Aaron Giles
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Aaron Giles (driver header); Alex Pasadyn (driver header); Ernesto Corvi (driver header); Zsolt Vasvari (driver header); hap (2 release notes); cam900 (1 release note); cuavas (1 release note); Phil Bennett (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 131 commits by 30 commit authors, 2007–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Arcade Video game published 33 years ago:

NBA Jam (c) 1993 Midway Mfg. Co.

Two-on-two basketball with digitized images of real NBA players, monster dunks and no referee - it's a blowout!

### Technical
Midway T Unit hardware

Main CPU : TMS34010 (@ 6.25 Mhz)
Sound CPU : Motorola M6809 (@ 2 Mhz)
Sound Chips : Yamaha YM2151 (@ 3.57958 Mhz), DAC, OKI6295 (@ 8 Khz)

Players : 4
Control : 8-way joystick
Buttons : 3

### Trivia
Released in February 1993. Many critics claim that the release of NBA Jam gave rise to a new genre of sports games, which were based around action-packed, unrealistic game-play.

Midway Games, no stranger to releasing landmark games having released "Pac-Man", had started experimenting with the ideas two years earlier, with the "High Impact Football" series. Both High Impact and Super High Impact had somewhat average success in arcades. It was not until the release of NBA Jam that gamers noticed the new genre. The game became exceptionally popular, and generated a lot of money for arcades after its release, largely because of the fairly expensive prices put on these games; a game quarter generally took two credits and a full game generally took eight, typically equal to $2.00 USD. Nonetheless, the game was a smash hit.

NBA Jam was one of the first real playable basketball arcade games (It was the first game to be officially licensed by the NBA (National Basketball Association)), and was also one of the first sports games to feature real teams, real players, and their real digitized likenesses. However, the unrealism of the game was the major drawing point, as the high flying dunks (often featuring players jumping twice their own height in the air while making highly acrobatic slams) were the games' signature. Of course, seeing NBA superstars like Hakeem Olajuwon, Karl Malone, David Robinson, Charles Barkley, and Shaquille O'Neal flying through the air with the greatest of ease brought just as many fans back. In time, players discovered another major feature of the game, as it was filled with easter eggs, special features and players activated by initials or button/joystick combinations.

### Updates
Revision 2
* Software version 3.01.
* Credit problems fixed.
* Jersey color of special guests fixed.
* Prevents games from ending at the Tank mini-game.
* Added 'Fair Shake'.

Revision 1
* Software version: 2.00.

Proto V2
* Dated Jan. 24, 1993.

Proto V1
* Dated Jan. 23, 1993.

### Tips and tricks
* Hidden Characters :
Air Morris - WIL, Jan 1
Carleton - JMC, Aug 5
Divita - SAL, Feb 1 (Sal Divita did the artwork for NBA Jam, as well as some graphics work on Mortal Kombat)
Goskie - TWG, Dec 7
Hey - JWH, Sep 20 (On the design team screen, Jon Hey is the one in the checkered shirt and glasses, sticking his tongue out to the rest of the world)
Howard - HOW, Jul 15
Liptak - SL(space), Jun 24 (Shawn Liptak is the one on the design team screen with a basketball for a brain)
Newcomer - JRN, Jun 18
Oursler - SNO, Jan 3
Petro - GNP, Oct 8 (George N. Petro is the main designer of "Terminator 2 - Judgement day")
Rivett - RJR, Jan 17 (Jamie Rivett helped with the autostat portion of NBA Jam)
Scott - TON, Jul 03 (Tony Scoot helped with digitizing the player movements and performed many of the special dunks)
Turmell - MJT, Mar 22 (Mark J. Turmell is the main designer and programmer for NBA Jam)

* Big Head : Hold Up+Turbo+Steal at 'Tonight's match up'.

* Powerup :
Defense - Press Steal or Block 8 times when it says 'Tonight's match up'.
Intercept - Hold Down joystick and hold all three buttons during 'Tonight's match up'.
Offense - press Steal or Block 21 times at 'Tonight's match up'.
Defense and Intercept - At 'Tonight's Match-Up', Press the Shoot button 7 times, then all at once, hold Down the joystick and all three buttons.
Powerup Defense and Big head - press Turbo 6 times, hold Turbo and Steal, then hold the joystick Up at 'Tonight's match-up'.
Fair Shake - Tap turbo 10 times when it says 'Tonight's match up'. The Fair shake can ONLY be done in Human vs. Human games and ONLY on machines that are version 3.0 or greater.
Fair Shake and Powerup Intercept - press Turbo 7 times, then hold Turbo+Pass+Shoot, then hold the joystick Down at 'Tonight's match-up'.
Fair Shake and Big head - Press turbo 8 times, then hold Turbo+Steal and hold the joystick Up.

* Tank Mini-Game : Hold all buttons for all four players and press Down on all four joysticks at the 'Tonight's match up'. Keep the controls held until the mini-game begins.

### Staff
Design team : Mark Turmell (MJT), Shawn Liptak (SL), Tony Goskie, John Carlton (JMC), Sal Divita (SAL), Jamie Rivett
Music and Sounds : Jon Hey (JWH)
Hardware support : Cary Mednick, Pat Cox, Ray Macika, Sheridan Oursler, Matt Booty, John Lowes, Al Lasko
Executive producers : Neil Nicastro, Ken Fedesna, Wally Smolucha
Cast : Stephen Howard, Willie Morris Jr., Todd Mcclearn, Tony Scoot, Kerri Hoskins, Lorraine Olivia, awards by Kaydan.

### Ports
* CONSOLES:
Nintendo Super Famicom (1993)
Sega Mega Drive (1993)
Sega Game Gear (1993)
Nintendo Game Boy (1993)
Sega Mega CD (1993)

### Series
1. NBA Jam (1993)
2. NBA Jam Tournament Edition (1994)
3. NBA Hangtime (1996)
4. NBA Maximum Hangtime (1996)
5. NBA Jam Extreme (1996)
6. NBA Jam 99 (1998, N64)
7. NBA Showtime - NBA on NBC (1999)
8. NBA Jam 2000 (1999, N64)
9. NBA Jam 2001 (2000, GBC)
10. NBA Jam 2002 (2002, GBA)
11. NBA Jam (2003, PS2, X-Box)
12. NBA Jam 2004 (2003, unreleased GameCube prototype)
13. NBA Jam (2010, Nintendo Wii)
14. NBA Jam - On Fire Edition (2011, PSN, XBOX Live)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1733/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `midtunit`. Play it at [../../../app/g/nbajam/](../../../app/g/nbajam/) or [explore the knowledge graph](viewer.html).*
