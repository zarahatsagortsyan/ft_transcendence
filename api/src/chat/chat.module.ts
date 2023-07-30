import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './models/chat.entity';
import { Message } from './models/message.entity';
import { Chat_Membership } from './models/chat_membership.entity';

import { UserModule } from 'src/user/user.module';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forFeature([Chat_Membership]),
    UserModule,
  ],
  controllers: [ChatController, MessageController],
  providers: [ChatService, MessageService],
  exports: [ChatService]
})
export class ChatModule {}
