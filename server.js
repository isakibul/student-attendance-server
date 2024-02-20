require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const connectDatabase = require("./db");
const User = require("./models/User");

const app = express();
const PORT = 4000;

app.use(express.json());

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();

    return res.status(201).json({ message: "User created successfully", user });
  } catch (e) {
    next(e);
  }
});

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Invalid credential!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credential!" });
    }

    delete user._doc.password;

    return res.status(200).json({ message: "Login successful!", user });
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server error occurred" });
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
