// tip.service.ts

import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tip } from './entities/tip.entity';
import { UserService } from '../user/user.service';
import { ArtistService } from '../artist/artist.service';
import { BalanceService } from 'src/core/balance/balance.service';
import { PaymentMethod, TransactionChannel } from 'src/constants';

@Injectable()
export class TipingService {
  constructor(
    private userService: UserService,
    private artistService: ArtistService,
    private balanceService: BalanceService,
    @InjectRepository(Tip)
    private tipRepository: Repository<Tip>,
  ) {}

  async tipArtist(
    senderId: number,
    artistId: number,
    amount: number,
    message: string,
    paymentMethod: PaymentMethod,
  ): Promise<Tip> {
    const artistExists = await this.artistService.findById(artistId);
    const senderExists = await this.userService.findById(senderId);

    if (!artistExists) {
      throw new BadRequestException('Artist does not exist');
    }

    if (!senderExists) {
      throw new BadRequestException('Sender does not exist');
    }

    if (artistExists.id === senderExists.artistId) {
      throw new ConflictException('You cannot tip yourself');
    }
    const tip = this.tipRepository.create({
      sender: { id: senderId },
      artist: { id: artistId },
      amount,
      message,
    });

    const charge = 0.05;
    const amountPaidOut = amount - amount * charge;

    await this.balanceService.addBalance(
      amountPaidOut,
      artistExists.userId,
      TransactionChannel.BIDS,
      senderExists.id,
    );

    if (paymentMethod === PaymentMethod.BALANCE) {
      await this.balanceService.withdrawBalance(
        amountPaidOut,
        senderExists.id,
        TransactionChannel.BIDS,
        artistExists.userId,
      );
    }
    return await this.tipRepository.save(tip);
  }

  async getTipsByArtist(artistId: number): Promise<Tip[]> {
    const artistExists = await this.artistService.findById(artistId);

    if (!artistExists) {
      throw new BadRequestException('Artist does not exist');
    }
    return this.tipRepository.find({
      where: { artist: { id: artistId } },
    });
  }

  async getTotalArtistTips(artistId: number): Promise<number> {
    const artistExists = await this.artistService.findById(artistId);

    if (!artistExists) {
      throw new BadRequestException('Artist does not exist');
    }
    const totalTips = await this.tipRepository
      .createQueryBuilder('tip')
      .select('SUM(tip.amount)', 'total')
      .where('tip.artistId = :artistId', { artistId })
      .getRawOne();
    return totalTips.total;
  }

  async getTipsBySender(senderId: number): Promise<Tip[]> {
    const senderExists = await this.userService.findById(senderId);

    if (!senderExists) {
      throw new Error('Sender does not exist');
    }

    return this.tipRepository.find({
      where: { sender: { id: senderId } },
    });
  }

  // Add other methods as needed
}
