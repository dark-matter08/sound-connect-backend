import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { jwtConfig } from 'src/config/jwt.config';
import appConfig from 'src/config/app.config';
import { User } from 'src/modules/user/entities/user.entity';
import { JWtPayload } from 'src/constants';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    private userService: UserService,
    private logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().appSecret,
    });
  }

  async validate(payload: JWtPayload): Promise<User> {
    const user = await this.userService.findById(payload.sub, payload.role);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_ACCEPTABLE);
    }

    return user;
  }
}
