// song.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './album.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ContentType, MusicGenre } from 'src/constants';
import { Genre } from 'src/core/genre/genre.entity';

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
  @Column({ type: 'enum', enum: ContentType, default: ContentType.FREE })
  contentType: ContentType;

  @ApiProperty()
  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable()
  genres: Genre[];

  // @ApiProperty()
  @ManyToOne(() => Artist, (artist) => artist.songs)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @ApiProperty()
  @ManyToOne(() => Album, (album) => album.songs)
  @JoinColumn({ name: 'album_id' })
  album: Album;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
