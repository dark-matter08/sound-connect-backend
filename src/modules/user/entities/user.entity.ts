import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/constants';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Tip } from 'src/modules/tiping/entities/tip.entity';
import { RecordLabel } from 'src/modules/record-label/entities/record-label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Balance } from 'src/core/balance/entities/balance.entity';
import { Event } from 'src/modules/event/entities/event.entity';

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

  @ApiProperty()
  @Column({ nullable: true })
  profilePic: string;

  @ApiProperty()
  @Column({ nullable: true })
  artistId: number;

  @ApiProperty()
  @Column({ nullable: true })
  recordLabelId: number;

  @OneToMany(() => Tip, (tip) => tip.sender)
  tips: Tip[];

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  following: Artist[];

  @ApiProperty()
  @Column({ enum: Role, default: Role.CONSUMER, type: 'enum' })
  role: Role;

  //   @ApiProperty()
  @OneToOne(() => Artist, (artist) => artist.user)
  artist: Artist;

  @OneToOne(() => Balance, (balance) => balance.user)
  balance: Balance;

  @ApiProperty()
  @OneToOne(() => RecordLabel, (recordLabel) => recordLabel.user)
  recordLabel: RecordLabel;

  @ApiProperty()
  @OneToMany(() => Event, (event) => event.createdBy)
  events: Event;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
