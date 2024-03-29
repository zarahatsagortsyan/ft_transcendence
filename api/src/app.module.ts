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
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { JwtModule } from '@nestjs/jwt';
import configg from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot( {
        name:'default',
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string> process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USE,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        autoLoadEntities: true,
        synchronize:true,
      }),
    // TypeOrmModule.forRoot(configg),
    UserModule,
    ChatModule,
    GameModule,
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],  ////added AppGateway
  exports: [AppGateway],  ////added this line
})
export class AppModule {}
