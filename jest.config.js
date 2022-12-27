module.exports = {
  globals: {
    __DEV__: false,
    __JEST__: true,
  },
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testRegex: '(\\.(test))\\.(js|ts|tsx)$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
  coverageDirectory: '<rootDir>/coverage~~',
  collectCoverageFrom: ['app/**/*.{ts,tsx,js}'],
  testEnvironment: 'jsdom',
}
