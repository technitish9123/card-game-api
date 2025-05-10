import { Request, Response } from "express";
import { CardCode } from "../models/card";
import { IDeckService } from "../interfaces/index";

/**
 * Controller for handling deck-related operations.
 * Provides endpoints for creating, opening, and drawing cards from a deck.
 */
export class DeckController {
  constructor(private readonly deckService: IDeckService) {}

  /**
   * Creates a new deck.
   * @param req - The HTTP request object. Expects `shuffled` and `cards` query parameters.
   * @param res - The HTTP response object.
   *
   * Query Parameters:
   * - `shuffled` (optional): A boolean indicating whether the deck should be shuffled.
   * - `cards` (optional): A comma-separated list of card codes to include in the deck.
   *
   * Response:
   * - 201: Returns the created deck's ID, shuffle status, and remaining card count.
   * - 400: Returns an error if the request is invalid.
   */
  public createDeck = (req: Request, res: Response): void => {
    try {
      const shuffled = req.query.shuffled === "true";
      const cards = req.query.cards as string | undefined;

      const cardCodes = cards?.split(",") as CardCode[] | undefined;
      const deck = this.deckService.createDeck(shuffled, cardCodes);

      this.sendSuccess(res, 201, {
        deckId: deck.id,
        shuffled,
        remaining: deck.getRemainingCount(),
      });
    } catch (error) {
      this.sendError(res, 400, error);
    }
  };

  /**
   * Retrieves an existing deck by its ID.
   * @param req - The HTTP request object. Expects `deckId` as a route parameter.
   * @param res - The HTTP response object.
   *
   * Route Parameters:
   * - `deckId`: The ID of the deck to retrieve.
   *
   * Response:
   * - 200: Returns the deck's ID, remaining card count, and the list of cards.
   * - 404: Returns an error if the deck is not found.
   */
  public openDeck = (req: Request, res: Response): void => {
    try {
      const deck = this.deckService.getDeck(req.params.deckId);
      if (!deck) throw new Error("Deck not found");

      this.sendSuccess(res, 200, {
        deckId: deck.id,
        remaining: deck.getRemainingCount(),
        cards: deck.cards,
      });
    } catch (error) {
      this.sendError(res, 404, error);
    }
  };

  /**
   * Draws a specified number of cards from a deck.
   * @param req - The HTTP request object. Expects `deckId` as a route parameter and `count` as a query parameter.
   * @param res - The HTTP response object.
   *
   * Route Parameters:
   * - `deckId`: The ID of the deck to draw cards from.
   *
   * Query Parameters:
   * - `count`: The number of cards to draw.
   *
   * Response:
   * - 200: Returns the drawn cards.
   * - 400: Returns an error if the count is invalid or the request fails.
   */
  public drawCards = (req: Request, res: Response): void => {
    try {
      const count = parseInt(req.query.count as string);
      if (isNaN(count)) throw new Error("Invalid count parameter");

      const cards = this.deckService.drawCards(req.params.deckId, count);
      this.sendSuccess(res, 200, { cards });
    } catch (error) {
      this.sendError(res, 400, error);
    }
  };

  /**
   * Sends a success response.
   * @param res - The HTTP response object.
   * @param status - The HTTP status code.
   * @param data - The response data to send.
   */
  private sendSuccess(res: Response, status: number, data: object): void {
    res.status(status).json({ success: true, ...data });
  }

  /**
   * Sends an error response.
   * @param res - The HTTP response object.
   * @param status - The HTTP status code.
   * @param error - The error to send.
   */
  private sendError(res: Response, status: number, error: unknown): void {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(status).json({ success: false, error: message });
  }
}
