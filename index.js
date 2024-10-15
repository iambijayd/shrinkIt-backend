const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const { validateInputData, validateToken } = require("./middlewares/validate");
const { signUpRouter, logInRouter } = require("./routes/authentication/auth");
const userRouter = require("./routes/user");
const { Url } = require("./models/url");
const ApiError = require("./utils/ApiError");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);

app.use("/signup", validateInputData, signUpRouter);
app.use("/login", validateInputData, logInRouter);
app.use("/user", validateToken, userRouter);

app.get("/:hash", async (req, res) => {
  let protocol = req.protocol;
  let host = req.headers.host;
  let hash = req.params.hash;

  let url = protocol + "://" + host + "/" + hash;

  try {
    let urlInfo = await Url.findOne({ shorturl: url });
    if (!urlInfo) {
      throw new ApiError(400,"Url didnot Match");
    }
    return res.redirect(urlInfo.originalurl);
  } catch (err) {
    throw new ApiError(500,"Error redirecting to the originalUrl");
  }
});

app.all("*", (req, res, next) => {
  const err = new ApiError(404,`Can't find ${req.originalUrl} on the server`);
  next(err);
});

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = err instanceof mongoose.Error ? 400 : 500;
  }
  err.message = err.message || "Something went wrong";
  res.status(err.statusCode).json({
    ...err,
    message: err.message,
    success: err.statusCode < 400,
    ...{stack: err.stack},
  });
});

mongoose
  .connect(process.env.MONGO_URI, { dbName: "Url-Shortener" })
  .then(() => {
    console.log("Database connected");
    app.listen(3000, async () => {
      console.log("Listening on port: 3000");
    });
  });
