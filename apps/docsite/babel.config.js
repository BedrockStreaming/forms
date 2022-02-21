const tsconfig = require('../../tsconfig.base.json');

const { paths } = tsconfig.compilerOptions;
const alias = Object.keys(paths).reduce((aliases, k) => ({ ...aliases, [k]: `./${paths[k][0]}` }), {});
// eslint-disable-next-line no-console
console.log('ALIASES>>>>', alias);

module.exports = {
  presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  plugins: [
    [
      // Workaround for docusaurus to recognize NX workspace (libs) aliases
      require.resolve('babel-plugin-module-resolver'),
      {
        alias,
      },
    ],
  ],
};
