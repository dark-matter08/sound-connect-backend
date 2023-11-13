import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JWTResponse } from 'src/constants';
import { LoginResponse } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ type: LoginResponse })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.phoneEmail, body.password);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ type: User, description: 'The created user object' })
  async register(@Body() body: RegisterDto) {
    const { name, email, phone, password } = body;
    return this.authService.register(name, email, phone, password);
  }
}
