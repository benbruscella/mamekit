# ZX Spectrum 128

**Sinclair Research Ltd · 1986** — transpiled from the MAME driver `src/mame/sinclair/spec128.cpp` by mamekit.

![marquee](/artwork/media/marquees/spec128.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/spec128.webp) | ![cabinet](/artwork/media/cabinets/spec128.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.547 MHz | 4 |

- **Sound:** ay8910 × 1 @ 1.773 MHz
- **Screen:** 352×296 @ 50.02 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `zx128_0.rom` | 0x10000 | 0x4000 | `e76799d2` |
| `maincpu` | `zx128_1.rom` | 0x14000 | 0x4000 | `b96a36be` |

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
| Insert | edit | `PLUS0` | 0x1 |
| CapsLock | caps lock | `PLUS0` | 0x2 |
| Home | true vid | `PLUS0` | 0x4 |
| End | inv vid | `PLUS0` | 0x8 |
| Left | cursor left | `PLUS0` | 0x10 |
| Backspace | del | `PLUS1` | 0x1 |
| AltLeft | graph | `PLUS1` | 0x2 |
| Right | cursor right | `PLUS1` | 0x4 |
| Up | cursor up | `PLUS1` | 0x8 |
| Down | cursor down | `PLUS1` | 0x10 |
| Pause | ext mode | `PLUS2` | 0x2 |
| Quote | " | `PLUS3` | 0x1 |
| Semicolon | ; | `PLUS3` | 0x2 |
| Period | . | `PLUS4` | 0x4 |
| Comma | , | `PLUS4` | 0x8 |
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

- **Driver source:** `src/mame/sinclair/spec128.cpp`
- **Written by:** Kevin Thacker
- **License:** GPL-2.0+
- **Credited by MAMEDEV:** Kevin Thacker (driver header); holub (13 release notes); AmatCoder (2 release notes); geecab (2 release notes); AJR (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 92 commits by 20 commit authors, 2012–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Computer published 40 years ago:

ZX Spectrum 128 (c) 1986 Sinclair Research, Limited.

New features included 128 KB RAM, three-channel audio via the AY-3-8912 chip, MIDI compatibility, an RS-232 serial port, an RGB monitor port, 32 KB of ROM including an improved BASIC editor, and an external keypad.

### Technical
The appearance of the ZX Spectrum 128 was similar to the ZX Spectrum+, with the exception of a large external heatsink for the internal 7805 voltage regulator added to the right hand end of the case, replacing the internal heatsink in previous versions.

The Z80 processor used in the Spectrum has a 16-bit address bus, which means only 64 KB of memory can be directly addressed. To facilitate the extra 80 KB of RAM the designers used bank switching so that the new memory would be available as eight pages of 16 KB at the top of the address space. The same technique was also used to page between the new 16 KB editor ROM and the original 16 KB BASIC ROM at the bottom of the address space.

The new sound chip and MIDI out abilities were exposed to the BASIC programming language with the command PLAY and a new command SPECTRUM was added to switch the machine into 48K mode, keeping the current BASIC program intact (although there is no way to switch back to 128K mode). To enable BASIC programmers to access the additional memory, a RAM disk was created where files could be stored in the additional 80 KB of RAM. The new commands took the place of two existing user-defined-character spaces causing compatibility problems with some BASIC programs.

The ZX Spectrum 128 had no internal speaker like its predecessors. The sound was produced from the television speaker instead

### Trivia
Code-named 'Derby'. Sinclair developed the ZX Spectrum 128 in conjunction with their Spanish distributor Investrónica. Investrónica had helped adapt the ZX Spectrum+ to the Spanish market after the Spanish government introduced a special tax on all computers with 64 KB RAM or less, and a law which obliged all computers sold in Spain to support the Spanish alphabet and show messages in Spanish.

The machine was simultaneously presented for the first time and launched in September 1985 at the SIMO '85 trade show in Spain, with a price of 44,250 pesetas. Because of the large number of unsold Spectrum+ models, Sinclair decided not to start selling in the UK until January 1986 at a price of £179.95.

### Contribute
Edit this entry: https://www.arcade-history.com/game/83040/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `spec128`. Play it at [../../../app/g/spec128/](../../../app/g/spec128/) or [explore the knowledge graph](viewer.html).*
