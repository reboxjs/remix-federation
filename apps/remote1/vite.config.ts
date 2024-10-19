import type { AppConfig } from "@remix-run/dev";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import remixFederation from "../../packages/remix-federation/src/vite";

const remixConfig: AppConfig = {
  ignoredRouteFiles: ["**/.*"],
};

const federationConfig = {
  name: "remote1",
  exposes: {
    "./widget1": "./app/components/Widget1",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
    "react/jsx-dev-runtime": { singleton: true },
    "@remix-run/react": { singleton: true },
    "@remix-run/router": { singleton: true },
    "react-router": { singleton: true },
    "react-router-dom": { singleton: true },
  },
};

export default defineConfig({
  optimizeDeps: {
    include: ["react-dom/client", "react/jsx-dev-runtime"],
  },
  ssr: {
    noExternal: ['virtual:server-manifest'], // Ensure it's not externalized in SSR
  },
  build: {
    rollupOptions: {
      external: ['virtual:server-manifest'],
    },
  },
  plugins: [tsconfigPaths(), remix(remixConfig), remixFederation(federationConfig)],
});
