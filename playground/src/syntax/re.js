// Based on https://github.com/microsoft/monaco-editor/commit/c123d330e718ff424bb5bff6bf5bf1bb2ec46cb1
export const conf = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    ["<", ">"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "<", close: ">" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "<", close: ">" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
};

export const language = {
  defaultToken: "",
  tokenPostfix: ".re",
  ignoreCase: true,

  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" },
    { open: "<", close: ">", token: "delimiter.angle" },
  ],

  keywords: [
    "and",
    "as",
    "assert",
    "begin",
    "class",
    "constraint",
    "do",
    "done",
    "downto",
    "else",
    "end",
    "esfun",
    "exception",
    "external",
    "for",
    "fun",
    "function",
    "functor",
    "if",
    "in",
    "include",
    "inherit",
    "initializer",
    "lazy",
    "let",
    "module",
    "mutable",
    "new",
    "nonrec",
    "object",
    "of",
    "open",
    "pri",
    "pub",
    "rec",
    "sig",
    "struct",
    "switch",
    "then",
    "to",
    "try",
    "type",
    "val",
    "virtual",
    "when",
    "while",
    "with",
  ],

  typeKeywords: [
    "array",
    "bool",
    "bytes",
    "char",
    "exn",
    "float",
    "int",
    "int32",
    "int64",
    "list",
    "lazy_t",
    "nativeint",
    "string",
    "unit",
  ],

  operators: [
    "+",
    "-",
    "~-",
    "-",
    "*",
    "/",
    "mod",
    "land",
    "lor",
    "lxor",
    "lsl",
    "lsr",
    "asr",
    "+.",
    "-.",
    "~-.",
    "-.",
    "*.",
    "/.",
    "**",
    "@",
    "^",
    "!",
    ":=",
    "=",
    "<>",
    "==",
    "!=",
    "<",
    "<=",
    ">",
    ">=",
    "&&",
    "&",
    "||",
    "or",
  ],

  // we include these common regular expressions
  symbols: /[=><:@\^&|+\-*\/\^%]+/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-zA-Z_][\w]*/,
        {
          cases: {
            "@keywords": { token: "keyword.$0" },
            "@default": "identifier",
          },
        },
      ],

      // whitespace
      { include: "@whitespace" },

      // delimiters and operators
      [/[{}()\[\]]/, "@brackets"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "delimiter",
            "@default": "",
          },
        },
      ],

      // numbers
      [/0[xX][a-fA-F0-9_]+[Lln]?/, "number.hex"],
      [/0[oO][0-7_]+[Lln]?/, "number.octal"],
      [/0[bB][01_]+[Lln]?/, "number.bin"],
      [/[0-9][0-9_]*(\.[0-9_]*)?([eE][-+]?[0-9_]+)/, "number.float"],
      [/[0-9][0-9_]*[Lln]?/, "number"],

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, "string", "@string"],

      // characters
      [/'[^\\']'/, "string"],
      [/'/, "string.invalid"],
    ],
    /* */

    comment: [
      [/[^\/\*]+/, "comment"],
      [/\/\*/, "comment", "@push"], // nested comments
      [/\*\//, "comment", "@pop"],
      [/\/\*/, "comment"],
    ],

    string: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],
  },
};
