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
import { AccessTokenGuard } from '../../guards/access-token/access-token.guard';
import { Artist } from './entities/artist.entity';
import { ArtistAddDto } from './dto/artist-add.dto';

@ApiTags('Artist Endpoints')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiResponse({
    description: 'Upload and create song entry',
    type: Song,
  })
  @Post('/song/add')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createSongWithFile(
    @Body() songData: Partial<Song>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Song> {
    return this.artistService.addSong(
      songData.artistId,
      songData,
      file,
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
