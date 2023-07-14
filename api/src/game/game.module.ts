import { Module } from '@nestjs/common';
import { GameService } from './services/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './models/game.entity';
import { GameController } from './controllers/game.controller';
import { GameGateway } from './game.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game])
  ],
  providers: [GameService, GameGateway],
  controllers: [GameController],
})
export class GameModule {}
