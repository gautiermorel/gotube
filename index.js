const electron = require('electron');
const path = require('path')

const { app, BrowserWindow, globalShortcut } = electron;

let win;

const MAPPING_KEYS = [
	{ from: 'MediaPlayPause', to: 'Enter', type: 'keyUp' },
	{ from: 'MediaNextTrack', to: 'Right', type: 'keyDown' },
	{ from: 'MediaPreviousTrack', to: 'Left', type: 'keyDown' },
	{ from: 'VolumeMute', to: 'Backspace', type: 'keyUp' },
	{ from: 'VolumeUp', to: 'Up', type: 'keyDown' },
	{ from: 'VolumeDown', to: 'Down', type: 'keyDown' }
]

function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		titleBarStyle: 'hidden',
		fullscreen: true,
		icon: path.join(__dirname, 'assets/icons/gotube.png')
	});

	win.loadURL('https://www.youtube.com/tv');
	win.on('closed', () => { win = null; });
}

app.on('ready', createWindow);

app.on('ready', () => {
	MAPPING_KEYS.forEach((rule) => {
		globalShortcut.register(rule.from, () => {
			win.webContents.sendInputEvent({ keyCode: rule.to, type: rule.type })
		})
	});

	// WebContent event catching
	win.webContents.on('media-started-playing', () => {
		if (globalShortcut.isRegistered('VolumeUp')) globalShortcut.unregister('VolumeUp')
		if (globalShortcut.isRegistered('VolumeDown')) globalShortcut.unregister('VolumeDown')
	})

	win.webContents.on('media-paused', () => {
		if (!globalShortcut.isRegistered('VolumeUp')) {
			globalShortcut.register('VolumeUp', () => {
				win.webContents.sendInputEvent({ keyCode: 'Up', type: 'keyDown' })
			})
		}

		if (!globalShortcut.isRegistered('VolumeDown')) {
			globalShortcut.register('VolumeDown', () => {
				win.webContents.sendInputEvent({ keyCode: 'Down', type: 'keyDown' })
			})
		}
	})
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });

app.on('will-quit', () => { globalShortcut.unregisterAll() })

app.on('activate', () => { if (win === null) { createWindow(); } });