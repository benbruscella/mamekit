# Dig Dug (rev 2)

**Namco · 1982** — transpiled from the MAME driver `src/mame/namco/galaga.cpp` by mamekit.

![marquee](/artwork/media/marquees/digdug.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/digdug.png) | ![cabinet](/artwork/media/cabinets/digdug.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 14 |
| `sub` | Z80 | 3.072 MHz | 14 |
| `sub2` | Z80 | 3.072 MHz | 14 |

- **Sound:** wsg @ 0.096 MHz
- **Screen:** 288×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `dd1a.1` | 0x0 | 0x1000 | `a80ec984` |
| `maincpu` | `dd1a.2` | 0x1000 | 0x1000 | `559f00bd` |
| `maincpu` | `dd1a.3` | 0x2000 | 0x1000 | `8cbc6fe1` |
| `maincpu` | `dd1a.4` | 0x3000 | 0x1000 | `d066f830` |
| `sub` | `dd1a.5` | 0x0 | 0x1000 | `6687933b` |
| `sub` | `dd1a.6` | 0x1000 | 0x1000 | `843d857f` |
| `sub2` | `dd1.7` | 0x0 | 0x1000 | `a41bce72` |
| `gfx1` | `dd1.9` | 0x0 | 0x800 | `f14a6fe1` |
| `gfx2` | `dd1.15` | 0x0 | 0x1000 | `e22957c8` |
| `gfx2` | `dd1.14` | 0x1000 | 0x1000 | `2829ec99` |
| `gfx2` | `dd1.13` | 0x2000 | 0x1000 | `458499e9` |
| `gfx2` | `dd1.12` | 0x3000 | 0x1000 | `c58252a0` |
| `gfx3` | `dd1.11` | 0x0 | 0x1000 | `7b383983` |
| `gfx4` | `dd1.10b` | 0x0 | 0x1000 | `2cf399c2` |
| `proms` | `136007.113` | 0x0 | 0x20 | `4cb9da99` |
| `proms` | `136007.111` | 0x20 | 0x100 | `00c7c419` |
| `proms` | `136007.112` | 0x120 | 0x100 | `e9b3e08e` |
| `namco` | `136007.110` | 0x0 | 0x100 | `7a2815b4` |
| `namco` | `136007.109` | 0x100 | 0x100 | `77245b66` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Up | joystick up | `IN0` | 0x1 |
| Right | joystick right | `IN0` | 0x2 |
| Down | joystick down | `IN0` | 0x4 |
| Left | joystick left | `IN0` | 0x8 |
| Space / X | button1 | `IN1` | 0x1 |
| 1 | start1 | `IN1` | 0x4 |
| 2 | start2 | `IN1` | 0x8 |
| 5 | coin1 | `IN1` | 0x10 |
| 6 | coin2 | `IN1` | 0x20 |
| 9 | service1 | `IN1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN1` | 0x80 | 0x80 |
| Coin B | `DSWA` | 0x7 | 0x1 |
| Bonus Life | `DSWA` | 0x38 | 0x18 |
| Lives | `DSWA` | 0xc0 | 0x80 |
| Coin A | `DSWB` | 0xc0 | 0x0 |
| Freeze | `DSWB` | 0x20 | 0x20 |
| Demo Sounds | `DSWB` | 0x10 | 0x0 |
| Allow Continue | `DSWB` | 0x8 | 0x0 |
| Cabinet | `DSWB` | 0x4 | 0x4 |
| Difficulty | `DSWB` | 0x3 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/namco/galaga.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 283 commits by 37 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, hap

## The story

Arcade Video game published 44 years ago:

Dig Dug (c) 1982 Namco.

Dig Dug is single screen action game in which the player must dig horizontal and vertical tunnels to reach and eliminate the underground-dwelling monsters living there. This is achieved by either inflating them with an air pump until they explode, or by dropping rocks onto them. 

There are two kinds of enemies in the game; 'Pookas' (a race of round, red monsters) and 'Fygars' (a race of green, fire-breathing dragons). Monsters are initially trapped in caves and can escape in one of two ways: Dig Dug can dig them out, after which they will immediately start chasing the player, but after the set time monsters can also escape a cave by turning into ghosts. In this form they can't be killed are aren't restricted to using tunnels to move around. They can float through solid dirt and travel diagonally but once a ghost enters a tunnel, it can be killed.

The monsters move faster than Dig Dug in vertical tunnels and slower on the surface. They will kill Dig Dug on contact and 'Fygar' can also kill Dig Dug by breathing fire on him. Fygar can only breathe fire horizontally but his flames can penetrate solid dirt. A partially inflated monster will gradually deflate and recover after a few seconds but while deflating, Dig Dug can pass safely through it. 

The deeper underground an enemy is when it's killed, the more points are awarded. Each screen has four depth levels and these are darker in colour the further underground they are. Additionally, Fygars are worth double points if exploded horizontally rather than vertically (since they can only breathe fire horizontally and therefore present a greater threat). 

Extra points are awarded for dropping rocks onto enemies rather than inflating them and after the player has dropped two rocks, a bonus item appears at the center of the screen, awarding points if the player collects it before it disappears. The two rocks only have to be dropped, the bonus item will appear irrespective of whether or not the rocks killed an enemy. These bonus items consist of various fruit and vegetables, as well as the flagship from the Namco game Galaxian.

The last enemy in a round will try to escape via the top left of the screen and if he succeeds, potential points are lost. The round numbers are represented by flowers at the top-right of the screen. After every fourth round, the colour of the dirt will change. Successive rounds feature an increasing number of monsters that also move at a faster speed.

### Technical
Main CPU : Zilog Z80 (@ 3.072 Mhz) 
Sub CPU : Zilog Z80 (@ 3.072 Mhz) 
Sound CPU : Zilog Z80 (@ 3.072 Mhz) 
Sound Chips : Namco 3-channel WSG 

Players : 2 
Control : 4-way joystick 
Buttons : 1 (PUMP)

### Trivia
Dig Dug was released on April 19, 1982 in Japan.

Dig Dug was a shining addition to the golden age of video games. The game's charming world and innovative game play made it an instant classic. 

The main character of Dig Dug has a name in Japan, 'Taizo Hori', a pun based on the phrase 'Horitai zo', or 'I want to dig!'. He is believed to be the father of "Mr. Driller".  He makes an appearance on the 2012 animation movie 'Wreck-It Ralph' from Walt Disney Animation Studios.

* A place in video game history : "During the golden age of video games we saw a lot of novel approaches to gaming," said Chris Lindsey, director of the National Video Game and Coin-Op Museum in St. Louis. "'Tempest', for instance, required things of its players that we'd never seen in a video game before. You had to learn a whole new set of skills to further the game experience. Dig Dug is another game that provided a novel approach. The types of movement you had to learn, the skills you had to develop, were like none other up until that point. And this game play was combined with a really engaging subject matter, which was this guy, Dig Dug, who digs around underground after subterranean monsters, and who explodes them with a really bizarre weapon, an air pump! There was just this string of interesting, engaging things for the viewer to look at and experience while dealing with this new type of game. It really captured, and still captures, the imagination. The sounds in Dig Dug are also really distinctive. When people hear that music start to play here at the museum, they'll laugh with recognition. It's quite funny watching people play that game." 

* The great 25-cent escape : Lindsey enjoys seeing visitors to his museum discover a video game that rekindles memories from earlier years. 
"They'll say, 'Wow, I used to be great at this!' And then they'll adopt their old game-playing position -- which seems to vary almost randomly from person to person, " Lindsey said. "They drop a token in, start rolling, and then they will lose all sense of time and space, becoming completely immersed in the game. Often they'll start laughing. I had a guy yesterday who was so funny. He came in and had obviously played these video games quite a bit in years past, like many of us did. He wandered around the museum, going from game to game, and he just laughed hysterically as he remembered all the little details of each game that he had spent so much time on, so long ago." 

* Namco notes that after the release of Dig Dug in 1982, Namco engineers went to arcades to watch their new game being played. They noticed that "there were two completely separate groups of people. One group enjoyed blowing the enemy up with the pump. The other group enjoyed beating the enemy by dropping rocks on them". 

Donald Hayes holds the official record for this game with 5,142,500 points on March 24, 2011. 

A bootleg of this game is known as "Zig Zag". Another bootleg running on the "Galaxian" hardware was made by LAX as "Zigzag". 

Alfa Records released a limited-edition soundtrack album for this game (Video Game Music - YLC-20003) on April 25, 1984. 

Alfa Records released a limited-edition soundtrack album for this game (The Best Of Video Game Music - 32XA-66) on April 25, 1986.

### Updates
The Sidam version skips the first three layouts and starts with the layout of Round 4.

### Scoring
Scoring in this game is relatively complicated due to the dirt layer a monster is at and also how you kill said monster. In addition, you even get points for 'eating' dirt. 

* Over-inflating (bursting) monsters: 
Layer 1: 200 Points 
Layer 2: 300 Points 
Layer 3: 400 Points 
Layer 4: 500 Points 

NOTE: If you over-inflate a Fygar horizontally, you will get double the listed points. This is due to the fact that you are risking your life dealing with Fygar's flame breath. 

* Dropping rocks on monsters: 
1 Crushed: 1,000 Points 
2 Crushed: 2,500 Points 
3 Crushed: 4,000 Points 
4 Crushed: 6,000 Points 
5 Crushed: 8,000 Points 
6 Crushed: 10,000 Points 
7 Crushed: 12,000 Points 
8 Crushed: 15,000 Points 

* You get points for collecting the prizes: 
Round 1 - Carrot: 400 Points 
Round 2 - Rutabaga: 600 Points 
Round 3 - Mushroom: 800 Points 
Rounds 4 & 5 - Cucumber: 1,000 Points 
Rounds 6 & 7 - Eggplant: 2,000 Points 
Rounds 8 & 9 - Bell Pepper: 3,000 Points 
Rounds 10 & 11 - Tomato: 4,000 Points 
Rounds 12 & 13 - Onion: 5,000 Points 
Rounds 14 & 15 - Watermelon: 6,000 Points 
Rounds 16 & 17 - Galaxian: 7,000 Points 
Round 18 onward - Pineapple: 8,000 Points 

When you are digging a new tunnel, you get 10 points per 5/8 inch (app. 1.6 cm.) dug.

### Tips and tricks
* Hints for Game Play: 
1) Get many monsters to follow you. Then dig a long vertical tunnel up to a rock. 
2) Drop the rock by digging right or left. 
3) Dig Dug may take extra time to turn. It is better to start turning early than to wait until the last second. 
4) Destroy monsters at bottom dirt level for more points. 
5)Use the Pump button to stun monsters. Then you may escape or walk through them. 
6) Don't stop next to Fygar when he is in a cave. His fire can go through a thin layer of dirt and destroy you. 
7) A prize appears after two rocks have been dropped. So be sure to drop two rocks in each round. 

