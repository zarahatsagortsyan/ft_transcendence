import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum ChatMode {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PROTECTED = 'protected',
}

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chat_name: string;

    @Column('text', { array: true })
    members: string[];

    @Column()
    owner_id: number;

    @Column('integer', { array: true })
    admin_ids: number[];

    @Column({
        type: 'enum',
        enum: ChatMode,
    })
    chat_mode: ChatMode;

    @Column({ nullable: true })
    password: string;

    @Column('integer', { array: true })
    blocked_users: number[];
    
    @Column()
    is_direct: boolean;
}