import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://allistartechnologies.co.ug";

const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/work", priority: "0.9", changefreq: "monthly" },
  { path: "/studio", priority: "0.8", changefreq: "yearly" },
  { path: "/services", priority: "0.8", changefreq: "yearly" },
  { path: "/contact", priority: "0.8", changefreq: "yearly" },
];

/** Keeps sitemap.xml in step with the projects in src/media.json. */
function sitemap() {
  const media = JSON.parse(
    readFileSync(fileURLToPath(new URL("./src/media.json", import.meta.url)), "utf8")
  );
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...STATIC_ROUTES,
    ...Object.keys(media.projects).map((slug) => ({
      path: `/work/${slug}`,
      priority: "0.7",
      changefreq: "yearly",
    })),
  ];
  const body = urls
    .map(
      (url) =>
        `  <url>\n    <loc>${ORIGIN}${url.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return {
    name: "allistar-sitemap",
    configureServer(server) {
      server.middlewares.use("/sitemap.xml", (_request, response) => {
        response.setHeader("Content-Type", "application/xml");
        response.end(xml);
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemap()],
  build: {
    assetsInlineLimit: 2048,
  },
});
