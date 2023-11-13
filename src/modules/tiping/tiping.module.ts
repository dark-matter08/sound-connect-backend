import { Module } from '@nestjs/common';
import { TipingService } from './tiping.service';
import { Tip } from './entities/tip.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipingController } from './tiping.controller';
import { UserModule } from '../user/user.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  providers: [TipingService],
  imports: [TypeOrmModule.forFeature([Tip]), UserModule, ArtistModule],
  controllers: [TipingController],
})
export class TipingModule {}
