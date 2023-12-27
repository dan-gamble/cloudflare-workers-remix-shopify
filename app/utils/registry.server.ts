import type { AsyncLocalStorage } from 'node:async_hooks'
import { sanitizeModuleName } from '~/utils/string.server'
import { Config } from '~/utils/config.server'
import type { Job } from '~/utils/jobs.server'

/**
 * A registry of models, jobs, and events. This is not bound to a request, as
 * classes will register themselves as soon as they're imported into the module graph.
 *
 * Do not store anything on this object that is request-specific because it will
 * be shared between requests. Use AppContext instead for request-specific data.
 */
export class Registry {
  static als?: AsyncLocalStorage<any>

  static jobs?: {
    [name: string]: any;
  }

  static events?: {
    [name: string]: any;
  }
}

/**
 * Register a job into the Registry.
 */
export function registerJob (job: any) {
  const jobName = sanitizeModuleName(job.name)
  Registry.jobs = Registry.jobs || {}
  Registry.jobs[jobName] = job
}

/**
 * Get a Job from the Registry.
 */
export function getJob (name: string) {
  return Registry.jobs?.[name]
}

/**
 * Register an event into the Registry.
 */
export function registerEvent (event: any) {
  const eventName = sanitizeModuleName(event.name)
  Registry.events = Registry.events || {}
  Registry.events[eventName] = event
}

export function getEvent (name: string) {
  return Registry.events?.[name]
}
