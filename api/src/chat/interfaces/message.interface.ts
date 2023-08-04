import { User } from "src/user/models/user.entity";
import { Chat } from "../models/chat.entity";

export interface IMessage {
    id: number;
    text: string;
    created_at: Date;
    owner: User;
    channel: Chat;
}