import { forwardRef, Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './models/chat.entity';
import { Message } from './models/message.entity';

import { UserModule } from 'src/user/user.module';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { Mute } from './models/mute.entity';
import { ChatGateway } from './chat.gateway';
import { User } from 'src/user/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forFeature([Mute]),
    TypeOrmModule.forFeature([User]),
    UserModule,
		// forwardRef(() => UserModule),
  ],
  controllers: [ChatController, MessageController],
  providers: [ChatService, MessageService, ChatGateway],
  exports: [ChatService, ChatGateway]
})
export class ChatModule {}
