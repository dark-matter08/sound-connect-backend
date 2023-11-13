// record-label.entity.ts

import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class RecordLabel {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 100 })
  name: string;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @OneToMany(() => Artist, (artist) => artist.recordLabel)
  artists: Artist[];

  // @ApiProperty()
  @OneToOne(() => User, (user) => user.recordLabel)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
