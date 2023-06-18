const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--proxy-bypass-list=<-loopback>"],
  });
  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/557.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
    );

    await page.goto("https://dev.amidstyle.com", { waitUntil: "networkidle0" });
    await page.waitForTimeout(5000);
    const getJson = await page.evaluate(() => {
      const tag = document.querySelector("#data");
      return tag.innerText;
    });
    console.log(getJson);
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}

run();


