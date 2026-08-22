# Popeye (revision D)

**Nintendo · 1982** — transpiled from the MAME driver `src/mame/nintendo/popeye.cpp` by mamekit.

![marquee](/artwork/media/marquees/popeye.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/popeye.webp) | ![cabinet](/artwork/media/cabinets/popeye.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 4.000 MHz | 9 |

- **Sound:** ay8910 × 1 @ 2.000 MHz
- **Screen:** 256×448 @ 59.94 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `tpp2-c.7a` | 0x0 | 0x2000 | `9af7c821` |
| `maincpu` | `tpp2-c.7b` | 0x2000 | 0x2000 | `c3704958` |
| `maincpu` | `tpp2-c.7c` | 0x4000 | 0x2000 | `5882ebf9` |
| `maincpu` | `tpp2-c.7e` | 0x6000 | 0x2000 | `ef8649ca` |
| `gfx1` | `tpp2-v.5n` | 0x0 | 0x800 | `cca61ddd` |
| `gfx2` | `tpp2-v.1e` | 0x0 | 0x2000 | `0f2cd853` |
| `gfx2` | `tpp2-v.1f` | 0x2000 | 0x2000 | `888f3474` |
| `gfx2` | `tpp2-v.1j` | 0x4000 | 0x2000 | `7e864668` |
| `gfx2` | `tpp2-v.1k` | 0x6000 | 0x2000 | `49e1d170` |
| `proms` | `tpp2-c.4a` | 0x0 | 0x20 | `375e1602` |
| `proms` | `tpp2-c.3a` | 0x20 | 0x20 | `e950bea1` |
| `sprpal` | `tpp2-c.5b` | 0x0 | 0x100 | `c5826883` |
| `sprpal` | `tpp2-c.5a` | 0x0 | 0x100 | `c576afba` |
| `timing` | `tpp2-v.7j` | 0x0 | 0x100 | `a4655e2e` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Up | joystick up | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| 1 | start1 | `SYSTEM` | 0x4 |
| 2 | start2 | `SYSTEM` | 0x8 |
| 6 | coin2 | `SYSTEM` | 0x20 |
| 9 | service1 | `SYSTEM` | 0x40 |
| 5 | coin1 | `SYSTEM` | 0x80 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coinage | `DSW0` | 0xf | 0xf |
| Copyright | `DSW0` | 0x60 | 0x40 |
| Lives | `DSW1` | 0x3 | 0x1 |
| Difficulty | `DSW1` | 0xc | 0xc |
| Bonus Life | `DSW1` | 0x30 | 0x30 |
| Demo Sounds | `DSW1` | 0x40 | 0x0 |
| Cabinet | `DSW1` | 0x80 | 0x0 |
| Interlace mode | `MCONF` | 0x3 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/nintendo/popeye.cpp`
- **Written by:** smf, Nicola Salmoria, Couriersud
- **License:** BSD-3-Clause
- **Development:** 172 commits by 26 contributors, 2007–2024
- **Top contributors:** Aaron Giles, Miodrag Milanovic, smf-, Vas Crabb, couriersud

## The story

Arcade Video game published 44 years ago:

Popeye (c) 1982 Nintendo.

Popeye is a platform game featuring characters from the famous King Features Syndicate cartoon show of the same name. The aim of the game is to rescue Popeye's girlfriend, Olive Oyl. This is achieved by catching a set number of objects thrown down by Olive from the top of the screen; such as hearts, letters and musical notes. Popeye is constantly pursued in his quest by love rival, Brutus (originally known as Bluto). Popeye must either run away from Brutus or grab some spinach and punch him off the screen (he will, of course, return).

Should any of Olive Oyl's items fail to be caught, they will fall into the water at the bottom of the screen. Popeye will then have only a few seconds to retrieve the object or a life is lost. Several other Popeye characters also make an appearance in the game; namely Wimpy, Swee'Pea, the Sea Hag, and her vulture Bernard. The game's three levels are the dock scene, the street scene and the shipboard scene. These repeat with increasing difficulty.

### Technical
Most Popeye machines were upright cabinets, but cocktails were also available. The upright was in the standard Nintendo cabinet, the same one used in "Donkey Kong", "Donkey Kong Jr.", "Radar Scope", "Donkey Kong 3", and "Sky Skipper". Almost all other Nintendo titles used alternate versions of this same cabinet. "Mario Bros." was wider, "Punch-Out!!" was taller, etc., but they were still nearly identical. A dedicated Popeye machine will be blue, although you will sometimes see them in different colors (non-blue Popeyes are conversion cabinets).

Model No. TPP2-UP

Main CPU : Zilog Z80 (@ 4 Mhz)
Sound Chips : General Instrument AY8910 (@ 2 Mhz)

Players : 2
Control : 4-way joystick
Buttons : 1 (PUNCH)

### Trivia
Popeye was released in December 1982 in Japan.

Licensed to Atari for distribution in Ireland and Great Britain.

* Popeye From Strip To Screen:
Popeye the Sailor, one of the most enduring characters in animation history, began not in motion pictures but in E.C. 'Elzie' Segar's 'Thimble Theater' comic strip. Born in Illinois, Segar began cartooning in Chicago in 1914. Graduating to his own strip for the Chicago American, Segar was then hired in 1919 by Hearst's New York Evening Journal to create the syndicated 'Thimble Theater' strip. 'Thimble Theater' depicted the adventures of Ham Gravy, his girlfriend Olive Oyl and her brother Castor. The venture was a success, expanding to an additional Sunday color page in 1924. Segar's comic strip used complex, rambling and frequently eerie narratives that attracted a devoted following, but it lacked strong central characters. In the 'Thimble Theater' of January 17, 1929, Ham and Castor decided to hire a crew to sail in search of the legendary Whiffle Hen. Walking up to a grizzled one-eyed mariner on a dock, Castor asked him, "Are you a sailor?" "`Ja think I'm a cowboy?" came the reply, introducing Popeye to readers.

* Move Over, Ham Gravy:
Over a period of months, Popeye developed from a supporting character to the central figure in the hunt for the Whiffle Hen. When Segar finally brought the narrative to a close and tried to retire the sailor, outraged fans contacted the Hearst syndicate demanding more adventures with Popeye. Segar obliged them : the sailor replaced Ham as Olive's love interest, Castor Oyl was reduced to infrequent appearances, and the strip was renamed 'Thimble Theater, Starring Popeye'.

The early 1930s was a period of keen competition among American animation studios for market share. Central to the business strategy of most studios was the development of cartoon 'stars' whose popularity would ensure bookings by major theater chains. Disney followed the success of Mickey Mouse by developing new characters like Donald Duck and Goofy up from supporting roles in Mickey Mouse cartoons. Similar strategies were tried at Warner Bros., where Bugs Bunny and Daffy Duck evolved from secondary roles in films starring other animated characters. One of the earliest examples of this took place at the Fleischer Studios, Inc. in New York, where the unpopular starring canine character Bimbo was matched up with a girlfriend in Dizzy Dishes (1930). The girlfriend eventually developed into Betty Boop, the studio's major character. With the popularity of Betty Boop at a peak in 1932, brothers Max and Dave Fleischer decided to introduce a new film series which would include another character to grow into a star. Fleischer rival Van Beuren Corporation had already signed an agreement to bring Otto Soglow's strip 'The Little King' to the screen. Max Fleischer, who was a great fan of Segar's strip, approached Hearst's King Features Syndicate for the right to use Popeye. The two companies signed an agreement on November 17, 1932.

* Betty introduces Popeye to the Big Screen:
The production of the first Popeye film took place in secrecy. Veteran animator Roland Crandall was given space apart from the rest of the studio. There, he single-handedly animated the entire cartoon, aided only by the inclusion of some Shamus Culhane animation recycled from the earlier Betty Boop's Bamboo Isle (1932). The results were so satisfying that even before the film was released, the Fleischers and King Features amended the agreement granting the studio the right to produce and release animated cartoons featuring Popeye for a five year period.

Crandall's film 'Betty Boop Presents Popeye The Sailor' opened in the summer of 1933 as part of the 'Betty Boop' series. After a prologue in which newspapers herald the sailor's film debut, and Popeye sings 'I'm Popeye the Sailor Man', the film featured what was to be the standard 'Popeye' series plot, re-enacted with variations by the Fleischers for the next decade. Olive waits for Popeye to disembark from his ship at the dock. Bluto follows the couple to a fairground, where the two sailors compete for Olive's attentions through feats of strength. Bluto abducts Olive and ties her to a train track. As the locomotive approaches, Popeye and Bluto fight. Popeye defeats Bluto, and, through the magical powers of spinach, is able to stop the train and save Olive Oyl. Here, we see the essential difference between the Segar and Fleischer sense of narrative. Segar reveled in picaresque plots that coursed in unexpected directions for up to two years, exploring every novel twist and nuance of narrative. In anticipation of post-modernism, the very concept of plot was old-fashioned to the Fleischers. Hackneyed and ritualized story conventions were torn apart, recombined in odd juxtapositions, and satirized in endless variations.

The Fleischer Popeye cartoons were an instant success. "It might have been just a fluke, a lucky break, that the Segar characters fit the Fleischer style so well", recalls former Popeye animator Myron Waldman. "The animation of Olive Oyl in the mid-1930s was perfect. It fit her. The character had no elbows and the most prominent knees. When she spoke, the voice fit too. This was character. That's what made her so good".

* Step Aside, Mickey:
Segar's characters were not the only things consistent with the Fleischer style. Both Segar and the Fleischer staff shared a fondness for a poetically improvisational language. When Popeye's original voice artist, William 'Red Pepper Sam' Costello, left after the first few pictures, he was replaced by a studio in-between named Jack Mercer. Much of the dialogs of the Popeye cartoons was post-synched with little attention to synchronized mouth action. Mercer, Mae Questel (Olive's voice, except for the 1938-41 period, when Margie Hines was the voice artist) and William Penell or Gus Wickie, who voiced Bluto, often ad-libbed dialogs during recording sessions, particularly Popeye's 'asides' and pun-filled conversations. Added to this was a progressive softening and increased complexity of Popeye's character, paralleling changes in the strip. Popeye cartoons became the Fleischers' leading attraction. By 1938, Popeye replaced Mickey Mouse as the most popular cartoon character in America.

The Fleischers rummaged through the Segar strip for supporting characters. Bluto, the animated series' antagonist, was a minor character in the Segar strip, appearing only in 1933's 'The Eighth Sea'. Longer-lived strip characters that joined Popeye on the screen included hamburger maven J. Wellington Wimpy, Swee'Pea, Eugene the Jeep and Poopdeck Pappy. While in the comic strip, Popeye gained his great strength from rubbing the Whiffle Hen, the Fleischers added the gimmick of Popeye's power being largely dependent on the ingestion of spinach. Farmers in America's self-styled 'spinach capital' of Crystal City, Texas set up a statue of Popeye in gratitude for the publicity.

As early as 1935, the Fleischers sought backing for a feature-length animated film from their distributor Paramount. Paramount refused to risk money on a feature. In an attempt to persuade the company that longer animated films could be profitable, Max Fleischer initiated the production of three two-reel color 'specials' starring Popeye, beginning with 'Popeye The Sailor Meets Sinbad The Sailor' (1936). Although these 'specials' were often billed over their accompanying feature, Paramount still refused to back the animated feature.

Conditions changed after the success of Disney's 'Snow White And The Seven Dwarfs' (1937) and the Fleischers received money for the eighty minute Gulliver's Travels. According to some sources, the film was originally to have Popeye in the role of Gulliver, but the idea was scrapped early in the planning stages. Perhaps this was unwise. According to internal Paramount correspondence, the Popeye shorts were far more profitable to Paramount than Disney's films were to his distributor, RKO. The sailor's box-office appeal might have helped the Fleischer features. Gulliver's Travels (1938) and the company's next feature, Mr. Bug Goes To Town (1941), bombed, leading to the failure of Fleischer Studios, Inc.

* Post-Fleischer Popeye:
The successor company, Famous Studios, continued with the production of Popeye cartoons. Many of these were remakes of earlier Fleischer films. Much of the supporting cast of the Fleischer versions were replaced by new characters, such as identical nephews Pip-Eye, Peep-Eye, Poop-Eye and Pup-Eye. A redesign of the major characters included white U.S. Navy uniforms for Bluto and Popeye (in keeping with their war-time service in the armed forces), and more comely fashions for Olive. Upgraded technology, including the introduction of color to the series in 1943 with Her Honor The Mare and 3-D in Popeye The Ace Of Space (1953), tried to rejuvenate the series. None of these strategies were able to breathe much life into the films. Spooky Swabs (1957) brought theatrical release of Popeye films to a close.

The success of the black and white Popeye cartoons on television in the 1950s inspired several revivals of the series by such talents as Gene Deitch, John Halas and Joy Batchelor, Jack Kinney, and Hanna-Barbera. Hampered by limited budgets and rushed production schedules, none of these came close to the Fleischer or Famous theatrical versions. The less said about Robert Altman's live-action feature with Robin Williams and Shelley Duvall as Popeye and Olive Oyl, the better. What has endured are the original qualities of the Segar and Fleischer works. In fact, Segar's strips have been reissued by Nostalgia Press and the Smithsonian Press. The earlier Fleischer films, which shared the shabby urban or surreal exotic locations and working-class orientation of the Segar originals, retain a vitality and charm that still appeal to a large group of devoted fans today. 

* Bluto/Brutus issue:
Bluto's name was changed to Brutus after the theatrical Popeye cartoon series went out of production in 1957. It was wrongly believed that Paramount Pictures, distributors of the Fleisher Studios cartoon, owned the rights to the name Bluto. (King Features owned the name all along as Bluto had been originally created for the comic strip.) However, with poor research, they couldn't realize this, and renamed him Brutus to avoid copyright problems. "Brutus" appeared in the 1960-1962 Popeye television cartoons (with his physical appearance changed, making him obese rather than muscular), but he is again "Bluto" (and back to his original muscular physique) in the 1978 Hanna-Barbera Popeye series and the 1980 live-action Popeye movie, as well as the 1987 Popeye and Son series also by Hanna-Barbera. The character was named Bluto in the 2004 movie "Popeye's Voyage: The Quest for Pappy". Nintendo used the name "Brutus" for the character in this arcade game.

### Updates
REVISION D (used on most Popeye machines): 
* Dock scene has a black background.
* Default high score is 32,600.
* First nickname on the default high score table is GET.
* Spinach can only be used once per round, and it is not restored after you lose a life.
* The ladder at the center of the dock scene can only be used to go down.
* Extra Life dip-switch can be set at 40,000, 60,000, 80,000, or None. The default is 40,000, meaning you get an extra life at 40,000 points.

REVISION F (designed especially for novice players):
* Dock scene has a colored background.
* Default high score is smaller than on Revision D : 25,600.
* First nickname on the default high score table is KAC.
* Spinach is restored after you lose a life.
* The ladder at the center of the dock scene can be used to go up or down.
* Extra Life dip-switch can be set at 20,000, 30,000, 50,000, or None, with 20,000 as the default.

BOOTLEG:
* No copyright in bootleg set 1 (the copyright is present in bootleg sets 2 and 3).

### Scoring
Collecting a heart, note, or letter on the...
1st floor: 50 points(1)
2nd floor: 100 points(1)
3rd floor: 300 points(1)
4th floor: 500 points(1)
Punching the punch-bag: 30 points
Punching a bottle: 100 points
Punching a skull: 100 points
Punching Bernard: 1,000 points
Using Spinach power to knock Brutus into the water : 3,000 points
Dropping the bucket on Brutus' head when he's on the...
1st floor: 4,000 points
2nd floor: 2,000 points
3rd floor: 1,000 points
Hitting Swee'Pea's platform from below : 500 points(1)

NOTE: The Punch button is not required to punch Brutus or Bernard when Popeye has Spinach power.

(1) denotes values that are doubled if Popeye has Spinach power.

### Tips and tricks
* A Display Glitch : On the street scene, you can stand at the point on the edge where you 'wraparound' and if you punch a bottle in the right spot, it'll erase part of the 'THRU' sign. This can be done on both sides.

* ROUND 1 - Dock Scene:
1) On this scene, Olive Oyl stands at the top of the screen and throw hearts (24 of them, one at a time) down to the bottom, hoping that Popeye will catch them all. If a heart reaches the bottom of the screen, you will have about 10 seconds to pick it up before it breaks, costing you one life. Try to catch the hearts as high as possible, since they decrease in value as they get closer to the bottom.

2) When Brutus harasses you, cross the edge of the screen from left to right and wait for him to stop directly underneath the bucket. Hit the punching bag at this point and the bucket will fall onto his head, rendering him helpless for a while. This will score you points based on which floor Brutus is on when you hit him (see Scoring above) and give you some time to catch a few more hearts.

