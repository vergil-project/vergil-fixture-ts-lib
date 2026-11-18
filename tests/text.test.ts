import { describe, expect, it } from "vitest";

import {
  capitalizeWords,
  initials,
  longestWord,
  reverseWords,
  toIdentifier,
  toSlug,
  truncateWords,
  uniqueWords,
  wordCount,
} from "../src/index.js";

describe("wordCount", () => {
  it("counts whitespace-separated words", () => {
    expect(wordCount("the quick  brown fox")).toBe(4);
    expect(wordCount("\tone\ntwo ")).toBe(2);
  });

  it("counts no words in blank text", () => {
    expect(wordCount("")).toBe(0);
    expect(wordCount("   ")).toBe(0);
  });
});

describe("initials", () => {
  it("upper-cases the first letter of each word", () => {
    expect(initials("Ada Lovelace")).toBe("AL");
    expect(initials("émilie du châtelet")).toBe("ÉDC");
  });

  it("keeps a first character outside the Basic Multilingual Plane whole", () => {
    expect(initials("𝒜da lovelace")).toBe("𝒜L");
  });

  it("gives nothing for blank text", () => {
    expect(initials("  ")).toBe("");
  });
});

describe("reverseWords", () => {
  it("reverses the words, joined by single spaces", () => {
    expect(reverseWords("the quick  brown fox")).toBe("fox brown quick the");
  });

  it("gives nothing for blank text", () => {
    expect(reverseWords("   ")).toBe("");
  });
});

describe("longestWord", () => {
  it("gives the longest word, the first one on a tie", () => {
    expect(longestWord("the quick  brown fox")).toBe("quick");
    expect(longestWord("ab cd")).toBe("ab");
  });

  it("measures a word in characters, not UTF-16 code units", () => {
    expect(longestWord("𝒜𝒜 abc")).toBe("abc");
  });

  it("gives nothing for blank text", () => {
    expect(longestWord("   ")).toBe("");
  });
});

describe("uniqueWords", () => {
  it("gives each word once, in the order it first appears", () => {
    expect(uniqueWords("the cat saw the  dog")).toEqual(["the", "cat", "saw", "dog"]);
  });

  it("compares words exactly, so case matters", () => {
    expect(uniqueWords("The the THE the")).toEqual(["The", "the", "THE"]);
  });

  it("gives nothing for blank text", () => {
    expect(uniqueWords("   ")).toEqual([]);
  });
});

describe("capitalizeWords", () => {
  it("upper-cases the first letter of each word, joined by single spaces", () => {
    expect(capitalizeWords("the quick  brown fox")).toBe("The Quick Brown Fox");
    expect(capitalizeWords("émilie du\tchâtelet")).toBe("Émilie Du Châtelet");
  });

  it("leaves the rest of each word as it is", () => {
    expect(capitalizeWords("mcDonald iPHONE")).toBe("McDonald IPHONE");
  });

  it("keeps a first character outside the Basic Multilingual Plane whole", () => {
    expect(capitalizeWords("𝒜da lovelace")).toBe("𝒜da Lovelace");
  });

  it("gives nothing for blank text", () => {
    expect(capitalizeWords("   ")).toBe("");
  });
});

describe("truncateWords", () => {
  it("gives the first count words, joined by single spaces", () => {
    expect(truncateWords("the quick  brown fox", 2)).toBe("the quick");
    expect(truncateWords("\tone\ntwo three", 2)).toBe("one two");
  });

  it("gives every word when the text has fewer than count", () => {
    expect(truncateWords("the quick  brown fox", 9)).toBe("the quick brown fox");
  });

  it("gives nothing for a count of 0 or blank text", () => {
    expect(truncateWords("the quick brown fox", 0)).toBe("");
    expect(truncateWords("   ", 3)).toBe("");
  });

  it.each([-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])("rejects a count of %s", (count) => {
    expect(() => truncateWords("the quick brown fox", count)).toThrow(
      new RangeError(`count must be a non-negative integer, not ${String(count)}`),
    );
  });
});

describe("toSlug", () => {
  it("makes a lower-case, hyphen-separated slug", () => {
    expect(toSlug("Hello, World")).toBe("hello-world");
    expect(toSlug("wordCount")).toBe("word-count");
  });
});

describe("toIdentifier", () => {
  it("makes a camel-case identifier", () => {
    expect(toIdentifier("word count")).toBe("wordCount");
    expect(toIdentifier("reverse-words")).toBe("reverseWords");
  });
});
