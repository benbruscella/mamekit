local frame = 0
emu.register_frame_done(function()
  frame = frame + 1
  if frame == 1 or frame == 60 or frame == 180 or frame == 300 or frame == 600 or frame == 900 or frame == 1200 then
    local main = manager.machine.devices[":maincpu"]
    local sound = manager.machine.devices[":sg:cpu"]
    print(string.format("FRAME %d MAIN %04X SP %04X A %02X SOUND %06X", frame,
      main.state["PC"].value, main.state["SP"].value, main.state["A"].value,
      sound.state["PC"].value))
    if frame == 60 then
      for name, entry in pairs(main.state) do
        print(string.format("MAINSTATE %s %X", name, entry.value))
      end
    end
  end
  if frame == 1200 then
    manager.machine.screens[":screen"]:snapshot("/tmp/rampage-native.png")
    manager.machine:exit()
  end
end)
