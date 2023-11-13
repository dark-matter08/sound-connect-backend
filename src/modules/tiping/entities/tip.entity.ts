// tip.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Assuming you're dealing with currency
  amount: number;

  @ManyToOne(() => User, (user) => user.tips)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => Artist, (artist) => artist.tips)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @Column({ nullable: true })
  message: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
