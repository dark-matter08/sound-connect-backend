import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './modules/artist/artist.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { RecordLabelModule } from './modules/record-label/record-label.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './config/multer.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ArtistModule,
    AuthModule,
    UserModule,
    RecordLabelModule,
    MulterModule.register(multerOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
