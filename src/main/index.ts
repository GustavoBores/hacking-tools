import { ipcMain, app } from "electron"
import { optimizer, electronApp } from "@electron-toolkit/utils"
import { AuthWindow, PanelWindow } from "./windows"
import axios from "axios"
import Store from "electron-store"

class MainApp {
  private _authWindow: AuthWindow
  private _panelWindow: PanelWindow
  private _isAuthenticate: boolean
  private _store: Store

  constructor() {
    this._store = new Store()
    this._authWindow = new AuthWindow()
    this._panelWindow = new PanelWindow()
    this._isAuthenticate = false
  }

  private set isAuthenticate(isAuthenticate: boolean) {
    this._isAuthenticate = isAuthenticate
    this.defineWindow()
  }

  private defineWindow(): void {
    if ( this._isAuthenticate === false ) {
      if ( this._panelWindow._activate === true ) this._panelWindow.close()
      this._authWindow.init()
      return
    }
    
    if ( this._isAuthenticate === true ) {
      if ( this._authWindow._activate === true ) this._authWindow.close()
      this._panelWindow.init()
      return
    }
  }

  private async validateToken(): Promise<boolean> {
    if (!this._store.get("token")) {
      return false
    }

    else {
      try {
        await axios.post(`${import.meta.env.MAIN_VITE_SERVER}/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this._store.get("token")}`
            }
          }
        )
        return true

      } catch (error) {
        this._store.delete("token")
        return false
      }
    }
  }

  public init(): void {
    app.whenReady().then(() => {
      this.configureApp()
      this.validateToken().then(res => {
        this.isAuthenticate = res
      })
      this.events()

      app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
          app.quit()
        }
      })
    })
  }

  private events(): void {
    ipcMain.on("set-token", (_, event: string) => {
      this._store.set("token", event)
      this.isAuthenticate = true
    })
    
    ipcMain.on("del-token", () => {
      this._store.delete("token")
      this.isAuthenticate = false
    })
  }

  private configureApp(): void {
    electronApp.setAppUserModelId("com.hacking-tools")

    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
  }
}

const mainApp = new MainApp()
mainApp.init()