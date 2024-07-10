import app from "./app.js";

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Osinika Ebinyo");
});

app.listen(PORT, () => {
  console.log("Assesment server connected");
});
