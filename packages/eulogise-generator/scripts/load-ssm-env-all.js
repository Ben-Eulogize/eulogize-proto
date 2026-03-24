const path = require('path')
const { spawnSync } = require('child_process')

const stages = [
  { name: 'local', region: 'ap-southeast-2' },
  { name: 'staging', region: 'ap-southeast-2' },
  { name: 'test-eng-1', region: 'ap-southeast-2' },
  { name: 'test-eng-2', region: 'ap-southeast-2' },
  { name: 'test.local', region: 'ap-southeast-2' },
  { name: 'production-us', region: 'us-east-2' },
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
extraArgs = stripArg(extraArgs, '--output')

const scriptPath = path.resolve(__dirname, 'load-ssm-env.js')

for (const stage of stages) {
  const env = { ...process.env, AWS_REGION: stage.region }
  const stageArgs = [
    '--env',
    stage.name,
    '--path',
    `/eulogise/generator/${stage.name}`,
  ]

  const result = spawnSync('node', [scriptPath, ...stageArgs, ...extraArgs], {
    stdio: 'inherit',
    env,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
