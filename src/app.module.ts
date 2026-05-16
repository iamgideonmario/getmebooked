import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [AppController, AuthController],
  providers: [AuthService],
})
export class AppModule {}