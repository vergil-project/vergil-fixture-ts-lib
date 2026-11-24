import { camelCase, kebabCase } from "change-case";

function words(text: string): string[] {
  return text.split(/\s+/u).filter((word) => word !== "");
}

/**
 * Counts the whitespace-separated words in `text`.
 *
 * @example
 * wordCount("the quick  brown fox"); // 4
 */
export function wordCount(text: string): number {
  return words(text).length;
}

/**
 * The upper-cased first letter of each whitespace-separated word in `text`.
 *
 * @example
 * initials("Ada Lovelace"); // "AL"
 */
export function initials(text: string): string {
  // A word's first character is a non-space with no non-space before it.
  return Array.from(text.matchAll(/(?<!\S)\S/gu), (match) => match[0].toUpperCase()).join("");
}

/**
 * The whitespace-separated words of `text` in reverse order, joined by single spaces.
 *
 * @example
 * reverseWords("the quick  brown fox"); // "fox brown quick the"
 */
export function reverseWords(text: string): string {
  return words(text).reverse().join(" ");
}

/**
 * The longest whitespace-separated word in `text`, measured in characters
 * (code points); the first one on a tie, and `""` for blank text.
 *
 * @example
 * longestWord("the quick  brown fox"); // "quick"
 */
export function longestWord(text: string): string {
  let longest = "";
  let longestLength = 0;
  for (const word of words(text)) {
    const length = Array.from(word).length;
    if (length > longestLength) {
      longest = word;
      longestLength = length;
    }
  }
  return longest;
}

/**
 * The shortest whitespace-separated word in `text`, measured in characters
 * (code points); the first one on a tie, and `""` for blank text.
 *
 * @example
 * shortestWord("the quick  brown fox"); // "the"
 */
export function shortestWord(text: string): string {
  let shortest = "";
  let shortestLength = Number.POSITIVE_INFINITY;
  for (const word of words(text)) {
    const length = Array.from(word).length;
    if (length < shortestLength) {
      shortest = word;
      shortestLength = length;
    }
  }
  return shortest;
}

/**
 * The distinct whitespace-separated words of `text`, in the order each first
 * appears, compared exactly (case-sensitive); `[]` for blank text.
 *
 * @example
 * uniqueWords("the cat saw the  dog"); // ["the", "cat", "saw", "dog"]
 */
export function uniqueWords(text: string): string[] {
  return [...new Set(words(text))];
}

/**
 * The distinct whitespace-separated words of `text` that occur more than
 * once, in the order each first appears, compared exactly (case-sensitive);
 * `[]` when no word repeats.
 *
 * @example
 * repeatedWords("the cat saw the  dog and the cat"); // ["the", "cat"]
 */
export function repeatedWords(text: string): string[] {
  const counts = new Map<string, number>();
  for (const word of words(text)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts].filter(([, count]) => count > 1).map(([word]) => word);
}

/**
 * The whitespace-separated words of `text`, each with its first character
 * (code point) upper-cased and the rest left as they are, joined by single
 * spaces; `""` for blank text.
 *
 * @example
 * capitalizeWords("the quick  brown fox"); // "The Quick Brown Fox"
 */
export function capitalizeWords(text: string): string {
  return words(text)
    .map((word) => word.replace(/^./u, (first) => first.toUpperCase()))
    .join(" ");
}

/**
 * The first `count` whitespace-separated words of `text`, joined by single
 * spaces; all of them when `text` has fewer, and `""` for a `count` of 0.
 *
 * @throws {RangeError} when `count` is not a non-negative integer.
 *
 * @example
 * truncateWords("the quick  brown fox", 2); // "the quick"
 */
export function truncateWords(text: string, count: number): string {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError(`count must be a non-negative integer, not ${String(count)}`);
  }
  return words(text).slice(0, count).join(" ");
}

/**
 * How many times `word` occurs among the whitespace-separated words of
 * `text`, compared exactly (case-sensitive); 0 when it does not occur.
 *
 * @throws {RangeError} when `word` is empty or contains whitespace.
 *
 * @example
 * countWord("the cat saw the  dog", "the"); // 2
 */
export function countWord(text: string, word: string): number {
  if (word === "" || /\s/u.test(word)) {
    throw new RangeError(`word must be one word with no whitespace, not ${JSON.stringify(word)}`);
  }
  return words(text).filter((candidate) => candidate === word).length;
}

/**
 * The length of each whitespace-separated word of `text`, in order, measured
 * in characters (code points); `[]` for blank text.
 *
 * @example
 * wordLengths("the quick  brown fox"); // [3, 5, 5, 3]
 */
export function wordLengths(text: string): number[] {
  return words(text).map((word) => Array.from(word).length);
}

/**
 * The first whitespace-separated word of `text`; `""` for blank text.
 *
 * @example
 * firstWord(" the quick  brown fox"); // "the"
 */
export function firstWord(text: string): string {
  return words(text).at(0) ?? "";
}

/**
 * The last whitespace-separated word of `text`; `""` for blank text.
 *
 * @example
 * lastWord("the quick  brown fox "); // "fox"
 */
export function lastWord(text: string): string {
  return words(text).at(-1) ?? "";
}

/**
 * The mean length of the whitespace-separated words of `text`, measured in
 * characters (code points); 0 for blank text.
 *
 * @example
 * averageWordLength("the quick  brown fox"); // 4
 */
export function averageWordLength(text: string): number {
  const lengths = wordLengths(text);
  if (lengths.length === 0) {
    return 0;
  }
  return lengths.reduce((total, length) => total + length, 0) / lengths.length;
}

/**
 * `text` as a lower-case, hyphen-separated slug, by `change-case`'s `kebabCase`.
 *
 * @example
 * toSlug("Hello, World"); // "hello-world"
 */
export function toSlug(text: string): string {
  return kebabCase(text);
}

/**
 * `text` as a camel-case identifier, by `change-case`'s `camelCase`.
 *
 * @example
 * toIdentifier("word count"); // "wordCount"
 */
export function toIdentifier(text: string): string {
  return camelCase(text);
}
