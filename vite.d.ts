declare module 'path' {
  export function resolve(...paths: string[]): string;
}

declare module 'vite' {
  export function defineConfig(config: any): any;
  export function loadEnv(mode: string, envDir: string, prefix: string): any;
}

declare module '@vitejs/plugin-react' {
  export default function react(): any;
}

declare const __dirname: string;