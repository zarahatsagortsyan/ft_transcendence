import { User } from 'src/user/models/user.entity';
import { ChatMode } from './chat.entity';
import { Message } from './message.entity';

export interface IChat {
    id: number;
    name: string;
    dm: boolean;
    private: boolean;
    isPassword: boolean;
    password: string | null;
    owner: User;
    admins: User[];
    members: User[];
    inviteds: User[];
    blocked: User[];
    messages: Message[];

    // chat_mode: ChatMode;
    // members: Promise<User>[];
    // password?: string;
    // admins: Promise<User>[];
    // blocked: Promise<User>[];
}


export interface Chat {
    id: number;
    name: string;
    dm: boolean;
    private: boolean;
    isPassword: boolean;
    password: string | null;
    owner: User;
    admins: User[];
    members: User[];
    inviteds: User[];
    blocked: User[];
    messages: Message[]; // Assuming the Message entity is defined as well
  }