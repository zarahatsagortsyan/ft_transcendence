import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { Observable } from "rxjs";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Post()
    create(@Body('') user: IUser): Observable<IUser> {
        return this.userService.createUser(user)
    }
}
