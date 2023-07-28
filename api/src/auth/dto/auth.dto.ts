import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';
import { UserStatus } from 'src/user/models/user.entity';

export class AuthTokenDto {
	@IsString()
	@IsNotEmpty()
	access_token: string;

	@IsString()
	@IsNotEmpty()
	refresh_token: string;
}

export class AuthUserDto {
	@IsNumber()
	@IsNotEmpty()
	id: number;

	// @IsEmail()
	// @IsNotEmpty()
	// email: string;

	@IsString()
	@IsNotEmpty()
	user_name: string;

	@IsString()
	@IsNotEmpty()
	nick_name: string;
	
	@IsString()
	@IsNotEmpty()
	avatar: string;

	@IsString()
	@IsNotEmpty()
	user_status: UserStatus;
	
	@IsBoolean()
	@IsNotEmpty()
	two_factor_auth: boolean;

}