-- Deterministic MAME reference input for Kung-Fu Master audio comparisons.
--
-- Keep the coin/start frame numbers aligned with the acceptance contract, then
-- leave Thomas idle so the first attackers defeat him.

local coin
local start

for _, port in pairs(manager.machine.ioport.ports) do
	for name, field in pairs(port.fields) do
		if name == "Coin 1" then
			coin = field
		elseif name == "1 Player Start" then
			start = field
		end
	end
end

assert(coin, "Kung-Fu Master Coin 1 input is missing")
assert(start, "Kung-Fu Master 1 Player Start input is missing")

local frame = 0

emu.register_frame_done(function()
	frame = frame + 1
	coin:set_value((frame >= 600 and frame < 610) and 1 or 0)
	start:set_value((frame >= 630 and frame < 640) and 1 or 0)
	if frame == 600 then
		print("kungfum reference: coin")
	elseif frame == 630 then
		print("kungfum reference: start")
	end
end)
