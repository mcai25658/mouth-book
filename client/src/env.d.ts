/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_HOST: string;
  readonly VITE_PORT: number;
  readonly VITE_APP_SOCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
