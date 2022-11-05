/* eslint-disable */
export default {
  displayName: 'form-builder',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/form-builder',
  coverageReporters: ['html', 'lcov'],
};
