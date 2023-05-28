import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/post.interface';
import { Observable, Subject, from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userPostRepository: Repository<UserEntity>
    ) {}
    createPost(userPost: User): Observable<User> {
        return from(this.userPostRepository.save(userPost));
    }

}
