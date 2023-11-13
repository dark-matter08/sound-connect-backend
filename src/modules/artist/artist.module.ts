import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Artist } from './entities/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([Artist])],
})
export class ArtistModule {}
