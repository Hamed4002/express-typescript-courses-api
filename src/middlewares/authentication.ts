import { Request, Response, NextFunction } from "express";

// PLACEHOLDER: this middleware does not authenticate anything yet and lets every
// request through. Replace it with real checks (e.g. verify a JWT) before using
// the API for anything beyond learning.
export function authentication(_req: Request, _res: Response, next: NextFunction) {
  next();
}
