# Jungle King (Japan)

**Taito · 1982** — transpiled from the MAME driver `src/mame/taito/taitosj.cpp` by mamekit.

![marquee](/artwork/media/marquees/junglek.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/junglek.webp) | ![cabinet](/artwork/media/cabinets/junglek.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 4.000 MHz | 37 |
| `audiocpu` | Z80 | 3.000 MHz | 11 |

- **Sound:** ay8910 × 4 @ 1.500 MHz
- **Screen:** 256×224 @ 59.19 Hz · rotated 180°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `kn21-1.bin` | 0x0 | 0x1000 | `45f55d30` |
| `maincpu` | `kn22-1.bin` | 0x1000 | 0x1000 | `07cc9a21` |
| `maincpu` | `kn43.bin` | 0x2000 | 0x1000 | `a20e5a48` |
| `maincpu` | `kn24.bin` | 0x3000 | 0x1000 | `19ea7f83` |
| `maincpu` | `kn25.bin` | 0x4000 | 0x1000 | `844365ea` |
| `maincpu` | `kn46.bin` | 0x5000 | 0x1000 | `27a95fd5` |
| `maincpu` | `kn47.bin` | 0x6000 | 0x1000 | `5c3199e0` |
| `maincpu` | `kn28.bin` | 0x7000 | 0x1000 | `194a2d09` |
| `maincpu` | `kn60.bin` | 0x11000 | 0x1000 | `1a9c0a26` |
| `audiocpu` | `kn37.bin` | 0x0 | 0x1000 | `dee7f5d4` |
| `audiocpu` | `kn38.bin` | 0x1000 | 0x1000 | `bffd3d21` |
| `audiocpu` | `kn59-1.bin` | 0x2000 | 0x1000 | `cee485fc` |
| `gfx` | `kn29.bin` | 0x0 | 0x1000 | `8f83c290` |
| `gfx` | `kn30.bin` | 0x1000 | 0x1000 | `89fd19f1` |
| `gfx` | `kn51.bin` | 0x2000 | 0x1000 | `70e8fc12` |
| `gfx` | `kn52.bin` | 0x3000 | 0x1000 | `bcbac1a3` |
| `gfx` | `kn53.bin` | 0x4000 | 0x1000 | `b946c87d` |
| `gfx` | `kn34.bin` | 0x5000 | 0x1000 | `320db2e1` |
| `gfx` | `kn55.bin` | 0x6000 | 0x1000 | `70aef58f` |
| `gfx` | `kn56.bin` | 0x7000 | 0x1000 | `932eb667` |
| `proms` | `eb16.22` | 0x0 | 0x100 | `b833b5ea` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | joystick left | `IN0` | 0x1 |
| Right | joystick right | `IN0` | 0x2 |
| Down | joystick down | `IN0` | 0x4 |
| Up | joystick up | `IN0` | 0x8 |
| Space / X | button1 | `IN0` | 0x10 |
| 6 | coin2 | `IN2` | 0x10 |
| 5 | coin1 | `IN2` | 0x20 |
| 1 | start1 | `IN2` | 0x40 |
| 2 | start2 | `IN2` | 0x80 |
| 9 | service1 | `IN3` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Finish Bonus | `DSW1` | 0x3 | 0x3 |
| Unused | `DSW1` | 0x4 | 0x4 |
| Lives | `DSW1` | 0x18 | 0x18 |
| Service Mode | `DSW1` | 0x20 | 0x20 |
| Flip Screen | `DSW1` | 0x40 | 0x0 |
| Cabinet | `DSW1` | 0x80 | 0x0 |
| Coin A | `DSW2` | 0xf | 0x0 |
| Coin B | `DSW2` | 0xf0 | 0x0 |
| Bonus Life | `DSW3` | 0x3 | 0x3 |
| Unused | `DSW3` | 0x4 | 0x4 |
| Unused | `DSW3` | 0x8 | 0x8 |
| Unused | `DSW3` | 0x10 | 0x10 |
| Year Display | `DSW3` | 0x20 | 0x20 |
| Infinite Lives | `DSW3` | 0x40 | 0x40 |
| Coin Slots | `DSW3` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/taito/taitosj.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 218 commits by 32 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, hap

## The story

Arcade Video game published 44 years ago:

Jungle King (c) 1982 Taito.

Jungle King is a jungle adventure game where players take on the role of Jungle King, a Tarzan-like jungle man, who is going in search of his Jungle Princess, who has been kidnapped by a pair of barbaric cannibals. 

Jungle King has four stages, each with its own unique scenarios, so each stage could be considered a separate game in its own right. 

It is noticeable that this game scrolls from right to left, while the vast majority of scrollers go from left to right, although most people probably wouldn't even notice that. 

Jungle King's gameplay is very similar to that of Activision's "Pitfall", a classic arcade game released on many home computer and console formats of the time. 

The game's stages are as follows : 
* The first stage, which may have been the best stage in the game, is set in a forest with a series of swinging vines. Players must use the JUMP button to move from right to left across the vines, while avoiding the monkeys that can send Jungle King falling to the ground. This level is easy to master, but players must time their jumps carefully to make it to the next vine. 
* The second stage is set under a jungle river. Players must guide Jungle King through a river infested with alligators and crocodiles. This stage features a 'breath meter' that must be carefully watched to avoid drowning (players simply swim up to the surface to get more air). Jungle King is armed with a knife with which he can stab the crocs and gators, but this can only be done when their mouths are not fully open. 
* The third stage is an avalanche with boulders rolling down a hill. The player simply uses the joystick to control Jungle King's climbing speed up the hill, and the JUMP button to leap over rolling boulders until they reach the end of the stage. 
* The fourth and final stage has the player guiding Jungle King through a cannibal village. Jungle King must jump over the cannibals while their spears are down, and eventually make his way towards his Jungle Princess, who is being lowered into a pot to be boiled for supper. 

On completion of the game, players are rewarded with a short 'I Love You' ending, and then the game begins again with increased difficulty.

### Technical
Jungle King used the familiar 'Taito Classic' cabinet that was used for a variety of early 1980's games. This was a rather short cabinet, and had a monitor that was laid back at more than a 45 degree angle. Most of these cabinets featured the same painted sideart which consisted of an ornate border and a 'Taito' logo. Many other early Taito games will plug right into the machine without modification (although the boardset for these early games tend to be expensive). The marquee to this title showed a 'Jungle King' logo, with the hero to the right of it and a (rather slutty looking) blond woman tied to a tree on the left hand side. Jungle greenery filled the rest of the marquee's surface area. The monitor bezel was decorated with a red and orange design, while the control panel overlay had a cartoony jungle scene on it. 

Runs on the "Taito SJ System" hardware.
Prom Stickers: KN

Players: 2 
Control: 8-way joystick 
Buttons: 1 (JUMP/KNIFE)

### Trivia
Jungle King was released in July 1982 in Japan.

Jungle King was the first 'side-scrolling, jumping & attacking game with a humanoid character', appearing in arcades three years before Miyamoto's classic "Super Mario Bros.".

This was also the first video game ever to feature a Tarzan look-alike as a playable character. But, Taito never bothered to get permission from the estate of Edgar Rice Burroughs, so they were sued for copyright infringement for using Tarzan's likeness. So this title quickly went out of production, and is rather rare today. They later reworked the graphics, and the game reappeared in October 1982 as Jungle Hunt. Please see the Taito America "Jungle Hunt" entry for a list of the cosmetic changes made to the game. 

A prototype of this game is known as "Jungle Boy". 

A reworked version of this game is known as "Pirate Pete". 

This game was released in Brazil in 1983 under the "Jungle Hunt" moniker, but none of the other post-lawsuit changes made for the Taito America version were implemented. 

A Jungle King unit appears in the 1983 movie 'Joysticks'.

### Updates
A version of Jungle King is known to exist with alternate sound.

### Scoring
Successfully jumping between vines : 100 points 
Stabbing Crocodiles and Alligators : 100 points 
- with open jaws : +100 points
- in deep water : +100 points 
Jumping over a rock : 200 points 
Ducking under a rock : 100 points
Running under a rock : 50 points 
Jumping over a cannibal : 100 points 
Finishing stages 1-3 : 500 points 
Finishing stage 4 (jump into and rescue woman) : timer bonus

### Tips and tricks
* Forest : 
1) The main thing to remember on this stage is timing. Some vines swing faster then others. As you go farther into the game, the vines will really start to swing fast so you must be able to time your jumps accordingly. 
2) The best place to catch a vine is in the middle or lower (ideally the bottom of the vine is the best). This way, you give yourself enough jumping room to get to the next vine. 
3) Don't just start jumping to the vines without looking. If a vine is moving away from you, wait until it's halfway to you, then jump. 
4) At the later levels, monkeys will appear on the vines. If you hit a monkey while trying to leap for a vine, the monkey will knock you down to the ground. 
5) After the fourth level, your jumps will become slower. You will need to start your jump before the vine you are on reaches its maximum forward swing position. This will give you a small boost in jumping power. 

