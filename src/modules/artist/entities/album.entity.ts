// album.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Song } from './song.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Album {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 100 })
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  albumId: number;

  @ApiProperty()
  @Column({ nullable: true })
  coverPhoto: string;

  @ApiProperty()
  @Column({ nullable: true })
  bio: string;

  // @ApiProperty()
  @ManyToOne(() => Artist, (artist) => artist.albums)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @ApiProperty()
  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
