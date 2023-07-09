import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop({ type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ required: true, minlength: 3 })
  firstname: string;

  @Prop({ required: true, minlength: 3 })
  lastname: string;

  @Prop({ required: true, minlength: 8, maxlength: 100 })
  password: string;

  @Prop({ required: true, type: Date })
  birthday: Date;

  @Prop({ required: true, index: true, unique: true, validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
