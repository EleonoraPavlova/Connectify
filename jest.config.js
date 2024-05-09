module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleNameMapper: {
    style: '<root>/node_modules/jest-css-modules',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./jest.setup.after.env.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  transformIgnorePatterns: ['node_modules/(?!axios)'],
}
