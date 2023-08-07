import {
	forwardRef,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../auth.service';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { TwoFaDto } from '../dto/auth.dto';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/models/user.entity';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TwoFaService {
    constructor (
        @Inject(forwardRef(() => AuthService))
        private authservice: AuthService,
        private userService: UserService,
        // @InjectRepository(User)
        // private readonly userRepository: Repository<User>,
    ) {}

    signin_2fa(response: Response, user_name: string){
		// console.log("process.env.SITE_NAME: " + process.env.SITE_NAME);
        const url = new URL(process.env.SITE_NAME);
		url.port = process.env.FRONT_PORT;
		url.pathname = '2FA';
		url.searchParams.append('user_name', user_name);
		response.status(302).redirect(url.href);
    }

    async turn_on(twoFacode: any, user: TwoFaDto) {
		const {user_name, id } = user;
		// Check is 2FA code is valid
		// console.log("Before verifying2FACode");
		// console.log("twoFacode: " + twoFacode);
		// console.log("user_name: " + user_name);
		
		
		const twoFasecret = (await this.userService.getUser(id)).two_factor_secret;
		// console.log("TwoFaSecret oaooaa: " + twoFasecret);
		const isValid = await this.verify2FAcode(twoFacode, twoFasecret);
		// console.log("en booleany: " + isValid);
		
		// If invalid, throw error 401
		if (!isValid) throw new UnauthorizedException('Invalid 2FA code');
		// console.log("Before updating twoFA");

		this.userService.updatetwoFa(id, true);
<<<<<<< HEAD
		console.log("Signing jwt");
=======
        // await this.userRepository.update(user_name, {two_factor_auth: true} );

		// Enable 2FA for user (add method to user module ?)
		// await this.prisma.user.update({
		// 	where: { email: email },
		// 	data: { twoFA: true },
		// });
		// console.log("Signing jwt");
>>>>>>> ca94f235ec7aa2d33d766e3308d7cd58ed5407c2
		const tokens = await this.authservice.signin_jwt(user_name, id, true);
		return tokens;
	}

	async turn_off(user: TwoFaDto) {
		const { user_name, id } = user;
		// await this.prisma.user.update({
		// 	where: { id: id },
		// 	data: { twoFA: false },
		// });


		this.userService.updatetwoFa(id, false);
        // this.userRepository.update(user_name, {two_factor_auth: true} );

		const tokens = await this.authservice.signin_jwt(user_name, id);
		return tokens;
	}

    async verify2FAcode(code: string, twoFAsecret: string) {
		// console.log("mi hat 1l oaoaao: " + twoFAsecret);
		// console.log("mi hat 1l oaoaao code-i hamar: " + code);
		
		return authenticator.verify({
			token: code,
			secret: twoFAsecret,
		});
	}

    async generate2FA(user_name:string, id: number) {
		// Generate a 2FA secret
		const secret = authenticator.generateSecret();
		// Create a URL for the QR code
		const onetimepathurl = authenticator.keyuri(
			user_name,
			"ft_transcendence",
			secret,
		);
		// Add the secret to the user
		// await this.prisma.user.update({
		// 	where: { email: email },
		// 	data: { twoFAsecret: secret },
		// });
		// console.log("generate2FA, update-ic araj");
		// console.log("generate2FA, secret" + secret);
		
		this.userService.updatetwoFaSecret(id, secret);
		return {
			secret,
			onetimepathurl,
		};
	}

    async generate2FAQRCode(onetimepathurl: string) {
		// Generate a QR code from the URL
		// console.log("Generating 2FA Qr code\n");
		
		return toDataURL(onetimepathurl);
	}

	/* Authenticate signin using 2FA */
	async authenticate(dto: TwoFaDto) {
		// destructure dto
		const {user_name, twoFacode, id} = dto;
		// console.log("---------async authenticate(dto: TwoFaDto)---",dto)
		const user = this.userService.getUser(id);
		if (!user) {
			throw new UnauthorizedException('Invalid User');
		}
		
		// const {two_factor_secret} = user;
		const twoFasecret = (await this.userService.getUser(id)).two_factor_secret;
		
		const isValidCode = await this.verify2FAcode(twoFacode, twoFasecret);
		// console.log("ARE YOU?");
		if (!isValidCode) {
			throw new UnauthorizedException('Invalid 2FA code');
		}
		const tokens = await this.authservice.signin_jwt(user_name, id, true);
		// console.log("authenticate: tokens: ",tokens.refresh_token);
		await this.authservice.updateRefreshToken(id, tokens.refresh_token);
		return tokens;
	}
}
