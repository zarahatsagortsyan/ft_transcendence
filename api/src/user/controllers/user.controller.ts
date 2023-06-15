import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { Observable } from "rxjs";
import { IBlocked } from '../models/blocked.interface';
import { Logger } from '@nestjs/common';
import { User } from '../models/user.entity';

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
}
