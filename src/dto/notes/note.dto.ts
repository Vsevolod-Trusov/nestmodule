import { IsOptional, Length, IsUUID, IsEmail } from 'class-validator';

import { TASK_MAX_LENGTH, TASK_MIN_LENGTH, UUID_LENGTH } from 'common';

export class NoteDto {
  @IsOptional()
  @Length(UUID_LENGTH)
  @IsUUID()
  id: string;

  @Length(TASK_MIN_LENGTH)
  title: string;

  @Length(TASK_MIN_LENGTH, TASK_MAX_LENGTH)
  content: string;

  @IsOptional()
  @IsEmail()
  author: string;
}
