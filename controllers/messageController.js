import { body, matchedData, validationResult } from "express-validator";
import { lengthErr, requiredErr } from "../utils.js";
import { deleteMessage, insertMessage } from "../db/queries.js";

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
  if (res.locals.currentUser) {
    res.render("messageForm", {
      title: "Create a New Message",
    });
  } else {
    next(new Error("You must be logged in in order to access this page"));
  }
};

const postMessageForm = [
  validateMessageForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("messageForm", {
        title: "Create a New Message",
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

const postMessageDelete = async (req, res) => {
  if (res.locals.currentUser?.is_admin) {
    const { messageId } = req.params;
    try {
      await deleteMessage(messageId);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    next(new Error("You are not authorized to complete this action"));
  }
};

export { getMessageForm, postMessageForm, postMessageDelete };
