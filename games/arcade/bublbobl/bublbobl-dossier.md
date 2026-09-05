# Bubble Bobble (Japan, Ver 0.1)

**Taito · 1986** — transpiled from the MAME driver `src/mame/taito/bublbobl.cpp` by mamekit.

![marquee](/artwork/media/marquees/bublbobl.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/bublbobl.webp) | ![cabinet](/artwork/media/cabinets/bublbobl.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 6.000 MHz | 13 |
| `subcpu` | Z80 | 6.000 MHz | 2 |
| `audiocpu` | Z80 | 3.000 MHz | 8 |
| `mcu` | M6801U4 | 4.000 MHz | 1 |

- **Sound:** ym2203 × 1 @ 3.000 MHz
- **Screen:** 256×224 @ 59.19 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `a78-06-1.51` | 0x0 | 0x8000 | `567934b6` |
| `maincpu` | `a78-05-1.52` | 0x10000 | 0x10000 | `9f8ee242` |
| `subcpu` | `a78-08.37` | 0x0 | 0x8000 | `ae11a07b` |
| `audiocpu` | `a78-07.46` | 0x0 | 0x8000 | `4f9a26e8` |
| `mcu` | `a78-01.17` | 0x0 | 0x1000 | `b1bfb53d` |
| `gfx1` | `a78-09.12` | 0x0 | 0x8000 | `20358c22` |
| `gfx1` | `a78-10.13` | 0x8000 | 0x8000 | `930168a9` |
| `gfx1` | `a78-11.14` | 0x10000 | 0x8000 | `9773e512` |
| `gfx1` | `a78-12.15` | 0x18000 | 0x8000 | `d045549b` |
| `gfx1` | `a78-13.16` | 0x20000 | 0x8000 | `d0af35c5` |
| `gfx1` | `a78-14.17` | 0x28000 | 0x8000 | `7b5369a8` |
| `gfx1` | `a78-15.30` | 0x40000 | 0x8000 | `6b61a413` |
| `gfx1` | `a78-16.31` | 0x48000 | 0x8000 | `b5492d97` |
| `gfx1` | `a78-17.32` | 0x50000 | 0x8000 | `d69762d5` |
| `gfx1` | `a78-18.33` | 0x58000 | 0x8000 | `9f243b68` |
| `gfx1` | `a78-19.34` | 0x60000 | 0x8000 | `66e9438c` |
| `gfx1` | `a78-20.35` | 0x68000 | 0x8000 | `9ef863ad` |
| `proms` | `a71-25.41` | 0x0 | 0x100 | `2d0f8545` |
| `plds` | `pal16l8.bin` | 0x0 | 0x1 | `` |
| `plds` | `pal16r4.bin` | 0x0 | 0x1 | `` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 9 | service1 | `IN0` | 0x2 |
| 5 | coin1 | `IN0` | 0x4 |
| 6 | coin2 | `IN0` | 0x8 |
| Left | joystick left | `IN1` | 0x1 |
| Right | joystick right | `IN1` | 0x2 |
| Z | button2 | `IN1` | 0x10 |
| Space / X | button1 | `IN1` | 0x20 |
| 1 | start1 | `IN1` | 0x40 |
| 2 | start2 | `IN2` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Mode | `DSW0` | 0x5 | 0x4 |
| Flip Screen | `DSW0` | 0x2 | 0x2 |
| Demo Sounds | `DSW0` | 0x8 | 0x8 |
| Coin A | `DSW0` | 0x30 | 0x30 |
| Coin B | `DSW0` | 0xc0 | 0xc0 |
| Difficulty | `DSW1` | 0x3 | 0x3 |
| Bonus Life | `DSW1` | 0xc | 0xc |
| Lives | `DSW1` | 0x30 | 0x30 |
| Unknown | `DSW1` | 0x40 | 0x40 |
| ROM Type | `DSW1` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/taito/bublbobl.cpp`
- **Written by:** Chris Moore, Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 211 commits by 33 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, AJR

## The story

Arcade Video game published 40 years ago:

Bubble Bobble (c) 1986 Taito Corp.

One or two players take on the role of Bub and Bob, two cute dinosaurs who must battle through 100 platform-packed single screen levels to rescue their girlfriends. Bub and Bob are armed only with the ability to blow bubbles, in which the game's many enemies can be trapped and killed. The bubbles can also be used as temporary platforms, to help the dinosaurs reach previously inaccessible areas of a level. 

Any trapped enemies who are not killed quickly enough will turn red and escape their bubble prison. These angry enemies are much faster than before, making them harder to kill. Enemies also become angry if players are taking too long to complete a level. Defeated enemies are turned into bonus fruit items that can be collected for points. 

On many levels, bubbles containing fire, water or a lightning bolt appear. These can be burst by players to release their contents and destroy enemies. The fire bubble drops flames down onto the nearest platform, killing any enemies it hits. The lightning bubble sends a lightning bolt horizontally across the screen, its direction dictated by whichever side of the bubble the player hits to burst it. The water bubble releases a torrent of water that will quickly flow down the platforms to the bottom of the screen. Any enemies caught in the flow are killed. 

Bubbles containing letters also appear. The aim is to collect the letters needed to spell the word E.X.T.E.N.D. which earns players an extra life. 

The game's simple-yet-involving game-play saw Bubble Bobble become an instant classic. Its two-player co-operative mode, coupled with the incredible amount of hidden secrets and potential for strategic play - unheard of in the platform genre - would set the standard by which all other platform games were judged.

### Technical
Main CPU : (2x) Zilog Z80 (@ 6 Mhz), Zilog Z80 (@ 3 Mhz), M6801 (@ 1 Mhz)
Sound Chips : YM2203 (@ 3 Mhz), YM3526 (@ 3 Mhz)

Players : 2
Control : 2-Way Joystick
Buttons : 2
=> [1] Bubble, [2] Jump

### Trivia
Bubble Bobble was released in August 1986. 

This was one of the first games to feature multiple endings. 

The title of this game, Bubble Bobble, is a cross between the words 'bubble' and the name of the heroes : Bub and Bob. 

The enemies are named (Round number of initial appearance applies to 'Normal' mode. For information on 'Super' mode, please see the Romstar (US version) entry, Updates section : 
'Zen-Chan' [aka 'Bubble Buster', 'Benzo'] - First appears in Round 1 
'Mighta' [aka 'Stoner', 'Boris'] - First appears in Round 6 
'Monsta' [aka 'Beluga', 'Blubba'] - First appears in Round 10 
'PulPul' [aka 'Hullaballoon', 'Boaboa'] - First appears in Round 20 
'Banebou' [aka 'Coiley', 'Bonnie-bo'] - First appears in Round 30 
'Hidegonsu' [aka 'Incendo'] - First appears in round 40 
'Drunk' [aka 'Willy Whistle', 'Bonner'] - First appears in Round 50 
'Invader' [aka 'Super Socket'] - First appears in Round 60 
'Super Drunk' [aka 'Grumple Gromit'] - the boss character whom Bub and Bob fight in the final round 
'Skel-Monsta' [aka 'Baron Von Blubba'] - Appears when you take too much time in a round 
'Rascal' [aka 'Rubblen'] - Appears when you linger too long in a secret room 

The data code contains unused graphics of a full set of slot machine icons. These aren't used anywhere, there's no palette that fits them, and they wouldn't really fit anywhere either. 

In 1996, Taito announced that they lost the original source code program to Bubble Bobble following a reorganization - when it came to the recent ports and sequels, they had to work from program disassembly, playing the game and (mainly) the various home computer ports. 

The game forbids the initials 'SEX' on the high score table. If you try, it gets changed to 'H.!', but go to the Tips and Tricks section for more information about 'SEX' :-) 

Olly Cotton holds the official record for this game with 6,060,730 points on February 23, 2011. 

Some bootlegs of this game are known as "Bobble Bobble" and "Super Bobble Bobble". 

Alfa Records released a limited-edition soundtrack album for this game (Taito Game Music - 28XA-110) on January 25, 1987. 

NES cover band The Advantage cover two songs from Bubble Bobble on their self-titled debut album released on April 6, 2004.

### Scoring
Bursting a bubble : 10 points. 
Killing one monster : 1,000 points. 
Killing two monsters at once : 2,000 points. 
Killing three monsters at once : 4,000 points. 
Points double for each extra monster killed at any one time. 
Normal Fruit : 700 points. 
Bonus Score Items (popcorn, burger etc) : 500 - 4,000 points.

### Tips and tricks
* Bubble Bobble is a game heavily relying on game-play and precise technique rather than graphics, and it features a series of special techniques and tricks a player can perform to maximize his or her score, make some rounds of the game easier or faster to finish or just to be able to survive or even finish a round. Some of these techniques have special nicknames, which may differ from player to player and from country to country. 

'Kissing monsters' or just kissing means killing a monster by blowing a bubble at almost contact distance : the monster will be instantly bubbled and the bubble will be instantly popped, giving the visual effect of the player killing a monster with a 'kiss'. Some players flip their joysticks in the opposite direction after pressing the bubble buttons, giving more chances of an 'instant pop' and changing flight direction for the dead monster. This technique is useful in stages where monsters move too fast, bubbles last for too short of a time or it's otherwise hard to bubble them normally. Of course good timing is required for this technique to work. 

'Riding bubbles' means keeping the jump button pressed when dropping on a bubble: if done correctly, instead of popping the bubble, your dragon will instead jump on it, possibly continuously, enabling him to 'ride' bubbles in order to reach otherwise unreachable areas. Some stages can't be finished without this technique. 

'Climbing' is a step up from riding bubbles. It means standing at half a bubble distance from a wall, jumping and blowing a bubble almost simultaneously, jumping up from that bubble and blowing another bubble and so on. This is necessary if the air current pushes down bubbles but you need to climb up. Having the rapid-bubbling power-up (the yellow candy) makes climbing a lot easier, especially if you got the running shoes already. 

'Bubbling oneself through' means 'riding a bubble' through the opening at the top of a stage or even just through the ceiling of a stage in order to appear at the lower part, like some flying monsters can do. This technique is required to finish some stages or to get unstuck from some places, or just to save time. 

'Blowing against the wall' means blowing bubbles against wall at contact distance : the bubbles will pop immediately thus giving the player 10 points per bubble pop. This can be used to either increase a player's score, or to set a player's score to a specific amount, in order to do other tricks. 

'Two equal digits' means using the 'blowing against the wall' technique or other score-adjusting techniques in order to make the two penultimate (100s and 10s places) digits of at least one player equal, e.g., 456770, before the last enemy bubble is burst. If done correctly and the score is not modified when this occurs, then all remaining non-special bubbles on screen will be turned to 700-point bonuses, whose appearance depends on the digit picked. E.g., 7 gives Chocolate Ice Creams, 3 gives Hamburgers, and so on. 
Note : This trick is easier to do with two players (one player adjusts his score and the other bursts the bubbles), but it can also be done with only one player, although calculating exactly how much (and if) one's score will be modified when bursting the last enemy bubbles can be extremely complex, if not unpredictable, especially if there are very large and clustered bubble bunches. 
Note : Rounds with numbers ending with 5 and 0 up to and including level 50 generate bonuses from bubbles automatically, though, and some rounds (including round 1) do it by default. 

Internal Counters : An interesting (and exploitable) part of bubble bobble is that powerups are not entirely random. As with the two-digit trick, many internal counters in this game decide which special powers are available for collection. For example, rapid bubble shooting (a sweet in yellow wrapping), fast moving bubbles (a blue sweet), or fast moving bubbles (a blue sweet) appear shortly after either Bub or Bob jumps 51 times, pops 51 bubbles, or blows 51 bubbles. Also, running around a lot causes the speed powerup (red shoe) to appear. Keeping this is mind, it is possible to gain all power-ups with relative ease. Although there are many more counters that control various aspects of the game, one of particular interest is the letters forming the word EXTEND. Getting all 7 letters will end the current level and award the player with an extra life 'NICE 1P!' - these letters have a greater chance of appearing when more enemies are defeated simultaneously. Also, gathering three of the same letter causes candy canes to appear which in turn lead to a special big item at the end of the level! 

* Unlimited Run And Rapid Fire : At the main title screen, press Left, Jump, Left, 1P, Left, Fire, Left, 1P. If this is done correctly there will be a message in the bottom left corner of the title screen a red POWER UP!. 

* Original Bubble Bobble : At the title screen, press Shoot, Jump, Shoot, Jump, Shoot, Jump, Right, 1P. It will say at the bottom of screen ORIGINAL GAME. The game will give the PORTALS in some screens, if you can get in them you will get LOADS of diamonds. 

* The 'Super Bubble Bobble' Code : this will change the Bubble Bobble logo in 'Super Bubble Bobble' and the game will change under several points of view : different platform colors, different order for monster appearances... The code that must be entered at the title screen to access Super Bubble Bobble is displayed at the end of the credits after you beat the game in 2 players, normal mode. The message is coded, but it hints you to enter the secret room in level 20 to get the key for decoding. If you do so, you enter the secret room, on the base of which there is an inscription. The first line is the coding of the alphabet, the other lines are coded advices to beat the final boss. The decoded 'secret message' is : SJBLRJSR (Start - Jump - Bubble - Left - Right - Jump - Start - Right) 

The decoded advices in the secret rooms are : 
Room in level 20 : IF YOU WANT TO BECOME THE OLD FIGURE, USE THE POWER OF YOUR FRIENDSHIP, AND FIGHT WITH ME! (hint to play in two player mode to defeat the final boss and see the real ending) 
Room in level 30 : I ENCLOSE THESE MAGICAL MEDICINE HERE, BECAUSE THOSE ARE MY WORST FEARS... (hint to use the lighting bubble to beat the boss) 
Room in level 40 : IF YOU WANT TO GET BACK YOUR LOVE OF TRUTH, YOU MUST HELP EACH OTHER UNTIL THE LAST... (hint to end the game in two player mode to see the real endings) 

A little more trivia on Super Bubble Bobble : If you beat the game in Super mode, two players, you will discover that the final boss is your mother and father that were controlled by some unknown evil. By defeating the boss you free them and your girlfriends, and are reverted back to your original human form (the one you play "Rainbow Island" with). 

* Secret Tombs : Make it to level 20 without dying and a door appears -- it leads to a 'secret tomb', a level full of diamonds. There are secret tombs at levels 20 and 30, also. Make it to level 50 without dying and a strange, bee-hive-shaped door appears; enter it and you warp to level 70. DON'T kill the Drunks on level 50, or the door disappears; bubble them and wait! Btw, with two players, only one of the players must survive unharmed to get the secret door. 

* Paffing A Skel : Skel, also known as 'Baron Von Blubba', is that nasty white monster that comes after you when you've taken too long; with two players, two Skels will appear. If one player is killed by HIS Skel, then he can collide with his partner's Skel 'WHILE HE IS STILL FLICKERING'. If the player's icon is still flickering, the other player's Skel will disappear (poof!), with no harm to the once-slain character. 

* Full Ending Sequence : Beat the game with two players in Super mode and you'll get the full end sequence. 

* High Score Codes : after getting a high score, enter your initials as : 
'SEX' - Pitch fork-flying cakes/vegetables/etc across the screen, turn enemies into 6k diamonds. 
'TAK' - Octopus-turns bubbles into X's at end of level. 
'STR' - Flamingo-turns bubbles into smiling turds at end of level. 
'KTT' - Beer-turns bubbles into pizzas at end of level, what a perfect match !!! 
'...' - Knife-flying cakes/vegetables/etc across the screen, turn enemies into 6k diamonds. 
'I.F', 'MTJ', 'NSO', 'KIM', 'YSH' - Coke can-flying sunflowers across the screen, turn enemies into 6k diamonds. 

* A full map is viewable here: www.arcade-history.com/index.php?page=articles&num=14

### Staff
Game design & Character : Fukio Mitsuji (MTJ)
Software programmers : Ichiro Fujisue (ICH), Nishiyori (NSO)
Sound creator : Tadashi Kimijima (KIM)
Instruction : Yoshida (YSH)
Hardware : Fujimoto (KTU), Seigo Sakamoto (SAK)

### Ports
NOTE: These are only non-US ports. For a list ports released in the US, please see the Romstar (US version) entry. 

* CONSOLES: 
[JP] Nintendo Famicom Disk System (oct.30, 1987) "Bubble Bobble [Model TFD-BUB]" 
[JP] Sega Mark III/Master System (jul.2, 1988) "Final Bubble Bobble [Model G-1362]" 
[EU] Nintendo NES [AU] (1990) "Bubble Bobble [Model NES-B2]" 
[EU] Sega Master System (1992) "Bubble Bobble [Model 7077]" 
[BR] Sega Master System (1994) "Dragon Maze" 
[EU] Sega Saturn (1996) "Bubble Bobble also featuring Rainbow Islands [Model T-8131H-50]" 
[EU] Sony PlayStation (1996) "Bubble Bobble also featuring Rainbow Islands [Model SLES-00448]" 
[JP] Sony PS2 (jul.28, 2005) "Taito Memories Joukan [Model SLPM-66057]" 
[EU] Microsoft XBOX (oct.14, 2005) "Taito Legends" 
[EU] Sony PS2 (oct.14, 2005) "Taito Legends [Model SLES-53438]" 
[KO] Sony PS2 (jul.18, 2006) "Taito Legends [Model SLKA-15056]" 
[JP] Sony PS4 [PSN] (jan.29, 2016) "Arcade Archives - Bubble Bobble [Model CUSA-03711]" 
[EU] [AU] Sony PlayStation 4 [PSN] (apr.1, 2016) "Arcade Archives - Bubble Bobble [Model CUSA-03943]" 

* HANDHELDS: 
[EU] Nintendo Game Boy (1991) "Bubble Bobble [Model DMG-B2-NOE]" 
[JP] Nintendo Game Boy (dec.7, 1990) "Bubble Bobble [Model DMG-B2A]" 
[JP] Nintendo GBA (jul.25, 2002) "Bubble Bobble - Old & New [Model AGB-A2BJ-JPN]" 
[EU] Nintendo GBA (mar.14, 2003) "Bubble Bobble - Old & New [Model AGB-AONP-EUR]" 

* COMPUTERS: 
[EU] Commodore C64 (1987) 
[EU] Sinclair ZX Spectrum (1987) 
[EU] Atari ST (1987) 
[EU] Commodore Amiga (1987) 
[EU] Amstrad CPC (1987) by Firebird : Re-released by Ocean in 1988. 
[EU] Amstrad CPC (1988) "Les Défis de Taito"
[EU] Amstrad CPC (1988) "Taito Coin-Op Hits" 
[JP] MSX [Tape] (1988) 
[JP] MSX2 [Disk]
[JP] Sharp X68000 (1989) 
[EU] Amstrad CPC (199?) "Les Monuments D'Arcade" 
[EU] Amstrad CPC (1990) "Le Monde des Merveilles" 
[EU] Amstrad CPC (1991) "Addicted To Fun - Rainbow Collection" 
[JP] FM Towns PC (1993) 
[EU] PC [MS-DOS, CD-ROM] (sept.30, 1996) "Bubble Bobble featuring Rainbow Islands" 
[EU] PC [MS Windows, CD-ROM] (oct.14, 2005) "Taito Legends"

### Series
1. Bubble Bobble (1986, Arcade) 
2. Rainbow Islands - The Story of Bubble Bobble 2 (1987, Arcade) 
3. Parasol Stars - The Story of Bubble Bobble III [Model TP03017] (1991, PC-Engine) 
4. Bubble Bobble Part 2 (1993, Famicom) 
5. Bubble Bobble II (1994, Arcade) 
6. Bubble Memories - The Story of Bubble Bobble III (1996, Arcade) 
7. Rainbow Islands - Putty's Party (2000, Wonderswan) 
8. Bubble Bobble Revolution (2005, DS) 
9. New Rainbow Islands (2005, DS) 
10. Bubble Bobble Evolution (2006, PSP) 
11. Bubble Bobble Double Shot (2007, DS) 
12. Rainbow Islands Towering Adventure! (2009, WiiWare) 
13. Bubble Bobble Plus! (2009, WiiWare) 
14. Bubble Bobble Neo! (2009, XBLA)

### Contribute
Edit this entry: https://www.arcade-history.com/game/343/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `bublbobl`. Play it at [../../../app/g/bublbobl/](../../../app/g/bublbobl/) or [explore the knowledge graph](viewer.html).*
