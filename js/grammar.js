// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }
var grammar = {
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["wschar", "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["wschar", "__$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "Program$ebnf$1", "symbols": []},
    {"name": "Program$ebnf$1", "symbols": [{"literal":"\n"}, "Program$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Program$ebnf$2", "symbols": []},
    {"name": "Program$ebnf$2", "symbols": [{"literal":"\n"}, "Program$ebnf$2"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Program", "symbols": ["Program$ebnf$1", "ProgramLines", "Program$ebnf$2"], "postprocess": d => d[1]},
    {"name": "ProgramLines", "symbols": ["ProgramLine"], "postprocess": d => [d[0]]},
    {"name": "ProgramLines$ebnf$1", "symbols": [{"literal":"\n"}]},
    {"name": "ProgramLines$ebnf$1", "symbols": [{"literal":"\n"}, "ProgramLines$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "ProgramLines", "symbols": ["ProgramLine", "ProgramLines$ebnf$1", "ProgramLines"], "postprocess": d => [d[0], ...d[2]]},
    {"name": "ProgramLine", "symbols": ["_notNL", "Keyword", "_notNL", "LineParamList", "_notNL"], "postprocess": d => [d[1], d[3]]},
    {"name": "_notNL$ebnf$1", "symbols": []},
    {"name": "_notNL$ebnf$1$subexpression$1", "symbols": [/./], "postprocess": (d, l, e) => (/\s/.test(d[0]) && d != '\n') ? null : e},
    {"name": "_notNL$ebnf$1", "symbols": ["_notNL$ebnf$1$subexpression$1", "_notNL$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_notNL", "symbols": ["_notNL$ebnf$1"], "postprocess": () => null},
    {"name": "LineParamList", "symbols": ["Expression"]},
    {"name": "LineParamList", "symbols": ["Expression", "_notNL", {"literal":","}, "_notNL", "LineParamList"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "Expression$subexpression$1", "symbols": ["Variable"]},
    {"name": "Expression$subexpression$1", "symbols": ["Reporter"]},
    {"name": "Expression$subexpression$1", "symbols": ["Stack"]},
    {"name": "Expression$subexpression$1", "symbols": ["String"]},
    {"name": "Expression$subexpression$1", "symbols": ["Number"]},
    {"name": "Expression", "symbols": ["Expression$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "Reporter", "symbols": ["Keyword", "_notNL", {"literal":"("}, "_notNL", "LineParamList", "_notNL", {"literal":")"}], "postprocess": d => ['reporter', d[0], d[4]]},
    {"name": "Variable", "symbols": [{"literal":"$"}, "Keyword"], "postprocess": (d, l, e) => d[1][0] === '(' ? e : ['reporter', 'var', [['string', d[1]]]]},
    {"name": "Variable$string$1", "symbols": [{"literal":"$"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Variable$ebnf$1$subexpression$1", "symbols": [/./], "postprocess": (d, l, e) => d[0] === ')' ? e : d[0]},
    {"name": "Variable$ebnf$1", "symbols": ["Variable$ebnf$1$subexpression$1"]},
    {"name": "Variable$ebnf$1$subexpression$2", "symbols": [/./], "postprocess": (d, l, e) => d[0] === ')' ? e : d[0]},
    {"name": "Variable$ebnf$1", "symbols": ["Variable$ebnf$1$subexpression$2", "Variable$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Variable", "symbols": ["Variable$string$1", "Variable$ebnf$1", {"literal":")"}], "postprocess": d => ['reporter', 'var', [['string', d[1].join('')]]]},
    {"name": "Keyword$ebnf$1$subexpression$1", "symbols": ["AnyCharacter"], "postprocess": (d, l, e) => /\s/.test(d[0]) ? e : d[0]},
    {"name": "Keyword$ebnf$1", "symbols": ["Keyword$ebnf$1$subexpression$1"]},
    {"name": "Keyword$ebnf$1$subexpression$2", "symbols": ["AnyCharacter"], "postprocess": (d, l, e) => /\s/.test(d[0]) ? e : d[0]},
    {"name": "Keyword$ebnf$1", "symbols": ["Keyword$ebnf$1$subexpression$2", "Keyword$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Keyword", "symbols": ["Keyword$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "Stack$ebnf$1", "symbols": []},
    {"name": "Stack$ebnf$1", "symbols": [{"literal":"\n"}, "Stack$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Stack$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "Stack$ebnf$2$subexpression$1$ebnf$1", "symbols": [{"literal":"\n"}, "Stack$ebnf$2$subexpression$1$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Stack$ebnf$2$subexpression$1", "symbols": ["ProgramLines", "Stack$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "Stack$ebnf$2", "symbols": ["Stack$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "Stack$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Stack", "symbols": [{"literal":"{"}, "_notNL", "Stack$ebnf$1", "Stack$ebnf$2", "_notNL", {"literal":"}"}], "postprocess": d => ['stack', d[3] ? d[3][0] : []]},
    {"name": "Number$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "Number$ebnf$1", "symbols": [/[0-9]/, "Number$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Number", "symbols": ["Number$ebnf$1"], "postprocess": d => ['number', +d[0].join('')]},
    {"name": "String", "symbols": ["StringSingleDelimiter", "StringSingleContents", "StringSingleDelimiter"], "postprocess": d => ['string', d[1]]},
    {"name": "StringSingleDelimiter", "symbols": [{"literal":"'"}]},
    {"name": "StringSingleContents$ebnf$1", "symbols": []},
    {"name": "StringSingleContents$ebnf$1", "symbols": ["StringSingleCharacter", "StringSingleContents$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "StringSingleContents", "symbols": ["StringSingleContents$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "StringSingleCharacter", "symbols": ["AnyCharacter"], "postprocess": (d, l, e) => d[0] === "'" ? e : d[0]},
    {"name": "AnyCharacter", "symbols": [/./], "postprocess": d => d[0]}
]
  , ParserStart: "Program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
