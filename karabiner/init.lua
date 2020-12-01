hs.hotkey.bind({}, "f17", function()
	hs.alert.show("Now launching GoTube")
	hs.applescript.applescript([[
		tell application "GoTube"
  			activate
		end tell
	]])
	hs.execute("'/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --select-profile 'GoTube'")
end)

hs.hotkey.bind({}, "f18", function()
	hs.alert.show("Now launching VLC")
	hs.applescript.applescript([[
		tell application "Finder"
			set visible of every process whose visible is true and name is not "Finder" to false
			set the collapsed of windows to true
		end tell
		tell application "VLC"
			OpenURL "file:///Users/gautier/Movies/" play
		end tell
		tell application "Finder"
			if not (exists process "VLC") then
				set startIt to true
			else if frontmost of process "VLC" then
				set visible of process "VLC" to false
			else
				set frontmost of process "VLC" to true
			end if
		end tell
		tell application "System Events"
			delay 1
			keystroke "f" using {command down, control down}
		end tell
	]])
	hs.execute("'/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --select-profile 'Default'")
end)

hs.hotkey.bind({}, "f19", function()
	hs.alert.show("Now launching Kodi")
	hs.applescript.applescript([[
		tell application "Kodi"
  			activate
		end tell
	]])
	hs.execute("'/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --select-profile 'Kodi'")
end)

hs.hotkey.bind({}, "f20", function()
	hs.applescript.applescript([[
		tell application "System Events"
			delay 1
			keystroke "f" using {command down, control down}
		end tell
		tell application "VLC"
			stop
			quit
		end tell
		tell application "GoTube"
			quit
		end tell
		tell application "Kodi"
			quit
		end tell
		tell application "iTunes"
			quit
		end tell
	]])
	hs.alert.show("Bye")
	hs.execute("'/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --select-profile 'Default'")
end)

hs.hotkey.bind({}, "f16", function()
	hs.execute("'/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --select-profile 'KodiPlay'")
end)

hs.hotkey.bind({}, "f15", function()
	hs.execute("'/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli' --select-profile 'Kodi'")
end)