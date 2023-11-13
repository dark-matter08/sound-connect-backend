import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, Logger],
  imports: [UserModule],
})
export class AuthModule {}
