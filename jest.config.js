module.exports = {
  globals: {
    __VERSION__: require('./lerna.json').version,
  },
  moduleNameMapper: {
    '@ai/bridge$': '<rootDir>/packages/bridge/src/index.ts',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};
