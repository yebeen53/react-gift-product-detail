import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
  },
  transformIgnorePatterns: [
    '/node_modules/(?!msw|@mswjs/interceptors)/',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json', 
      },
    ],
  },
  globals: {
    'import.meta': {
      env: {
        VITE_API_BASE_URL: '', 
      },
    },
  },
};

export default config;
