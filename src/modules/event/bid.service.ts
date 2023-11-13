// bid.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
  ) {}

  async placeBid(bid: Bid): Promise<Bid> {
    return this.bidRepository.save(bid);
  }

  async getBidsForEvent(eventId: number): Promise<Bid[]> {
    return this.bidRepository.find({
      where: { event: { id: eventId } },
      relations: ['artist'],
    });
  }
}
