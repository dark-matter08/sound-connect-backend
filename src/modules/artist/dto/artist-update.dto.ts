import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MusicGenre } from 'src/constants';
import { Genre } from 'src/core/genre/genre.entity';

export class ArtistUpdateDto {
  @ApiProperty()
  stageName: string;

  @ApiProperty({ example: [1, 2] })
  genreIds: number[];

  @ApiProperty()
  bio: string;

  @ApiProperty()
  recordLabelId?: number;
}
