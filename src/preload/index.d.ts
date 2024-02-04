import { ElectronAPI } from "@electron-toolkit/preload"

declare global {
  interface Window {
      electron: {
        auth: {
          setToken: (token: string) => void
          delToken: () => void
        }
      }
  }
}