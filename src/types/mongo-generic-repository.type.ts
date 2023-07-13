import { FilterQuery } from "mongoose";

export abstract class GenericRepository<T> {
  abstract findByFilterUsingPagination(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
  ): Promise<T[]>;
  protected abstract findOneByFilter(filter: FilterQuery<T>): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract countItems(): Promise<number>;
  abstract update(filter: FilterQuery<T>, item: T);
  abstract deleteOne(filter: object);
}
