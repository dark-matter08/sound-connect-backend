import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Song } from './entities/song.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';
import { ArtistAddDto } from './dto/artist-add.dto';
import { Roles } from 'src/decorators';
import { MusicGenre, Role } from 'src/constants';
import { AccessTokenGuard, RoleGuard } from 'src/guards';
import { SongAddDto } from './dto/song-add.dto';
import { multerOptions } from 'src/config/multer.config';
import { GetBaseUrl } from 'src/decorators/base-url/base-url.decorator';
import { Album } from './entities/album.entity';
import { AlbumAddDto } from './dto/album-add.dto';
import { ArtistUpdateDto } from './dto/artist-update.dto';

@ApiTags('Artist Endpoints')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiResponse({
    description: 'Upload and create song entry',
    type: Song,
  })
  @Post('/song/create')
  @Roles(Role.ARTIST)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async createSongWithFile(
    @Body() songData: SongAddDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
    @GetBaseUrl() baseUrl: string,
  ): Promise<Song> {
    const user = req.user;
    return this.artistService.addSong(
      user.artistId,
      songData,
      file,
      baseUrl,
      songData.albumId,
    );
  }

  @ApiResponse({
    description: 'User becomes an artist',
    type: Artist,
  })
  @Post('/create')
  @UseGuards(AccessTokenGuard)
  async createArtist(
    @Body() body: ArtistAddDto,
    @Request() req,
  ): Promise<Artist> {
    const user = req.user;
    return this.artistService.create(user, body);
  }

  @ApiResponse({
    description: 'Create album',
    type: Album,
  })
  @Post('/album/create')
  @Roles(Role.ARTIST)
  @UseGuards(AccessTokenGuard, RoleGuard)
  async createAlbum(
    @Body() albumData: AlbumAddDto,
    @Request() req: any,
  ): Promise<Album> {
    const user = req.user;
    return this.artistService.createAlbum(user.artistId, albumData);
  }

  @ApiResponse({
    description: 'Update artist',
    type: Artist,
  })
  @Put('/update/:id')
  @Roles(Role.ARTIST)
  @UseGuards(AccessTokenGuard, RoleGuard)
  async updateArtist(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ArtistUpdateDto,
    @Request() req,
  ): Promise<Artist> {
    const user = req.user;
    if (user.artist.id !== id) {
      throw new ConflictException(
        'You are trying to edit an artist platform that is not yours',
      );
    }
    return this.artistService.update(user.artist.id, body);
  }

  @ApiResponse({
    description: 'Delete artist',
    type: Artist,
  })
  @Delete('/delete/:id')
  @Roles(Role.ARTIST)
  @UseGuards(AccessTokenGuard, RoleGuard)
  async deleteArtist(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Artist> {
    const user = req.user;
    if (user.artist.id !== id) {
      throw new ConflictException(
        'You are trying to edit an artist platform that is not yours',
      );
    }
    return this.artistService.delete(user.artist.id);
  }

  @ApiResponse({
    description: 'Get artist by ID',
    type: Artist,
  })
  @Get('/:id')
  async getArtistById(@Param('id', ParseIntPipe) id: number): Promise<Artist> {
    return this.artistService.findOne(id);
  }

  @ApiResponse({
    description: 'Get artist albums',
    type: Album,
    isArray: true,
  })
  @Get('/:id/albums')
  async getArtistAlbums(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Album[]> {
    return this.artistService.getArtistAlbums(id);
  }

  @ApiResponse({
    description: 'Get artist songs',
    type: Song,
    isArray: true,
  })
  @Get('/:id/songs')
  async getArtistSongs(@Param('id', ParseIntPipe) id: number): Promise<Song[]> {
    return this.artistService.getArtistSongs(id);
  }

  @ApiResponse({
    description: 'Get artist by genre',
    type: Artist,
    isArray: true,
  })
  @Get('/genre/:genreId')
  async getArtistByGenre(@Param('genreId') genreId: number): Promise<Artist[]> {
    return this.artistService.findByGenre(genreId);
  }
}
