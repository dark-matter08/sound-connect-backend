// tip.controller.ts

import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { TipingService } from './tiping.service';

@Controller('tips')
export class TipingController {
  constructor(private readonly tipService: TipingService) {}

  @Post(':senderId/:artistId')
  async tipArtist(
    @Param('senderId') senderId: number,
    @Param('artistId') artistId: number,
    @Body('amount') amount: number,
    @Body('message') message: string,
  ) {
    const tip = await this.tipService.tipArtist(
      senderId,
      artistId,
      amount,
      message,
    );
    return { success: true, tip };
  }

  @Get('artist/:artistId')
  async getAllTipsForArtist(@Param('artistId') artistId: number) {
    const tips = await this.tipService.getTipsByArtist(artistId);
    return { success: true, tips };
  }

  @Get('sender/:senderId/tips')
  async getTipsBySender(@Param('senderId') senderId: number) {
    const tips = await this.tipService.getTipsBySender(senderId);
    return { success: true, tips };
  }

  @Get('artist/:artistId/total-tips')
  async getTotalTipsForArtist(@Param('artistId') artistId: number) {
    const totalTips = await this.tipService.getTotalArtistTips(artistId);
    return { success: true, totalTips };
  }
}
