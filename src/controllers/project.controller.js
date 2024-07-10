import asyncHandler from "express-async-handler";
import fetchService from "../services/fetchService.js";
import htmlParseService from "../services/htmlParseService.js";

export const assessProject = asyncHandler(async (req, res) => {
  const { url } = req.body;
  try {
    const htmlContent = await fetchService(url);
    if (!htmlContent) {
      console.error(`Failed to fetch HTML content from ${url}`);
      return res.status(500).json({ error: "Failed to fetch HTML content" });
    }
    const assessmentResult = await htmlParseService(htmlContent);
    console.log(`Assessment Result for ${url}:`, assessmentResult);
    res.send(assessmentResult);
  } catch (error) {
    console.error("Error assessing project:", error);
  }
});
