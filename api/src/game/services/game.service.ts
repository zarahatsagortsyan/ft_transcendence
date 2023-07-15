import { Injectable, Inject, forwardRef } from '@nestjs/common';
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
const paddelSpeed = 1

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
        if(game_data.player1Score == 11 || game_data.player2Score == 11){
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
				// game_data.startTime,
				// endTime,
			);
			// delete the room
			GameService.rooms.splice(GameService.rooms.findIndex((room) => room.id === id),1,);
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

    }

    //// updatePaddles
    updatePaddles(roomID: number){

    }

    updateRoom(player: number, roomID: number, direction: number) {
        if (player = 1)
            GameService.rooms.find((room) => room.id === roomID).paddleLeftDir = direction
        else
            GameService.rooms.find((room) => room.id === roomID).paddleRightDir = direction

    }

    async saveGame(id: number, user1ID: number, user2ID: number, score1: number, score2: number){

    }
}
