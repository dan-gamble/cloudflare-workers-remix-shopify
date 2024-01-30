#!/usr/bin/env node

import { spawn } from 'node:child_process'
import {
  confirm,
  intro,
  isCancel,
  multiselect,
  note,
  outro,
  spinner,
  text,
} from '@clack/prompts'
import { readFile, writeFile } from 'fs/promises'
import { join, normalize } from 'path'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function setup() {
  intro('Setting up a new BAO App project')

  const s = spinner()

  s.start(
    'Welcome! Checking to make sure you have the Wrangler CLI installed and authenticated...',
  )

  if (!(await ensureWranglerAuthenticated())) {
    s.stop("Hmm. Looks like you're not logged in yet.")

    const wantsToLogIn = await confirm({
      message:
        'You need to be logged into Wrangler to setup a BAO app. Log in now?',
    })

    if (isCancel(wantsToLogIn) || !wantsToLogIn) {
      cancel(
        'You need to be logged into Wrangler to be able to setup a BAO app.',
      )

      process.exit(0)
    }

    await wranglerLogin()
  }

  s.stop('Everything looks good!')

  note(
    'Before using R2, Queues, and Durable objects,\n' +
    "make sure you've enabled them in the Cloudflare Dashboard.\n" +
    'https://dash.cloudflare.com/\n' +
    'Otherwise, the following commands might fail! 😬',
    '👋 Heads-up:',
  )

  const path = normalize(process.cwd())

  const appName = await text({
    message: 'What is the name of your project?',
    placeholder: 'my-bao-project',
  })

  // Validate appName. It should just be a string of letters, numbers, and dashes.
  if (!appName.match(/^[a-z0-9-]+$/)) {
    throw new Error(
      `Invalid app name: ${appName}. App names can only contain lowercase letters, numbers, and dashes.`,
    )
  }

  async function buildPlan() {
    const selections = await multiselect({
      message: `What features of BAO do you plan to use? We'll create the resources for you.`,
      options: [
        {
          value: 'database',
          label: 'Database Models',
          hint: "We'll create D1 a database for you",
        },
        {
          value: 'kv',
          label: 'Key Values',
          hint: "We'll create KV namespace for you",
        },
        {
          value: 'storage',
          label: 'Storage',
          hint: "We'll create a R2 bucket for you",
        },
        {
          value: 'queue',
          label: 'Queues',
          hint: "We'll create a Queue consumer and producer for you",
        },
        {
          value: 'scheduledTasks',
          label: 'Scheduled Tasks',
          hint: "We'll set up a cron trigger for you",
        },
      ],
      initialValues: ['database', 'kv', 'storage', 'queue', 'scheduledTasks'],
    })

    if (isCancel(selections)) {
      cancel('Never mind!')

      process.exit(0)
    }

    const plan = {}

    for (const selection of selections) {
      switch (selection) {
        case 'database':
          plan.d1 = `${appName}-db`
          break
        case 'kv':
          plan.kv = `${appName}_kv`.toUpperCase().replace('-', '_')
          break
        case 'storage':
          plan.r2 = `${appName}-bucket`
          break
        case 'queue':
          plan.queue = `${appName}-queue`
          break
        case 'scheduledTasks':
          plan.scheduledTasks = true
          break

        default:
          break
      }
    }

    const confirmMessage = `We'll create the following resources for you:

${plan.d1 ? `  - D1 Database: ${plan.d1} (bound as DB)` : ''}
${plan.kv ? `  - KV Namespace: ${plan.kv} (bound as KV)` : ''}
${plan.r2 ? `  - R2 Bucket: ${plan.r2} (bound as BUCKET)` : ''}
${plan.queue ? `  - Queue: ${plan.queue} (bound as QUEUE)` : ''}
${
      plan.scheduledTasks
        ? `  - Scheduled Tasks: A cron trigger for every minute`
        : ''
    }

Do you want to continue?`

    const confirmation = await confirm({
      message: confirmMessage,
    })

    if (!confirmation || isCancel(confirmation)) {
      return await buildPlan()
    }

    return plan
  }

  const plan = await buildPlan()

  s.start('Creating resources...')

  const promises = []

  if (plan.d1) {
    promises.push(createD1Database(plan.d1))
  }

  if (plan.kv) {
    promises.push(createKVNamespace(plan.kv))
  }

  if (plan.r2) {
    promises.push(createR2Bucket(plan.r2))
  }

  if (plan.queue) {
    promises.push(createQueue(plan.queue))
  }

  if (plan.scheduledTasks) {
    promises.push(
      Promise.resolve({
        success: true,
        message: '✅ Scheduled Tasks: Set up cron trigger for every minute',
        wranglerConfig: {
          triggers: {
            crons: ['* * * * *'],
          },
        },
      }),
    )
  }

  const results = await Promise.all(promises)

  let wranglerConfig = {
    name: appName,
    main: './build/index.js',
    compatibility_date: '2023-04-20',
    compatibility_flags: ['nodejs_compat'],
    site: {
      bucket: './public',
    },
    build: {
      command: 'npm run build',
    },
  }

  // TODO: Try this again

  for (const result of results) {
    if (result.wranglerConfig) {
      wranglerConfig = {
        ...wranglerConfig,
        ...result.wranglerConfig,
      }
    }
  }

  await addToWranglerConfig(wranglerConfig, path)
  await writeBaoConfig(results.map(r => r.baoConfig).filter(Boolean), path)

  s.stop('Done creating resources!')

  const allResults = results.map(r => r.message)

  note(allResults.join('\n'), "Here's what we did:")

  outro(`You're all set! Run \`npm run dev\` to get started.`)
  // TODO: Add a teardown bin file that will undo the service creation
}

