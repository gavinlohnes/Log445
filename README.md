# PROJECT BEYOND

A personal training, nutrition, and health tracker built for one user — me. Designed to fit a specific life: night-shift work, irregular eating windows, narcolepsy, pre-diabetes, an upcoming Zepbound regimen, and a 210 → 165 lb cut.

It's a single-page web app, fully offline-capable, with all data stored locally on the device. No accounts. No servers. No analytics.

🔗 **Live app:** [open here](https://gavinlohnes.github.io/PROJECT-BEYOND-1211/)

---

## What it does

**Daily tab**
- Calorie / protein / step / sleep rings with auto-switching duty-aware targets (off-duty vs on-shift)
- Fasting protocol with a "// JUST ATE" timestamp button and configurable fast duration
- Energy & sleepiness log (1–10 scale + dedicated "sleepy now" button) for narcolepsy tracking
- Body weight and reflection fields tied to the current week

**Push / Pull / Upper tabs**
- Three-day weekly training split with editable exercise lists
- Per-exercise weight / reps / rest / notes
- Auto-suggested next session weight based on whether you hit your rep targets
- Live PR detection with optional synth-blip alert
- One-tap "// FILL FROM LAST" to pre-populate every exercise from the previous matching session
- Built-in plate calculator and 1RM estimator

**Summary tab**
- Weekly weigh-in tracker with running total
- Body weight trend chart (Chart.js)
- Reflection prompts: improvement, hardest part, biggest win, free-form notes
- Week-type tagging (Build / Test / Deload / Recovery) that affects progressive overload logic

**History tab**
- Every saved week, viewable and editable
- Full session detail per week
- CSV export, JSON backup/restore

**Settings ([BC] button in header)**
- Off-duty + on-shift calorie and protein targets
- Fast duration, weight increment, target reps per set
- Optional streak counter, optional PR alert sound

---

## Stack

- Plain HTML, CSS, JavaScript — no build step, no framework
- Chart.js for trend graphs (loaded from CDN, cached by service worker)
- localStorage for all persistence
- Service worker for offline support
- Inline SVG icon, inline web app manifest — fully installable as a PWA

Two files only: `index.html` (the app) and `sw.js` (the service worker).

---

## Install as an app

1. Open the live URL on your phone
2. **iOS Safari:** Share → Add to Home Screen
3. **Android Chrome:** Menu → Install app

Once installed, it runs offline, opens instantly, and behaves like a native app.

---

## Updating the app

When the `index.html` is updated, push the new file to this repo. To force installed copies to refresh, **bump the `VERSION` constant in `sw.js`** (e.g. `'beyond-v1'` → `'beyond-v2'`). Without that bump, installed copies serve the cached old version.

---

## Privacy

All data stays in the browser's localStorage on the device where it's logged. Nothing is transmitted anywhere. The app does not phone home, does not include analytics, and does not require an account.

To move data between devices (e.g. phone ↔ desktop), use the JSON backup/restore on the History tab. Save the backup file to your own cloud storage if you want to.

---

## For my doctor

If you're reading this from my phone during a visit:

- **Weight trend** is on the Summary tab
- **Calorie / protein / sleep history** is on the Daily tab and exportable as CSV from History
- **Energy and sleepiness events** are timestamped in localStorage and can be exported on request — useful for narcolepsy patterns
- **Fasting protocol logs** are stored alongside meal timestamps
- Once Zepbound starts, dose tracking will be added here

All of the above can be backed up to JSON or exported as CSV from the History tab.

---

## Status

Personal project, used by one person, evolving as I figure out what actually helps me stick with it. If something is broken or wrong, I'll fix it — file an issue if you stumble on this and have feedback.
