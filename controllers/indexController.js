import { getAllMessages, getUserById } from "../db/queries.js";
import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";

const getHomePage = async (req, res) => {
  // just to showcase error functionality
  const indexPage = true;
  if (!indexPage) {
    throw new CustomNotFoundError("Index page not found");
  }

  const messages = await getAllMessages();
  // return messages array with author's first name instead of id
  const mappedMessages = await Promise.all(
    messages.map(async (message) => {
      const user = await getUserById(message.id);
      message.author = user.first_name;
      return message;
    }),
  );

  res.render("index", {
    title: "Homepage",
    messages: mappedMessages,
  });
};

export { getHomePage };
