const baseExtends = ["eslint:recommended", "plugin:import/errors", "prettier"];

// Plugins
const basePlugins = [
  "import",
  "sort-keys-fix",
  "sort-class-members",
  "prettier",
];

// Rules
const importOrderOptions = {
  alphabetize: { caseInsensitive: false, order: "asc" },
  groups: ["builtin", "external", "internal"],
  "newlines-between": "never",
  pathGroups: [{ group: "external", pattern: "react", position: "before" }],
  pathGroupsExcludedImportTypes: ["react"],
};

const paddingLineOptions = [
  {
    blankLine: "always",
    next: [
      "block-like",
      "class",
      "export",
      "return",
      "multiline-const",
      "singleline-const",
    ],
    prev: ["*"],
  },
  {
    blankLine: "always",
    next: "*",
    prev: [
      "block-like",
      "import",
      "singleline-const",
      "singleline-let",
      "singleline-var",
    ],
  },
  {
    blankLine: "never",
    next: ["singleline-const", "singleline-let", "singleline-var"],
    prev: ["singleline-const", "singleline-let", "singleline-var"],
  },
  {
    blankLine: "never",
    next: "export",
    prev: "export",
  },
  {
    blankLine: "never",
    next: "import",
    prev: "import",
  },
];

const sortClassMembersOptions = {
  accessorPairPositioning: "getThenSet",
  order: [
    "constructor",
    "[conventional-private-properties]",
    "[properties]",
    "[static-properties]",
    "[static-methods]",
    "[methods]",
    "[conventional-private-methods]",
  ],
};

const baseRules = {
  "consistent-return": 1,
  "import/order": [1, importOrderOptions],
  "lines-between-class-members": 1,
  "no-console": 1,
  "no-unused-vars": 1,
  "padding-line-between-statements": [1, ...paddingLineOptions],
  "prettier/prettier": 1,
  "sort-class-members/sort-class-members": [1, sortClassMembersOptions],
  "sort-keys-fix/sort-keys-fix": 1,
  "sort-vars": [1, { ignoreCase: true }],
};

// Combined Configs
const combinedConfigs = {
  env: { browser: true, es6: true, jest: true, node: true },
  extends: baseExtends,
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: basePlugins,
  // parser: "babel-eslint",
  rules: baseRules,
  settings: {
    "import/resolver": {
      node: { extensions: [".js"] },
    },
    react: { version: "detect" },
  },
};

module.exports = combinedConfigs;
