import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SongAddDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  albumId: number;
}
