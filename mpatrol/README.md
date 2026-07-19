# Moon Patrol

**Irem · 1982** — transpiled from the MAME driver `src/mame/irem/m52.cpp` by mamekit.

![marquee](/artwork/media/marquees/mpatrol.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/mpatrol.png) | ![cabinet](/artwork/media/cabinets/mpatrol.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 13 |
| `iremsound` | M6803 | 3.580 MHz | 3 |

- **Sound:** ay8910 × 2 @ 0.895 MHz
- **Screen:** 240×252 @ 56.74 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `mpa-1.3m` | 0x0 | 0x1000 | `5873a860` |
| `maincpu` | `mpa-2.3l` | 0x1000 | 0x1000 | `f4b85974` |
| `maincpu` | `mpa-3.3k` | 0x2000 | 0x1000 | `2e1a598c` |
| `maincpu` | `mpa-4.3j` | 0x3000 | 0x1000 | `dd05b587` |
| `irem_audio:iremsound` | `mp-s1.1a` | 0x7000 | 0x1000 | `561d3108` |
| `tx` | `mpe-4.3f` | 0x0 | 0x1000 | `cca6d023` |
| `tx` | `mpe-5.3e` | 0x1000 | 0x1000 | `e3ee7f75` |
| `sp` | `mpb-2.3m` | 0x0 | 0x1000 | `707ace5e` |
| `sp` | `mpb-1.3n` | 0x1000 | 0x1000 | `9b72133a` |
| `bg0` | `mpe-1.3l` | 0x0 | 0x1000 | `c46a7f72` |
| `bg1` | `mpe-2.3k` | 0x0 | 0x1000 | `c7aa1fb0` |
| `bg2` | `mpe-3.3h` | 0x0 | 0x1000 | `a0919392` |
| `tx_pal` | `mpc-4.2a` | 0x0 | 0x200 | `07f99284` |
| `bg_pal` | `mpc-3.1m` | 0x0 | 0x20 | `6a57eff2` |
| `spr_pal` | `mpc-1.1f` | 0x0 | 0x20 | `26979b13` |
| `spr_clut` | `mpc-2.2h` | 0x0 | 0x100 | `7ae4cd97` |
| `unkprom` | `mp_7621-5.7h` | 0x0 | 0x200 | `cf1fd9d0` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `IN0` | 0x1 |
| 2 | start2 | `IN0` | 0x2 |
| 9 | service1 | `IN0` | 0x4 |
| 5 | coin1 | `IN0` | 0x8 |
| Z | button2 | `IN1` | 0x20 |
| Space / X | button1 | `IN1` | 0x80 |
| Right | joystick right | `IN1` | 0x1 |
| Left | joystick left | `IN1` | 0x2 |
| 6 | coin2 | `IN2` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Flip Screen | `DSW2` | 0x1 | 0x1 |
| Cabinet | `DSW2` | 0x2 | 0x0 |
| Coin Mode | `DSW2` | 0x4 | 0x4 |
| Invulnerability (Cheat) | `DSW2` | 0x40 | 0x40 |
| Service Mode | `DSW2` | 0x80 | 0x80 |
| Unused | `DSW2` | 0x8 | 0x8 |
| Stop Mode (Cheat) | `DSW2` | 0x10 | 0x10 |
| Sector Selection (Cheat) | `DSW2` | 0x20 | 0x20 |
| Lives | `DSW1` | 0x3 | 0x2 |
| Bonus Life | `DSW1` | 0xc | 0xc |
| Coinage | `DSW1` | 0xf0 | 0xf0 |
| Coin A | `DSW1` | 0x30 | 0x30 |
| Coin B | `DSW1` | 0xc0 | 0xc0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/irem/m52.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 94 commits by 22 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Olivier Galibert, Ivan Vangelista

## The story

Arcade Video game published 44 years ago:

Moon Patrol (c) 1982 Irem.

Moon Patrol is a horizontally-scrolling shoot-em-up in which the player takes the role of a Luna City police officer assigned to Sector Nine, home of the toughest thugs in the galaxy. 

The player controls a moon buggy that travels over the moon's surface, trying to avoid or destroy any obstacles in its path, including craters, rocks and mines. UFOs attack the buggy from above by dropping bombs, some UFO bombs will create a new crater when they hit the ground, generating a new obstacle to avoid.

The buggy can jump to avoid craters, mines and rocks, it also has both front and vertically-mounted cannons that fire missiles simultaneously. The vertical cannon is to destroy UFOs while the front-cannon can take out obstacles that lie in the buggy's path.

Moon Patrol has five different stages spread over 26 check-points, each designated a letter of the English alphabet. The five checkpoints that denote a new stage are E, J, O, T and Z and each new stage sees a change in background graphics as well as an increase in difficulty. One example of this is the introduction of landmines in the third stage (stage 'J').

A status panel is displayed at the top of the screen that gives the player useful information. A progress bar showing the five major checkpoints and the player's current position is displayed at the bottom of the panel. Above the progress bar is an indicator of the current checkpoint, the time spent in the stage and three indicator lights: the top light indicates upcoming enemy aerial attacks, the middle one indicates an upcoming minefield and the bottom one indicates enemies approaching from behind.

At the end of each stage bonus points are awarded based on how quickly the stage was completed.

*CAST OF CHARACTERS*

PLAYER CHARACTER - MOON BUGGY: 
Your vehicle across the rugged lunar terrain is a specially designed moon buggy. It comes with six wheels on three specially mounted axles that contain especially absorbent shocks which allow the buggy to glide across the uneven landscape of the moon. The wheels of the buggy can be utilized to create short hops, which allow the buggy to jump over pits and other hazardous obstacles that can't be removed in time. It is also equipped with a roof mounted gun for anti-air fire and a forward mounted cannon. The anti-air gun can fire up to four bullets on the screen at one time, while the cannon can only project one bullet at a time. The buggy is destroyed by impact with an obstacle, getting hit by alien craft bombs, or falling into a lunar pit.

ENEMIES ON THE GROUND
1) Craters and Rocks - Throughout the course of driving on the moon, you will encounter natural terrain obstacles that you must overcome. Nothing more can be done about craters than jumping over them. Most craters are spaced out, but a few come in rapid succession of one another, so jumps must be timed carefully. In addition to craters, you will come across rocks on the landscape. Most rocks are easily dispatched with one shot from your cannon. Sometimes, two rocks occur back to back. If you're fast enough, you can destroy them both. Otherwise, you may opt to jump over the pair. Small rocks lie below the height of your cannon fire. They can only be destroyed if the shot from your cannon detonates near the rock. Otherwise, the shot will sail harmlessly over the rock. When in doubt, jump over the rocks to be safe.

