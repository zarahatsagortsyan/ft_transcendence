import { Injectable } from '@nestjs/common';
import { Chat } from '../models/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IChat } from '../models/chat.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>
    ) {}
    createChat(chat: IChat) : Observable<Chat> {
        return from(this.chatRepository.save(chat));
    }
}
