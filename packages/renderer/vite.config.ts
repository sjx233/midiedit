import eslint from "@rollup/plugin-eslint";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig, Plugin } from "vite";
import { minifyHtml } from "vite-plugin-html";

function preprocessor(plugin: Plugin): Plugin {
  return { ...plugin, enforce: "pre" };
}

export default defineConfig(({ command }) => ({
  root: "./packages/renderer",
  base: "",
  plugins: [
    command === "build" ? preprocessor(eslint({ include: ["./packages/renderer/src/**/*.ts", "./packages/renderer/src/**/*.tsx"] })) : [],
    reactRefresh(),
    minifyHtml()
  ],
  css: {
    modules: {
      localsConvention: "camelCaseOnly"
    }
  },
  build: {
    target: "es2020",
    sourcemap: true,
    brotliSize: false
  }
}));
