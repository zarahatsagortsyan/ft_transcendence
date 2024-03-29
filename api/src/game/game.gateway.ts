import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { GameService } from './services/game.service';
import { UserService } from 'src/user/services/user.service';
import { Server } from 'socket.io'
import { AppGateway } from 'src/app.gateway';
import { Client } from './models/client.interface';
import { Player } from './models/player.interface';
import { Room } from './models/room.interface';
import { User } from 'src/user/models/user.entity';

@WebSocketGateway({
    cors: {
        origin: process.env.FRONT_URL,
    },
})
export class GameGateway {
    constructor(
        private gameService: GameService,
        private userService: UserService,
        private appGateway: AppGateway,
    ) { }

    @WebSocketServer()
    server: Server

    @SubscribeMessage('start')
    async handleStart(@ConnectedSocket() client: Client): Promise<Player> {
        const user = await this.userService.getUser(client.data.id);
        if (GameService.rooms.some((room) => room.player1.data.id === client.data.id)
            || GameService.rooms.some((room) => { room.player2 && room.player2.data.id === client.data.id })) {
            return {
                playerNb: 3,
                roomID: 0,
            };
        }
        // data to be provided to the client
        const player: Player = {
            playerNb: 0,
            roomID: 0,
        };

        if (
            GameService.rooms.length === 0 ||
            GameService.rooms[GameService.rooms.length - 1].player2 ||
            GameService.rooms[GameService.rooms.length - 1].private
        ) {
            // no player in the queue
            const newId = await this.gameService.generate_new_id();
            const newRoom: Room = {
                id: newId,
                name: newId.toString(),
                player1: client,
                player1Name: await this.userService
                    .getUser(client.data.id)
                    .then((value: User) => value.user_name),
                player1Avatar: await this.userService
                    .getUser(client.data.id)
                    .then((value: User) => value.avatar),
                paddleLeft: 45,
                paddleRight: 45,
                paddleLeftDir: 0,
                paddleRightDir: 0,
                player1Score: 0,
                player2Score: 0,
                private: false,
            };
            GameService.rooms.push(newRoom);
            client.join(GameService.rooms[GameService.rooms.length - 1].name); // create a new websocket room
            player.playerNb = 1;
        } else {
            // one player is already waiting for an opponent

            GameService.rooms[GameService.rooms.length - 1].player2 = client;
            GameService.rooms[GameService.rooms.length - 1].player2Name =
                await this.userService
                    .getUser(client.data.id)
                    .then((value: User) => value.user_name);
            GameService.rooms[GameService.rooms.length - 1].player2Avatar =
                await this.userService
                    .getUser(client.data.id)
                    .then((value: User) => value.avatar);
            client.join(GameService.rooms[GameService.rooms.length - 1].name);
            this.server
                .to(GameService.rooms[GameService.rooms.length - 1].name)
                .emit('game_started', {}); // inform clients that the game is starting
            this.gameService.startGame(
                GameService.rooms[GameService.rooms.length - 1].id,
                this.server,
            );
            player.playerNb = 2;

            //sending status update to the front
            const player1Id =
                GameService.rooms[GameService.rooms.length - 1].player1.data.id;
            console.log(player1Id);
            this.appGateway.inGameFromService(user.id);
            this.appGateway.inGameFromService(player1Id);
        }
        player.roomID = GameService.rooms[GameService.rooms.length - 1].id;

        return player; // send data to client
    }

    @SubscribeMessage('move')
    handleMove(
        @MessageBody('room') rid: number,
        @MessageBody('player') pid: number,
        @MessageBody('dir') direction: number,
    ) : any {
        this.gameService.updateRoom(rid, pid, direction)
    }

    @SubscribeMessage('join')
	handlejoin(
		@MessageBody('roomId') rid: number,
		@ConnectedSocket() client: Client,
	): boolean {
		if (this.server.sockets.adapter.rooms.has(String(rid))) {
			client.join(String(rid));
			return true;
		} else {
			return false;
		}
	}

	@SubscribeMessage('unjoin')
	async handleunjoin(
		@MessageBody('roomId') rid: number,
		@ConnectedSocket() client: Client,
	): Promise<boolean> {
		if (this.server.sockets.adapter.rooms.has(String(rid))) {
			await client.leave(String(rid));
			//client.disconnect();
			return true;
		} else {
			return false;
		}
	}
}