import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './modules/artist/artist.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { RecordLabelModule } from './modules/record-label/record-label.module';
import { MulterConfigModule } from './core/multer-config/multer-config.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { GenreModule } from './core/genre/genre.module';
import { EventModule } from './modules/event/event.module';
import { TipingModule } from './modules/tiping/tiping.module';
import { BalanceModule } from './core/balance/balance.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ArtistModule,
    AuthModule,
    UserModule,
    RecordLabelModule,
    MulterConfigModule,
    GenreModule,
    EventModule,
    TipingModule,
    BalanceModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
