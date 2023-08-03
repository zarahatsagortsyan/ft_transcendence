import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Chat, ChatMode } from '../models/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IChat } from '../models/chat.interface';
import { Observable, from } from 'rxjs';
import { IMessage } from '../models/message.interface';
import { Message } from '../models/message.entity';
import { UserStatus, UserRole } from '../models/chat_membership.entity';
import { User } from 'src/user/models/user.entity';
import { equal } from 'assert';
import { WsException } from '@nestjs/websockets';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ChatService {
    channels: Array<IChat>
    
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        private readonly userSeervice: UserService
    ) {}
    
    createChat(chat: IChat) : Observable<Chat> {
        this.channels.push(chat)
        return from(this.chatRepository.save(chat));
    }

    // async deleteChat(owner_id: number, chat_id: number) {
        
    //     try {
    //         const chatToDelete = await this.chatRepository.findOneById(chat_id);
    
    //         if (chatToDelete.owner_id != owner_id) {
    //             throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    //         }
            
    //         return from(this.chatRepository.remove(chatToDelete));

    //     }
    //     catch (error) {
    //         console.log (error)
    //     }
    // }

    // async changePass(owner_id: number, chat_id: number, old_pass: string, new_pass: string) {
        
    //     try {

    //         const chatToReplacePass = await this.chatRepository.findOneById(chat_id);
            
    //         console.log(chatToReplacePass);
    //         if (chatToReplacePass.owner_id != owner_id) {
    //             throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    //         }

    //         if (chatToReplacePass.password !== old_pass) {
    //             throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    //         }
    //         chatToReplacePass.password = new_pass
    
    //         return from(this.chatRepository.save(chatToReplacePass));
    //     }
    //     catch (error) {
    //         console.log (error)
    //     }
    // }

    // async changeMode(owner_id: number, chat_id: number, mode: ChatMode) {
    //     try {
    //         const chatToReplaceMode = await this.chatRepository.findOneById(chat_id);
            
    //         if (chatToReplaceMode.owner_id != owner_id) {
    //             throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    //         }
    //         chatToReplaceMode.chat_mode = mode

    //         return from(this.chatRepository.save(chatToReplaceMode));
    //     }
    //     catch (error) {
    //         console.log (error)
    //     }
    // }

    // async joinChat(chat_id: number, user_id: number, user_role: UserRole) {
        
    //     try {
    //         const chatToJoin = await this.chatRepository.findOneById(chat_id);
    //         const user = this.userSeervice.getUser(user_id);
    //         // user.role = user_role

    //         chatToJoin.members.push(user)
    //     }
    //     catch (error) {
    //         console.log (error)
    //     }

    // }

    // async listUsers(chat_id: number) {
    //     try {
    //         const chatToGetUsers = await this.chatRepository.findOneById(chat_id);
            
    //         let count = 0;
    //         for (const [index, user] of chatToGetUsers.members.entries()) {
    //             console.log('   user %d: %s', index, (await user).nick_name);
    //             count = index + 1;
    //         }
    //         console.log('total %d users', count);
    //         return;
    //     }
    //     catch (error) {
    //         console.log (error)
    //     }
    // }

    // // Check where to keep channels 
    // async listChannels() {
	// 	let count = 0;
	// 	for (const [index, channel] of this.channels.entries()) {
	// 		console.log('   channel %d: %s', index, channel.name);
	// 		count = index + 1;
	// 	}
	// 	console.log('total %d channels', count);
	// 	return;
	// }

    // // async getUserIdByEmail(email: string) {
	// // 	try {
    // //         const user = this.userSeervice.getUserByEmail(email);
            
	// // 		return (await user).id;
	// // 	} catch (error) {
	// // 		console.log('getUserIdByEmail error:', error);
	// // 	}
	// // }

    // async getCannelName(chat_id: number) {
	// 	try {
    //         const chatToFind = await this.chatRepository.findOneById(chat_id);

    //         return chatToFind.name
	// 	} catch (error) {
	// 		console.log('get__Cname__ByCId error:', error);
	// 		throw new WsException(error);
	// 	}
	// }

    // async getUserCannels(user_id: number) {
    //     try {
    //         // const user = this.userSeervice.getUser(user_id);
    //         const channel_list = []
    
    //         for (const chat of this.channels) {
    //             for (const user of chat.members) {
    //                 if ((await user).id == user_id) {
    //                     channel_list.push(chat)
    //                     break
    //                 }
    //             }
    //         }
    //         return channel_list
    //     } catch (error) {
    //         console.log('getUserCannels error:', error);
    //     }
    // }
}
