import { getAllMessages, getUserById } from "../db/queries.js";

const getHomePage = async (req, res) => {
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
