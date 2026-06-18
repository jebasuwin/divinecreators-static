# Growthora Digital

A production-ready, multi-page digital marketing agency website built with React, Vite, Bootstrap 5 and React Router.

## Project Overview

Growthora Digital is a modern, SEO-friendly static website for a digital marketing agency offering SEO, social media marketing, paid advertising, content marketing, web development, and specialized solutions for local businesses, e-commerce, personal branding and video marketing.

**Brand:** Growthora Digital  
**Tagline:** Strategy. Creativity. Measurable Growth.

## Technology Stack

- React.js
- Vite
- React Router DOM
- Bootstrap 5
- Bootstrap Icons
- react-helmet-async
- HTML5, CSS3, JavaScript

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL shown in the terminal (typically `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

## Folder Structure

```text
growthora-digital/
├── public/              # Static assets, robots.txt, sitemap, redirects
├── src/
│   ├── components/      # Reusable UI components
│   ├── config/          # Form integration configuration
│   ├── data/            # Business info, services, solutions, navigation
│   ├── pages/           # Route-level page components
│   ├── styles/          # Custom CSS system
│   ├── utils/           # Form validation, schema helpers
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vercel.json
└── package.json
```

## How to Change Business Details

Edit `src/data/businessInfo.js`:

- Brand name, tagline, email, phone, WhatsApp, location
- Social media links
- Working hours

All components read from this single configuration file.

## How to Change Colours

Edit CSS variables in `src/styles/variables.css`:

- Primary gradient and brand colours
- Typography, spacing and shadow tokens

## How to Replace Images

Service and solution pages use placeholder illustration areas. Replace them by:

1. Adding images to `src/assets/images/`
2. Importing and using them in the relevant page components
3. Updating `alt` text for accessibility

The hero section uses a CSS-built dashboard visual and does not require stock images.

## How to Connect the Contact Form

The form currently simulates submission. To connect a real provider:

1. Open `src/config/formIntegration.js`
2. Choose `emailjs`, `formspree`, or `web3forms`
3. Add your credentials (never commit secret keys to public repos)
4. Uncomment the matching block in `src/utils/contactForm.js`

## How to Change the Production Domain

Edit `src/data/seoConfig.js`:

```js
export const siteUrl = "https://www.yourdomain.com";
```

Also update:

- `public/robots.txt`
- `public/sitemap.xml`

## Deployment

### SPA Rewrite Requirement

This is a single-page application using React Router. All routes must fall back to `index.html` so client-side routing works on refresh and direct URL access.

### Netlify

`public/_redirects` is included:

```text
/* /index.html 200
```

Deploy the `dist` folder after running `npm run build`.

### Vercel

`vercel.json` is included with rewrite rules. Connect your repository and deploy.

### AWS S3 + CloudFront

1. Run `npm run build`
2. Upload the `dist` folder to an S3 bucket configured for static hosting
3. Create a CloudFront distribution pointing to the bucket
4. Configure custom error responses: return `/index.html` with HTTP 200 for 403/404 errors (SPA fallback)

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/solutions` | Solutions |
| `/contact` | Contact |
| `*` | 404 Not Found |

## License

Private project for Growthora Digital.
