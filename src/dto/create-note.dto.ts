import { IsOptional, Length, MinLength, IsNotEmpty } from 'class-validator';

import { UUID_LENGTH } from 'common';

export class CreateNoteDto {
  @IsOptional()
  @Length(UUID_LENGTH)
  id: string;
  @MinLength(3)
  title: string;
  @Length(3, 500)
  content: string;
  @IsNotEmpty()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;
}
