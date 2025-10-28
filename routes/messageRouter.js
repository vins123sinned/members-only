import { Router } from "express";
import {
  getMessageForm,
  postMessageDelete,
  postMessageForm,
} from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/create", getMessageForm);
messageRouter.post("/create", postMessageForm);
messageRouter.post("/delete/:messageId", postMessageDelete);

export { messageRouter };
