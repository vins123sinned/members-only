import { getAllMessages, getUserById } from "../db/queries.js";

import { ForbiddenError } from "../errors/ForbiddenError.js";

const getHomePage = async (req, res, next) => {
  return next(
    new ForbiddenError("You must be an admin to complete this action!"),
  );

  // return messages array with author's name instead of id
  const messages = await getAllMessages();
  const mappedMessages = await Promise.all(
    messages.map(async (message) => {
      const user = await getUserById(message.author);
      message.authorName = `${user.first_name} ${user.last_name}`;
      return message;
    }),
  );

  res.render("layout", {
    title: "Homepage",
    path: "partials/homepage.ejs",
    messages: mappedMessages,
  });
};

export { getHomePage };
