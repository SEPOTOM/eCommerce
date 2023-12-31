module.exports = {
    'env': {
      'browser': true,
      'es2021': true,
    },
    'extends': [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb-base',
      'airbnb-typescript/base',
      'prettier',
      'plugin:prettier/recommended',
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
      'project': './tsconfig.json',
      'tsconfigRootDir': __dirname,
    },
    'plugins': [
      '@typescript-eslint',
      'prettier',
    ],
    'rules': {
      'indent': [
        'error',
        2,
      ],
      'linebreak-style': [
        'error',
        'unix',
      ],
      'quotes': [
        'error',
        'single',
      ],
      'semi': [
        'error',
        'always',
      ],
  
      'max-lines-per-function': ['warn', 40],
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    },
    'ignorePatterns': ['.eslintrc.js'],
};