* When you start the game, Dig Dug will dig a downward vertical shaft into a chamber. The floor of this chamber is the top of the third layer. It is your job to dig tunnels and keep the monsters busy. This won't be an easy task since the monsters will attempt to surround Dig Dug and permanently end his mining career. You will have a two second delay before the round starts. It shows Dig Dug digging his vertical tunnel down to his starting area. Take this time to see where all the monsters are and figure out the best course of action to take them out. 

* Knowing the behavior of the monsters is a crucial element of this game. Pookas travel a bit faster then Dig Dug and tend to run him down. Fygars don't have the speed but they make up for it with their fiery belch. 

* Dig Dug travels slower when he is busy carving tunnels. 

* Know the rules of dropping rocks: 
1) Rocks will wobble for about a second before they drop. 
2) Rocks drop immediately when you cut a horizontal tunnel under them. 
3) In vertical tunnels, the rock will stay in place as long as Dig Dug is facing it and moving. 
4) When you drop two rocks, the prize will appear. 

* Don't waste your rocks on only one monster. Try to get as many monsters crushed as possible. The best way to accomplish this is : 
1) Try to dig long, vertical tunnels under the rocks. Don't dig all the way to the rock or you will waste it. 
2) Try to get the monsters to follow you. Sort of a ''follow the leader'' type thing up that vertical tunnel. This will be especially important in the later rounds. 
3) If the monsters are spread out a little, do a couple of pumps on the monster that is close. This will only stun it and allow the others to catch up. 
4) Right before they get Dig Dug, dig the rest of the way then head off left or right. The long, vertical shaft will prevent their escape and get you big points. 

