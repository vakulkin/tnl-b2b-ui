import path from "path";
import { fileURLToPath } from "url";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addRootDivDataAttributes() {
  return {
    name: "add-root-div-data-attributes",
    transformIndexHtml(html) {
      return html.replace(
        '<div id="root">',
        '<div id="root" data-nonce="localhost" data-home-url="http://btwob.local">'
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
        "C:/Users/anton/Local Sites/btwob/app/public/wp-content/plugins/tnl-b2b-platform/ui"
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
