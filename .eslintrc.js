module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    // 禁止 console，要用写 eslint disbale
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止 debugger，防止上线
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 0,
    'import/no-unresolved': 0,
    'comma-dangle': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'import/no-extraneous-dependencies': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    'eol-last': 0,
    'no-unused-expressions': 0,
    'no-underscore-dangle': 0,
    'arrow-parens': 0,
    // 禁止 alert，要用写 eslint disable
    'no-alert': 2,
    // 不用的 var，要删除，手动 tree shaking，要洁癖
    'no-unused-vars': 2,
    // 没定义就用的就别用，全局的要用 写 eslint global
    'no-undef': 2,
    // 可以不用来后缀
    'import/extensions': 0,
    'import/prefer-default-export': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
