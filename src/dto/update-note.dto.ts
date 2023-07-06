import { Length } from 'class-validator';

export class UpdateNoteDto {
  id: string;
  @Length(3)
  title: string;
  @Length(3, 500)
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
