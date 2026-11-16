import { z } from "zod";

import { GreetingError } from "./errors.js";

/** A greeting: who is greeted, and the punctuation that ends it. */
export interface Greeting {
  /** The name greeted, trimmed of surrounding whitespace. */
  readonly name: string;
  /** What ends the greeting, such as `"!"`; absent for none. */
  readonly punctuation?: string;
}

const greetingSchema = z.strictObject({
  name: z.string(),
  punctuation: z.string().optional(),
});

/**
 * Greets `name`, trimmed of surrounding whitespace. A blank name greets the world.
 *
 * @example
 * greet("Ada"); // "Hello, Ada"
 * greet(""); // "Hello, world"
 */
export function greet(name: string): string {
  const trimmed = name.trim();
  return `Hello, ${trimmed === "" ? "world" : trimmed}`;
}

/**
 * Reads a greeting from a JSON object with a required string `name` and an
 * optional string `punctuation`, and trims the name.
 *
 * @throws {GreetingError} when the input is not JSON (`"json"`), does not have
 *   that shape (`"shape"`), or its name is blank (`"blank-name"`).
 */
export function parseGreeting(json: string): Greeting {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch (error) {
    throw new GreetingError("json", "the input is not JSON", { cause: error });
  }
  const result = greetingSchema.safeParse(data);
  if (!result.success) {
    throw new GreetingError("shape", `the input is not a greeting: ${result.error.message}`, {
      cause: result.error,
    });
  }
  const name = result.data.name.trim();
  if (name === "") {
    throw new GreetingError("blank-name", "the greeting's name is blank");
  }
  const { punctuation } = result.data;
  return punctuation === undefined ? { name } : { name, punctuation };
}

/**
 * The greeting as text: {@link greet} of its name, then its punctuation.
 *
 * @example
 * renderGreeting({ name: "Ada", punctuation: "!" }); // "Hello, Ada!"
 */
export function renderGreeting(greeting: Greeting): string {
  return `${greet(greeting.name)}${greeting.punctuation ?? ""}`;
}
