import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JWTResponse } from 'src/constants';
import { isValidPhoneNumber } from 'src/utils';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(phoneEmail: string, password: string): Promise<JWTResponse> {
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

  async generateToken(user: User): Promise<JWTResponse> {
    return {
      accessToken: this.jwtService.sign({
        name: user.name,
        sub: user.id,
        role: user.role,
      }),
    };
  }

  async register(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<User> {
    if (!isValidPhoneNumber(phone)) {
      throw new BadRequestException('invalid phone number');
    }

    const user = await this.userService.create(name, email, phone, password);

    return user;
  }
}
