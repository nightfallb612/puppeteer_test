const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.amazon.ca/s?k=dune2");

  const books = await page.$$eval(
    '[data-component-type="s-search-result"]',
    (elements) =>
      elements.map((e) => ({
        title: e.querySelector(".a-section h2 a span").innerText,
        img: e.querySelector(".s-image").src,
        href: e.querySelector(".a-section h2 a").href,
      }))
  );
  console.log(books);
  await browser.close();
}

run();
