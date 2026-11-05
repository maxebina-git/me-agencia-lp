import { copyFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(root, "dist", "index.html");
const dest = resolve(root, "dist", "404.html");

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log("404.html gerado a partir de index.html (fallback SPA para URLs limpas).");
} else {
  console.warn("dist/index.html não encontrado — 404.html não gerado.");
}
