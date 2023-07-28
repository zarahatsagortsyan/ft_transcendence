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
	@Get('callback')
    async callback(@Req() req, @Res() res) { 
		const user = await this.authService.signin42(req.user as IUser);
		const {user_name, } = user;
		console.log('callback method from auth controller' + user_name);
		return this.authService.signin42_token(res, user_name);
	}
}
