import puppeteer from "puppeteer";

const uaap = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const getEvents = await page.evaluate(() => {
    const events = document.querySelectorAll(".schedule-box");

    return Array.from(events)
      .map((event, index) => {
        const eventParent = event.parentElement;
        const links = eventParent?.querySelectorAll("a");
        const link = links ? links[index].href : "";
        const parsedUrl = new URL(link);

        // Extract the tournament path and game ID
        const tournamentPath = parsedUrl.pathname.split("/games")[0]; // Get everything before /games
        const gameId = parsedUrl.pathname.match(/games\/(\d+)/)?.[1]; // Extract game ID after 'games/'

        // Construct the new URL
        const newUrl = `${parsedUrl.origin}${tournamentPath}?game_id=${gameId}`;
        return newUrl;
      })
      .filter((href) => href !== null);
  });

  const details = await Promise.all(
    getEvents.map(async (link) => {
      return await getDetails(link);
    })
  );

  await browser.close();
  return details;
};

const getDetails = async (link: string) => {
  const browser = await puppeteer.launch();
  const newPage = await browser.newPage();
  await newPage.goto(link);

  const eventDetail = await newPage.evaluate(() => {
    const details = document.querySelectorAll(".game-detail span");
    const teams = document.querySelectorAll(".team_name span");
    const scores = document.querySelectorAll(".team_score span");

    const winner =
      parseInt(scores[0]?.textContent || "0") >
      parseInt(scores[1]?.textContent || "0")
        ? teams[0]?.textContent
        : teams[1]?.textContent;

    return {
      league: details[0]?.textContent || "",
      home: teams[0]?.textContent,
      away: teams[1]?.textContent,
      home_score: scores[0]?.textContent,
      away_score: scores[1]?.textContent,
      winner,
      event_time: details[2]?.textContent || "",
    };
  });

  await browser.close();
  return eventDetail;
};

// return Array.from(events)
//   .slice(0, 3)
//   .map((event) => {
//     const details = document.querySelectorAll(".game-detail span");
//     const teams = document.querySelectorAll(".team_name span");
//     const scores = document.querySelectorAll(".team_score span");
//     const winner =
//       parseInt(scores[0].textContent || "0") >
//       parseInt(scores[1].textContent || "0")
//         ? teams[0]?.textContent
//         : teams[1]?.textContent;
//     return {
//       league,
//       home: teams[0]?.textContent,
//       away: teams[1]?.textContent,
//       home_score: scores[0].textContent,
//       away_score: scores[1].textContent,
//       winner,
//       event_time: details[2].textContent,
//     };
//   });

export { uaap };

// return {
//   link: container?.querySelectorAll("a")[1].href ?? "",
// };

// return {
//   league,
//   link: events && events.length > 1 ? events[1].href : "",
// };

// return {
//   league,
//   home: teams[0]?.textContent,
//   away: teams[1]?.textContent,
//   home_score: scores[0].textContent,
//   away_score: scores[1].textContent,
// };

// return Array.from(events ?? [])
//   .slice(0, 3)
//   .map(async (event) => {
//     const newPage = await browser.newPage();
//     await newPage.goto(event.href);

//     const eventDetail = await newPage.evaluate(() => {
//       const details = document.querySelectorAll(".game-detail span");
//       const teams = document.querySelectorAll(".team_name span");
//       const scores = document.querySelectorAll(".team_score span");

//       const winner =
//         parseInt(scores[0].textContent || "0") >
//         parseInt(scores[1].textContent || "0")
//           ? teams[0]?.textContent
//           : teams[1]?.textContent;

//       return {
//         league,
//         home: teams[0]?.textContent,
//         away: teams[1]?.textContent,
//         home_score: scores[0].textContent,
//         away_score: scores[1].textContent,
//         winner,
//         event_time: details[2].textContent,
//       };
//     });

//     await newPage.close();

//     return eventDetail;
//   });
