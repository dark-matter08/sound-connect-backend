import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Song } from './song.entity';
import { Album } from './album.entity';
import { RecordLabel } from 'src/modules/record-label/entities/record-label.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Artist {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @Column()
  stageName: string;

  @ApiProperty()
  @Column({ length: 100, nullable: true })
  genre: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty()
  @Column({ nullable: true })
  recordLabelId: number;

  @ApiProperty()
  @ManyToOne(() => RecordLabel, (recordLabel) => recordLabel.artists)
  @JoinColumn({ name: 'record_lable_id' })
  recordLabel: RecordLabel;

  @ApiProperty()
  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];

  @ApiProperty()
  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @ApiProperty()
  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
