import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { IMessage } from '../models/message.interface';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Post()
    create(@Body('') message: IMessage) : Observable<IMessage> {
        return this.messageService.createMessage(message);
    }
}