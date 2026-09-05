# Carnival (upright, AY8912 music)

**Sega · 1980** — transpiled from the MAME driver `src/mame/sega/vicdual.cpp` by mamekit.

![marquee](/artwork/media/marquees/carnival.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/carnival.webp) | ![cabinet](/artwork/media/cabinets/carnival.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 1.934 MHz | 4 |
| `audiocpu` | I8035 | 3.580 MHz | 1 |

- **Sound:** ay8910 × 1 @ 1.193 MHz
- **Screen:** 256×224 @ 60.00 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `epr-651.u33` | 0x0 | 0x400 | `9f2736e6` |
| `maincpu` | `epr-652.u32` | 0x400 | 0x400 | `a1f58beb` |
| `maincpu` | `epr-653.u31` | 0x800 | 0x400 | `67b17922` |
| `maincpu` | `epr-654.u30` | 0xc00 | 0x400 | `befb09a5` |
| `maincpu` | `epr-655.u29` | 0x1000 | 0x400 | `623fcdad` |
| `maincpu` | `epr-656.u28` | 0x1400 | 0x400 | `53040332` |
| `maincpu` | `epr-657.u27` | 0x1800 | 0x400 | `f2537467` |
| `maincpu` | `epr-658.u26` | 0x1c00 | 0x400 | `fcc3854e` |
| `maincpu` | `epr-659.u8` | 0x2000 | 0x400 | `28be8d69` |
| `maincpu` | `epr-660.u7` | 0x2400 | 0x400 | `3873ccdb` |
| `maincpu` | `epr-661.u6` | 0x2800 | 0x400 | `d9a96dff` |
| `maincpu` | `epr-662.u5` | 0x2c00 | 0x400 | `d893ca72` |
| `maincpu` | `epr-663.u4` | 0x3000 | 0x400 | `df8c63c5` |
| `maincpu` | `epr-664.u3` | 0x3400 | 0x400 | `689a73e8` |
| `maincpu` | `epr-665.u2` | 0x3800 | 0x400 | `28e7b2b6` |
| `maincpu` | `epr-666.u1` | 0x3c00 | 0x400 | `4eec7fae` |
| `proms` | `316-0633.u49` | 0x0 | 0x20 | `f0084d80` |
| `audiocpu` | `epr-412.u5` | 0x0 | 0x400 | `0dbaa2b0` |
| `user1` | `316-0206.u14` | 0x0 | 0x20 | `9617d796` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | joystick left | `IN1` | 0x10 |
| Right | joystick right | `IN1` | 0x20 |
| 1 | start1 | `IN2` | 0x10 |
| Space / X | button1 | `IN2` | 0x20 |
| 2 | start2 | `IN3` | 0x20 |
| 5 | coin1 | `COIN` | 0x1 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Unused | `IN0` | 0x4 | 0x0 |
| Unused | `IN0` | 0x8 | 0x0 |
| Demo Sounds | `IN0` | 0x10 | 0x0 |
| Unused | `IN1` | 0x4 | 0x0 |
| Unused | `IN2` | 0x4 | 0x0 |
| Unused | `IN3` | 0x4 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/sega/vicdual.cpp`
- **Written by:** Zsolt Vasvari
- **License:** BSD-3-Clause
- **Development:** 255 commits by 35 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, Michaël Banaan Ananas, Vas Crabb

## The story

Arcade Video game published 46 years ago:

Carnival (c) 1980 Gremlin/Sega Ind., Incorporated.

CARNIVAL is a 1 or 2 player alternate action game that simulates a carnival shooting gallery. The playfield consists of three target rows, a rotating pipe wheel, a bonus message panel, and a 'special' target block.

The player uses a left right control to position a rifle at the bottom of the screen, and a shoot control to fire the rifle. Two rows of bullets at the bottom of the screen indicate the number of shots remaining to the player. Every time the player shoots, one of the bullets disappears from the screen. More bullets are given during the first round than the others, so, the inexperienced player will have a chance to enjoy the play.

The game ends when the player runs out of bullets. This can occur on any round. A round ends when the player clears the playfield of all targets. At this point, a special 'shoot the bear' sequence appears, and when this is finished the player proceeds to the next more difficult (and higher scoring) round. This is Gremlin's Multi-Phase design concept that keeps games challenging to players of all levels.

When a player completes a round (ending with 'shoot the bear' sequence), the screen flips to the other player. When the original player resumes play, he advances to the next level of difficulty, exactly as he would have if the screen had not flipped to the other player. This method allows the players to more directly compare their scores, since they are always within one round of each other. Note that the player who ends the game first does not necessarily lose--he might still have the higher score when the game ends.

The three target rows move in a horizontal line from left to right (top row), right to left (middle row) and left to right (bottom row). There are five types of targets. The rows move as a continuous band--the targets exiting the playfield from the right side of the bottom row reappear at the left of the top row. The point value for hitting a row target is indicated along the right side of the game--maximum points for a top row target, medium points for a middle row target, and minimum points for a bottom row target. These values increase from round to round.

Rabbits and owls are simple targets, which disappear when hit.

Numbered sign targets award additional bullets to the player when hit, as well as awarding the points indicated for the row. These targets appear only on the top two rows to make them relatively difficult targets.

Five small letters, B, 0, N, U and S are randomly interspersed through the target rows. At the upper right of the playfield is the word ''bonus" spelled out is small letters. If the player manages to hit the moving bonus letters in order (b-o-n-u-s) a special bonus is awarded. The fact that the bonus is still active is shown by the bonus word in the upper right of the playfield. Every time a bonus letter in the correct order is hit, the small corresponding letter in the bonus panel enlarges to show that it has been hit. Whenever a bonus letter is hit out of order, the bonus panel disappears until the next round. The bonus panel reappears at the beginning of every round. The bonus value is determined by adding row target points into the bonus value. When the "B" letter is hit, the bonus value freezes for that round. This encourages waiting as long as possible before attempting to score the bonus.

Ducks are special targets. Whenever a duck reaches the bottom row, it is capable of leaving the row and flying down toward the player. If the duck manages to get past the player's rifle without being shot, it flies down to the bullet row and quickly eats 10 bullets. A maximum of three ducks can escape simultaneously.

The target rows move as a continuous band of targets, and no new owls, rabbits, or bonus letter targets are added once the round starts. 'More shots' targets and ducks are added during a round. The frequency of adding duck targets is tied to the round number. As the rounds get more difficult, more ducks are added as the round progresses.

A flying duck hit scores no points.

Bullets left over at the end of a round earn 50 points each.

The between rounds 'shoot the bear' sequence operates as a shooting gallery bear. Whenever the bear is hit, it rears up, roars, and continues motion in the opposite direction. Each hit speeds up the bear, and increases the point value, which is shown above the bear for each hit. When the bear leaves the screen (which it will always do eventually, since it speeds up with each hit) the between rounds sequence ends and a new round begins. As the rounds progress, more bears (a maximum of 4) appear on the screen simultaneously.

A special yellow-rimmed score panel appears in the upper left of the playfield, and stays on for random lengths of time. Four types of panels appear here, which either add or subtract points or bullets. Hitting any part of the panel border awards the score shown inside.

The bullet bonus panel is shown with a large plus sign, and a row of bullets. Immediately after appearing, the bullets begin disappearing fairly rapidly. When the bullets are depleted, the panel disappears. If hit, the player is awarded the number of bullets left in the panel when it was hit.

The score bonus is shown with the same large plus sign, and a score value. As with the bullets, the score value quickly decreases, until it hits zero and disappears.

The minus panels are similar to those above except a large minus sign indicates the number of bullets or points subtracted when hit. This discourages the practice of parking on the left margin and shooting--a miss will hit the negative target. These panels show a fixed number of bullets or points, and after a random time interval, disappear.

The pipe wheel contains 8 pipes of 4 different colors. A panel beneath the wheel restricts pipe hits to horizontally oriented pipes, and also indicates the point value for hitting a pipe. Every shot the player takes decrements the pipe value, except a shot which hits a pipe. This makes it advisable to hit pipes early in the round, when it is most difficult (since the player must shoot through heavily populated target rows). Hitting two pipes of the same color with two consecutive shots awards a bonus of four times the pipe value shown in the panel.

CARNIVAL is accompanied by background music. At the beginning of every round, the music begins at a slow rate and relatively low key. As the round progresses, the music speeds up and the melody shifts up in key. This gives the player a growing sense of urgency. As the round progresses, the playfield motion also gradually speeds up.

A small panel on the right of the playfield contains a musical note symbol. If the player wishes to turn off the music, he simply shoots the note panel. This makes the note disappear, and turns off the music. Hitting the panel again makes the note reappear and resumes the music. The note thus acts as a 'flip-flop' switch to turn the music on and off.

Every round begins with the music on.

There is a special case to consider near the end of a round: the player has cleared all of the targets except the ducks, and has plenty of bullets left so that he can simply sit and wait for the ducks. He would, in effect, prolong the game by refusing to end the round.

Theoretically, by hitting the ducks and 'more shots' signs, the round could be prolonged indefinitely. However, an internal "doomsday" timer in the game keeps track of how long a round has lasted. After a certain time limit (the same for each round), the frequency of new duck appearances increases dramatically.

The top 3 scores are shown during advertising, along with the player's initials. A player who scores in the top 3 is allowed to enter 3 initials by a special routine explained at the time of their writing. The rank is updated during the round. The player is both audibly and visually rewarded. There is a pronounced audible sound as the player's score passes that of another ranking player's score. And, they may watch their rank progress during the game.

CARNIVAL's basic play action is outlined below, as it appears in the game instructions.

Shoot all targets and pipes to advance to the next round.
Game is over when you run out of bullets.
Escaped ducks eat 10 bullets.
Hit B-O-N-U-S letters in sequence for special bonus. Bonus value stops increasing when 'B' is hit.
Hit same color pipes with 2 consecutive shots to score 4 times pipe value. Shoot number signs for more bullets.
Shoot the bear between rounds for extra points.

### Technical
[Upright model]

There were 2 different upright cabinets available for this game. The first upright was the standard Sega/Gremlin woodgrain cabinet. The second was a white cabinet.

The upright machines were decorated in mostly orange, with a circus theme. The woodgrain ones often did not have sideart, but the white ones usually did. Both versions used buttons on the control panel for movement.

Game ID : 651-666

Main CPU : Zilog Z80 (@ 1.93356 Mhz)
Sound CPU : I8039 (@ 238.636 Khz)
Sound Chips : General Instrument AY8910 (@ 1.193181 Mhz)

Screen orientation : Vertical
Video resolution : 224 x 256 pixels
Screen refresh : 60.00 Hz
Palette colors : 64

Players : 1
Buttons : 5
Player-1 start, Player-2 start, Move Left, Move Right, Fire

### Trivia
Released during June 1980.

Also released as "Carnival [Cocktail model]".

CARNIVAL contains the following sounds :
A clang sound every time a row target or bear is hit;
A pipe hit sound whenever a pipe is hit;
A bear roar whenever the bear is hit and rears up;
Three different duck quack sounds, to accompany up to three simultaneously escaped ducks;
A bonus sound for lighting the BONUS letters in the correct order;
A secondary bonus sound for pipe bonus and special panel bonus;
A rank sound as the player's score moves up in rank;
Background music; 
Rifle shot.

Fred Pastore holds the official record for this game with 386,750 points on June 3, 2001.

A Carnival unit appears in the 1983 movie 'Joysticks'.

### Scoring
Shooting the bonus box at the top left: the score inside the box (+ or -).
Shooting an object in the top row scores the points at the right of the screen level with the top row (50, 60, etc).
A hit in the 2nd row scores the points at the right of the screen level with the 2nd row (30, 40, etc).
A hit in the bottom row scores the points at the right of the screen level with the bottom row (10, 20, etc).
A hit on a polar bear in the intermission screen scores 50 points.

### Tips and tricks
* Make any ducks on the lowest level your priority at the start of a screen, as they will soon swoop down to steal some of your ammunition.

* Keep an eye out for the passing boxed '5' and '10' symbols, as these award 5 or 10 extra bullets respectively when shot. You won't have enough ammo to complete a screen without at least hitting a few of these.

* You can stay to the left of the screen, which will enable you to pick off any good bonuses in the bonus box at an early stage. Don't get too trigger happy though, or you might be dropping your score or losing a lot of ammo too quickly if you hit a negative 'bonus'.

* The key to getting a lot of hits on the polar bear(s) in the bonus stage is to concentrate on only one bear and hit it as close to dead centre as possible. If you do this keep firing rapidly and you'll rack up a few points as it won't be able to escape from a constant barrage of bullets.

* Extra bullet '5' and '10's only appear on the top two rows and don't reappear at the top after going offscreen from the middle row so make sure you pick them off whenever possible.

### Staff
Lead Programmer : Medo Moreno
Programmer : Helene Schlein
Programmer : Murphy Bivens

### Ports
* CONSOLES:
Colecovision (1982)
Mattel Intellivision (1982)
Atari 2600 (1982)

* COMPUTERS:
Sinclair ZX-Spectrum (1984) "Carnival" by Eclipse Software.

### Contribute
Edit this entry: https://www.arcade-history.com/game/394/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `vicdual`. Play it at [../../../app/g/carnival/](../../../app/g/carnival/) or [explore the knowledge graph](viewer.html).*
