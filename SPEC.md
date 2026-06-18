# SPEC — Portfolio v2 (multi-route, minimal-monochrome)

## Goal

Rebuild the single-file static portfolio into a multi-route Next.js app that adds
**Services, Portfolio, About, and Contact** routes plus a first-load progress-bar
animation — while preserving the existing identity exactly: pure-black background,
JetBrains Mono, and the current muted-gray color palette. New sections borrow their
*structure and content* from `hamzayaseen.com`; they borrow **none** of its bold/colored
visual styling (the look stays in the minimal `mateega.com`/current-site monochrome skin).

---

## Stack & rationale

- **Next.js (App Router) + TypeScript** — real routing for `/services`, `/portfolio`,
  `/about`, `/contact`; native on the existing Vercel project; matches the owner's default stack.
  *Alternative considered:* stay vanilla multi-file (rejected — hand-rolled routing + motion
  + a real contact form gets unmaintainable); Astro (rejected — the contact Server Action and
  app-like interactivity are first-class in Next.js and the owner already works in it).
- **Tailwind v4** — styling via design tokens that encode the existing palette; keeps the
  monochrome system enforceable. *Alternative:* plain CSS modules (rejected — tokens + variants
  are cleaner for a design system this strict).
- **Motion (`motion`, the successor to framer-motion)** — route transitions and the loader.
  *Alternative:* CSS-only (rejected — choreographed enter/exit across routes is far simpler in Motion).
- **Resend + Server Action** for the contact form. *Alternative:* Formspree (rejected — third
  party holds submissions, free-tier caps); `mailto:` (rejected — clunky, depends on visitor mail client).
- **pnpm**, **Vitest** (if any unit tests are added), deploy on the existing Vercel project `about-me`.

---

## Design tokens (carried over verbatim — do not change)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0a` | page background |
| `--fg-bright` | `#e4e4e7` | headings, name, emphasized keywords |
| `--fg-body` | `#3f3f47` | body copy, default nav |
| `--fg-hover` | `#71717a` | hover state for links/nav |
| font | `"JetBrains Mono", ui-monospace, …` | everything |

Type scale, letter-spacing, and the `[ label ]` nav convention match the current `index.html`.
**No** accent colors, gradients, colored pills, badges, or photos anywhere.

---

## Routes & content

| Route | Source of structure | Content |
|---|---|---|
| `/` (home) | current site | Keep current home copy (name, tagline, GitHub/LinkedIn/email links) ported as-is. |
| `/services` | Hamza "Solution we provide." | Heading + sub, then a **monochrome list** of service line-items with thin dividers (NOT colored pills). Items provided by owner; seed from CLAUDE.md stack (agentic AI, full-stack, native iOS). |
| `/portfolio` | (new) | Intro paragraph + a minimal list of **real GitHub repo links** (owner provides name / one-liner / URL). Rendered like Mateega's "Past" list. |
| `/about` | current `#about` + Hamza structure | Keep existing **Now / Interests / Background** text-only sections. No photo, no stats row. |
| `/contact` | Hamza "Let's Talk" | Heading, email link, "I'm interested in…" selectable chips (monochrome outline), and a **Request a Quote** form. Budget tiers reflect the owner's real **$2K–$10K+** range, not Hamza's figures. |

Real copy for services / interest chips / portfolio repos is supplied by the owner at
implementation time; seed with the existing about-content and sensible placeholders, flagged with `TODO(content)`.

---

## Files & interfaces (by path)

```
app/
  layout.tsx           # <html>/<body>, JetBrains Mono via next/font, fixed bottom <Nav/>, <Loader/>
  globals.css          # Tailwind v4 + design tokens as CSS vars (table above)
  page.tsx             # home — ported current home block
  services/page.tsx
  portfolio/page.tsx
  about/page.tsx
  contact/page.tsx     # renders <ContactForm/>
  contact/actions.ts   # 'use server' submitContact(formData) -> zod validate -> Resend send
components/
  Nav.tsx              # fixed bottom nav; route-aware ([ home ] on subpages); external links
  Loader.tsx           # 'use client'; sessionStorage-gated; 0→100% counter + progress bar
  Reveal.tsx           # 'use client'; runs the 4.5s slow-emerge ONCE after loader (home only)
  PageTransition.tsx   # 'use client'; Motion fade/slide between routes
  ContactForm.tsx      # 'use client'; interest chips + budget tiers + fields; calls submitContact
lib/
  resend.ts            # Resend client from RESEND_API_KEY
  contact-schema.ts    # zod schema shared by client hints + server action
package.json, tsconfig.json, next.config.ts, postcss.config.mjs, tailwind/ (v4 config)
```

