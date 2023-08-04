import { UseFilters } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './services/chat.service';
import { UseMessageDto, ChannelDto, DMDto } from './models/chat.dto';
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { HttpToWsFilter, ProperWsFilter } from './filter/chat.filter';
import {
	mute,
	oneMsg as oneMessage,
	oneUser,
	updateChannel,
	updateUser,
} from './models/chat.type';
import { UserService } from 'src/user/services/user.service';

@UsePipes(new ValidationPipe())
@UseFilters(new HttpToWsFilter())
@UseFilters(new ProperWsFilter())
@WebSocketGateway()
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	constructor(
		private readonly chatservice: ChatService,
		private userService: UserService,
	) { }

	
}