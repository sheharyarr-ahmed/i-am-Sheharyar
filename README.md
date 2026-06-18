# i-am-Sheharyar

Personal portfolio for **Sheharyar Ahmed** — a minimal, monochrome multi-route site.

## About

A dark, typographic portfolio: pure-black background, JetBrains Mono, a muted-gray
palette, a first-load progress-bar loader, and a slow-emerge reveal on the home route.
No accent colors, gradients, badges, or photos.

**Stack**

- Next.js (App Router) + TypeScript
- Tailwind v4 (design tokens encode the palette)
- Motion — first-load loader + route transitions
- Resend + a Server Action for the contact form
- JetBrains Mono via `next/font`
- pnpm

## Routes

| Route        | Content                                                      |
| ------------ | ----------------------------------------------------------- |
| `/`          | Name, tagline, GitHub/LinkedIn/email — with the slow-emerge |
| `/services`  | Monochrome list of service line-items                       |
| `/portfolio` | Intro + curated GitHub repo links                           |
| `/about`     | Now / Interests / Background                                 |
| `/contact`   | Email, interest chips, budget tiers, Request-a-Quote form   |

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Verify

```bash
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm build        # production build (all 5 routes)
pnpm start        # serve the production build
```

## Environment

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — Resend API key (contact form email). Unset → the form shows a
  graceful error instead of crashing.
- `CONTACT_TO_EMAIL` — destination inbox (default `sheryahmedme1@gmail.com`).
- `CONTACT_FROM_EMAIL` — verified Resend sender (default `onboarding@resend.dev`
  until a domain is verified).

## Links

- GitHub: [sheharyarr-ahmed](https://github.com/sheharyarr-ahmed)
- LinkedIn: [sheharyar-ahmed](https://www.linkedin.com/in/sheharyar-ahmed-89598b226/)
- Upwork: [sherylabs](https://www.upwork.com/freelancers/sherylabs)
- Email: sheryahmedme1@gmail.com
