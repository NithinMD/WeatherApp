// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      parser: 'espree', // or 'babel-eslint'
    },
  ],
  // ... rest of your config
};
