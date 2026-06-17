# Mendouksai — Portfolio

A cyberpunk-styled personal portfolio for **Mendouksai**, a Web3 gaming creator (1.2M+ views) and autonomous AI developer. Static HTML/CSS/JS — no build step.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, masterplan, stats, contact form |
| Creator | `web3-creator.html` | Creator journey + 3D coverflow tweet slider |
| Developer | `developer.html` | Technical write-up + production builds grid |
| Contact | `contact.html` | Social channels (X, Telegram, Email, Discord) |

## Stack

- Plain HTML, CSS (`css/styles.css`), and vanilla JS (`js/script.js`)
- Google Fonts: [Outfit](https://fonts.google.com/specimen/Outfit)
- Web Audio API for UI sound effects (toggle bottom-left)
- No dependencies, no bundler

## Run locally

Any static file server works, e.g.:

```bash
npx http-server . -p 5195 -c-1
# then open http://localhost:5195
```

## Deploy

Deployed on Vercel at `https://mendouksai.vercel.app`. Canonical/Open Graph
URLs in each HTML `<head>` point there — update them if the domain changes.

## Design tokens

Defined in `css/styles.css` `:root`:

- `--accent-primary` `#b026ff` (electric purple)
- `--cyan` / `--accent-secondary` `#00f0ff` (cyan)
- `--bg-color` `#0c0c0c`

Respects `prefers-reduced-motion` for accessibility.
