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
index.html                 page content (English)
zh/index.html              Simplified Chinese version (same structure; asset paths start with ../)
assets/css/style.css       styles (light + dark theme)
assets/js/main.js          theme toggle, video autoplay-on-scroll, MarvisNav run picker
assets/videos/marvisnav/   real-robot, simulation and overview videos, copied from the MarvisNav project page
assets/videos/antobot/     person-following demo (re-encoded from ~/Desktop/Antobot_DemoVideo.mp4)
assets/videos/clawar_demo.mp4  CLAWAR demo (copied from ~/Desktop/CLAWAR_DemoVideo.mp4)
assets/img/profile.jpg     profile photo (600×600, EXIF stripped); if removed, the "CP" initials show instead
```
