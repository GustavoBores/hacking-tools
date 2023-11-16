import {  shell, BrowserWindow, BrowserWindowConstructorOptions } from "electron"
import path from "path"

interface IWindow {
    create(): BrowserWindow
}

export class AuthWindow implements IWindow {
    private _authWindow: BrowserWindow
    private _options: BrowserWindowConstructorOptions
    
    constructor() {
        this._options = {
            width: 500,
            height: 600,
            show: false,
            autoHideMenuBar: true,
            webPreferences: {
                preload: path.join(__dirname, "../preload/index.js"),
                sandbox: false
            }
        }
        
        this._authWindow = new BrowserWindow(this._options)
    }

    private loadFile(): void {
        this._authWindow.loadFile(path.join(__dirname, "../renderer/index.html"))
    }

    private events(): void {
        this._authWindow.on("ready-to-show", () => {
            this._authWindow.show()
        })
    }

    private webContents(): void {
        this._authWindow.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)

            return { action: "deny" }
        })
    }

    public create(): BrowserWindow  {
        this.loadFile()
        this.events()
        this.webContents()

        return this._authWindow
    }
}