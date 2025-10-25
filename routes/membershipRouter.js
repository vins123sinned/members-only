import { Router } from "express";
import {
  getMemberForm,
  postMemberForm,
} from "../controllers/membershipController.js";

const membershipRouter = Router();

membershipRouter.get("/member", getMemberForm);
membershipRouter.post("/member", postMemberForm);
// admin route

export { membershipRouter };
