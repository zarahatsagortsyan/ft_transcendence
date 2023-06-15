import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

export enum FriendStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    INGAME = 'in_game',
}

@Entity('friendship')
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user_id: number;

    @ManyToOne(type => User, (user) => user.id)
    @JoinColumn({ name: 'friend_id' })
    friend_id: number;

    @Column({
        type: 'enum',
        enum: FriendStatus,
    })
    friend_status: FriendStatus;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}