import { body, validationResult, matchedData } from "express-validator";

const requiredErr = "is required";
const alphaErr = "must only contain letters";
const lengthErr = (maxLength, minLength = 1) =>
  `must be between ${minLength} and ${maxLength} characters`;
const emailErr = "must be a valid email address";
// passwords must be at least 8 characters long
const passwordErr =
  "must include a letter, number, and special character (!@$%^&*+#)";

const validateUser = [
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
  // could also add a check for existing email
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 64 })
    .withMessage(`Email ${lengthErr(255)}`)
    .bail()
    .isEmail()
    .withMessage(`Email ${emailErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${requiredErr}`)
    .bail()
    .isLength({ min: 1, max: 64 })
    .withMessage(`Password ${lengthErr(255)}`)
    .bail()
    .custom(async (value) => {
      // checks if password contains one letter, number, and a special character
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@$%^&*+#]).+$/;
      if (!regex.test(value)) throw new Error("");
      return true;
    })
    .withMessage(`Password ${passwordErr}`),
];

