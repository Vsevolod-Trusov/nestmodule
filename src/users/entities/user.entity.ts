import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Schema as MongooseSchema } from 'mongoose';

import {
  EMAIL_VALIDATE_MASK,
  ROLES,
  TASK_MAX_LENGTH,
  TASK_MIN_LENGTH,
} from 'common';

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
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ required: true, minlength: TASK_MIN_LENGTH })
  firstname: string;

  @Prop({ required: true, minlength: TASK_MIN_LENGTH })
  lastname: string;

  @Prop({
    required: true,
    minlength: TASK_MIN_LENGTH,
    maxlength: TASK_MAX_LENGTH,
  })
  password: string;

  @Prop({ required: true, type: Date })
  birthday: Date;

  @Prop({
    required: true,
    index: true,
    unique: true,
    validate: EMAIL_VALIDATE_MASK,
  })
  email: string;

  @Prop({ required: true, enum: ROLES })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
