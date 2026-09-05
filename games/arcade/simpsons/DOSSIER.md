# The Simpsons (4 Players World, set 1)

**Konami · 1991** — transpiled from the MAME driver `src/mame/konami/simpsons.cpp` by mamekit.

![marquee](/artwork/media/marquees/simpsons.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/simpsons.webp) | ![cabinet](/artwork/media/cabinets/simpsons.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | KONAMI | 12.000 MHz | 24 |
| `audiocpu` | Z80 | 3.580 MHz | 7 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 320×224 @ 59.19 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `072-g02.16c` | 0x0 | 0x20000 | `580ce1d6` |
| `maincpu` | `072-g01.17c` | 0x20000 | 0x20000 | `9f843def` |
| `maincpu` | `072-j13.13c` | 0x40000 | 0x20000 | `aade2abd` |
| `maincpu` | `072-j12.15c` | 0x60000 | 0x20000 | `479e12f2` |
| `audiocpu` | `072-e03.6g` | 0x0 | 0x8000 | `866b7a35` |
| `k052109` | `072-b07.18h` | 0x0 | 0x80000 | `ba1ec910` |
| `k052109` | `072-b06.16h` | 0x2 | 0x80000 | `cf2bbcab` |
| `k053246` | `072-b08.3n` | 0x0 | 0x100000 | `7de500ad` |
| `k053246` | `072-b09.8n` | 0x2 | 0x100000 | `aa085093` |
| `k053246` | `072-b10.12n` | 0x4 | 0x100000 | `577dbd53` |
| `k053246` | `072-b11.16l` | 0x6 | 0x100000 | `55fab05d` |
| `k053260` | `072-d05.1f` | 0x0 | 0x100000 | `1397a73b` |
| `k053260` | `072-d04.1d` | 0x100000 | 0x40000 | `78778013` |
| `eeprom` | `simpsons.12c.nv` | 0x0 | 0x80 | `ec3f0449` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | joystick left | `P1` | 0x1 |
| Right | joystick right | `P1` | 0x2 |
| Up | joystick up | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| Z | button2 | `P1` | 0x20 |
| 1 | start1 | `P1` | 0x80 |
| 2 | start2 | `P2` | 0x80 |
| 5 | coin1 | `COIN` | 0x1 |
| 6 | coin2 | `COIN` | 0x2 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `TEST` | 0x1 | 0x1 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/simpsons.cpp`
- **Written by:** Ernesto Corvi
- **License:** BSD-3-Clause
- **Development:** 209 commits by 31 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, hap, Olivier Galibert, Vas Crabb

## The story

Arcade Video game published 35 years ago:

The Simpsons (c) 1991 Konami.

A jewel heist gone wrong sees Mr Burns's sidekick, Smithers, kidnapping Maggie and making his escape. Between one and four players take on the role of either Homer, Marge, Lisa, or Bart in this colorful, horizontally-scrolling beat-em-up from Konami. Each Simpsons character possesses an attacking move specific to them; Marge is armed with a vacuum cleaner, Lisa has a skipping rope, Bart has his skateboard, and Homer fights with his fists. The players must battle their way through a variety of Simpsons-themed levels - such as Springfield and Krustyland - fighting goons, thugs, zombies, drunks, firemen, and several Simpsons regulars. Many Simpsons characters that don't appear as enemies have 'cameo' scenes in the game (Otto working at a burgerstand in Krustyland, for example). The archetypal 'boss' character awaits the players at the end of every stage. The game ends with a final showdown with the evil Mr. Burns in his luxurious mansion.

The Simpsons was designed to Konami's typically-high production standards and was, like the 'Ninja Turtles' games that appeared a couple of years' earlier, very faithful to its source material. The colorful, smoothly-animated sprites captured the spirit of the legendary cartoon superbly, and the game's many humorous touches were timed to perfection.

### Technical
There were several distinct versions of this game available in the arcade, the 4-player dedicated cabinet, the 4-player conversion kit (designed to retrofit "Teenage Mutant Ninja Turtles", but a lot of them ended up on "Gauntlet" machines too), and the 2-player conversion kit (designed to retrofit almost anything). The only real difference in game-play between versions was the maximum amount of players. The Simpsons dedicated cabinet was fairly large and had an over-sized control panel (to accommodate 4 players). The sides were decorated with painted side-art showing all five members of the Simpsons family scampering around (Homer seems to be stepping on the tail of the family cat). Some cabinets may have this same scene as a large sticker, instead of it being painted on. American machines are usually blue in color, while the European ones were usually white. The marquee shows a family photo and has a 'The Simpsons' logo done in yellow. The control panel repeats the graphics from the marquee and has 4 joysticks (one for each player), each of which is a different color. Different Simpsons machines will have different sized monitors, although 25" and 32" were the most popular sizes available. 

Game ID : GX072 

Main CPU : KONAMI (@ 3 Mhz) 
Sound CPU : Zilog Z80 (@ 3.579545 Mhz) 
Sound Chips : Yamaha YM2151 (@ 3.579545 Mhz), K053260 (@ 4 Mhz) 

Players : 4 
Control : 8-Way Joystick 
Buttons : 2 
= > Attack, Jump

### Trivia
The Simpsons was released in March 1991. 

This video game is based on the prime-time animated series of the same name created by Matt Groening. 

The Simpsons and "Aliens" arcade machines can be seen in the background of the 'Moe's Tavern Stage'. Ever wonder why the Aliens arcade game makes a cameo appearance in The Simpsons? It turns out that both The Simpsons tv show and Aliens (the movie) are made by 20th Century Fox (and of course, Konami got the rights to make the arcade games for both franchises). 

Some stuff related to the TV series : 
* In the character profiles, Lisa is said to be age 7. In the TV series, she is 8 years old. 

* In the Character profile, Homer's age is 35. His real age is 36. Konami goofed that one. 

* Bart wears a blue shirt in this game. In the series, he normally wears an orange shirt. The blue-shirted Bart appeared on various T-shirts and other Simpsons merchandise. This was even referenced in one episode of the series. Homer was waving Lisa (who wears a red dress) around to attract a bull's attention. Then Homer says 'Now for some calming blue', and reaches for Bart. Seeing that Bart is wearing an orange shirt, he says 'Where's your blue shirt?'. Bart replies, 'I don't have a blue shirt'. 

* In some parts of the game, the bow in Maggie's hair is pink. Other times, it is the correct blue color. 

* The rabbit characters that appear in various places in the game are from Matt Groening's comic strip, 'Life in Hell'. 

* Smithers is much more evil in this game than he has ever been in the show. In the series, Smithers is (as Burns himself put it) 'the sober Yin to [Burns'] raging Yang'. In this game he is depicted as a cape-wearing, bomb-throwing psycho. Smithers' voice is wrong - Smithers is colored wrong. The color scheme used in this game appears to be based on the episode 'Homer's Odyssey', in which Smithers was colored incorrectly. In this episode, his skin color was also incorrect : instead being yellow, it was a dark pink color. Also, Smithers has never worn a cape, as he does in this game (Perhaps he has an evil twin who is a cape-wearing mad bomber!). 

* Mr. Burns' voice also sounds wrong, except when he says 'Excellent'. The 'Excellent' voice sample was taken directly from the show and the rest of the lines were recorded by a different actor. 

* SPOILER ALERT! : After Mr. Burns has been defeated, his eyes turn into Xs as he is lying on the ground. In the series Bart's eyes were drawn as Xs in a dream sequence, when Bart was imagining that school bully Nelson Muntz had beaten him to death and the school nurse had reconstructed his face for his funeral. 

* In this game Sideshow Bob helps you by giving you food that restores your health. Since a first season episode where he framed Krusty the Klown for armed robbery and his plans were foiled by the Simpson kids, he is normally a villain. It seems that this game was made before the first season was finished (Or at least the people who worked on the game hadn't seen all of the episodes yet). 

* The 'Moe's Tavern' stage in this game does not look much like it's TV counterpart. In this game it seems to be underground and only accessible by hidden elevators (One of the elevators is in a fake 'Krusty' grave in the cemetery stage, the other in a wall of rock in the 'Springfield Butte' stage). Of course, in the series it is just a regular building with a regular door that people walk through off the street. 

* In this game, Barney's hair color is the same color as his skin (yellow). He appeared this way in a few early episodes of the first season, but later his hair was colored brown and only the Simpson kids have hair that is the same color as their skin. 

* Channel 6 (Stage 7) : The anchorman in this stage is the same one that appears in the episode 'Call of the Simpsons'. In that episode, this anchorman sounds just like Kent Brockman, but looks completely different. The anchorman's hair was colored gray in the episode, but in this game the anchorman is colored like Scott Christian (Early on in the series, an anchor named Scott Christian would frequently be 'filling in for Kent Brockman', the regular anchorman. Eventually Christian was dropped from the series and they just used Kent Brockman). This anchorman is neither Kent Brockman or Scott Christian. If you stand in front of the anchorman, he will get mad. If you jump up on the anchor's desk, he will shrug his shoulders. 

In Stage 7, in the scene where you fight ninjas, the sign reads 'kabuki'. 

Michael Jackson used to own this game (4-Player model, serial number: 072251). It was sold at the official Michael Jackson Auction on April 24, 2009.

### Updates
* In the Japanese version, there are nuclear bombs laying around that can be thrown at enemies (for example, in front of the Noiseland Arcade in the first level). These bombs are not present in the other versions. These bombs look the same as the ones Mr. Burns shoots at you on the last level.

* In the Japanese version, you can fill you life meter past full. For example, if your life meter is already full and you get an item that restores your health, you get no benefit in the non-Japanese versions. But in the Japanese version, you will get additional health points, indicated in the meter by a different color (When the life meter is full, it is purple. When it goes past full, the additional health is shown in yellow).

### Staff
Main programmer : A. Suzuki
Software designers : Hirotaka_2, Nwk
Graphic designer : Kengo Nakamura
Main character designer : Y. Takano
Character designers : K. Nakajima, Noriyuki Yokoki
Sound & effect programmer : Hideaki Shikama
Music by: N. Hanzawa
Hardware designer : H. Matsuura
Package designers : N. Satoh, K. Kamiya
Special guest : Hiroshi Iuchi (H. Iuchi_4), M. Samejima
Management : S. Kido
Supervisor : Kengo Nakamura

### Ports
* CONSOLES: 
Microsoft XBOX 360 [XBLA] [US] [EU] [AU] [JP] (feb.3, 2012)  
Sony PlayStation 3 [PSN] [US] (feb.7, 2012)  
Sony PlayStation 3 [PSN] [EU] (feb.8, 2012)  

* COMPUTERS: 
[US] Commodore C64 (1991) 
PC [MS-DOS] [US] (1991)  

* OTHERS: 
BlackBerry [US] (dec.9, 2009) [Model 5046]
Apple iPhone/iPod [US] (dec.21, 2009) [Model 344217468]
Windows Mobile [US] (feb.1, 2010)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2445/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `simpsons`. Play it at [../../../app/g/simpsons/](../../../app/g/simpsons/) or [explore the knowledge graph](viewer.html).*
