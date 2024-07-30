import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.DFX_NETWORK": JSON.stringify(process.env.DFX_NETWORK),
    "process.env.INTERNET_IDENTITY_CANISTER_ID": JSON.stringify(
      process.env.CANISTER_ID_INTERNET_IDENTITY
    ),
    "process.env.CANISTER_ID_ADMINCANISTER": JSON.stringify(
      process.env.CANISTER_ID_ADMINCANISTER
    ),
    "process.env.CANISTER_ID_FACILITYCANISTER": JSON.stringify(
      process.env.CANISTER_ID_FACILITYCANISTER
    ),
    "process.env.CANISTER_ID_AMBULANCECANISTER": JSON.stringify(
      process.env.CANISTER_ID_AMBULANCECANISTER
    ),
    "process.env.CANISTER_ID_ACCIDENTCANISTER": JSON.stringify(
      process.env.CANISTER_ID_ACCIDENTCANISTER
    ),
    "process.env.CANISTER_ID_PATIENTCANISTER": JSON.stringify(
      process.env.CANISTER_ID_PATIENTCANISTER
    ),
    "process.env.CANISTER_ID_REPORTCANISTER": JSON.stringify(
      process.env.CANISTER_ID_REPORTCANISTER
    ),
    "process.env.II_URL": JSON.stringify(
      process.env.DFX_NETWORK === "local"
        ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`
        : "https://identity.ic0.app/"
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});
