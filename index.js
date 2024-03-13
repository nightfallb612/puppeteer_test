const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Navigate the page to a URL
  await page.goto("https://vibe.naver.com/chart/total");

  // const songs = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll(".tracklist tbody tr"), (e) => ({
  //     rank: e.querySelector(".rank span").innerText,
  //     song: e.querySelector(".song .link_text").innerText,
  //     artist: e.querySelector(".artist .link_artist span").innerText,
  //   }))
  // );

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"), (e) => e.href)
  );
  console.log(links);

  const songs = await page.$$eval(".tracklist tbody tr", (elements) =>
    elements.map((e) => ({
      rank: e.querySelector(".rank span").innerText,
      song: e.querySelector(".song .link_text").innerText,
      artist: e.querySelector(".artist .link_artist span").innerText,
    }))
  );
  console.log(songs);

  // fs.writeFile("top100.json", JSON.stringify(songs), (err) => {
  //   if (err) throw err;
  //   console.log("File saved successfuly");
  // });

  fs.writeFile("links.json", JSON.stringify(links), (err) => {
    if (err) throw err;
    console.log("File saved successfuly");
  });

  await browser.close();
}

run();
