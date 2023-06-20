import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { IUser } from '../models/user.interface';
import { Observable, Subject, from } from 'rxjs';
import { IFriendship } from '../models/friendship.interface';
import { IBlocked } from '../models/blocked.interface';
import { Friendship } from '../models/friendship.entity';
import { Blocked } from '../models/blocked.entity';
import { Equal, FindManyOptions, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
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
            return await this.userRepository.find()
        }

        //login create user
        createUser(user: IUser): Observable<User> {
            return from(this.userRepository.save(user));
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
        
        //user friend request
        friendRequest(friendship: IFriendship): Observable<Friendship> {
            return from(this.friendshipRepository.save(friendship));
        }

        //friend request accept it must update friendshi[p table and change the status accordingly
        async friendRequestAccept(id: number, status) {
            const friendshipToUpdate = await this.friendshipRepository.findOneById(id);
            friendshipToUpdate.friend_status = status;
            return from(this.friendshipRepository.save(friendshipToUpdate));
        }
        
        //friend request decline delete the data from table when declining
        async friendRequestDecline(id:number) {
            const friendshipToDelete = await this.friendshipRepository.findOneById(id);
            return from(this.friendshipRepository.remove(friendshipToDelete));
        }
}
