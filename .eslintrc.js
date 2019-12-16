module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',

  env: {
    'jest/globals': true,
  },

  globals: {
    Blob: true,
    document: true,
    FileReader: true,
    FormData: true,
    Image: true,
    window: true,
  },

  settings: {
    'import/resolver': {
      'babel-module': {
        'root': ['./app/javascript/src'],
      },
    },
  },

  plugins: [
    'jest',
  ],

  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
      imports: 'always-multiline',
      objects: 'always-multiline',
    }],

    'function-paren-newline': ['off'],
    'import/prefer-default-export': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'no-underscore-dangle': ['off'],

    semi: ['error', 'never'],

    'react/prop-types': ['off'],
    'react/forbid-prop-types': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/no-multi-comp': ['off'],
  },
}
