import { IsOptional, Length, MinLength, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
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
