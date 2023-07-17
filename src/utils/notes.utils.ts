import {
  DEVIDE_BASE,
  ZERO_VALUE,
  DATE_TIME_DEVIDER,
  ZERO_INDEX,
  TIME_PART,
} from 'common';

export const checkIsEven = (value: number) =>
  value % DEVIDE_BASE === ZERO_VALUE;

export const concatStrings = (first: string, second: string) => first + second;

export const getCurrentDate = () =>
  new Date(
    new Date(Date.now()).toISOString().split(DATE_TIME_DEVIDER)[ZERO_INDEX] +
      TIME_PART,
  );
