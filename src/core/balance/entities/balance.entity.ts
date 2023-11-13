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
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BalanceTransaction } from './balance-transaction.entity';

@Entity()
export class Balance {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  amount: number;

  @ApiProperty()
  @Column({ nullable: true })
  lastTransactionId: number;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @OneToMany(
    () => BalanceTransaction,
    (balanceTransaction) => balanceTransaction.balance,
    { nullable: true },
  )
  balanceTransactions: BalanceTransaction[];

  @ApiProperty()
  @OneToOne(() => User, (user) => user.balance)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
