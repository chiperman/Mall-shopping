module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'no-tabs': 'off',
    'quotes': [1, "single"],
    'semi': 'off',
    "camelcase": ["error", {
      "allow": ["aa_bb"]
    }],
    "operator-linebreak": [2, "before", {
      "overrides": {
        "?": "after",
        ":": "after",
      }
    }],
    "no-unused-expressions": "off"
  }
}
