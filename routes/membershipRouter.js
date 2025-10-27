import { Router } from "express";
import {
  getAdminForm,
  getMemberForm,
  postAdminForm,
  postMemberForm,
} from "../controllers/membershipController.js";

const membershipRouter = Router();

membershipRouter.get("/member", getMemberForm);
membershipRouter.post("/member", postMemberForm);
membershipRouter.get("/admin", getAdminForm);
membershipRouter.post("/admin", postAdminForm);

export { membershipRouter };
