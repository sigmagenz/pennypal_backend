import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      '**/node_modules/**/*',
      '**/dist/**/*',
      '**/build/**/*',
      '**/public/**/*'
    ],
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended'
    ],
    rules: {
      'prettier/prettier': 'error'
    }
  },
  {
    languageOptions: {
      globals: globals.node
    }
  },
  prettier.config
];
