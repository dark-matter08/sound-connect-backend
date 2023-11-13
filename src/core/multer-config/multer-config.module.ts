// multer.module.ts

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Module({
  imports: [MulterModule.register(multerOptions)],
})
export class MulterConfigModule {}
