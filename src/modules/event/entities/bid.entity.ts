// bid.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { BidStatus } from 'src/constants';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Bid {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  //   @ApiProperty()
  @ManyToOne(() => Event, (event) => event.bids)
  event: Event;

  //   @ApiProperty()
  @ManyToOne(() => Artist, (artist) => artist.bids)
  artist: Artist;

  @ApiProperty()
  @Column({ type: 'enum', enum: BidStatus, default: BidStatus.ONGOING })
  bidStatus: BidStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
