import { Module } from '@nestjs/common';

import { NotesController } from 'notes/notes.controller';
import { NotesService } from 'notes/notes.service';

@Module({
  imports: [],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
