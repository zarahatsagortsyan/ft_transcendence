import { Inject,Injectable, BadRequestException, ForbiddenException, NotFoundException, forwardRef } from '@nestjs/common';
import { User, UserStatus } from '../models/user.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { IUser } from '../models/user.interface';
import { Observable, Subject, from } from 'rxjs';
import { IFriendship } from '../models/friendship.interface';
import { IBlocked } from '../models/blocked.interface';
import { FriendStatus, Friendship } from '../models/friendship.entity';
import { Blocked } from '../models/blocked.entity';
import { Equal, FindManyOptions, Repository, createQueryBuilder } from 'typeorm';
import { Logger } from '@nestjs/common';
import { AuthUserDto } from 'src/auth/dto/auth.dto';
import { plainToClass } from 'class-transformer';
import {Game } from '../../game/models/game.entity'
import {GameService } from '../../game/services/game.service'

//USER
// READ
//async getUser(id: number)
//async getAllUsers()
//async getUserfromUsername(username: string)
//async getLeaderboard()
//async getGameHistory(id: number)

//UPDATE
// async updateUsername(id: number, newUsername: string)
// async updateAvatar(id: number, newAvatar: string)
// async updateRefreshToken(id: number, rtoken: string)
// async updateWinRate(id: number)

//CREATE
// createUser(user: IUser): Observable<User>
// createUserPromise(u: AuthUserDto): Promise<User>

//BLOCK
//async getBlockedUsers(blocker_id: number): Promise<Blocked[]>
//async blockUser(id: number, otherId: number)
//async unblockUser(unblock: IBlocked):Promise<void>
//async getBlocks(id: number) 
//async isBlocked(user_id: number, friend_id: number)
//async getUsersWithBlocked(blocker_id: number): Promise<User[]>

//Friendship
// async isFriend(userId: number, frinedId: number)
// async isPending(userId: number, frinedId: number)
// async getAllFriends(user_id: number)
// async getAllPending(user_id: number)
// async friendRequest(user_id: number, friend_id: number)
// async friendRequestAccept(user_id: number, friend_id: number )
// async friendRequestDecline(user_id: number, friend_id: number)
// async friendRequestCancel(user_id:number, friend_id: number)
// async rmFriend(id: number, otherId: number)

//GAME
// async updateWinRate(id: number)
// async hasWon(id: number) 
// async hasLost(id: number)

