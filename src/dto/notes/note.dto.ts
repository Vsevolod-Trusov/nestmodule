import { IsOptional, Length, IsUUID, IsBoolean } from 'class-validator';

import { TASK_MAX_LENGTH, TASK_MIN_LENGTH, UUID_LENGTH } from 'common';

export class NoteDto {
  @IsOptional()
  @Length(UUID_LENGTH)
  @IsUUID()
  id: string;

  @IsOptional()
  @Length(TASK_MIN_LENGTH)
  title: string;

  @IsOptional()
  @Length(TASK_MIN_LENGTH, TASK_MAX_LENGTH)
  description: string;

  @IsOptional()
  @IsBoolean()
  isShared: boolean;
}
