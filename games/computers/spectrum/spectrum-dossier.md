# ZX Spectrum

**Sinclair Research Ltd · 1982** — transpiled from the MAME driver `src/mame/sinclair/spectrum.cpp` by mamekit.

![marquee](/artwork/media/marquees/spectrum.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/spectrum.webp) | ![cabinet](/artwork/media/cabinets/spectrum.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.500 MHz | 1 |

- **Sound:** stream @ 0.048 MHz
- **Screen:** 352×296 @ 50.08 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `spectrum.rom` | 0x0 | 0x4000 | `ddee531f` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| ShiftLeft | caps shift | `LINE0` | 0x1 |
| Z | z    z    :      ln       beep   copy | `LINE0` | 0x2 |
| X | x    x    £      exp      ink    clear | `LINE0` | 0x4 |
| C | c    c    ?      lprint   paper  cont | `LINE0` | 0x8 |
| V | v    v    /      llist    flash  cls | `LINE0` | 0x10 |
| A | a    a    stop   read      ~     new | `LINE1` | 0x1 |
| S | s    s    not    restore   |     save | `LINE1` | 0x2 |
| D | d    d    step   data      \     dim | `LINE1` | 0x4 |
| F | f    f    to     sgn       {     for | `LINE1` | 0x8 |
| G | g    g    then   abs       }     goto | `LINE1` | 0x10 |
| Q | q    q    <=     sin      asn      plot | `LINE2` | 0x1 |
| W | w    w    <>     cos      acs      draw | `LINE2` | 0x2 |
| E | e    e    >=     tan      atn      rem | `LINE2` | 0x4 |
| R | r    r    <      int      verify   run | `LINE2` | 0x8 |
| T | t    t    >      rnd      merge    rand | `LINE2` | 0x10 |
| 1 / Numpad1 | 1   edit       !    blue     def fn | `LINE3` | 0x1 |
| 2 / Numpad2 | 2   caps lock  @    red      fn | `LINE3` | 0x2 |
| 3 / Numpad3 | 3   true vid   #    magenta  line | `LINE3` | 0x4 |
| 4 / Numpad4 | 4   inv vid    $    green    open# | `LINE3` | 0x8 |
| 5 / Numpad5 | 5   left       %    cyan     close# | `LINE3` | 0x10 |
| 0 / Numpad0 | 0   del             black    format | `LINE4` | 0x1 |
| 9 / Numpad9 | 9   graph      )             point | `LINE4` | 0x2 |
| 8 / Numpad8 | 8   right      (             cat | `LINE4` | 0x4 |
| 7 / Numpad7 | 7   up         '    white    erase | `LINE4` | 0x8 |
| 6 / Numpad6 | 6   down       &    yellow   move | `LINE4` | 0x10 |
| P | p    p    "      tab      (c)    print | `LINE5` | 0x1 |
| O | o    o    ;      peek     out    poke | `LINE5` | 0x2 |
| I | i    i    at     code     in     input | `LINE5` | 0x4 |
| U | u    u    or     chr$     ]      if | `LINE5` | 0x8 |
| Y | y    y    and    str$     [      return | `LINE5` | 0x10 |
| Enter | enter | `LINE6` | 0x1 |
| L | l    l    =      usr      attr     let | `LINE6` | 0x2 |
| K | k    k    +      len      screen$  list | `LINE6` | 0x4 |
| J | j    j    -      val      val$     load | `LINE6` | 0x8 |
| H | h    h    ^      sqr      circle   gosub | `LINE6` | 0x10 |
| Space | space | `LINE7` | 0x1 |
| ShiftRight | symbol shift | `LINE7` | 0x2 |
| M | m    m    .      pi       inverse  pause | `LINE7` | 0x4 |
| N | n    n    ,      inkey$   over     next | `LINE7` | 0x8 |
| B | b    b    *      bin      bright   border | `LINE7` | 0x10 |
| F12 | nmi | `NMI` | 0x1 |
| Right | joystick right | `exp:JOY` | 0x1 |
| Left | joystick left | `exp:JOY` | 0x2 |
| Down | joystick down | `exp:JOY` | 0x4 |
| Up | joystick up | `exp:JOY` | 0x8 |
| Space / X | button1 | `exp:JOY` | 0x10 |
| Space / X | button1 | `exp:LINE4` | 0x1 |
| Up | joystick up | `exp:LINE4` | 0x2 |
| Down | joystick down | `exp:LINE4` | 0x4 |
| Right | joystick right | `exp:LINE4` | 0x8 |
| Left | joystick left | `exp:LINE4` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Hardware Version | `CONFIG` | 0x80 | 0x0 |
| Contention | `CONFIG` | 0x1 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/sinclair/spectrum.cpp`
- **Written by:** Kevin Thacker
- **License:** GPL-2.0+
- **Credited by MAMEDEV:** Kevin Thacker (driver header); holub (14 release notes); AmatCoder (3 release notes); TwistedTom (3 release notes); geecab (2 release notes); MetalliC (2 release notes); rfka01 (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 139 commits by 27 commit authors, 2012–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Computer published 44 years ago:

ZX Spectrum (c) 1982 Sinclair Research, Limited.

The ZX Spectrum is an 8-bit personal home computer released in the United Kingdom in 1982 by Sinclair Research Limited.

### Technical
The Spectrum is based on a Zilog Z80A CPU running at 3.5 MHz. The original model Spectrum has 16 KB (16×1024 bytes) of ROM and either 16 KB or 48 KB of RAM.

### Trivia
Referred to during development as the ZX81 Colour and ZX82, the machine was launched as the ZX Spectrum by Sinclair to highlight the machine's colour display, compared with the black-and-white of its predecessor, the ZX81.

The Spectrum was ultimately released as eight different models, ranging from the entry level model with 16 KB RAM released in 1982 to the "ZX Spectrum +3" with 128 KB RAM and built in floppy disk drive in 1987; together they sold in excess of 5 million units worldwide (not counting numerous clones).

The Spectrum was among the first mainstream audience home computers in the UK, similar in significance to the Commodore 64 in the USA.

Over 24,000 software titles have been released since the Spectrum's launch and new titles continue to be released.

On 23 April 2012, a Google doodle honoured the 30th anniversary of the Spectrum. As it coincided with St George's Day, the logo was of St George fighting a dragon in the style of a Spectrum loading screen.

### Staff
Hardware design was by: Richard Altwasser
Machine's outward appearance was designed by: Rick Dickinson

### Contribute
Edit this entry: https://www.arcade-history.com/game/83045/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `spectrum`. Play it at [../../../app/g/spectrum/](../../../app/g/spectrum/) or [explore the knowledge graph](viewer.html).*