3) Like in the cartoons, Popeye becomes stronger after eating Spinach. A can of Spinach moves between the second and third floors of the screen and you can have Popeye eat it by punching the can. Afterwards, Popeye will turn red and become stronger than Brutus for about 10 seconds (shorter in later levels). If you can punch Brutus during this time (you do not need to use the Punch button), he falls into the water, temporarily knocking him out, and you will be awarded 3,000 points.

4) Brutus will eventually recover so make good use of this time by catching as many falling hearts as possible. They don't move, and they are worth twice as much when Popeye is under the influence of Spinach, so catching some of the higher hearts can really help your score. And since extra lives are only awarded at a very high score (40,000 points by default on most machines, and 20,000 points by default on Revision F machines; see Updates above), you should be as greedy as possible.

5) Spinach can only be used once per level, and it is never restored after you lose a life (except in Revision F, see Updates above). Do not use it too soon. Collect about two thirds of the total number of hearts, and have as many hearts fill the air as possible before getting the Spinach.

6) If you want to risk getting 4,000 points instead of 2,000, do not use the punching bag immediately. Wait until you have knocked out Brutus using Spinach power, and position Popeye to the punching bag. After Brutus comes out of the sea, he will move underneath the bucket on the bottom floor. With some practice and timing you should be able to drop the bucket onto his head for 4,000 points. NOTE : Touching Brutus while the bucket is on his head is not fatal. But be careful, because after the bucket comes off he can easily knock out Popeye.