2) Land Mines - These small objects which flash white and red make their first appearance after point J in the beginner course. Like pits, they can not be destroyed and must be jumped over. They tend to occur in rapid succession, so it is recommended that you travel no faster than regular speed until you are an expert player. When two mines are approximately two moon buggy lengths apart, it is important to jump over the first one considerably early so that you don't land on the second, and have enough time to jump off the ground before you reach it.

3) Boulders - At certain points along your patrol, the elevation of the moon's surface rises. The first such occurrence is between points P and Q in the beginner course. While you are driving uphill, it is not uncommon to encounter boulders rolling down towards your buggy. Like rocks, these boulders can be rendered harmless with your cannon. Even the small boulders present little challenge thanks to the incline of the surface elevating them to the level of your cannon. But be prepared for a difficult jump if too many come at you at once and you don't have enough time to destroy them all.

4) Tanks - These first appear after point U in the beginner course. They are stationary, and typically fire one bullet at a time in your direction. Their bullets and the shots from your cannon cancel each other out, so you must immediately fire again in order to hit the tank. Any delay on your part will result in the tank firing once more, preventing you from destroying the tank before you reach it. Tanks can be jumped over if necessary.

5) Rocket Cars - The first of these appears after point A in the champion course. It will trail behind you until it is ready to strike. Stay fast, and don't do anything until it begins to approach you. When it is half-way between you and the edge of the screen, jump up and let it sail underneath you. Fire as soon as you land to destroy it for 500 points. 

