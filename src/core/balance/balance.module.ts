import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { BalanceTransaction } from './entities/balance-transaction.entity';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [TypeOrmModule.forFeature([Balance, BalanceTransaction])],
  exports: [BalanceService],
})
export class BalanceModule {}
