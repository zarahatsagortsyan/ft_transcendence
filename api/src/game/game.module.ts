import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './services/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './models/game.entity';
import { GameController } from './controllers/game.controller';
import { GameGateway } from './game.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { AppModule } from 'src/app.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    ScheduleModule.forRoot(),
    forwardRef(() => AppModule),
    forwardRef(() => UserModule),
  ],
  providers: [GameService, GameGateway],
  controllers: [GameController],
  exports: [GameService]
})
export class GameModule {}
