import { TransformFnParams } from 'class-transformer';

import { NUMBER_BASE } from 'common';

export const transformToDate = ({ value }: TransformFnParams) =>
  new Date(value);

export const transformToNumber = ({ value }: TransformFnParams) =>
  parseInt(value, NUMBER_BASE);
