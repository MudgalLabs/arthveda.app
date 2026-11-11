# Hero loop video

Source for the looping hero video on arthveda.app, built with [Remotion](https://www.remotion.dev).
40 seconds, 1920x1080, 60fps, muted, seamless loop (frame 2399 flows into frame 0).

Every screen is rebuilt as React from the app's own tokens, fonts and logo
(`web/src/index.css`, `web/src/assets/fonts`, `web/src/components/logo.tsx`), so
nothing is a screenshot and every number, candle and row can animate.

## Story ("The Thread")

Eight app screens float on a 3x3 grid around the logo, joined by a light circuit.
A pulse leaves the logo, visits each screen in the order of the loop, and comes
home:

| Frames | Title | Screen |
| --- | --- | --- |
| 0-108 | | Establishing shot (also the poster), dive in |
| 108-704 | Find the idea. | Market Monitor (India and US flip, IRFC lights up), Screener (5,454 to 21) |
| 544-864 | Remember why. | Note on the watchlist add, then the watchlist's since-added time-lapse |
| 864-1284 | Watch it unfold. | Symbol page: candles, markers, Journey cards threaded to their markers |
| 1284-1972 | Learn what works. | Trade review, dashboard + Insights, Ask AI |
| 1972-2212 | Show your process. | Public profile (returns only, never amounts) |
| 2212-2400 | | Pull back, the pulse traces the logo, power-on, settle on frame 0 |

All timing lives in `src/cues.ts`; the camera path is `src/world/camera.ts`.

## Work on it

```bash
npm install
npm run studio            # scrub the timeline in Remotion Studio
node stills.mjs HeroLoop k 0 600 1200   # bundle once, render stills to out/
```

`Panel` is a second composition that renders one screen flat (1600x1000) for
design review: `npx remotion still src/index.ts Panel out/x.png --frame=500 --props='{"id":"SCR"}'`.

## Render and encode

```bash
npx remotion render src/index.ts HeroLoop out/master.mov --codec=prores --prores-profile=hq --concurrency=7
./encode.sh               # out/hero-loop.mp4 (H.264) and out/hero-loop.webm (AV1)
npx remotion still src/index.ts HeroLoop out/hero-loop-poster.png --frame=0 --scale=2
```

The poster is frame 0, so the LCP image and the first video frame match exactly.

## Motion blur

- Titles: true accumulation blur (16 sub-frame samples, additive average).
- Camera dives and pull-backs: the same accumulation on the whole world.
- Whip pans: velocity-scaled directional blur.

Remotion is free for individuals and companies of up to 3 people; larger teams need a company license.
