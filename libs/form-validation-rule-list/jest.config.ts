/* eslint-disable */
export default {
  displayName: 'form-validation-rule-list',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/form-validation-rule-list',
  coverageReporters: ['html', 'lcov'],
};
