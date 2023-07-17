import { Transform, TransformFnParams } from 'class-transformer';
import { Length, IsOptional, IsUUID, IsDate, MinDate } from 'class-validator';

import {
  MIN_DATE_VALUE,
  TASK_MAX_LENGTH,
  TASK_MIN_LENGTH,
  UUID_LENGTH,
} from 'common';

export class UpdateNoteDto {
  @Length(UUID_LENGTH)
  @IsUUID()
  id: string;

  @Length(TASK_MIN_LENGTH)
  title: string;

  @Length(TASK_MIN_LENGTH, TASK_MAX_LENGTH)
  content: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  @MinDate(new Date(MIN_DATE_VALUE))
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  @MinDate(new Date(MIN_DATE_VALUE))
  updatedAt: Date;
}
