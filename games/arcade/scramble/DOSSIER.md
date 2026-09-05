# Scramble

**Konami · 1981** — transpiled from the MAME driver `src/mame/galaxian/galaxian.cpp` by mamekit.

![marquee](/artwork/media/marquees/scramble.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/scramble.webp) | ![cabinet](/artwork/media/cabinets/scramble.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 13 |
| `audiocpu` | Z80 | 1.790 MHz | 3 |

- **Sound:** ay8910 × 2 @ 1.790 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `s1.2d` | 0x0 | 0x800 | `ea35ccaa` |
| `maincpu` | `s2.2e` | 0x800 | 0x800 | `e7bba1b3` |
| `maincpu` | `s3.2f` | 0x1000 | 0x800 | `12d7fc3e` |
| `maincpu` | `s4.2h` | 0x1800 | 0x800 | `b59360eb` |
| `maincpu` | `s5.2j` | 0x2000 | 0x800 | `4919a91c` |
| `maincpu` | `s6.2l` | 0x2800 | 0x800 | `26a4547b` |
| `maincpu` | `s7.2m` | 0x3000 | 0x800 | `0bb49470` |
| `maincpu` | `s8.2p` | 0x3800 | 0x800 | `6a5740e5` |
| `audiocpu` | `ot1.5c` | 0x0 | 0x800 | `bcd297f0` |
| `audiocpu` | `ot2.5d` | 0x800 | 0x800 | `de7912da` |
| `audiocpu` | `ot3.5e` | 0x1000 | 0x800 | `ba2fa933` |
| `gfx1` | `c2.5f` | 0x0 | 0x800 | `4708845b` |
| `gfx1` | `c1.5h` | 0x800 | 0x800 | `11fd2887` |
| `proms` | `c01s.6e` | 0x0 | 0x20 | `4e3caeab` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Z | button2 | `IN0` | 0x2 |
| 9 | service1 | `IN0` | 0x4 |
| Space / X | button1 | `IN0` | 0x8 |
| Right | joystick right | `IN0` | 0x10 |
| Left | joystick left | `IN0` | 0x20 |
| 6 | coin2 | `IN0` | 0x40 |
| 5 | coin1 | `IN0` | 0x80 |
| 2 | start2 | `IN1` | 0x40 |
| 1 | start1 | `IN1` | 0x80 |
| Up | joystick up | `IN2` | 0x10 |
| Down | joystick down | `IN2` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Lives | `IN1` | 0x3 | 0x0 |
| Coinage | `IN2` | 0x6 | 0x0 |
| Cabinet | `IN2` | 0x8 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/galaxian/galaxian.cpp`
- **Written by:** Aaron Giles, Couriersud, Stephane Humbert, Robbbert
- **License:** BSD-3-Clause
- **Development:** 659 commits by 49 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, ClawGrip, David Haywood

## The story

Arcade Video game published 45 years ago:

Scramble (c) 1981 Konami Industry Company, Limited.

Scramble is a sideways scrolling shoot-em-up in which a single player takes control of a spaceship and must try to fight through six different enemy-packed levels - destroying as many fuel tanks and ground intallations as possible - before reaching the enemy base and destroying it. 

Contact with any scenery, ground installations, enemy ships or projectyles results in an instant loss of life. The Scramble ship is armed with both a blaster and bombs. The blaster is forward-firing only while the bombs drop downwards to target ground-based enemy installations and to collect fuel from fuel dumps. 

The fuel dumps are of particular importance, as the player ship's fuel gauge constantly depletes as the player progresses through the game and the only way to re-fuel is by bombing the fuel tanks that are located on the ground throughout the levels. Fuel usage increases as the game progresses, until fuel usage actually outstrips the amount of fuel dumps available and the game becomes impossible. 

Scramble is rightly considered to be a classic and was the world's first ever 'multi-level' shoot-em-up.

### Technical
The Scramble cabinet was the same basic cabinet design that Stern used for all its games. It featured a monitor that was set back at a 45 degree angle, and a very large marquee that was angled towards the player. Most cabinets have straight up and down marquees, so Stern ones are easy to spot. This title features rather primitive painted sideart that only uses two colours, but it makes up for it with the impressive comic-book style art on the control panel and monitor bezel.

The marquee has a roundish 'Scramble' logo, with some sort of space castle in the background. The control panel is aluminium, and it has a mostly yellow design, with game instructions and a red ball-top 8-Way leaf switch joystick mounted centrally. It has fire buttons on both sides of the panel, so it can be played either left handed or right handed. The industry later forgot about lefties altogether and went completely right handed. Most of these machines were uprights, but there were several cocktail units made as well.

Game ID : GX387

Main CPU : Zilog Z80 (@ 3.072 Mhz)
Sound CPU : Zilog Z80 (@ 1.78975 Mhz)
Sound Chips : (2x) General Instrument AY8910 (@ 1.78975 Mhz), (6x) RC (@ 1.78975 Mhz)

Players : 2
Control : 8-Way Joystick
Buttons : 2
=> Laser, Bomb

### Trivia
Scramble was released in February 1981 in Japan.

Sometimes unfairly referred to as a 'poor man's Defender', Scramble was not only the world's first multi-level shoot-em-up, it was also the first of its type to feature a re-fueling system. These innovations helped to ensure that Scramble was a well deserved commercial success for Konami. 

This game was the first title to use the 'Scramble Hardware', which was later used for "Super Cobra", "Lost Tomb", "The End" and a number of other titles. Many of these titles were actually bootlegs of other games, such as Namco's "Pac-Man". This was because Konami neglected to give Scramble ANY copy protection whatsoever; making it incredibly easy to run just about anything that used a Z80 processor, which, at the time, was pretty much every game out there. There were, of course, a lot of Bootleg copies of Scramble itself floating around, such as "Explorer" or "Strafe Bomb".

Scramble is considered the first in the "Gradius" series according to the Nintendo Game Boy Advance "Gradius Galaxies" intro sequence.

This game had a Bulgarian bootleg called "Memory Devices Facility".

A Scramble unit appears in the 1983 movie 'Joysticks'.

### Scoring
10 points per second of flying.

Missile on ground : 50 points
Missile in air : 80 points
UFO : 100 points
Fuel Tank : 150 points
Mystery Base : 100, 200, or 300 points
Main Base : 800 points

### Tips and tricks
A) Always watch what passes below you as you fly, especially in Sectors One through Four.

B) Ignore the 10 points added to your score every second : you want to finish each round quickly, because running out of fuel is bad news.

Try also to hit as many fuel tanks as you can, even in preference to mystery bases. One hundred and fifty points plus fuel is more desirable than an average mystery score of 200 points.

C) When you fuel gets low, the rule is to ignore everything but speed survival, and getting more fuel.

D) In Sector One, fly close to the ground. Your object should be scoring points rather than precise maneuvering, so keep in mind just a few simple rules : 
1. Fly slowly only when you must to destroy a rich cluster of targets.
2. Release a couple of bombs just as you top each mountain, then descend quickly into the valley.
3. Once there, shoot any threatening rockets by slowing down for a second and using your laser. Descend to the lowest plateau at the earliest opportunity, shooting lasers constantly to clear your path of targets.
4. Rise with the terrain, using your laser against targets in the foothills, and go all the way up only when the next mountain forces you to.
5. After the last mountain, be prepared for the UFOs.

E) Through Sector Two, simply fly relatively low at medium speed, pressing LASER and BOMB constantly. The laser shots will take care of almost all the UFOs in your way. If one or two survive until you reach them, shift to full speed until you pass them, dodging vertically if necessary.

Try to time the release of your bombs so that they hit fuel tanks, compensating for your middling speed.

F) Don't try to stay alive among the fireballs. Staying below them makes sense for two reasons - you keep your jet, and you even have a chance to pick up some points from the sparse targets below.

As for making if from valley to valley, just go where the fireballs aren't. Fly quickly through each valley, then stop just before you leave shelter. Wait there until a fireball passes just over you; then chances are that you will have a second in which to duck swiftly over and into the next valley. You will find there is definitely a rhythm to it.

G) If you fly through the city too fast, you might not be able to react in time to a juicy cluster of targets or to a rocket rising in your path. Fly at medium speed, lasering and bombing for all you are worth, especially at rockets in front of you and fuel tanks beneath you.

When you fly over silos too deep for your bombs to penetrate, accelerate for a moment in case the rockets suddenly take off toward your underside.

Treat a low roof just as you would a Sector One valley; descend and laser the row of targets into oblivion. Be careful, though, when reascending; the rises here are much more abrupt than Sector One.

H) Without excellent vertical control, you will never make it through Sector Five. Blasting away the fuel tanks blocking your path is vital, but requires much less of your concentration than does piloting the jet through such a tortuous maze.

As soon as you emerge from a passageway, stop. Then move up or down, whichever you need, as far as you can until the screen catches up with you and pushes you forward. Keep the joystick to the left; while the screen propels you, you should have time to find just the right height for entering the next passage.

Once you are in the next passage, speed up right away, giving yourself a head start for the next cavern; you will have to stop once again when you enter it. The cycle requires concentration even once you know the rhythm.

Sometimes, you will enter a cavern at top left and need to leave it through a passage at bottom right, but fuel tanks will block the mouth of the passage, cluttering even the cavern floor. If you are worried about crashing into these tanks from above before you have a chance to laser them, just drop a couple of bombs at the right moment in your descent. The tanks will stand in your way no longer.

I) Once you know its secrets, the base may actually be slightly easier than Sector Five. To destroy the enemy octagon, all you have to do is gun your engine before you enter its canyon, then pull sharply down and back, and nose up to it. If you are on its level, fire your laser; if just above, drop a bomb. You will destroy the base.

You will also crash your own ship, but no matter : you will start the next round with a free replacement. Most players are afraid of crashing, so they fly too high for their bombs to have any hope of reaching the base. Eventually, they crash or run out of fuel.

J) By now, you have probably realized the one step essential to mastering SCRAMBLE; memorization. Since the pattern repeats itself every round, being prepared for upcoming opportunities and dangers is what the game is about.

### Ports
* CONSOLES: 
[JP] GCE Vectrex (1982) "Scramble Wars"
[EU] GCE Vectrex (1983) "Scramble [Model 8120]" 
[JP] Sony PlayStation (may.13, 1999) "Konami 80's Arcade Gallery [Model SLPM-86228]" 
[JP] Sony PS2 (jul.21, 2005) "Scramble [Oretachi Geasen Zoku] [Model SLPM-62626]" 
[EU] [JP]Microsoft XBOX 360 [XBLA] (sept.13, 2006) 
[JP] Sony PS4 [PSN] (dec.25, 2014) "Arcade Archives - Scramble [Model CUSA-01409]" 
[AS] Sony PlayStation 4 [PSN] (jul.9, 2015) "Arcade Archives - Scramble" 
[AU] Sony PlayStation 4 [PSN] (sept.22, 2015) "Arcade Archives - Scramble [Model CUSA-02485]" 

* HANDHELDS: 
[JP] Nintendo GBA (may.2, 2002) "Konami Arcade Game Collection [Model AGB-AKCJ-JPN]" 
[EU] Nintendo GBA (june.21, 2002) "Konami Collector's Series - Arcade Classics [Model AGB-AKCP-EUR]" 
[JP] Nintendo DS (mar.15, 2007) "Konami Arcade Collection [Model NTR-A5KJ-JPN]" 
[EU] Nintendo DS (oct.26, 2007) "Konami Arcade Classics [Model NTR-ACXP-EUR]" 
[AU] Nintendo DS (oct.29, 2007) "Konami Arcade Classics" 

* COMPUTERS:
[EU] BBC B (1982) "Rocket Raid" by Acornsoft
[EU] Sinclair ZX Spectrum (1982) "Penetrator" by Melbourne House 
[EU] Sinclair ZX Spectrum (1983) "Cavern Fighter" by Bug-Byte 
[EU] Commodore C64 (1983) "Skramble!" 
[EU] Commodore C64 (1984) "Penetrator" by Melbourne House

* OTHERS:
[EU] VFD portable game(1982) "Rambler" by Tomy : German version 
[EU] VFD portable game (1982) "Astro Blaster" by Tomy : Hales UK version 
[EU] [AU] [KO] Arcade (nov.1998) "Konami 80's AC Special" 
[JP] Arcade (nov.1998) "Konami 80's Arcade Gallery"

### Series
1. Scramble (1981)
2. Super Cobra (1981)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2328/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `galaxian`. Play it at [../../../app/g/scramble/](../../../app/g/scramble/) or [explore the knowledge graph](viewer.html).*
