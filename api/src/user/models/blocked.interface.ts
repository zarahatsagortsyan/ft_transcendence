import { User, UserStatus } from "./user.entity";

export interface IBlocked {
    blocker_id: number;
    blocked_id: number;
    // createdAt:Date;
}