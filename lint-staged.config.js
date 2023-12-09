export default {
  '*.{ts,tsx}': 'npm run lint',
  '*.{tsx,ts}': () => 'npm run typecheck'
}
