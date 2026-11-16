# vergil-fixture-ts-lib

!!! warning "A test fixture, not a real library"

    This package is a Vergil test fixture. It has no users, and it is never
    published to npm.

`vergil-fixture-ts-lib` is a small TypeScript library that exists so Vergil's
TypeScript support has a real library to work on. Each fixture run makes a
small change to it and drives that change through Vergil's whole cycle for
real: the PR, CI, the merge, the release and this docs site. A step that
breaks shows up here before it reaches a real TypeScript repo.

It exercises:

- `vrg-validate` for TypeScript: Prettier, then ESLint, `tsc` and Vitest from
  the repo's own `node_modules`, the build to `dist/`, the tests at 100% line
  coverage, and the `npm audit` and license checks;
- the CI and release workflows a real TypeScript library gets, with every
  fleet automation enabled;
- two real runtime dependencies, `zod` and `change-case`, so the audit, the
  license check and Dependabot have real work to do.

Why the fixtures exist, and how a fixture run works, is set out in the
[language fixture repos spec](https://github.com/vergil-project/.github/blob/develop/epics/1091-language-fixture-repos/spec.md).

## Next

- [Getting Started](getting-started.md): build and test the library.
- [API](api.md): the library's public functions.
