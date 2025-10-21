import { Router } from "express";
import { getSignUp, postSignUp } from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.get("/sign-up", getSignUp);
authenticationRouter.post("/sign-up", postSignUp);

export { authenticationRouter };
