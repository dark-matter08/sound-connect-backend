import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Song } from './entities/song.entity';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([Artist, Album, Song])],
})
export class ArtistModule {}
