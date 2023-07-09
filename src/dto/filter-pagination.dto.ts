import { Transform, TransformFnParams } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsPositive, Length, MinDate } from 'class-validator';
import { MIN_DATE_VALUE, TASK_MIN_LENGTH } from 'common';

export class FilterPaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  page: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Transform(({ value }: TransformFnParams) => parseInt(value, 10))
  limit: number;

  @IsOptional()
  @Length(TASK_MIN_LENGTH)
  name: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  @MinDate(new Date(MIN_DATE_VALUE))
  date: Date;
}
