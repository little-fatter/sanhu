// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("apl", function() {
  var builtInOps = {
    ".": "innerProduct",
    "\\": "scan",
    "/": "reduce",
    "鈱?: "reduce1Axis",
    "鈲€": "scan1Axis",
    "篓": "each",
    "鈲?: "power"
  };
  var builtInFuncs = {
    "+": ["conjugate", "add"],
    "鈭?: ["negate", "subtract"],
    "脳": ["signOf", "multiply"],
    "梅": ["reciprocal", "divide"],
    "鈱?: ["ceiling", "greaterOf"],
    "鈱?: ["floor", "lesserOf"],
    "鈭?: ["absolute", "residue"],
    "鈲?: ["indexGenerate", "indexOf"],
    "?": ["roll", "deal"],
    "铈?: ["exponentiate", "toThePowerOf"],
    "鈲?: ["naturalLog", "logToTheBase"],
    "鈼?: ["piTimes", "circularFuncs"],
    "!": ["factorial", "binomial"],
    "鈱?: ["matrixInverse", "matrixDivide"],
    "<": [null, "lessThan"],
    "铌?: [null, "lessThanOrEqual"],
    "=": [null, "equals"],
    ">": [null, "greaterThan"],
    "铌?: [null, "greaterThanOrEqual"],
    "铌?: [null, "notEqual"],
    "铌?: ["depth", "match"],
    "铌?: [null, "notMatch"],
    "鈭?: ["enlist", "membership"],
    "鈲?: [null, "find"],
    "鈭?: ["unique", "union"],
    "鈭?: [null, "intersection"],
    "鈭?: ["not", "without"],
    "鈭?: [null, "or"],
    "鈭?: [null, "and"],
    "鈲?: [null, "nor"],
    "鈲?: [null, "nand"],
    "鈲?: ["shapeOf", "reshape"],
    ",": ["ravel", "catenate"],
    "鈲?: [null, "firstAxisCatenate"],
    "鈱?: ["reverse", "rotate"],
    "鈯?: ["axis1Reverse", "axis1Rotate"],
    "鈲?: ["transpose", null],
    "鈫?: ["first", "take"],
    "鈫?: [null, "drop"],
    "鈯?: ["enclose", "partitionWithAxis"],
    "鈯?: ["diclose", "pick"],
    "鈱?: [null, "index"],
    "鈲?: ["gradeUp", null],
    "鈲?: ["gradeDown", null],
    "鈯?: ["encode", null],
    "鈯?: ["decode", null],
    "鈲?: ["format", "formatByExample"],
    "鈲?: ["execute", null],
    "鈯?: ["stop", "left"],
    "鈯?: ["pass", "right"]
  };

  var isOperator = /[\.\/鈱库崁篓鈲/;
  var isNiladic = /鈲?;
  var isFunction = /[\+鈭捗椕封寛鈱娾垼鈲砛?铈嗏崯鈼?鈱?铌?>铌モ墵铌♀墷鈭堚嵎鈭埄鈭尖埁鈭р嵄鈲测嵈,鈲尳鈯栤崏鈫戋啌鈯傗妰鈱封崑鈲掆姢鈯モ崟鈲庘姡鈯/;
  var isArrow = /鈫?;
  var isComment = /[鈲?].*$/;

  var stringEater = function(type) {
    var prev;
    prev = false;
    return function(c) {
      prev = c;
      if (c === type) {
        return prev === "\\";
      }
      return true;
    };
  };
  return {
    startState: function() {
      return {
        prev: false,
        func: false,
        op: false,
        string: false,
        escape: false
      };
    },
    token: function(stream, state) {
      var ch, funcName;
      if (stream.eatSpace()) {
        return null;
      }
      ch = stream.next();
      if (ch === '"' || ch === "'") {
        stream.eatWhile(stringEater(ch));
        stream.next();
        state.prev = true;
        return "string";
      }
      if (/[\[{\(]/.test(ch)) {
        state.prev = false;
        return null;
      }
      if (/[\]}\)]/.test(ch)) {
        state.prev = true;
        return null;
      }
      if (isNiladic.test(ch)) {
        state.prev = false;
        return "niladic";
      }
      if (/[炉\d]/.test(ch)) {
        if (state.func) {
          state.func = false;
          state.prev = false;
        } else {
          state.prev = true;
        }
        stream.eatWhile(/[\w\.]/);
        return "number";
      }
      if (isOperator.test(ch)) {
        return "operator apl-" + builtInOps[ch];
      }
      if (isArrow.test(ch)) {
        return "apl-arrow";
      }
      if (isFunction.test(ch)) {
        funcName = "apl-";
        if (builtInFuncs[ch] != null) {
          if (state.prev) {
            funcName += builtInFuncs[ch][1];
          } else {
            funcName += builtInFuncs[ch][0];
          }
        }
        state.func = true;
        state.prev = false;
        return "function " + funcName;
      }
      if (isComment.test(ch)) {
        stream.skipToEnd();
        return "comment";
      }
      if (ch === "鈭? && stream.peek() === ".") {
        stream.next();
        return "function jot-dot";
      }
      stream.eatWhile(/[\w\$_]/);
      state.prev = true;
      return "keyword";
    }
  };
});

CodeMirror.defineMIME("text/apl", "apl");

});
