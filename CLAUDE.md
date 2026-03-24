# CLAUDE.md — Prototype Sandbox

> **THIS IS A PROTOTYPE SANDBOX.**
> It does NOT connect to, deploy to, or share any infrastructure with the production `wild-palms` repository.
> Do not add remotes pointing to any `wild-palms` repo. A pre-push git hook enforces this.

---

## Branch Convention

All branches in this repo **must** use the prefix `proto/`.

Examples:
- `proto/homepage-redesign`
- `proto/new-checkout-flow`
- `proto/demo-march-2026`

Do not create branches without this prefix.

---

## What This Repo Is

- A rapid-prototyping and demo sandbox based on the Eulogize client v2 codebase.
- Deployed to Vercel for quick public previews.
- Safe to experiment on — nothing here affects production.
- Remotes: only `git@github.com:Ben-Eulogize/eulogise-proto.git` (personal repo).

---

## What This Repo Is NOT

- Not connected to the `wild-palms` production org or any of its CI/CD pipelines.
- Not a source of truth for any production feature.
- Not monitored by the production observability stack (Bugsnag, CloudWatch).

---

## Project Structure

Lerna monorepo:
```
packages/
  eulogise-client/          # Gatsby 5 frontend
  eulogise-api/             # Lambda handlers
  eulogise-generator/       # PDF/video render service
  eulogise-client-components/ # Shared UI lib
  eulogise-core/            # Shared types + constants
  eulogise-helpers/         # Pure utilities
  eulogise-client-core/
  eulogise-mock/
```

## Common Commands

| Purpose              | Command                         |
| -------------------- | ------------------------------- |
| Install deps         | `yarn installAndBuild`          |
| Start frontend       | `yarn start:ui`                 |
| Start API            | `yarn start:api`                |
| Run unit tests       | `yarn test`                     |
| Deploy to Vercel     | `vercel`                        |

---

_Last reviewed: March 2026_
