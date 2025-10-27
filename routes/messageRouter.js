import { Router } from "express";
import {
  getMessageForm,
  postMessageForm,
} from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/create", getMessageForm);
messageRouter.post("/create", postMessageForm);

export { messageRouter };
