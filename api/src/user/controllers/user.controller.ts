import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { Observable } from "rxjs";
import { IBlocked } from '../models/blocked.interface';
import { Logger } from '@nestjs/common';
import { User } from '../models/user.entity';
import { IFriendship } from '../models/friendship.interface';

@Controller('user')

export class UserController {
    logger = new Logger('AppController');
    constructor(private userService: UserService) {}
    @Post('createUser')
    createUser(@Body('') user: IUser): Observable<IUser> {
        return this.userService.createUser(user)
    }

    @Post('blockUser')
    blockUser(@Body('') block: IBlocked): Observable<IBlocked> {
        return this.userService.blockUser(block)
    }

    @Post('unblockUser')
    unblockUser(@Body('') block: IBlocked) {
        return this.userService.unblockUser(block)
    }

    @Get('getUser')
    async getUser(@Query('user_id') user_id: number){
      return await this.userService.getUser(user_id)
    }

    @Get('getAllUsers')
    async getAllUsers(){
      return await this.userService.getAllUsers()
    }

    @Get('getBlockedUsers')
    async getBlockedUsers(@Query('blockerId') blockerId:number){
      return await this.userService.getBlockedUsers(blockerId)
    }
    @Get('getUsersWithBlocked')
    async getUsersWithBlocked(@Query('blockerId') blockerId:number): Promise<User[]>{
      return await this.userService.getUsersWithBlocked(blockerId);
    }

    @Post('friendRequest')
    friendRequest(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number) {
        return this.userService.friendRequest(user_id, friend_id)
    }

    @Post('friendRequestAccept')
    friendRequestAccept(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number){
        return this.userService.friendRequestAccept(user_id, friend_id)
    }

    @Post('friendRequestDecline')
    friendRequestDecline(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number){
        return this.userService.friendRequestDecline(user_id, friend_id)
    }

    @Post('friendRequestCancel')
    friendRequestCancel(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number){
        return this.userService.friendRequestCancel(user_id, friend_id)
    }

    @Get('isPending')
    isPending(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number) {
        return this.userService.isPending(user_id, friend_id);
    }

    @Get('isFriend')
    isFriend(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number) {
        return this.userService.isFriend(user_id, friend_id);
    }

    @Get('getPending')
    async getPending(@Query('user_id') user_id: number) {
        return this.userService.getPending(user_id);
    }
}