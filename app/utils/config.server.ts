import type { Job } from '~/jobs/job'
import { sanitizeModuleName } from '~/utils/string.server'

export interface StorageDiskConfig {
  binding: R2Bucket;
  /**
   * Optional. The public URL to the disk. If you have made your R2 bucket public, you can
   * set this to the URL of the bucket. If your R2 bucket is private but you want to allow
   * access to objects, you can set this to a local route like `/storage/<diskname>` where you are
   * proxying the R2 bucket.
   *
   * If you do not set this, `storage()->url(key)` for objects in this disk will return `null`.
   */
  publicPath?: string;
}

export interface BaoConfig {
  database?: { default: D1Database } & Record<string, D1Database>
  queues?: { default: Queue } & Record<string, Queue>
  storage?: { default: StorageDiskConfig } & Record<string, StorageDiskConfig>
}

export function setConfig (userConfig: BaoConfig) {
  if (userConfig.database) {
    Config.database = {
      connections: userConfig.database,
    }
  }

  if (userConfig.queues) {
    Config.queues = userConfig.queues
  }

  if (userConfig.storage) {
    Config.storage = {
      disks: userConfig.storage,
    }
  }

  return userConfig
}

export class Config {
  static env: any

  static ctx: ExecutionContext

  static database?: {
    connections: BaoConfig['database']
  }

  static storage?: {
    disks: BaoConfig["storage"];
  }

  static queues?: BaoConfig['queues']

  static jobs?: {
    [name: string]: Constructor<Job>
  }
}

export function setEnv (env: any) {
  Config.env = env
}

export function getEnv () {
  return Config.env
}

export function getJob (name: string): Constructor<Job> | undefined {
  return Config.jobs?.[name]
}

export function getQueue (name: string) {
  return Config.queues?.[name]
}

export function registerJob (job: any) {
  const jobName = sanitizeModuleName(job.name)
  Config.jobs = Config.jobs || {}
  Config.jobs[jobName] = job
}

/**
 * Accept a general set of request attributes in order to work
 * with both Cloudflare Workers and Pages.
 */
type DefineConfigContext<Env = Record<string, any>> = {
  /**
   * Request will not always be present, e.g. if the context is a queue worker.
   */
  request?: Request;
  env: Env;
  ctx: ExecutionContext;
}

export type DefineConfigResult = BaoConfig

export function defineConfig<Env = Record<string, any>> (
  callback: (ctx: DefineConfigContext<Env>) => BaoConfig,
): (ctx: DefineConfigContext<Env>) => DefineConfigResult {
  return (ctx: DefineConfigContext<Env>) => {
    setEnv(ctx.env)

    return setConfig(callback(ctx))
  }
}

type Constructor<T> = new (...args: any[]) => T
