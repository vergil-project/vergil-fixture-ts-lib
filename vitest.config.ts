import { defineConfig } from "vitest/config";

// Vergil's TEST gate sets the coverage provider, the 100% line threshold and
// the reports on its command line. This file says which files count: every
// source file, so one no test loads still counts against the threshold.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.ts"],
    },
  },
});
