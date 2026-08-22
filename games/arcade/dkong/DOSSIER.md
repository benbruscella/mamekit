# Donkey Kong (US set 1)

**Nintendo of America · 1981** — transpiled from the MAME driver `src/mame/nintendo/dkong.cpp` by mamekit.

![marquee](/artwork/media/marquees/dkong.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/dkong.webp) | ![cabinet](/artwork/media/cabinets/dkong.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 16 |
| `soundcpu` | MB8884 | 6.000 MHz | 1 |

- **Sound:** discrete @ 3.072 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `c_5et_g.bin` | 0x0 | 0x1000 | `ba70b88b` |
| `maincpu` | `c_5ct_g.bin` | 0x1000 | 0x1000 | `5ec461ec` |
| `maincpu` | `c_5bt_g.bin` | 0x2000 | 0x1000 | `1c97d324` |
| `maincpu` | `c_5at_g.bin` | 0x3000 | 0x1000 | `b9005ac0` |
| `soundcpu` | `s_3i_b.bin` | 0x0 | 0x800 | `45a4ed06` |
| `soundcpu` | `s_3j_b.bin` | 0x1000 | 0x800 | `4743fe92` |
| `gfx1` | `v_5h_b.bin` | 0x0 | 0x800 | `12c8c95d` |
| `gfx1` | `v_3pt.bin` | 0x800 | 0x800 | `15e9c5e9` |
| `gfx2` | `l_4m_b.bin` | 0x0 | 0x800 | `59f8054d` |
| `gfx2` | `l_4n_b.bin` | 0x800 | 0x800 | `672e4714` |
| `gfx2` | `l_4r_b.bin` | 0x1000 | 0x800 | `feaa59ee` |
| `gfx2` | `l_4s_b.bin` | 0x1800 | 0x800 | `20f2ef7e` |
| `proms` | `c-2k.bpr` | 0x0 | 0x100 | `e273ede5` |
| `proms` | `c-2j.bpr` | 0x100 | 0x100 | `d6412358` |
| `proms` | `v-5e.bpr` | 0x200 | 0x100 | `b869b8f5` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `IN0` | 0x1 |
| Left | joystick left | `IN0` | 0x2 |
| Up | joystick up | `IN0` | 0x4 |
| Down | joystick down | `IN0` | 0x8 |
| Space / X | button1 | `IN0` | 0x10 |
| F2 | service | `IN2` | 0x1 |
| 1 | start1 | `IN2` | 0x4 |
| 2 | start2 | `IN2` | 0x8 |
| 5 | coin1 | `IN2` | 0x80 |
| 9 | service1 | `SERVICE1` | 0x1 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Lives | `DSW0` | 0x3 | 0x0 |
| Bonus Life | `DSW0` | 0xc | 0x0 |
| Coinage | `DSW0` | 0x70 | 0x0 |
| Cabinet | `DSW0` | 0x80 | 0x80 |
| Video Hardware | `VIDHW` | 0x1 | 0x1 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/nintendo/dkong.cpp`
- **Written by:** Couriersud
- **License:** BSD-3-Clause
- **Development:** 311 commits by 42 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Couriersud, Vas Crabb, Michaël Banaan Ananas

## The story

Arcade Video game published 45 years ago:

Donkey Kong (c) 1981 Nintendo of America, Incorporated.

Export version for North America. For more information about the game itself, please see the original Japanese upright version entry.

### Technical
[Blue Upright model] 
The blue uprights (which are the most common), are a very rectangular affair, with quite a lot of artwork. They have orange-ish sticker style side-art (with Mario and Kong on them), with control panel, marquee, and monitor bezel graphics to match. This game does not use a standard arcade monitor. It requires a 'Nintendo Compatible' monitor (a normal monitor will display the picture like that of a photographic negative). This simple little monitor change basically launched the entire Nintendo Vs. Unisystem later on. Because only Donkey Kong series games and Vs. titles would work on these monitors (forcing operators to buy conversion kits for those games instead of a competitors game). 

[Red Upright model] 
The red upright versions are actually "Radar Scope" cabinets that have been factory-converted to Donkey Kong. These are fairly rare and feature slightly different gameplay.

### Trivia
Donkey Kong was released on July 31, 1981 in the USA.

Donkey Kong was to be Nintendo's first big breakthrough into the western - and particularly American - arcade scene. Before Donkey Kong, Nintendo was having difficulty establishing itself in these markets. After the game's massive success Nintendo quickly established their headquarters of Nintendo of America to ensure that the game was being distributed properly. 

Mario was named after Mario Segale, the landlord of Nintendo of America's first warehouse location in Seattle (though it was debated whether this occurred before or well after the game was released). Mario was originally called 'Jumpman'; only the arcade version of Donkey Kong has ever called the hero Jumpman; most home coversions, particularly the NES version, game him the Mario name.

Accounts differ as to how Nintendo of America felt about the game before its release. Many sources claim that they all felt sure it would be an absolute disaster while others say they were more optimistic.

Although Mario is a plumber in later games, his career in Donkey Kong is that of a carpenter. Mario's appearance (and consequently his career) was dictated by the primitive graphics hardware of the time - the only way to have his arms appear 'separate' to his torso was to have them as a different color - hence he wears 'dungarees'. The mustache is present merely to indicate where Mario's mouth is, again due to the low graphics resolution imposed by hardware limitations. Mario wears a hat so his head is distinguishable from the game's black backgrounds. 

About 60,000 units were sold in the US. Oddly, despite it being one of the ten best selling games of the golden age of video games, it never reached #1 on Replay's popularity charts. Instead, it was stuck at #2 behind mega hits "Pac-Man" and "Ms. Pac-Man" - the two best selling games ever. 

Donkey Kong inspired a catchy hit song by Buckner and Garcia called 'Do The Donkey Kong' released on the 'Pac-Man Fever' album. 

A Donkey Kong unit appears in the 1983 movie 'WarGames', the 1984 movie 'Gremlins', the 1985 movie 'The Heavenly Kid', and the sitcom 'Two and a Half Men' (Season 5, Episode 2 - People Who Love Peepholes). 

MB (Milton Bradley) released a board game based on this video game (same name) in 1982. Save the girl and avoid the barrels and fireballs as in the video game. The gameboard is laid out like the video game's Ramp Stage. 'Can You Battle Donkey Kong and Save the Fair Maiden?'. 

Donkey Kong also spawned a cartoon series of the same name : Ruby-Spears Productions. Produced by Joe Ruby and Ken Spears. Originally aired September 17, 1983 as part of 'Saturday Supercade' on CBS. Mario was voiced by veteran voice actor Peter Cullen, while Donkey Kong's voice was provided by the late actor/comedian Soupy Sales (1926-2009). 

Michael Jackson used to own this game (Blue Upright model). It was sold at the official Michael Jackson Auction on April 24, 2009.

### Updates
The original Japanese version had all four stages displayed in their original, logical order 1-2-3-4.
For this US version, they changed it to match the 'How High Can You Try/Get?' theme, with the stage order as follows : 
L-01: 1-4 
L-02: 1-3-4 
L-03: 1-2-3-4 (as in all levels of the Japanese version) 
L-04: 1-2-1-3-4 
L-05: 1-2-1-3-1-4 
L-06 through L-21 all remain the same as L-05 
L-22: 1 (Kill screen).

### Ports
NOTE: Only ports released in North America are listed here. For ports released in other regions, please see the original Japanese upright version entry.

* CONSOLES: 
[US] Atari 2600 (1982) "Donkey Kong [Model 2451]"
[US] Colecovision (1982) "Donkey Kong [Model 2411]"
[US] Mattel Intellivision (1982) "Donkey Kong [Model 2471]"
[US] Nintendo NES (june.1986) "Donkey Kong [Model NES-DK-USA]"
[US] Atari XEGS
[US] Atari 2600 (1988) "Donkey Kong [Model CX26143]"
[US] Atari 7800 (1988) "Donkey Kong [Model CX7848]"

* HANDHELDS: 
[US] Nintendo Game Boy (june.1994) "Donkey Kong [Model DMG-QD-USA]"

* COMPUTERS: 
[US] Tandy Color Computer (1982) "Dunkey Munkey"
[US] Tandy Color Computer (1982) "Donkey King"
[US] Tandy Color Computer (1983) "The King"
[US] Tandy Color Computer (1983) "Monkey Kong"
[US] PC [Booter] (1983) "Donkey Kong"
[US] PC [Booter] (1983) "Gorilla Gorilla" : part of the "FriendlyWare P.C. Arcade" suite.
[US] Atari 800 (1983) "Donkey Kong [Model RX8031]"
[US] TI99/4A (1983) "Donkey Kong [Model RX8512]"
[US] Commodore VIC-20 (1983) "Donkey Kong [Model RX8513]"
[US] Apple II (1983)
[US] Commodore C64 (1983) "Donkey Kong [Model RX8514]"
[US] PC [MS-DOS] (1997) "Champ Kong" by CHAMProgramming.

* OTHERS: 
[US] VFD handheld game (1982) by Coleco. 
[US] LCD handheld game "Game & Watch: Donkey Kong" by Nintendo : Uses a double screen.

### Series
1. Donkey Kong (1981)
2. Donkey Kong Junior (1982)
3. Donkey Kong 3 (1983)

### Contribute
Edit this entry: https://www.arcade-history.com/game/34723/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `dkong`. Play it at [../../../app/g/dkong/](../../../app/g/dkong/) or [explore the knowledge graph](viewer.html).*
