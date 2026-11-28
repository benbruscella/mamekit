-- oracle.lua, with the program counter of each watched processor appended to
-- every tapped access it logs (the plan's `io_watch`: `mamekit diverge --watch`).
--
-- It is a wrapper rather than a change to oracle.lua because oracle.lua's text
-- keys every cached MAME run (tools/compare/mame-cache.ts): any edit to it
-- would run every machine's MAME side again. A watched run names this script
-- instead, so it has a key of its own and the cache keeps the rest.
--
-- oracle.lua writes one access per write() to mame-io.txt, ending in "\n",
-- from inside the tap: the watched PCs are read there, at the access, as
-- `tag=pc` fields after the time. `CURPC` is MAME's STATE_GENPC, the address
-- of the next instruction, as ours logs it.
--
-- MAME runs the autoboot script again after every reset; oracle.lua returns at
-- once when its `oracle` table exists, and so does this.

if oracle then return end

local plan = dofile(os.getenv("MAMEKIT_ORACLE_PLAN"))
local machine = manager.machine

local watched = {}
for _, tag in ipairs(plan.io_watch or {}) do
  local device = machine.devices[":" .. tag]
  local entry = device and device.state and (device.state["CURPC"] or device.state["PC"])
  if entry then watched[#watched + 1] = { tag = tag, entry = entry } end
end

local function suffix()
  local parts = {}
  for index, watch in ipairs(watched) do
    parts[index] = string.format(" %s=%x", watch.tag, watch.entry.value)
  end
  return table.concat(parts)
end

local open = io.open
io.open = function(path, mode)
  local file, message = open(path, mode)
  if not file or not path:match("/mame%-io%.txt$") then return file, message end
  -- A proxy for the access log: each line gets the watched PCs before its newline.
  return setmetatable({}, { __index = function(_, name)
    if name == "write" then
      return function(_, text)
        return file:write((text:gsub("\n$", suffix() .. "\n")))
      end
    end
    local value = file[name]
    if type(value) == "function" then return function(_, ...) return value(file, ...) end end
    return value
  end })
end

local here = debug.getinfo(1, "S").source:match("^@(.*)/[^/]*$") or "."
dofile(here .. "/oracle.lua")
io.open = open
