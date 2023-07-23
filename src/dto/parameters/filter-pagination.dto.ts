import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  Length,
  MinDate,
} from 'class-validator';

import { MIN_DATE_VALUE, TASK_MIN_LENGTH } from 'common';
import { transformToDate, transformToNumber } from 'utils';

export class FilterPaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(transformToNumber)
  page: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(transformToNumber)
  limit: number;

  @IsOptional()
  @Length(TASK_MIN_LENGTH)
  title: string;

  @IsOptional()
  @IsDate()
  @Transform(transformToDate)
  @MinDate(new Date(MIN_DATE_VALUE))
  date: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: TransformFnParams) => !!value)
  isShared: boolean;

  @IsOptional()
  @IsEmail()
  email: string;
}
