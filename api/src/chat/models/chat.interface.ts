import { ChatMode } from './chat.entity';

export interface IChat {
    id: number;
    chat_name: string;
    members: string[];
    owner_id: number;
    admin_ids: number[];
    chat_mode: ChatMode;
    password: string;
    is_direct: boolean;
}