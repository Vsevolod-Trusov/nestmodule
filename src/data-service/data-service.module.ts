import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { User, UserSchema } from 'users/entities';
import { Note, NoteSchema } from 'notes/entities';
import { DataService } from 'types';
import { ENV_VARIABLE_NAMES } from 'common';

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
        uri: configService.get<string>(ENV_VARIABLE_NAMES.DATABASE_URL),
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
