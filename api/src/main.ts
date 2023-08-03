import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guard/jwt.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    }
  );

	// setup app to use validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);
  // // 	// set JwtGuard as a global guard
	const reflector = new Reflector();
	app.useGlobalGuards(new JwtGuard(reflector));

  await app.listen(3001);
}
bootstrap();
