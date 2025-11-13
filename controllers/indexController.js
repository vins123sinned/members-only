import { messages } from "../db/entities/Messages.js";
import { users } from "../db/entities/Users.js";

const getHomePage = async (req, res, next) => {
  // return messages array with author's name instead of id
  const allMessages = await messages.getAllMessages();
  const mappedMessages = await Promise.all(
    allMessages.map(async (message) => {
      const user = await users.getUserById(message.author);
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
