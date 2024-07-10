import express from "express";

const app = express(),
  PORT = 5000;

app.get("/", (req, res) => {
  res.send("Osinika Ebinyo");
});

app.listen(PORT, () => {
  console.log("Assesment server connected");
});
