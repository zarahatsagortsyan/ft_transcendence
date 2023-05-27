import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPost } from '../models/post.interface';
import { Observable, Subject, from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserPostEntity)
        private readonly userPostRepository: Repository<UserPostEntity>
    ) {}
    createPost(userPost: UserPost): Observable<UserPost> {
        return from(this.userPostRepository.save(userPost));
    }

}
