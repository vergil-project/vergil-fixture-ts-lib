# API

Everything public is exported from the package's one entry point,
`vergil-fixture-ts-lib` (`src/index.ts`). The build emits it to `dist/`, with
declaration files beside the JavaScript.

## Greetings

### `greet`

```ts
function greet(name: string): string;
```

Greets `name`, trimmed of surrounding whitespace. A blank name greets the
world.

```ts
import { greet } from "vergil-fixture-ts-lib";

greet("Ada"); // "Hello, Ada"
greet("  Grace "); // "Hello, Grace"
greet(""); // "Hello, world"
```

### `parseGreeting` and `Greeting`

```ts
function parseGreeting(json: string): Greeting;

interface Greeting {
  readonly name: string;
  readonly punctuation?: string;
}
```

`parseGreeting` reads a greeting from a JSON object with a required string
`name` and an optional string `punctuation`, and trims the name. It checks the
object's shape with `zod`.

```ts
import { parseGreeting, renderGreeting } from "vergil-fixture-ts-lib";

const greeting = parseGreeting('{"name": "Ada", "punctuation": "!"}');
renderGreeting(greeting); // "Hello, Ada!"
```

It throws a `GreetingError` whose `kind` is:

- `"json"` when the input is not JSON;
- `"shape"` when the JSON is not an object, has no string `name`, has a
  `punctuation` that is not a string, or has any other field;
- `"blank-name"` when the name is empty or only whitespace.

### `renderGreeting`

```ts
function renderGreeting(greeting: Greeting): string;
```

The greeting as text: `greet` of its name, then its punctuation.

```ts
import { renderGreeting } from "vergil-fixture-ts-lib";

renderGreeting({ name: "Ada", punctuation: "!" }); // "Hello, Ada!"
renderGreeting({ name: "Ada" }); // "Hello, Ada"
```

### `GreetingError` and `GreetingErrorKind`

```ts
type GreetingErrorKind = "json" | "shape" | "blank-name";

class GreetingError extends Error {
  readonly kind: GreetingErrorKind;
}
```

The error `parseGreeting` throws. `kind` says why the input was rejected, and
`cause` carries the underlying JSON or `zod` error where there is one.

## Text

### `wordCount`

```ts
function wordCount(text: string): number;
```

Counts the whitespace-separated words in `text`.

```ts
import { wordCount } from "vergil-fixture-ts-lib";

wordCount("the quick  brown fox"); // 4
wordCount(""); // 0
```

### `initials`

```ts
function initials(text: string): string;
```

The upper-cased first letter of each whitespace-separated word in `text`.

```ts
import { initials } from "vergil-fixture-ts-lib";

initials("Ada Lovelace"); // "AL"
initials("émilie du châtelet"); // "ÉDC"
```

### `reverseWords`

```ts
function reverseWords(text: string): string;
```

The whitespace-separated words of `text` in reverse order, joined by single
spaces.

```ts
import { reverseWords } from "vergil-fixture-ts-lib";

reverseWords("the quick  brown fox"); // "fox brown quick the"
reverseWords("   "); // ""
```

### `longestWord`

```ts
function longestWord(text: string): string;
```

The longest whitespace-separated word in `text`, measured in characters (code
points). On a tie it gives the first such word, and for blank text `""`.

```ts
import { longestWord } from "vergil-fixture-ts-lib";

longestWord("the quick  brown fox"); // "quick"
longestWord("   "); // ""
```

### `uniqueWords`

```ts
function uniqueWords(text: string): string[];
```

The distinct whitespace-separated words of `text`, in the order each first
appears. Words are compared exactly, so `"The"` and `"the"` are different
words. For blank text it gives `[]`.

```ts
import { uniqueWords } from "vergil-fixture-ts-lib";

uniqueWords("the cat saw the  dog"); // ["the", "cat", "saw", "dog"]
uniqueWords("   "); // []
```

### `capitalizeWords`

```ts
function capitalizeWords(text: string): string;
```

The whitespace-separated words of `text`, each with its first character (code
point) upper-cased and the rest left as they are, joined by single spaces. For
blank text it gives `""`.

```ts
import { capitalizeWords } from "vergil-fixture-ts-lib";

capitalizeWords("the quick  brown fox"); // "The Quick Brown Fox"
capitalizeWords("   "); // ""
```

### `truncateWords`

```ts
function truncateWords(text: string, count: number): string;
```

The first `count` whitespace-separated words of `text`, joined by single
spaces. When `text` has fewer than `count` words it gives all of them, and for
a `count` of 0 it gives `""`. It throws a `RangeError` when `count` is not a
non-negative integer.

```ts
import { truncateWords } from "vergil-fixture-ts-lib";

truncateWords("the quick  brown fox", 2); // "the quick"
truncateWords("the quick  brown fox", 9); // "the quick brown fox"
```

### `toSlug`

```ts
function toSlug(text: string): string;
```

`text` as a lower-case, hyphen-separated slug, by `change-case`'s
`kebabCase`.

```ts
import { toSlug } from "vergil-fixture-ts-lib";

toSlug("Hello, World"); // "hello-world"
toSlug("wordCount"); // "word-count"
```

### `toIdentifier`

```ts
function toIdentifier(text: string): string;
```

`text` as a camel-case identifier, by `change-case`'s `camelCase`.

```ts
import { toIdentifier } from "vergil-fixture-ts-lib";

toIdentifier("word count"); // "wordCount"
toIdentifier("reverse-words"); // "reverseWords"
```
