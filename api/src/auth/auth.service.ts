import { ForbiddenException, Inject, Injectable, Res, forwardRef } from '@nestjs/common';
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
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async signin42(dto: AuthUserDto) : Promise<User> {
        const { user_name } = dto;
        // const user = await this.userRepository.findOne({
        //     where: {
        //         id: user_id,
        //     },
        // });
        console.log("Axpor pesic araj!");
        
        const user = await this.userService.getUserByUsernameNull(user_name);
        console.log("Axpor pes!");
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
        console.log("Create areci axper");
		this.appGateway.onlineFromService(user.id);

        return user;
    }

    async signin42_token(@Res() res : Response, user_name: string, id: number) : Promise<Response> {
        const tokens = await this.signin_jwt(user_name, id);

		await this.updateRefreshToken(id, tokens.refresh_token);
		// await this.updateRefreshToken(user_name, tokens.refresh_token);

        const url = new URL(process.env.SITE_NAME)
        url.port = process.env.FRONT_PORT;
		url.pathname = '/auth';
		url.searchParams.append('access_token', tokens['access_token']);

        res.status(302).redirect(url.href);
        console.log("Auth-i verjjjjjjjjjjjjjjjjjj\n");
        console.log(res);
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
        this.userService.updateRefreshTokenById(id, hash);
    }

    // async updateRefreshToken(user_name: string, rtoken: string) //maybe Promise<void>
    // {
    //     const hash = await argon.hash(rtoken);
    //     this.userService.updateRefreshToken(user_name, hash);
    // }

    //  async signout(user_name: string){
	// 	// delete refresh token (log out)
    //     this.userService.updateRefreshToken(user_name, '') //had to be null?
	// 	// await this.prisma.user.updateMany({
	// 	// 	where: {
	// 	// 		id: userId,
	// 	// 		hashedRtoken: {
	// 	// 			// eslint-disable-next-line unicorn/no-null
	// 	// 			not: null,
	// 	// 		},
	// 	// 	},
	// 	// 	data: {
	// 	// 		// eslint-disable-next-line unicorn/no-null
	// 	// 		hashedRtoken: null,
	// 	// 	},
	// 	// });
	// 	//sending status update to the front
	// 	this.appGateway.offlineFromService((await this.userService.getUserByUsername(user_name)).id);
	// }
	async signout(userId: number): Promise<void> {
       console.log("signout(userId: number): Promise<void>") 
       this.userService.updateRefreshTokenById(userId, '') //had to be null?
    //    try{
    //         await this.userRepository
    //         .createQueryBuilder()
    //         .update(User)
    //         .set({ refresh_token: '' })
    //         .where('id = :userId', { userId })
    //         .andWhere('refresh_token IS NOT NULL')
    //         .execute();   
    //    }
    //    catch(error)
    //    {
    //        console.log (error)
    //    }

		this.appGateway.offlineFromService(userId);
	}
    
	/* REFRESH TOKEN */
	async refresh_token(
		userId: number,
		refreshToken: string,
	): Promise<AuthTokenDto> {
		// Find user by id
		const user = await this.userRepository.findOne({
			where: {
				id: userId,
			},
		});
		// Check if user exists and is logged in
		if (!user || !user.refresh_token)
			// throw 403 error
			throw new ForbiddenException('Invalid Credentials');
		// Verify hashed Refresh Token
		const pwMatches = await argon.verify(user.refresh_token, refreshToken);
		// Invalid refresh token
		if (!pwMatches)
			// throw 403 error
			throw new ForbiddenException('Invalid Credentials');
		// Generate new tokens
        const tokens = await this.signin_jwt(user.user_name, user.id);
		// Update Refresh Token - if user is logged in and valid
		await this.updateRefreshToken(user.id, tokens.refresh_token);
		// return tokens
		return tokens;
	}
    // async refresh_token(user_name: string, rtoken: string) : Promise<AuthTokenDto>
    // {
    //     const user = await this.userService.getUserByUsername(user_name);

    //     if (!user || !user.refresh_token)
    //         throw new ForbiddenException("Invalid credentials");
        
    //     const validated = await argon.verify(user.refresh_token, rtoken);
    //     if (!validated)
    //         throw new ForbiddenException('Invlaid credentials');
    //     const tokens = await this.signin_jwt(user_name, user.id, user.two_factor_auth);
    //     await this.updateRefreshToken(user_name, tokens.refresh_token);
    //     return tokens;
    // }
}
