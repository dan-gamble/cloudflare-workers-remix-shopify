/**
 * Sometimes, our bundle creates multiple references to the same imported module. This results
 * in some references with numbers appended to them. We want to remove those numbers to sanitize
 * the event names in order for client listeners to distinguish which events are being emitted.
 */
export function sanitizeModuleName (name: string) {
  return name.replace(/\d+$/, '')
}
