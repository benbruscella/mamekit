-- The MAME side of tools/mame-oracle.ts: one script for every comparison.
--
-- It runs as MAME's -autoboot_script and reads its plan, a Lua table written
-- by tools/oracle/mame-side.ts, from the file named by MAMEKIT_ORACLE_PLAN.
-- Frames are counted by the frame notifier, which fires once a frame has
-- finished: the count is the number of frames run, and an input set at count
-- N is read during frame N + 1 -- the harness's own `atFrame: N`.
--
-- Pitfalls already paid for, kept here so no investigation repeats them:
--   * every handle the run needs (notifiers, taps, files) lives in the global
--     `oracle` table; a local one is collected and a tap silently stops;
--   * emu.register_stop is gone since 0.288; add_machine_stop_notifier is it;
--   * a Lua read of a tapped space fires the tap, so dumps set
--     `oracle.dumping` and the taps skip what they see meanwhile;
--   * the screen bitmap read in a notifier is the frame before (MAME swaps
--     its bitmaps first), so pictures come from video:snapshot_pixels(),
--     the image a -snapshot PNG holds: rotated as presented;
--   * machine.time inside a tap is the executing CPU's local time, cycle
--     exact, so a bus access is stamped with the time it happened at (a
--     device's clock is not readable from Lua, so seconds, not cycles).
-- The cold-boot rules (a fresh -nvram_directory and -cfg_directory per run)
-- are the runner's, which owns the command line.

local plan = dofile(os.getenv("MAMEKIT_ORACLE_PLAN"))
local machine = manager.machine

oracle = { count = 0, dumping = false, taps = {}, files = {} }

local function write_file(name, text)
  local file = io.open(plan.out .. "/" .. name, "w")
  file:write(text)
  file:close()
end

local function fail(message)
  write_file("mame-error.txt", message .. "\n")
  machine:exit()
end

-- Our port tags drop the card between slot and port (ctrl1:JOYPAD for MAME's
-- :ctrl1:joypad:JOYPAD), so a tag is found whole, else by its first and last
-- segments.
local function find_port(tag)
  local ports = machine.ioport.ports
  if ports[":" .. tag] then return ports[":" .. tag] end
  local first, last = tag:match("^([^:]+)"), tag:match("([^:]+)$")
  for candidate, port in pairs(ports) do
    if candidate:sub(1, #first + 2) == ":" .. first .. ":" and candidate:sub(-(#last + 1)) == ":" .. last then
      return port
    end
  end
  return nil
end

-- Alternate controllers share a port's bits under PORT_CONDITION; the live
-- one is the field MAME has enabled.
local function find_field(input)
  local port = find_port(input.port)
  if not port then return nil, "MAME has no port for " .. input.port end
  local fallback
  for _, field in pairs(port.fields) do
    if field.mask == input.mask then
      if field.enabled then return field end
      fallback = fallback or field
    end
  end
  if fallback then return fallback end
  return nil, string.format("MAME's %s has no field with mask 0x%x", port.tag, input.mask)
end

oracle.fields = {}
for index, input in ipairs(plan.inputs) do
  local field, problem = find_field(input)
  if not field then return fail(problem) end
  oracle.fields[index] = field
end

local function apply(event)
  if event.kind == "press" then
    oracle.fields[event.input]:set_value(1)
  elseif event.kind == "release" then
    oracle.fields[event.input]:clear_value()
  elseif event.kind == "set" then
    oracle.fields[event.input]:set_value(event.value)
  elseif event.kind == "text" then
    machine.natkeyboard:post_coded(event.text)
  elseif event.kind == "reset" then
    machine:soft_reset()
  elseif event.kind == "boot" then
    -- A software title's start: its command typed, then PLAY once typing
    -- has finished, as title-start.ts does it on this side.
    machine.natkeyboard:post_coded(event.text)
    oracle.play_pending = event.play
  end
end

local function apply_frame(frame)
  for _, event in ipairs(plan.events[frame] or {}) do apply(event) end
end

local function cpu_space(tag)
  local device = machine.devices[":" .. tag]
  if not device then return nil end
  return device.spaces["program"]
end

oracle.ram = {}
for index, cpu in ipairs(plan.ram) do
  local space = cpu_space(cpu.tag)
  if not space then return fail("MAME has no CPU :" .. cpu.tag) end
  oracle.ram[index] = { space = space, ranges = cpu.ranges }
end
if #oracle.ram > 0 then
  oracle.files.ram = io.open(plan.out .. "/mame-ram.bin", "wb")
end

local function dump_ram()
  oracle.dumping = true
  for _, cpu in ipairs(oracle.ram) do
    for _, range in ipairs(cpu.ranges) do
      oracle.files.ram:write(cpu.space:read_range(range[1], range[2], 8))
    end
  end
  oracle.dumping = false
end

if #plan.io > 0 then
  oracle.files.io = io.open(plan.out .. "/mame-io.txt", "w")
end
for index, tap in ipairs(plan.io) do
  local space = cpu_space(tap.tag)
  if not space then return fail("MAME has no CPU :" .. tap.tag) end
  local function record(kind)
    return function(offset, data, mask)
      local frame = oracle.count + 1
      if not oracle.dumping and frame >= plan.io_from and frame <= plan.io_to then
        oracle.files.io:write(string.format("%d %s %d %x %x %.10f\n", frame, kind, index - 1, offset, data,
          machine.time:as_double()))
      end
    end
  end
  if tap.read then
    oracle.taps[#oracle.taps + 1] = space:install_read_tap(tap.lo, tap.hi, "oracle-r" .. index, record("R"))
  end
  if tap.write then
    oracle.taps[#oracle.taps + 1] = space:install_write_tap(tap.lo, tap.hi, "oracle-w" .. index, record("W"))
  end
end

local function snapshot(frame)
  local width, height = machine.video:snapshot_size()
  local file = io.open(string.format("%s/mame-%d.rgb", plan.out, frame), "wb")
  file:write(machine.video:snapshot_pixels())
  file:close()
  oracle.size = string.format("%d %d\n", width, height)
end

local function finish()
  for _, file in pairs(oracle.files) do file:close() end
  if oracle.size then write_file("mame-size.txt", oracle.size) end
  write_file("mame-done.txt", string.format("%d\n", oracle.count))
end

apply_frame(0)

oracle.frame_notifier = emu.add_machine_frame_notifier(function()
  oracle.count = oracle.count + 1
  local frame = oracle.count
  if oracle.play_pending and not machine.natkeyboard.is_posting then
    oracle.play_pending = false
    for _, cassette in pairs(machine.cassettes) do cassette:play() break end
  end
  if plan.snapshots[frame] then snapshot(frame) end
  if oracle.files.ram and plan.ram_frames[frame] then dump_ram() end
  apply_frame(frame)
  if frame >= plan.last then
    finish()
    machine:exit()
  end
end)

oracle.stop_notifier = emu.add_machine_stop_notifier(function()
  if oracle.count < plan.last then
    write_file("mame-error.txt", string.format("MAME stopped at frame %d of %d\n", oracle.count, plan.last))
  end
end)
