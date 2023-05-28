import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    user_name: string;

    @Column({ default: 'default.jpg' })
    avatar: string;

    @Column({ default: '' })
    email: string;

    @Column({ default: 0})
    user_status: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}