* There are a total of 15 unique layouts in the game. After Round 15, layouts 12-15 repeat over and over in waves of four. There are patterns for these levels. Also, after Round 36, all of the enemies will speed up. The game does not award extra man after 900,000 points; the score will simply flip over at 1,000,000. It is very easy to get a score of 999,990 by eating dirt for ten points per section. Round 256 begins with a Pooka on top of Dig Dug. Since there is no way to escape, the game is basically over, no matter how many lives the player may have left. 

* Avoid killing the monsters by bursting them. If you don't have a choice, try to do in the lower layers since you get more points that way. 

* The pump is better utilized as a delay mechanism. Inflating a monster with two pumps will immobilize it for about two seconds. With two monsters, you can pump one up, move back a little and pump the other one up. 

* Monsters can be released from their pens in one of two ways: 
1) You open up their pen by digging it open. 
2) They turn into 'ghosts'. While they are ghosts, Pookas appear only as goggles, and Fygars appear as a set of evil eyes and a mouth. They will rematerialize as soon as they get into a tunnel. 

* Watch out for the fiery breath of Fygar. They not only can let loose down a horizontal tunnel, they also can send their fire through thin layers of dirt. The best defense when caught in a horizontal tunnel with a Fygar is to immediately go up or down to avoid their breath. 

