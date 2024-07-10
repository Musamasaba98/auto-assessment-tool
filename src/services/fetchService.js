import puppeteer from "puppeteer";

const fetchService = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    const htmlContent = await page.content();
    await browser.close();
    return htmlContent;
  } catch (error) {
    await browser.close();
    console.error(`Error fetching HTML from ${url}:`, error);
    return null;
  }
};
export default fetchService;
