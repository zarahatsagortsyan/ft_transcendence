import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './models/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat])
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
