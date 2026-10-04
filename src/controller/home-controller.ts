import { Request, Response } from "express";

const getHome = (_req: Request, res: Response) => {
  res.send("This is the homepage.");
};

export default {
  getHome,
};
