type ActionType = (...args: any[]) => unknown

export class Command {
  ownAction?: ActionType
  constructor(public rawName: string) {

  }

  action(callback: ActionType) {
    this.ownAction = callback
    return this
  }

  execute() {
    return this.ownAction
  }
}
