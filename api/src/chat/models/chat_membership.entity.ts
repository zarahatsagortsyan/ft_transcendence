import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne, JoinColumn,CreateDateColumn } from "typeorm";
import { User } from 'src/user/models/user.entity';

export enum UserStatus {
    ACTIVE = 'active',
    MUTE = 'mute',
    BANNED = 'banned',
}

export enum UserRole {
    MEMB = 'member',
    ADMIN = 'administrator',
}

@Entity('chat_membership')
export class Chat_Membership {
    @PrimaryGeneratedColumn()
    chat_id: number;

    // @Column()
    // user_id: number;
    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user_id: User;

    @Column({
        type: 'enum',
        enum: UserStatus,
    })
    user_status: UserStatus;

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    user_role: UserRole;


    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}