import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsOptional,
  Length,
  IsUUID,
  IsDate,
  MinDate,
  IsEmail,
} from 'class-validator';

import {
  MIN_DATE_VALUE,
  TASK_MIN_LENGTH,
  UUID_LENGTH,
  PASSWORD_MAX_LENGTH,
} from 'common';

export class CreateUserDto {
  @IsOptional()
  @Length(UUID_LENGTH)
  @IsUUID()
  id: string;

  @Length(TASK_MIN_LENGTH)
  firstname: string;

  @Length(TASK_MIN_LENGTH)
  lastname: string;

  @Length(TASK_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: string;

  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  @MinDate(new Date(MIN_DATE_VALUE))
  birthday: string;

  @IsEmail()
  email: string;

  @IsOptional()
  refreshToken: Date;
}
