import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { Observable } from "rxjs";
import { ChatService } from '../services/chat.service';
import { IChat } from '../interfaces/chat.interface';
import { ChatMode } from '../models/chat.entity';
import { IMessage } from '../interfaces/message.interface';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    // @Post('removeChat')
    // removeChat(@Query('owner_id') owner_id: number,@Query('chat_id') chat_id: number) {
    //     return this.chatService.deleteChat(owner_id, chat_id);
    // }
    @Post('createChat')
    createChat(@Body('') chat: IChat) : Observable<IChat> {
        return this.chatService.createChat(chat);
    }

    @Post('listAllChannels')
    listAllChannels() {
        return this.chatService.listAllChannels();
    }
    // @Post('changePass')
    // changePass(@Query('owner_id') owner_id: number, @Query('chat_id') chat_id: number,
    //             @Query('old_pass') old_pass: string, @Query('new_pass') new_pass: string) {
    //     return this.chatService.changePass(owner_id, chat_id, old_pass, new_pass);
    // }
    // @Post('changeMode')
    // changeMode(@Query('owner_id') owner_id: number, @Query('chat_id') chat_id: number,
    //             @Query('mode') mode: ChatMode) {
    //     return this.chatService.changeMode(owner_id, chat_id, mode);
    // }
    // @Get('listUsers')
    // listUsers(@Query('chat_id') chat_id: number) {
    //     return this.chatService.listUsers(chat_id);
    // }
    
    // @Post('sendDM')
    // sendDM(@Body('') message: IMessage) {
    //     return this.chatService.sendDM(message);
    // }
}