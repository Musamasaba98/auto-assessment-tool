import axios from "axios";
//Css demo trying to use axios though still with errors to revisit
const extractAllCssFileLinks = async (page, url) => {
  const externalCSS = new Set();

  await page.setRequestInterception(true);

  page.on("request", (request) => {
    const requestUrl = request.url();
    if (requestUrl.endsWith(".css")) {
      externalCSS.add(requestUrl);
      console.log(`Found CSS URL: ${requestUrl}`);
    }
    request.continue();
  });

  const baseDomain = new URL(url).origin;

  const cssContents = await Promise.all(
    [...externalCSS]
      .filter((entry) => entry.url !== url)
      .filter((link) => new URL(link).origin === baseDomain)
      .map(async (link) => {
        try {
          const response = await axios.get(link);
          console.log(`CSS content from ${link}:\n`, response.data);
          return response.data;
        } catch (error) {
          console.error(`Error fetching CSS from ${link}:`, error);
          return "";
        }
      })
  );

  return cssContents.join("\n");
};

export default extractAllCssFileLinks;
