const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
   root: true,
   extends: [
      require.resolve('@vercel/style-guide/eslint/node'),
      require.resolve('@vercel/style-guide/eslint/typescript'),
      require.resolve('@vercel/style-guide/eslint/browser'),
      require.resolve('@vercel/style-guide/eslint/react'),
      require.resolve('@vercel/style-guide/eslint/next'),
   ],
   parserOptions: {
      project,
   },
   settings: {
      'import/resolver': {
         typescript: {
            project,
         },
      },
   },
   rules: {
      '@typescript-eslint/no-unused-vars': [
         'error',
         {
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
         },
      ],
      '@typescript-eslint/no-empty-interface': [
         'error',
         {
            allowSingleExtends: true,
         },
      ],
      '@typescript-eslint/no-shadow': [
         'error',
         {
            ignoreOnInitialization: true,
         },
      ],
      'import/newline-after-import': 'error',
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'error',
      'unicorn/filename-case': [
         'error',
         {
            cases: {
               kebabCase: true, // personal style
               pascalCase: true,
            },
         },
      ],

      // Deactivated rules
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/restrict-template-expressions': [
         'error',
         {
            allowNumber: true,
         },
      ],
      'import/no-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/order': 'off',
      'import/no-named-as-default': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-return': 'off', // Turned off project-wide
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'no-nested-ternary': 'off',
      'no-redeclare': 'off',
      'react/jsx-fragments': 'off',
      'react/prop-types': 'off',
      'no-console': 'off',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      camelcase: 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      eqeqeq: 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
   },
};
