import express from "express";
import path from "path";
import "dotenv/config";
import session from "express-session";
import passport from "passport";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db/pool.js";
import { indexRouter } from "./routes/indexRouter.js";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { membershipRouter } from "./routes/membershipRouter.js";
import { messageRouter } from "./routes/messageRouter.js";

const app = express();
const PgSession = connectPgSimple(session);

// set EJS as view engine and where to look for the view files
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// set path of static assets
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

// set up session for passport.js
app.use(
  session({
    store: new PgSession({
      pool: pool,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);
app.use(passport.session());

// handles "application/x-www-form-urlencoded" form data and places it into req.body
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/", authenticationRouter);
app.use("/membership", membershipRouter);
app.use("/messages", messageRouter);
app.get("/{*splat}", (req, res) => res.send("Hey! Error 404!"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).render("layout", {
    title: "Error",
    path: "partials/error.ejs",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`App running on port ${PORT}.`);
});
