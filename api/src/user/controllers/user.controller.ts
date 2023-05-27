import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserPost } from '../models/post.interface';
import { Observable } from "rxjs";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post()
    create(@Body('') post: UserPost): Observable<UserPost> {
        return this.userService.createPost(post)
    }
}
