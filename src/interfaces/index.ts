import { CardCode, ICard } from "../models/card";

/**
 * Interface for Deck operations
 */
export interface IDeck {
  id: string;
  cards: ICard[];
  drawCard(count: number): ICard[];
  getRemainingCount(): number;
}

/**
 * Interface for Deck Service operations
 */
export interface IDeckService {
  createDeck(shuffled: boolean, cards?: CardCode[]): IDeck;
  getDeck(id: string): IDeck | undefined;
  drawCards(id: string, count: number): ICard[];
}

/**
 * Interface for API responses
 */
export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Interface for Deck creation response
 */
export interface IDeckCreateResponse {
  deckId: string;
  shuffled: boolean;
  remaining: number;
}

/**
 * Interface for Deck opening response
 */
export interface IDeckOpenResponse extends IDeckCreateResponse {
  cards: ICard[];
}

/**
 * Interface for Card drawing response
 */
export interface IDrawCardsResponse {
  cards: ICard[];
}
