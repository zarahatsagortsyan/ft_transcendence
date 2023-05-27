import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class UserPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    body: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}