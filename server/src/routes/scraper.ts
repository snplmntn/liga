import express from "express";
import { scrape } from "../controller/scraper/ScraperController";
const router = express.Router();

router.get("/", scrape);

module.exports = router;
