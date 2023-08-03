import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppModule } from 'src/app.module';
import { ChatModule } from 'src/chat/chat.module';
import { ChatMode } from 'src/chat/models/chat.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './strategies/42.strategy';
import { TwoFaService } from './2fa/2fa.service';
import { TwoFAController } from './2fa/2fa.controller';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/models/user.entity';
import { JwtGuard } from './guard/jwt.guard';
import { jwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([User]),
		forwardRef(() => AppModule),
		forwardRef(() => UserModule),
		// forwardRef(() => ChatModule),
		// forwardRef(() => UploadModule),
		forwardRef(() => HttpModule),
    ],
    controllers: [AuthController, TwoFAController],
    providers: [AuthService, 
                FortyTwoStrategy,
                JwtGuard,
                jwtStrategy,
                TwoFaService,
                User],
    exports: [AuthService],
})
export class AuthModule {}
