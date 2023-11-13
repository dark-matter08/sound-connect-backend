import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(phoneEmail: string, password: string): Promise<any> {
    const user = await this.userService.findUser(phoneEmail);

    if (!user) {
      throw new BadRequestException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const token = await this.generateToken(user);

    return token;
  }

  async generateToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        name: user.name,
        sub: user.id,
        role: user.role,
      }),
    };
  }
}
