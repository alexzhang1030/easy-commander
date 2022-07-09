import { CLI, parse } from '../src'
import { findBrackets, removeBrackets } from '../src/utils'

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
  const cli = new CLI('foo')
  const processArgs = ['_', '_', '--dev', 'foo']
  test('execute action', () => {
    let count = 1
    const command = cli.command('dev').action(() => {
      count++
    })
    cli.start(processArgs)
    expect(cli.matchedCommand).toBeDefined()
    expect(command.ownAction).toBeDefined()
    // if this test is success, all process done
    expect(count).toBe(2)
  })
  test('execute function with params', () => {
    cli.command('dev').action((args) => {
      expect(args).toEqual({
        dev: 'foo'
      })
    })
    cli.start(processArgs)
  })
})

describe.only('support brackets', () => {
  const cli = new CLI('foo')
  const processArgs = ['_', '_', '--dev', 'foo']
  test('angle brackets', () => {
    cli.command('dev <file>').action((file, args) => {
      expect(file).toBe('foo')
      expect(args).toEqual({
        dev: 'foo'
      })
    })
    cli.start(processArgs)
  })

  test('brackets result', () => {
    const command = cli.command('dev <file>')
    expect(command.requiredParams).toMatchInlineSnapshot(`
      [
        "file",
      ]
    `)
  })

  test.only('required params cannot find should throw an error', () => {
    expect(() => {
      cli.command('dev <file>').action((file, args) => {
        expect(file).toBe('foo')
        expect(args).toEqual({
          dev: 'foo'
        })
      })
      cli.start(['_', '_', 'dev'])
    }).toThrowError()
  })
})

describe('brackets test', () => {
  test('find brackets', () => {
    const result = findBrackets('dev <file>')
    expect(result).toEqual({
      options: [
        {
          name: 'file',
          required: true
        }
      ]
    })

    const nonResult = findBrackets('dev')

    expect(nonResult).toEqual({
      options: []
    })
  })
})

describe('findBrackets test', () => {
  test('simple test', () => {
    const result = removeBrackets('dev <file>')
    expect(result).toMatchInlineSnapshot('"dev"')
  })
})
