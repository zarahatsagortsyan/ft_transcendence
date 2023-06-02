import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { IChat } from '../models/chat.interface';
import { Observable } from 'rxjs';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    create(@Body('') chat: IChat) : Observable<IChat> {
        return this.chatService.createChat(chat);
    }
}
