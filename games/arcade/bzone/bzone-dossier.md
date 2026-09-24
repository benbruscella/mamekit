# Battlezone (rev 2)

**Atari · 1980** — transpiled from the MAME driver `src/mame/atari/bzone.cpp` by mamekit.

![marquee](/artwork/media/marquees/bzone.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/bzone.webp) | ![cabinet](/artwork/media/cabinets/bzone.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M6502 | 1.512 MHz | 16 |

- **Sound:** pokey × 1 @ 1.512 MHz
- **Screen:** 581×401 @ 41.02 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `036414-02.e1` | 0x5000 | 0x800 | `13de36d5` |
| `maincpu` | `036413-01.h1` | 0x5800 | 0x800 | `5d9d9111` |
| `maincpu` | `036412-01.j1` | 0x6000 | 0x800 | `ab55cbd2` |
| `maincpu` | `036411-01.k1` | 0x6800 | 0x800 | `ad281297` |
| `maincpu` | `036410-01.lm1` | 0x7000 | 0x800 | `0b7bfaa4` |
| `maincpu` | `036409-01.n1` | 0x7800 | 0x800 | `1e14e919` |
| `maincpu` | `036422-01.bc3` | 0x3000 | 0x800 | `7414177b` |
| `maincpu` | `036421-01.a3` | 0x3800 | 0x800 | `8ea8f939` |
| `avg:prom` | `036408-01.k7` | 0x0 | 0x100 | `5903af03` |
| `user2` | `036174-01.b1` | 0x0 | 0x20 | `8b04f921` |
| `user3` | `036175-01.m1` | 0x0 | 0x100 | `2af82e87` |
| `user3` | `036176-01.l1` | 0x0 | 0x100 | `b31f6e24` |
| `user3` | `036177-01.k1` | 0x1 | 0x100 | `8119b847` |
| `user3` | `036178-01.j1` | 0x1 | 0x100 | `09f5a4d5` |
| `user3` | `036179-01.h1` | 0x2 | 0x100 | `823b61ae` |
| `user3` | `036180-01.f1` | 0x2 | 0x100 | `276eadd5` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 6 | coin2 | `IN0` | 0x2 |
| 9 | diagnostic step | `IN0` | 0x20 |
| K | joystickright down | `IN3` | 0x1 |
| I | joystickright up | `IN3` | 0x2 |
| S | joystickleft down | `IN3` | 0x4 |
| W | joystickleft up | `IN3` | 0x8 |
| Space / X | button1 | `IN3` | 0x10 |
| 1 | start1 | `IN3` | 0x20 |
| 2 | start2 | `IN3` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN0` | 0x10 | 0x10 |
| Lives | `DSW0` | 0x3 | 0x1 |
| Missile appears at | `DSW0` | 0xc | 0x4 |
| Bonus Life | `DSW0` | 0x30 | 0x10 |
| Language | `DSW0` | 0xc0 | 0x0 |
| Coinage | `DSW1` | 0x3 | 0x3 |
| Coin B | `DSW1` | 0xc | 0x0 |
| Coin A | `DSW1` | 0x10 | 0x0 |
| Bonus Coins | `DSW1` | 0xe0 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/atari/bzone.cpp`
- **Written by:** Brad Oliver, Nicola Salmoria
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Brad Oliver (driver header); Nicola Salmoria (driver header); couriersud (4 release notes); 125scratch (2 release notes); ClawGrip (2 release notes); MooglyGuy (2 release notes); zaxxon (2 release notes); Javier Blanco Ojeda (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 166 commits by 27 commit authors, 2007–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Arcade Video game published 46 years ago:

Battlezone (c) 1980 Atari, Incorporated.

Battlezone is a classic one-player first person 3-D wire frame shoot-em-up in which the player controls a tank patrolling a dangerous war zone. Set in a valley surrounded by mountains, the aim is to destroy as many enemy tanks as possible, while avoiding return fire and destroying or avoiding the homing missiles that occasionally appear.

Enemy tanks come in two varieties; standard slow-moving tanks and fast-moving 'Super Tanks'. A single hit taken from either an enemy tank or homing missile will result in the loss of a player tank. A flying saucer also occasionally appears but does not attack the player and can be either ignored or destroyed for bonus points.

A radar screen at the top of the play area shows the current position of any enemy tanks or missiles within range, and the war zone is littered with indestructible pyramids and boxes that can provide temporary cover. Only a single shot is allowed on screen at any one time so accuracy of shots is vital to survival.

### Technical
Upright cabinet dimensions : 
74.82 in. (190 cm) high. 
25.25 in. (64.13 cm) wide. 
25.26 in. (64.16 cm) deep. 
Weight : 290 lbs (131.5 kg). 
Monitor : 19-in. QuadraScan. 

Game ID : 0364xx 

Main CPU : MOS Technology M6502 (@ 1.512 Mhz) 
Co-processor : Math Box 
Sound Chips : POKEY (@ 1.512 Mhz), Custom (@ 1.512 Mhz) 

Palette colors : Black and White with green and red screen overlays. 

Control : Double 2-way joysticks (both vertical, side by side) with a button for firing shots atop the right hand joystick.

### Trivia
Battlezone went into the arcades in November 1980 and created such a sensation that the U.S. army ordered modified versions of the games to use in training.

Battlezone selling in 1980 at an MSRP of $2095. Exactly 13022 units were produced.

Battlezone was the first environmental 3-D landscape game. The game used a system of bit-slice processors called a 'mathbox' to do 3-D calculations for the display. This kind of 'squeezing the most out of minimal hardware' mindset was what led Atari to create the innovative games it did in the 1980's. 

As Battlezone was so innovative for its time, the US Army commissioned Atari to create a version of the game for infantry vehicle training (called "Bradley Trainer"). Ed Rotberg was assigned the project, but was very opposed to it. Major Dave Robinson and General Donn Starry of the U.S. Army were responsible for bringing Atari the idea of making a military version to be used in training. 

* The Creation of Battlezone : The idea of a tank simulator was championed by Morgan Hoff, who became the project leader for Battlezone, while Ed Rotberg was the principal programmer.

Ed Rotberg: 'Morgan Hoff more or less championed it and decided to put together a team to implement the game. Given the technology that we had, the real challenge was how to make the game appear as if we had more technology than we did. And the question was always : How do we involve the player? Meeting those needs was where the artistry was involved in designing a game in those days.' 

The developers used brilliant software code and innovative circuitry to create a high tech look. But some low-technology tricks were used as well. For example, a simple band of red cellophane was applied to the inside of the Battlezone screen. Placed across the top of the screen, the result was red colors for the radar and warning messages, even though Battlezone didn't have a two-color display.

A game takes on a life of its own, Rotberg said : "Most games rarely turn out exactly the way that you plan them. Every time that you play the game, you try to amplify those things that are fun, and you try to pare away those things that are annoying and really not enjoyable. It is kind of like a story that grows in the telling.". 

* Remembrances from the Video Game Masters : On the erupting volcano in the background of Battlezone, Ed Rotberg said : "One of the other programmers who was working on another project in the same lab kept saying, "Why don't you make the volcano active?" I had enough to do just to make the game play. And everyday he would say "You know, you really need to make that volcano active". He is really currently one of my very best friends, and he is a wonderful guy. But he kept pestering me about this. One day I said, "You're a programmer. If you want the volcano active, you write the code and I'll put it in". So I came in the next day and there was this chunk of code on my desk describing the motion of the rocks and such. I took an afternoon off and put the code into the program. That's how the volcano became active. It was never in the design.".

Atari engineers were always amazed by the abilities of the players out in the arcades.

Morgan Hoff : "I remember a game that contained a succession of increasingly difficult mazes ranging from easy to difficult, to those requiring super human skill in timing. I was completely surprised to find players who could complete the most difficult levels. They were in a world of their own. They played the game with incredibly accurate hand and eye coordination and memory. One day I was in an arcade and... the best player was seven. He was extraordinary and he was standing on a chair to reach the controls.". 

Although Atari engineers uniformly praised the best players out in the arcades, many of the engineers were awesome players themselves. Once two Atari engineers went on a skiing vacation in Utah and Dan Pliskin came back with the following story : "We were at Snowbird, and we had only been there a few days when we started to miss video games. So, we found a little arcade and my friend got onto a Missile Command (which was a pretty old game by then) and I got onto some pinball machine. We broke the high-score tables, and he had, like, 200 free cities and I had, like, 60 free games. When we got tired of playing, we just left them to these kids that were just wide-eyed, staring at us. The kids were standing there with their mouths open. They had never seen pinball wizards and video game masters.". 

* Popular from the Start : As Battlezone took shape, engineers in the lab wanted to play it, a lot.

Ed Rotberg : 'Usually when you have a winner you leave your lab for awhile and when you return there are people standing around playing your game, and that happens over and over again. You end up having to kick them off your machine to get any work done. That is your first indication that you have a winner. And I have never seen a really strong game that did not have that appeal. The guys in the labs are pretty good barometers". 
Another barometer, though after the fact, was to go into the arcades to watch others playing it. Rotberg continued : "The best feeling for a game designer is to go out into an arcade and see people having fun playing the game that they created. There is nothing better than that. To walk around and see all the other games, and know that people can choose from anything in there, but they are playing your game. That is pretty heavy stuff.' 

* The Great 25-Cent Escape : Battlezone provided great escape for a quarter.

Rich Adam : 'Battlezone was a great one. I did love that game. Why was that business so phenomenal then? For a quarter you could be in a tank simulator, a pretty darn good one. That was pretty good value. That's what made Battlezone a phenomenon.'

Dan Pliskin : 'There's a certain class of games where you just get into a trance when you're playing them. As long as you're in this trance, you're doing fine.'

The attraction of Battlezone's world was so strong that many players wanted to turn their back on the fighting and drive their tank up into the mountains to go exploring. The designers of the game had to put in a routine to send a missile after would-be explorers so that arcade owners wouldn't lose money on the peaceful tourists who didn't want to fight. Many great legends emerged from the arcades that centered on finding a way to leave the fighting behind.

Lyle Rains : 'One letter came in from a Battlezone fan who said that a friend of his had told him that if you drove far enough you finally got to the volcano, and if you drove over the top of the volcano, you could go down into the crater. And he said that inside the crater there was a castle, and that you could go inside and explore the castle. Of course, none of this was true. It was a great little story to get from a fan. Who knows, we may yet do a volcano with a castle in it.'

David Palmer holds the official record for this game with 23,000,000 points on August 30, 1985. 

A Battlezone unit appears in the 1982 movie 'Tron', in the 1983 movie 'Joysticks', in the 1984 movie 'The Philadelphia Experiment' and in the 1986 movie 'Running Scared' (the cab appears in Billy Crystal's apartment). 

In 1982, Atari released a set of 12 collector pins including : "Missile Command", "Battlezone", "Tempest", "Asteroids Deluxe", "Space Duel", "Centipede", "Gravitar", "Dig Dug", "Kangaroo", "Xevious", "Millipede" and "Food Fight". 

An upright Battlezone unit appears in the 38 Special music video 'Caught Up In You'.

### Scoring
Tank (Slow) : 1,000 points. 
Super Tank (Fast) : 3,000 points. 
Missile : 2,000 points. 
Saucer : 5,000 points.

### Tips and tricks
* When you start the game, you will be put into a surrealistic landscape. Almost immediately, an enemy will appear on the screen. You will know this by a warning sound the machine makes plus the enemy will show up on your radar. First of all, this game will be very different because you must look through a periscope apparatus. This is to give the feeling of being confined in a tank. Get used to limited movement of your head and use your eyes to quickly take in the entire battlefield in a glance. 

* You must be able to identify different sounds in this game. Sounds you need to know are : 
1) The warning that an enemy is on the battlefield. 
2) The sound of an incoming missile. 
3) The sound of a shot being fired (by you or at you). 
4) The sound of the saucer. 
5) The joyous sound of actually destroying something. 
6) The sound when your tank bumps into an object (enemy unit or battlefield obstacle). 

