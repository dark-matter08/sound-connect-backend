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
import { MusicGenre, Role } from 'src/constants';
import { UserService } from '../user/user.service';
import { ArtistAddDto } from './dto/artist-add.dto';
import { GenreService } from 'src/core/genre/genre.service';

@Injectable()
export class ArtistService {
  constructor(
    private userService: UserService,
    private genreService: GenreService,
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

  async findById(id: number): Promise<Artist | undefined> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        songs: true,
        albums: true,
        recordLabel: true,
        genres: true,
      },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async findByGenre(genreId: number): Promise<Artist[]> {
    return this.artistRepository.find({
      where: {
        genres: { id: genreId },
      },
      relations: {
        user: true,
        songs: true,
        albums: true,
        recordLabel: true,
        genres: true,
      },
    });
  }

  async getArtistAlbumsByGenre(
    genreId: number,
    artistId: number,
  ): Promise<Album[]> {
    const artist = await this.artistRepository.findOne({
      where: {
        id: artistId,
      },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const albums = await this.albumRepository.find({
      where: {
        artist: artist,
        genres: { id: genreId },
      },
      relations: {
        artist: true,
        genres: true,
      },
    });

    return albums;
  }

  async getArtistSongsByGenre(
    genreId: number,
    artistId: number,
  ): Promise<Song[]> {
    const artist = await this.artistRepository.findOne({
      where: {
        id: artistId,
      },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const songs = await this.songRepository.find({
      where: {
        artist: artist,
        genres: { id: genreId },
      },
      relations: {
        artist: true,
        genres: true,
      },
    });

    return songs;
  }

  async create(user: User, artistData: ArtistAddDto): Promise<Artist> {
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

    const artist = new Artist();
    artist.userId = user.id;
    artist.stageName = artistData.stageName;
    (artist.bio = artistData.bio),
      (artist.recordLabelId = artistData.recordLabelId);

    const genres = [];
    for (const genreId of artistData.genreIds) {
      const genre = await this.genreService.findGenreById(genreId);
      genres.push(genre);
    }

    artist.genres = genres;

    const finArtist = await this.artistRepository.save(artist);

    user.artistId = artist.id;
    user.role = Role.ARTIST;

    await this.userService.update(user);

    return finArtist;
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

  async delete(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    const deletedArtist = await this.artistRepository.remove(artist);

    return deletedArtist;
  }

  async getArtistAlbums(id: number): Promise<Album[]> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return this.albumRepository.find({
      where: {
        artistId: id,
      },
    });
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

  // Additional Functions:

  async getArtistSongs(id: number): Promise<Song[]> {
    const artist = await this.artistRepository.findOne({
      where: {
        id,
      },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return this.songRepository.find({
      where: {
        artistId: id,
      },
    });
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

    const newAlbum = this.albumRepository.save({
      title: albumData.title,
      bio: albumData.bio,
      artistId: artistId,
    });

    return newAlbum;
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
