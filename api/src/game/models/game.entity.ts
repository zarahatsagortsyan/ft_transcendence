import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

//not used yet
// export enum GameMode {
//     EASY = 'easy',
//     NORMAL = 'normal',
//     HARD = 'hard',
// }

@Entity('game')
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player1: number;

    @Column()
    player2: number;

    @Column()
    score1: number;

    @Column()
    score2: number;

    //duration?
    //GameMode
}