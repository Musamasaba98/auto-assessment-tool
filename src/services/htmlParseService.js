import * as cheerio from "cheerio";

const htmlParseService = async (htmlContent) => {
  const $ = cheerio.load(htmlContent);
  const headerText = $("h1").text();
  const paragraphText = $("p").text();
  const imageSrcs = [];
  $("img").each((i, img) => {
    imageSrcs.push($(img).attr("src"));
  });
  const links = [];
  $("a").each((i, link) => {
    links.push($(link).attr("href"));
  });

  return { headerText, paragraphText, imageSrcs, links };
};
export default htmlParseService;
