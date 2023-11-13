// event.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Bid } from './bid.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  //   @ApiProperty()
  @ManyToOne(() => User, (user) => user.events)
  createdBy: User;

  @ApiProperty()
  @Column({ type: 'datetime' })
  biddingStartDate: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  biddingEndDate: Date;

  @ApiProperty()
  @OneToMany(() => Bid, (bid) => bid.event)
  bids: Bid[];

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  bidLowerLimit: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  bidUpperLimit: number;

  @ApiProperty()
  @Column({ default: true })
  isBiddable: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
