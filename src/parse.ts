export function parse(rawArgs: string[]) {
  const args = rawArgs.slice(2)
  const result: Record<string, string> = {}
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      result[key] = args[++i]
    }
  }
  return result
}
