import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { GameController } from './game/controllers/game.controller';
import { GameModule } from './game/game.module';
import { GameService } from './game/services/game.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot( {
        name:'default',
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string> process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        autoLoadEntities: true,
        synchronize:true,

      }),
    UserModule,
    ChatModule,
    GameModule,
  ],
  controllers: [AppController, GameController],
  providers: [AppService, GameService],
})
export class AppModule {}
