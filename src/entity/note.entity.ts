import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type NoteDocument = Note & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Note {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ required: true, minlength: 3 })
  title: string;

  @Prop({ required: true, minlength: 3, maxlength: 500 })
  content: string;

  @Prop({ required: true, type: Date })
  createdAt: Date;

  @Prop({ required: true, type: Date })
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
