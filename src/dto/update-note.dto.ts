import { Length, IsNotEmpty, IsOptional } from 'class-validator';

import { UUID_LENGTH } from 'common';

export class UpdateNoteDto {
  @IsNotEmpty()
  @Length(UUID_LENGTH)
  id: string;
  @Length(3)
  title: string;
  @Length(3, 500)
  content: string;
  @IsNotEmpty()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;
}
