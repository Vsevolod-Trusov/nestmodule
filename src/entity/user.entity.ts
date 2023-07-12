import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

import { EMAIL_VALIDATE_MASK, NULL_VALUE, TASK_MAX_LENGTH, TASK_MIN_LENGTH } from 'common';

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

  @Prop({ required: true, minlength: TASK_MIN_LENGTH })
  firstname: string;

  @Prop({ required: true, minlength: TASK_MIN_LENGTH })
  lastname: string;

  @Prop({ required: true, minlength: TASK_MIN_LENGTH, maxlength: TASK_MAX_LENGTH })
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

  @Prop({ required: false, default: NULL_VALUE })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
