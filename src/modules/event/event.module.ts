import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './entities/bid.entity';
import { BidService } from './bid.service';
import { EventController } from './event.controller';

@Module({
  providers: [EventService, BidService],
  imports: [TypeOrmModule.forFeature([Event, Bid])],
  controllers: [EventController],
})
export class EventModule {}
