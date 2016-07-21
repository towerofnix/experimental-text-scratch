'use strict'

// Let's see how this goes..

let parse
let blockify

{
  // Parse --------------------------------------------------------------------

  const { ParserRules, ParserStart } = window.grammar

  parse = function(code) {
    const parser = new nearley.Parser(ParserRules, ParserStart)
    parser.feed(code)
    if (parser.results.length > 1) {
      console.error('Multiple parse trees!')
      for (let tree of parser.results) {
        console.info(tree, JSON.stringify(tree, null, 2))
      }
      throw new Error('Multiple parse trees')
    } else {
      console.log('results:', parser.results)
      return parser.results[0]
    }
  }

  // Blockify -----------------------------------------------------------------

  const expectInputType = (input, type) => {
    if (input[0] === type) {
      return input[1]
    } else {
      throw new Error(`Invalid input type: expected a ${type}`)
    }
  }

  const blockifyDictionary = {
    say($0) {
      $0 = inputify($0, 'string')

      return `say ${ $0 }`
    },

    says($0, $1) {
      $0 = inputify($0, 'string')
      $1 = inputify($1, 'number')

      return `say ${ $0 } for ${ $1 } secs`
    },

    forever($0) {
      $0 = inputify($0, 'stack')

      return `forever\n${ $0 }\nend`
    },

    repeat($0, $1) {
      $0 = inputify($0, 'number')
      $1 = inputify($1, 'stack')

      return `repeat ${ $0 }\n${ $1 }\nend`
    },

    waits($0) {
      $0 = inputify($0, 'number')

      return `wait ${ $0 } secs`
    },

    // Ohh hacky controls

    forrange($0, $1, $2, $3) {
      $0 = literalNeeded($0, 'string')

      $0 = varEscape($0)
      $1 = inputify($1, 'number')
      $2 = inputify($2, 'number')
      $3 = inputify($3, 'stack')

      const magicId = generateMagicId()
      const indexVar = magicId + 'index'
      const times = `((${ $2 } - ${ $1 }) + (1))`

      return (
          `set [${ indexVar } v] to (${ $1 } - (1))\n`
        + `repeat ${ times }\n`
        + `  change [${ indexVar } v] by (1)\n`
        + `  set [${ $0 } v] to (${ indexVar })\n`
        + `  ${ $3 }\n`
        + `end`
      )
    },

    // Reporters

    add($0, $1) {
      $0 = inputify($0, 'number')
      $1 = inputify($1, 'number')
      return `(${ $0 } + ${ $1 })`
    },

    sub($0, $1) {
      $0 = inputify($0, 'number')
      $1 = inputify($1, 'number')
      return `(${ $0 } - ${ $1 })`
    },

    join($0, $1) {
      $0 = inputify($0, 'string')
      $1 = inputify($1, 'string')
      return `(join ${ $0 } ${ $1 })`
    },

    joinmul(...$) {
      let [$0, ...$more] = $

      $0 = inputify($0, 'string')
      if ($more.length > 0) {
        const evenMore = blockifyDictionary.joinmul(...$more)
        return `(join ${ $0 } ${ evenMore })`
      } else {
        return $0
      }
    },

    'var'($0) {
      literalNeeded($0, 'string')

      const varName = $0[1]
      const varNameEscaped = varEscape(varName)

      return `(${ varNameEscaped })`
    }
  }

  const MAGIC_ID_LENGTH = 16

  const generateMagicId = function() {
    return '_magicid_' + new Array(MAGIC_ID_LENGTH)
      .fill('-')
      .map(c => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
      .join('')
  }

  const varEscape = name => name
    .split('')
    .map(c => c === '(' || c === ')' ? '\\' + c : c)
    .join('')

  const literalNeeded = function(val, type) {
    if (val[0] !== type) {
      throw new Error(`Expected literal ${ type } argument`)
    } else {
      return val[1]
    }
  }

  const inputify = function(val, type) {
    // Does all that pesky inputifying stuff for you.
    // TODO: Deal with string inputs

    // console.log('Inputify input:', val, type)

    if (type === 'stack') {
      return blockify(expectInputType(val, 'stack'))
    } else if (val[0] === 'reporter') {
      console.log(val[2])
      return blockifyCommandArgs(val[1], val[2])
    } else if (type === 'number') {
      return inputifyNumber(expectInputType(val, 'number'))
    } else if (type === 'string') {
      return inputifyString(expectInputType(val, 'string'))
    }
  }

  const inputifyString = function(string) {
    // Make a piece of text into a new string that can be used for templating.
    // hello => [hello]
    // hi there [name] => hi there \[name\]

    const chars = string.split('')
    const charsEscaped = chars.map(c =>
      (c === '[' || c === ']') ? '\\' + c : c)
    const stringEscaped = charsEscaped.join('')
    const input = '[' + stringEscaped + ']'
    return input
  }

  const inputifyNumber = function(number) {
    // Make a number into a string that can be used for templating.
    // 123 => (123)

    return '(' + parseFloat(number) + ')'
  }

  const blockifyCommandArgs = function(command, args) {
    if (!(blockifyDictionary.hasOwnProperty(command))) {
      throw new Error('Not a valid command: ' + command)
    }

    const blockified = blockifyDictionary[command](...args)
    // console.log('Command:', command)
    // console.log('Args:', args)
    // console.log('Blockified:', blockified)
    return blockified
  }

  blockify = function(tree) {
    console.group('blockify')

    let output = ''
    for (let line of tree) {
      const [command, args] = line

      const lineStr = blockifyCommandArgs(command, args)

      console.log(lineStr)
      output += lineStr + '\n'
    }

    // Get rid of extra newline.
    output = output.slice(0, -1)

    console.groupEnd('blockify')
    return output
  }
}

const tree = parse(`
forever {
  says 'Ayy', 1
  says 'Lmaoium', 1
}
`)

console.log('tree:', JSON.stringify(tree, null, 2))

console.log(blockify(tree))
