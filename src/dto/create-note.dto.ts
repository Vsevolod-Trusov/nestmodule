import { IsOptional, Length, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  id: string;
  @MinLength(3)
  title: string;
  @Length(3, 500)
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
