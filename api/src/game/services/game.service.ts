import {
    Injectable,
    Inject,
    forwardRef,
    ForbiddenException,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../models/game.entity';
import { IGame } from '../models/game.interface';
import { Observable, from } from 'rxjs';
import { SchedulerRegistry } from '@nestjs/schedule';
import { UserService } from 'src/user/services/user.service';
import { Room } from '../models/room.interface';
import { Mutex } from 'async-mutex';
import { GameData } from '../models/gameData.interface'
import { Server } from 'socket.io';

const refreshRate = 10
const paddleSpeed = 1

@Injectable()
export class GameService {
    ballSpeed = 0.25
    static rooms: Room[] = []

    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
        private readonly schedulerRegistry: SchedulerRegistry,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) { }
    createGame(game: IGame): Observable<Game> {
        return from(this.gameRepository.save(game))
    }

    ////gameLoop
    async gameLoop(id: number, server: Server, game_data: GameData, mutex: Mutex) {
        const release = await mutex.acquire()
        if (!GameService.rooms.some((room) => room.id === id)) {
            release()
            return
        }
        if (GameService.rooms.find((room) => room.id === id).player1Disconnected == true) {
            server.to(GameService.rooms.find((room) => room.id === id).name)
                .emit('disconnected', 1);
            game_data.player2Score = 11;
        } else if (GameService.rooms.find((room) => room.id === id).player2Disconnected == true) {
            server.to(GameService.rooms.find((room) => room.id === id).name)
                .emit('disconnected', 2);
            game_data.player1Score = 11;
        } else {
            this.updateBall(id)
            this.updatePaddles(id)

            game_data.yBall = GameService.rooms.find((room) => room.id === id,
            ).yball;
            game_data.xBall = GameService.rooms.find((room) => room.id === id,
            ).xball;
            game_data.paddleLeft = GameService.rooms.find((room) => room.id === id,
            ).paddleLeft;
            game_data.paddleRight = GameService.rooms.find((room) => room.id === id,
            ).paddleRight;
            game_data.player1Score = GameService.rooms.find((room) => room.id === id,
            ).player1Score;
            game_data.player2Score = GameService.rooms.find((room) => room.id === id,
            ).player2Score;
        }
        server.to(GameService.rooms.find((room) => room.id === id).name).emit(
            'update', game_data)
        if (game_data.player1Score == 11 || game_data.player2Score == 11) {
            this.schedulerRegistry.deleteInterval(String(id));
            const winner =
                game_data.player1Score > game_data.player2Score ? 1 : 2;
            server
                .to(GameService.rooms.find((room) => room.id === id).name)
                .emit('end_game', winner);
            const endTime = new Date();
            this.saveGame(
                id,
                GameService.rooms.find((room) => room.id === id).player1.data
                    .id,
                GameService.rooms.find((room) => room.id === id).player2.data
                    .id,
                game_data.player1Score,
                game_data.player2Score,
            );
            // delete room
            GameService.rooms.splice(GameService.rooms.findIndex((room) => room.id === id), 1,);
        }
        release()
        return
    }

    async startGame(roomID: number, server: Server) {
        const game_data: GameData = {
            paddleLeft: 45,
            paddleRight: 45,
            xBall: 50,
            yBall: 50,
            player1Name: GameService.rooms.find((room) => room.id === roomID).player1Name,
            player2Name: GameService.rooms.find((room) => room.id === roomID).player2Name,
            player1Avatar: GameService.rooms.find((room) => room.id == roomID).player1.data.id,
            player2Avatar: GameService.rooms.find((room) => room.id == roomID).player2.data.id,
            player1Score: 0,
            player2Score: 0,
            startTime: new Date(),
        }
        const mutex = new Mutex()
        this.initBall(roomID)
        const interval = setInterval(() => {
            this.gameLoop(roomID, server, game_data, mutex)
        }, refreshRate)             //main game loop
        this.schedulerRegistry.addInterval(String(roomID), interval)
    }

    initBall(roomID: number) {
        GameService.rooms.find((room) => room.id === roomID).xball = 50
        GameService.rooms.find((room) => room.id === roomID).yball = 50
        GameService.rooms.find((room) => room.id === roomID).ballSpeed = this.ballSpeed
        GameService.rooms.find((room) => room.id === roomID).xSpeed = this.ballSpeed
        GameService.rooms.find((room) => room.id === roomID).ySpeed = 0.15 +
            Math.random() * this.ballSpeed

        let direction = Math.round(Math.random())
        if (direction)
            GameService.rooms.find((room) => room.id === roomID).xSpeed *= -1
        direction = Math.round(Math.random())
        if (direction)
            GameService.rooms.find((room) => room.id === roomID).ySpeed *= -1
    }

    //// updateBall
    updateBall(roomID: number) {
        GameService.rooms.find((room) => room.id === roomID).xball +=
            GameService.rooms.find((room) => room.id === roomID).xSpeed;
        GameService.rooms.find((room) => room.id === roomID).yball +=
            GameService.rooms.find((room) => room.id === roomID).ySpeed;

        // ball collision with floor or ceilling
        if (GameService.rooms.find((room) => room.id === roomID).yball > 98) {
            GameService.rooms.find((room) => room.id === roomID).yball = 98;
            GameService.rooms.find((room) => room.id === roomID).ySpeed *= -1;
        }

        if (GameService.rooms.find((room) => room.id === roomID).yball < 2) {
            GameService.rooms.find((room) => room.id === roomID).yball = 2;
            GameService.rooms.find((room) => room.id === roomID).ySpeed *= -1;
        }

        // ball collision with right paddle (paddle position is 3% from the border, paddle height is 10% of the game windows)
        if (
            GameService.rooms.find((room) => room.id === roomID).xball >=
            97 - 2 / 1.77 &&
            GameService.rooms.find((room) => room.id === roomID).yball >=
            GameService.rooms.find((room) => room.id === roomID)
                .paddleRight -
            1 &&
            GameService.rooms.find((room) => room.id === roomID).yball <=
            GameService.rooms.find((room) => room.id === roomID)
                .paddleRight +
            11
        ) {
            // ball radius is 1vh
            GameService.rooms.find((room) => room.id === roomID).xball =
                97 - 2 / 1.77;
            GameService.rooms.find(
                (room) => room.id === roomID,
            ).ballSpeed *= 1.05;
            GameService.rooms.find((room) => room.id === roomID).xSpeed *=
                -1.05;
            GameService.rooms.find((room) => room.id === roomID).ySpeed =
                ((GameService.rooms.find((room) => room.id === roomID).yball -
                    GameService.rooms.find((room) => room.id === roomID)
                        .paddleRight -
                    5) /
                    6) *
                GameService.rooms.find((room) => room.id === roomID).ballSpeed; // make ball go up, straight or down based on  the part of the paddle touched
        }
        // ball collision with left paddle
        if (
            GameService.rooms.find((room) => room.id === roomID).xball <=
            3 + 2 / 1.77 &&
            GameService.rooms.find((room) => room.id === roomID).yball >=
            GameService.rooms.find((room) => room.id === roomID)
                .paddleLeft -
            1 &&
            GameService.rooms.find((room) => room.id === roomID).yball <=
            GameService.rooms.find((room) => room.id === roomID)
                .paddleLeft +
            11
        ) {
            GameService.rooms.find((room) => room.id === roomID).xball =
                3 + 2 / 1.77;
            GameService.rooms.find(
                (room) => room.id === roomID,
            ).ballSpeed *= 1.05;
            GameService.rooms.find((room) => room.id === roomID).xSpeed *=
                -1.05;
            GameService.rooms.find((room) => room.id === roomID).ySpeed =
                ((GameService.rooms.find((room) => room.id === roomID).yball -
                    GameService.rooms.find((room) => room.id === roomID)
                        .paddleLeft -
                    5) /
                    6) *
                GameService.rooms.find((room) => room.id === roomID).ballSpeed;
        }
        // end of point management
        if (
            GameService.rooms.find((room) => room.id === roomID).xball >=
            100 + 2 / 1.77
        ) {
            GameService.rooms.find(
                (room) => room.id === roomID,
            ).player1Score += 1;
            this.initBall(
                GameService.rooms.find((room) => room.id === roomID).id,
            );
        }
        if (
            GameService.rooms.find((room) => room.id === roomID).xball <=
            0 - 2 / 1.77
        ) {
            GameService.rooms.find(
                (room) => room.id === roomID,
            ).player2Score += 1;
            this.initBall(
                GameService.rooms.find((room) => room.id === roomID).id,
            );
        }
    }

    //// updatePaddles
    updatePaddles(roomID: number) {
        if (GameService.rooms.find((room) => room.id === roomID).paddleLeftDir == 1) {
            GameService.rooms.find((room) => room.id === roomID).paddleLeft -= paddleSpeed;
            if (GameService.rooms.find((room) => room.id === roomID).paddleLeft < 0)
                GameService.rooms.find(
                    (room) => room.id === roomID,
                ).paddleLeft = 0;
        } else if (
            GameService.rooms.find((room) => room.id === roomID)
                .paddleLeftDir == 2
        ) {
            GameService.rooms.find((room) => room.id === roomID).paddleLeft +=
                paddleSpeed;
            if (
                GameService.rooms.find((room) => room.id === roomID)
                    .paddleLeft > 90
            )
                GameService.rooms.find(
                    (room) => room.id === roomID,
                ).paddleLeft = 90;
        }
        if (
            GameService.rooms.find((room) => room.id === roomID)
                .paddleRightDir == 1
        ) {
            GameService.rooms.find((room) => room.id === roomID).paddleRight -=
                paddleSpeed;
            if (
                GameService.rooms.find((room) => room.id === roomID)
                    .paddleRight < 0
            )
                GameService.rooms.find(
                    (room) => room.id === roomID,
                ).paddleRight = 0;
        } else if (
            GameService.rooms.find((room) => room.id === roomID)
                .paddleRightDir == 2
        ) {
            GameService.rooms.find((room) => room.id === roomID).paddleRight +=
                paddleSpeed;
            if (
                GameService.rooms.find((room) => room.id === roomID)
                    .paddleRight > 90
            )
                GameService.rooms.find(
                    (room) => room.id === roomID,
                ).paddleRight = 90;
        }
    }

    updateRoom(player: number, roomID: number, direction: number) {
        if (player = 1)
            GameService.rooms.find((room) => room.id === roomID).paddleLeftDir = direction
        else
            GameService.rooms.find((room) => room.id === roomID).paddleRightDir = direction

    }

    async saveGame(id: number, user1ID: number, user2ID: number, score1: number, score2: number) {
        const game: IGame = {
            id: id,
            player1: user1ID,
            player2: user2ID,
            score1: score1,
            score2: score2,
        };
        await from(this.gameRepository.save(game));

        try {
			const winnerId = score1 > score2 ? user1ID : user2ID;
			const loserId = score1 > score2 ? user2ID : user1ID;

			this.userService.hasWon(winnerId);
			this.userService.hasLost(loserId);

			const winner = await this.userService.getUser(winnerId)
			const loser = await this.userService.getUser(loserId);

			// update scores, should not be equal to 1200
			const oldScores = [winner.score, loser.score];
			const newScores = await this.userService.calculateScores(oldScores);
			if (Math.floor(newScores[0]) === 1200) newScores[0]++;
			if (Math.floor(newScores[1]) === 1200) newScores[0]--;

            this.userService.updateGameHistoryScore(winnerId, id, newScores[0]);
            this.userService.updateGameHistoryScore(loserId, id, newScores[1]);

			// await this.prisma.user.update({
			// 	where: {
			// 		id: winnerId,
			// 	},
			// 	data: {
			// 		score: Math.floor(newScores[0]),
			// 		gameHistory: {
			// 			push: id,
			// 		},
			// 	},
			// });
			// await this.prisma.user.update({
			// 	where: {
			// 		id: loserId,
			// 	},
			// 	data: {
			// 		score: Math.floor(newScores[1]),
			// 		gameHistory: {
			// 			push: id,
			// 		},
			// 	},
			// });

            // will be added in user.service.
			// this.userService.updateRanks();
			return game;
		} catch (error) {
			throw new ForbiddenException('saveGame error : ' + error);
		}

        
    }

    async getGame(game_id: number) {
        if (game_id === undefined) {
            throw new BadRequestException('Undefigned game ID');
        }

        try {
            const user = await this.gameRepository.findOne({
                where: {
                    id: game_id,
                },
            });
            return user;

        }
        catch (error) {
            throw new ForbiddenException('getGame error: ' + error);
        }
    }

    async testID(id: number) {
        const game = await this.gameRepository.findOne({
            where: {
                id: id,
            },
        });
        return game;
    }

    async generate_new_id(): Promise<number> {
        const id = Math.floor(Math.random() * 1_000_000 + 1);
        const usedId = await this.testID(id);
        if (!GameService.rooms.some((room) => room.id === id) && !usedId)
            return id;
        return this.generate_new_id();
    }
    // async getLastGames() {
    //     //returns a record of all the users, ordered by endTime in descending order
    //     const games = await this.prisma.game.findMany({
    //         orderBy: { endTime: 'desc' },
    //     });

    //     return games;
    // }

}
