require("dotenv").config();
const express = require("express");
const connectDatabase = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(routes);

app.get("/private", authenticate, (req, res) => {
  console.log(req.user);
  return res.status(200).json({ message: "Iam private!" });
});

app.use((err, req, res, next) => {
  const status = err.status ? err.status : 500;
  const message = err.message ? err.message : "Server error occurred";
  res.status(status).json({ message });
});

const dbConnectionString = process.env.MONGODB_URI;

connectDatabase(dbConnectionString)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Serving on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
