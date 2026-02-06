import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import subsetFont from "subset-font";

const DIST_DIR = "dist/client";
const FONTS_DIR = join(DIST_DIR, "_astro/fonts");

async function collectFiles(dir, ext) {
  const results = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await collectFiles(full, ext)));
    } else if (extname(entry.name) === ext) {
      results.push(full);
    }
  }
  return results;
}

function extractText(html) {
  // Strip tags, decode common entities, collect raw characters
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-z]+;/gi, " ");
}

async function main() {
  // 1. Collect all unique characters from HTML output
  const htmlFiles = await collectFiles(DIST_DIR, ".html");
  const chars = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf-8");
    for (const ch of extractText(html)) {
      chars.add(ch);
    }
  }

  // Always include basic ASCII + common punctuation
  for (let i = 32; i <= 126; i++) chars.add(String.fromCodePoint(i));
  // Common typographic characters
  for (const ch of "\u2013\u2014\u2018\u2019\u201C\u201D\u2026\u00A0\u00B7\u2022\u00D7\u2192\u2190\u2191\u2193\u00A9") {
    chars.add(ch);
  }

  const text = [...chars].join("");
  console.log(`Collected ${chars.size} unique characters from ${htmlFiles.length} pages`);

  // 2. Subset each font file
  const fontFiles = await collectFiles(FONTS_DIR, ".woff2");
  let totalBefore = 0;
  let totalAfter = 0;

  for (const fontFile of fontFiles) {
    const original = await readFile(fontFile);
    totalBefore += original.length;

    try {
      const subsetted = await subsetFont(original, text, {
        targetFormat: "woff2",
      });
      totalAfter += subsetted.length;
      await writeFile(fontFile, subsetted);
      const pct = ((1 - subsetted.length / original.length) * 100).toFixed(1);
      console.log(
        `  ${fontFile}: ${(original.length / 1024).toFixed(1)}kB → ${(subsetted.length / 1024).toFixed(1)}kB (−${pct}%)`
      );
    } catch (e) {
      totalAfter += original.length;
      console.log(`  ${fontFile}: skipped (${e.message})`);
    }
  }

  console.log(
    `\nFonts: ${(totalBefore / 1024).toFixed(1)}kB → ${(totalAfter / 1024).toFixed(1)}kB (−${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
  );
}

main();
