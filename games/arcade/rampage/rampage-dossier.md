# Rampage (Rev 3, 8/27/86)

**Bally Midway · 1986** — transpiled from the MAME driver `src/mame/bally/mcr3.cpp` by mamekit.

![marquee](/artwork/media/marquees/rampage.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/rampage.webp) | ![cabinet](/artwork/media/cabinets/rampage.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 5.000 MHz | 7 |
| `sg:cpu` | M68000 | 8.000 MHz | 3 |

- **Sound:** dac × 1 @ 5.000 MHz
- **Screen:** 512×480 @ 30.00 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `pro-0_3b_rev_3_8-27-86.3b` | 0x0 | 0x8000 | `2f7ca03c` |
| `maincpu` | `pro-1_5b_rev_3_8-27-86.5b` | 0x8000 | 0x8000 | `d89bd9a4` |
| `sg:cpu` | `u-7_rev.2_8-14-86.u7` | 0x0 | 0x8000 | `cffd7fa5` |
| `sg:cpu` | `u-17_rev.2_8-14-86.u17` | 0x1 | 0x8000 | `e92c596b` |
| `sg:cpu` | `u-8_rev.2_8-14-86.u8` | 0x10000 | 0x8000 | `11f787e4` |
| `sg:cpu` | `u-18_rev.2_8-14-86.u18` | 0x10001 | 0x8000 | `6b8bf5e1` |
| `gfx1` | `bg-0_u15_7-23-86.15a` | 0x0 | 0x4000 | `c0d8b7a5` |
| `gfx1` | `bg-1_u14_7-23-86.14b` | 0x4000 | 0x4000 | `2f6e3aa1` |
| `gfx2` | `fg-0_8e_6-30-86.8e` | 0x0 | 0x10000 | `0974be5d` |
| `gfx2` | `fg-1_6e_6-30-86.6e` | 0x10000 | 0x10000 | `8728532b` |
| `gfx2` | `fg-2_5e_6-30-86.5e` | 0x20000 | 0x10000 | `9489f714` |
| `gfx2` | `fg-3_4e_6-30-86.4e` | 0x30000 | 0x10000 | `81e1de40` |
| `sg:pal` | `e36a31axnaxqd.u15.bin` | 0x0 | 0x1 | `` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `MONO.IP0` | 0x1 |
| 6 | coin2 | `MONO.IP0` | 0x2 |
| 9 | service1 | `MONO.IP0` | 0x40 |
| Up | joystick up | `MONO.IP1` | 0x1 |
| Right | joystick right | `MONO.IP1` | 0x2 |
| Down | joystick down | `MONO.IP1` | 0x4 |
| Left | joystick left | `MONO.IP1` | 0x8 |
| Space / X | button1 | `MONO.IP1` | 0x10 |
| Z | button2 | `MONO.IP1` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `MONO.IP0` | 0x20 | 0x20 |
| Difficulty | `MONO.IP3` | 0x3 | 0x3 |
| Score Option | `MONO.IP3` | 0x4 | 0x4 |
| Coin A | `MONO.IP3` | 0x8 | 0x8 |
| Coin B | `MONO.IP3` | 0x70 | 0x70 |
| Rack Advance (Cheat) | `MONO.IP3` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/bally/mcr3.cpp`
- **Written by:** Aaron Giles
- **License:** BSD-3-Clause
- **Development:** 210 commits by 27 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, David Haywood, AJR

## The story

Arcade Video game published 40 years ago:

Rampage (c) 1986 Bally Midway.

Rampage is a classic B-movie inspired smash-em-up in which up to three players take on the roles of three mutated monsters - George the giant ape, Lizzie the giant lizard and Ralph the giant wolf - who move from city to city destroying skyscrapers and vehicles, while eating or killing any people that get in their way. 

The monsters' health can be damaged in a number of ways: by being shot by National Guardsmen, by being hit by another monster, by falling from a building, by being hit by police cars or tanks, by going underwater, by being struck by lightning, or by eating something bad, such as dynamite. Health is replenished by eating food found in damaged buildings. 

If the players' health gauge diminishes completely, the monsters will revert back to their original human form and walk sideways off the screen. Rampage has a "buy back in" option, however; if players chose to continue the game before the human figure leaves the play area, the game will continue from that stage. 

Rampage is set over the course of 128 days in cities across North America. The game starts in Peoria, Illinois and ends in Plano, Illinois. In Plano, players receive a mega vitamin bonus which heals all the monsters and provides a large point bonus. After this, the cycle of cities repeats five times. After 768 days, the game resets back to Day One. 

* Examples of bonuses and hazards found inside damaged buildings: 
Food: Milk, Turkey, Hot Toast, Fruit 
Bonus: Flower Pot, TV Set, Money Bag 
Hazard: Cactus, Poison, Toaster 

* Examples of bonuses and hazards found outside damaged buildings: 
Bonus: Auto (or Truck), Commuter Train, Person in Manhole 
Hazard: National Guard Tank, Police Car, Storm Cloud 

Further bonus points can be earned by grabbing a fleeing 'Townie' from a building window. This has two benefits: 1) While holding the Townie, all swat team members disappear from the building windows and 2) accumulating points are scored during the time the Townie is held.

### Technical
Bally Midway MCR 3 hardware
Game No. 0E36

Main CPU: Zilog Z80 (@ 5 Mhz)
Sound CPU: Motorola 68000 (@ 8 Mhz)
Sound Chips: DAC

Players: 3
Control: 8-way joystick
Buttons: 2

### Trivia
Rampage was released in October 1986.

It was also released as a conversion kit for Star Guards as "Rampage [No. 00F06]".

Rampage incorporates Bally Midway's JOIN THE ACTION feature : each set of game controls includes a corresponding start (Jump) button, which is activated independently. This allows a person, after inserting the proper coinage, to begin play at any time including while the other sets of game controls are in use.

Rampage has an impressive 768 different levels. The 128th level of the game is 'Plano, Illinois', and was the only level in the game with less than three buildings. Brian, one of the designers, said : Plano Illinois was only two buildings because Plano Il is a Tiny town, in which my partner Jeff was born and raised.

These are the random headlines you may encounter during the game. These headlines appear when the next day begins :
EX-MUTANT IS ARRESTED FOR STREAKING!
LAB SCREW-UP WEARS OFF...FILM AT 11
SPOUSE OF MUTANT FILES LEGAL ACTION
FORMER BEAST SAYS IT MAY HAPPEN AGAIN
STILL AT LARGE...VERY LARGE!
IS THERE NO END TO THIS RAMPAGE???
PROPERTY VALUES AT ALL TIME LOW
YOUR AD HERE CALL NOW! 1-800-ZOO-KEEP
JOB OPENINGS IN NATIONAL GUARD!
REAL LIFE JEKYLL AND HYDE STORY!!

A Rampage unit appears in the 1991 movie 'Terminator 2 - Judgment Day'.

Rampage was included as a bonus in "Rampage - Total Destruction" for the Nintendo GameCube, Sony PlayStation 2, and Nintendo Wii.

### Scoring
Scoring in this game is relatively complicated due to the various numbers of enemies. In addition, you also score points for hitting buildings and collecting bonus and/or food items. 

* ITEMS 
Bag of loot : 100-500 points. 
Boater : 750 points. 
Building destroyed : 2,500 points.
Car (parked) : 100 points. 
Car (moving slowly) : 200 points. 
Car (parked then takes off quickly) : 750 points. 
Food such as turkey, milk, fruit, hamburger, or toast : 175 points. 
Eating one of the civilians : 500 points. 
Flower pot : 500 points. 
Helicopter : 750 points. 
Holding designated victim : 4,000 - 6,000 points. 
Light bulb (off) : 500 points. 
Manhole cover (per hit) : 500 points. 
Mega-vitamin bonus (every 128 days) : 5,000 points. 
National guardsman : 50 points. 
Neon sign : 1,000 points. 
Paratrooper : 50 points. 
Photographer : 750 points. 
Police car : 750 points. 
Punch causes partial break in building : 25 points. 
Punch cause full break/hole in building : 225 points. 
Safe (after opening) : 100-500 points. 
Tank : 200 points. 
Television (off) : 500 points. 
Train (per hit) : 500 points.

### Tips and tricks
You start the game with your monsters at the bottom of the screen. After the game starts, it is time for you to start the 'urban renewal' process.

* After you start, you will start being attacked. There is no real way to avoid a lot of the attacks by the National Guardsmen due to the sheer volume of fire they are laying down. Your best bet is to keep moving and make yourself a hard target to hit.

* To move quickly from building to building, jump toward the building and push up to grab the building. This enables you to use your monster's ability to both jump and climb at the same time.

* To relieve some pressure from the National Guardsmen, climb up the buildings and smash the windows where they pop out from or just eat them when they are leaning out the window. Move quickly since their buddies are still shooting or throwing dynamite at your monster.

* Unless you are totally obsessed with points, let the National Guardsmen do your work for you. A great example of this is that about midway through a day, a National Guard-man will rush out from the side of the screen with explosives. They will place them at the base of a building. This demolishes the building and helps you along to the next day.

* Another way to destroy buildings is to weaken it up, then jump on the roof. Your monster's weight will cause the building to collapse.

* The air units can be rather dangerous. During the beginning days, the helicopters will overfly your monster, turn around, and then dive in for the attack. You can destroy the helicopters when they are coming in to prevent their attack. Also, when you are moving around, you make it harder for them to get a bead on your monster.

* During the later days, helicopters will drop bombs. Again, paying attention to everything that is going on will allow you to easily escape the bomb being dropped. You can also entice the helicopter to drop a bomb when you are on top of a building. When the bomb is dropped, jump out of the way and let the bomb do the damage to the building for you.

* Make sure that you either grab the food or eat the National Guardsmen to keep your health up. If you can hold out for 128 days, you will get all of your health restored for that day and days 256, 384, 512, 640, and 768. Also keep in mind that if you punch too fast, you may end up getting something that will harm your monster.

* Paratroopers can be a particular pain. If you plan to attack a building with a Paratrooper unit on it, make sure you quickly scale the building and eat said unit. It makes life a lot easier since their rapid fire can put a major hurting on your monster.

* Ground units such as Tanks and Police Cars can be a real nuisance. They fire some pretty heavy shells which not only cause a lot of damage, but they also can knock back your monster for quite a distance. There are some ways to combat these units :
1) Climb quickly up a building. When the unit passes below you, jump down and give it a good punch.
2) Time the shots and rush the ground unit in-between shots to get a good punch in.
3) Use available weapons such as manhole covers, flower pots, or safes to drop on them. These things also allow you to hit them at a distance.

* Be sure and watch what your monster grabs at. There are a lot of hazards in the buildings and it is pretty bad when your monster buys the farm doing dumb stuff such as grabbing electrical items such as toasters and light bulbs.

* In addition to the above, dynamite is sometimes in the middle of buildings. When uncovered, you have about two to three seconds to get your monster out of there before they are blown off the building. Eating it will only decrease your monster's health so run far away when it is uncovered.

### Staff
Artist : Brian Colin
Software : Jeff Nauman
Sounds : Michael Bartlow

Other people involved : Jim Belt, Neil Falconer, Walter Godlewski, Joe Ketza, John Kubik, Tom Leon, Bob Libbe, Sue Lohse, Cary Mednick, Gary Oglesby, Sharon Perry

### Ports
* CONSOLES:
[US] Nintendo NES (dec.1988) "Rampage [Model NES-RP]"

Sega Master System
[US] (1988) "Rampage [Model 5001]"
[EU] (1988)
[AU] (1988) 

[US] Atari 2600 (1989) "Rampage [Model AG-049]"
[US] Atari 7800 (1989) "Rampage [Model AM-049-03]"

Sony PlayStation
[US] (sept.30, 1999) "Arcade Party Pak [Model SLUS-00952]"
[EU] (feb.23, 2001) "Arcade Party Pak [Model SLES-02339]"

[US] Sega Dreamcast (nov.15, 2001) "Midway's Greatest Arcade Hits Vol. 2 [Model T-9714N]"

Microsoft XBOX
[US] (nov.24, 2003) "Midway Arcade Treasures"
[EU] (feb.6, 2004) "Midway Arcade Treasures"

Nintendo GameCube
[US] (dec.18, 2003) "Midway Arcade Treasures [Model DOL-GAKE-USA]"

Sony PlayStation 2
[US] (nov.18, 2003) "Midway Arcade Treasures [Model SLUS-20801]"
[EU] (feb.6, 2004) "Midway Arcade Treasures [Model SLES-51927]"

Microsoft XBOX 360
[US] (nov.6, 2012) "Midway Arcade Origins"
[EU] (nov.15, 2012) "Midway Arcade Origins"

Sony PlayStation 3
[US] (nov.6, 2012) "Midway Arcade Origins [Model BLUS-31083]"
[EU] (nov.15, 2012) "Midway Arcade Origins [Model BLES-01768]"

* HANDHELDS: 
[US] Atari Lynx (1992) "Rampage [Model PA2022]"

Nintendo Game Boy Advance
[US] (aug.21, 2005) "2 Games in One! Paperboy + Rampage [Model AGB-B6BE-USA]"
[EU] (sept.16, 2005) "2 Games in One! Paperboy + Rampage [Model AGB-B6BP]"

Sony PSP
[US] (dec.13, 2005) "Midway Arcade Treasures Extended Play [Model ULUS-10059]"
[EU] (feb.24, 2006) "Midway Arcade Treasures Extended Play [Model ULES-00180]"

* COMPUTERS: 
[US] Atari ST (1986) 
[US] [EU] Commodore C64 (1987) 
[US] Apple II (1988) 
[US] PC [MS-DOS] (1988) 
[EU] Sinclair ZX Spectrum (1988) 
[EU] Amstrad CPC (1988) 
[EU] Commodore Amiga (1989) 
[US] Tandy Color Computer (1989) 

PC [MS Windows, CD-ROM]
[US] (jan.1, 1999) "Arcade's Greatest Hits - The Atari Collection 2"
[US] (aug.27, 2004) "Midway Arcade Treasures"
[EU] (nov.23, 2004) "Midway Arcade Treasures"

* OTHERS: 
[US] Apple iPhone/iPod (feb.23, 2012) "Midway Arcade [Model 476467441]"

### Series
1. Rampage [No. 0E36] (1986, Arcade) 
2. Rampage - World Tour (1997, Arcade)
3. Rampage 2 - Universal Tour (1999, Nintendo 64) 
4. Rampage Through Time (2000, Sony PlayStation) 
5. Rampage - Total Destruction (2006, GameCube/PS2/Wii)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2174/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `mcr3`. Play it at [../../../app/g/rampage/](../../../app/g/rampage/) or [explore the knowledge graph](viewer.html).*
