// Post-build step: renders each route with react-dom/server so the static
// HTML shipped to crawlers (including non-JS bots like GPTBot/ClaudeBot,
// which robots.txt explicitly allows) carries the page's real title,
// description, canonical, OG/Twitter tags, and JSON-LD, instead of every
// route falling back to the homepage's static <head> tags.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../src/data/blogPosts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");

const staticRoutes = [
  "/",
  "/faq",
  "/web-projects",
  "/tech-solutions",
  "/blog",
  "/services/nonprofits",
  "/services/small-business",
  "/services/entrepreneurs",
  "/services/website-design",
  "/services/crm-setup",
  "/services/ai-workflow",
  "/services/staff-training",
  "/services/lms-development",
  "/services/microsoft-365",
  "/services/digital-strategy",
  "/crm-checklist",
  "/tech-health-check",
  "/terms-of-use",
  "/legal",
];

const routes = [...staticRoutes, ...blogPosts.map((post) => `/blog/${post.slug}`)];

// React 19 hoists <title>/<meta>/<link>/<script type="application/ld+json">
// tags (and resource preload hints) to the front of the renderToString
// output. Peel that leading run off so it can be merged into the static
// <head>, leaving the actual visible markup behind for #root.
const HOISTED_TAG = /^\s*(<title>[\s\S]*?<\/title>|<meta[^>]*\/?>|<link[^>]*\/?>|<script type="application\/ld\+json">[\s\S]*?<\/script>)/;

function splitHoistedHead(html) {
  let rest = html;
  let head = "";
  let match;
  while ((match = rest.match(HOISTED_TAG))) {
    head += match[1];
    rest = rest.slice(match[0].length);
  }
  return { head, body: rest };
}

// Strip the data-rh-static-marked fallback tags (title/description/canonical)
// from the template — same marker src/main.jsx uses client-side — then splice
// in this route's real hoisted tags.
const STATIC_FALLBACK_TAG =
  /<title[^>]*data-rh-static="true"[^>]*>[\s\S]*?<\/title>\s*|<meta[^>]*data-rh-static="true"[^>]*\/>\s*|<link[^>]*data-rh-static="true"[^>]*\/>\s*/g;

// Once the app mounts, Helmet re-renders its own title/meta/link/schema tags
// via React's hoisting — but React has no idea these prerendered ones exist
// (it didn't create them), so it would just add a second copy of each rather
// than replacing them. Marking the prerendered ones with the same
// data-rh-static attribute main.jsx already strips on mount means the client
// always ends up with exactly one of each, whichever set it came from.
function markStatic(headString) {
  return headString
    .replace(/<title>/g, '<title data-rh-static="true">')
    .replace(/<meta /g, '<meta data-rh-static="true" ')
    .replace(/<link /g, '<link data-rh-static="true" ')
    .replace(/<script type="application\/ld\+json">/g, '<script data-rh-static="true" type="application/ld+json">');
}

function injectHead(template, hoistedHead) {
  const head = template.replace(STATIC_FALLBACK_TAG, "");
  return head.replace("</head>", `    ${markStatic(hoistedHead)}\n  </head>`);
}

async function main() {
  const template = await readFile(path.join(distDir, "index.html"), "utf-8");
  const { render } = await import("../dist-server/entry-server.js");

  for (const route of routes) {
    let rendered;
    try {
      rendered = render(route);
    } catch (err) {
      console.warn(`[prerender] skipped ${route}: ${err.message}`);
      continue;
    }

    const { head, body } = splitHoistedHead(rendered.html);
    let page = injectHead(template, head);
    page = page.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

    const outPath =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, route.slice(1), "index.html");

    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, page);
    console.log(`[prerender] wrote ${path.relative(distDir, outPath)}`);
  }
}

main();
