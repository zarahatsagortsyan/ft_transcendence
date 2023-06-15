import { User } from 'src/user/models/user.entity';
import { ChatMode } from './chat.entity';

export interface IChat {
    id: number;
    chat_name: string;
    owner_id: User;
    chat_mode: ChatMode;
    password: string;
}