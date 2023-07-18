import { FilterQuery } from 'mongoose';

export abstract class GenericRepository<T> {
  abstract findByFilterUsingPagination(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
  ): Promise<T[]>;
  protected abstract findOneByFilter(filter: FilterQuery<T>): Promise<T>;
  protected abstract update(filter: FilterQuery<T>, item: T): Promise<T>;
  protected abstract replaceOneByFilter(
    filter: FilterQuery<T>,
    item: T,
  ): Promise<T>;
  protected abstract deleteOne(filter: object);
  abstract create(item: T): Promise<T>;
  abstract countItems(): Promise<number>;
}
