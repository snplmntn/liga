import { Request, Response } from "express";
const Game = require("../models/Game");

const get_games = async (_req: Request, res: Response) => {
  const { league } = _req.body;
  let games;

  if (!league) {
    games = await Game.find();
  } else if (league === "UAAP") {
    games = await Game.find({
      league: "PHILIPPINES: Governors Cup - Play Offs",
    });
  } else if (league === "UAAP") {
    games = await Game.find({
      league: "UAAP", // Placeholder
    });
  }

  res.status(200).json({ games });
};

module.exports = {
  get_games,
  // store_games,
};
