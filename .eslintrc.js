module.exports = {
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
  plugins: ['react', '@typescript-eslint'],
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
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
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
  },
}

// {
//   root: true,
//   extends: '@react-native-community',
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint'],
//   rules: {
//     'react/react-in-jsx-scope': 'off',
//     semi: 'off',
//     'prettier/prettier': 'off',
//   },
// }
