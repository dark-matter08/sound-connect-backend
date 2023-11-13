// artist.service.ts

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { Song } from './entities/song.entity';
import { Album } from './entities/album.entity';
import { RecordLabel } from '../record-label/entities/record-label.entity';
import { User } from '../user/entities/user.entity';
import { Role } from 'src/constants';
import { UserService } from '../user/user.service';

@Injectable()
export class ArtistService {
  constructor(
    private userService: UserService,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
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

  async create(user: User, artistData: Partial<Artist>): Promise<Artist> {
    const existingArtist = await this.artistRepository.findOne({
      where: {
        userId: user.id,
      },
    });

    if (existingArtist) {
      throw new BadRequestException(
        'Artist profile has already been created for this user',
      );
    }

    const newArtist = await this.artistRepository.save({
      userId: user.id,
      stageName: artistData.stageName,
      genre: artistData.genre,
      bio: artistData.bio,
      recordLabelId: artistData.recordLabelId,
    });

    user.artistId = newArtist.id;
    user.role = Role.ARTIST;

    await this.userService.update(user);

    return newArtist;
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

  //

  async createAlbum(
    artistId: number,
    albumData: Partial<Album>,
  ): Promise<Album> {
    const artist = await this.artistRepository.findOne({
      where: {
        id: artistId,
      },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    const album = this.albumRepository.create(albumData);
    album.artist = artist;

    return await this.albumRepository.save(album);
  }

  async addSong(
    artistId: number,
    songData: Partial<Song>,
    file: Express.Multer.File,
    host: string,
    albumId?: number,
  ): Promise<any> {
    const artist = await this.artistRepository.findOne({
      where: {
        id: artistId,
      },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${artistId} not found`);
    }

    if (albumId) {
      const album = await this.albumRepository.findOne({
        where: { id: albumId },
      });
      if (!album) {
        throw new NotFoundException(`Album with ID ${albumId} not found`);
      }
    }

    const existingSong = await this.songRepository.findOne({
      where: {
        artistId: artistId,
        title: songData.title,
      },
    });

    if (existingSong) {
      throw new ConflictException(
        `Song with title ${songData.title} already exists for this artist`,
      );
    }

    const fileUrl = host + '/' + file.path;
    console.log(fileUrl);

    const newSong = await this.songRepository.save({
      title: songData.title,
      albumId: albumId,
      artistId: artistId,
      url: fileUrl,
    });

    return newSong;
  }
}