* Your field of vision is approximately 45 degrees. This means you will have to learn to use your radar effectively for anything out of your field of vision. The 45 degree wedge always faces forward (your line of site). Enemies (except the saucer) will show up on your radar as a dot. Plus you will hear the beep as the radar sweep continues to cross over it. 

* Be not only aware of where the enemies are, but also where the obstacles are also. There's nothing more frustrating then having the perfect shot lined up, or the perfect escape planned when you run into something. This is especially true when you are moving backwards. 

* In order to line up with an enemy tank, you must turn your entire tank toward the enemy. The turret and tank are one piece versus being able to turn the turret independently of the tank. 

* You can only have one shot out at a time. This can prove to be the difference between life and death since if you fire a stray shot, you must wait for that shot to hit an object or disappear into the horizon before your tank is loaded again. This can take a couple of seconds. On the same note, the enemy tanks also work under this restriction. In other words, make sure you have your target lined up before taking a shot. 

* The game starts out giving you the standard tanks. These tanks move slower then your tanks so they are pretty easy to kill. After scoring 20,000 points (not including the points earned for killing the flying saucers), however, the Supertanks make their appearance. These tanks are much quicker then your tank so you have to take them out quickly. 

* Tank killing isn't actually too hard once you get the rhythm of how to do it down. There are a few methods for killing tanks : 

