// bid.entity.ts

import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Balance } from './balance.entity';
import { PaymentStatus, PaymentType, TransactionChannel } from 'src/constants';

@Entity()
export class BalanceTransaction {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Balance, (balance) => balance.balanceTransactions)
  balance: Balance;

  @ApiProperty()
  @Column({ nullable: true })
  userFrom: number;

  @ApiProperty()
  @Column({ nullable: true })
  userTo: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty()
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @Column({ type: 'enum', enum: PaymentType, default: PaymentType.DEPOSIT })
  paymentType: PaymentType;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: TransactionChannel,
    default: TransactionChannel.BIDS,
  })
  paymentChannel: TransactionChannel;

  @ApiProperty()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  intitatedDateTime: Date;

  @ApiProperty()
  @Column({ nullable: true })
  executionDateTime: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
