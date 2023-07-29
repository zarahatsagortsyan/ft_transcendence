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

@Module({
    imports: [
        JwtModule.register({}),
		forwardRef(() => AppModule),
		forwardRef(() => UserModule),
		// forwardRef(() => ChatModule),
		// forwardRef(() => UploadModule),
		forwardRef(() => HttpModule),
    ],
    controllers: [AuthController],
    providers: [AuthService, FortyTwoStrategy],
    exports: [AuthService],
})
export class AuthModule {}
