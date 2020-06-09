const { resolve } = require('path');

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: resolve(__dirname, '__tests__', 'coverage'),
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.(spec|test).[jt]s',
  ],
};
