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
import { RedirectOnLogin } from './filter/redirect';
import { TwoFaService } from './2fa/2fa.service';
import { GetCurrentUser } from 'src/decorator/get-current-user-decorator';
import { GetCurrentUserId } from 'src/decorator/get-current-user-decorator-id';


@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private twofaService: TwoFaService,
	) { }
	@UseGuards(AuthGuard('42auth'))
	@UseFilters(RedirectOnLogin)
	@Get('/callback')
	async callback(@Req() req: any, @Res() res: Response) {
		console.log("Hellooooooo!!!!!!");
		// console.log(req);

		const user = await this.authService.signin42(req.user as AuthUserDto);
		const { user_name, id, two_factor_auth } = user;
		
		console.log('callback method from auth controller' + user_name + '  ' + id);
		// console.log(this.authService.signin42_token(res, user_name, id));
		// return two_factor_auth ? this.twofaService.signin_2fa(res, user_name) :
		// 	this.authService.signin42_token(res, user_name, id);
		return this.authService.signin42_token(res, user_name, id);
	}

	@Post('logout')
	@HttpCode(200)
	// @ApiResponse({ status: 401, description: 'Unauthorized' })
	logout(
		@GetCurrentUser('user_name') user_name: string,
	) {
		return this.authService.signout(user_name);
	}

	// @Public()
	// @UseGuards(RtGuard)
// 	@HttpCode(200)
// 	@Post('/refresh')
// 	refresh(
// 		// @GetCurrentUserId() userId: number,
// 		@GetCurrentUser('user_name') user_name:string,
// 		@GetCurrentUser('refreshToken') refreshToken: string,
// 	) {
// 		return this.authService.refresh_token(user_name, refreshToken);
// 	}
}
