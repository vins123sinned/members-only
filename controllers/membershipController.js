import { body, matchedData, validationResult } from "express-validator";
import { lengthErr, requiredErr } from "../utils.js";
import { updateMemberStatus } from "../db/queries.js";

const validateMemberForm = [
  body("answer")
    .trim()
    .notEmpty()
    .withMessage(`Answer ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Answer ${lengthErr(25)}`),
];

const getMemberForm = (req, res, next) => {
  if (res.locals.currentUser) {
    res.render("membershipForm", {
      title: "Become a Member",
    });
  } else {
    next(new Error("You must be logged in in order to access this page"));
  }
};

const postMemberForm = [
  validateMemberForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("membershipForm", {
        title: "Become a Member",
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { answer } = matchedData(req);
    if (
      answer.toLowerCase() === "footstep" ||
      answer.toLowerCase() === "footsteps"
    ) {
      try {
        await updateMemberStatus(res.locals.currentUser.id);
        res.redirect("/");
      } catch (err) {
        console.log(err);
        next(err);
      }
    } else {
      return res.status(400).render("membershipForm", {
        title: "Become a Member",
        previousValues: req.body,
        errors: [
          {
            path: "answer",
            msg: "Answer is incorrect. Please try again.",
          },
        ],
      });
    }
  },
];

export { getMemberForm, postMemberForm };
