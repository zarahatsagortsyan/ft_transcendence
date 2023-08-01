import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
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
        ) {}
        
        async getAllUsers() {
            return await this.userRepository.find({
                order:{id:'asc'},
            });
        }

        async getUser(user_id: number)
        {
            if (user_id === undefined)
            {
                throw new BadRequestException('Undefigned user ID');
            }

            try{
                const user = await this.userRepository.findOne({
                    where: {
                        id: user_id,
                    },
                });
                return user;

            } 
            catch (error){
                throw new ForbiddenException('getUser error: ' + error);
            }
        }
        async getUserByUsername(username: string)
        {
            if (username === undefined)
            {
                throw new BadRequestException('Undefigned username');
            }

            try{
                const user = await this.userRepository.findOne({
                    where: {
                        user_name: username,
                    },
                });
                return user;

            } 
            catch (error){
                throw new ForbiddenException('getUser error: ' + error);
            }
        }
        //login create user
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
        blockUser(block: IBlocked): Observable<Blocked> {
            return from(this.blockedRepository.save(block));
        }

        //ashxatox
        async getBlockedUsers(blocker_id: number): Promise<Blocked[]> {
            const options: FindManyOptions<Blocked> = {};
            options.where = { blocker_id: Equal(blocker_id) };
            return await this.blockedRepository.find(options);
        }

        async getUsersWithBlocked(blocker_id: number): Promise<User[]> {
            const users = await this.userRepository.createQueryBuilder("user")
            .leftJoinAndSelect(Blocked, "blocked", "user.id = blocked.blocked_id")
            .where("blocked.blocker_id = :blocker_id", { blocker_id })
            .getMany();
        
          return users;
        }

        //user unblock
        async unblockUser(unblock: IBlocked):Promise<void> {
            const blockedRecord = await this.blockedRepository.findOneBy({ blocker_id: unblock.blocker_id, blocked_id: unblock.blocked_id });

            if (blockedRecord) {
              await this.blockedRepository.remove(blockedRecord);
              
              console.log("User unblocked successfully.");
            } else {
              console.log("User is not blocked.");
            }
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

        }
        
        async getAllPending(user_id: number){


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

        // async updateAccessToken(id: number, atoken: string) {                   //Do we really need it????????
        //     await this.userRepository.update(id, {access_token: atoken});
        // }

        // async updateRefreshToken(id: number, rtoken: string) {
        //     await this.userRepository.update(id, {refresh_token: rtoken});
        // }

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
