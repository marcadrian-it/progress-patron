import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    globals: true,
    environment: "jsdom",
    mockReset: true,
    setupFiles: ["setupTests"],
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./") }],
  },
});
