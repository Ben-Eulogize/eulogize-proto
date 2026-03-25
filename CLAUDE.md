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
- Deployed to **AWS** (S3 + CloudFront) at `proto.app.eulogizememorials.com`.
- Has its own API stack (`eulogise-api-proto`) with isolated DynamoDB tables.
- Safe to experiment on — nothing here affects production or staging.
- Remote: only `git@github.com:Ben-Eulogize/eulogise-proto.git` (personal repo).

---

## What This Repo Is NOT

- Not connected to the `wild-palms` production org or any of its CI/CD pipelines.
- Not a source of truth for any production feature.
- Not monitored by the production observability stack (Bugsnag disabled).

---

## Safety Boundaries

### Git Safety

- **Pre-push hook** blocks any push to remotes containing `wild-palms`.
- `git push.default = current` to prevent accidental pushes to wrong branches.
- `.env.proto` is gitignored — secrets are in AWS SSM only.

### AWS Resource Isolation

| Resource              | Proto                                 | Staging                             | Isolated?            |
| --------------------- | ------------------------------------- | ----------------------------------- | -------------------- |
| API Gateway           | `k2xrwkgphe...amazonaws.com/proto`    | `staging.api.eulogisememorials.com` | Yes                  |
| WebSocket             | `v588hwzntk...amazonaws.com/proto`    | `ws-staging.api...`                 | Yes                  |
| CloudFormation        | `eulogise-api-proto`                  | `eulogise-api-staging`              | Yes                  |
| DynamoDB              | `proto-*` tables                      | `stagingV2-*` tables                | Yes                  |
| S3 media              | `staging.media.eulogisememorials.com` | Same                                | Shared (read-mostly) |
| CloudFront (frontend) | `E2EUKRCNVOST9G`                      | Separate                            | Yes                  |
| Redis                 | Staging ElastiCache                   | Same                                | Shared (cache only)  |

### Email Safety

- `LIFECYCLE_EMAIL_DOMAIN_WHITELIST=wildpalms.com.au` — only processes test domain users.
- Lifecycle email Lambda only runs against `proto-*` DynamoDB tables.
- Empty SendGrid template IDs mean no emails are actually sent until templates are created.

---

## Project Structure

Lerna monorepo:

```
packages/
  eulogise-client/              # Gatsby 5 frontend
  eulogise-api/                 # Lambda handlers
  eulogise-generator/           # PDF/video render service
  eulogise-client-components/   # Shared UI lib
  eulogise-core/                # Shared types + constants
  eulogise-helpers/             # Pure utilities
  eulogise-client-core/
  eulogise-mock/
```

## Common Commands

| Purpose                  | Command                        |
| ------------------------ | ------------------------------ |
| Install deps + build     | `yarn installAndBuild`         |
| Deploy frontend to proto | `bash scripts/deploy-proto.sh` |
| Deploy API to proto      | See API deploy section below   |
| Start frontend locally   | `yarn start:ui`                |
| Start API locally        | `yarn start:api`               |
| Run unit tests           | `yarn test`                    |

### API Deploy (proto)

```bash
cd packages/eulogise-api
AWS_PROFILE=$EULOGIZE_AWS_PROFILE NODE_OPTIONS=--max-old-space-size=9216 \
  node_modules/.bin/env-cmd -f environments/.env.proto \
  node_modules/.bin/serverless deploy --stage proto --verbose
```

Note: `.env.proto` is gitignored. Create it from SSM:

```bash
cd packages/eulogise-api
AWS_REGION=ap-southeast-2 node scripts/load-ssm-env.js --env proto --path /eulogise/api/proto
```

---

## Merge Path to Staging

When feature code is demo-ready and approved:

### Files to include in PR (feature code only)

- `packages/eulogise-api/src/ts/functions/lifecycle/` (entire directory)
- `packages/eulogise-api/src/ts/functions/handler/processes/lifecycleEmail.ts`
- `packages/eulogise-api/scripts/runLifecycleEmails.ts`
- `packages/eulogise-api/src/ts/database/model/user.ts`
- `packages/eulogise-api/src/ts/database/types/UserModel.types.ts`
- `packages/eulogise-api/src/ts/functions/controller/account.ts`
- `packages/eulogise-api/src/ts/utils/SendGridHelper.ts`
- `packages/eulogise-api/serverless.yml` (new Lambda + scoped env vars)
- `packages/eulogise-api/environments/.env.example`
- `packages/eulogise-api/package.json`

### Files to NEVER include (proto-only)

- `vercel.json`, `.vercel/`
- `scripts/deploy-proto.sh`
- `packages/eulogise-api/environments/.env.proto`
- `.husky/pre-push` (the wild-palms block guard)
- `.nvmrc`

### PR process

1. On wild-palms: `git checkout develop && git checkout -b feat/lifecycle-email-engine`
2. Apply only the feature files listed above
3. `yarn installAndBuild && yarn test`
4. Open PR against `develop` with architecture docs and test plan
5. CI/CD (AWS CodeBuild) validates the build
6. Merge to develop, then promote via the normal staging pipeline

---

## Syncing from Wild-Palms (manual, one-way)

To pull latest changes from the wild-palms local repo:

```bash
git fetch /Users/ben/Projects/eulogise-client-v2 feat/lifecycle-email-engine
git merge FETCH_HEAD --no-ff --allow-unrelated-histories -m "chore: sync from wild-palms"
```

---

_Last reviewed: 25 March 2026_
