import { Command } from './Command'
import { parse } from './parse'

export * from './parse'

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
        if (command.rawName === commandName)
          this.matchedCommand = command
      }
    }
    const action = this.matchedCommand!.execute()
    action?.()
  }
}
