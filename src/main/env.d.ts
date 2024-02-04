/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly MAIN_VITE_SERVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}