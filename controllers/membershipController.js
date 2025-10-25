import { body, matchedData, validationResult } from "express-validator";
import { lengthErr, requiredErr } from "../utils.js";

const validateMemberForm = [
  body("answer")
    .trim()
    .notEmpty()
    .withMessage(`Answer ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Answer ${lengthErr(25)}`),
];

const getMemberForm = (req, res) => {
  res.render("membershipForm", {
    title: "Become a Member",
  });
};

const postMemberForm = [
  validateMemberForm,
  async (req, res) => {
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
      // update membership status and move
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
