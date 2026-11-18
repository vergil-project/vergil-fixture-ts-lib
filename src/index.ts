// The library's public API: everything public is exported from here.

export { GreetingError } from "./errors.js";
export type { GreetingErrorKind } from "./errors.js";
export { greet, parseGreeting, renderGreeting } from "./greeting.js";
export type { Greeting } from "./greeting.js";
export {
  capitalizeWords,
  initials,
  longestWord,
  reverseWords,
  toIdentifier,
  toSlug,
  uniqueWords,
  wordCount,
} from "./text.js";
