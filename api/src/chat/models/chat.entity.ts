import { User } from 'src/user/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne, JoinColumn } from "typeorm";

export enum ChatMode {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PROTECTED = 'protected'
}

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    chat_name: string;

    @Column({ name: 'owner_id' })
    owner_id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'owner_id' })
    user: User;

    @Column({
        type: 'enum',
        enum: ChatMode,
    })
    chat_mode: ChatMode;

    // @Column()
    // users: Array<User>;
    // Check on this later
    @Column("text", { array: true, nullable: true })
    users: Promise<User>[];

    @Column({ nullable: true })
    password: string;
}