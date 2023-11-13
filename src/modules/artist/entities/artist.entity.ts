import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Song } from './song.entity';
import { Album } from './album.entity';
import { RecordLabel } from 'src/modules/record-label/entities/record-label.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MusicGenre } from 'src/constants';

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
  @Column({
    type: 'enum',
    enum: MusicGenre,
    default: MusicGenre.POP,
  })
  genre: MusicGenre;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty()
  @Column({ nullable: true })
  recordLabelId: number;

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

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

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
