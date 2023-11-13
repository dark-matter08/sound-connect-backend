import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  phoneEmail: string;
  @IsNotEmpty()
  password: string;
}
