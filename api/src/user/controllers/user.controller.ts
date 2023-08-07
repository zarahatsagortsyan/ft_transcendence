import { Controller, Post, Get, Body, Query, ForbiddenException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { Observable } from "rxjs";
import { IBlocked } from '../models/blocked.interface';
import { Logger } from '@nestjs/common';
import { User } from '../models/user.entity';
import { IFriendship } from '../models/friendship.interface';
import { GetCurrentUserId } from 'src/decorator/get-current-user-decorator-id';
import { isNumber, isNumberString } from 'class-validator';
import { UpdateUsernameDto } from '../models/update.dto';

@Controller('users')

export class UserController {
    logger = new Logger('AppController');
    constructor(private userService: UserService) {}
    
    @Get('getMe')
	getMe(@GetCurrentUserId() id: number) {
		console.log(121321321321);
        console.log("getMe");
		this.logger.log('get current user');
		const userDto = this.userService.getUser(id);
		return userDto;
	}
    
    @Post('getUser')
    getUser(@Body('otherId') otherId: number | string) {
		this.logger.log('getUser by ID ' + otherId);
		try {
            console.log("0");
			console.log("getUser otherId: ", otherId);
			if (isNumber(otherId)) {
                console.log("1");
				const userDto = this.userService.getUser(Number(otherId));
				return userDto;
			} else {
            console.log("3");

				const userDto = this.userService.getUserByUsername(
					String(otherId),
				);
				return userDto;
			}
		} catch {
            console.log("2");

			throw new ForbiddenException('getUser error');
		}
	}

    @Get('getLeaderboard')
	getLeaderboard() {
		this.logger.log('getLeaderboard');
		return this.userService.getLeaderboard();
	}

    @Post('getGameHistory')
	getGameHistory(@Body('otherId') otherId: number) {
		this.logger.log('getGameHistory otherID: ' + otherId);
		return this.userService.getGameHistory(otherId);
	}

	@Post('getAllFriends')
	async getAllFriends(@Body('otherId') otherId: number) {
		this.logger.log('getAllFriends otherID: ' + otherId);
		const result = await this.userService.getAllFriends(otherId);
		return result;
	}

	@Get('getAllPending')
	async getAllPending(@GetCurrentUserId() id: number) {
		this.logger.log('getAllPending ID: ' + id);
		const result = await this.userService.getAllPending(id);
		return result;
	}

	@Get('getBlocked')
	async getBlocked(@GetCurrentUserId() id: number) {
		this.logger.log('getBlocked ID: ' + id);
		const result = await this.userService.getBlocks(id);
		return result;
	}

	@Get('isFriend')
	async isFriend(
		@GetCurrentUserId() id: number,
		@Body('otherId') otherId: number,
	) {
		this.logger.log('isFriend ID: ' + id + ' -> otherID: ' + otherId);
		const result = await this.userService.isFriend(id, otherId);
		return result;
	}

	@Get('isBlocked')
	async isBlocked(
		@GetCurrentUserId() id: number,
		@Body('otherId') otherId: number,
	) {
		this.logger.log('isBlocked ID: ' + id + ' -> otherID: ' + otherId);
		const result = await this.userService.isBlocked(id, otherId);
		return result;
	}


    //USER PROFILE RELATED FUNCTIONS

	@Post('/updateUsername')
	async updateUsername(
		@Body() newUsername: UpdateUsernameDto,
		@GetCurrentUserId() id: number,
	) {
		console.log("newusername: ", newUsername);
		this.logger.log(
			'updateUsername ID ' + id + ' -> username: ' + newUsername,
		);
		try {
			const result = await this.userService.updateUsername(id, newUsername.username);
			return result;
		} catch {
			throw new ForbiddenException('Username already exists');
		}
	}

	@Post('/updateAvatar')
	async updateAvatar(
		@Body('avatar') newAvatar: string,
		@GetCurrentUserId() id: number,
	) {
		this.logger.log('updateAvatar ID ' + id + ' -> Avatar: ' + newAvatar);
		const result = await this.userService.updateAvatar(id, newAvatar);
		return result;
	}

    @Post('createUser')
    createUser(@Body('') user: IUser): Observable<IUser> {
        return this.userService.createUser(user)
    }

    // @Post('createUserPromise')
    // createUserPromise(@Body('') user: IUser): Promise<IUser> {
    //     return this.userService.createUserPromise(user)
    // }

    // @Post('blockUser')
    // blockUser(@Body('') block: IBlocked): Observable<IBlocked> {
    //     return this.userService.blockUser(block)
    // }
    @Post('/blockUser')
	async blockUser(@GetCurrentUserId() id: number, @Body('otherId') otherId: number) {
		this.logger.log('blockUser ID: ' + id + ' -> otherID: ' + otherId);
		const result = await this.userService.blockUser(id, otherId);
		return result;
	}
    @Post('/unblockUser')
    async unblockUser(@GetCurrentUserId() id: number, @Body('otherId') otherId: number) {
		this.logger.log('unblockUser ID: ' + id + ' -> otherID: ' + otherId);
        const result = await this.userService.unblockUser(id, otherId);
		return result;
    }

    // @Get('getUser')
    // async getUser(@Query('user_id') user_id: number){
    //   return await this.userService.getUser(user_id)
    // }

    // @Get('getUserByUsername')
    // async getUserByUsername(@Query('username') user_id: number){
    //   return await this.userService.getUser(user_id)
    // }

    // @Get('getUserByEmail')
    // async getUserByEmail(@Query('email') email: string){
    //   return await this.userService.getUserByEmail(email)
    // }


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


    ////RELATIONSHIP RELATED FUNCTIONS
    @Post('/friendRequest')
    friendRequest(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number) {
        this.logger.log('friendRequest ID: ' + user_id + ' -> otherID: ' + friend_id);
        return this.userService.friendRequest(user_id, friend_id)
    }

    @Post('/friendRequestAccept')
    friendRequestAccept(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number){
        this.logger.log('friendRequestAccept ID: ' + user_id + ' -> otherID: ' + friend_id);
        return this.userService.friendRequestAccept(user_id, friend_id)
    }

    @Post('/friendRequestDecline')
    friendRequestDecline(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number){
        this.logger.log('friendRequestDecline ID: ' + user_id + ' -> otherID: ' + friend_id);
        return this.userService.friendRequestDecline(user_id, friend_id)
    }

    @Post('/friendRequestCancel')
    friendRequestCancel(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number){
        this.logger.log('friendRequestCancel ID: ' + user_id + ' -> otherID: ' + friend_id);
        return this.userService.friendRequestCancel(user_id, friend_id)
    }

    @Post('/rmFriend')
	async rmFriend(@GetCurrentUserId() id: number, @Body('otherId') otherId: number,
	) {
		this.logger.log('rmFriend ID: ' + id + ' -> otherID: ' + otherId);
		const result = await this.userService.rmFriend(id, otherId);

		return result;
	}

    @Get('isPending')
    isPending(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number) {
        return this.userService.isPending(user_id, friend_id);
    }

    // @Get('isFriend')
    // isFriend(@Query('user_id') user_id: number, @Query('friend_id') friend_id: number) {
    //     return this.userService.isFriend(user_id, friend_id);
    // }

    @Get('getPending')  
    async getPending(@Query('user_id') user_id: number) {
        return this.userService.getPending(user_id);
    }
}