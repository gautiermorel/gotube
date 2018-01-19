const electron = require('electron');
const path = require('path')

const { app, BrowserWindow, globalShortcut } = electron;

let win;

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
	const retMediaPlayPause = globalShortcut.register('MediaPlayPause', () => {
		win.webContents.sendInputEvent({ keyCode: 'Enter', type: 'keyUp' }) // Trigger "Enter" key instead of play/pause
	})

	const retMediaNextTrack = globalShortcut.register('MediaNextTrack', () => {
		win.webContents.sendInputEvent({ keyCode: 'right', type: 'keyDown' }) // Trigger "right" key instead of play/pause
	})

	const retMediaPreviousTrack = globalShortcut.register('MediaPreviousTrack', () => {
		win.webContents.sendInputEvent({ keyCode: 'left', type: 'keyDown' }) // Trigger "left" key instead of play/pause
	})

	if (!retMediaPlayPause) { console.log('MediaPlayPause: registration failed') }
	if (!retMediaPreviousTrack) { console.log('MediaNextTrack: registration failed') }
	if (!retMediaNextTrack) { console.log('MediaNextTrack: registration failed') }
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') { app.quit(); }
});

app.on('will-quit', () => {
	globalShortcut.unregister('MediaPlayPause')
	globalShortcut.unregister('MediaNextTrack')
	globalShortcut.unregister('MediaPreviousTrack')
	globalShortcut.unregisterAll()
})

app.on('activate', () => {
	if (win === null) { createWindow(); }
});