6) Space Plants - A strange type of vegetation exists on the moon, favouring to make their homes in the craters of the lunar surface. They bob in and out of the craters in an effort to catch whatever they can grab. These space plants first appear shortly before point H in the champion course. A shot from the cannon is enough to render the space plant harmless, but the crater must still be leaped over. Attempting to leap over a crater that still contains a space plant can be a dangerous gamble if not timed perfectly.

ENEMIES IN THE AIR
Alien Craft: There are three types of craft that the enemy employs when trying to defeat you from overhead. They all appear in groups ranging from two to five.

1) Regular Craft - These weave back and forth dropping bombs on the buggy. The bombs can be destroyed with your anti-air gun, but they make difficult targets. If this craft is left on the screen for too long in later levels, it may fly down to collide with your buggy.

2) Elliptical craft - These behave nearly identical to the regular craft. They drop bombs on you with increasing accuracy. The long you remain at a particular speed, the better their shots will get, so make sure to mix your speed up in order to confuse them. Sometimes, you can jump at the last minute and avoid getting hit if the bomb is about to hit the back of your buggy.

3) Tri-orb craft - This craft, made of three circles bound together, is the deadliest of them all. Rather than dropping normal bombs at the buggy, they pitch terrain deforming grenades at the path ahead of you. You must watch the trajectory of their small flashing grenades and anticipate when you might need to jump as a result of the newly formed pit left by their grenade's impact with the ground. Like the bombs, the grenades can be shot, but they are even harder to hit.

### Technical
Irem M-52 hardware

Main CPU : Zilog Z80 (@ 3.072 Mhz)
Sound CPU : Motorola M6803 (@ 894.886 Khz)
Sound Chips : (2x) General Instrument AY8910 (@ 894.886 Khz), (2x) MSM5205 (@ 384 Khz)

Players : 2
Control: 2-way joystick (controls speed of moon buggy)
Buttons: 2
=> [1] Fire, [2] Jump

### Trivia
Moon Patrol was released in June 1982 in Japan.

Moon Patrol was one of the earliest linear side-scrolling shoot-em-ups and the first game to feature parallax scrolling.

Some graphical glitches:

* Shoot an alien ship as it falls and it remains on the screen, with its point total.

* Bombs dropped in pits explode on the surface.

* Occasionally you'll miss an enemy you appear to hit, but it works the other way around, too.

* Occasionally the enemy missiles will hit your very edge and nothing will happen. Don't get too used to this happening, though!

* When you jump but still fall in a pit, you always make it halfway between the edge before falling in.

The attract mode course uses its own unique course of gameplay. The screen, however, says 'Beginner course' at the top when the moon buggy is parked at the moon base. The enemies encountered in attract mode are as follows:

(Moon base)
Large (double) rock, Large crater, 2 space plants (the second space plant has a rock adjacent to it), Large crater, Small crater, 2 tanks

(Point A)
Uphill climb with rolling boulders, Formation of 3 regular alien crafts, Formation of 3 tri-orb crafts

(Point B)
Downhill descent with formation of 3 elliptical alien crafts

(Point C)
Rocket car, Large crater and small crater adjacent to each other
(Unfortunately, the moon buggy always falls into the large crater that follows the rocket car, so technically the attract mode course ends there. Sometimes the alien craft between points A and C would defeat the moon buggy; other times the moon buggy would mistime its jump over the rocket car. The land mines do not appear in the attract mode).

