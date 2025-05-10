/**
 * Enum representing the four suits in a standard deck of playing cards.
 * Each suit is associated with a single-character abbreviation.
 */
export enum Suit {
  Hearts = "H",
  Diamonds = "D",
  Clubs = "C",
  Spades = "S",
}

/**
 * Enum representing the ranks of playing cards.
 * Each rank is associated with its corresponding symbol or value.
 *
 * @enum {string}
 */
export enum Rank {
  Ace = "A",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
  Jack = "J",
  Queen = "Q",
  King = "K",
}

/**
 * Represents a playing card with a suit and rank.
 */
export interface ICard {
  suit: Suit;
  rank: Rank;
}

/**
 * Represents a type for a card code, which is a combination of a rank and a suit.
 * The `CardCode` type is a template literal type that concatenates a `Rank` and a `Suit`.
 *
 * Example:
 * - If `Rank` is "A" (Ace) and `Suit` is "H" (Hearts), the `CardCode` would be "AH".
 */
export type CardCode = `${Rank}${Suit}`;
