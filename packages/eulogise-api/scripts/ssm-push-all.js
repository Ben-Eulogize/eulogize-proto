const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const stages = [
  {
    name: 'development',
    envFile: 'environments/.env.dev.remote',
    path: '/eulogise/api/development',
    region: 'ap-southeast-2',
  },
  {
    name: 'dev.local',
    envFile: 'environments/.env.dev.local',
    path: '/eulogise/api/dev.local',
    region: 'ap-southeast-2',
  },
  {
    name: 'dev.remote',
    envFile: 'environments/.env.dev.remote',
    path: '/eulogise/api/dev.remote',
    region: 'ap-southeast-2',
  },
  {
    name: 'staging',
    envFile: 'environments/.env.staging',
    path: '/eulogise/api/staging',
    region: 'ap-southeast-2',
  },
  {
    name: 'test-eng-1',
    envFile: 'environments/.env.test-eng-1',
    path: '/eulogise/api/test-eng-1',
    region: 'ap-southeast-2',
  },
  {
    name: 'test-eng-2',
    envFile: 'environments/.env.test-eng-2',
    path: '/eulogise/api/test-eng-2',
    region: 'ap-southeast-2',
  },
  {
    name: 'test.local',
    envFile: 'environments/.env.test.local',
    path: '/eulogise/api/test.local',
    region: 'ap-southeast-2',
  },
  {
    name: 'production-us',
    envFile: 'environments/.env.production-us',
    path: '/eulogise/api/production-us',
    region: 'us-east-2',
  },
]

const stripArg = (args, flag) => {
  const stripped = []
  for (let i = 0; i < args.length; i += 1) {
    const current = args[i]
    if (current === flag) {
      i += 1
      continue
    }
    stripped.push(current)
  }
  return stripped
}

let extraArgs = process.argv.slice(2)
extraArgs = stripArg(extraArgs, '--env')
extraArgs = stripArg(extraArgs, '--path')
extraArgs = stripArg(extraArgs, '--file')

const scriptPath = path.resolve(__dirname, 'ssm-push-stage.js')

for (const stage of stages) {
  const packageRoot = path.resolve(__dirname, '..')
  const envFileRelative = stage.envFile.includes('/')
    ? stage.envFile
    : `environments/${stage.envFile}`
  const envFilePath = path.resolve(packageRoot, envFileRelative)

  if (!fs.existsSync(envFilePath)) {
    console.error(`Env file not found for ${stage.name}: ${envFilePath}`)
    process.exit(1)
  }

  const env = { ...process.env, AWS_REGION: stage.region }
  const stageArgs = ['--file', envFileRelative, '--path', stage.path]

  const result = spawnSync('node', [scriptPath, ...stageArgs, ...extraArgs], {
    stdio: 'inherit',
    env,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
