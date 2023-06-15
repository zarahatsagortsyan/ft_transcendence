import { UserStatus, UserRole } from './chat_membership.entity';
export interface IChatMembership {
    chat_id: number;
    user_id: number;
    user_status: UserStatus;
    user_role: UserRole;
}