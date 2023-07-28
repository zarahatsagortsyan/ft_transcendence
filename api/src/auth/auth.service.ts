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

@Injectable()
export class AuthService {
    constructor (
		private readonly jwtService: JwtService,
        private readonly appGateway: AppGateway,
		private readonly userService: UserService,
    ) {}
    
    async signin42(dto: IUser) : Promise<User> {
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

    async createUser(dto: IUser) : Promise<User> {
        const user = await this.userService.createUserPromise(dto);

        ////should be added
        // if (user) {
		// 	await this.uploadService.download_avatar(user.id, avatar);
		// }

		this.appGateway.onlineFromService(user.id);

        return user;
    }

    async signin42_token(@Res() res : Response, user_name: string) : Promise<Response> {
        const tokens = await this.signin_jwt(user_name);

		// await this.updateRefreshToken(id, tokens.refresh_token);
        const url = new URL(process.env.SITE_URL)
        url.port = process.env.FRONT_PORT;
		url.pathname = '/auth';
		url.searchParams.append('access_token', tokens['access_token']);

        res.status(302).redirect(url.href);
		return res;
    }
}
