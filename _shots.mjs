import { chromium } from "playwright-core";
import fs from "node:fs";

const OUT = "C:/Users/gzmsn/AppData/Local/Temp/opencode/nerede";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/01-start.png`, fullPage: true });

// pick the child character
const firstCard = page.locator(".char-card").first();
const nameValue = await firstCard.locator("input").inputValue();
console.log("first card name input:", nameValue);
console.log("first card text:", (await firstCard.innerText()).replace(/\s+/g, " "));

await firstCard.locator("input").fill("Elif");
await firstCard.locator("button").last().click();
await page.waitForTimeout(1500);

const map = page.locator(".city-map");
await map.screenshot({ path: `${OUT}/02-city.png` });

// closeups of every place
const ids = await page.locator("[data-place-id]").evaluateAll((els) =>
  els.map((e) => e.getAttribute("data-place-id")),
);
console.log("places:", ids.length, ids.join(","));

for (const id of ids) {
  const el = page.locator(`[data-place-id="${id}"]`);
  await el.screenshot({ path: `${OUT}/place-${id}.png` });
}

console.log("errors:", errors.length ? errors : "none");
await browser.close();
