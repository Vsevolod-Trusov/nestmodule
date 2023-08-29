import { IsNotEmpty, MinLength } from 'class-validator';

import { TASK_MIN_LENGTH } from 'common';

export class NameDto {
  @IsNotEmpty()
  @MinLength(TASK_MIN_LENGTH)
  name: string;
}
