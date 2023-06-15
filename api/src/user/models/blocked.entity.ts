import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Unique, Index } from "typeorm";
import { User } from "./user.entity";

//v\combination of these must be unique
@Unique(["blocker_id", "blocked_id"])
@Entity('blocked')
export class Blocked {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'blocker_id' })
    blocker_id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'blocked_id' })
    blocked_id: number;

    // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    // createdAt: Date;
}