# Getting Started

The package is not on npm (a fixture never reaches a package registry), so
work on it from a clone of the repository.

## Validate

Validation runs in Vergil's TypeScript dev image, the same way CI runs it:

```bash
vrg-container-run -- vrg-validate
```

That installs the locked dependencies, checks formatting and lints,
type-checks, builds the library to `dist/`, runs the tests at 100% line
coverage and audits the dependencies. There is no other validation command.

## Build

The `build` script compiles `src/` to `dist/`, with declaration files and
source maps, through `tsconfig.build.json`:

```bash
vrg-container-run -- sh -c "npm ci --ignore-scripts && npm run build"
```

## Layout

| Path                  | What it holds                                                      |
| --------------------- | ------------------------------------------------------------------ |
| `src/index.ts`        | The entry point: the exports that make up the public API           |
| `src/greeting.ts`     | The greeting functions                                             |
| `src/text.ts`         | The text functions                                                 |
| `src/errors.ts`       | The library's error type                                           |
| `tests/`              | One Vitest file per module                                         |
| `tsconfig.json`       | Extends Vergil's managed `tsconfig.vergil.json`; checks everything |
| `tsconfig.build.json` | The build: `src/` only, emitted to `dist/`                         |
| `eslint.config.mjs`   | Builds on Vergil's managed `eslint.vergil.config.mjs`              |
| `vitest.config.ts`    | Which files the tests and their coverage take in                   |

`tsconfig.vergil.json`, `eslint.vergil.config.mjs` and `.prettierrc.json` are
managed by the Vergil fleet sync: never edit them here.

## Adding a function

Each fixture run adds one function, without restructuring the library:

1. Write its tests in the `tests/` file for its theme, or a new one.
2. Add the function, with a doc comment, to the module for its theme, or to a
   new module under `src/`.
3. Export it from `src/index.ts`.
4. Document it on the [API](api.md) page.
5. Add it to the function list in `README.md`.
6. Run `vrg-container-run -- vrg-validate`.
