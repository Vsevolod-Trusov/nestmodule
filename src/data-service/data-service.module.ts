import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Note, NoteSchema } from 'entity';
import { IDataServices } from 'types';

import { MongoDataService } from './mongo.data-service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://user:Seva2002@cluster0.mgfazyl.mongodb.net/',
    ),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataService,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServiceModule {}
