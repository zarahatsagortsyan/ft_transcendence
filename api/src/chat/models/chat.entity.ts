import { User } from 'src/user/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Message } from './message.entity';

export enum ChatMode {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PROTECTED = 'protected'
}

@Unique(['name'])
@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: false })
    dm: boolean;

    @Column({ default: false })
    private: boolean;

    @Column({ default: false })
    isPassword: boolean;

    @Column({ nullable: true })
    password: string;

    @ManyToOne(() => User, user => user.ownedChats)
    owner: User;

    @ManyToMany(() => User, user => user.adminChats)
    @JoinTable({ name: "admins" })
    admins: User[]

    @ManyToMany(() => User, user => user.memberChannels)
    @JoinTable({ name: "member" })
    members: User[];

    @ManyToMany(() => User, user => user.invitedChannels)
    @JoinTable({ name: "invite" })
    inviteds: User[];

    @ManyToMany(() => User, user => user.blockedChannels)
    @JoinTable({ name: "blocked" })
    blocked: User[];

    // @OneToMany(() => Mute, mute => mute.channel)
    // muted: Mute[];

    @OneToMany(() => Message, msg => msg.channel)
    messages: Message[];
    // @Column({ name: 'owner_id' })
    // owner_id: number;

    // @Column({ name: 'admins' })
    // admins: Promise<User>[];

    // @Column({ name: 'blocked' })
    // blocked: Promise<User>[];


    // @Column()
    // users: Array<User>;
    // Check on this later
    // @Column("text", { array: true, nullable: true })
    // members: Promise<User>[];

    // @Column({
    //     type: 'enum',
    //     enum: ChatMode,
    // })
    // chat_mode: ChatMode;


}