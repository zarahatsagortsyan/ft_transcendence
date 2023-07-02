import { FriendStatus } from "./friendship.entity";
import { User } from "./user.entity";

export interface IFriendship {
    id?: number;
    user_id: number;
    friend_id: number;
    friend_status : FriendStatus;
    createdAt: Date;
}