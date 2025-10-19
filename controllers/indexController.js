import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";

const getHomePage = (req, res) => {
  // just to showcase error functionality
  const indexPage = true;
  if (!indexPage) {
    throw new CustomNotFoundError("Index page not found");
  }

  res.render("index", { heading: "Welcome to the homepage." });
};

export { getHomePage };