import {
  Body,
  Controller,
  Post,
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
import { Role } from 'src/constants';
import { AccessTokenGuard, RoleGuard } from 'src/guards';
import { SongAddDto } from './dto/song-add.dto';
import { multerOptions } from 'src/config/multer.config';
import { GetBaseUrl } from 'src/decorators/base-url/base-url.decorator';

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
    @Request() req,
    @GetBaseUrl() baseUrl,
  ): Promise<Song> {
    const user = req.user;
    const host = req.get('host');
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
}
