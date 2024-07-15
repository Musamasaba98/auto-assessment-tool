import puppeteer from "puppeteer";
import { PredefinedNetworkConditions } from "puppeteer";
import extractCSSRules from "./fetchCssRules.js";
import extractAllCssFileLinks from "./extractIndirectCssFiles.js";

const fetchService = async (url) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
  });
  const fast3G = PredefinedNetworkConditions["Fast 3G"];

  const page = await browser.newPage();
  try {
    await extractAllCssFileLinks(page, url);
    await page.coverage.startCSSCoverage();
    let response = await page.goto(url, { waitUntil: "networkidle2" });
    await page.emulateNetworkConditions(fast3G);
    await page.setJavaScriptEnabled(false);
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    const cssRules = await extractCSSRules(page, url, response);
    const htmlContent = await page.content();
    await browser.close();
    return { htmlContent, cssRules };
  } catch (error) {
    await browser.close();
    console.error(`Error fetching HTML from ${url}:`, error);
    return null;
  }
};
export default fetchService;
