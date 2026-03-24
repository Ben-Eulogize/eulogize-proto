const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const stages = [
  'development',
  'local',
  'e2e',
  'staging',
  'test-eng-1',
  'test-eng-2',
  'test.local',
  'production-us',
]

const regionByStage = {
  'production-us': 'us-east-2',
}

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

const scriptPath = path.resolve(__dirname, 'ssm-push-stage.js')

for (const stage of stages) {
  const region = regionByStage[stage] || 'ap-southeast-2'
  const env = { ...process.env, AWS_REGION: region }
  const envDir = path.resolve(__dirname, '..', 'environments')
  const envFile = `.env.${stage}`
  const envFilePath = path.resolve(envDir, envFile)
  const selectedFile = fs.existsSync(envFilePath)
    ? `environments/${envFile}`
    : null

  if (!selectedFile) {
    console.error(`Env file not found for ${stage}: ${envFilePath}`)
    process.exit(1)
  }

  const stageArgs = [
    '--file',
    selectedFile,
    '--path',
    `/eulogise/client/${stage}`,
  ]

  const result = spawnSync('node', [scriptPath, ...stageArgs, ...extraArgs], {
    stdio: 'inherit',
    env,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
