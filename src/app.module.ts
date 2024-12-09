import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { InterestModule } from './interest/interest.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    UserModule,
    PostModule,
    InterestModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const ormConfig: TypeOrmModuleOptions = JSON.parse(
          readFileSync(`${__dirname}/../ormconfig.json`, { encoding: 'utf-8' }),
        );
        return ormConfig;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
