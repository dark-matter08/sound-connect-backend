import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './entities/balance.entity';
import { BalanceTransaction } from './entities/balance-transaction.entity';
import { PaymentStatus, PaymentType, TransactionChannel } from 'src/constants';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    @InjectRepository(BalanceTransaction)
    private balanceTransactionRepository: Repository<BalanceTransaction>,
  ) {}

  async addBalance(
    amount: number,
    userTo: number,
    paymentChannel: TransactionChannel,
    userFrom?: number,
  ) {
    let balance = await this.balanceRepository.findOne({
      where: {
        userId: userTo,
      },
    });

    if (!balance) {
      balance = await this.balanceRepository.save({ userId: userTo });
    }
    const transaction = await this.balanceTransactionRepository.save({
      balance: { id: balance.id },
      amount,
      userTo,
      userFrom,
      paymentStatus: PaymentStatus.SUCCESS,
      paymentType: PaymentType.DEPOSIT,
      paymentChannel,
      executionDateTime: Date.now(),
    });

    balance.amount = balance.amount + amount;
    balance.lastTransactionId = transaction.id;

    const newBalance = await this.balanceRepository.save(balance);

    return newBalance;
  }

  async withdrawBalance(
    amount: number,
    userFrom: number,
    paymentChannel: TransactionChannel,
    userTo?: number,
  ) {
    let balance = await this.balanceRepository.findOne({
      where: {
        userId: userFrom,
      },
    });

    if (balance.amount < amount) {
      throw new ConflictException(
        'You cannot make a transaction as your current balance is below the transaction amount',
      );
    }

    const transaction = await this.balanceTransactionRepository.save({
      balance: { id: balance.id },
      amount,
      userTo,
      userFrom,
      paymentStatus: PaymentStatus.SUCCESS,
      paymentType: PaymentType.WITHDRAW,
      paymentChannel,
      executionDateTime: Date.now(),
    });

    balance.amount = balance.amount - amount;
    balance.lastTransactionId = transaction.id;

    const newBalance = await this.balanceRepository.save(balance);

    return newBalance;
  }
}
