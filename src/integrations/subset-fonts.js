import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import subsetFont from "subset-font";

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

export default function subsetFonts() {
  return {
    name: "subset-fonts",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = dir.pathname;
        const htmlFiles = await collectFiles(root, ".html");
        const chars = new Set();

        for (const file of htmlFiles) {
          const html = await readFile(file, "utf-8");
          for (const ch of extractText(html)) {
            chars.add(ch);
          }
        }

        for (let i = 32; i <= 126; i++) chars.add(String.fromCodePoint(i));
        for (const ch of "\u2013\u2014\u2018\u2019\u201C\u201D\u2026\u00A0\u00B7\u2022\u00D7\u2192\u2190\u2191\u2193\u00A9") {
          chars.add(ch);
        }

        const text = [...chars].join("");
        logger.info(`${chars.size} unique characters from ${htmlFiles.length} pages`);

        const fontDirs = [join(root, "_astro/fonts")];
        // Also subset Vercel output if present
        const vercelFonts = join(root, "../../.vercel/output/static/_astro/fonts");
        fontDirs.push(vercelFonts);

        const fontFiles = [];
        for (const d of fontDirs) {
          try {
            fontFiles.push(...(await collectFiles(d, ".woff2")));
          } catch {}
        }

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
          } catch {
            totalAfter += original.length;
          }
        }

        logger.info(
          `Fonts: ${(totalBefore / 1024).toFixed(1)}kB → ${(totalAfter / 1024).toFixed(1)}kB (−${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
        );
      },
    },
  };
}
