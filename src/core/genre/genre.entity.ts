// music-genre.entity.ts

import { Album } from 'src/modules/artist/entities/album.entity';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Song } from 'src/modules/artist/entities/song.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.genres)
  @JoinTable()
  artists: Artist[];

  @ManyToOne(() => Album, (album) => album.genres)
  @JoinTable()
  albums: Album[];

  @ManyToOne(() => Song, (song) => song.genres)
  @JoinTable()
  songs: Song[];
}
