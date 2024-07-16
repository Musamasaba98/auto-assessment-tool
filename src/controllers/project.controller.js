import asyncHandler from "express-async-handler";
import fetchService from "../services/fetchService.js";
import htmlParseService from "../services/htmlParseService.js";
import htmlFetchService from "../services/htmlFetchService.js";
import cssParseService from "../services/cssParseService.js";

export const assessProject = asyncHandler(async (req, res) => {
  const { url } = req.body;
  try {
    // const htmlContent = await htmlFetchService(url);
    const { htmlContent, cssRules } = await fetchService(url);
    if (!htmlContent) {
      console.error(`Failed to fetch HTML content from ${url}`);
      return res.status(500).json({ error: "Failed to fetch HTML content" });
    }
    const assessmentResult = await htmlParseService(htmlContent);
    const cssAssesmentResult = await cssParseService(cssRules);
    console.log(`Assessment Result for ${url}:`, {
      assessmentResult,
      cssAssesmentResult,
    });
    res.send(assessmentResult);
  } catch (error) {
    console.error("Error assessing project:", error);
  }
});
