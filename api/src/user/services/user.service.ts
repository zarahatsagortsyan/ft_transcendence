import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '../models/user.interface';
import { Observable, Subject, from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userPostRepository: Repository<User>
    ) {}
    createUser(userPost: IUser): Observable<User> {
        return from(this.userPostRepository.save(userPost));
    }

}
