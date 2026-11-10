---
name: device-delegate-config
description: "MAME set_*_callback delegates are device CONFIGURATION, not board connections: bind them to the device, and keep them out of the effect lowering"
metadata:
  type: project
---

MAME configures a `device_delegate` through an inline forwarding setter, a
shape that is uniform across the whole tree:

    template <typename... T> void set_pri_callback(T &&... args)
        { m_pri_cb.set(std::forward<T>(args)...); }

The driver names the *setter* (`m_sprgen->set_pri_callback(FUNC(state::pri_cb))`)
while the device's own code calls the *member* (`m_pri_cb(flags >> 6)`). The
device compiler now emits that map as `delegates: {set_pri_callback: 'm_pri_cb'}`
in the device IR, and composition binds the member as a call on the device.

Two rules keep this from breaking everything else:
- The KG marks such a callback `delegate: 1`. A delegate is configuration, so
  `emit-machine` keeps it out of `effectCallbacks` and `ir/validate.ts` exempts
  it from "every callback must have an executable connection" — exactly as
  `set_screen_update` already is. Without that, MC6845's
  `set_begin_update_callback` / `set_update_row_callback` and TILEMAP's
  `set_info_callback` become unresolvable connections and Qix and Gauntlet fail
  to build.
- `set_irq_acknowledge_callback` matches the same name shape but is a real
  dispatched operation, so the delegate flag is only set for names that are
  NOT already in `CALLBACK_OPERATIONS`.

**Why:** without the binding, `m_pri_cb(...)` evaluates to 0 and Rygar's
sprites drew over the text layer with no priority at all.
