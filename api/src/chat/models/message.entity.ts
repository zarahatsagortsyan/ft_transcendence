import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    chat_id: number;
 
    @Column()
    owner_username: string;
 
    @Column()
    owner_id: number;

    @CreateDateColumn()
    created_at: Date;
}