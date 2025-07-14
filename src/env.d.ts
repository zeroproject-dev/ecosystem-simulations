/// <reference types="astro/client" />
/// <reference types="vite/client" />

// Declara qué contiene import.meta.env
interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
