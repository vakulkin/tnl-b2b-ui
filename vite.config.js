import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addRootDivDataAttributes() {
  return {
    name: "add-root-div-data-attributes",
    transformIndexHtml(html) {
      return html.replace(
        '<div id="root">',
        '<div id="root" data-nonce="localhost" data-home-url="http://btob.local">'
      );
    },
  };
}

export default defineConfig(({ command }) => {
  const isServe = command === "serve";

  return {
    plugins: [
      svgr(),
      viteReact(),
      TanStackRouterVite(),
      ...(isServe ? [addRootDivDataAttributes()] : []),
    ],
    base: isServe ? "/" : "/wp-content/plugins/tnl-b2b-platform/ui/",
    build: {
      outDir: path.resolve(
        __dirname,
        "C:/Users/anton/Local Sites/btob/app/public/wp-content/plugins/tnl-b2b-platform/ui"
      ),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
        },
      },
    },
  };
});