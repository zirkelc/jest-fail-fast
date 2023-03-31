import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default',
  testEnvironment: './jest-fail-fast-env.ts',
};

export default config;