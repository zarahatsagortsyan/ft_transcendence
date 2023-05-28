import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/post.interface';
import { Observable } from "rxjs";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post()
    create(@Body('') post: User): Observable<User> {
        return this.userService.createPost(post)
    }
}
