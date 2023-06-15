import { UserStatus } from "./user.entity";

export interface IUser {
    id?: number;
    user_name: string;
    nick_name: string;
    avatar: string;
    user_status : UserStatus;
    two_factor_auth : boolean,
        
    // email?: string;
    // user_status?: number;
    // createdAt?: Date;
}