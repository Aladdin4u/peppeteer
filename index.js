const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--proxy-bypass-list=<-loopback>"],
  });
  const page = await browser.newPage();
  page.on("requestfailed", (request) => {
    console.log(
      `url: ${request.url()}, errText: ${
        request.failure().errorText
      }, method: ${request.method()}`
    );
  });
  // Catch console log errors
  page.on("pageerror", (err) => {
    console.log(`Page error: ${err.toString()}`);
  });
  // Catch all console messages
  page.on("console", (msg) => {
    console.log("Logger:", msg.type());
    console.log("Logger:", msg.text());
    console.log("Logger:", msg.location());
  });
  await page.goto("https://dev.amidstyle.com", { waitUntil: "networkidle0" });
  // await page.waitForSelector("#data", { timeout: 5_000 });

  // const getJson = await page.evaluate(() => {
  //   const tag = document.querySelector("#data");
  //   return tag.innerText;
  // });
  // console.log("res =>", getJson);
  // await browser.close();
})();
