import { Request, Response } from "express";
import { pba } from "./scraper/pba";
import { uaap } from "./scraper/uaap";
// const Game = require("../models/Game");
// get data from web
// store data from web but check only if unique

// const store_game = async (_req: Request, res: Response) => {
//   const games = await Game.find();
//   res.status(200).json({ newGames: games });
// };

const scrape = async (_req: Request, res: Response) => {
  const governors_cup = await pba(
    "https://www.flashscore.ph/en/basketball/philippines/governors-cup/#/rkphvd7G/draw"
  );

  const uaap_cup = await uaap(
    "https://uaap.livestats.ph/tournaments/uaap-season-87-men-s"
  );

  res.status(200).json({ pba: governors_cup, uaap: uaap_cup });
};

export { scrape };

// const commissioners_cup = await pba(
//   "https://www.flashscore.ph/en/basketball/philippines/commissioners-cup/"
// );
// const philippine_cup = await pba(
//   "https://www.flashscore.ph/en/basketball/philippines/philippine-cup/#/AFfjxGMM"
// );

// combinedCups.sort((a, b) => {
//   const parseDate = (dateStr: string) => {
//     const formats = ["MM/DD/YYYY hh:mm A", "DD.MM.YYYY HH:mm"];
//     for (const _ of formats) {
//       const parsedDate = new Date(dateStr);
//       if (!isNaN(parsedDate.getTime())) {
//         return parsedDate;
//       }
//     }
//     return new Date(0); // Fallback to epoch if parsing fails
//   };

//   return (
//     parseDate(a.event_time ?? "").getTime() -
//     parseDate(b.event_time ?? "").getTime()
//   );
// });

// const allCups = [governors_cup, uaap_cup];

// const combinedCups = allCups.flat();
// combinedCups.sort(
//   (a, b) =>
//     new Date(a.event_time ?? 0).getTime() -
//     new Date(b.event_time ?? 0).getTime()
// );
// res.status(200).json(combinedCups);
