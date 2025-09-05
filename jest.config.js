import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset({}).transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
  },
  setupFiles: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