**Removed:** `index.html`, `Sheharyar Ahmed - Portfolio.html` (the static site is fully replaced).
The duplicate is already `git rm`'d this session; remove `index.html` in the same migration commit.

### Key interfaces

```ts
// lib/contact-schema.ts
export const contactSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  description: z.string().min(1),
  interests: z.array(z.string()).default([]),
  budget: z.enum(['<$2k', '$2k–$5k', '$5k–$10k', '$10k+']).optional(),
  website: z.string().max(0).optional(), // honeypot — must be empty
})

// app/contact/actions.ts
'use server'
export async function submitContact(
  prev: ContactState, formData: FormData
): Promise<ContactState> // { ok: boolean; error?: string; fieldErrors?: ... }
```

### Loader behavior
- First visit of a browser **session** only (gate on `sessionStorage`); skipped on subsequent
  navigations and same-session refreshes.
- 0→100% numeric counter + a thin filling bar in the existing palette, then hands off to
  `Reveal` (the 4.5s slow-emerge) on the home route. Route-to-route uses `PageTransition` (fast).
- Respects `prefers-reduced-motion`: loader resolves instantly, no slow-emerge.

---

## Environment / config

- `RESEND_API_KEY` — Resend API key (added to Vercel project env, all environments).
- `CONTACT_TO_EMAIL` — destination inbox (defaults to `sheryahmedme1@gmail.com`).
- `CONTACT_FROM_EMAIL` — verified Resend sender; until a domain is verified, use Resend's
  onboarding sender. If `RESEND_API_KEY` is unset, the action returns a graceful error (no crash).
- Vercel project `about-me` (prj_0eH3kzgHDcX2opQJIuxa7E2bgJzq) auto-detects Next.js — no `vercel.json` needed.

---

## Out of scope

- Hamza's visual styling: colored service pills, blue accent labels, gradient email,
  "Top Rated Plus" badge, circular photo, floating robot avatar, rotating text badge.
- Fabricated stats (150+ projects / 8+ yrs / 100+ clients) — **excluded**; no invented numbers.
- The PKT "Geographic Breakdown" screenshot — research note, **not** a design input.
- Blog/writing route, CMS, dark/light toggle, i18n, analytics — not this pass.
- Auto-pulling repos from the GitHub API (owner supplies the curated list instead).
- A custom domain change (keep `sheharyar-ahmed.vercel.app`).

---

## Verification (end-to-end, must all pass)

```bash
pnpm install
pnpm typecheck          # tsc --noEmit — no type errors
pnpm lint               # next lint — clean
pnpm build              # production build succeeds (all 5 routes compiled)
pnpm start &            # serve the production build
# 1. every route returns 200 and contains its heading:
for r in "" services portfolio about contact; do
  curl -fsS "http://localhost:3000/$r" | grep -qi "$r\|SHEHARYAR" && echo "OK /$r" || echo "FAIL /$r"
done
```

Manual checks (record evidence — screenshots/notes):
1. First load in a fresh session shows the 0→100% loader + bar, then the home slow-emerge; a
   second navigation within the session does **not** replay the loader.
2. All five routes render in pure-black monochrome JetBrains Mono — no accent colors anywhere.
3. Bottom nav switches routes with a Motion transition; subpages show `[ home ]`.
4. Contact form: empty submit shows zod field errors; valid submit with `RESEND_API_KEY` set
   delivers an email to `CONTACT_TO_EMAIL`; with the key unset, the form shows a graceful error,
   no unhandled exception.
5. `prefers-reduced-motion: reduce` disables loader/slow-emerge; content is immediately visible.

Definition of done: `pnpm build` is green, all five routes serve in the monochrome skin, the
loader fires once per session, and a real contact submission lands in the inbox.

---

## Implementation note

Start a **fresh session** to implement against this SPEC.md. First task in that session:
scaffold the Next.js app and port the home route, then add routes one at a time, verifying
`pnpm build` stays green after each.
