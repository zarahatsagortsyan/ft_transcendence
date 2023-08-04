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
	async validate(data: { user_name:string, id:number, is2FA: boolean }) {
        
        const user = await this.userRepository.findOne({
            where: {
                id: data.id,
            },
        });
        if(!user)
            return;
		// if user is logged out return 401
        console.log("---------------jwtStrategy validate------------");
		if (!user.refresh_token) return;
        console.log("---------------jwtStrategy validate1------------");

		// remove sensitive data
		if (user) delete user.refresh_token;
		// if the user is not found user == NULL
		// 401 forbidden is returned.
		if (!user.two_factor_auth) {
			return user;
		}
		if (data.is2FA) {
			return user;
		}
	}
}