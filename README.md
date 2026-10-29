# chanchipui.github.io

Personal research website. Plain HTML/CSS/JS with no build step.

## Preview locally

```bash
cd ~/Desktop/chanchipui.github.io
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

```bash
cd ~/Desktop/chanchipui.github.io
git init -b main
git add .
git commit -m "Initial site"
gh repo create CHANCHIPUI.github.io --public --source . --push
```

GitHub serves a repo named `<username>.github.io` automatically at
https://chanchipui.github.io. If it doesn't appear within a few minutes, go to
**Settings → Pages** and set the source to the `main` branch, root folder.

## Files

```
index.html                 page content
assets/css/style.css       styles (light + dark theme)
assets/js/main.js          theme toggle, video autoplay-on-scroll, MarvisNav run picker
assets/videos/marvisnav/   real-robot, simulation and overview videos, copied from the MarvisNav project page
assets/videos/antobot/     person-following demo (re-encoded from ~/Desktop/Antobot_DemoVideo.mp4)
assets/videos/clawar_demo.mp4  CLAWAR demo (copied from ~/Desktop/CLAWAR_DemoVideo.mp4)
assets/img/profile.jpg     profile photo (600×600, EXIF stripped); if removed, the "CP" initials show instead
```

## Common edits

- **CLAWAR demo video:** save it as `assets/videos/clawar_demo.mp4`, plus an optional poster frame
  `assets/videos/clawar_demo.jpg`. The "coming soon" placeholder disappears once the file exists.
  To compress a raw recording to a web-friendly size:
  ```bash
  ffmpeg -i raw.mp4 -vf "scale=1280:-2,format=yuv420p" -an -c:v libx264 -crf 26 \
         -preset slow -movflags +faststart assets/videos/clawar_demo.mp4
  ffmpeg -ss 5 -i assets/videos/clawar_demo.mp4 -frames:v 1 -q:v 4 assets/videos/clawar_demo.jpg
  ```
- **Profile photo:** add a square image at `assets/img/profile.jpg`.
- **CV / Google Scholar buttons:** uncomment the lines marked in `index.html` (hero section).
- **MarvisNav clips:** these are copies of the videos on https://wangjincheng1998.github.io/MarvisNav/.
  If that page gets new or updated videos, replace the files in `assets/videos/marvisnav/`. Each
  chip in the picker sets `data-src`, `data-poster`, `data-ratio` and `data-meta`, so to add a clip,
  copy one `<button class="chip">` and edit those four attributes.

Keep individual videos under a few MB. GitHub rejects files over 100 MB, and small files load
faster for visitors.
