/* GLOBAL MODULES */
import { Inject, Injectable, forwardRef } from '@nestjs/common';
/* AUTH PassportStrategy */
import { PassportStrategy } from '@nestjs/passport';
/* AUTH JWT */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from 'src/user/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Console } from 'console';
import { equal } from 'assert';
import { equals } from 'class-validator';
/**
 * Creating a JWT strategy
 */

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	/**
	 * JWT strategy object constructor
	 */
	constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	/**
	 * Validate function used by Passport Module
	 */
	async validate(data: { sub:number, user_name:string, two_factor_auth: boolean }) {
		console.log("---------validate id:", data.sub);
        console.log("is2FA", data.two_factor_auth);
		const user = await this.userRepository.findOne({
            where: {
                id: data.sub,
            },
        });
        if(!user){
			console.log("!user: ", user);
            return;
		}
		// if user is logged out return 401
        console.log("---------------jwtStrategy validate------------");
		console.log(user);
		if (!user.refresh_token) return;
        console.log("---------------jwtStrategy validate1------------");

		// remove sensitive data
		if (user) delete user.refresh_token;
		// if the user is not found user == NULL
		// 401 forbidden is returned.
		if (!user.two_factor_auth) {
			return user;
		}
		if (data.two_factor_auth) {
			return user;
		}
	}
}