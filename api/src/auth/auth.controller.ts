import {
	Body,
	Controller,
	Get,
	HttpCode,
	Logger,
	Post,
	Req,
	Res,
	UseFilters,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthUserDto } from './dto/auth.dto';
import { IUser } from 'src/user/models/user.interface';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
	@UseGuards(AuthGuard('42auth'))
	@Get('/callback')
    async callback(@Req() req: any, @Res() res: Response) { 
		console.log("Hellooooooo!!!!!!");
		// console.log(req);
		
		const user = await this.authService.signin42(req.user as AuthUserDto);
		const {user_name, id} = user;
		console.log('callback method from auth controller' + user_name + '  ' + id);
		// console.log(this.authService.signin42_token(res, user_name, id));
		return this.authService.signin42_token(res, user_name, id);
	}
}