@Injectable()
export class UserService {
    logger = new Logger('AppController');
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Friendship)
        private readonly friendshipRepository: Repository<Friendship>,
        @InjectRepository(Blocked)
        private readonly blockedRepository: Repository<Blocked>,
        @Inject(forwardRef(() => GameService))
        private readonly gameService: GameService
        ) {}
        
        // async getAllUsers() {
        //     return await this.userRepository.find({
        //         order:{id:'asc'},
        //     });
        // }

        async getAllUsers() {
            const users = await this.userRepository.find({
                order:{id:'asc'},
            });

            const userListDtos: User[] = [];
            for (const user_ of users) {
                const user = await this.userRepository.findOneOrFail({
                    where: {
                        id: user_.id,
                    },

                });
                const dtoUser = plainToClass(User, user);
                userListDtos.push(dtoUser);
            }
            return userListDtos;
        }

        async getLeaderboard() {
            //returns a record of all the users, ordered by rank in ascending order
                const users = await this.userRepository.
                createQueryBuilder('user')
                .where('user.gamesPlayed != :gamesPlayed', { gamesPlayed: 0 })
                .select([
                  'user.id',
                  'user.user_name',
                  'user.rank',
                  'user.winRate',
                  'user.gamesLost',
                  'user.gamesWon',
                  'user.gamesPlayed',
                ])
                .orderBy('user.rank', 'ASC')
                .getMany();
              
            return users;
        }
        
        async getGameHistory(id: number) {
            const user = await this.userRepository.findOne({
                where: {
                    id: id,
                },
            });
    
            console.log(user.gameHistory);
            const gameHistoryInt: number[] = user.gameHistory;
            console.log(gameHistoryInt);
            if (gameHistoryInt.length === 0) return [];
    
            const gameHistory: Game[] = [];
            for (const gameId of gameHistoryInt) {
                gameHistory.push(await this.gameService.getGame(gameId));
            }
    
            // gameHistory stores PrismaGames[], need to transform them into a SubjectiveGameDtos[]
            const gameDTOs= [];
    
            for (const game of gameHistory) {
                // identify the opponent
                let opponentId: number;
                let userScore: number;
                let opponentScore: number;
    
                game.player1 === id
                    ? (opponentId = game.player2)
                    : (opponentId = game.player1);
                game.player1 === id
                    ? (userScore = game.score1)
                    : (userScore = game.score2);
                game.player1 === id
                    ? (opponentScore = game.score2)
                    : (opponentScore = game.score1);
                const opponent: User = await this.getUser(opponentId);

                // fill the SubjectiveGameDto
                const gameDTO = {
                    userId: id,
                    opponentId: opponent.id,
                    opponentAvatar: opponent.avatar,
                    opponentUsername: opponent.user_name,
                    opponentUser: opponent,
                    opponentRank: opponent.rank,
                    userScore: userScore,
                    opponentScore: opponentScore,
                    victory: userScore > opponentScore ? true : false,
                };
                gameDTOs.push(gameDTO);
            }
    
            return gameDTOs;
        }
    

        // async getUser(user_id: number)
        // {
        //     if (user_id === undefined)
        //     {
        //         throw new BadRequestException('Undefigned user ID');
        //     }

        //     try{
        //         const user = await this.userRepository.findOne({
        //             where: {
        //                 id: user_id,
        //             },
        //         });
        //         return user;

        //     } 
        //     catch (error){
        //         throw new ForbiddenException('getUser error: ' + error);
        //     }
        // }

        async getUser(id: number) {
            console.log(id);
            if (id === undefined) {
                throw new BadRequestException('Undefined user ID');
            }
            // console.log('id', id);
            try {
                const user = await this.userRepository.findOneOrFail({
                    where: {
                        id: id,
                    },
                });
                const dtoUser = plainToClass(User, user);
                return dtoUser;
            } catch (error) {
                throw new ForbiddenException('getUser error : ' + error);
            }
        }
        async getUserByUsername(username: string) {
            // console.log('username : ', username);
            try {
                const user = await this.userRepository.findOneOrFail({
                    where: {
                        user_name: username,
                    },
                });
                const dtoUser = plainToClass(User, user);
                return dtoUser;
            } catch (error) {
                throw new ForbiddenException('getUser error : ' + error);
            }
        }
        // async getUserByUsername(username: string)
        // {
        //     if (username === undefined)
        //     {
        //         throw new BadRequestException('Undefigned username');
        //     }

        //     try{
        //         const user = await this.userRepository.findOne({
        //             where: {
        //                 user_name: username,
        //             },
        //         });
        //         return user;

        //     } 
        //     catch (error){
        //         throw new ForbiddenException('getUser error: ' + error);
        //     }
        // }
        
        /*	CREATE	*/
        createUser(user: IUser): Observable<User> {
            return from(this.userRepository.save(user));
        }

        createUserPromise(u: AuthUserDto): Promise<User> {
            const user:IUser=  {
                user_name: u.user_name,
                nick_name: "",
                avatar: u.avatar,
                user_status : UserStatus.ONLINE,
                two_factor_auth : false,
                two_factor_secret : '',
            };
            return this.userRepository.save(user);
        }
        
        //USER PROFILE RELATED FUNCTIONS
        async updateUsername(id: number, newUsername: string) {
            const updateUser = await this.userRepository.update(id, {user_name: newUsername});
            return updateUser;
        }

        async updateAvatar(id: number, newAvatar: string) {
            const updateUser = await this.userRepository.update(id, {avatar: newAvatar});
            return updateUser;
        }

        async isBlocked(user_id: number, friend_id: number) {
            try {
                const blocked = await this.blockedRepository
                .createQueryBuilder('blocked')
                .where('blocked.blocked_id = :user_id', { user_id })
                .andWhere('blocked.blocker_id = :friend_id', { friend_id })
                .orWhere('blocked.blocked_id = :friend_id', { friend_id })
                .andWhere('blocked.blocker_id = :user_id', { user_id })
                .getOne();

                if (blocked !== null) {
                    console.log("isBlocked");
                    return true;
                }
                return false;
            } catch (error) {
                throw new ForbiddenException('isBlocked error : ' + error);
            }
        }
    

        //user block
        // blockUser(block: IBlocked): Observable<Blocked> {
        //     return from(this.blockedRepository.save(block));
        // }
        async blockUser(id: number, otherId: number) {
            if (id == otherId || (await this.isBlocked(id, otherId))) {
                throw new ForbiddenException('Cannot block this user');
            }
            if (await this.isFriend(id, otherId)) await this.rmFriend(id, otherId);

            const blockRecord: IBlocked = {
                blocker_id: id,
                blocked_id: otherId
            }
            return from(this.blockedRepository.save(blockRecord));
        }
         //user unblock
        async unblockUser(id: number, otherId: number) {
            const blockedRecord = await this.blockedRepository.findOneBy({ blocker_id: id, blocked_id: otherId});

            if (blockedRecord) {
              await this.blockedRepository.remove(blockedRecord);
              
              console.log("User unblocked successfully.");
              return true;
            } else {
              console.log("User is not blocked.");
            }
        }   
        //ashxatox
        async getBlockedUsers(blocker_id: number): Promise<Blocked[]> {
            const options: FindManyOptions<Blocked> = {};
            options.where = { blocker_id: Equal(blocker_id) };
            return await this.blockedRepository.find(options);
        }

        async getBlocks(id: number) {
            const BlocksIdList = await this.blockedRepository.find({
                where: {
                    blocker_id: id,
                },
            });
            const blockList: User[] = [];
            for (const element of BlocksIdList) {
                    const block = await this.userRepository.findOne({
                        where: { id: element.blocked_id },
                    });
                    const dtoUser = plainToClass(User, block);
                    blockList.push(dtoUser);
            }
            return blockList;
        }

        async getUsersWithBlocked(blocker_id: number): Promise<User[]> {
            const users = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect(Blocked, "blocked", "user.id = blocked.blocked_id")
            .where("blocked.blocker_id = :blocker_id", { blocker_id })
            .getMany();
        
          return users;
        }


        
        async isFriend(userId: number, frinedId: number) {
            try {
                const index = await this.friendshipRepository.findOne(
                                {
                                    where:{
                                        user_id: Equal(userId),
                                        friend_id : Equal(frinedId),
                                        friend_status : Equal(FriendStatus.ISFRIEND)
                                    } 
                                
                                });
                
                if (index !== null) {
                    console.log("isFriend");
                    return true;
                }
                return false;
            } catch (error) {
                throw new ForbiddenException('isFriend error : ' + error);
            }
        }

        async isPending(userId: number, frinedId: number) {
            try {
                const index = await this.friendshipRepository.findOne(
                                {
                                    where:{
                                        user_id: Equal(userId),
                                        friend_id : Equal(frinedId),
                                        friend_status : Equal(FriendStatus.FRPENDING)
                                    } 
                                
                                });
                                console.log (index != null)
                if (index != null) {
                    console.log("isPending");
                    return true;

                }
                return false;
            } catch (error) {
                throw new ForbiddenException('isFriend error : ' + error);
            }
        }

        async getPending(user_id: number) {


            if (user_id === undefined)
            {
                throw new BadRequestException('Undefigned user ID');
            }

            try{
                // const query = this.friendshipRepository.createQueryBuilder('friendship')
                //             .innerJoinAndSelect('friendship.user_id', 'users', 'users.id = friendship.user_id')
                //             .where('friendship.friend_id = :user_id', {user_id});
                const query = this.friendshipRepository.createQueryBuilder('friendship')
                            .innerJoin('friendship.user_id', 'users', 'users.id = friendship.user_id')
                            .addSelect('users.id')
                            .addSelect('users.user_name')
                            .where('friendship.friend_id = :user_id', {user_id});
                return await query.getMany();
            } 
            catch (error){
                throw new ForbiddenException('getPending error: ' + error);
            }
        }

        async getAllFriends(user_id: number){
            const friendIdList = await this.friendshipRepository.find({
                where: {
                    user_id: user_id,
                    friend_status:FriendStatus.ISFRIEND
                },
            });
            const friendList: User[] = [];
            for (const element of friendIdList) {
                const friend = await this.userRepository.findOne({
                    where: { id: element.friend_id },
                });
                const dtoUser = plainToClass(User, friend);
                friendList.push(dtoUser);
            }
            return friendList;
        }
        
        async getAllPending(user_id: number){

            const friendIdList = await this.friendshipRepository.find({
                where: {
                    user_id: user_id,
                    friend_status:FriendStatus.FRPENDING
                },
            });
            const friendList: User[] = [];
            for (const element of friendIdList) {
                const friend = await this.userRepository.findOne({
                    where: { id: element.friend_id },
                });
                const dtoUser = plainToClass(User, friend);
                friendList.push(dtoUser);
            }
            return friendList;
        }
        //user friend request
        async friendRequest(user_id: number, friend_id: number) {
            const user = await this.userRepository.findOneBy({id: user_id});
            console.log (user)
            const userFriend = await this.userRepository.findOneBy({id: friend_id});
            console.log (userFriend)
            if (
                user_id == friend_id ||
                (await this.isFriend(user_id, friend_id)) ||
                (await this.isPending(user_id, friend_id)) ||
                (await this.isBlocked(user_id, friend_id))
                ) {
                console.log("IsFriend: " + await this.isFriend(user_id, friend_id))
                console.log("isPending: " + await this.isPending(user_id, friend_id))
                console.log("isBlocked: " + await this.isBlocked(user_id, friend_id))

                throw new ForbiddenException('Cannot invite this user');
            }
            const friendshipRel: IFriendship = {
                user_id: user_id,
                friend_id: friend_id,
                friend_status: FriendStatus.FRPENDING,
                createdAt: new Date()
            };
            await from(this.friendshipRepository.save(friendshipRel));

            return true;
        }

        //friend request accept it must update friendshi[p table and change the status accordingly
        async friendRequestAccept(user_id: number, friend_id: number ) {
            try{
                const existingFriendship1 = await this.friendshipRepository.findOne({
                        where:{
                            user_id: Equal(friend_id),
                            friend_id : Equal(user_id),
                            friend_status : Equal(FriendStatus.FRPENDING)
                        } 
                    });
                
                    console.log(existingFriendship1);
                if (!existingFriendship1) {
                    throw new NotFoundException('Friend request not found');
                }
                
                existingFriendship1.friend_status = FriendStatus.ISFRIEND;
                
                await this.friendshipRepository.save(existingFriendship1);
                
                const friendshipRel: IFriendship = {
                    user_id: user_id,
                    friend_id: friend_id,
                    friend_status: FriendStatus.ISFRIEND,
                    createdAt: new Date()
                };
                await from(this.friendshipRepository.save(friendshipRel));
            }
            catch (error){
                throw new ForbiddenException(error);
            }
            return true;
        }
        
        //friend request decline delete the data from table when declining
        async friendRequestDecline(user_id: number, friend_id: number) {
            console.log(user_id + " " + friend_id);
            const existingFriendship1 = await this.friendshipRepository.findOne({
                where:{
                    user_id: Equal(friend_id),
                    friend_id : Equal(user_id)
                    //friend_status : Equal(FriendStatus.FRPENDING)
                } 
            });
            console.log(existingFriendship1);
            if (!existingFriendship1) {
                throw new NotFoundException('Friend request not found');
            }
            
            existingFriendship1.friend_status = FriendStatus.ISFRIEND;
            
            await this.friendshipRepository.delete(existingFriendship1.id);

            return true;
        }
        
        //friend request decline delete the data from table when declining
        async friendRequestCancel(user_id:number, friend_id: number) {
            const existingFriendship1 = await this.friendshipRepository.findOne({
                where:{
                    user_id: Equal(user_id),
                    friend_id : Equal(friend_id),
                    friend_status : Equal(FriendStatus.FRPENDING)
                } 
            });
        
            if (!existingFriendship1) {
                throw new NotFoundException('Friend request not found');
            }
            
            await this.friendshipRepository.delete(existingFriendship1.id);

            return true;
        }

        async rmFriend(id: number, otherId: number){
            const friendshipRecordCurUser = await this.friendshipRepository.findOneBy({ user_id: id, friend_id: otherId });
            const friendshipRecordUtherUser = await this.friendshipRepository.findOneBy({ user_id: otherId, friend_id: id });

            if (friendshipRecordCurUser && friendshipRecordUtherUser) {
              await this.friendshipRepository.remove(friendshipRecordCurUser);
              await this.friendshipRepository.remove(friendshipRecordUtherUser);
              console.log("friend deleted successfully.");
              return true;
            } else {
              console.log("User is not blocked.");
            }
        }
        // async updateAccessToken(id: number, atoken: string) {                   //Do we really need it????????
        //     await this.userRepository.update(id, {access_token: atoken});
        // }

        async updateWinRate(id: number) {
            const user = await this.userRepository.findOneBy({id: id}); 
            if (!user) {
                throw new BadRequestException('Undefigned user ID');
            }
          
            const winRate = user.gamesPlayed > 0 ? (user.gamesWon / user.gamesPlayed) * 100 : 0;
            user.winRate = winRate;
            await this.userRepository.save(user);
        }

        async hasWon(id: number) {
            try {            
                // Increment gamesWon and gamesPlayed by one
                await this.userRepository.increment({ id: id }, 'gamesWon', 1);
                await this.userRepository.increment({ id: id }, 'gamesPlayed', 1);
            
                // Update the win rate
                await this.updateWinRate(id);
            
                return { success: true };
              } catch (error) {
                // Handle errors appropriately
                return { success: false, error: 'An error occurred while updating the user.' };
              }
        }

        async hasLost(id: number) {
            try {            
                // Increment gamesWon and gamesPlayed by one
                await this.userRepository.increment({ id: id }, 'gamesLost', 1);
                await this.userRepository.increment({ id: id }, 'gamesPlayed', 1);
            
                // Update the win rate
                await this.updateWinRate(id);
            
                return { success: true };
              } catch (error) {
                // Handle errors appropriately
                return { success: false, error: 'An error occurred while updating the user.' };
              }
        }

        async updateRefreshToken(user_name: string, rtoken: string) {
            await this.userRepository.update(user_name, {refresh_token: rtoken});
        }

        async updatetwoFa(user_name: string, twoFa: boolean) {
            await this.userRepository.update(user_name, {two_factor_auth: twoFa});
        }

        async updatetwoFaSecret(user_name: string, secret: string) {
            await this.userRepository.update(user_name, {two_factor_secret: secret});
        }
}
