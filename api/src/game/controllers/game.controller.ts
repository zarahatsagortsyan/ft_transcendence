import { Controller, Post, Body, Get } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { IGame } from '../models/game.interface';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Game')
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

    @Get('get_last_games')
	getLastGames() {
		return this.gameService.getLastGames();
	}

    @Post('/save_game')
	async saveGame(
		@Body('id') id: number,
		@Body('userId1') userId1: number,
		@Body('userId2') userId2: number,
		@Body('score1') score1: number,
		@Body('score2') score2: number,
	) {
		// console.log('Going through saveGame in game.controller');
		const result = await this.gameService.saveGame(
			id,
			userId1,
			userId2,
			score1,
			score2,
		);
		return result;
	}
}
