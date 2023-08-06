import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Chat, ChatMode } from '../models/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IChat } from '../interfaces/chat.interface';
import { Observable, from } from 'rxjs';
import { IMessage } from '../interfaces/message.interface';
import { Message } from '../models/message.entity';
import { User } from 'src/user/models/user.entity';
import { equal } from 'assert';
import { WsException } from '@nestjs/websockets';
import { UserService } from 'src/user/services/user.service';
import { getRepository } from "typeorm";
import { chatPreview } from '../models/chat.type';
import { Equal, FindManyOptions } from 'typeorm';
import { DMDto } from '../models/chat.dto';


@Injectable()
export class ChatService {
	channels: Array<IChat>

	constructor(
		@InjectRepository(Chat)
		private readonly chatRepository: Repository<Chat>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly userService: UserService,
	) { }

	createChat(chat: IChat): Observable<Chat> {
		this.channels.push(chat)
		return from(this.chatRepository.save(chat));
	}

	async listAllUsers() {
		const users = await this.userRepository.find();
		let count = 0;
		for (const [index, user] of users.entries()) {
			// console.log('   user %d: %s', index, user.user_name);
			count = index + 1;
		}
		// console.log('total %d users', count);
		return;
	}

	async listAllChannels() {
		// const channels = await this.prisma.channel.findMany();
		const chats = await this.chatRepository.find();
		// console.log(chats);

		let count = 0;
		for (const [index, channel] of chats.entries()) {
			// console.log('   channel %d: %s', index, channel.name);
			count = index + 1;
		}
		// console.log('total %d chats', count);
		return;
	}

	async getIdByUsername(user_name: string): Promise<number | null> {
		try {
			// const user = await this.prisma.user.findUnique({
			// 	where: {
			// 		email: email,
			// 	},
			// 	select: {
			// 		id: true,
			// 	},
			// });

			const user = await this.userRepository.findOne({
				where: { user_name: user_name },
				select: ["id"],
			})
			if (user) {
				return user.id;
			} else {
				return null;
			}
		} catch (error) {
			console.log('getIdByUsername error:', error);
		}
	}

	async getChannelNameByUsername(id: number): Promise<string | null> {
		try {
			const chat = await this.chatRepository.findOne({
				where: { id: id },
				select: ['name'],
			})
			if (chat) {
				return chat.name;
			} else {
				return null;
			}
		} catch (error) {
			console.log('getChannelNameByUsername error:', error);
		}
	}

	//TQAC KPCRAC need to tested
	async getChannelsUserIn(id: number) {
		try {
		//   const userRepository = getRepository(User);
		  const user = await this.userRepository.findOne({where: { id: id },});
		  if (!user) {
			return [];
		  }
	  
		  const channels = await this.chatRepository
			.createQueryBuilder('chat')
			.leftJoin('chat.owner', 'owner', 'owner.dm = true')
			.leftJoin('chat.admins', 'admin')
			.leftJoin('chat.members', 'member')
			.leftJoin('chat.inviteds', 'invited')
			.where('owner.id = :userId', { userId: user.id })
			.orWhere('admin.id = :userId', { userId: user.id })
			.orWhere('member.id = :userId', { userId: user.id })
			.orWhere('invited.id = :userId', { userId: user.id })
			.getMany();
	  
		  // Organize the channels if needed
		  const organizedChannels = this.organizeChannelToJoin(channels);
		  return organizedChannels;
		} catch (error) {
		  console.log('get__channels error:', error);
		  throw error; // Rethrow the error to handle it at the caller's level
		}
	  }

	  organizeChannelToJoin(source: any) {
		const channels = [];
		if (source) {
			if (source.owner)
				for (let index = 0; index < source.owner.length; index++) {
					const channel = source.owner[index].name;
					channels.push(channel);
				}
			if (source.admin)
				for (let index = 0; index < source.admin.length; index++) {
					const channel = source.admin[index].name;
					channels.push(channel);
				}
			if (source.member)
				for (let index = 0; index < source.member.length; index++) {
					const channel = source.member[index].name;
					channels.push(channel);
				}
			if (source.invited)
				for (let index = 0; index < source.invited.length; index++) {
					const channel = source.invited[index].name;
					channels.push(channel);
				}
		}
		return channels;
	}

	async new__DM(info: DMDto) {
		try {
			const ids: number[] = [];
			const id = await this.getIdByUsername(info.user_name);
			ids.push(id, info.targetId);
			const dmT = {
					dm: true,
					private: true,
					owners: {
						connect: ids.map((id) => ({ id: id })),
					},
			};
			return  (await this.chatRepository.save(dmT)).id;
		} catch (error) {
			console.log('new__DM error:', error);
			throw new WsException(error);
		}
	}

	//HORS AREV
	// async getPreviews(user_name: string): Promise<chatPreview[]> {
	// 	try {
	// 		const source = await this.getChatListByUsername(user_name);
	// 		const data = this.organizePreviews(source, user_name);
	// 		return data;
	// 	} catch (error) {
	// 		console.log('getPreviews error:', error);
	// 	}
	// }

