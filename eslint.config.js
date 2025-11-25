// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import svelte from 'eslint-plugin-svelte3';
import imports from 'eslint-plugin-import';

export default tseslint.config(
  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Astro
  ...astro.configs['flat/recommended'],
  ...astro.configs['flat/jsx-a11y-recommended'],

  // React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
  },

  // Svelte
  {
    files: ['**/*.svelte'],
    plugins: { svelte },
    processor: 'svelte/svelte',
    rules: {
      ...svelte.configs.recommended.rules,
    },
  },

  // Imports (detecta no usados)
  {
    files: ['**/*.{js,ts,jsx,tsx,astro,svelte}'],
    plugins: { import: imports },
    rules: {
      'import/no-unused-modules': 'error',
    },
  },

  // Reglas globales: unused vars, accesibilidad, etc.
  {
    files: ['**/*.{js,ts,jsx,tsx,astro,svelte}'],
    rules: {
      // Desactiva regla base
      'no-unused-vars': 'off',

      // Activa regla de TS (entiende React, props, JSX)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Accesibilidad (estructura HTML/JSX)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
    },
  },

  // Archivos Astro: parser especial
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astro.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
  },
);