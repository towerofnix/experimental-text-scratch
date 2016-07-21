@builtin "whitespace.ne"

Program -> "\n":* ProgramLines "\n":* {% d => d[1] %}
ProgramLines -> ProgramLine {% d => [d[0]] %}
              | ProgramLine "\n":+ ProgramLines {% d => [d[0], ...d[2]] %}
ProgramLine -> _notNL Keyword _notNL LineParamList _notNL {% d => [d[1], d[3]] %}

_notNL -> (. {% (d, l, e) => (/\s/.test(d[0]) && d != '\n') ? null : e %}):* {% () => null %}

LineParamList -> Expression
               | Expression _notNL "," _notNL LineParamList {% d => [d[0], ...d[4]] %}

Expression -> (Variable | Reporter | Stack | String | Number) {% d => d[0][0] %}
Reporter -> Keyword _notNL "(" _notNL LineParamList _notNL ")" {% d => ['reporter', d[0], d[4]] %}

Variable -> "$" Keyword {% (d, l, e) => d[1][0] === '(' ? e : ['reporter', 'var', [['string', d[1]]]] %}
          | "$(" (. {% (d, l, e) => d[0] === ')' ? e : d[0] %}):+ ")" {% d => ['reporter', 'var', [['string', d[1].join('')]]] %}

Keyword -> (AnyCharacter {% (d, l, e) => /\s/.test(d[0]) ? e : d[0] %}):+ {% d => d[0].join('') %}

Stack -> "{" _notNL "\n":* (ProgramLines "\n":*):? _notNL "}" {% d => ['stack', d[3] ? d[3][0] : []] %}

Number -> [0-9]:+ {% d => ['number', +d[0].join('')] %}

String -> StringSingleDelimiter StringSingleContents StringSingleDelimiter {% d => ['string', d[1]] %}
StringSingleDelimiter -> "'"
StringSingleContents -> StringSingleCharacter:* {% d => d[0].join('') %}
StringSingleCharacter -> AnyCharacter {% (d, l, e) => d[0] === "'" ? e : d[0] %}

AnyCharacter -> . {% d => d[0] %}