1) When the tank first appears on your radar, turn around so that you are facing it, but keep moving. The enemy tank will of course take a shot at your tank. It aims at where you are, not at where you are going. When you hear the sound of an enemy tank shooting at you, move away from the line of fire and launch an attack before the enemy tank can fire again. Never drive straight toward an enemy tank. You'll put yourself in the line of fire. Use wide arching turns or a zigzagging path. 

2) Now, move backwards and turn slightly in the same direction of where the enemy tank is. In other words, if the enemy tank is slightly to your left, then go backwards while turning your own tank to the left. You may even see the enemy's tank shot appear in your field of vision. That means you have the right angle on the turn. Be cautious when backing up. You don't want to back into enemy fire.

3) At the same time you are moving backwards, the enemy tank will be moving up to engage your tank. Continue the above until the enemy tank is practically on top of your tank. Then rapidly turn left or right and hit him with a point-blank shot. Sometimes the enemy tank hits yours. Just like an obstacle, the enemy tank will back up and speed away. Turn rapidly to hit him before he can set up for a shot. Again, the Supertanks recover much quicker then the standard tanks. 

4) This will work on both regular tanks and Supertanks. The difference is the fact that Supertanks close the distance much quicker than regular tanks. 

5) Another way is to put an obstacle between yourself and the enemy tank. When an enemy tank hits an obstacle, they back up and move quickly away for a brief moment before they turn again to fire on your tank. If you are good, you can 'lead' the target when they are backing up or going forward and score a kill that way. Of course, this method is much more difficult. Beware : Rectangular blocks are too low to offer protection.

