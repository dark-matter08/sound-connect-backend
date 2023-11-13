// song.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Song {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 100 })
  title: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column()
  artistId: number;

  @ApiProperty()
  @Column({ nullable: true })
  albumId: number;

  @ApiProperty()
  @ManyToOne(() => Artist, (artist) => artist.songs)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @ApiProperty()
  @ManyToOne(() => Album, (album) => album.songs)
  @JoinColumn({ name: 'album_id' })
  album: Album;
}
