# Bhavesh Joshi — Portfolio

Run it:  `npm install`  then  `npm run dev`   |  production build: `npm run build` (output in `dist/`), preview it with `npm run preview`.

## Fill these in (src/data.js) — they are still placeholders
- `formEndpoint` (Formspree / Web3Forms URL) so the contact form sends messages directly instead of opening the email app
- Project `live` / `github` links: the buttons appear automatically once a link is filled in (empty ones are hidden)

## Where files live
- `public/` is what gets published: `profile.webp`, `Bhavesh-resume.pdf`, `projects/*.webp`, `logo.svg`
- `_originals/` keeps your original full-size images; it is not part of the site, you can delete it

## What was fixed / improved
- Images and resume were outside `public/`, so they worked in `npm run dev` but were missing from the production build. Moved to `public/`, paths fixed, images converted to WebP (about 4.4 MB down to about 0.3 MB)
- Phones: the page was laid out wider than the screen (hidden screen-reader text in the Stack Map table and the 3D canvas stretched it). Fixed, verified no sideways overflow from 320 px to 1920 px
- Mobile menu: 44 px tap targets, closes on link tap and Escape; bigger tap targets on tabs, buttons, footer links
- Phone timeline is now a vertical list; the horizontal one stays on larger screens
- Removed visitor-facing developer notes and disabled "coming soon" buttons; they return only in dev mode
- Smoother on phones: lighter background effects, throttled scroll handlers, lower canvas resolution that drops further on weak devices, 3D canvas never blocks page scrolling
- Hover polish: card shadow glow, social icon motion, tab lift; matching tap feedback on touch screens
- Removed unused files (Galaxy.jsx, Background.jsx), project screenshots now fit a 2:1 frame with less cropping

## Adding certificates
Open `src/data.js`, find `certificates`, and add one line per certificate (a template is in the comment). Put the certificate picture in `public/certificates/` (a WebP or JPG about 1400 px wide keeps the page fast) and point `image` at it. The Mamo Technolabs course has no picture yet: save it as `public/certificates/mamo-technolabs.webp` and add `image: '/certificates/mamo-technolabs.webp'` to its line. While the list is empty the Certificates section and its menu link stay hidden.
