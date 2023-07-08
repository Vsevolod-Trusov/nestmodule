import { Length, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  _id: string;
  @Length(3)
  title: string;
  @Length(3, 500)
  content: string;
  @IsNotEmpty()
  createdAt: Date;
  @IsOptional()
  updatedAt: Date;
}
