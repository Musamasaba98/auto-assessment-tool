import * as cheerio from "cheerio";

const htmlParseService = async (htmlContent, cssRules) => {
  const $ = cheerio.load(htmlContent);

  const assessmentResult = {
    hasHeader: $("header").length > 0,
    hasFooter: $("footer").length > 0,
    hasNav: $("nav").length > 0,
    hasWelcomeSection: $("#welcome").length > 0,
    hasProjectsSection: $("#projects").length > 0,
    hasContactSection: $("#contact").length > 0,
    hasResponsiveImages: $("img[alt]").length > 0,
    usesGoogleFonts: $('link[href*="fonts.googleapis.com"]').length > 0,
    usesFlexbox:
      $("*").filter((i, el) => $(el).css("display") === "flex").length > 0,
    isResponsive:
      $('meta[name="viewport"]').attr("content") ===
      "width=device-width, initial-scale=1",
  };
  return { assessmentResult, cssRules };
};
export default htmlParseService;
