import { Command } from './Command'
import { parse } from './parse'

export * from './parse'
export * from './utils'

export class CLI {
  commands: Command[] = []

  matchedCommand?: Command

  constructor(public name: string) { }

  command(rawName: string) {
    const command = new Command(rawName)
    this.commands.push(command)
    return command
  }

  start(args: string[]) {
    const parsed = parse(args)
    for (const commandName of Object.keys(parsed)) {
      for (const command of this.commands) {
        if (command.isMatched(commandName)) {
          command.checkRequiredParams(parsed)
          this.matchedCommand = command
        }
      }
    }
    const needInjectValues = Object.values(parsed)
    this.matchedCommand!.execute({
      inject: needInjectValues,
      parsed
    })
  }
}
