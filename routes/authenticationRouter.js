import { Router } from "express";
import {
  getSignUp,
  postSignUp,
} from "../controllers/authenticationController.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserById, getUserByUsername } from "../db/queries.js";

const verify = async (username, password, done) => {
  const user = await getUserByUsername(username);

  try {
    if (!user) return done(null, false, { message: "Incorrect username!" });
    if (user.password !== password)
      return done(null, false, { message: "Incorrect password" });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(verify));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const authenticationRouter = Router();

authenticationRouter.get("/sign-up", getSignUp);
authenticationRouter.post("/sign-up", postSignUp);

export { authenticationRouter };
