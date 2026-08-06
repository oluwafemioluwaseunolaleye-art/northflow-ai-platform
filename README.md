# NorthFlow AI Platform

The client dashboard and AI automation web application for **NorthFlow AI**.

> ⚠️ **This is a standalone project.** It is separate from, and does not modify,
> the existing NorthFlow AI marketing website or its repository. This project
> only reuses the NorthFlow AI **design language** (colors, typography, layout
> patterns, components) as a visual reference — it shares no code, assets, or
> deployment with that project.

## Status

✅ **Public marketing site built.** Full routing architecture, design
system, and the public-facing homepage (hero, problem, solutions, workflow
visualization, interactive demo, chat demo, how it works, integrations,
industries, why us, founder, CTA) are live. The CTA links to the live Tally
intake flow.

🚧 **Dashboard is placeholder-only.** Auth, leads, automations,
appointments, analytics, integrations, settings, and profile pages exist as
routed placeholders — no backend logic yet.

## Planned Features

- Dashboard — overview of activity, KPIs, and account health
- Leads — capture, view, and manage inbound leads
- AI Qualification — automated lead scoring and qualification
- Automations — configurable automation workflows
- Email Workflows — sequence-based email automation
- Appointments — scheduling and booking management
- Analytics — reporting on leads, conversions, and automation performance
- Integrations — connections to CRMs, calendars, and email providers
- Settings — account, team, and workspace configuration
- Authentication — secure sign-in and session management
- Client Management — manage client accounts and their data

## Tech Stack

| Layer            | Choice                                   |
| ----------------- | ----------------------------------------- |
| Framework          | [Next.js 14](https://nextjs.org/) (App Router) |
| Language           | TypeScript                               |
| Styling            | Tailwind CSS                             |
| Motion             | Framer Motion                            |
| Backend            | Supabase (Postgres, auth)                |
| Icons              | lucide-react                             |
| Validation         | Zod                                       |
| Linting/Formatting | ESLint + Prettier                        |

The primary CTA ("Book a Free AI Audit") routes to the live Tally intake
form — configured via `NEXT_PUBLIC_TALLY_URL` in `.env.example` /
`lib/constants.ts`.

## Getting Started

### Prerequisites

- Node.js `>=18.18.0`
- npm (or your preferred package manager)

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables and fill in real values
cp .env.example .env.local

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command              | Description                          |
| --------------------- | ------------------------------------- |
| `npm run dev`         | Start the local development server    |
| `npm run build`       | Build the production bundle           |
| `npm run start`       | Run the production build              |
| `npm run lint`        | Run ESLint                            |
| `npm run format`      | Format the codebase with Prettier     |
| `npm run type-check`  | Run the TypeScript compiler (no emit) |

## Project Structure

```
northflow-ai-platform/
├── app/
│   ├── (marketing)/        # Public site: /, /solutions, /how-it-works, /demo, /industries, /about
│   ├── (auth)/             # /login, /signup
│   ├── dashboard/          # /dashboard and all sub-routes
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Design tokens (CSS variables) + Tailwind
├── components/
│   ├── ui/                 # Button, Card, Container, Section, Eyebrow
│   ├── navigation/          # Marketing navbar/footer, dashboard sidebar/topbar/mobile nav
│   ├── marketing/            # Homepage sections (Hero, WorkflowVisualization, ChatDemo, ...)
│   ├── dashboard/             # Dashboard shell components
│   └── {leads,automations,analytics,appointments,integrations}/  # Feature components (not yet built)
├── lib/
│   ├── supabase/            # Browser + server Supabase clients
│   ├── constants.ts          # Nav items, primary CTA / Tally URL
│   └── utils.ts               # cn() class helper
├── hooks/                    # Custom React hooks (useMediaQuery, ...)
├── types/                    # Shared TypeScript types
├── utils/                    # Framework-free helpers (formatting, etc.)
├── styles/                   # Shared Framer Motion variants
├── supabase/                 # SQL migrations (schema not yet defined)
├── config/                   # Reserved for app-level config
├── public/images/            # Static image assets
├── .env.example
├── tailwind.config.ts        # NorthFlow color palette + type scale
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Design Reference

The application follows the NorthFlow AI visual identity: Midnight, Deep
Navy, Royal Navy, Luxury Gold, Light Gold, White, and Off White — defined as
CSS variables in `app/globals.css` and Tailwind tokens in
`tailwind.config.ts`. Marketing sections default to the dark navy/midnight
treatment; the dashboard uses a light off-white surface with a dark navy
sidebar. A single gold hairline (`.gold-rule`) is used sparingly as the
recurring luxury motif. All colors are defined once and consumed everywhere
— no page hardcodes its own palette.

## Contributing

This is currently a private, early-stage project. Contribution guidelines
will be added once the core application takes shape.

## License

Proprietary — all rights reserved, NorthFlow AI.
