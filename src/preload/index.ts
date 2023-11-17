import { contextBridge } from "electron"
import { electronAPI } from "@electron-toolkit/preload"

class PreloadApp {
  
  constructor() {    
    this.customAPISforRenderer()
  }

  public customAPISforRenderer() {
    contextBridge.exposeInMainWorld("electron", electronAPI)
  }

}

new PreloadApp()