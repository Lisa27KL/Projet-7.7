const express = require("express");
const helmet = require("helmet"); // OWASP : Secure Express app by setting various HTTP headers.
//const rateLimit = require("express-rate-limit");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};
const path = require("path");

// Routers
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");
// const commentsRoutes = require("./routes/commentsRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS Sécurity
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.header("x-access-token, Origin, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, //15 minutes
//     max: 20, // Limit each IP à 30 requests per "window" / 15 mins.
//     message: `BEWARE ! Too many connection attempts from this IP`,
//   })
// );

// Routes :
app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
// app.use("/api/comments", commentsRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
