import { getAllMessages, getUserById } from "../db/queries.js";
import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";

const getHomePage = async (req, res) => {
  // just to showcase error functionality
  const indexPage = true;
  if (!indexPage) {
    throw new CustomNotFoundError("Index page not found");
  }

  // return messages array with author's name instead of id
  const messages = await getAllMessages();
  const mappedMessages = await Promise.all(
    messages.map(async (message) => {
      const user = await getUserById(message.author);
      message.authorName = `${user.first_name} ${user.last_name}`;
      return message;
    }),
  );

  res.render("index", {
    title: "Homepage",
    messages: mappedMessages,
  });
};

export { getHomePage };
