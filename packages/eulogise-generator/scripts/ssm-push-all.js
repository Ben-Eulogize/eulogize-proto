const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const stages = [
  {
    name: 'local',
    envFile: 'environments/.env.local',
    path: '/eulogise/generator/local',
    region: 'ap-southeast-2',
  },
  {
    name: 'staging',
    envFile: 'environments/.env.staging',
    path: '/eulogise/generator/staging',
    region: 'ap-southeast-2',
  },
  {
    name: 'test-eng-1',
    envFile: 'environments/.env.test-eng-1',
    path: '/eulogise/generator/test-eng-1',
    region: 'ap-southeast-2',
  },
  {
    name: 'test-eng-2',
    envFile: 'environments/.env.test-eng-2',
    path: '/eulogise/generator/test-eng-2',
    region: 'ap-southeast-2',
  },
  {
    name: 'test.local',
    envFile: 'environments/.env.test.local',
    path: '/eulogise/generator/test.local',
    region: 'ap-southeast-2',
  },
  {
    name: 'production-us',
    envFile: 'environments/.env.production-us',
    path: '/eulogise/generator/production-us',
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
  const envDir = path.resolve(packageRoot, 'environments')
  const envFileRelative = stage.envFile.includes('/')
    ? stage.envFile
    : `environments/${stage.envFile}`
  const envFilePath = path.resolve(packageRoot, envFileRelative)
  const selectedFile = fs.existsSync(envFilePath) ? envFileRelative : null

  if (!selectedFile) {
    console.error(`Env file not found for ${stage.name}: ${envFilePath}`)
    process.exit(1)
  }

  const env = { ...process.env, AWS_REGION: stage.region }
  const stageArgs = ['--file', selectedFile, '--path', stage.path]

  const result = spawnSync('node', [scriptPath, ...stageArgs, ...extraArgs], {
    stdio: 'inherit',
    env,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
