// Bundle once, render many stills: node stills.mjs <composition> <outPrefix> <frame> [frame...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition, openBrowser } from "@remotion/renderer";
import path from "node:path";

const [comp, prefix, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const browser = await openBrowser("chrome", { chromiumOptions: { gl: "angle" } });
const inputProps = process.env.PROPS ? JSON.parse(process.env.PROPS) : {};
const composition = await selectComposition({ serveUrl, id: comp, puppeteerInstance: browser, inputProps });
for (const f of frames) {
    const t0 = Date.now();
    await renderStill({ composition, serveUrl, inputProps, frame: Number(f), output: `out/${prefix}_${String(f).padStart(4, "0")}.png`, puppeteerInstance: browser, chromiumOptions: { gl: "angle" } });
    console.log(`frame ${f} ${Date.now() - t0}ms`);
}
await browser.close({ silent: true });
