import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Note, NoteSchema, User, UserSchema } from 'entity';
import { DataService } from 'types';
import { ENV } from 'common';

import { MongoDataService } from './mongo.data-service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(ENV.DATABASE_URL),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: DataService,
      useClass: MongoDataService,
    },
  ],
  exports: [DataService],
})
export class MongoDataServiceModule {}
