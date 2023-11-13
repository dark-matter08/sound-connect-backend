import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/constants';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  profilePic: string;

  @Column({ enum: Role, default: Role.CONSUMER, type: 'enum' })
  @ApiProperty()
  role: Role;

  @OneToOne(() => Artist, (artist) => artist.user)
  @ApiProperty()
  artist: Artist;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
