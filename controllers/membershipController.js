import { body, matchedData, validationResult } from "express-validator";
import { lengthErr, requiredErr } from "../utils.js";
import { updateAdminStatus, updateMemberStatus } from "../db/queries.js";

// currently this validation works for both the member and admin form
const validateMembershipForm = [
  body("answer")
    .trim()
    .notEmpty()
    .withMessage(`Answer ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Answer ${lengthErr(25)}`),
];

const getMemberForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/log-in");
  if (res.locals.currentUser.is_member)
    return res.render("layout", {
      title: "Become a Member",
      path: "partials/thankYou.ejs",
      heading: "Thank you for being a member!",
      body: "As a member, you will be able to see the name and date of other messages!",
    });

  res.render("membershipForm", {
    title: "Become a Member",
  });
};

const postMemberForm = [
  validateMembershipForm,
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

const getAdminForm = (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/log-in");
  if (res.locals.currentUser.is_admin)
    return res.render("layout", {
      title: "Become an Admin",
      path: "partials/thankYou.ejs",
      heading: "Thank you for being an admin!",
      body: "As an admin, you will be able to moderate and delete any inappropriate messages!",
    });

  res.render("adminForm", {
    title: "Become an Admin",
  });
};

const postAdminForm = [
  validateMembershipForm,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("adminForm", {
        title: "Become a Member",
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { answer } = matchedData(req);
    if (
      answer.toLowerCase() === "moderator" ||
      answer.toLowerCase() === "admin"
    ) {
      try {
        await updateAdminStatus(res.locals.currentUser.id);
        res.redirect("/");
      } catch (err) {
        console.log(err);
        next(err);
      }
    } else {
      return res.status(400).render("adminForm", {
        title: "Become an Admin",
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

export { getMemberForm, postMemberForm, getAdminForm, postAdminForm };
