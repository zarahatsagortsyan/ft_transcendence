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
        const url = new URL(process.env.SITE_URL);
		url.port = process.env.FRONT_PORT;
		url.pathname = '2FA';
		url.searchParams.append('user_name', user_name);
		response.status(302).redirect(url.href);
    }

    async turn_on(twoFacode: any, user: TwoFaDto) {
		// destructure data
		const {twoFasecret, user_name, id } = user;
		// Check is 2FA code is valid
		const isValid = await this.verify2FAcode(twoFacode, twoFasecret);
		// If invalid, throw error 401
		if (!isValid) throw new UnauthorizedException('Invalid 2FA code');


        // await this.userRepository.update(user_name, {two_factor_auth: true} );

		// Enable 2FA for user (add method to user module ?)
		// await this.prisma.user.update({
		// 	where: { email: email },
		// 	data: { twoFA: true },
		// });
		const tokens = await this.authservice.signin_jwt(user_name, id, true);
		return tokens;
	}

	async turn_off(user: TwoFaDto) {
		const { user_name, id } = user;
		// await this.prisma.user.update({
		// 	where: { id: id },
		// 	data: { twoFA: false },
		// });


        // this.userRepository.update(user_name, {two_factor_auth: true} );



		const tokens = await this.authservice.signin_jwt(user_name, id);
		return tokens;
	}

    async verify2FAcode(code: string, twoFAsecret: string) {
		return authenticator.verify({
			token: code,
			secret: twoFAsecret,
		});
	}

    async generate2FA(user_name: string) {
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


        // await this.userRepository.update(user_name, {two_factor_secret: secret})


		return {
			secret,
			onetimepathurl,
		};
	}

    async generate2FAQRCode(onetimepathurl: string) {
		// Generate a QR code from the URL
		return toDataURL(onetimepathurl);
	}
}
