import { Role } from 'src/constants';
import { Artist } from "src/modules/artist/entities/artist.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profilePic: string;

  @Column({ enum: Role, default: Role.CONSUMER })
  role: Role;

  @OneToOne(() => Artist, (artist) => artist.user)
  artist: Artist;
}
