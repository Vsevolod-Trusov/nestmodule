import { IsNotEmpty, IsUUID, Length } from 'class-validator';

import { UUID_LENGTH } from 'common';

export class IdDto {
  @IsNotEmpty()
  @IsUUID()
  @Length(UUID_LENGTH)
  id: string;
}
