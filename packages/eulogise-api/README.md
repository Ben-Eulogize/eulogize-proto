# ⚰️ Eulogise API

## Authors

- [Brod](mailto:brod@dotdev.com.au) Typescript Developer
- [Stephen](mailto:stephen@wildpalms.com.au) Full-stack Developer
- [Eric](mailto:kakchan@gmail.com) Full-stack Developer

## Stack

- [Node 8](https://nodejs.org/en)
- [Typescript 3](https://typescriptlang.org)
- [Webpack 4](https://webpack.js.org)
- [Dynamodb](https://aws.amazon.com/dynamodb) & [Dynamoose](https://dynamoosejs.com)
- [AWS Lambda](https://aws.amazon.com/lambda) & [Serverless](https://serverless.com)

## Notable Libraries

- [jsonwebtoken](https://npmjs.com/package/jsonwebtoken)
- [cookie](https://npmjs.com/package/cookie)
- [uuid](https://npmjs.com/package/uuid)
- [lambdur](https://npmjs.com/package/lambdur)
- [dynamoose](https://npmjs.com/package/dynamoose)

## Development

### Quick Start

Start your API locally

```
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Install node js via NVM
nvm install v18.20.2

# Intall all packages
yarn

# Setup DynamoDB
After all the packages are installed, you should have dynamoDB-local

~/.aws/credentials and ~/.aws/config need to match the following `.env.dev.local` variables
XAWS_DYNAMO_DB_REGION=localhost
XAWS_ACCESS_KEY=fakeMyKeyId
XAWS_SECRET_KEY=fakeSecretAccessKey

1. Update your ~/.aws/credentials to include
[default]
aws_access_key_id = fakeMyKeyId
aws_secret_access_key = fakeSecretAccessKey

2. Update your ~/.aws/config
[default]
region = localhost

3. Start your DynamoDB locally, please run
yarn db:start:local

# Run DB Seed file
To setup your seed data, please run
yarn seed:data

# Start your API and run locally
yarn start:local

# Start your UI using your local api
In your eulogise-client folder, update "GATSBY_EULOGISE_API_URL" in your `.env.development` to use your local api and then
yarn start:ui

Now you can use user's data from `users.seed.ts` to log in and all the password is `123123`
```

#### Lang & Tools

- [Install Node & NPM](https://nodejs.org/en/download/package-manager)
- [Install Yarn](https://yarnpkg.com/lang/en/docs/install)

## Overview

All code is written in Typescript and strictly typed, this README is intended to be sparse and non-technical, all references and interfaces can be easily found within the codebase.

The API Service is exposed as a `https` server and provides a JSONRPC inspired interface which can easily be extended to support really neat features like compound requests. Those who are familiar with REST (or it's many derivatives) might find this architecture _strange_ or even _offensive_ and definitely not _OOP_ enough - it's completely natural to feel this way and simply the first of [five stages of grief](https://en.wikipedia.org/wiki/K%C3%BCbler-Ross_model).

#### Git Flow

| Purpose     | Branch              |
| :---------- | :------------------ |
| Hot Fixes   | `hot-fix/<name>`    |
| Features    | `feature/<name>`    |
| Development | `develop`           |
| Staging     | `release/<version>` |
| Production  | `master`            |

#### Networking

Update your hosts file to route traffic from `api.eulogise.local` to `127.0.0.1`

```sh
127.0.0.1   api.eulogise.local
```

The API Service is started with `serverless-offline`, supports `https` only and runs on port `5000`.

#### Integration & Contract Testing

In order to run the integration and contract test,
you will need to start up your local environment before running `yarn test`, `yarn test:integration` or `yarn test:contract`

#### Pattern

The API follows a `transport | controller | model` pattern which _should_ help with access management, data integrity, error visibility and more.

As an example, here is a _*resource find*_ request for the `case` resource:

1. Client requests `/resource/find`.
2. Request is received by `transport` layer [`/src/ts/functions/handler/resource/find.ts`](src/ts/functions/handler/resource/find.ts).
3. Request is abstracted to `account` interface and a `query` interface.
4. Abstracted request is used by `control` layer [`/src/ts/functions/controller/resource/case.ts`](src/ts/functions/controller/resource/case.ts) to perform `find` method.
5. `control` layer interacts with `model` layer.
6. Result is then returned to `transport` layer where it is returned to the Client.

In addition, the file structure of controllers, models, handlers and uri structure of transports is determined by an entity heirarchy which should help to speed up developer visibility.

#### Routes

| Title                        | Endpoint                       | Codepath                                                                                                              |
| :--------------------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Resource Find                | `/resource/find`               | [`/src/ts/functions/handler/resource/find.ts`](src/ts/functions/handler/resource/find.ts)                             |
| Resource Save                | `/resource/save`               | [`/src/ts/functions/handler/resource/save.ts`](src/ts/functions/handler/resource/save.ts)                             |
| Resource Remove              | `/resource/remove`             | [`/src/ts/functions/handler/resource/remove.ts`](src/ts/functions/handler/resource/remove.ts)                         |
| Resource Booklet Generate    | `/resource/booklet/generate`   | [`/src/ts/functions/handler/resource/booklet/generate.ts`](src/ts/functions/handler/resource/booklet/generate.ts)     |
| Resource Booklet Send        | `/resource/booklet/send`       | [`/src/ts/functions/handler/resource/booklet/send.ts`](src/ts/functions/handler/resource/booklet/send.ts)             |
| Resource Slideshow Generate  | `/resource/slideshow/generate` | [`/src/ts/functions/handler/resource/slideshow/generate.ts`](src/ts/functions/handler/resource/slideshow/generate.ts) |
| Resource Slidecard Generate  | `/resource/slidecard/generate` | [`/src/ts/functions/handler/resource/slidecard/generate.ts`](src/ts/functions/handler/resource/slidecard/generate.ts) |
| Resource Slidecard Send      | `/resource/slidecard/send`     | [`/src/ts/functions/handler/resource/slidecard/send.ts`](src/ts/functions/handler/resource/slidecard/send.ts)         |
| Resource Invite Send         | `/resource/invite/send`        | [`/src/ts/functions/handler/resource/invite/send.ts`](src/ts/functions/handler/resource/invite/send.ts)               |
| _Resource User Shadow Token_ | `/resource/user/shadow-token`  | [`/src/ts/functions/handler/resource/user/shadow-token.ts`](src/ts/functions/handler/resource/user/shadow-token.ts)   |
| Account Sign Check           | `/account/sign/check`          | [`/src/ts/functions/handler/account/sign/check.ts`](src/ts/functions/handler/account/sign/check.ts)                   |
| Account Sign In              | `/account/sign/in`             | [`/src/ts/functions/handler/account/sign/in.ts`](src/ts/functions/handler/account/sign/in.ts)                         |
| Account Sign Up              | `/account/sign/up`             | [`/src/ts/functions/handler/account/sign/up.ts`](src/ts/functions/handler/account/sign/up.ts)                         |
| Account Sign Out             | `/account/sign/out`            | [`/src/ts/functions/handler/account/sign/out.ts`](src/ts/functions/handler/account/sign/out.ts)                       |
| Account Forgot Pass          | `/account/forgot-password`     | [`/src/ts/functions/handler/account/forgot-password.ts`](src/ts/functions/handler/account/forgot-password.ts)         |
| Account Reset Pass           | `/account/reset-password`      | [`/src/ts/functions/handler/account/reset-password.ts`](src/ts/functions/handler/account/reset-password.ts)           |
| Account Verify Email         | `/account/verify-email`        | [`/src/ts/functions/handler/account/verify-email.ts`](src/ts/functions/handler/account/verify-email.ts)               |
| Account Save                 | `/account/save`                | [`/src/ts/functions/handler/account/save.ts`](src/ts/functions/handler/account/save.ts)                               |
| Payment Create               | `/payment/create`              | [`/src/ts/functions/handler/payment/create.ts`](src/ts/functions/handler/payment/create.ts)                           |

#### B2B API - Swagger Public Host

- [Eulogize API specification hosted in SwaggerHub - For external B2B access - staging sandbox](https://app.swaggerhub.com/apis/WildDev/eulogize-api/1.1.0)

#### B2B API - Release notes-

- [Eulogize B2B Case Creation API Release Notes](https://gist.github.com/wild-palms-dev/cf6dbbfe36d0877146de899ef83690d3)
