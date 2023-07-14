import { WebSocketGateway } from '@nestjs/websockets'
import { GameService } from './services/game.service';
import { UserService } from 'src/user/services/user.service';
import { Server } from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: process.env.FRONT_URL,
    },
})
export class GameGateway {
    constructor (
        private gameService: GameService,
        private userService: UserService,
        // private appGateway: AppGateway,  //??
    ) {}
}