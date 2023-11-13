// event.controller.ts

import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { BidService } from './bid.service';
import { Event } from './entities/event.entity';
import { Bid } from './entities/bid.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('events')
@ApiTags('Events/Bidding')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly bidService: BidService,
  ) {}

  @Post()
  async createEvent(@Body() event: Event): Promise<Event> {
    return this.eventService.createEvent(event);
  }

  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') eventId: number): Promise<Event | undefined> {
    return this.eventService.getEventById(eventId);
  }

  @Post(':id/bid')
  async placeBid(@Param('id') eventId: number, @Body() bid: Bid): Promise<Bid> {
    bid.event = { id: eventId } as Event; // Attach the event to the bid
    return this.bidService.placeBid(bid);
  }

  @Get(':id/bids')
  async getBidsForEvent(@Param('id') eventId: number): Promise<Bid[]> {
    return this.bidService.getBidsForEvent(eventId);
  }
}
