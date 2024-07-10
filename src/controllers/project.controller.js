import asyncHandler from "express-async-handler";
import fetchService from "../services/fetchService.js";
export const assessProject = asyncHandler(async (req, res) => {
  const { url } = req.body;
  try {
    const htmlContent = fetchService(url);
    console.log(htmlContent);
    res.send(htmlContent);
  } catch (error) {}
});
