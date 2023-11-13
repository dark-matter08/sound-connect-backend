import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  phoneEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