* Don't attempt to outrun a Supertank. They can easily catch up to you. Plus, they like to get behind your tank to blast you from the rear. Nothing like not hearing the shot that destroys your tank. 

* Another battlefield hazard is the missile. The first missile is dependent on the score setting. It is an easy one that comes straight for your tank. Just sit there and blow it apart. After that, though, things aren't as easy. As with the tanks, there is a method and certain rhythm to taking out missiles. 

1) The missile will come down and take a hard turn to the right (as you are facing it). Then it will take a hard turn to the left. Then another hard turn to the right to hit your tank. 

2) You can stay still and just turn your tank slightly. When the missile is turning to the left, fire ahead of it and you can destroy it. 

3) Move backwards and turn toward your left. That way the missile will go across your field of vision before it makes its right turn again. 

4) When the missile comes, move backward and take a 'blind' shot. You may get lucky. Even if you don't, moving backwards will enable you to get another shot. However, use patience when firing at missiles. If the first 'blind' shot misses, don't fire the next shot until after the missile has travelled at least part way up the screen because it can alter its course randomly and hitting it takes time.

5) If you are really good, you can wait until it takes the last turn to the right toward your tank. Spin around and hit it like that. This is a very rough shot to execute. 

6) If you mess up, sometimes you can move forward and to the right to cause the missile to miss. You also can usually cause a miss by putting tall (not the short ones you can shoot over) obstacles in your way. 

