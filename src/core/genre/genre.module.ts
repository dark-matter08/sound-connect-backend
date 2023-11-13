// app.module.ts

import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreService],
  controllers: [GenreController],
  exports: [GenreService],
})
export class GenreModule implements OnModuleInit {
  constructor(private readonly musicGenreService: GenreService) {}

  async onModuleInit(): Promise<void> {
    const predefinedGenres = [
      'Rock',
      'Pop',
      'Hip Hop',
      'Jazz',
      'Country',
      'Electronic',
      'Classical',
      'Reggae',
      'Bikutsi',
      'Makossa',
      'Afrobeat',
      'Benskin',
      'Bamoun',
      'Makassi',
      'Ngoma',
      'Ambasse',
    ];

    for (const genre of predefinedGenres) {
      const existingGenre = await this.musicGenreService.findGenreByName(genre);

      if (!existingGenre) {
        await this.musicGenreService.createGenre(genre);
      }
    }
  }
}
