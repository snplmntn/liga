import express, { Express, Request, Response } from "express";

const app: Express = express();

const scraperRouter = require("./routes/scraper");

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server" });
});

app.use("/scraper", scraperRouter);

module.exports = app;
