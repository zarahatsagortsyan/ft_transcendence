import { Controller, Post, Body, Get } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { IGame } from '../models/game.interface';
import { Observable } from 'rxjs';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService) {}

    @Post()
    create(@Body('') game: IGame) : Observable<IGame> {
        return this.gameService.createGame(game);
    }

    @Get('get_game')
    getGame(@Body('otherID') otherID: number) {
        return this.gameService.getGame(otherID)
    }
}
