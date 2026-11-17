# vergil-fixture-ts-lib

This is a Vergil test fixture: a small TypeScript library with no users. It
exists so Vergil's TypeScript support has a real library to validate, build,
release and document, and it serves as a reference example of a well-formed
Vergil TypeScript library. Why it exists and how it is used are set out in the
[language fixture repos spec](https://github.com/vergil-project/.github/blob/develop/epics/1091-language-fixture-repos/spec.md)
(`epics/1091-language-fixture-repos/spec.md` in `vergil-project/.github`).

## Table of Contents

- [Status](#status)
- [Overview](#overview)
- [Getting Started](#getting-started)
- [License](#license)

## Status

A test fixture. It is never published to npm.

## Overview

Each fixture run makes a small change to the library, one more function, and
drives it through Vergil's whole cycle for real: the PR, CI, the merge, the
release and the docs site. The fixture exercises:

- `vrg-validate` for TypeScript: Prettier, then ESLint, `tsc` and Vitest from
  the repo's own `node_modules`, the build to `dist/` with declaration files,
  the tests at 100% line coverage, and the `npm audit` and license checks;
- the CI and release workflows of a Vergil TypeScript library, with every
  fleet automation enabled;
- two real runtime dependencies, `zod` and `change-case`.

Its public API is made up of the functions `greet`, `parseGreeting`,
`renderGreeting`, `wordCount`, `initials`, `reverseWords`, `toSlug` and
`toIdentifier`, plus the `Greeting` type and the `GreetingError` class.

## Getting Started

```bash
vrg-container-run -- vrg-validate
```

See the [documentation](https://vergil-project.github.io/vergil-fixture-ts-lib/)
for the API and the library's layout.

## License

MIT — see [LICENSE](LICENSE).
