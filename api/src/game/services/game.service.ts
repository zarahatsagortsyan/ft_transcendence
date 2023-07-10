import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../models/game.entity';
import { IGame } from '../models/game.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class GameService {
    constructor (
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>
    ) {}
    createGame(game: IGame) : Observable<Game> {
        return from (this.gameRepository.save(game))
    }
}
