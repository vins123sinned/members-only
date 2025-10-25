import { Router } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { getUserById, getUserByUsername } from "../db/queries.js";
import {
  getLogIn,
  getLogOut,
  getSignUp,
  postLogIn,
  postSignUp,
} from "../controllers/authenticationController.js";

const verify = async (username, password, done) => {
  const user = await getUserByUsername(username);

  try {
    if (!user) return done(null, false, { message: "Incorrect username!" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: "Incorrect password" });

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
authenticationRouter.get("/log-in", getLogIn);
authenticationRouter.post("/log-in", postLogIn);
authenticationRouter.get("/log-out", getLogOut);

export { authenticationRouter };
