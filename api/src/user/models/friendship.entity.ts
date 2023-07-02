import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn  } from "typeorm";
import { User } from "./user.entity";

export enum FriendStatus {
    ISFRIEND = 'accepted',
    FRPENDING = 'pending',
    // INGAME = 'in_game',
}

@Entity('friendship')
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user_id: number;

    // @ManyToOne(type => User, (user) => user.id)
    // // @Column()
    // friend: User;

    @ManyToOne(type => User, (user) => user.id)
    @JoinColumn({ name: 'friend_id' })
    friend_id: number;
    friend: User;
    
    @Column({
        type: 'enum',
        enum: FriendStatus,
    })
    friend_status: string;

    @CreateDateColumn()
   // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}