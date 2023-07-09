import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Note, NoteSchema, User, UserSchema } from 'entity';
import { DataService } from 'types';

import { MongoDataService } from './mongo.data-service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }, 
                               { name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://user:Seva2002@cluster0.mgfazyl.mongodb.net/',
    ),
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
