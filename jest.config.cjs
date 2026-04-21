module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.cjs',
    '^next/image$': '<rootDir>/__mocks__/nextImageMock.cjs',
    '^react-responsive$': '<rootDir>/__mocks__/reactResponsiveMock.cjs',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/__tests__/**/*.test.js?(x)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    'server/**/*.js',
    '!src/app/layout.js',
    '!src/app/page.js',
  ],
};
