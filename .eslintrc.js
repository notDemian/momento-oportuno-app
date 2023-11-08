const isFixMode = process.argv.includes('--fix')
const isFixModeOff = isFixMode ? 'off' : 'warn'

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports',
    'simple-import-sort',
    'prettier',
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    indent: ['warn', 2, { SwitchCase: 1, ignoredNodes: ['JSXElement'] }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: false,
        useTabs: false,
        tabWidth: 2,
        endOfLine: 'auto',
        jsxSingleQuote: true,
        printWidth: 80,
      },
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    ...(isFixMode
      ? {
          '@typescript-eslint/no-unused-vars': [
            'off',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
          ],
          'unused-imports/no-unused-imports': 'off',
          'unused-imports/no-unused-vars': [
            'off',
            {
              vars: 'all',
              varsIgnorePattern: '^_',
              args: 'after-used',
              argsIgnorePattern: '^_',
            },
          ],
          '@typescript-eslint/no-explicit-any': 'off',
          '@typescript-eslint/no-empty-function': 'off',
        }
      : undefined),
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^(@|src)(/.*|$)', '^\\.\\.(?!/?$)'],
              // Internal packages.
              [],
              // Parent imports. Put `..` last.
              [],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ],
          },
        ],
      },
    },
  ],
}

module.exports = config
