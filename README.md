# Eulogise MonoRepo

This repo consist of

- @eulogise/core - share core types and Eulogise Themes
- @eulogise/client-core-components - Eulogise Frontend components. Used by @eulogise/client an @eulogise/generator
- @eulogise/client-core - Eulogise Frontend core - define frontend breakpoints, style and shared frontend constants
- @eulogise/core - Eulogise core - used by all our modules (API, generator and frontend) define themes, fonts and share constants
- @eulogise/client - Eulogise Frontend
- @eulogise/api - Eulogise API
- @eulogise/generator - Eulogise Generator
- @eulogise/helpers - Eulogise Helpers
- @eulogise/mock - Eulogise Mock
- @eulogise/script - Eulogise backend script

# Setup Local Environment

```
    yarn installAndBuild
    yarn start
```

# Run Unit Test

```
    yarn test
```

# SSM Environment (eulogise-client)

Use these scripts to push stage `.env` files into SSM and load them back into a generated file. Each stage file is self-contained (the base `.env` is deprecated). Generated env files are `.env.<stage>` (no `.ssm` suffix). See `.env.example` for a template.

Push `.env.<stage>` to SSM (skips empty values by default):

```
    yarn workspace @eulogise/client ssm:push:test-eng-1
```

Load SSM values into `.env.<env>`:

```
    yarn workspace @eulogise/client ssm:env:test-eng-1
```

Notes:

- `push-ssm-env.js` supports `--skip-empty` (default) and `--fail-on-empty`.
- `push-ssm-env.js` also supports `--request-delay-ms`, `--max-retries`, and `--retry-base-ms` to handle SSM throttling.
- `ssm:push:*` scripts set `AWS_REGION` inline (`us-east-2` for `production-us`, `ap-southeast-2` for others).
- Secure keys are centralized in `packages/eulogise-client/scripts/ssm-push-stage.js`.
- Example template: `packages/eulogise-client/environments/.env.example`.

Push all stages (limited list in the helper):

```
    yarn workspace @eulogise/client ssm:push:all
```

Load all stages from SSM:

```
    yarn workspace @eulogise/client ssm:env:all
```

Stages included in `ssm:push:all`:

- development
- local
- e2e
- staging
- test-eng-1
- test-eng-2
- test.local
- production-us

# SSM Environment (eulogise-api)

Push/load API stage `.env` files into SSM and generate `.env.<stage>` for deploys.

```
    yarn workspace @eulogise/api ssm:push:test-eng-1
    yarn workspace @eulogise/api ssm:env:test-eng-1
```

Push all API stages:

```
    yarn workspace @eulogise/api ssm:push:all
```

Load all API stages from SSM:

```
    yarn workspace @eulogise/api ssm:env:all
```

Stages included in `ssm:push:all`:

- development (uses `environments/.env.dev.remote`)
- dev.local
- dev.remote
- staging
- test-eng-1
- test-eng-2
- test.local
- production-us

Notes:

- Secure keys are centralized in `packages/eulogise-api/scripts/ssm-push-stage.js`.
- API deploy/package scripts use `.env.<stage>` (generated from SSM).
- Pipelines only read from SSM. After changing any `.env.<stage>` file, run `ssm:push:<stage>` (or `ssm:push:all`) to update SSM before deploying.
- Example template: `packages/eulogise-api/environments/.env.example`.

# SSM Environment (eulogise-generator)

Push/load generator stage `.env` files into SSM and generate `.env.<stage>` for deploys.

```
    yarn workspace @eulogise/generator ssm:push:test-eng-1
    yarn workspace @eulogise/generator ssm:env:test-eng-1
```

Push all generator stages:

```
    yarn workspace @eulogise/generator ssm:push:all
```

Load all generator stages from SSM:

```
    yarn workspace @eulogise/generator ssm:env:all
```

Stages included in `ssm:push:all`:

- local
- staging
- test-eng-1
- test-eng-2
- test.local
- production-us

Notes:

- Secure keys are centralized in `packages/eulogise-generator/scripts/ssm-push-stage.js`.
- Pipelines only read from SSM. After changing any `.env.<stage>` file, run `ssm:push:<stage>` (or `ssm:push:all`) to update SSM before deploying.
- Example template: `packages/eulogise-generator/environments/.env.example`.

# SSM Helpers (root)

Run SSM load/push for all three workspaces:

```
    yarn ssm:env:all
    yarn ssm:push:all
```

# Run Cypress Test Locally

1. Setup & Start DynamoDB

```
    # Start your local DynamoDB
    <project directory># yarn start:db:local

    # Import Seed data to your local DynamoDB
    <project directory># yarn start:db:seed:local
```

2. Start your local api (point to your local DynamoDB)

```
    <project directory># yarn start:api:local
```

3. Start your frontend (point to your local api)

```
    <project directory># yarn start:ui:local
```

4. Run Cypress Test

```
    # Run all your cypress test
    <project directory># yarn test:e2e:local:headless

    #### Or

    # Debug a single cypress test file
    <project directory># yarn test:e2e:local
```

# Update AWS Layer

sharp (x86_64 version)

- download from https://github.com/pH200/sharp-layer/releases and then upload manually to aws layer

Chromium (Puppeeteer) - e.g. chromium-v123.0.1-layer.zip

- download the x64 version of Chromium from https://github.com/Sparticuz/chromium/releases and then upload manually to aws layer
- then upload the zip file to s3 bucket s3://eulogise-layers (for us) and s3://eulogize-layers-ap-southeast-2 (for sydney)
- then update EULOGIZE_CHROMIUM_LAYER in your .env files

AWS VPC Setup (Route Table, Internet Gateway, NAT Gateway, Subnet, Security Group)
https://www.youtube.com/watch?v=26hx-egrMLw