	// organizePreviews(source: any, user_name: string) {
	// 	const data = [];
	// 	if (source) {
	// 		if (source.owner) {
	// 			for (let index = 0; index < source.owner.length; index++) {
	// 				let dmName = '';
	// 				if (source.owner[index].owners.length > 1) {
	// 					dmName =
	// 						source.owner[index].owners[0].user_name === user_name
	// 							? source.owner[index].owners[1].username
	// 							: source.owner[index].owners[0].username;
	// 				} else dmName = 'Empty Chat';
	// 				let otherId = -1;
	// 				if (source.owner[index].owners.length > 1) {
	// 					otherId =
	// 						source.owner[index].owners[0].user_name === user_name
	// 							? source.owner[index].owners[1].id
	// 							: source.owner[index].owners[0].id;
	// 				} else otherId = -1;
	// 				const messageCount = source.owner[index].messages.length;
	// 				const element: chatPreview = {
	// 					id: source.owner[index].id,
	// 					dm: source.owner[index].dm,
	// 					name: dmName,
	// 					isPassword: source.owner[index].isPassword,
	// 					updateAt: source.owner[index].updateAt,
	// 					lastMsg:
	// 						messageCount > 0
	// 							? source.owner[index].messages[0].msg
	// 							: '',
	// 					// ownerEmail: source.owner[index].owners[0].user_name,
	// 					ownerId: otherId,
	// 				};
	// 				data.push(element);
	// 			}
	// 		}
	// 		if (source.admin)
	// 			for (let index = 0; index < source.admin.length; index++) {
	// 				const messageCount = source.admin[index].messages.length;
	// 				const element: chatPreview = {
	// 					id: source.admin[index].id,
	// 					dm: source.admin[index].dm,
	// 					isPassword: source.admin[index].isPassword,
	// 					name: source.admin[index].name,
	// 					updateAt: source.admin[index].updateAt,
	// 					lastMsg:
	// 						messageCount > 0
	// 							? source.admin[index].messages[0].msg
	// 							: '',
	// 					//ownerEmail: source.admin[index].owners[0].email,
	// 					ownerId: source.admin[index].owners[0].id,
	// 				};
	// 				data.push(element);
	// 			}
	// 		if (source.member)
	// 			for (let index = 0; index < source.member.length; index++) {
	// 				const messageCount = source.member[index].messages.length;
	// 				const element: chatPreview = {
	// 					id: source.member[index].id,
	// 					dm: source.member[index].dm,
	// 					name: source.member[index].name,
	// 					isPassword: source.member[index].isPassword,
	// 					updateAt: source.member[index].updateAt,
	// 					lastMsg:
	// 						messageCount > 0
	// 							? source.member[index].messages[0].msg
	// 							: '',
	// 					//ownerEmail: source.member[index].owners[0].email,
	// 					ownerId: source.member[index].owners[0].id,
	// 				};
	// 				data.push(element);
	// 			}
	// 		if (source.invited)
	// 			for (let index = 0; index < source.invited.length; index++) {
	// 				const messageCount = source.invited[index].messages.length;
	// 				const element: chatPreview = {
	// 					id: source.invited[index].id,
	// 					dm: source.invited[index].dm,
	// 					name: source.invited[index].name,
	// 					isPassword: source.invited[index].isPassword,
	// 					updateAt: source.invited[index].updateAt,
	// 					// eslint-disable-next-line unicorn/no-nested-ternary, prettier/prettier
	// 					lastMsg: source.invited[index].isPassword ? '' : (messageCount > 0 ? source.invited[index].messages[0].msg : ''),
	// 					// ownerEmail: source.invited[index].owners[0].email,
	// 					ownerId: source.invited[index].owners[0].id,
	// 				};
	// 				data.push(element);
	// 			}
	// 	}
	// 	return data;
	// }

	// async  getChatListByUserName(user_name: string) {
	// 	try {
	  
	// 	  // Find the user by email
	// 	  const user = await this.userRepository.findOne({
	// 		where: { user_name },
	// 		select: ['id'],
	// 	  });
	  
	// 	  if (!user) {
	// 		throw new Error('User not found');
	// 	  }
	  
	// 	  // Get the chat list with JOINs using the query builder
	// 	  const channels = await this.chatRepository
	// 		.createQueryBuilder('chat')
	// 		.leftJoinAndSelect('chat.owner', 'owner', 'owner.dm = true')
	// 		.leftJoinAndSelect('chat.admins', 'admins', 'admins.id = :userId', { userId: user.id })
	// 		.leftJoinAndSelect('chat.members', 'members', 'members.id = :userId', { userId: user.id })
	// 		.leftJoinAndSelect('chat.inviteds', 'inviteds', 'inviteds.id = :userId', { userId: user.id })
	// 		.leftJoinAndSelect('chat.messages', 'messages', 'messages.unsent = false')
	// 		.orderBy('messages.createdAt', 'DESC')
	// 		.take()
	// 		.getMany();
	  
	// 	  // Process and organize the fetched channels if needed
	// 	  const organizedChannels = organize__chatList__ByEmail(channels);
	// 	  return channels;
	// 	} catch (error) {
	// 	  console.log('get__chatList__ByEmail error:', error);
	// 	  throw error; // Rethrow the error to handle it at the caller's level
	// 	}
	//   }
}
