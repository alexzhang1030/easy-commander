import { CLI, parse } from '../src'

describe('parse process args', () => {
  const processArgs = ['_', 'index.js', '--dev', 'start.ts']
  test('simple parse', () => {
    expect(parse(processArgs)).toEqual({
      dev: 'start.ts'
    })
  })
})

describe('register command and action', () => {
  test('register command', () => {
    const cli = new CLI('foo')
    cli.command('dev')
    const command = cli.command('bar').action(() => {})
    expect(cli.commands).toHaveLength(2)
    expect(command.ownAction).toBeDefined()
  })
})

describe('parse arguments and execute action', () => {
  test('execute action', () => {
    const cli = new CLI('foo')
    let count = 1
    const command = cli.command('dev').action(() => {
      count++
    })
    const processArgs = ['_', '_', '--dev', 'foo']
    cli.start(processArgs)
    expect(cli.matchedCommand).toBeDefined()
    expect(command.ownAction).toBeDefined()
    // if this test is success, all process done
    expect(count).toBe(2)
  })
})
