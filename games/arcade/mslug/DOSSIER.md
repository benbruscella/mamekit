# Metal Slug - Super Vehicle-001

**Nazca · 1996** — transpiled from the MAME driver `src/mame/snk/neogeo.cpp` by mamekit.

![marquee](/artwork/media/marquees/mslug.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/mslug.webp) | ![cabinet](/artwork/media/cabinets/mslug.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M68000 | 12.000 MHz | 28 |
| `audiocpu` | Z80 | 4.000 MHz | 6 |

- **Sound:** ym2203 × 1 @ 8.000 MHz
- **Screen:** 320×224 @ 59.19 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `cslot1:maincpu` | `201-p1.p1` | 0x100000 | 0x100000 | `08d8daa5` |
| `cslot1:fixed` | `201-s1.s1` | 0x0 | 0x20000 | `2f55958d` |
| `fixedbios` | `sfix.sfix` | 0x0 | 0x20000 | `c2ea0cfd` |
| `spritegen:zoomy` | `000-lo.lo` | 0x0 | 0x20000 | `5a86cff2` |
| `mainbios` | `sp-s2.sp1` | 0x0 | 0x20000 | `9036d879` |
| `audiobios` | `sm1.sm1` | 0x0 | 0x20000 | `94416d67` |
| `cslot1:audiocpu` | `201-m1.m1` | 0x0 | 0x20000 | `c28b3253` |
| `cslot1:ymsnd:adpcma` | `201-v1.v1` | 0x0 | 0x400000 | `23d22ed1` |
| `cslot1:ymsnd:adpcma` | `201-v2.v2` | 0x400000 | 0x400000 | `472cf9db` |
| `cslot1:sprites` | `201-c1.c1` | 0x0 | 0x400000 | `72813676` |
| `cslot1:sprites` | `201-c2.c2` | 0x1 | 0x400000 | `96f62574` |
| `cslot1:sprites` | `201-c3.c3` | 0x800000 | 0x400000 | `5121456a` |
| `cslot1:sprites` | `201-c4.c4` | 0x800001 | 0x400000 | `f4ad59a3` |
| `audiocpu` | `sm1.sm1` | 0x0 | 0x20000 | `94416d67` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `AUDIO_COIN` | 0x1 |
| 6 | coin2 | `AUDIO_COIN` | 0x2 |
| 9 | service1 | `AUDIO_COIN` | 0x4 |
| Up | joystick up | `edge:JOY1` | 0x1 |
| Down | joystick down | `edge:JOY1` | 0x2 |
| Left | joystick left | `edge:JOY1` | 0x4 |
| Right | joystick right | `edge:JOY1` | 0x8 |
| Space / X | a | `edge:JOY1` | 0x10 |
| Z | b | `edge:JOY1` | 0x20 |
| C | c | `edge:JOY1` | 0x40 |
| 1 | start1 | `edge:START` | 0x1 |
| 2 | start2 | `edge:START` | 0x4 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Setting Mode | `DSW` | 0x1 | 0x1 |
| Cabinet | `DSW` | 0x2 | 0x2 |
| Controller | `DSW` | 0x4 | 0x4 |
| COMM Setting (Cabinet No.) | `DSW` | 0x18 | 0x18 |
| COMM Setting (Link Enable) | `DSW` | 0x20 | 0x20 |
| Free Play | `DSW` | 0x40 | 0x40 |
| Freeze | `DSW` | 0x80 | 0x80 |
| Service Mode | `TEST` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/snk/neogeo.cpp`
- **Written by:** Bryan McPhail,Ernesto Corvi,Andrew Prime,Zsolt Vasvari
- **License:** BSD-3-Clause
- **Development:** 402 commits by 41 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Vas Crabb, Miodrag Milanovic, David Haywood, Michaël Banaan Ananas

## The story

SNK Neo-Geo MVS cart. published 30 years ago:

Metal Slug - Super Vehicle-001 (c) 1996 Nazca.

A scrolling 'run-and-gun' platform game for one or two players, Metal Slug is a humorous parody of war and specifically of World War II and the Nazis.

The game features six enemy-packed levels, referred to as 'missions'. Players start the game armed only with a pistol, but extra weapons can be picked up and used for greater firepower. Also, at certain points during a level players will find an unused 'Super Vehicle-001' - or Metal Slug - tank which can be entered and driven. The Metal Slug is slow-moving but has very powerful weapons. If the Slug takes too many hits it will break down and start to flash, the player must then quickly exit the vehicle before it explodes. The enemy troops also have vehicles at their disposal, such as tanks, boats and helicopters.

The levels are littered with bearded hostages who, when rescued, award players with either points bonuses (in the form of medals) or weapon power-ups. Available weapons are Heavy Machine Gun, Flame Shot, Rocket Launcher and Shotgun. Hand grenades are also available.

Each level ends with at least one large enemy 'Boss' vehicle that takes many hits to destroy. Once the boss has been destroyed, bonus points are awarded for each prisoner rescued. Further bonus points are awarded if the player's Metal Slug vehicle has survived the boss battle.

### Technical
Runs on the SNK "Neo-Geo MVS" hardware.
GAME ID: NGM-201

Players: Up to 2.
Control: 8-way joystick.
Buttons: 3 per player.
=> Character > [A] Shoot, [B] Jump, [C] Grenade
=> Metal Slug> [A] Gun Attack, [B] Jump Board Vehicle, [C] Artillery Attack

### Trivia
Metal Slug was released in April 1996. 

Etymology of 'Metal Slug': Meeher, the lead designer of the game for Nazca, wanted to create an armored fighting vehicle that could crawl on the ground like a 'slug'. The word 'metal' in the title indicates that the vehicle is mechanical. Initially, players considered the title to be "not good enough". Meeher later joked about the title, saying "Maybe I don't make much [sic] of a sense?".

Slugs in Metal Slug sequels included animals (usually only the Vulcan cannon mounted on the animal, with a cannon attachment occasionally available), planes and other vehicles that did not fit Meeher's original definition. 

While being an obvious parody of World War II and the Nazi regime (the rebel army's flag is a deliberate pastiche of the Nazi "Swastika"), Metal Slug also lampoons 'Full Metal Jacket' and 'MASH'. General Morden, the rebel army's evil general, is a parody of Saddam Hussein. 

Just as the two main heroes (Marco & Tarma) appear in every chapter in the Metal Slug series, General Morden & Allen O' Neill (the machine gun wielding, trash mouth-talking, buffed soldier) are the series' classic main villains.

The tank in Metal Slug was inspired by the tank: Dominio Tank Police (1988). The tank in this anime is called Bonaparte and is piloted by Leona Ozaki.

Cliff Reese holds the official record for this game with 2,683,030 points on March 8, 2011. 

The same team that created Metal Slug had previously created a handful of games for Irem, most of which featured very similar graphics and gameplay. "Cyber Lip" (1990) had some of the core developers as the original Metal Slug. "Gunforce" (1991) and "In the Hunt" (1993) had noticeably similar gameplay, with graphics that bear a slight resemblance to Metal Slug. "Gunforce 2" (1994) not only had similar gameplay but the sounds of dying soldiers were almost exactly the same as Metal Slug. Because of this, some fans refer to Gunforce 2 as "Metal Slug Zero".

### Tips and tricks
* Metal Slug features a 'blood ON' option (soldiers squirt blood when shot, instead of water). This can be activated via the 'Setting The Soft Dip' option in the game's dip switch menu. 

* When you parachute into the level at the start of a mission, press B to make the parachute disappear, allowing your character to drop to the ground more quickly. 

* Don't waste ammo. Metal Slug requires some thinking and shooting indiscriminately is not the best way to play this game. 

* Don't waste special weapons on shields. Shielded soldiers will throw their shields aside when they need to fire, so shoot at them only at this instant. Or use your knife if you manage to get close enough. 

* Use your knife against lone enemies. There is no need to waste ten rounds of your Heavy Machine Gun on a single enemy soldier. 

* When Metal Slug is dangerously low on health (but not so low that you are forced to leave it), use the frontal attack to inflict major damage. 

* Whenever you jump out of the slug, you are invincible for a brief amount of time. This is especially useful against the blue mortars, since they can't be avoided. Note, however, that there is no period of invincibility when you jump back into the slug. 

* There is apparently no 'reload time' when you throw grenades or rockets. The rate depends on how many of either are currently on-screen so if you are close to an enemy, the rate will be negligible. You may use this trick against some bosses and in any other situation to pass through unscratched. 

* The best way to earn points in to rescue hostages, but this can be tricky. The first problem is finding them, the second is to stay alive to the end of the mission to get credit for your rescues. 

As well as the easily-spotted hostages that litter the levels, there are also numerous hidden hostages: 

MISSION 1 (hostages: 10): 
Two pairs of are hostages hidden in the two waterfalls just before you get to the boss. Just blast the tops of the waterfalls and they will fall. 

MISSION 2 (hostages: 12): 
Blast down at the green bush underneath the bridge just before you reach the mid level boss (large tank on rails above you) and three secret prisoners will come running in your direction. 

MISSION 3 (hostages: 15): 
There are secret hostages hidden within the two large trees that you can blast down in the section where you have the Metal Slug tank. These seem to be random, just try blasting those trees down and sometimes they appear. 

There are hidden hostages that drop down from the sky when you are fighting the end of level boss; just don't kill the boss until they have all appeared. 

MISSION 4 (hostages: 20): 
Just after you have got the Metal Slug tank at the beginning of the level, blast the ceiling of the bar just above the light/lampshade high up on the wall at the entrance of the bar. 

At the end of level bosses you can either blast in the top right hand corner of the cave to get three hidden hostages OR blast the far bottom left hand corner for three hidden hostages. It is not possible to get both of these groups. You can only get one or the other. 

MISSION 5 (hostages: 13):
Blast the first and second houses and two hostages will appear. 

Fire at the top of the first and second trees in the stage in between the shops and houses. The first tree yields three POW's and the second only two.

Blast the undercarriage of the end of level boss after it has lifted up on stilts to get three extra prisoners who also provide useful power ups. 

MISSION 6 (hostages: 25): 
At the beginning, shoot above you to find one prisoner. 

Destroy the big pack of rocks to deliver one POW. 

Blast the small white cloud above you just after the boat you are on has run ashore to get two hidden hostages. 

When you're out of the boat, go left in the water to find some points. 

POWs appear on screen during the fight with the final boss, if you shoot in the top right corner. 

* Beat the game in two players mode to view a different ending sequence.

### Staff
Designers: Akio Oyabu (Akio), Susumu, Kazuhiro Tanaka (Max.D), Tomohiro, akeshi Okui (T. Okui), Kozo
Planners: Meeher, Kazuma Kujo (Hire-Nag)
Sound: Takushi Hiyamuta (Hiya!), Jim
Programmers: Shinichi Hamada (Hamachan), Kenji Andoh (Andy A.), Atsushi Kurooka (Kurooka), Tetsuya Yokota (T. Yokota), H. Yamada, Pierre

### Ports
* CONSOLES:
SNK Neo-Geo CD (1996)
Sony PlayStation (1997)
Sega Saturn (1997)
Sony PSP (2006) "The Metal Slug Collection"
Nintendo Wii (2006) "The Metal Slug Collection"
Sony PlayStation 2 (2006) "The Metal Slug Collection"
[US] Sony PS2 (may.05, 2008) "SNK Arcade Classics Vol.1 [Model SLUS-21724]"
[US] Sony PSP (may.05, 2008) "SNK Arcade Classics Vol.1 [Model ULUS-10338]"
[KO] Sony PS2 (may.29, 2008) "SNK Arcade Classics Vol.1 [Model SLKA-25424]"
[US] Nintendo Wii (jul.29, 2008) "SNK Arcade Classics Vol.1 [Model RVL-P-RNCE]"
[EU] Sony PSP (Oct. 17, 2008) "SNK Arcade Classics Vol.1 [Model ULES-01105]"
[EU] Nintendo Wii (Oct. 31, 2008) "SNK Arcade Classics Vol.1 [Model RVL-P-RJZP]"
[EU] Sony PS2 (Nov. 21, 2008) "SNK Arcade Classics Vol.1 [Model SLES-55232]"
[JP] Sony PSP (May. 21, 2009) "SNK Arcade Classics Vol.1 [Model ULJS-193]"
Sony PlayStation Store (Dec.2010)

* COMPUTERS:
PC [MS Windows, DVD-ROM] (2009) "Metal Slug Collection PC"

### Series
1. Metal Slug - Super Vehicle-001 [Model NGM-201] (1996, MVS)
2. Metal Slug 2 - Super Vehicle-001/II [Model NGM-241] (1998, MVS)
3. Metal Slug X - Super Vehicle-001 [Model NGM-250] (1999, MVS)
4. Metal Slug - 1st Mission [Model NEOP00210] (1999, NGPC)
5. Metal Slug - 2nd Mission [Model NEOP00610] (2000, NGPC)
6. Metal Slug 3 [Model NGM-256] (2000, MVS)
7. Metal Slug 4 [Model NGM-263] (2002, MVS)
8. Metal Slug 5 [Model NGM-268] (2003, MVS)
9. Metal Slug 6 (2006, MVS)
10. Metal Slug 3D (2006, PS2)
11. Metal Slug 7 (2008, NDS)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1613/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `neogeo`. Play it at [../../../app/g/mslug/](../../../app/g/mslug/) or [explore the knowledge graph](viewer.html).*
