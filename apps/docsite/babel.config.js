const tsconfig = require('../../tsconfig.base.json');
const paths = tsconfig.compilerOptions.paths;
const alias = Object.keys(paths).reduce(
  (aliases, k) => ({ ...aliases, [k]: './' + paths[k][0] }),
  {}
);
console.log('ALIASES>>>>', alias);

module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: alias
      }
    ]
  ]
};
