import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// The app's own font files (web/src/assets/fonts): Inter is variable (wght +
// opsz), Plex Mono carries every number and ticker, Museo Sans is the wordmark.
export const fontsReady = Promise.all([
    loadFont({ family: "Inter", url: staticFile("fonts/Inter.ttf"), weight: "100 900", format: "truetype" }),
    loadFont({ family: "IBM Plex Mono", url: staticFile("fonts/IBMPlexMono-Regular.woff2"), weight: "400" }),
    loadFont({ family: "IBM Plex Mono", url: staticFile("fonts/IBMPlexMono-Medium.woff2"), weight: "500" }),
    loadFont({ family: "IBM Plex Mono", url: staticFile("fonts/IBMPlexMono-SemiBold.woff2"), weight: "600" }),
    loadFont({ family: "Museo Sans", url: staticFile("fonts/MuseoSans.otf"), weight: "300", format: "opentype" }),
]);
