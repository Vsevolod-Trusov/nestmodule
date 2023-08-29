import { IsEmail, Length } from 'class-validator';

import { PASSWORD_MAX_LENGTH, TASK_MIN_LENGTH } from 'common';

export class AuthDto {
  @Length(TASK_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: string;

  @IsEmail()
  email: string;
}
