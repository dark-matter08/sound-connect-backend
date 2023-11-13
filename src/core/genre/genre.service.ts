// music-genre.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre as MusicGenre } from './genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(MusicGenre)
    private musicGenreRepository: Repository<MusicGenre>,
  ) {}

  async createGenre(name: string): Promise<MusicGenre> {
    const genre = this.musicGenreRepository.create({ name });
    return await this.musicGenreRepository.save(genre);
  }

  async findAllGenres(): Promise<MusicGenre[]> {
    return await this.musicGenreRepository.find();
  }

  async findGenreByName(name: string): Promise<MusicGenre | undefined> {
    return await this.musicGenreRepository.findOne({ where: { name } });
  }

  async findGenreById(id: number): Promise<MusicGenre | undefined> {
    return await this.musicGenreRepository.findOne({ where: { id } });
  }
}
