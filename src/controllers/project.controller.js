import asyncHandler from "express-async-handler";
export const assessProject = asyncHandler(async (req, res) => {
  const { url } = req.body;
  console.log(url);
});
