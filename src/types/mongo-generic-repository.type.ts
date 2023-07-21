import { FilterQuery } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export abstract class GenericRepository<T> {
  protected abstract findOneByFilter(filter: FilterQuery<T>): Promise<T>;
  protected abstract update(filter: FilterQuery<T>, item: T): Promise<T>;
  protected abstract replaceOneByFilter(
    filter: FilterQuery<T>,
    item: T,
  ): Promise<T>;
  protected abstract deleteOne(filter: object);
  abstract findByFilterUsingPagination(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
  ): Promise<T[]>;
  abstract create(item: T): Promise<T>;
  abstract countItems(): Promise<number>;
}
