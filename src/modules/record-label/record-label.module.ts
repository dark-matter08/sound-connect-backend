import { Module } from '@nestjs/common';
import { RecordLabelController } from './record-label.controller';
import { RecordLabelService } from './record-label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordLabel } from './entities/record-label.entity';

@Module({
  controllers: [RecordLabelController],
  providers: [RecordLabelService],
  exports: [RecordLabelService],
  imports: [TypeOrmModule.forFeature([RecordLabel])],
})
export class RecordLabelModule {}
