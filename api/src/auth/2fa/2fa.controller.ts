import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { TwoFaDto } from '../dto/auth.dto';
import { TwoFaService } from './2fa.service';
import { Response } from 'express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/decorator/get-current-user-decorator';

@Controller('/auth/2fa')
@ApiTags('Two Factor Authentication')
@ApiHeader({
	name: 'Two Factor Authentication',
	description: 'Two Factor Authentication',
})
export class TwoFAController {
	constructor(private twoFAservice: TwoFaService) {}

	/* TWO FACTOR AUTHENTIFICATION */

	/**
	 * /2FA/turn-on - turn on 2FA
	 */
	@Post('/turn-on')
	@ApiResponse({ status: 401, description: 'Invalid 2FA code' })
	@HttpCode(200)
	async turn_on(
		@Body() { twoFAcode }: any,
		@GetCurrentUser() user: TwoFaDto,
	) {
		const tokens = await this.twoFAservice.turn_on(twoFAcode, user);
		return tokens;
	}

	// @Post('/turn-off')
	// @HttpCode(200)
	// async turn_off(@GetCurrentUser() user: TwoFaDto) {
	// 	const tokens = await this.twoFAservice.turn_off(user);
	// 	return tokens;
	// }

	// // @Public()
	// @ApiResponse({ status: 401, description: 'Invalid 2FA code' })
	// @Post('/authenticate')
	// async authenticate(@Body() dto: TwoFactorDto) {
	// 	// LOG
	// 	//console.log('auth 2fa', dto);
	// 	return this.twoFAservice.authenticate(dto);
	// }

	// /**
	//  * /2fa/generate - generate a new 2FA QR code
	//  */
	// @Post('/generate')
	// async generate_2fa(
	// 	@Res() response: Response,
	// 	@GetCurrentUser('email') email: string,
	// ) {
	// 	const { onetimepathurl } = await this.twoFAservice.generate2FA(email);
	// 	const qrcode = await this.twoFAservice.generate2FAQRCode(
	// 		onetimepathurl,
	// 	);
	// 	return response.json(qrcode);
	// }
}
