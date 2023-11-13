// artist.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { Song } from './entities/song.entity';
import { Album } from './entities/album.entity';
import { RecordLabel } from '../record-label/entities/record-label.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: number): Promise<Artist | undefined> {
    return this.artistRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        songs: true,
        albums: true,
        recordLabel: true,
      },
    });
  }

  async create(artistData: Partial<Artist>): Promise<Artist> {
    const artist = this.artistRepository.create(artistData);
    return await this.artistRepository.save(artist);
  }

  async update(
    id: number,
    artistData: Partial<Artist>,
  ): Promise<Artist | undefined> {
    await this.artistRepository.update(id, artistData);
    return this.artistRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    await this.artistRepository.remove(artist);
  }

  // Additional Functions:

  async getArtistSongs(id: number): Promise<Song[]> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
      relations: {
        songs: true,
      },
    });
    return artist ? artist.songs : [];
  }

  async getArtistAlbums(id: number): Promise<Album[]> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
      relations: {
        albums: true,
      },
    });
    return artist ? artist.albums : [];
  }

  async getArtistRecordLabel(id: number): Promise<RecordLabel | undefined> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
      relations: {
        recordLabel: true,
      },
    });
    return artist ? artist.recordLabel : undefined;
  }
}
