// music-genre.controller.ts

import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';

@Controller('genre')
export class GenreController {
  constructor(private readonly musicGenreService: GenreService) {}

  @Get()
  async getAllGenres(): Promise<Genre[]> {
    return await this.musicGenreService.findAllGenres();
  }
}