* The Pookas have a tendency to try to surround Dig Dug. Usually they will try to trap him from the front and behind. Watch the Pooka 'ghosts' to make sure that they are not heading toward an area that you are currently tunnelling in. 

* It is possible to find patterns for the different levels, but it also is difficult since there isn't a well-defined maze to work with (like in "Pac-Man"). 

* When there is one monster left, it will attempt to escape rather then continue to pursue Dig Dug. You can chase him to get the points or let him go. Regardless, the game will advance to the next round. 

* In the later rounds, it is much more profitable to collect the prizes, then try to drop rocks on the monsters since they move so quickly. 

* 'Eat Dirt' secret: You should try this before round 36 since everything speeds up. 
1) Get the game down to two Pookas. If you only leave one, it will escape thus ending the round. 
2) This works best in horizontal tunnels under the rocks. 
3) Get a Pooka to follow you, inflate as necessary to delay him a little. 
4) Right when you are next to the rock, inflate the Pooka once to just delay him. When he moves at your character again, move under the rock. 
5) Quickly turn around and start pumping the Pooka up. Using the delay of the rock dropping, you should be able to cause the Pooka to burst at the same time the rock drops on him. 
6) If you are successful, then the other Pooka will disappear and you can amuse yourself digging out tunnels all day long in the dirt. To return the game back to normal, drop another rock and you will go into the next round. 

* Ender's loop: To beat any round of Dig Dug, one must take advantage of the artificial intelligence. One way to do this is to dig out either left or right from the starting position, dig up a short way from your starting position, turn around and continue digging out your initial tunnel, then go up again (this time further away from your start position) until you are higher than the end of your first vertical tunnel. Continue from here in the opposite direction of the direction you went at the beginning of the level, until you have almost reached the vertical tunnel that exists before you start any given level of the game. Create a thin wall between you and the vertical tunnel, and pump the enemies up as they pass by - but watch out, as the Fygars can still burn you.

* Late game:
Score: As with most of the other early Namco 8-bit arcade games, once you have made it to 999,990 points, your score will roll over to 0. No additional extra lives will be awarded now.
Flowers: The flowers that indicate the rounds on the surface of the ground will stop updating at round 69, but the indicator at the bottom of the screen will continue updating until round 99 before rolling over to round 0. At this point there will be no flowers. Once you have made it to round 101, the flowers will update again until you reach round 256 (is the "kill screen").
Slow enemies: In the original arcade versions of the game by Namco, the Pookas and Fygars will slow down once you have made it to round 124, and again once you have made it to round 136. This reduction in speed will continue every twelve rounds, until you reach round 256 (which, as mentioned above, is the "kill screen" - and is described in full detail below).
Kill screen: In the original Namco versions of the game, the game has a "kill screen" on round 256, which is registered by the game as round 0. The round starts with a Pooka directly on top of Dig Dug, which will cause the player to lose all of his remaining lives very quickly. The Atari revisions of the game (which changed the logo on the titles) correct this problem.

* Easter Egg: 
1) Enter service mode. 
2) Keep B1 pressed and enter the following sequence : Up(x6), Right(x3), Down(x4), Left(x8). 
3) '(c) 1982 NAMCO LTD.' will appear on the screen.

### Staff
Music by: Yuriko Keino

### Ports
NOTE: For ports released in North America, please see the Atari version entry.

