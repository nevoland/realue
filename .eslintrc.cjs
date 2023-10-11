module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["import", "inferno", "tailwindcss"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/typescript",
    "preact",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      plugins: ["vitest"],
      extends: ["plugin:vitest/recommended"],
    },
  ],
  rules: {
    "prettier/prettier": "off",
    "tailwindcss/classnames-order": "off",
    "tailwindcss/no-custom-classname": "off",
    "inferno/jsx-props-class-name": ["error", "class"],
    "arrow-body-style": ["error", "as-needed"],
    camelcase: [
      "error",
      {
        allow: ["^UNSAFE_"],
        properties: "always",
      },
    ],
    curly: "error",
    "default-case": "error",
    eqeqeq: [
      "error",
      "always",
      {
        null: "never",
      },
    ],
    // "func-names": ["error", "always"],
    "id-length": [
      "error",
      {
        min: 3,
        properties: "never",
        exceptions: ["a", "b", "x", "y", "i", "j", "_", "io", "id", "fs", "to"],
      },
    ],
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "jest/no-deprecated-functions": "off",
    "line-comment-position": [
      "error",
      {
        position: "above",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          "@material-ui/core/styles",
          "!@material-ui/core/*",
          "!@material-ui/icons/*",
          "!@material-ui/styles/*",
        ],
      },
    ],
    "no-sequences": "error",
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
    ],
    "no-irregular-whitespace": [
      "error",
      {
        skipStrings: true,
        skipTemplates: true,
      },
    ],
    "no-param-reassign": "error",
    "no-unused-vars": "off",
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      },
    ],
    "no-var": "error",
    "no-redeclare": "off",
    "object-shorthand": ["error", "properties"],
    // "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "prefer-arrow-callback": "off",
    "prefer-const": "error",
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    "react/jsx-key": "off",
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": [
      "error",
      {
        children: "ignore",
        props: "never",
      },
    ],
    "spaced-comment": ["error", "always"],
  },
};
