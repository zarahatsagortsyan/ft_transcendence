import { WebSocketGateway, WsException, OnGatewayConnection, 
    OnGatewayDisconnect, BaseWsExceptionFilter, WebSocketServer, SubscribeMessage, 
    MessageBody} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { JwtService } from "@nestjs/jwt";
import { ArgumentsHost, Catch } from '@nestjs/common';
import { UserService } from "./user/services/user.service";
import { UserStatus } from "./user/models/user.entity"

@WebSocketGateway({cors: {
    origin: process.env.FRONT_URL}})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor (
        private readonly userServic: UserService,
        private readonly jwtService: JwtService,
        // chat service and gateway
    ) {}

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
            client.setMaxListeners(20)
            const userID: number = this.jwtService.verify(String(client.handshake.token), {secret: process.env.JWT_SECRET}).sub            
        } catch (error) {
            return false
        }
    }

    async handleDisconnect(client: any) {
        
    }
}