7) To make up for his lumbering slowness, Brutus is capable of throwing beer bottles at Popeye. You should try to force him to throw bottles as often as possible (four at a time) instead of avoiding them, so you can score extra points.

8) The Sea Hag also throws bottles, except she only throws one at a time. The Sea Hag materializes on the edge of the screen for a moment, chucks a bottle, and disappears. She can also be on both sides of the screen at once. So if you are caught between two Sea Hags or between Brutus and the Sea Hag, you will have to be quick on the joystick and the Punch button to survive. 

* ROUND 2 - Street Scene:
This scene is much like the dock scene, except Olive Oyl is now dropping musical notes (16 of them, one at a time). The major difference is the layout, with Wimpy on the plank in the lower left corner. If Popeye jumps off the second floor, he will be catapulted up to the third floor. With some careful timing, you can even make Popeye leap all the way up to the fourth floor, where Swee'Pea is waiting on a balloon platform. Touching the bottom of Swee'Pea's platform will score 500 points (1,000 points while under the influence of Spinach).

* ROUND 3 - Shipboard Scene: 
1) The setting for this scene is a ship, with a sliding platform on the top floor. The scene opens with Bernard, the Sea Hag's pet vulture, carrying Olive Oyl to the mast at the top. This intro is only shown the first time you play the shipboard scene.

