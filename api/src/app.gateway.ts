import {
    WebSocketGateway, WsException, OnGatewayConnection,
    OnGatewayDisconnect, BaseWsExceptionFilter, WebSocketServer, SubscribeMessage,
    MessageBody
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { JwtService } from "@nestjs/jwt";
import { ArgumentsHost, Catch } from '@nestjs/common';
import { UserService } from "./user/services/user.service";
import { UserStatus } from "./user/models/user.entity"
import { GameService } from "./game/services/game.service";
import { ChatGateway } from "./chat/chat.gateway";
import { fetchDM, gameInvitation, updateChannel } from "./chat/models/chat.type";
import { ChannelDto } from "./chat/models/chat.dto";
import { ChatService } from "./chat/services/chat.service";

@WebSocketGateway({
    cors: {
        origin: process.env.FRONT_URL
    }
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly chatGateway: ChatGateway,
        private readonly chatService: ChatService,
    ) { }

    @WebSocketServer()
    server: Server;

    userStatusMap = new Map<number, UserStatus>()
    clientSocket = new Map<number, Socket>()

    onlineFromService(id: number) {
        this.userStatusMap.set(id, UserStatus.ONLINE)
        const serializeMap = [...this.userStatusMap.entries()]
        this.server.emit('update-status', serializeMap)
    }

    offlineFromService(id: number) {
        this.userStatusMap.set(id, UserStatus.OFFLINE)
        const serializeMap = [...this.userStatusMap.entries()]
        this.server.emit('update-status', serializeMap)
    }

    inGameFromService(id: number) {
        this.userStatusMap.set(id, UserStatus.INGAME)
        const serializeMap = [...this.userStatusMap.entries()]
        this.server.emit('update-status', serializeMap)
    }

    async handleConnection(client: any, ...args: any[]) {
        try {
            client.setMaxListeners(20);
            const UserId: number = this.jwtService.verify(String(client.handshake.headers.token), { secret: process.env.JWT_SECRET }).sub;
            const user = this.userService.getUser(UserId);
            client.data.id = UserId;
            if (!user)
                throw new WsException('Invalid token.');

            this.userStatusMap.set(client.data.id, UserStatus.ONLINE);
            const serializedMap = [...this.userStatusMap.entries()];
            this.server.emit('update-status', serializedMap);
            this.clientSocket.set(UserId, client)

            
            // await this.chatGateway.handleJoinSocket(UserId, client);
        }
        // eslint-disable-next-line unicorn/prefer-optional-catch-binding, unicorn/catch-error-name, unicorn/prevent-abbreviations
        catch (e) {
            return false;
        }
    }

    async handleDisconnect(client: any) {
        if (client.data.id !== undefined) {
            this.userStatusMap.set(client.data.id, UserStatus.OFFLINE)
            const serializeMap = [...this.userStatusMap.entries()]
            client.emit('update-status', serializeMap)
            this.clientSocket.delete(client.data.id)
        }

        if (GameService.rooms.some((room) => room.player1 === client)) {
            if (!GameService.rooms.find((room) => room.player1 === client).player2)
                GameService.rooms.splice(
                    GameService.rooms.findIndex((room) => room.player1 === client), 1);
            else
                GameService.rooms.find((room) => room.player1 === client).player1Disconnected = true;
        }
        if (GameService.rooms.some((room) => room.player2 === client))
            GameService.rooms.find((room) => room.player2 === client).player2Disconnected = true;
        client.removeAllListeners();
    }

    async getClientSocket(id: number) {
        if (this.clientSocket.has(id)) {
            const socket = this.clientSocket.get(id);
            return socket;
        }
    }

    @SubscribeMessage('fetch new channel')
    async newChannelFetch(@MessageBody() data: ChannelDto) {
        data.members.map(async (member) => {
            const client = await this.getClientSocket(member.id);
            await client.join(data.name)
            client.emit('update channel request');
        })
    }

    // @SubscribeMessage('fetch new DM')
    // async newDMFetch(@MessageBody() data: fetchDM) {
    //     const cName = await this.chatService.get__Cname__ByCId(data.channelId);
    //     const client = await this.getClientSocket(data.targetId);
    //     await client.join(cName);
    //     client.emit('update channel request');
    // }

    // @SubscribeMessage('fetch new invite')
    // async newInviteFetch(@MessageBody() data: updateChannel) {
    //     const client = await this.getClientSocket(data.targetId);
    //     const cName = await this.chatService.get__Cname__ByCId(data.channelId);
    //     await client.join(cName);
    //     client.emit('update channel request');
    // }

    // @SubscribeMessage('send invitation')
    // async gameInvitation(@MessageBody() data: gameInvitation) {
    //     const client = await this.getClientSocket(data.targetId);
    //     if (client) {
    //         this.inGameFromService(data.targetId);
    //         client.emit('game invitation', data);
    //     }
    // }

    // @SubscribeMessage('decline game')
    // async gameDecline(@MessageBody() game: gameInvitation) {
    //     const client = await this.getClientSocket(game.inviterId);
    //     if (client) {
    //         const target = await this.userService.getUser(game.targetId);
    //         client.emit('rejected', target.user_name);
    //         this.onlineFromService(game.targetId);
    //     }
    // }

}