import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MusicGenre } from 'src/constants';

export class ArtistAddDto {
  @ApiProperty()
  @IsNotEmpty()
  stageName: string;

  @ApiProperty({ example: [1, 2] })
  @IsNotEmpty()
  genreIds: number[];

  @ApiProperty()
  @IsNotEmpty()
  bio: string;

  @ApiProperty()
  recordLabelId?: number;
}
