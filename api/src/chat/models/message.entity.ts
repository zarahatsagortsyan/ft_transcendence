import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    chat_id: number;
    
    @Column()
    user_id: number;

    @Column()
    text: string;
 
    @CreateDateColumn()
    created_at: Date;
}