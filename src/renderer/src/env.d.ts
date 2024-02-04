/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly RENDERER_VITE_SERVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}