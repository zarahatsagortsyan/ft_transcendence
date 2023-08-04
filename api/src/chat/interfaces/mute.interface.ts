import { User } from "src/user/models/user.entity";
import { Chat } from "../models/chat.entity";

export interface Mute {
  id: number;
  finishAt: Date;
  checkAt: Date;
  finished: boolean;
  muted: User;
  chat: Chat;
}