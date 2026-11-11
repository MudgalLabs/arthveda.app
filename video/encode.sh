#!/usr/bin/env bash
# Encodes from the rendered frame sequence (out/frames/f0000.jpeg ... f2399.jpeg).
#
#   out/hero-loop.webm         AV1, compressed for the site hero (Chrome/Firefox/Edge, newer Safari)
#   out/hero-loop.mp4          H.264, compressed hero fallback that plays everywhere
#   out/arthveda-showreel.mp4  H.264 at high bitrate, for social posts and anywhere size doesn't matter
#
# Colour: the JPEG frames are BT.601 full range; they are converted to BT.709
# limited range and tagged, so browsers don't crush or wash out the navy.
# Loop: frame 2399 is deliberately NOT forced to a keyframe. Nothing references
# the last frame, so a forced keyframe there gets starved of bits and the loop
# pops from soft to sharp; left as the end of a normal mini-GOP it matches frame 0.
set -euo pipefail
cd "$(dirname "$0")"

IN=(-framerate 60 -i out/frames/f%04d.jpeg)
VF="scale=in_range=full:in_color_matrix=bt601:out_range=tv:out_color_matrix=bt709:flags=lanczos+accurate_rnd+full_chroma_int"
TAG="setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv"
TAGS=(-color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv)
X264="keyint=240:min-keyint=60:ipratio=1.15:aq-mode=3:aq-strength=0.85:deblock=-1,-1:psy-rd=1.0,0.10"

ffmpeg -y -v error -stats "${IN[@]}" -an -vf "$VF,format=yuv420p10le,$TAG" \
    -c:v libsvtav1 -preset 4 -crf "${CRF_AV1:-40}" -g 240 -svtav1-params "tune=0:scd=1:enable-tf=0" \
    "${TAGS[@]}" out/hero-loop.webm

ffmpeg -y -v error -stats "${IN[@]}" -an -vf "$VF,format=yuv420p,$TAG" \
    -c:v libx264 -preset veryslow -crf "${CRF_H264:-28}" -profile:v high -level:v 4.2 -x264-params "$X264" \
    "${TAGS[@]}" -movflags +faststart out/hero-loop.mp4

ffmpeg -y -v error -stats "${IN[@]}" -an -vf "$VF,format=yuv420p,$TAG" \
    -c:v libx264 -preset slow -crf "${CRF_SOCIAL:-16}" -profile:v high -level:v 4.2 -x264-params "$X264" \
    "${TAGS[@]}" -movflags +faststart out/arthveda-showreel.mp4

ls -lh out/hero-loop.webm out/hero-loop.mp4 out/arthveda-showreel.mp4
