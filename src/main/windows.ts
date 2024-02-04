import { BrowserWindow, shell } from "electron"
import type { BrowserWindowConstructorOptions } from "electron"
import { join } from "path"

export interface IWindow {
  init(): void
  close(): void
}

abstract class Window implements IWindow {
  public _activate: boolean | null
  protected _window: BrowserWindow | null
  protected _options: BrowserWindowConstructorOptions

  constructor(options: BrowserWindowConstructorOptions) {
    this._activate = null
    this._options = options
    this._window = null
  }

  private loadFile(): void {
    if ( this._window ) {
        this._window.loadFile(join(__dirname, "../renderer/index.html"))
    }
  }

  protected webContents(): void {
    if ( this._window ) {
        this._window.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: "deny" }
        })
    }
  }

  protected events(): void {
    if (this._window) {
        this._window.on("ready-to-show", () => {
            this._window?.show()
        })
      
        this._window.on("close", () => {
            this._activate = false
            this._window = null
        })
    }
  }

  public init(): void {
    this._window = new BrowserWindow(this._options)
    this._activate = true
    this.loadFile()
    this.events()
    this.webContents()
  }

  public close(): void {
    if (this._window) {
      this._activate = false
      this._window.close()
    }
  }
}

export class AuthWindow extends Window {
  constructor() {
    super({
      title: "Hacking-Tools Authentication",
      fullscreenable: false,
      resizable: false,
      width: 500,
      height: 600,
      show: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        devTools: false,
        sandbox: false,
      },
    })
  }
  
}

export class PanelWindow extends Window {
  constructor() {
    super({
      title: "Hacking-Tools",
      width: 1080,
      height: 600,
      show: true,
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
      },
    })
  }
}