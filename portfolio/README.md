# Anish Thota — Backend Software Engineer Portfolio

Precision dark-first engineering portfolio with zero build step (`0` npm dependencies, native CSS + GSAP ScrollTrigger + interactive HTML5 canvas schematic) ready for free deployment on Vercel.

## Local Preview

Double-click `index.html`, or run a local server:

```bash
python3 -m http.server 3000 --directory /Users/anishthota/Documents/Resumes/portfolio
```

Then visit `http://localhost:3000`.

## Deploy to Vercel (Free Hobby Tier)

### Option A — 30-Second CLI Deploy
From inside this `portfolio/` folder:

```bash
npx vercel --prod
```

*(Accept the defaults: Framework Preset = `Other`, Output Directory = `.`)*

### Option B — GitHub Auto-Deploy (Recommended)
1. Initialize git inside `/Users/anishthota/Documents/Resumes/portfolio` and push to a new repo (e.g., `github.com/Anish6964/portfolio`):
   ```bash
   cd /Users/anishthota/Documents/Resumes/portfolio
   git init
   git add .
   git commit -m "Initial backend portfolio"
   git branch -M main
   git remote add origin https://github.com/Anish6964/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import `Anish6964/portfolio`, leave Build Command empty, and click **Deploy**.

## Resume Asset
`./resumes/Anish_Thota_Resume.pdf` contains your Backend Software Engineer resume. If you want a public copy without your phone number in the PDF header, recompile from `../tex/Anish_Thota_Main_Resume.tex` without the `tel:` line and replace `./resumes/Anish_Thota_Resume.pdf`.
