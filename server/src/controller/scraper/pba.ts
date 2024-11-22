import puppeteer from "puppeteer";

const pba = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const allEvents = await page.evaluate(() => {
    const league = document.querySelector(".event__title")?.textContent;
    const year = document.querySelector(".heading__info")?.textContent;

    const events = document.querySelectorAll(".event__match ");

    return Array.from(events)
      .slice(0, 3)
      .map((event) => {
        const home = event.querySelector(
          ".event__participant--home"
        )?.textContent;
        const home_score = event.querySelector(
          ".event__score--home"
        )?.textContent;
        const away = event.querySelector(
          ".event__participant--away"
        )?.textContent;
        const away_score = event.querySelector(
          ".event__score--away"
        )?.textContent;
        const event_time = `${event
          .querySelector(".event__time")
          ?.textContent?.slice(0, 6)}${year} ${event
          .querySelector(".event__time")
          ?.textContent?.slice(7, 12)}`;
        const winner =
          parseInt(home_score || "0") > parseInt(away_score || "0")
            ? home
            : away;

        return {
          league,
          home,
          away,
          home_score,
          away_score,
          winner,
          event_time,
        };
      });
  });

  await browser.close();
  return allEvents;
};

export { pba };
