const express = require("express");

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("This is the home!");
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
