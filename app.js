import express from "express";
import path from "path";
import { indexRouter } from "./routes/indexRouter.js";
import "dotenv/config";

const app = express();

// set EJS as view engine and where to look for the view files
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

// set path of static assets
const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.use("/", indexRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`App running on port ${PORT}.`);
});