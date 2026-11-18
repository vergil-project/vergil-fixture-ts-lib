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
