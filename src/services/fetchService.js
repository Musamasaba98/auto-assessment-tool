import puppeteer from "puppeteer";
import asyncHandler from "express-async-handler";

const fetchService = asyncHandler(async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    const htmlContent = await page.content();
    return htmlContent;
  } catch (error) {
    console.error(`Error fetching HTML from ${url}:`, error);
    return null;
  }
});
export default fetchService;
