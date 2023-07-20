import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsOptional,
  Length,
  IsUUID,
  IsDate,
  MinDate,
  IsEmail,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

import {
  MIN_DATE_VALUE,
  TASK_MIN_LENGTH,
  UUID_LENGTH,
  PASSWORD_MAX_LENGTH,
  ROLES,
} from 'common';
import { transformToDate } from 'utils';

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
  @Transform(transformToDate)
  @MinDate(new Date(MIN_DATE_VALUE))
  birthday: Date;

  @IsEmail()
  email: string;

  @IsEnum(ROLES)
  @IsNotEmpty()
  role: string;
}
