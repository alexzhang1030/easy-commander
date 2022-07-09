interface BracketsResult {
  name: string
  required: boolean
}

export const findBrackets = (arg: string) => {
  const AngleBracketReg = /<(.*?)>/g
  // const SquareBracketReg = /\[(.*?)\]/g

  const result = [] as BracketsResult[]

  const [fullyMatch, name] = AngleBracketReg.exec(arg) || ['', '']
  if (fullyMatch.length) {
    result.push({
      name: name || '',
      required: !!(fullyMatch.startsWith('<'))
    })
  }

  return {
    options: result
  }
}

export const removeBrackets = (arg: string) => {
  const { options } = findBrackets(arg)
  let result = arg
  for (let i = 0; i < options.length; i++) {
    const { name, required } = options[i]
    const replacedName = required ? `<${name}>` : `[${name}]`
    result = result.replace(replacedName, '')
  }
  return result.trim()
}
