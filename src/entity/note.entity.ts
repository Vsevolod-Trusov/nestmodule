import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

import { NULL_VALUE, TASK_MAX_LENGTH, TASK_MIN_LENGTH } from 'common';

export type NoteDocument = Note & Document;

@Schema({
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Note {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ required: true, minlength: TASK_MIN_LENGTH })
  title: string;

  @Prop({
    required: true,
    minlength: TASK_MIN_LENGTH,
    maxlength: TASK_MAX_LENGTH,
  })
  content: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ type: Date, default: NULL_VALUE })
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
