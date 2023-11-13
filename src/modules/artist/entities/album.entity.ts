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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Song } from './song.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MusicGenre } from 'src/constants';
import { Genre } from 'src/core/genre/genre.entity';

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
  artistId: number;

  @ApiProperty()
  @Column({ nullable: true })
  coverPhoto: string;

  @ApiProperty()
  @Column({ nullable: true })
  bio: string;

  @ApiProperty()
  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable()
  genres: Genre[];

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
