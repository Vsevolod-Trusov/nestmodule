import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

import { EMAIL_VALIDATE_MASK, TASK_MAX_LENGTH, TASK_MIN_LENGTH } from 'common';

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
  description: string;

  @Prop({ required: true, type: Date })
  dateCreation?: Date;

  @Prop({ required: false, type: Date })
  updatedAt?: Date;

  @Prop({ required: false, type: Boolean })
  isDeleted?: boolean;

  @Prop({ required: false, type: Date })
  deletedAt?: Date;

  @Prop({ required: true, validate: EMAIL_VALIDATE_MASK })
  author?: string;

  @Prop({ required: true, type: Boolean, default: false })
  isShared?: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
