import { User } from 'src/user/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { Chat } from './chat.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // chat_id: number;

    // @Column()
    // user_id: number;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    // @Column()
    // owner_id: number;

    @ManyToOne(() => User, user => user.userMessages)
    owner: User;

    @ManyToOne(() => Chat, chat => chat.messages)
    channel: Chat;
}
