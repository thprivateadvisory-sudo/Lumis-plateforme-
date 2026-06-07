# App Store Assets

Place these files here before running `npx capacitor-assets generate` :

## Required files

- `icon.png` — 1024×1024px, fond #05060a, logo Cohesif centré (PNG, pas de transparence pour iOS)
- `splash.png` — 2732×2732px, fond #05060a, logo centré

## Generate all sizes automatically

```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

This generates all required icon/splash sizes for both iOS and Android automatically.
