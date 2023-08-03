import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-42';
import { AuthService } from '../auth.service';

import { IUser } from 'src/user/models/user.interface';
import { AuthUserDto } from '../dto/auth.dto';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, "42auth"){

    constructor(private readonly authService: AuthService) {
		super({
			clientID: process.env.UID,
			clientSecret: process.env.SECRET,
			callbackURL: process.env.REDIRECT_URI,
			profileFields: {
				id: 'id',
				user_name: 'login',
                avatar: 'image.link',
			},
		});
	}

    validate(accessToken: string, refreshToken: string, profile: AuthUserDto) {
		console.log(profile);
		return profile;
	}
}