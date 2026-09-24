# Burger Time (Data East set 1)

**Data East Corporation · 1982** — transpiled from the MAME driver `src/mame/dataeast/btime.cpp` by mamekit.

![marquee](/artwork/media/marquees/btime.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/btime.webp) | ![cabinet](/artwork/media/cabinets/btime.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | DECO_CPU7 | 1.500 MHz | 12 |
| `audiocpu` | M6502 | 0.500 MHz | 8 |

- **Sound:** ay8910 × 2 @ 1.500 MHz
- **Screen:** 240×240 @ 57.44 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `aa04.9b` | 0xc000 | 0x1000 | `368a25b5` |
| `maincpu` | `aa06.13b` | 0xd000 | 0x1000 | `b4ba400d` |
| `maincpu` | `aa05.10b` | 0xe000 | 0x1000 | `8005bffa` |
| `maincpu` | `aa07.15b` | 0xf000 | 0x1000 | `086440ad` |
| `audiocpu` | `ab14.12h` | 0xe000 | 0x1000 | `f55e5211` |
| `gfx1` | `aa12.7k` | 0x0 | 0x1000 | `c4617243` |
| `gfx1` | `ab13.9k` | 0x1000 | 0x1000 | `ac01042f` |
| `gfx1` | `ab10.10k` | 0x2000 | 0x1000 | `854a872a` |
| `gfx1` | `ab11.12k` | 0x3000 | 0x1000 | `d4848014` |
| `gfx1` | `aa8.13k` | 0x4000 | 0x1000 | `8650c788` |
| `gfx1` | `ab9.15k` | 0x5000 | 0x1000 | `8dec15e6` |
| `gfx2` | `ab00.1b` | 0x0 | 0x800 | `c7a14485` |
| `gfx2` | `ab01.3b` | 0x800 | 0x800 | `25b49078` |
| `gfx2` | `ab02.4b` | 0x1000 | 0x800 | `b8ef56c3` |
| `bg_map` | `ab03.6b` | 0x0 | 0x800 | `d26bc1f3` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Up | joystick up | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 5 | coin1 | `SYSTEM` | 0x40 |
| 6 | coin2 | `SYSTEM` | 0x80 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW1` | 0x3 | 0x3 |
| Coin B | `DSW1` | 0xc | 0xc |
| Leave Off | `DSW1` | 0x10 | 0x10 |
| Unused | `DSW1` | 0x20 | 0x20 |
| Cabinet | `DSW1` | 0x40 | 0x0 |
| Lives | `DSW2` | 0x1 | 0x1 |
| Bonus Life | `DSW2` | 0x6 | 0x2 |
| Enemies | `DSW2` | 0x8 | 0x8 |
| End of Level Pepper | `DSW2` | 0x10 | 0x0 |
| Unused | `DSW2` | 0x20 | 0x20 |
| Unused | `DSW2` | 0x40 | 0x40 |
| Unused | `DSW2` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/dataeast/btime.cpp`
- **Written by:** Zsolt Vasvari, Couriersud, Nicola Salmoria
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Couriersud (driver header); Nicola Salmoria (driver header); Zsolt Vasvari (driver header); Aaron Giles (1 release note); Alex Jackson (1 release note); Phil Bennett (1 release note); Tafoid (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 225 commits by 29 commit authors, 2007–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Arcade Video game published 44 years ago:

Burger Time (c) 1982 Data East.

Stand-alone release of "Hamburger [Model DT-126]". For more information on the game itself, please see the original release entry.

### Technical
Main CPU : MOS Technology M6502 (@ 1.5 Mhz)
Sound CPU : MOS Technology M6502 (@ 500 Khz)
Sound Chips : (2x) General Instrument AY8910 (@ 1.5 Mhz)

Players : 2
Control : 4-way joystick
Buttons : 1 (PEPPER)

### Trivia
Burger Time was released in August 1982 in Japan. 

The game was originally titled "Hamburger" in Japan, but was renamed "Burger Time" before being exported internationally. It was originally made for the DECO Cassette System, an early arcade format that pulled the game data from audio cassettes. The cassette system enjoyed a brief bit of popularity, until it was discovered that the cassettes quickly wore out, rendering the game useless. Bally/Midway licensed this title soon after its original release, and redesigned the hardware to drop the cassette altogether. The Bally/Midway version of the game sold vast quantities when compared to the original.

This stand-alone version, manufactured without Bally/Midway's involvement, features a different attract mode.

When starting a new game (and a new life after getting caught), the game start display says 'Game Ready'. This was corrected to 'Get Ready' in the Bally/Midway version. It originally said 'Game Start' in "Hamburger".

When the chef runs out of pepper, the 'Pepper' display blinks, but there is no warning sound.

In the Data East USA version : 
* Gameplay is noticeably much faster than the other versions.
* 'Lives' dip switch can be set to 30,000, 50,000, 80,000, or None.
* The attract mode is exactly the same as the Bally/Midway version except for the different copyright information on the title screen.

Bryan Wagner holds the official record for this game with 11,512,500 points on September 19, 2008.

### Tips and tricks
Stage 1

The introductory stage is very spacious and balanced, and you will only have to contend with three copies of Mr. Hot Dog and one copy of Mr. Egg. No one section of the stage presents any danger since ample escape routes can be found. At most, the burger layers only need to drop through five floors, so this stage won't take you as long as some of the other stages. Use this stage to understand the nature of the enemies' movement. Note how they tend to alternate between walking across a floor and using a ladder whenever they encounter one or the other that brings them closer to your position. Setting up the layers to allow enemies to drop with them is fairly easy to do.

Stage 2

While this stage features the same number of enemies as the previous stage, the layout of the floors makes the top portion of the screen much safer than the bottom portion. With the limited space and choices in the lower half of the stage, it is best to save it for last when you have no choice but to clear it. Focus on getting to the top as quickly as possible, but watch out for where the enemies are appearing. Staying on a ladder for a little while is a great way to lure enemies to a lower floor than the one you intend to visit. Once the two side burgers are complete, you must venture down the center of the stage. Before you do, draw the enemies as high as possible before heading down the center. Once you're ready to clear the stage, try to lure an enemy on to a top bun before dropping it. If you time it well, the enemies can clear the stage for you faster than you could. Note that the lower floors where the burgers wait are dead ends.

Stage 3

Even though you must build six burgers with only three layers each, this stage is a lot tougher than it looks. This time, six enemies will pursue you, including the never-before-seen Mr. Pickle. First and foremost, you need to get out of the bottom portion of the stage as quickly as possible. And the left is not a good choice for escape routes. If the copy of Mr. Pickle that enters from that side doesn't get you, another enemy is almost sure to come down that left ladder and trap you. Instead, head immediately for the right. If you're an expert player, you may choose to complete that lower right hamburger before continuing on to the top, but the more time you spend there, the bigger opportunity you give the enemies to trap you. Beginners should climb the right side of the stage all the way to the top in order to gain a little control over the enemies' movements. Like the previous stage, focus on completing the burgers at the top before tackling the lower burgers on either side.

Stage 4

You may feel a little daunted by the task at hand when you first see this stage: four hamburgers composed of eight layers. That's a lot of walking. But if you remember to focus your efforts on the top buns as much as possible, you won't waste a lot of time. The ladders are arranged in such a way that continuous climbing is difficult to accomplish. Instead, you and the enemies are more likely to staircase your way through the stage in order to get around. This can be a blessing and a curse. It's good because the enemies have few direct paths or multiple options to attack you from. It's bad because you need to become very skilled at controlling the chef in order not to slow down as you progress up or down the screen. The chef can feel very sluggish on ladders, and it can be difficult at first to properly time his transitions from ladder to floor and back to ladder again. By the time you complete this stage however, you'll have plenty of practice.

Stage 5

If you think that this stage is easier than the last stage because there's only half as many burgers to make, you're wrong. The layout of the stage is such that you have very few options to get from one section to another. Fewer options to move means fewer chances to escape so you must plot your course through this stage very carefully in order to avoid the six enemies that will be occupying the stage with you. There are two strategies to take. One involves luring the enemies to the lower right hand portion of the stage to keep them occupied for a while. This can be risky however, since you might become trapped from above and below. The other strategy is to employ pepper more liberally, provided you have a good supply by this stage. If you intend to use pepper, and wish to make the most use out of it, be sure to freeze enemies while they are standing on top of a layer so that you can walk across the layer and send it falling several stories with the enemy on board.

Stage 6

This is the last new stage that you will see before the game repeats the cycle of stages over again. In the heat of the moment, it's very easy to assume that certain paths on this stage connect when in fact they don't. Total comprehension of your available escape routes will decrease your chances of getting trapped and increase your chances of survival. The burgers on the side are especially dangerous since every layer is perched on a dead end. If an enemy is following you, it's relatively easy to drop a burger layer with the enemy standing on it, but getting out of the area can be tricky if you are too slow and allow another enemy to pursue you. You'll need to employ every trick that you've learned in the previous five stages to make it out of this one. The most important thing is not to panic.

Beyond Stage 28

The game will continue normally until stage 28. Starting on stage 28 the enemies move about 2 1/2 times faster than they did before. After 90 seconds (if you can survive that long on one chef), they slow down to a crawl, moving one step every 5 seconds. You can still die if you run into the enemies. The chef's speed never changes. If you can make it to the top of the board (28), you can find the "safe" spot. You can hide out here until they slow down. You will need new patterns for each board to group the enemies, and wait each time for each drop. It can take 1-1 1/2 hour per board at this level.

### Ports
NOTE: Only ports released outside Japan and North America are listed here. For Japanese ports, please see the original Japanese release entry, "Hamburger [Model DT-126]". For ports released in North America, please see the Midway entry. 

* CONSOLES: 
[EU] Sony PlayStation (mar.1998) "Arcade's Greatest Hits - The Midway Collection 2 [Model SLES-00739]" 

* HANDHELDS: 
[EU] Nintendo Game Boy (1991) "BurgerTime Deluxe [Model DMG-GM-NOE]" 
[UK] Nintendo Game Boy (1991) "BurgerTime Deluxe [Model DMG-GM-UKV]" 

* COMPUTERS:
[EU] Commodore C64 (1984) 
[EU] BBC B (1984) "Mr. Wimpy" by Ocean 
[EU] Acorn Electron (1984) "Mr. Wimpy" by Ocean 
[EU] Oric (1984) "Mr. Wimpy" by Ocean 
[EU] Sinclair ZX Spectrum (1984) "Mr. Wimpy" by Ocean 
[EU] MSX (1986) "Mac Attack" 
[AU] VTech Laser-VZ "Hamburger Sam" 
[EU] Amstrad CPC

### Contribute
Edit this entry: https://www.arcade-history.com/game/355/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `btime`. Play it at [../../../app/g/btime/](../../../app/g/btime/) or [explore the knowledge graph](viewer.html).*
