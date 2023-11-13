// record-label.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordLabel } from './entities/record-label.entity';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class RecordLabelService {
  constructor(
    @InjectRepository(RecordLabel)
    private recordLabelRepository: Repository<RecordLabel>,
  ) {}

  async create(recordLabel: RecordLabel): Promise<RecordLabel> {
    return this.recordLabelRepository.save(recordLabel);
  }

  async update(
    id: number,
    recordLabel: RecordLabel,
  ): Promise<RecordLabel | undefined> {
    await this.recordLabelRepository.update(id, recordLabel);
    return this.recordLabelRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.recordLabelRepository.delete(id);
  }

  async getArtists(recordLabelId: number): Promise<Artist[]> {
    const recordLabel = await this.recordLabelRepository.findOne({
      where: {
        id: recordLabelId,
      },
      relations: {
        artists: true,
      },
    });
    return recordLabel ? recordLabel.artists : [];
  }

  async getRecordLabelDetails(
    recordLabelId: number,
  ): Promise<RecordLabel | undefined> {
    return this.recordLabelRepository.findOne({
      where: {
        id: recordLabelId,
      },
      relations: {
        artists: true,
        user: true,
      },
    });
  }
}
