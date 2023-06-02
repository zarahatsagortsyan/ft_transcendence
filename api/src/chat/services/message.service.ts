import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Message } from '../models/message.entity';
import { IMessage } from '../models/message.interface';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {}

    createMessage(message: IMessage) : Observable<Message> {
        return from(this.messageRepository.save(message));
    }
}