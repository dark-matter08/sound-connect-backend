import {
  TypeOrmModuleAsyncOptions,
  // TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async () => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      logging: true,
      synchronize: true,
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      cli: {
        migrationsDir: __dirname + '/../migrations',
      },
    };
  },
};

export const typeOrmConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: true,
  logging: true,
  cli: {
    migrationsDir: __dirname + '/../database/migrations',
  },
};
