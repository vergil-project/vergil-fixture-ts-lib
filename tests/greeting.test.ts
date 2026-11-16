import { describe, expect, it } from "vitest";

import { GreetingError, greet, parseGreeting, renderGreeting } from "../src/index.js";

function parseError(json: string): GreetingError {
  try {
    parseGreeting(json);
  } catch (error) {
    if (error instanceof GreetingError) {
      return error;
    }
    throw error;
  }
  throw new Error(`parseGreeting accepted ${json}`);
}

describe("greet", () => {
  it("greets a name", () => {
    expect(greet("Ada")).toBe("Hello, Ada");
  });

  it("trims the name", () => {
    expect(greet("  Grace ")).toBe("Hello, Grace");
  });

  it("greets the world for a blank name", () => {
    expect(greet("")).toBe("Hello, world");
    expect(greet("   ")).toBe("Hello, world");
  });
});

describe("parseGreeting", () => {
  it("reads a name and punctuation, trimming the name", () => {
    expect(parseGreeting('{"name": " Ada ", "punctuation": "!"}')).toEqual({
      name: "Ada",
      punctuation: "!",
    });
  });

  it("reads a greeting with no punctuation", () => {
    const greeting = parseGreeting('{"name": "Ada"}');
    expect(greeting).toEqual({ name: "Ada" });
    expect("punctuation" in greeting).toBe(false);
  });

  it("rejects input that is not JSON", () => {
    const error = parseError("{not json");
    expect(error.kind).toBe("json");
    expect(error.name).toBe("GreetingError");
    expect(error.cause).toBeInstanceOf(SyntaxError);
  });

  it.each([
    ["no name", '{"punctuation": "!"}'],
    ["a name that is not a string", '{"name": 7}'],
    ["an unknown field", '{"name": "Ada", "mood": "glad"}'],
    ["punctuation that is not a string", '{"name": "Ada", "punctuation": 1}'],
    ["not an object", '["Ada"]'],
  ])("rejects JSON with %s", (_label, json) => {
    const error = parseError(json);
    expect(error.kind).toBe("shape");
    expect(error.message).toMatch(/^the input is not a greeting: /u);
  });

  it("rejects a blank name", () => {
    const error = parseError('{"name": "   "}');
    expect(error.kind).toBe("blank-name");
    expect(error.message).toBe("the greeting's name is blank");
  });
});

describe("renderGreeting", () => {
  it("ends the greeting with its punctuation", () => {
    expect(renderGreeting({ name: "Ada", punctuation: "!" })).toBe("Hello, Ada!");
  });

  it("renders a greeting with no punctuation", () => {
    expect(renderGreeting({ name: "Ada" })).toBe("Hello, Ada");
  });

  it("renders a parsed greeting", () => {
    expect(renderGreeting(parseGreeting('{"name": "Grace", "punctuation": "?"}'))).toBe(
      "Hello, Grace?",
    );
  });
});
