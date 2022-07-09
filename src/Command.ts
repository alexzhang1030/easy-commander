import { findBrackets, removeBrackets } from './utils'
type ActionType = (...args: any[]) => unknown
interface ExecuteParams {
  inject: string[]
  parsed: Record<string, string>
}

export class Command {
  ownAction?: ActionType
  requiredParams: string[] = []
  constructor(public rawName: string) {
    this.rawName = removeBrackets(rawName)
    const { options: bracketsResults } = findBrackets(rawName)
    this.requiredParams = bracketsResults.filter(({ required }) => required).map(item => item.name)
  }

  action(callback: ActionType) {
    this.ownAction = callback
    return this
  }

  execute({ inject, parsed }: ExecuteParams) {
    return this.ownAction?.(...inject, parsed)
  }

  isMatched(arg: string) {
    return this.rawName === arg
  }

  checkRequiredParams(params: Record<string, string>) {
    if (this.requiredParams.length && params[this.rawName] === undefined)
      throw new Error(`${this.rawName} need an argument`)
  }
}
