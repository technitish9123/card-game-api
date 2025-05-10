import { v4 as uuidv4 } from "uuid";
import { ICard, Suit, Rank, CardCode } from "./card";
import { IDeck } from "../interfaces/index";

/**
 * Represents a deck of cards.
 * Provides functionality for creating, shuffling, and drawing cards.
 */
export class Deck implements IDeck {
  private readonly _id: string;
  private _cards: ICard[];
  private _drawnCards: ICard[] = [];

  /**
   * Creates a new deck instance.
   * @param cards - The initial set of cards in the deck.
   * @param shuffled - Whether the deck should be shuffled upon creation.
   */
  constructor(cards: ICard[], shuffled: boolean = false) {
    this._id = uuidv4();
    this._cards = [...cards];
    if (shuffled) this.shuffle(); // Use the parameter directly
  }

  /**
   * Gets the unique identifier of the deck.
   */
  get id(): string {
    return this._id;
  }

  /**
   * Gets the remaining cards in the deck.
   * Returns a copy of the cards to ensure immutability.
   */
  get cards(): ICard[] {
    return [...this._cards];
  }

  /**
   * Draws a specified number of cards from the deck.
   * @param count - The number of cards to draw. Defaults to 1.
   * @returns An array of drawn cards.
   * @throws Error if the draw count is invalid or exceeds the remaining cards.
   */
  public drawCard(count: number = 1): ICard[] {
    this.validateDraw(count);
    const drawn = this._cards.splice(0, count);
    this._drawnCards.push(...drawn);
    return drawn;
  }

  /**
   * Gets the number of remaining cards in the deck.
   * @returns The count of remaining cards.
   */
  public getRemainingCount(): number {
    return this._cards.length;
  }

  /**
   * Shuffles the deck using the Fisher-Yates algorithm.
   */
  private shuffle(): void {
    for (let i = this._cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._cards[i], this._cards[j]] = [this._cards[j], this._cards[i]];
    }
  }

  /**
   * Validates the draw count.
   * @param count - The number of cards to draw.
   * @throws Error if the count is non-positive or exceeds the remaining cards.
   */
  private validateDraw(count: number): void {
    if (count <= 0) throw new Error("Draw count must be positive");
    if (count > this._cards.length)
      throw new Error("Not enough cards remaining");
  }
  /**
   * Creates a full deck of cards with all suits and ranks.
   * @param shuffled - Whether the deck should be shuffled.
   * @returns A new deck instance containing all cards.
   */
  public static createFull(shuffled: boolean = false): Deck {
    const cards: ICard[] = [];
    Object.values(Suit).forEach((suit) => {
      Object.values(Rank).forEach((rank) => {
        cards.push({ suit, rank });
      });
    });
    return new Deck(cards, shuffled);
  }

  /**
   * Creates a partial deck of cards based on specified card codes.
   * @param codes - An array of card codes (e.g., "AS" for Ace of Spades).
   * @param shuffled - Whether the deck should be shuffled.
   * @returns A new deck instance containing the specified cards.
   * @throws Error if any card code is invalid.
   */
  public static createPartial(
    codes: CardCode[],
    shuffled: boolean = false
  ): Deck {
    const cards = codes.map((code) => {
      const rank = code.slice(0, -1) as Rank;
      const suit = code.slice(-1) as Suit;
      if (
        !Object.values(Rank).includes(rank) ||
        !Object.values(Suit).includes(suit)
      ) {
        throw new Error(`Invalid card code: ${code}`);
      }
      return { suit, rank };
    });
    return new Deck(cards, shuffled);
  }
}