7) Regardless of method, make sure there are not obstacles between you and the missile. The missile is capable of jumping all obstacles and it will also eliminate the missile's pattern. Nothing like a missile jumping over an obstacle and landing on top of your tank. 

8) For multiple missiles, you will have to adjust your direction so that when the next missile lands, it will be centered in your gunsight. You can also confirm this by using your radar. 

* You will usually get a missile after about five tanks. Missiles usually come in twos or threes to make your life more exciting. They appear more frequently after you've earned 10,000 points. The first missile will also appear if you don't fire a shot within the first 45 seconds of play.

* Beware of Flying Saucers! They can't attack your tank, but they can create quite a distraction. Don't forget while you're going after the high scores, the enemy tank is still aiming and firing at you.

* Saucers are a great way to earn points. They are, unfortunately, on the battlefield when other enemies are present. If you have a safe, clear shot, then go for them. If not, you can still take a pot shot at them. 
This is usually when you are spinning your tank around to deal with another enemy. If a saucer happens to be in the way, take a shot at it. You don't get points, however, if an enemy tank takes out a saucer. 

* If you do want to try for the big points that flying saucers bring, listen for the warning sound and try to fire while the enemy tank is waiting for its last shot to land...but make sure it doesn't land on you.

* Another great thing about this game is that you will only have to deal with one enemy at a time. For example, if the missile appears, then the tank will disappear so you can concentrate on the missile. 

* After destroying an enemy tank, prepare for the worst. Although there aren't formal levels to the game, Battlezone responds to your successes by increasing the speed and ferocity of enemy attacks.

### Staff
Project Leader : Morgan Hoff 
Programmer : Ed Rotberg (Game Play, also the tank treads) 
Hardware Engineer : Jed Margolin (3-D algorithms, Object Digitization, Hardware Sounds, Moon) 
Technician : Doug Snyder (also hardware design) 
Bit Slice Math Box : Mike Albaugh, Dan Pliskin   
Analog Vector Generator Design : Howard Delman 
Design of 3D Objects : Harry Jenkins, Roger Hector 
Volcano : Owen Rubin

### Ports
* CONSOLES: 
[US] Atari 2600 (1983) "Battlezone [Model CX2681]"
[JP] Atari 2600 (1983) 
[EU] Atari 2600 (1988) "Battlezone [Model CX2681P]" 
[US] Atari 5200 "Battlezone [Model CX5239]" : prototype only
Atari XEGS 
[US] Sony PlayStation (dec.31, 1996) "Arcade's Greatest Hits - The Atari Collection 1 [Model SLUS-00339]" 
[EU] Sega Saturn (1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model T-25413H-50]" 
[US] Sega Saturn (june.30, 1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model T-9706H]" 
[US] Nintendo SNES (aug.1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model SNS-AW7E-USA]" 
[EU] Sony PlayStation (dec.1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model SLES-00466]" 
[EU] Nintendo SNES (feb.26, 1998) "Arcade's Greatest Hits - The Atari Collection 1 [Model SNSP-AW7P-EUR]" 
[US] Sony PlayStation (2001) "Atari Anniversary Edition Redux [Model SLUS-01427]" 
[US] Sega Dreamcast (jul.2, 2001) "Atari Anniversary Edition [Model T-15130N]" 
[EU] Sony PlayStation (mar.1, 2002) "Atari Anniversary Edition Redux [Model SLES-03808]" 
[US] Microsoft XBOX (nov.16, 2004) "Atari Anthology [Model 26084]"  
[US] Sony PS2 (nov.22, 2004) "Atari Anthology [Model SLUS-21076]" 
[EU] Microsoft XBOX (nov.26, 2004) "Atari Anthology" 
[EU] Sony PS2 (feb.18, 2005) "Atari Anthology [Model SLES-53061]" 
[JP] Microsoft XBOX (aug.4, 2005) "Atari Anthology [Model B7X-00001]" 
[US] [EU] Microsoft XBOX 360 [XBLA] (apr.16, 2008) 

