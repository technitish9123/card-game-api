import express from "express";
import { DeckService } from "./services/deck-service";
import { DeckController } from "./controllers/deck-controller";

/**
 * Main application class for initializing and starting the Express server.
 * Sets up middlewares, controllers, and routes for the card game API.
 */
class App {
  private readonly app = express();
  private readonly port: number;

  /**
   * Initializes the application with the specified port.
   * @param port - The port number on which the server will run. Defaults to 3000.
   */
  constructor(port: number = 3000) {
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers();
  }

  /**
   * Sets up middlewares for the application.
   * Currently includes JSON body parsing middleware.
   */
  private initializeMiddlewares(): void {
    this.app.use(express.json());
  }

  /**
   * Sets up controllers and routes for the application.
   * Initializes the DeckService and DeckController and binds their routes.
   */
  private initializeControllers(): void {
    const service = new DeckService();
    const controller = new DeckController(service);

    this.app.post("/decks", controller.createDeck);
    this.app.get("/decks/:deckId", controller.openDeck);
    this.app.post("/decks/:deckId/draw", controller.drawCards);
    this.app.get("/health", (res: express.Response) => {
      res.status(200).json({ status: "OK" });
    });
  }

  /**
   * Starts the Express server on the configured port.
   * Logs a message indicating the server is running.
   */
  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

// Start the application
new App().start();