2) To start the round, you should be able to slide Popeye across the moving platform on the fourth floor several times, catching the letters H-E-L-P that Olive Oyl is dropping from directly above.

3) Every time Popeye catches a letter, one step is added to a ladder which goes up to Olive Oyl. When the ladder is finished, Olive Oyl is rescued. This is the most difficult scene because a total of 24 letters are needed to complete the ladder and save Olive Oyl. Bernard will constantly appear from the left side of the screen. While sliding back and forth across the platform, you should try to punch Bernard as many times as possible, to score 1,000 points per punch.

4) After Popeye has rescued Olive Oyl on the shipboard scene, there will be an intermission that will have Popeye's face while "I'm Popeye The Sailor Man" plays followed by Popeye blowing his pipe and going "Toot! Toot!". Afterwards, the game begins again from the dock scene with increased difficulty.

On all three scenes, Brutus can reach from underneath or bend down from higher floors to lower ones. Be careful that you are not directly above or below him when he does this.

When the game restarts from the dock scene with increased difficulty, the Sea Hag will start throwing down deadly bouncing skulls from the edges of the screen that must be punched when they are bouncing upward. You must also make sure that there are no skulls directly above Popeye, since they drop down a floor or two and hit him on the head. The Sea Hag only throws skulls on the dock and street scenes, not on the shipboard scene.

Continue to avoid Brutus, Bernard, the beer bottles, and the skulls, and keep catching whatever Olive Oyl throws down.

### Ports
* CONSOLES:
[FR] Philips G7000 Videopac (1982)
[US] Atari 2600 (1983)
[US] Atari 5200 (1983)
[BR] Philips Odyssey² (1983)
[US] ColecoVision (1983)
[US] Intellivision (1983)
[JP] Nintendo Famicom (jul.15, 1983) "Popeye [Model HVC-PP]"
[EU] Nintendo NES (sept.1, 1986) "Popeye [Model NES-PP]"

* COMPUTERS:
[US] Atari 8-bit (1983)
[EU] Commodore C64 (1984)
[US] TI-99/4A (1984)

* OTHERS:
[US] Mobile [Java ME] (2008)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2015/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `popeye`. Play it at [../../../app/g/popeye/](../../../app/g/popeye/) or [explore the knowledge graph](viewer.html).*