* CONSOLES: 
[EU] Atari 2600 (1983)
[JP] Casio PV-1000
[JP] Nintendo Famicom (june.4, 1985) "Dig Dug [Model NDD-4500]" 
[EU] Atari 2600 (1988)
[JP] Nintendo Famicom Disk (jul.20, 1990) "Dig Dug [Model NDS-DIG]"
[JP] Sony PlayStation (june.21, 1996) "Namco Museum Vol.3 [Model SLPS-00390]" 
[AU] Sony PlayStation (1997) "Namco Museum Vol.3 [Model SCES-00268]" 
[EU] Sony PlayStation (feb.1997) "Namco Museum Vol.3 [Model SLES-00268]" 
[JP] Sony PS2 (jan.26, 2006) "Namco Museum Arcade Hits! [Model SLPS-25590]" 
[EU] Microsoft XBOX (mar.24, 2006) "Namco Museum - 50th Anniversary" 
[EU] Sony PS2 (mar.31, 2006) "Namco Museum - 50th Anniversary [Model SLES-53957]" 
[EU] Nintendo GameCube (may.5, 2006) "Namco Museum - 50th Anniversary [Model DOL-G5NP-EUR]" 
[EU] [JP] Microsoft XBOX 360 [XBLA] (oct.11, 2006) 
[JP] Nintendo Wii (dec.6, 2007) "Minna de Asobou! Namco Carnival [Model RVL-RNWJ-JPN]" 
[EU] Nintendo Wii (apr.18, 2008) "Namco Museum Remix [Model RVL-RN2P]" 
[KO] Nintendo Wii (apr.26, 2008) "Namco Museum Remix [Model RVL-RNWK-KOR]" 
[AU] Nintendo Wii (may.1, 2008) "Namco Museum Remix [Model RVL-RN2P]" 
[JP] Sony PlayStation 3 [PSN] (jan.29, 2009) "Namco Museum.comm [Model NPJB-00012]" 
[EU] Microsoft XBOX 360 [XBLA] (may.15, 2009) "Namco Museum - Virtual Arcade" 
[AU] Microsoft XBOX 360 [XBLA] (june.3, 2009) "Namco Museum - Virtual Arcade" 
[JP] Microsoft XBOX 360 [XBLA] (nov.5, 2009) "Namco Museum - Virtual Arcade [Model 2RD-00001]" 
[EU] Sony PlayStation 3 [PSN] (apr.1, 2010) "Namco Museum Essentials [Model NPEB-00104]" 
[AU] Sony PlayStation 3 [PSN] (apr.1, 2010) "Namco Museum Essentials" 
[JP] Nintendo Wii [Virtual Console Arcade] (oct.20, 2010) 
[EU] [AU] [JP] Microsoft XBOX One [XBOX Store] (apr.20, 2016) "Arcade Game Series - Dig Dug" 
[EU] [AU] Sony PlayStation 4 [PSN] (apr.20, 2016) "Arcade Game Series - Dig Dug [Model CUSA-03863]" 
[JP] Sony PlayStation 4 [PSN] (apr.20, 2016) "Arcade Game Series - Dig Dug [Model CUSA-03669]" 

* HANDHELDS:
[EU] Nintendo Game Boy (1992) "Dig Dug [Model DMG-DY-NOE]" 
[JP] Nintendo Game Boy (nov.29, 1996) "Namco Gallery Vol.2 [Model DMG-AN2J-JPN]" : Game Boy version
[JP] Nintendo Game Boy Advance (dec.7, 2001) "Namco Museum [Model AGB-ANMJ-JPN]" 
[EU] Nintendo Game Boy Advance (dec.7, 2001) "Namco Museum [Model AGB-ANMP-EUR]" 
[JP] Sony PSP (feb.24, 2005) "Namco Museum [Model ULJS-00012]" 
[KO] Sony PSP (may.2, 2005) "Namco Museum [Model UCKS-45005]" 
[EU] Sony PSP (dec.9, 2005) "Namco Museum Battle Collection [Model UCES-00116]" 
[EU] Nintendo Game Boy Advance (mar.31, 2006) "Namco Museum - 50th Anniversary [Model AGB-B5NP-EUR]" 

* COMPUTERS:
[EU] Commodore C64 (1983) 
[JP] Fujitsu FM-7 (1984) 
[JP] MSX (1984) 
[JP] NEC PC-6001 Mk2 
[JP] PC 8801 (1985) 
[JP] Fujitsu FM-77AV (1986) 
[JP] Sharp X68000 (feb.24, 1995) "Dig Dig I & II" 
[JP] PC [MS Windows, CD-ROM] (june.9, 1998) "Namco History Vol.3" 
[AU] PC [MS Windows, CD-ROM] (mar.27, 2006) "Namco Museum - 50th Anniversary" 
[EU] PC [MS Windows, CD-ROM] (may.19, 2006) "Namco Museum - 50th Anniversary" 
[JP] Sord-M5
[JP] PC [MS Windows, Online] (apr.20, 2016) "Arcade Game Series - Dig Dug" 

* OTHERS:
[JP] VFD handheld game (19??) by Gakken. 
[JP] Arcade (1996) "Namco Classics Collection Vol.2"

### Series
1. Dig Dug (1982, ARC)
2. Dig Dug II (1985, ARC)
3. Dig Dug Arrangement (1996, ARC): part of "Namco Classics Collection Vol.2"
4. Dig Dug Deeper (2001, PC)
5. Dig Dug Arrangement (2005, PSP): part of "Namco Museum Battle Collection" 
6. Dig Dug - Digging Strike (2005, DS)

### Contribute
Edit this entry: https://www.arcade-history.com/game/637/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `digdug`. Play it at [../app/g/digdug/](../app/g/digdug/) or [explore the knowledge graph](viewer.html).*
