import { Request, Response, NextFunction } from "express";
import debug from "debug";

const requestLog = debug("app:request");

// Custom middleware example: prints one line per request when DEBUG=app:request (or app:*)
export function log(req: Request, _res: Response, next: NextFunction) {
  requestLog(`${req.method} ${req.originalUrl}`);
  next();
}