* River : 
1) On this stage, you will be swimming through a jungle river. Things to remember are to keep track of your Diving Display. If the bar goes all the way to the left, your man will become a floater. Swim up to the surface every now and then for a breath of air. 
2) The biggest hazards are the crocodiles and alligators. Fortunately, you have your trusty knife with you. In order to kill a croc or gator, their mouths have to be closed. If they aren't, you will become free food. Also, if you collide with any part of a croc or a gator, you will die. Extra points are awarded if you stab them when their mouths are partially open, or if they are deep in the water. There are two types of alligators distinguishable by their "teeth". Small-toothed alligators act normal. Big-toothed alligators, however, are faster, will try to follow you, and will move up and down very quickly. 
3) Another hazard is the air bubbles. If you happen to swim into them, they will push you immediately to the surface regardless of what hazards may be in your way. The best way to work around this is to vary your speed by moving the joystick left and right and time it so that there are no hazards above the air bubbles. 

* Avalanche : This is probably the easiest screen.
1) The main obstacle here are large and small boulders which you must dodge in some way. The small boulders can be avoided by jumping over them, but to dodge the large ones, you may either jump, run, or duck by pulling down on the joystick.
2) Moving the joystick left or right controls your speed up the hill. If you hold the joystick left or right, your character will jump at mid-level. If you hold the joystick in an up-left or up-right position, he will jump at his peak level. Try to judge whether a boulder is going to be high or low by the time it reaches your current position. If it's going to be in mid-air, and you find it unsafe to jump or duck, just move to a safer position as quickly as possible. 
3) In later levels, the larger boulders are seen more frequently, and small boulders fall down the mountain in groups. 

* Cannibals : Probably the hardest screen because you have to time your jumps in between the two cannibals... 
1) Get right next to the first cannibal. Keep in mind, you can only jump when their spears aren't in the air or you will be skewered. 
2) Also, watch the vine that Jungle Princess is tied to. It is going up and down, so you have to time your jumps for both the cannibals and your woman. 
3) The cannibals wander back and forth at slightly different rates. Because of this, they get close together, then spread out again. 
4) You have to jump between the cannibals, then jump up when Jungle Princess is at the lowest point on the vine. This will require timing and there is no pattern or trick. Just keep in mind that if you can't get to her, jump back to your original position or the second cannibal will get you. 
5) On the later levels, everything moves much quicker, and a third cannibal joins them up on the tree. He will shoot blow darts at you that you must move to avoid.

### Ports
Home conversions didn't start appearing until long after the aforementioned lawsuit by the Edgar Rice Burroughs estate against Taito was settled. Please see the Jungle Hunt (Taito America) entry.

### Contribute
Edit this entry: https://www.arcade-history.com/game/1243/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `taitosj`. Play it at [../../../app/g/junglek/](../../../app/g/junglek/) or [explore the knowledge graph](viewer.html).*
