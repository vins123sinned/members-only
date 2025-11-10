import { body, matchedData, validationResult } from "express-validator";
import { lengthErr, requiredErr } from "../utils.js";
import { deleteMessage, insertMessage } from "../db/queries.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";

const validateMessageForm = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage(`Title ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Title ${lengthErr(255)}`),
  body("text")
    .trim()
    .notEmpty()
    .withMessage(`Text ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 1000 })
    .withMessage(`Text ${lengthErr(1000)}`),
];

const getMessageForm = (req, res, next) => {
  if (!res.locals.currentUser) return res.redirect("/log-in");

  res.render("layout", {
    title: "Create a New Message",
    path: "partials/messageForm.ejs",
  });
};

const postMessageForm = [
  validateMessageForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("layout", {
        title: "Create a New Message",
        path: "partials/messageForm.ejs",
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { title, text } = matchedData(req);
    try {
      const authorId = res.locals.currentUser.id;
      await insertMessage(title, text, authorId);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
];

const postMessageDelete = async (req, res, next) => {
  if (!res.locals.currentUser) return res.redirect("/log-in");
  if (!res.locals.currentUser?.is_admin)
    return next(
      new ForbiddenError("You must be an admin to complete this action!"),
    );

  const { messageId } = req.params;
  try {
    await deleteMessage(messageId);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { getMessageForm, postMessageForm, postMessageDelete };
