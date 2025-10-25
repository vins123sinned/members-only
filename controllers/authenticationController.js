import passport from "passport";
import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";
import { insertUser } from "../db/queries.js";

const requiredErr = "is required";
const alphaErr = "must only contain letters";
const lengthErr = (maxLength, minLength = 1) =>
  `must be between ${minLength} and ${maxLength} characters`;
const usernameErr = "must not contain any special characters";
const emailErr = "must be a valid email address";
const passwordErr =
  "must include a letter, number, and special character (!@$%^&*+#)";
const confirmErr = "do not match";

const validateSignIn = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage(`First name ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 64 })
    .withMessage(`First name ${lengthErr(64)}`)
    .bail()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage(`Last name ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 64 })
    .withMessage(`Last name ${lengthErr(64)}`)
    .bail()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`),
  // could also add a check for existing username
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${requiredErr}`)
    .bail()
    .isLength({ min: 3, max: 64 })
    .withMessage(`Username ${lengthErr(255, 3)}`)
    .bail()
    .custom((value) => {
      // must be a valid username (letters, numbers, dots and underscores only)
      if (value.includes("@")) return true;

      const regex = /^(?=.{3,255}$)[a-zA-Z0-9](?:[a-zA-Z0-9._]*[a-zA-Z0-9])$/;
      if (!regex.test(value)) throw new Error("Invalid username format");
      return true;
    })
    .withMessage(`Username ${usernameErr}`)
    .bail()
    .custom((value) => {
      // must be a valid email address
      if (!value.includes("@")) return true;

      const regex =
        /^(?=.{3,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
      if (!regex.test(value)) throw new Error("Invalid email format");
      return true;
    })
    .withMessage(`Email ${emailErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage(`Password ${lengthErr(255, 8)}`)
    .bail()
    .custom((value) => {
      // checks if password contains one letter, number, and a special character
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@$%^&*+#]).+$/;
      if (!regex.test(value)) throw new Error("Invalid password format");
      return true;
    })
    .withMessage(`Password ${passwordErr}`),
  body("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error(`Passwords must match`);
      return true;
    })
    .withMessage(`Passwords ${confirmErr}`),
];

const getSignUp = (req, res) => {
  res.render("signUp", {
    title: "Sign Up",
  });
};

const postSignUp = [
  validateSignIn,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", {
        title: "Sign Up",
        previousValues: req.body,
        errors: errors.array(),
      });
    }

    const { first_name, last_name, username, password } = matchedData(req);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await insertUser(first_name, last_name, username, hashedPassword);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
];

const getLogIn = (req, res) => {
  res.render("logIn", {
    title: "Log In",
  });
};

const postLogIn = (req, res, next) => {
  // create our own authenticate callback to show error message
  // we immediately invoke this function (IIFE)
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).render("logIn", {
        title: "Log In",
        previousValues: req.body,
        errors: [
          {
            path: "authentication",
            msg: "The username or password is incorrect",
          },
        ],
      });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
};

const getLogOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

export { getSignUp, postSignUp, getLogIn, postLogIn, getLogOut };
