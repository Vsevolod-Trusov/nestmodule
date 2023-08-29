import { ONE_PAGE } from 'common';

export const getSkipValue = (currentPage: number, limit: number): number =>
  (currentPage - ONE_PAGE) * limit;
