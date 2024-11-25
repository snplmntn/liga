import { Request, Response, NextFunction } from "express";

module.exports = (fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
