import { Config } from "@remotion/cli/config";

// PNG frames keep the UI's thin lines and small type crisp before the final
// encode; the master is then re-encoded with ffmpeg for the web.
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("angle");
