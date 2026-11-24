import { describe, expect, it } from "vitest";

import {
  averageWordLength,
  capitalizeWords,
  countWord,
  firstWord,
  initials,
  lastWord,
  longestWord,
  repeatedWords,
  reverseWords,
  shortestWord,
  toIdentifier,
  toSlug,
  truncateWords,
  uniqueWords,
  wordCount,
  wordLengths,
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

describe("shortestWord", () => {
  it("gives the shortest word, the first one on a tie", () => {
    expect(shortestWord("the quick  brown fox")).toBe("the");
    expect(shortestWord("ab cd")).toBe("ab");
  });

  it("measures a word in characters, not UTF-16 code units", () => {
    expect(shortestWord("abc 𝒜𝒜")).toBe("𝒜𝒜");
  });

  it("gives nothing for blank text", () => {
    expect(shortestWord("   ")).toBe("");
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

describe("repeatedWords", () => {
  it("gives each word that occurs more than once, in the order it first appears", () => {
    expect(repeatedWords("the cat saw the  dog and the cat")).toEqual(["the", "cat"]);
    expect(repeatedWords("\tone\ntwo one ")).toEqual(["one"]);
  });

  it("compares words exactly, so case matters", () => {
    expect(repeatedWords("The the THE")).toEqual([]);
  });

  it("gives nothing when no word repeats, and for blank text", () => {
    expect(repeatedWords("the quick brown fox")).toEqual([]);
    expect(repeatedWords("   ")).toEqual([]);
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

describe("countWord", () => {
  it("counts the whole-word occurrences of a word", () => {
    expect(countWord("the cat saw the  dog", "the")).toBe(2);
    expect(countWord("then the other", "the")).toBe(1);
  });

  it("compares words exactly, so case matters", () => {
    expect(countWord("The the THE", "the")).toBe(1);
  });

  it("gives 0 for a word that does not occur, and for blank text", () => {
    expect(countWord("the cat", "dog")).toBe(0);
    expect(countWord("   ", "dog")).toBe(0);
  });

  it.each(["", " ", "two words", "tab\there"])("rejects a word of %j", (word) => {
    expect(() => countWord("the cat", word)).toThrow(
      new RangeError(`word must be one word with no whitespace, not ${JSON.stringify(word)}`),
    );
  });
});

describe("wordLengths", () => {
  it("gives the length of each word, in order", () => {
    expect(wordLengths("the quick  brown fox")).toEqual([3, 5, 5, 3]);
    expect(wordLengths("\tone\nthree ")).toEqual([3, 5]);
  });

  it("measures a word in characters, not UTF-16 code units", () => {
    expect(wordLengths("𝒜𝒜 é")).toEqual([2, 1]);
  });

  it("gives nothing for blank text", () => {
    expect(wordLengths("   ")).toEqual([]);
  });
});

describe("firstWord", () => {
  it("gives the first word", () => {
    expect(firstWord("the quick  brown fox")).toBe("the");
    expect(firstWord("one")).toBe("one");
  });

  it("ignores leading whitespace", () => {
    expect(firstWord(" \t\nthe quick fox")).toBe("the");
  });

  it("gives nothing for blank text", () => {
    expect(firstWord("")).toBe("");
    expect(firstWord("   ")).toBe("");
  });
});

describe("lastWord", () => {
  it("gives the last word", () => {
    expect(lastWord("the quick  brown fox")).toBe("fox");
    expect(lastWord("one")).toBe("one");
  });

  it("ignores trailing whitespace", () => {
    expect(lastWord("the quick fox \t\n")).toBe("fox");
  });

  it("gives nothing for blank text", () => {
    expect(lastWord("")).toBe("");
    expect(lastWord("   ")).toBe("");
  });
});

describe("averageWordLength", () => {
  it("gives the mean length of the words", () => {
    expect(averageWordLength("the quick  brown fox")).toBe(4);
    expect(averageWordLength("\tab\nabcd ")).toBe(3);
    expect(averageWordLength("a ab")).toBe(1.5);
  });

  it("measures a word in characters, not UTF-16 code units", () => {
    expect(averageWordLength("𝒜𝒜 é")).toBe(1.5);
  });

  it("gives 0 for blank text", () => {
    expect(averageWordLength("")).toBe(0);
    expect(averageWordLength("   ")).toBe(0);
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
