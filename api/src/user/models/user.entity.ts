import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,Unique } from "typeorm";

export enum UserStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
    INGAME = 'in_game',
}
@Unique(['user_name'])
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    nick_name: string;

    @Column({ default: 'default.jpg' })
    avatar: string;

    // @Column({ default: '' })
    // email: string;

    @Column({ 
        type: 'enum',
        enum: UserStatus,
    })
    user_status: UserStatus;

    @Column({ default: false })
    two_factor_auth: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}