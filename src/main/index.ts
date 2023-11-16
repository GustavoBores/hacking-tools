import { app, BrowserWindow } from "electron"
import { electronApp, optimizer } from "@electron-toolkit/utils"
import { AuthWindow } from "./windows"

class MainApp {
  constructor() {
    this.init()
  }

  private init(): void {
    app.whenReady().then(() => {
      this.configureApp()

      this.windowsApp().authWindow()

      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          this.windowsApp().authWindow
        }
      })
    })

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit()
      }
    })
  }

  private windowsApp() {
    const authWindow = new AuthWindow()

    return {
      authWindow: () => authWindow.create()
    }
  }

  private configureApp(): void {
    electronApp.setAppUserModelId("com.hacking-tools")

    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
  }
}

new MainApp()
