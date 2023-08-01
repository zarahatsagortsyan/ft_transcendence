import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable,Unique } from "typeorm";
import { IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';

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

    @IsString()
	@IsNotEmpty()
    @Column()
    user_name: string;


    @Column()
    nick_name: string;

    @Column()
    @IsString()
	@IsNotEmpty()
	@MaxLength(65_000)
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

    @Column({ default: 'null' })
    two_factor_secret: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({ default: 'null' })
    refresh_token: string;

	@IsNumber()
	@IsNotEmpty()
    @Column({ default: 0 })
	gamesWon: number;

	@IsNumber()
	@IsNotEmpty()
    @Column({ default: 0 })
	gamesLost: number;

	@IsNumber()
	@IsNotEmpty()
    @Column({ default: 0 })
	gamesPlayed: number;

	@IsNumber()
	@IsNotEmpty()
    @Column({ default: 0 })
	rank: number;

	@IsNumber()
	@IsNotEmpty()
    @Column({ default: 0 })
	score: number;

    @IsNumber()
	@IsNotEmpty()
    @Column({ default: 0 })
    winRate: number;
    @Column({ type: 'integer', array: true, default: [] })
    gameHistory: number[];
}