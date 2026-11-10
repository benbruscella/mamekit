---
name: codegen-silent-zero
description: "Emitted code answers an unresolvable member call with 0 instead of failing, so widening codegen coverage can silently break hardware — how it broke the Game Boy twice in one session"
metadata:
  node_type: memory
  type: feedback
---

`emitValueMemberCall` in `src/mame/device-codegen.ts` resolves a member
call only through a property on the value, and falls back to **0**. The
interpreter resolves the same call through several more routes: a bound
call by name (`bindings.calls["m_inputs.read"]`), an ioport reference, a
device finder reference, a container accessor.

So the two engines are NOT interchangeable, and `supportsMethod` does not
know it: it accepts any member call whose receiver is a plain member
chain. **Widening codegen coverage therefore silently changes behaviour**
— the claimed method keeps running, just with a zero where a hardware
read was.

Two instances, both on 2026-09-01, both caught only by running the game:

- Listing `machine().time` / `screen().visible_area` in
  `HOST_SERVICE_CALLS` let the emitter claim the DMG PPU's whole state
  machine. It reaches its CPU via `m_lr35902->attotime_to_cycles(...)`,
  which is not a declared link, so the PPU got 0 cycles forever: frozen
  on line 0, boot ROM waiting for line 0x90 that never came.
- Naming a driver's ioport finders / memory views / region pointers in
  `boardMemberNames` let codegen claim the handlers that use them. The
  board binds `m_inputs.read` and `m_boot_view.disable` by NAME, so the
  joypad read and the boot-ROM handover became zeroes.

**Why:** an emitted zero looks exactly like working hardware that reads
zero. No diagnostic, no throw, and `audit:generated` is happy. The only
detector is running the target and watching a real observable.

**Both instances were fixable at the source, and were fixed** the same
day. The causes were NOT unresolvable links: (1) a stale duplicate
`machine().time` binding on every device still answering the frame
counter -- unreachable from the interpreter, and the only one emitted
code could reach; (2) a missing `runtime.writableMember(name)`, since a
board materialises a driver array on first write and `writeIndex` only
ever saw the value, which reads as 0 before the array exists. So treat a
silent zero as a missing binding to go and find, not as a reason to
decline the method. With both fixed, the same widening passed 61/61
acceptance with no golden movement at all.

**How to apply.** After ANY change that makes more methods emittable
(host-service list, supportsMethod, member lists, roots), diff
`grep -o "function method_[a-z_0-9]*"` on the emitted device and board
before and after, then run the affected games -- golden hashes catch
arcade drift but a console with no goldens catches nothing. Treat every
coverage widening as a behaviour change until a real target confirms it.

See [[codegen-interpreter-parity]] and [[emitter-interpreter-parity]] for
the same theme in the opposite direction.
