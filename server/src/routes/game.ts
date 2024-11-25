import express from "express";
import { get_games } from "../controller/GameController";
const router = express.Router();

router.get("/", scrape);

module.exports = router;
