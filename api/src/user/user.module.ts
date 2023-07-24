import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserController } from './controllers/user.controller';
import { Blocked } from './models/blocked.entity';
import { Friendship } from './models/friendship.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Blocked]),
        TypeOrmModule.forFeature([Friendship])

    ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], //added this line 
})
export class UserModule {}
