import { describe, expect, it } from "vitest";

import { initials, reverseWords, toIdentifier, toSlug, wordCount } from "../src/index.js";

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
