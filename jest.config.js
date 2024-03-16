/* eslint-env node */
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/components/shared$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
    '^@providers(.*)$': '<rootDir>/src/providers$1',
    '^@types$': '<rootDir>/src/types.ts',
    '^@mocks(.*)$': '<rootDir>/__mocks__$1',
  },
  setupFiles: ['./jest.setup.js', 'jest-canvas-mock'],
};
