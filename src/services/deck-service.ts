import { Deck } from "../models/deck";
import { CardCode, ICard } from "../models/card";
import { IDeck, IDeckService } from "../interfaces/index";

/**
 * Service for managing decks of cards.
 * Provides functionality for creating, retrieving, and drawing cards from decks.
 */
export class DeckService implements IDeckService {
  private readonly decks: Map<string, IDeck> = new Map();

  /**
   * Creates a new deck.
   * @param shuffled - Whether the deck should be shuffled.
   * @param cards - An optional array of card codes to create a partial deck.
   * @returns The created deck instance.
   */
  public createDeck(shuffled: boolean = false, cards?: CardCode[]): IDeck {
    const deck = cards
      ? Deck.createPartial(cards, shuffled)
      : Deck.createFull(shuffled);
    this.decks.set(deck.id, deck);
    return deck;
  }

  /**
   * Retrieves a deck by its ID.
   * @param id - The unique identifier of the deck.
   * @returns The deck instance if found, otherwise undefined.
   */
  public getDeck(id: string): IDeck | undefined {
    return this.decks.get(id);
  }

  /**
   * Draws a specified number of cards from a deck.
   * @param id - The unique identifier of the deck.
   * @param count - The number of cards to draw.
   * @returns An array of drawn cards.
   * @throws Error if the deck is not found.
   */
  public drawCards(id: string, count: number): ICard[] {
    const deck = this.decks.get(id);
    if (!deck) throw new Error("Deck not found");
    return deck.drawCard(count);
  }
}
