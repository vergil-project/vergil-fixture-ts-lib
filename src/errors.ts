/**
 * Why {@link parseGreeting} rejected its input.
 *
 * - `"json"`: the input is not JSON.
 * - `"shape"`: the JSON is not an object with a string `name`, an optional
 *   string `punctuation` and no other field.
 * - `"blank-name"`: the name is empty or only whitespace.
 */
export type GreetingErrorKind = "json" | "shape" | "blank-name";

/** The error {@link parseGreeting} throws for input it cannot read as a greeting. */
export class GreetingError extends Error {
  /** Why the input was rejected. */
  readonly kind: GreetingErrorKind;

  constructor(kind: GreetingErrorKind, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "GreetingError";
    this.kind = kind;
  }
}
