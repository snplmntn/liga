import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server" });
});

module.exports = app;
