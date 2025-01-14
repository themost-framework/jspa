import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**"
    ]
  },
  {
    files: [
      "**/*.{ts}"
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  ...tseslint.configs.recommended,
];