* HANDHELDS: 
[US] Atari Lynx (1994) "Battlezone 2000 [Model PA2088]" 
[EU] Nintendo Game Boy (1996) "Arcade Classics - Battlezone & Super Breakout [Model DMG-ABSE-EUR]" 
[US] Nintendo Game Boy (oct.1996) "Arcade Classics - Battlezone & Super Breakout [Model DMG-ABSE-USA]" 
[US] Nintendo GBA (mar.25, 2002) "Atari Anniversary Advance [Model AGB-AAVE-USA]" 
[EU] Nintendo GBA (feb.14, 2003) "Atari Anniversary Advance [Model AGB-AAVP]" 
[US] Sony PSP (dec.19, 2007) "Atari Classics Evolved [Model ULUS-10325]" 
[AU] Sony PSP (mar.7, 2008) "Atari Classics Evolved" 
[US] Nintendo DS (nov.2, 2010) "Atari Greatest Hits Vol.1 [Model NTR-BR6E-USA]" 
[EU] Nintendo DS (feb.24, 2011) "Atari Greatest Hits Vol.1 [Model NTR-BR6P-EUR]" 

* COMPUTERS: 
[US] Apple II (1983) 
[US] Commodore VIC-20 (1983) 
[EU] Commodore C64 (1983) 
[US] Commodore C64 (1983) "Battlezone [Model RX8548]" 
[US] PC [Booter] (1983) 
[EU] Sinclair ZX Spectrum (1984) 
[US] Tandy Color Computer (1985) "Rommel 3D" 
[EU] Atari ST (1986) 
[US] Tandy Color Computer (1988) "Turret" : written completely in Extended BASIC. 
[US] PC [MS Windows 3.1x, 3.5"] (1993) "Microsoft Arcade" 
[US] [EU] PC [MS Windows, CD-ROM] (2000) "Atari Arcade Hits 2" 
[US] PC [MS Windows, CD-ROM] (jul.9, 2001) "Atari Anniversary Edition" 
[EU] PC [MS Windows, CD-ROM] (dec.14, 2001) "Atari Anniversary Edition" 
[US] PC [MS Windows, CD-ROM] (2003) "Centipede & Battlezone" by Selectsoft 
[US] PC [MS Windows, CD-ROM] (nov.11, 2003) "Atari - 80 Classic Games in One! [Model 25069J]" 
[EU] PC [MS Windows, CD-ROM] (june.10, 2005) "Atari - 80 Classic Games in One! [Replay]" 

* OTHERS: 
[US] Nokia N-Gage (2005) "Atari Masterpieces Vol. I" 
[EU] Nokia N-Gage (oct.13, 2005) "Atari Masterpieces Vol. I" 
Apple Store (2012) "Atari Greatest Hits" 
Google Play (2012) "Atari Greatest Hits"

### Contribute
Edit this entry: https://www.arcade-history.com/game/210/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `bzone`. Play it at [../../../app/g/bzone/](../../../app/g/bzone/) or [explore the knowledge graph](viewer.html).*
