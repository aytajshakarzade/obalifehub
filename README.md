# OBA LifeHub

## Run locally

```bash
npm install
npm run dev
```

## GitHub Pages deployment

This repo is configured to deploy the Vite app to GitHub Pages via GitHub Actions.

1. Push to the `work` branch.
2. In GitHub, go to **Settings → Pages** and ensure the source is set to **GitHub Actions**.
3. After the workflow completes, open the published URL (shown in the workflow logs).

The expected Pages URL format is:

```
https://<your-username>.github.io/obalifehub/
```

## Vercel deployment

Vercel requires a SPA rewrite so the app loads correctly on refresh. This repo includes a `vercel.json` rewrite for that.

## If you edited in Bolt and uploaded to GitHub

Bolt exports a **project folder**, not a single file. If you uploaded only a file, GitHub will not have the full app structure.
Make sure your repo includes **these required files/folders**:

- `package.json` (project metadata and scripts)
- `index.html`
- `src/` (your app source code)
- `vite.config.ts` (build config)

**Recommended steps:**

1. Download the project from Bolt as a **ZIP**.
2. Extract it on your computer.
3. Open the folder and confirm the files above exist.
4. Upload the **entire folder** to GitHub (or push with `git push`).