await setup()

async function createD1Database(name) {
  try {
    const result = await runWranglerCommand(['d1', 'create', name])

    // Parse the ID out of the stdout:
    // database_id = "79da141d-acd3-4d64-adb1-9a50f8ed7e2b"
    const databaseId = result.stdout
      .split('\n')
      .find(line => line.startsWith('database_id'))
      ?.split('=')[1]
      ?.trim()
      .replace(/"/g, '')

    if (!databaseId) {
      return {
        success: false,
        message: `🤔 D1 Database: ${name} created, but we couldn't parse the ID. Check your Cloudflare Dashboard to find it.`,
      }
    }

    return {
      success: true,
      message: `✅ D1 Database: ${name} created!`,
      wranglerConfig: {
        d1_databases: [
          {
            binding: 'DB',
            database_name: name,
            database_id: databaseId,
          },
        ],
      },
      baoConfig: `database: {\n  default: context.env.DB,\n},`,
    }
  } catch (e) {
    return {
      success: false,
      message: `❌ D1 Database: ${e.stderr || e.stdout || e.message}`,
    }
  }
}

async function createKVNamespace(name) {
  try {
    const a = await runWranglerCommand(['kv:namespace', 'create', name])
    const stdoutlines = a.stdout.split('\n')
    const idLine = stdoutlines.find(line => line.includes('id = "'))

    if (!idLine) {
      return {
        success: false,
        message: `🤔 KV Namespace: ${name} created, but we couldn't parse the ID. Check your Cloudflare Dashboard to find it.`,
      }
    }

    const idIndex = idLine.indexOf('id = "')
    const closingIndex = idLine.indexOf('" }')
    const id = idLine.slice(idIndex, closingIndex).replace('id = "', '')

    return {
      success: true,
      message: `✅ KV Namespace: ${name} created!`,
      wranglerConfig: {
        kv_namespaces: [
          {
            binding: 'KV',
            id,
          },
        ],
      },
      baoConfig: ``,
    }
  } catch (e) {
    return {
      success: false,
      message: `❌ KV Namespace: ${e.stderr || e.stdout || e.message}`,
    }
  }
}

async function createR2Bucket(name) {
  try {
    await runWranglerCommand(['r2', 'bucket', 'create', name])

    return {
      success: true,
      message: `✅ R2 Bucket: ${name} created!`,
      wranglerConfig: {
        r2_buckets: [
          {
            binding: 'BUCKET',
            bucket_name: name,
            preview_bucket_name: 'BUCKET',
          },
        ],
      },
      baoConfig: `storage: {
  default: {
    binding: context.env.BUCKET,
  },
},`,
    }
  } catch (e) {
    return {
      success: false,
      message: `❌ R2 Bucket: ${e.stderr || e.stdout || e.message}`,
    }
  }
}

async function createQueue(name) {
  try {
    await runWranglerCommand(['queues', 'create', name])

    return {
      success: true,
      message: `✅ Queue: ${name} created!`,
      wranglerConfig: {
        queues: {
          producers: [
            {
              queue: name,
              binding: 'QUEUE',
            },
          ],
          consumers: [
            {
              queue: name,
            },
          ],
        },
      },
      baoConfig: `queues: {\n  default: context.env.QUEUE,\n},`,
    }
  } catch (e) {
    return {
      success: false,
      message: `❌ Queue: ${e.stderr || e.stdout || e.message}`,
    }
  }
}

/**
 * Check to see whether the user is logged in.
 * BONUS: I think this also forces Wrangler to check for an existing auth token,
 * which will help us later on when we need to create resources without making
 * the user complete the auth flow over again.
 */
async function ensureWranglerAuthenticated() {
  try {
    const result = await runWranglerCommand(['whoami'])

    return !result.stdout.includes('You are not authenticated')
  } catch (_e) {
    // Some older versions of Wrangler return a non-zero exit code when
    // you're not logged in.
    return false
  }
}

/**
 * Pop open the Wrangler login flow.
 */
async function wranglerLogin() {
  return await new Promise((resolve, reject) => {
    spawn('npx', ['wrangler', 'login'], { stdio: 'inherit' }).on(
      'close',
      code => {
        if (code === 0) {
          resolve()
        } else {
          reject()
        }
      },
    )
  })
}

/**
 * Run a wrangler command. It would be great to replace this with a real exported API instead
 * of spawning a child process every time.
 */
export async function runWranglerCommand(command) {
  let stdout = ''
  let stderr = ''

  const child = spawn('npx', ['wrangler@latest', ...command], {
    shell: true,
    env: {
      ...process.env,
      // TODO: Remove when D1 is stable.
      NO_D1_WARNING: 'true',
    },
  })

  child.stderr.on('data', data => {
    stderr += data
  })
  child.stdout.on('data', data => {
    stdout += data
  })

  return new Promise((resolve, reject) => {
    child.on('close', code => {
      if (code === 0) {
        resolve({ code, stdout, stderr })
        return
      }

      reject({ code, stdout, stderr })
    })
  })
}

/**
 * Update the project's wrangler config with some new config.
 */
async function addToWranglerConfig(config, pathName) {
  let wranglerConfigPath = join(pathName, 'wrangler.toml')

  try {
    throw new Error('not implemented for TOML yet')
    // const wranglerConfig = await readToml(wranglerConfigPath);

    // await writeToml(wranglerConfigPath, {
    //   ...wranglerConfig,
    //   ...config,
    // });
  } catch (e) {
    // Must be using wrangler.json...
    wranglerConfigPath = join(pathName, 'wrangler.json')
    const wranglerConfig = JSON.parse(
      await readFile(wranglerConfigPath, 'utf-8'),
    )

    await writeFile(
      wranglerConfigPath,
      JSON.stringify(
        {
          ...wranglerConfig,
          ...config,
        },
        null,
        2,
      ),
    )
  }
}

/**
 * Write the bao.config.ts file from scratch. This is pretty jank.
 */
async function writeBaoConfig(chunks, pathName) {
  const baoConfigPath = join(pathName, 'bao.config.ts')

  let contents = `import { defineConfig } from '~/utils/config.server';\n\nexport const config = defineConfig<Env>((context) => {\n  return {\n`

  const indentation = '    '

  chunks.forEach(chunk => {
    chunk.split('\n').forEach(line => {
      contents += `${indentation}${line}\n`
    })
  })

  contents += `  };\n});`

  await writeFile(baoConfigPath, contents)
}
