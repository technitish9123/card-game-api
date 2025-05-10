import { Request, Response } from "express";

/**
 * Controller for handling health check operations.
 */
export class HealthController {
  /**
   * Handles the health check request.
   * Responds with the server's health status.
   * @param req - The HTTP request object.
   * @param res - The HTTP response object.
   */
  // @ts-ignore
  public checkHealth(req: Request, res: Response): void {
    res.status(200).json({ status: "UP", message: "Server is healthy" });
  }
}
