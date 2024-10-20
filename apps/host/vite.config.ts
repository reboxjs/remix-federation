import type { AppConfig } from "@remix-run/dev";
import { vitePlugin as remix } from "@remix-run/dev";
import { federation } from '@module-federation/vite'
import { defineConfig } from "vite";
import { installGlobals } from '@remix-run/node';
import tsconfigPaths from "vite-tsconfig-paths";
import { remotes } from './app/utils/remotes';

const remixConfig: AppConfig = {
  ignoredRouteFiles: ["**/.*"],
};
installGlobals();
const federationConfig = {
  name: "host",
  remotes: {
    remoteApp: 'http://localhost:6173/assets/remoteEntry.js',
  },
  shared: [
    "react",
    "react-dom",
    "@remix-run/react"
  ],
};

export default defineConfig({
  optimizeDeps: {
    include: ["react-dom/client", "react/jsx-dev-runtime"],
  },
  build: {
    target: 'esnext',
    modulePreload: false,
  },
  plugins: [tsconfigPaths(), remix(remixConfig), federation(federationConfig)],
});
