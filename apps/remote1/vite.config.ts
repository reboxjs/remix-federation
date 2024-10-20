import type { AppConfig } from "@remix-run/dev";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";

const remixConfig: AppConfig = {
  ignoredRouteFiles: ["**/.*"],
};

const federationConfig = {
  name: "remote1",
  exposes: {
    "./widget1": "./app/components/Widget1",
  },
  manifest: true,
  shared: [
    // "react",
    // "react-dom",
    // "@remix-run/react"
  ],
};

export default defineConfig({
  optimizeDeps: {
    include: ["react-dom/client", "react/jsx-dev-runtime"],
  },
  ssr: {
    noExternal: ['virtual:server-manifest'], // Ensure it's not externalized in SSR
  },
  build: {
    target: 'esnext',
    // rollupOptions: {
    //   external: ['virtual:server-manifest'],
    // },
  },
  plugins: [tsconfigPaths(), remix(remixConfig), federation(federationConfig)],
});
