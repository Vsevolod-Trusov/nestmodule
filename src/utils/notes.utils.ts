import { DEVIDE_BASE, ZERO_VALUE } from 'common';

export const checkIsEven = (value: number) =>
  value % DEVIDE_BASE === ZERO_VALUE;

export const concatStrings = (first: string, second: string) => first + second;
