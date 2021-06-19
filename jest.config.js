const pkg = require('./package.json');

module.exports = {
  globals: {
    __VERSION__: pkg.version,
  },
  moduleNameMapper: {
    '@ai/bridge$': '<rootDir>/src/index.ts',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
  },
};
