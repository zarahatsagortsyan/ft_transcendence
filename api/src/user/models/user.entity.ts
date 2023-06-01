import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    INGAME = 'in_game',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    user_name: string;

    @Column({ default: 'default.jpg' })
    avatar: string;

    @Column({ default: '' })
    email: string;

    @Column({ 
        type: 'enum',
        enum: UserStatus,
    })
    user_status: UserStatus;

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];

    @Column('text', {array: true})
    blocked_users: string[];

    @Column({ default: false })
    two_factor_auth: boolean;

    // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    // createdAt: Date;
}