export abstract class GenericRepository<T> {
  abstract findAll(): Promise<T[]>;

  abstract findAllUsingPagination(page: number, limit: number): Promise<T[]>;

  abstract findByFilterUsingPagination(
    filter: object,
    page: number,
    limit: number,
  ): Promise<T[]>;

  abstract findByFilter(filter: object ): Promise<T[]>;

  abstract create(item: T): Promise<T>;

  abstract update(filter: object, item: T);

  abstract deleteOne(filter: object);
}
