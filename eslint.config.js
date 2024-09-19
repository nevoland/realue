import jsConfig from "@eslint/js";
import parser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import infernoPlugin from "eslint-plugin-inferno";
import reactPlugin from "eslint-plugin-react";
import sortkeysPlugin from "eslint-plugin-sort-keys";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import vitestPlugin from "eslint-plugin-vitest";

const GLOBAL_NAME_LIST = [
  "AbortController",
  "AbortSignal",
  "console",
  "document",
  "Element",
  "fetch",
  "HTMLElement",
  "HTMLInputElement",
  "NoInfer",
  "process",
  "Request",
  "ResizeObserverBoxOptions",
  "ResizeObserverCallback",
  "ResizeObserverEntry",
];

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: ["dist/**/*", "node_modules/**/*", "lib/old/**/*", "src/old/**/*"],
    languageOptions: {
      globals: {
        ...((keyList) => Object.fromEntries(keyList.map((key) => [key, true])))(
          GLOBAL_NAME_LIST,
        ),
      },
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    plugins: {
      import: importPlugin,
      inferno: infernoPlugin,
      react: reactPlugin,
      sortkeys: sortkeysPlugin,
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      ...jsConfig.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      ...tailwindcssPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
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
      "func-names": ["error", "always"],
      "id-length": [
        "error",
        {
          exceptions: [
            "_",
            "a",
            "b",
            "fs",
            "i",
            "id",
            "io",
            "j",
            "on",
            "to",
            "x",
            "y",
          ],
          min: 3,
          properties: "never",
        },
      ],
      "import/extensions": ["error", "always", { ignorePackages: true }],
      "import/no-duplicates": "error",
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "always",
        },
      ],
      "inferno/jsx-props-class-name": ["error", "class"],
      "jest/no-deprecated-functions": "off",
      "line-comment-position": [
        "error",
        {
          position: "above",
        },
      ],
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
      "no-redeclare": "off",
      "no-sequences": "error",
      "no-unused-vars": "off",
      "no-var": "error",
      "object-shorthand": ["error", "properties"],
      "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
      "prefer-const": "error",
      "prettier/prettier": "off",
      quotes: [
        "error",
        "double",
        {
          allowTemplateLiterals: false,
          avoidEscape: true,
        },
      ],
      "react/jsx-boolean-value": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          children: "ignore",
          props: "never",
        },
      ],
      "react/jsx-key": "off",
      "react/jsx-sort-props": "error",
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: true,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      "sort-keys": "off",
      "sortkeys/sort-keys-fix": "off",
      "spaced-comment": [
        "error",
        "always",
        {
          line: {
            markers: ["/"],
          },
        },
      ],
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      ...importPlugin.configs.typescript.settings,
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
    },
  },
];
