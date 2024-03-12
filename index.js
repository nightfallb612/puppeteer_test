const puppeteer = require("puppeteer");

async function run() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Navigate the page to a URL
  await page.goto("https://vibe.naver.com/chart/total");

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a"), (e) => e.href)
  );
  console.log(links);

  await browser.close();
}

run();
