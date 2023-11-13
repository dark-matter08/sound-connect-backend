// event.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { BidStatus } from 'src/constants';
import { SchedulerRegistry } from '@nestjs/schedule';
import { dateToCronExpression } from 'src/utils';
import { CronJob, CronTime } from 'cron';
@Injectable()
export class EventService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(event: Event): Promise<Event> {
    const newEvent = await this.eventRepository.save(event);

    const cronJobName = 'EndEvent-' + newEvent.id + '-' + newEvent.name;
    const cronExpression = dateToCronExpression(newEvent.biddingEndDate);

    const cronJob = new CronJob(
      cronExpression,
      () => {
        this.checkEventStatus(newEvent.id);
      },
      null,
      true,
      'GMT+1',
    );

    // Add the cron job to the scheduler registry
    this.schedulerRegistry.addCronJob(cronJobName, cronJob as any);

    // Start the cron job
    cronJob.start();

    return newEvent;
  }

  async checkEventStatus(eventId) {
    const event = await this.eventRepository.findOne({
      where: {
        id: eventId,
      },
      relations: ['bids'],
    });
    if (event.biddingEndDate <= new Date()) {
      const winningBid = event.bids.reduce((prev, current) =>
        prev.amount > current.amount ? prev : current,
      );
      event.bids.forEach((bid) => {
        bid.bidStatus =
          bid.id === winningBid.id ? BidStatus.WON : BidStatus.LOST;
      });
      await this.eventRepository.save(event);
    }
  }

  async getEventById(eventId: number): Promise<Event | undefined> {
    return this.eventRepository.findOne({
      where: {
        id: eventId,
      },
      relations: {
        bids: true,
      },
    });
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['bids'] });
  }
}
