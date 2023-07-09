import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, Length, IsNotEmpty, IsUUID, IsDate } from 'class-validator';

import { TASK_MAX_LENGTH, TASK_MIN_LENGTH, UUID_LENGTH } from 'common';

export class CreateNoteDto {
  @IsOptional()
  @Length(UUID_LENGTH)
  @IsUUID()
  id: string;

  @Length(TASK_MIN_LENGTH)
  title: string;

  @Length(TASK_MIN_LENGTH, TASK_MAX_LENGTH)
  content: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  updatedAt: Date;
}
