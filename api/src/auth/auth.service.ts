import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from 'src/app.gateway';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth.dto';
import { User } from 'src/user/models/user.entity';
import { IUser } from 'src/user/models/user.interface';
import { Response } from 'express';
import { AuthTokenDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor (
		private readonly jwtService: JwtService,
        private readonly appGateway: AppGateway,
		private readonly userService: UserService,
    ) {}
    
    async signin42(dto: AuthUserDto) : Promise<User> {
        const { user_name } = dto;
        // const user = await this.userRepository.findOne({
        //     where: {
        //         id: user_id,
        //     },
        // });
        const user = await this.userService.getUserByUsername(user_name);
		if (user) 
            this.appGateway.onlineFromService(user.id);
        
        return user ?? this.createUser(dto);
    }

    async createUser(dto: AuthUserDto) : Promise<User> {
        const user = await this.userService.createUserPromise(dto);

        ////should be added
        // if (user) {
		// 	await this.uploadService.download_avatar(user.id, avatar);
		// }

		this.appGateway.onlineFromService(user.id);

        return user;
    }

    async signin42_token(@Res() res : Response, user_name: string, id: number) : Promise<Response> {
        const tokens = await this.signin_jwt(user_name, id);

		await this.updateRefreshToken(id, tokens.refresh_token);
        const url = new URL(process.env.SITE_NAME)
        url.port = process.env.FRONT_PORT;
		url.pathname = '/auth';
		url.searchParams.append('access_token', tokens['access_token']);

        res.status(302).redirect(url.href);
		return res;
    }

    async signin_jwt(user_name: string, id: number, two_factor_auth = false):Promise<AuthTokenDto>{
        const login_data = {sub: id, user_name, two_factor_auth};

        const atoken = await this.jwtService.signAsync(login_data, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
            secret: process.env.JWT_SECRET,
        });

        const rtoken = await this.jwtService.signAsync(login_data, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
            secret: process.env.JWT_SECRET,
        });

        return {
			access_token: atoken,
			refresh_token: rtoken,
		};
    }

    async updateRefreshToken(id: number, rtoken: string) //maybe Promise<void>
    {
        const hash = await argon.hash(rtoken);
        this.userService.updateRefreshToken(id, hash);
    }
}
