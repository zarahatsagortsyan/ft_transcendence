import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
