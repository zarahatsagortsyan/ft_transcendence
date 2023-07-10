import { Module } from '@nestjs/common';
import { GameService } from './services/game.service';

@Module({
  providers: [GameService]
})
export class GameModule {}
