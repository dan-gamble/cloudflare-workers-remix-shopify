/**
 * Convert the constructor args to an instance and convert them to a payload that can be sent to the queue.
 * This takes care of converting any `Model` instances to a JSON representation which can be
 * hydrated when the queue processes the job.
 */
export function serializeArguments (args: any[]): string[] {
  return args.map((arg) => JSON.stringify(arg))
}

export async function hydrateArguments (args: string[]): Promise<any[]> {
  return args.map((value) => JSON.parse(value))
}
