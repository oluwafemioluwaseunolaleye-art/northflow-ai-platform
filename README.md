# NorthFlow AI Platform

The client dashboard and AI automation web application for **NorthFlow AI**.

> ⚠️ **This is a standalone project.** It is separate from, and does not modify,
> the existing NorthFlow AI marketing website or its repository. This project
> only reuses the NorthFlow AI **design language** (colors, typography, layout
> patterns, components) as a visual reference — it shares no code, assets, or
> deployment with that project.

## Status

🚧 **Early scaffold.** This repository currently contains only the base
project setup (tooling, folder structure, config). No application features
(dashboard, leads, automations, etc.) have been built yet.

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

| Layer              | Choice                                          |
| ------------------- | ------------------------------------------------ |
| Framework           | [Next.js 14](https://nextjs.org/) (App Router)   |
| Language            | TypeScript                                      |
| Styling             | Tailwind CSS                                    |
| Icons               | lucide-react                                    |
| Validation          | Zod                                              |
| Linting/Formatting  | ESLint + Prettier                                |

Database, authentication, AI provider, and email/calendar integrations are
intentionally left unconfigured at this stage — see `.env.example` for the
variables that will be needed once those decisions are made.

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

| Command               | Description                            |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the local development server      |
| `npm run build`        | Build the production bundle             |
| `npm run start`        | Run the production build                |
| `npm run lint`         | Run ESLint                              |
| `npm run format`       | Format the codebase with Prettier       |
| `npm run type-check`   | Run the TypeScript compiler (no emit)   |

## Project Structure

```
northflow-ai-platform/
├── app/                    # Next.js App Router: routes, layouts, pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                  # Reusable primitive UI components
│   ├── layout/               # Layout components (nav, shell, sidebar, etc.)
│   └── dashboard/             # Dashboard-specific components
├── lib/                       # Utilities, helpers, API clients
├── hooks/                     # Custom React hooks
├── types/                     # Shared TypeScript types
├── config/                     # App-level configuration (nav items, constants)
├── public/
│   └── images/                  # Static image assets
├── .env.example
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Design Reference

This project follows the visual identity established on the NorthFlow AI
marketing website (colors, typography, layout concepts, component style,
animations, navigation patterns). Design tokens in `tailwind.config.ts` are
currently placeholders and will be updated to match that identity exactly as
design work proceeds — without any dependency on files from that project.

## Contributing

This is currently a private, early-stage project. Contribution guidelines
will be added once the core application takes shape.

## License

Proprietary — all rights reserved, NorthFlow AI.
