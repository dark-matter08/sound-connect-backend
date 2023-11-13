import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { AccessTokenStrategy } from '../../guards/access-token/access-token.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, Logger, AccessTokenStrategy],
  imports: [UserModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
})
export class AuthModule {}
