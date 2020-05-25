import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

//Ev. andra error-koder nedan
const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header("Authorization"),
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ loggedOut: true, message: "Could not access" });
    }
  } catch {
    res.status(403).json({ loggedOut: true, message: "Could not access" });
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Create user - sign up
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Does not store plain text password
    const user = new User({ name, email, password: bcrypt.hashSync(password) });
    const newUser = await user.save();
    //user.save()
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user.", errors: err.errors });
  }
});

// Secure endpoint, access after login
app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.status(201).json({ email: req.user.email, userId: req.user._id });
});

// Login existing user
app.post("/sessions", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(404).json({ notFound: true });
    }
  } catch (err) {
    res.status(404).json({ notFound: true });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