Mark Robichek holds the official record for this game with 1,214,600 points.

A Moon Patrol unit appears in the 1983 movie 'Joysticks' and in the 1984 movie 'The Karate Kid'.

A Bootleg of this game is called "Moon Ranger".

Alfa Records released a limited-edition soundtrack album for this game (R*Type: Irem Game Music - 28XA-199) on January 25, 1988.

### Scoring
Regular alien craft :
Destroying - 100 points

Elliptical alien craft :
Destroying - 100 points

Tri-orb alien craft :
Destroying - 200 points

Alien craft formation bonus (for destroying all alien craft in a formation) :
Formation of three - 500 points
Formation of four - 800 points
Formation of five - 1,000 points
(no bonus points for a formation of two) 

Small craters :
Jumping over - 50 points

Large craters :
Jumping over - 100 points

Small rocks :
Jumping over - 50 points
Destroying - 100 points

Medium rocks :
Jumping over - 80 points
Destroying - 100 points

Large (double) rocks :
Jumping over - 100 points
Half destroying - 100 points
Half destroying and jumping over - 180 points
Destroying - 200 points

Land mines :
Jumping over - 50 points

Rolling boulders :
Destroying - 50 points
Jumping over - 100 points

Tanks :
Jumping over - 100 points
Destroying - 200 points
(no points for shooting the tank's missile)

Rocket cars :
Destroying - 500/800/1,000 points depending on distance
(no points for jumping over rocket cars)

Space plants :
Jumping over - 100 points
Destroying - 300/500/800 points depending on their height when destroyed + 100 points for jumping over the crater

Reaching a checkpoint in under average time : 
Beginner course - 1,000 point bonus 
Champion course - 2,000 point bonus

Reaching checkpoint 'Z' : 
Beginner course - 5,000 points
Champion course - 10,000 points

Time remaining at checkpoint - 100 points per second under average time

### Tips and tricks
Enemies that appear in later stages also appear in the attract mode. If you watch the attract mode carefully, you'll learn how to deal with these adversaries.

Moon Patrol is primarily divided into 2 courses; the Beginner course and the Champion course. Each course is divided into 26 sections labelled A through Z. Each section is organized into 4 groups of 5 and 1 group of 6 at the very end. At the end of each group, your time is compared to the average time for potential bonus points.

BEGINNER COURSE

A - E
 
In the very first stretch, you will encounter 3 small craters, and 2 rocks. Jump over all of the craters and fire your cannon at the rocks. 

Point A 
By the time you drive over point A, 2 of the first alien crafts will appear overhead. They will be joined by two of the elliptical crafts. A rock will appear towards the end. 

Point B 
2 more crafts appear while a rock approaches your buggy. A few more rocks and a crater will follow. 

Point C 
3 elliptical crafts will appear. Destroy them for a 500 point bonus while you jump over the 2 craters and destroy the rock. 

Point D 
2 tri-orbs will introduce themselves. Be careful of the craters that their grenades might make. They are quickly followed by 2 regular crafts. One rock and one crater precedes the end.

F - J

Point E 
The section begins with 2 tri-orbs followed by 2 elliptical crafts. A crater and rock appear towards the end. 

Point F 
More difficult obstacles appear, such as large craters, double rocks that must be fired on twice, and small rocks that must be hit by the explosion of the cannon shot. 

Point G 
2 craft appear while you jump over large craters and destroy a few rocks that get in your way. 

Point H 
There are simply 2 tri-orbs and 2 regular crafts in this section. 

Point I 
The first group of three tri-orbs will appear. Destroy them all for 500 points. Then a rapid succession of craters and rocks will occur, including double and small rocks. You may wish to slow down towards the end to deal with them all. 

K - O

Point J 
This section introduces you to land mines, the small objects that flash white and red. Like craters, they can not be destroyed and must be jumped over. They tend to occur in rapid succession, so it is recommended that you travel no faster than regular speed until you are an expert player.

Point K 
More land mines in this section. When 2 land mines are approximately 2 buggy lengths apart, it is important to jump over the first one considerably early so that you don't land on the second, and have enough time to jump off the ground before you reach it. 

Point L 
Many of the land mines you encounter here come in pairs, but they are no more difficult to jump at regular speed than single mines. 

Point M 
Space craft resume their attack and this time 4 of the regular type appear to attack. Destroy them all for an 800 point bonus. This is followed by 3 elliptical crafts, worth 500 bonus points if they are all destroyed. 

Point N 
4 tri-orbs appear, followed by 3 elliptical crafts. If you can destroy them all, you'll net a 1300 point bonus.

P - T

Point O 
A quad of tri-orbs start off this section, followed by 3 regular crafts. 

Point P 
This section is the first uphill climb that you encounter. Boulders of all three sizes will fall down the hill in no larger groups than pairs. Even the smallest boulders should be easy to shoot. 

Point Q 
4 elliptical craft appear. Be aware that their bombs don't need to travel as far in order to hit you. Also keep your eyes open for the large craters and double rock formations that show up. 

Point R 
As you begin to descend downhill, a pair of both regular space crafts will appear and bomb you from overhead. 

Point S 
3 regular crafts appear near simultaneously with 3 tri-orb craft. Stay alert to newly formed craters. 

U - Z

Point T 
A rapid succession of craters and double rocks appear. Take this section at the normal speed until you feel comfortable speeding up. 

Point U 
As soon as the craters and rock end, you will encounter your first 2 tanks. 4 more tanks are waiting for you after a large crater. Fire rapidly to overcome their bullets and destroy them. 

Point V 
A series of 4 large craters precedes an uphill climb, complete with rolling boulders.

Point W 
4 regular craft and 3 elliptical crafts appear while you're positioned closer to the sky.

Point X 
3 regular crafts are followed by 3 tri-orb crafts. 

Point Y 
3 more tri-orb crafts and 3 elliptical crafts fire from overhead while you must avoid a final series of craters and rocks to reach the end of the beginner course.


CHAMPION COURSE

A - E

3 regular craft and 3 elliptical craft bomb you from overhead at the start of the champion course. 

Point A 
Your first tangle with a rocket car will occur. It will trail behind you until it is ready to strike. Stay fast, and don't do anything until it begins to approach you. When it's half way between you and the edge of the screen, jump up and let it sail underneath you. Fire as soon as you land to destroy it. 

Point B 
A few tanks occur among craters and rock. The last tank in this section is positioned just after a large crater. It's difficult to destroy both the tank's bullet and the tank, so fire at the bullet and leap over the crater and the tank in one jump. 

Point C 
More tanks appear with short breaks of craters and rocks. 

Point D 
4 regular crafts fly in while you must continue to navigate over several deep craters and clear the rocks in your way. Destroy all of the crafts for 800 bonus points. 

F - J

Point E 
3 pairs of tri-orbs appear, providing a near constant shower of grenades. No bonus points are awarded for destroying all of the crafts because they are considered pairs. 

Point F 
A tricky succession of craters and rocks occur. They frequently occur back to back, requiring you to clear the rock in front of the crater before jumping, or forcing you to delay your jump so that you can destroy the rock behind the crater. Slow the buggy down if your jumps are landing too close to the next obstacle. 

Point G 
4 tri-orb crafts are accompanied by 4 regular crafts for a total potential bonus of 1600 points. At the very end of this section, you will be introduced to space plants. Even if you manage to destroy them, remember to jump over the craters. 

Point H 
3 of the regular and elliptical crafts appear among more craters and rocks. 

Point I 
4 tri-orb crafts arrive. Destroy them as quickly as possible before the terrain gets more difficult up ahead. Among the craters and rocks are space plants that must be dealt with. Slow the buggy down towards the end.

K - O

Point J 
This section starts off with an uphill climb. Boulders now appear more frequently and groups of three are not uncommon. Do not be determined to destroy them all. Leap over a set if they prove too difficult to shoot in time. 

Point K 
4 regular crafts and 3 elliptical crafts stream onto the screen during your higher elevation.

Point L 
Land mines begin to appear again, some in very close proximity to one another. Slow your speed down until you get the rhythm of the jumps. 

Point M 
More land mines appear. In this section, some land mine pairs are so close that it's actually possible to hurdle the combination at top speed, but this requires great familiarity with the mine sequence before attempting. 

Point N 
5 tri-orbs appear, for a unique chance at a 1000 point bonus for clearing them all. 4 regular crafts appear as well. 

P - T

Point O 
As soon as you begin your descent down the hill, five elliptical crafts swarm overhead with four regular crafts. Once you reach the bottom of the hill, a tricky combination of rocks and craters occurs, so clear the crafts as quickly as possible. 

Point P 
The craters continue to come at a relatively easy pace. A rocket car will appear while you continue to jump craters. The land will level out and eventually the rocket car will launch itself at you. Jump to avoid it, and shoot it as you land, but be ready to jump the next crater which comes up almost immediately. 

Point Q 
Rocks occur on either side of some craters now, some grouped in pairs. The very end of the section contains closely arranged land mines. 

Point R 
More rocks and craters show up, with the space plants occupying the later batch. 

Point S 
5 tri-orbs are accompanied by 3 elliptical crafts. A few rocks show up towards the end. 

U - Z

Point T 
As the section starts out, a few rocks and craters get in your way before a rocket car appears. This time, it will launch shortly after you land from a jump over a crater, so be ready to jump back up again as the car approaches. 

Point U 
A number of land mines appear. In the middle, two rocks must be destroyed. Use this as a cue to speed up quite a bit, because a pair of land mines roughly one buggy's width apart must be leaped over simultaneously and you need a good bit of speed. 

Point V 
A total of 5 tri-orb crafts and 5 regular crafts will appear to launch an attack over you. Continue to monitor forward for craters created by tri-orbs' grenades. 

Point W 
A rapid succession of craters, rocks, and space plants occur here. It is best to travel at normal or slower speed to ensure that you have time to destroy every obstacle in your way. 

Point X 
5 tri-orbs and four regular craft will dominate the sky above you. 

Point Y 
A full combination of tanks, craters, rocks, and space plants will assail you during the very final section of the champion course. 


* Hint 1 : When alien ships fly over, keep adjusting your speed or they will eventually hit you with a bomb. Draw their bombs to one end of the screen, then shift to the other. 

* Hint 2 : Although the part of the mines seems to be the more difficult, it isn't - all you have to do is not move your tank at all, only pressing the jump button. You won't get many bonus points, but at least you'll survive. 

* Hint 3 : The big key to this game is memorization. After the beginner course, you go on to the champion course, which never changes no matter how many times you pass it. Memorize the two courses, and you will almost never lose a life.

### Ports
NOTE: Only ports released outside North America are listed here. For North American releases, please see the Williams Electronics entry.

* CONSOLES:
[EU] Sony PlayStation (mar.1998) "Arcade's Greatest Hits - The Midway Collection 2 [Model SLES-00739]" 

* COMPUTERS:
[EU] Commodore C64 (1983)
Sord M5 [JP] (1983)
[JP] MSX (1984)
[EU] Sinclair ZX Spectrum (1984) 
[EU] Amstrad CPC (1985) "Moon Buggy"

* OTHERS:
LCD handheld game [JP] (1982) by Gakken.

### Contribute
Edit this entry: https://www.arcade-history.com/game/1668/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `m52`. Play it at [../app/g/mpatrol/](../app/g/mpatrol/) or [explore the knowledge graph](viewer.html).*
