import { 
  contextBridge, 
  ipcRenderer, 
} from "electron"

class PreloadApp {

  constructor() {
    this.setupRendererAPI()
  }

  private setupRendererAPI(): void {
    contextBridge.exposeInMainWorld("electron", {
      auth: {
        setToken: (token: string) => ipcRenderer.send("set-token", token),
        delToken: () => ipcRenderer.send("del-token"),
      }
    })
  }
}

new PreloadApp()