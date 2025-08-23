/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  // 👇 if you’re not using TS, remove parser + @typescript-eslint entries
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',   // remove if JS-only
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',                    // Next’s recommended + strict web vitals
    'eslint-config-prettier',                  // turns off rules that conflict with Prettier
  ],
  rules: {
    // Trim the fat
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',

    // Unused imports/vars
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

    // Clean import ordering
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
  },
  settings: {
    next: { rootDir: true },
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'dist/',
    'coverage/',
  ],
};
